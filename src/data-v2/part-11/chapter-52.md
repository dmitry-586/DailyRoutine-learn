# Глава 52. TanStack Query: useQuery, кэширование и query keys

TanStack Query (ранее React Query) — стандарт для управления серверным состоянием в React. Понимание `useQuery`, кэширования и query keys критично для эффективной работы с API.

---

## 52.1. Установка и настройка

```bash
pnpm add @tanstack/react-query
```

### QueryClientProvider

```typescript
// app/layout.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут (ранее cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

---

## 52.2. useQuery: получение данных

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

```typescript
const {
  data,
  error,
  isLoading, // Первая загрузка
  isFetching, // Любая загрузка (включая фоновую)
  isSuccess, // Успешно загружено
  isError, // Произошла ошибка
  refetch, // Функция для ручного обновления
  status, // 'pending' | 'error' | 'success'
  fetchStatus, // 'fetching' | 'paused' | 'idle'
} = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})

// Показываем скелетон при первой загрузке
if (isLoading) return <Skeleton />

// Показываем данные + индикатор фоновой загрузки
return (
  <div>
    {isFetching && <Spinner />}
    {data?.map((user) => (
      <UserCard key={user.id} {...user} />
    ))}
  </div>
)
```

---

## 52.3. Query Keys: фабрика ключей

**Query Key** — это уникальный идентификатор запроса. Используется для кеширования и инвалидации.

### Иерархическая структура

```typescript
// lib/api/query-keys.ts
export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: string) =>
      [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.users.details(), id] as const,
  },
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: string) =>
      [...queryKeys.posts.lists(), filters] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.posts.details(), id] as const,
  },
} as const
```

**Преимущества:**

- 🎯 Централизованное управление ключами
- 🔄 Точечная инвалидация
- 📦 Иерархическая структура
- 🔒 Типобезопасность

### Использование

```typescript
// Получение списка пользователей
const { data } = useQuery({
  queryKey: queryKeys.users.list('active'),
  queryFn: () => fetchUsers({ status: 'active' }),
})

// Получение конкретного пользователя
const { data: user } = useQuery({
  queryKey: queryKeys.users.detail(123),
  queryFn: () => fetchUser(123),
})
```

---

## 52.4. Кэширование

### staleTime

Время, в течение которого данные считаются актуальными:

```typescript
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 минут
})
```

**Поведение:**

- Если данные свежие (прошло < 5 минут) — запрос не выполняется
- Если данные устарели — выполняется фоновый запрос
- UI показывает кешированные данные сразу

### gcTime (ранее cacheTime)

Время, в течение которого неиспользуемые данные хранятся в кеше:

```typescript
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  gcTime: 10 * 60 * 1000, // 10 минут
})
```

**Поведение:**

- Когда компонент размонтируется, данные остаются в кеше
- Если компонент монтируется снова в течение 10 минут — данные берутся из кеша
- После 10 минут неиспользования данные удаляются

### refetchOnWindowFocus

Автоматическое обновление при возврате фокуса на окно:

```typescript
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  refetchOnWindowFocus: false, // Отключить
})
```

---

## 52.5. Кастомные хуки

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

## 52.6. Селекторы для оптимизации

Подписываемся только на нужную часть данных:

```typescript
// ❌ Плохо: ререндер при любом изменении user
const { data: user } = useUser(id)
console.log(user.email) // Ререндер если изменился name

// ✅ Хорошо: ререндер только при изменении email
const { data: email } = useQuery({
  queryKey: queryKeys.users.detail(id),
  queryFn: () => fetchUser(id),
  select: (user) => user.email, // Селектор
})

// Сложный селектор
const { data: fullName } = useQuery({
  queryKey: queryKeys.users.detail(id),
  queryFn: () => fetchUser(id),
  select: (user) => `${user.firstName} ${user.lastName}`,
})
```

---

## 52.7. Конфигурация запросов

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

---

## Key Takeaways

- `useQuery` для получения данных с сервера
- Query keys для идентификации и кеширования
- Фабрика ключей для централизованного управления
- `staleTime` для актуальности данных
- `gcTime` для хранения неиспользуемых данных
- Селекторы для оптимизации ререндеров
- Кастомные хуки для инкапсуляции запросов

