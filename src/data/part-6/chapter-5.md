# Глава 25. TanStack Query: управление серверным состоянием

## Введение

**Server State** отличается от **Client State**: он асинхронный, может устареть, требует кеширования, синхронизации, фоновых обновлений. Управление им через useState/useEffect — антипаттерн.

**TanStack Query** (ранее React Query) — это мощная библиотека для управления серверным состоянием. В 2026 году это стандарт для работы с API в React.

---

## Server State vs Client State

### Client State

```typescript
// ✅ useState для UI состояния
const [isOpen, setIsOpen] = useState(false)
const [theme, setTheme] = useState('light')
const [selectedTab, setSelectedTab] = useState('profile')
```

**Характеристики:**

- Синхронный
- Контролируется приложением
- Не устаревает
- Не требует кеширования

### Server State

```typescript
// ❌ Плохо: useState для серверных данных
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(() => {
  setLoading(true)
  fetch('/api/users')
    .then((r) => r.json())
    .then(setUsers)
    .catch(setError)
    .finally(() => setLoading(false))
}, [])

// Проблемы:
// - Нет кеширования
// - Нет фоновых обновлений
// - Нет повторных запросов при ошибке
// - Нет optimistic updates
// - Много бойлерплейта
```

**Характеристики Server State:**

- Асинхронный
- Может устареть
- Требует кеширования
- Требует синхронизации
- Требует фоновых обновлений

---

## Установка и настройка

```bash
pnpm add @tanstack/react-query
```

### QueryClientProvider

```typescript
// app/layout.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут (ранее cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

## useQuery: получение данных

### Базовое использование

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/axios';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UsersList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await apiClient.get<User[]>('/users');
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Состояния запроса

```typescript
const {
  data,
  error,
  isLoading,      // Первая загрузка
  isFetching,     // Любая загрузка (включая фоновую)
  isSuccess,      // Успешно загружено
  isError,        // Произошла ошибка
  refetch,        // Функция для ручного обновления
  status,         // 'pending' | 'error' | 'success'
  fetchStatus,    // 'fetching' | 'paused' | 'idle'
} = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});

// Показываем скелетон при первой загрузке
if (isLoading) return <Skeleton />;

// Показываем данные + индикатор фоновой загрузки
return (
  <div>
    {isFetching && <Spinner />}
    {data?.map(user => <UserCard key={user.id} {...user} />)}
  </div>
);
```

---

## Фабрика ключей (Query Keys)

**Query Key** — это уникальный идентификатор запроса.

### Иерархическая структура

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
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.posts.lists(), filters] as const,
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

## Кастомные хуки

Инкапсулируйте каждый запрос в отдельный хук.

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

## useMutation: изменение данных

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateUserDTO {
  name: string;
  email: string;
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserDTO) => {
      const { data } = await apiClient.post<User>('/users', userData);
      return data;
    },
    onSuccess: () => {
      // Инвалидация списка пользователей
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.lists(),
      });
    },
  });
};

// Использование
function CreateUserForm() {
  const createUser = useCreateUser();

  const onSubmit = (data: CreateUserDTO) => {
    createUser.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ... */}
      <button disabled={createUser.isPending}>
        {createUser.isPending ? 'Создание...' : 'Создать'}
      </button>
      {createUser.isError && <div>{createUser.error.message}</div>}
    </form>
  );
}
```

---

## Optimistic Updates

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
        queryClient.setQueryData<User>(queryKeys.users.detail(updatedUser.id), {
          ...previousUser,
          ...updatedUser,
        })
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

## Предзагрузка данных

### prefetchQuery - перед навигацией

```typescript
function UserCard({ user }: { user: User }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // Предзагрузка данных при наведении
    queryClient.prefetchQuery({
      queryKey: queryKeys.users.detail(user.id),
      queryFn: () => fetchUser(user.id),
    });
  };

  return (
    <Link
      to={`/users/${user.id}`}
      onMouseEnter={handleMouseEnter}
    >
      {user.name}
    </Link>
  );
}

// Когда пользователь перейдёт, данные уже в кэше!
```

### initialData - из списка

```typescript
function UserProfile({ id }: { id: number }) {
  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => fetchUser(id),
    initialData: () => {
      // Берём данные из списка пользователей
      const users = queryClient.getQueryData<User[]>(queryKeys.users.lists())
      return users?.find((u) => u.id === id)
    },
  })

  // Мгновенная отрисовка если данные были в списке
}
```

---

## Селекторы для оптимизации

Подписываемся только на нужную часть данных.

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

## Точечная инвалидация

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

---

## Глобальная обработка ошибок

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

## Infinite Query (бесконечные списки)

```typescript
export const useInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await apiClient.get<{
        users: User[];
        nextPage: number | null;
      }>('/users', {
        params: { page: pageParam },
      });
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

// Использование
function InfiniteUsersList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers();

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
  );
}
```

### С intersection observer

```typescript
function InfiniteUsersList() {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div>
      {data?.pages.map((page) =>
        page.users.map((user) => <UserCard key={user.id} {...user} />)
      )}

      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
```

---

## Dependent Queries

```typescript
function UserPosts({ userId }: { userId: number }) {
  // Сначала загружаем пользователя
  const { data: user } = useUser(userId);

  // Затем его посты (только если user загружен)
  const { data: posts } = useQuery({
    queryKey: queryKeys.posts.list(`userId:${userId}`),
    queryFn: () => fetchUserPosts(userId),
    enabled: !!user, // Зависимый запрос
  });

  return (
    <div>
      <h1>{user?.name}</h1>
      {posts?.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
```

---

## Интеграция с Axios

```typescript
// lib/api/axios.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// lib/api/users.ts
export const fetchUsers = async () => {
  const { data } = await apiClient.get<User[]>('/users')
  return data
}

export const fetchUser = async (id: number) => {
  const { data } = await apiClient.get<User>(`/users/${id}`)
  return data
}

export const createUser = async (userData: CreateUserDTO) => {
  const { data } = await apiClient.post<User>('/users', userData)
  return data
}

// hooks/useUsers.ts
export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: fetchUsers,
  })
}
```

---

## Best Practices

### 1. Фабрика ключей обязательна

```typescript
// ❌ Плохо: магические строки
useQuery({ queryKey: ['users'], queryFn: fetchUsers })

// ✅ Хорошо: централизованные ключи
useQuery({ queryKey: queryKeys.users.lists(), queryFn: fetchUsers })
```

### 2. Кастомные хуки для каждого запроса

```typescript
// ❌ Плохо: inline запросы в компонентах
function Users() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/users')
      return res.json()
    },
  })
}

// ✅ Хорошо: кастомный хук
export const useUsers = () =>
  useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  })
```

### 3. Оптимистичные обновления для instant UX

```typescript
// Используйте onMutate + setQueryData для мгновенного UI
```

### 4. Точечная инвалидация

```typescript
// ❌ Плохо: инвалидируем всё
queryClient.invalidateQueries({ queryKey: ['users'] })

// ✅ Хорошо: только списки
queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
```

### 5. Предзагрузка по событиям

```typescript
// Prefetch при наведении курсора
onMouseEnter={() => queryClient.prefetchQuery(...)}
```

---

## Заключение

**TanStack Query** — это стандарт для управления серверным состоянием в React:

- **Производительность** — автоматическое кеширование
- **Синхронизация** — фоновые обновления
- **Оптимизация** — селекторы и dedupe
- **DX** — минимум бойлерплейта
- **Devtools** — отладка из коробки

**Ключевые паттерны (2026):**

1. **Фабрика ключей** — централизованные иерархические ключи
2. **Кастомные хуки** — инкапсуляция запросов
3. **Optimistic updates** — мгновенный UI
4. **Предзагрузка** — prefetchQuery перед навигацией
5. **Селекторы** — оптимизация ререндеров
6. **Точечная инвалидация** — predicate для умной инвалидации

В следующей главе мы рассмотрим **Zustand** — минималистичный state manager для клиентского состояния.
