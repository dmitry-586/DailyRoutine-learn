# Глава 60. Архитектура фронтенда: разделение ответственности, слои и Feature-Sliced Design

Когда приложение растёт, становится критически важно организовать код так, чтобы он оставался понятным, масштабируемым и поддерживаемым. Правильная архитектура — основа успешного проекта.

---

## 60.1. Разделение ответственности

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
    <div className="user-card">
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

## 60.2. Feature-Sliced Design (FSD)

Feature-Sliced Design — популярная методология для структурирования фронтенда.

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

### Правила FSD

1. **Импорты только вниз** — слой может импортировать только из слоёв ниже
2. **Изоляция фич** — фичи не зависят друг от друга
3. **Переиспользование** — shared для общего кода
4. **Композиция** — widgets собирают фичи вместе

---

## 60.3. Управление состоянием

### Разделение типов состояния

**Server State** — данные с сервера:

- Используйте **TanStack Query**
- Автоматическое кеширование
- Фоновые обновления
- Retry логика

**Client State** — UI состояние:

- Используйте **Zustand** или **Context API**
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

## 60.4. Паттерны композиции

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
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

export function TabList({ children }: { children: ReactNode }) {
  return <div className="tab-list">{children}</div>
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

  return <div className="tab-panel">{children}</div>
}

// Использование
function App() {
  return (
    <Tabs defaultTab="profile">
      <TabList>
        <Tab value="profile">Profile</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>

      <TabPanel value="profile">Profile content</TabPanel>
      <TabPanel value="settings">Settings content</TabPanel>
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

## 60.5. Code Splitting и ленивая загрузка

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

## 60.6. Best Practices

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

## 60.7. Структура проекта

### Рекомендуемая структура

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── (routes)/
├── features/               # Фичи
│   ├── auth/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── components/
│   └── products/
├── entities/              # Бизнес-сущности
│   ├── user/
│   └── product/
├── shared/                # Переиспользуемый код
│   ├── ui/               # UI компоненты
│   ├── lib/              # Утилиты
│   └── api/              # API клиент
└── widgets/               # Виджеты
    ├── Header/
    └── Sidebar/
```

### Правила организации

1. **Один файл — одна ответственность**
2. **Именование по функциональности**, а не по типу
3. **Изоляция фич** — фичи не зависят друг от друга
4. **Переиспользование через shared**
5. **Композиция через widgets**

---

## Вопросы на собеседовании

### 1. Как организовать большую кодовую базу?

Разделение на слои (FSD), разделение ответственности, изоляция фич.

### 2. В чём разница между Presentational и Container компонентами?

Presentational — только отображение, Container — логика и состояние.

### 3. Что такое Feature-Sliced Design?

Методология структурирования фронтенда с разделением на слои: app, pages, features, entities, shared, widgets.

### 4. Как разделять типы состояния?

Server state → TanStack Query, Client state → Zustand/Context, Local state → useState.

### 5. Зачем нужен code splitting?

Уменьшение начального бандла, быстрая загрузка первой страницы.

---

## Key Takeaways

- Разделение ответственности критично для масштабируемости
- Feature-Sliced Design — популярная методология структурирования
- Presentational vs Container компоненты
- Разделение типов состояния (Server/Client/Local)
- Compound Components и Render Props для композиции
- Code splitting для оптимизации бандла
- Правильная структура проекта упрощает поддержку
- Кастомные хуки для переиспользования логики
- Оптимизация ререндеров через memo/useMemo/useCallback

