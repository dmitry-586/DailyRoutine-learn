# Глава 53. TanStack Query: мутации, invalidation, optimistic updates, prefetch и infinite queries

Мутации, инвалидация, optimistic updates и prefetch — продвинутые возможности TanStack Query для эффективной работы с изменениями данных и оптимизации UX.

---

## 53.1. useMutation: изменение данных

### Базовое использование

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateUserDTO {
  name: string
  email: string
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: CreateUserDTO) => {
      const { data } = await apiClient.post<User>('/users', userData)
      return data
    },
    onSuccess: () => {
      // Инвалидация списка пользователей
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.lists(),
      })
    },
  })
}

// Использование
function CreateUserForm() {
  const createUser = useCreateUser()

  const onSubmit = (data: CreateUserDTO) => {
    createUser.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ... */}
      <button disabled={createUser.isPending}>
        {createUser.isPending ? 'Создание...' : 'Создать'}
      </button>
      {createUser.isError && <div>{createUser.error.message}</div>}
    </form>
  )
}
```

### Состояния мутации

```typescript
const {
  mutate,
  mutateAsync,
  data,
  error,
  isPending,
  isSuccess,
  isError,
  reset,
} = useMutation({
  mutationFn: createUser,
})
```

---

## 53.2. Invalidation (инвалидация)

Инвалидация помечает данные как устаревшие и вызывает их обновление.

### Точечная инвалидация

```typescript
const queryClient = useQueryClient()

// ❌ Плохо: инвалидация всех пользователей
queryClient.invalidateQueries({ queryKey: ['users'] })

// ✅ Хорошо: только списки
queryClient.invalidateQueries({
  queryKey: queryKeys.users.lists(),
})

// ✅ Хорошо: только конкретный пользователь
queryClient.invalidateQueries({
  queryKey: queryKeys.users.detail(123),
})

// ✅ Хорошо: с предикатом
queryClient.invalidateQueries({
  predicate: (query) => {
    const [entity, type] = query.queryKey
    return entity === 'users' && type === 'list'
  },
})
```

### Инвалидация в мутациях

```typescript
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<User> & { id: number }) => {
      const response = await apiClient.patch<User>(`/users/${id}`, data)
      return response.data
    },
    onSuccess: (data, variables) => {
      // Инвалидация конкретного пользователя
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.id),
      })
      // Инвалидация списков
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.lists(),
      })
    },
  })
}
```

---

## 53.3. Optimistic Updates

Обновляем UI до получения ответа от сервера для мгновенного UX.

```typescript
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<User> & { id: number }) => {
      const response = await apiClient.patch<User>(`/users/${id}`, data)
      return response.data
    },

    // Шаг 1: Отменяем активные запросы
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.users.detail(updatedUser.id),
      })

      // Шаг 2: Сохраняем предыдущее состояние
      const previousUser = queryClient.getQueryData<User>(
        queryKeys.users.detail(updatedUser.id),
      )

      // Шаг 3: Оптимистичное обновление
      if (previousUser) {
        queryClient.setQueryData<User>(
          queryKeys.users.detail(updatedUser.id),
          {
            ...previousUser,
            ...updatedUser,
          },
        )
      }

      // Возвращаем контекст для rollback
      return { previousUser }
    },

    // Шаг 4: Откат при ошибке
    onError: (error, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(
          queryKeys.users.detail(variables.id),
          context.previousUser,
        )
      }
    },

    // Шаг 5: Инвалидация после завершения
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.id),
      })
    },
  })
}
```

---

## 53.4. Prefetch (предзагрузка)

### prefetchQuery — перед навигацией

```typescript
function UserCard({ user }: { user: User }) {
  const queryClient = useQueryClient()

  const handleMouseEnter = () => {
    // Предзагрузка данных при наведении
    queryClient.prefetchQuery({
      queryKey: queryKeys.users.detail(user.id),
      queryFn: () => fetchUser(user.id),
    })
  }

  return (
    <Link to={`/users/${user.id}`} onMouseEnter={handleMouseEnter}>
      {user.name}
    </Link>
  )
}

// Когда пользователь перейдёт, данные уже в кэше!
```

### initialData — из списка

```typescript
function UserProfile({ id }: { id: number }) {
  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => fetchUser(id),
    initialData: () => {
      // Берём данные из списка пользователей
      const users = queryClient.getQueryData<User[]>(
        queryKeys.users.lists(),
      )
      return users?.find((u) => u.id === id)
    },
  })

  // Мгновенная отрисовка если данные были в списке
}
```

---

## 53.5. Infinite Query (бесконечные списки)

Для пагинации и бесконечной прокрутки.

```typescript
export const useInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await apiClient.get<{
        users: User[]
        nextPage: number | null
      }>('/users', {
        params: { page: pageParam },
      })
      return data
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })
}

// Использование
function InfiniteUsersList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers()

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  )
}
```

### С Intersection Observer

```typescript
function InfiniteUsersList() {
  const { ref, inView } = useInView()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div>
      {data?.pages.map((page) =>
        page.users.map((user) => <UserCard key={user.id} {...user} />),
      )}

      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  )
}
```

---

## 53.6. Dependent Queries

Запросы, которые зависят от результата другого запроса.

```typescript
function UserPosts({ userId }: { userId: number }) {
  // Сначала загружаем пользователя
  const { data: user } = useUser(userId)

  // Затем его посты (только если user загружен)
  const { data: posts } = useQuery({
    queryKey: queryKeys.posts.list(`userId:${userId}`),
    queryFn: () => fetchUserPosts(userId),
    enabled: !!user, // Зависимый запрос
  })

  return (
    <div>
      <h1>{user?.name}</h1>
      {posts?.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  )
}
```

---

## 53.7. Глобальная обработка ошибок

```typescript
// app/layout.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Не повторяем при 404
        if (error?.response?.status === 404) return false

        // Не повторяем при 401/403
        if ([401, 403].includes(error?.response?.status)) {
          window.location.href = '/login'
          return false
        }

        // Повторяем 2 раза для сетевых ошибок и 5xx
        return failureCount < 2
      },
      retryDelay: (attemptIndex) => {
        // Exponential backoff: 1s, 2s, 4s
        return Math.min(1000 * 2 ** attemptIndex, 30000)
      },
    },
    mutations: {
      onError: (error: any) => {
        // Глобальная обработка ошибок мутаций
        if (error?.response?.status === 401) {
          window.location.href = '/login'
        }

        // Показываем toast
        toast.error(error?.response?.data?.message || 'Произошла ошибка')
      },
    },
  },
})
```

---

## Вопросы на собеседовании

### 1. Что такое optimistic update?

Обновление UI до получения ответа от сервера для мгновенного UX. При ошибке выполняется откат.

### 2. Как работает invalidation?

Помечает данные как устаревшие и вызывает их обновление. Можно точечно инвалидировать через query keys.

### 3. Зачем нужен prefetch?

Предзагрузка данных перед навигацией для мгновенной отрисовки страницы.

### 4. Что такое infinite query?

Для пагинации и бесконечной прокрутки. Объединяет страницы в один массив.

### 5. Как обрабатывать ошибки в мутациях?

Через `onError` в мутации или глобально в `defaultOptions.mutations.onError`.

---

## Key Takeaways

- `useMutation` для изменения данных
- Invalidation для обновления кеша после мутаций
- Optimistic updates для мгновенного UX
- Prefetch для предзагрузки данных
- Infinite Query для пагинации
- Dependent queries через `enabled`
- Глобальная обработка ошибок в QueryClient

