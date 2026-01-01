# Глава 27. Axios и работа с HTTP

## Введение

В современной веб-разработке HTTP-запросы — это основа взаимодействия между клиентом и сервером. После изучения TanStack Query и Zustand, давайте рассмотрим, как эффективно организовать работу с HTTP через Axios — библиотеку, которая остаётся популярным выбором благодаря удобному API, автоматической обработке ошибок и мощным возможностям для настройки.

В этой главе мы рассмотрим Axios (актуальная версия 1.7+), сравним его с `fetch`, изучим продвинутые возможности и паттерны использования с TypeScript и TanStack Query.

---

## Fetch vs Axios: что выбрать?

### Нативный fetch

```typescript
// Базовый GET запрос
const response = await fetch('https://api.example.com/users')
const data = await response.json()

// POST с обработкой ошибок
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John' }),
})

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}

const data = await response.json()
```

**Проблемы fetch:**

- Не выбрасывает ошибки при HTTP 4xx/5xx (нужна ручная проверка `response.ok`)
- Требует явного вызова `response.json()`
- Нет встроенных интерсепторов
- Сложнее настраивать таймауты
- Нет автоматической отмены запросов

### Axios

```typescript
import axios from 'axios'

// Тот же запрос с Axios
const { data } = await axios.get('https://api.example.com/users')

// POST с автоматической обработкой
const { data } = await axios.post('https://api.example.com/users', {
  name: 'John',
})
```

**Преимущества Axios:**

- Автоматический парсинг JSON
- Выбрасывает ошибки при HTTP 4xx/5xx
- Встроенные интерсепторы (request/response)
- Простая настройка таймаутов
- Автоматическая отмена дублирующихся запросов
- Поддержка прогресса загрузки
- Защита от XSRF из коробки

---

## Установка и базовая настройка

```bash
npm install axios
# или
pnpm add axios
```

### Создание экземпляра с настройками

```typescript
// src/lib/api/axios.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000, // 10 секунд
  headers: {
    'Content-Type': 'application/json',
  },
})
```

Теперь используем настроенный клиент:

```typescript
// Вместо полного URL
const { data } = await apiClient.get('/users')
// Запрос идёт на https://api.example.com/users
```

---

## Интерсепторы: мощь Axios

Интерсепторы позволяют перехватывать запросы и ответы для глобальной обработки.

### Request Interceptor

```typescript
// Добавление токена авторизации ко всем запросам
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Логирование запросов в dev-режиме
    if (import.meta.env.DEV) {
      console.log(`→ ${config.method?.toUpperCase()} ${config.url}`)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
```

### Response Interceptor

```typescript
// Глобальная обработка ошибок
apiClient.interceptors.response.use(
  (response) => {
    // Любой статус 2xx попадает сюда
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Обработка 401: обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post('/auth/refresh', {
          refreshToken: localStorage.getItem('refresh_token'),
        })

        localStorage.setItem('auth_token', data.accessToken)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

        return apiClient(originalRequest) // Повторяем запрос
      } catch (refreshError) {
        // Не удалось обновить токен — редирект на логин
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // Обработка других ошибок
    if (error.response?.status === 403) {
      console.error('Access denied')
    }

    return Promise.reject(error)
  },
)
```

---

## Типизация с TypeScript

### Типизация запросов и ответов

```typescript
// types/api.ts
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, string[]>
}
```

```typescript
// api/users.ts
import { apiClient } from '@/lib/api/axios'
import type { User, PaginatedResponse, ApiError } from '@/types/api'
import type { AxiosError } from 'axios'

export const getUsers = async (page = 1, perPage = 20) => {
  const { data } = await apiClient.get<PaginatedResponse<User>>('/users', {
    params: { page, perPage },
  })
  return data
}

export const getUserById = async (id: number) => {
  const { data } = await apiClient.get<User>(`/users/${id}`)
  return data
}

export const createUser = async (userData: Omit<User, 'id'>) => {
  const { data } = await apiClient.post<User>('/users', userData)
  return data
}

// Типизированная обработка ошибок
export const updateUser = async (id: number, userData: Partial<User>) => {
  try {
    const { data } = await apiClient.patch<User>(`/users/${id}`, userData)
    return data
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>

    if (axiosError.response?.data) {
      throw new Error(axiosError.response.data.message)
    }

    throw new Error('Неизвестная ошибка')
  }
}
```

---

## Интеграция с TanStack Query

Axios идеально работает с TanStack Query для управления серверным состоянием.

### Фабрика ключей

```typescript
// lib/api/query-keys.ts
export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.users.details(), id] as const,
  },
  posts: {
    all: ['posts'] as const,
    // ...
  },
}
```

### Кастомные хуки

```typescript
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/axios'
import { queryKeys } from '@/lib/api/query-keys'
import type { User } from '@/types/api'

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: User[] }>('/users')
      return data.data
    },
    staleTime: 5 * 60 * 1000, // 5 минут
  })
}

export const useUser = (id: number) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/users/${id}`)
      return data
    },
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: Omit<User, 'id'>) => {
      const { data } = await apiClient.post<User>('/users', userData)
      return data
    },
    onSuccess: () => {
      // Инвалидируем список пользователей
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...userData }: Partial<User> & { id: number }) => {
      const { data } = await apiClient.patch<User>(`/users/${id}`, userData)
      return data
    },
    onMutate: async (updatedUser) => {
      // Отменяем текущие запросы
      await queryClient.cancelQueries({
        queryKey: queryKeys.users.detail(updatedUser.id),
      })

      // Сохраняем предыдущее состояние
      const previousUser = queryClient.getQueryData<User>(
        queryKeys.users.detail(updatedUser.id),
      )

      // Оптимистичное обновление
      if (previousUser) {
        queryClient.setQueryData<User>(queryKeys.users.detail(updatedUser.id), {
          ...previousUser,
          ...updatedUser,
        })
      }

      return { previousUser }
    },
    onError: (error, variables, context) => {
      // Откат при ошибке
      if (context?.previousUser) {
        queryClient.setQueryData(
          queryKeys.users.detail(variables.id),
          context.previousUser,
        )
      }
    },
    onSettled: (data, error, variables) => {
      // Всегда инвалидируем после завершения
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.id),
      })
    },
  })
}
```

---

## Best Practices

### 1. Централизуйте настройки

Создайте один экземпляр Axios для всего приложения:

```typescript
// ❌ Плохо
import axios from 'axios'
await axios.get('https://api.example.com/users')

// ✅ Хорошо
import { apiClient } from '@/lib/api/axios'
await apiClient.get('/users')
```

### 2. Используйте интерсепторы для сквозных задач

```typescript
// Добавление request ID для трейсинга
apiClient.interceptors.request.use((config) => {
  config.headers['X-Request-ID'] = crypto.randomUUID()
  return config
})
```

### 3. Типизируйте всё

```typescript
// ❌ Плохо
const response = await apiClient.get('/users')
const users = response.data // any

// ✅ Хорошо
const { data: users } = await apiClient.get<User[]>('/users')
```

### 4. Обрабатывайте ошибки последовательно

```typescript
// Используйте кастомные классы ошибок
if (error instanceof ApiException) {
  // Специфическая обработка
}
```

### 5. Отменяйте запросы при размонтировании

```typescript
useEffect(() => {
  const controller = new AbortController()

  fetchData({ signal: controller.signal })

  return () => controller.abort()
}, [])
```

---

## Заключение

**Axios** остаётся мощным инструментом для работы с HTTP-запросами в 2026 году. В связке с TanStack Query и Zustand вы получаете полноценное решение для управления состоянием приложения:

- **Axios** — для низкоуровневой работы с HTTP
- **TanStack Query** — для управления серверным состоянием
- **Zustand** — для управления клиентским состоянием

**Когда использовать Axios:**

- Сложные приложения с множеством API вызовов
- Нужны интерсепторы для авторизации/логирования
- Требуется прогресс загрузки файлов

**Когда достаточно fetch:**

- Простые приложения с 1-2 эндпоинтами
- Не нужны продвинутые возможности
- Критична минимизация bundle size

В следующей главе мы рассмотрим **SSR и современный React-стек** с Next.js и Server Components.
