# Глава 53. TanStack Query: useQuery, кэширование и query keys

TanStack Query (ранее React Query) — стандарт для управления серверным состоянием в React. Понимание `useQuery`, кэширования и query keys критично для эффективной работы с API.

---

## 53.1. Установка и настройка

TanStack Query требует обёртки `QueryClientProvider` на верхнем уровне приложения. В ней настраиваются глобальные параметры:

- **staleTime** — как долго данные считаются актуальными (5 минут по умолчанию)
- **gcTime** — как долго хранить неиспользуемые данные в кэше
- **retry** — сколько раз повторять запрос при ошибке
- **refetchOnWindowFocus** — обновлять ли данные при возврате на вкладку

```bash
npm install @tanstack/react-query
```

Добавьте `QueryClientProvider` в корневой layout и настройте `QueryClient` под нужды проекта.

---

## 53.2. useQuery: получение данных

### Базовое использование

```typescript
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/axios'

interface User {
  id: number
  name: string
  email: string
}

export function UsersList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await apiClient.get<User[]>('/users')
      return data
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Состояния запроса

`useQuery` возвращает объект с несколькими важными свойствами:

- **isLoading** — первая загрузка (данных ещё нет)
- **isFetching** — любая загрузка, включая фоновую (данные уже есть)
- **isSuccess** — запрос успешно завершён
- **isError** — произошла ошибка
- **refetch** — функция для ручного обновления

**Важное различие:** `isLoading` показывает скелетон при первом заходе. `isFetching` показывает спиннер при обновлении уже загруженных данных. Это позволяет не прятать контент при фоновом обновлении.

---

## 53.3. Query Keys: фабрика ключей

**Query Key** — уникальный идентификатор запроса. От него зависит кеширование и инвалидация данных.

**Зачем нужна фабрика ключей?**

1. **Централизованное управление** — все ключи в одном месте
2. **Точечная инвалидация** — можно обновить только нужные данные
3. **Иерархия** — инвалидация `['users']` обновит все запросы пользователей
4. **Типобезопасность** — TypeScript защищает от опечаток

**Принцип иерархии:**

- `['users']` — все данные пользователей
- `['users', 'list']` — списки пользователей
- `['users', 'list', 'active']` — активные пользователи
- `['users', 'detail', 123]` — конкретный пользователь

При инвалидации `['users']` обновятся ВСЕ запросы, начинающиеся с `'users'`. При инвалидации `['users', 'detail', 123]` — только конкретный пользователь.

---

## 53.4. Кэширование

TanStack Query использует умное кеширование с двумя ключевыми параметрами:

### staleTime — время актуальности

Определяет, как долго данные считаются свежими:

- **Данные свежие** (< staleTime) — запрос не выполняется, данные из кеша
- **Данные устарели** (> staleTime) — выполняется фоновый запрос, но UI показывает кешированные данные сразу

**Пример:** при `staleTime: 5 * 60 * 1000` данные актуальны 5 минут. Если пользователь открыл страницу повторно через 3 минуты — запрос не выполнится.

### gcTime — время хранения в кеше

Определяет, как долго хранить неиспользуемые данные:

- Когда компонент размонтируется — данные остаются в кеше
- При повторном монтировании в пределах gcTime — данные мгновенно из кеша
- После истечения gcTime — данные удаляются из памяти

**Пример:** при `gcTime: 10 * 60 * 1000` данные хранятся 10 минут после размонтирования компонента.

### refetchOnWindowFocus

По умолчанию TanStack Query обновляет данные при возврате на вкладку браузера. Это полезно для актуальности, но можно отключить для стабильности UI.

---

## 53.5. Кастомные хуки

Инкапсулируйте каждый запрос в отдельный хук:

```typescript
// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/axios'
import { queryKeys } from '@/lib/api/query-keys'

interface User {
  id: number
  name: string
  email: string
}

// Список пользователей
export const useUsers = (filters?: { status?: string }) => {
  return useQuery({
    queryKey: queryKeys.users.list(JSON.stringify(filters)),
    queryFn: async () => {
      const { data } = await apiClient.get<User[]>('/users', {
        params: filters,
      })
      return data
    },
    staleTime: 5 * 60 * 1000, // Данные актуальны 5 минут
  })
}

// Конкретный пользователь
export const useUser = (id: number) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/users/${id}`)
      return data
    },
    enabled: !!id, // Запрос только если id существует
  })
}

// Использование
function UsersList() {
  const { data: users } = useUsers({ status: 'active' })
  // ...
}

function UserProfile({ id }: { id: number }) {
  const { data: user } = useUser(id)
  // ...
}
```

---

## 53.6. Селекторы для оптимизации

**Проблема:** по умолчанию компонент ререндерится при любом изменении данных запроса.

**Решение:** селекторы позволяют подписаться только на нужную часть данных.

Если компонент использует только email пользователя, нет смысла ререндерить его при изменении имени. Селектор `select: (user) => user.email` подписывает компонент только на поле email.

**Когда использовать:**

- Компонент использует только часть данных из большого объекта
- Нужно вычислить производное значение (например, `fullName` из `firstName` + `lastName`)
- Оптимизация частых ререндеров

---

## 53.7. Конфигурация запросов

### enabled

Условное выполнение запроса:

```typescript
const { data: user } = useQuery({
  queryKey: queryKeys.users.detail(userId),
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // Запрос только если userId существует
})
```

### retry

Настройка повторных попыток:

```typescript
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  retry: 2, // 2 попытки при ошибке
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
})
```

### refetchInterval

Автоматическое обновление с интервалом:

```typescript
useQuery({
  queryKey: ['notifications'],
  queryFn: fetchNotifications,
  refetchInterval: 30000, // Обновлять каждые 30 секунд
})
```

---

## Вопросы на собеседовании

### 1. Что такое query key?

Уникальный идентификатор запроса, используется для кеширования и инвалидации.

### 2. В чём разница между staleTime и gcTime?

`staleTime` — время актуальности данных. `gcTime` — время хранения неиспользуемых данных в кеше.

### 3. В чём разница между isLoading и isFetching?

`isLoading` — первая загрузка. `isFetching` — любая загрузка, включая фоновую.

### 4. Зачем нужна фабрика ключей?

Централизованное управление, точечная инвалидация, типобезопасность.

### 5. Что такое селектор в useQuery?

Функция для подписки только на нужную часть данных, оптимизирует ререндеры.
