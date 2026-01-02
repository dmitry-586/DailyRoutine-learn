# Глава 28. Архитектура больших React-приложений

## Введение

Когда приложение растёт, становится критически важно организовать код так, чтобы он оставался понятным, масштабируемым и поддерживаемым. В этой главе мы рассмотрим подходы к структурированию больших React-приложений.

---

## Разделение ответственности

### Компонентная архитектура

React уже предлагает компонентную модель, но важно правильно разделять ответственность:

**Презентационные компоненты (Presentational):**

- Отвечают только за отображение
- Получают данные через props
- Не содержат бизнес-логику
- Легко переиспользуются

```tsx
// components/UserCard.tsx
interface UserCardProps {
  name: string
  email: string
  avatar: string
}

export function UserCard({ name, email, avatar }: UserCardProps) {
  return (
    <div className='user-card'>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  )
}
```

**Контейнерные компоненты (Container):**

- Содержат бизнес-логику
- Управляют состоянием
- Загружают данные
- Передают данные в презентационные компоненты

```tsx
// containers/UserProfileContainer.tsx
export function UserProfileContainer({ userId }: { userId: number }) {
  const { data: user } = useUser(userId)
  const updateUser = useUpdateUser()

  if (!user) return <Loader />

  return <UserCard {...user} />
}
```

---

## Feature-Sliced Design (FSD)

Одна из популярных методологий для структурирования фронтенда.

### Основные слои

```
src/
├── app/          # Инициализация приложения
├── pages/        # Страницы приложения
├── features/     # Фичи (законченные части функционала)
├── entities/     # Бизнес-сущности
├── shared/       # Переиспользуемый код
└── widgets/      # Композиция фич в виджеты
```

### Пример структуры

```
src/
├── app/
│   ├── layout.tsx
│   └── providers/
│       ├── QueryProvider.tsx
│       └── ThemeProvider.tsx
├── pages/
│   ├── HomePage/
│   └── ProfilePage/
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   └── loginUser.ts
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── components/
│   │       ├── LoginForm.tsx
│   │       └── LogoutButton.tsx
│   └── comments/
│       ├── api/
│       ├── hooks/
│       └── components/
├── entities/
│   ├── user/
│   │   ├── types.ts
│   │   ├── api.ts
│   │   └── hooks.ts
│   └── post/
│       ├── types.ts
│       ├── api.ts
│       └── hooks.ts
├── shared/
│   ├── ui/
│   │   ├── Button/
│   │   └── Input/
│   ├── lib/
│   │   └── utils.ts
│   └── api/
│       └── axios.ts
└── widgets/
    ├── Header/
    └── Sidebar/
```

---

## Управление состоянием

### Разделение типов состояния

**Server State** — данные с сервера:

- Используйте **TanStack Query** (см. главу 23)
- Автоматическое кеширование
- Фоновые обновления
- Retry логика

**Client State** — UI состояние:

- Используйте **Zustand** (см. главу 24)
- Глобальное состояние (theme, sidebar)
- Временное состояние (modals, forms)

**Local State** — локальное состояние компонента:

- Используйте `useState` / `useReducer`
- Состояние внутри компонента
- Не требует глобального доступа

### Пример разделения

```tsx
function Dashboard() {
  // Server state (TanStack Query)
  const { data: users } = useUsers()

  // Client state (Zustand)
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)

  // Local state (useState)
  const [selectedTab, setSelectedTab] = useState('overview')

  return (
    <div>
      {sidebarOpen && <Sidebar />}
      {/* ... */}
    </div>
  )
}
```

---

## Паттерны композиции

### Compound Components

Позволяет создавать гибкие и переиспользуемые компоненты.

```tsx
// components/Tabs/index.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

const TabsContext = createContext<{
  activeTab: string
  setActiveTab: (tab: string) => void
}>(null!)

export function Tabs({
  children,
  defaultTab,
}: {
  children: ReactNode
  defaultTab: string
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className='tabs'>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabList({ children }: { children: ReactNode }) {
  return <div className='tab-list'>{children}</div>
}

export function Tab({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  const { activeTab, setActiveTab } = useContext(TabsContext)

  return (
    <button
      className={activeTab === value ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

export function TabPanel({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  const { activeTab } = useContext(TabsContext)

  if (activeTab !== value) return null

  return <div className='tab-panel'>{children}</div>
}

// Использование
function App() {
  return (
    <Tabs defaultTab='profile'>
      <TabList>
        <Tab value='profile'>Profile</Tab>
        <Tab value='settings'>Settings</Tab>
      </TabList>

      <TabPanel value='profile'>Profile content</TabPanel>
      <TabPanel value='settings'>Settings content</TabPanel>
    </Tabs>
  )
}
```

### Render Props

```tsx
interface MouseTrackerProps {
  render: (position: { x: number; y: number }) => ReactNode
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div onMouseMove={handleMouseMove} style={{ height: '100vh' }}>
      {render(position)}
    </div>
  )
}

// Использование
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <div>
          Mouse position: {x}, {y}
        </div>
      )}
    />
  )
}
```

---

## Работа с формами

Для сложных форм используйте **React Hook Form** (см. главу 22).

### Простой пример

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18),
})

type UserFormData = z.infer<typeof UserSchema>

export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  })

  const onSubmit = (data: UserFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type='number' {...register('age', { valueAsNumber: true })} />
      {errors.age && <span>{errors.age.message}</span>}

      <button type='submit'>Submit</button>
    </form>
  )
}
```

---

## Code Splitting и ленивая загрузка

### Route-based splitting

В Next.js это происходит автоматически:

```tsx
// app/profile/page.tsx
export default function ProfilePage() {
  return <div>Profile</div>
}

// app/settings/page.tsx
export default function SettingsPage() {
  return <div>Settings</div>
}

// Каждая страница — отдельный chunk
```

### Component-based splitting

```tsx
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./components/HeavyChart'))
const DataTable = lazy(() => import('./components/DataTable'))

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<Skeleton />}>
        <HeavyChart />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <DataTable />
      </Suspense>
    </div>
  )
}
```

---

## Error Boundaries

React Error Boundaries для обработки ошибок в компонентах.

```tsx
import { Component, ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>
    }

    return this.props.children
  }
}

// Использование
function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Dashboard />
    </ErrorBoundary>
  )
}
```

---

## Best Practices

### 1. Разделяйте ответственность

```tsx
// ❌ Плохо: всё в одном компоненте
function UserDashboard() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then(setUsers)
  }, [])

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <img src={user.avatar} />
          <h3>{user.name}</h3>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

// ✅ Хорошо: разделение на слои
function UserDashboard() {
  const { data: users } = useUsers() // TanStack Query

  return (
    <div>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

### 2. Используйте кастомные хуки

```tsx
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

// Использование
function SearchInput() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const { data } = useSearchUsers(debouncedSearch)

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />
}
```

### 3. Оптимизируйте ререндеры

```tsx
// ✅ Используйте memo для тяжёлых компонентов
const HeavyComponent = memo(({ data }: { data: ComplexData }) => {
  // Сложные вычисления
  return <div>{/* ... */}</div>
})

// ✅ Используйте useMemo для вычислений
function DataList({ items }: { items: Item[] }) {
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

  return <div>{/* ... */}</div>
}

// ✅ Используйте useCallback для функций
function Parent() {
  const handleClick = useCallback(() => {
    console.log('Clicked')
  }, [])

  return <Child onClick={handleClick} />
}
```

---

## Заключение

**Архитектура больших React-приложений** требует:

- 📦 **Разделение ответственности** — презентационные vs контейнерные компоненты
- 🏗️ **Структурирование** — FSD или альтернативные подходы
- 🔄 **Управление состоянием** — разделение server/client/local state
- 🎯 **Композиция** — Compound Components, Render Props
- ⚡ **Оптимизация** — code splitting, lazy loading, memoization
- 🛡️ **Обработка ошибок** — Error Boundaries

**Ключевые принципы:**

1. Разделяйте server state (TanStack Query) и client state (Zustand)
2. Используйте React Hook Form для сложных форм
3. Применяйте code splitting для больших компонентов
4. Оптимизируйте ререндеры через memo/useMemo/useCallback
5. Используйте Error Boundaries для graceful degradation

В следующей главе мы детально изучим **TanStack Query** для управления серверным состоянием.
