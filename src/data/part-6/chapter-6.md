# Глава 26. Zustand: минималистичный state manager

## Введение

Redux тяжёлый. Context API вызывает лишние ререндеры. **Zustand** — это минималистичный state manager с простым API, без бойлерплейта и отличной производительностью.

В 2026 году Zustand — популярный выбор для client state в React-приложениях.

---

## Проблемы Context API

```typescript
// ❌ Проблема: Context вызывает ререндер всех потребителей
const UserContext = createContext<{
  user: User | null;
  theme: 'light' | 'dark';
  setUser: (user: User) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}>(null!);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <UserContext.Provider value={{ user, theme, setUser, setTheme }}>
      <Header />
      <Main />
      <Footer />
    </UserContext.Provider>
  );
}

// Компонент Header ререндерится даже при изменении только user
function Header() {
  const { theme } = useContext(UserContext);
  // Ререндер при изменении user, хотя используем только theme
  return <header>{theme}</header>;
}
```

**Проблемы Context API:**

- 📦 Ререндер всех потребителей при любом изменении
- 🔧 Сложно разделить логику
- 🎯 Нет селекторов
- 📝 Много бойлерплейта

---

## Установка и базовое использование

```bash
pnpm add zustand
```

### Создание store

```typescript
// stores/userStore.ts
import { create } from 'zustand'

interface User {
  id: number
  name: string
  email: string
}

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
```

### Использование

```typescript
function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={() => setUser({ id: 1, name: 'John', email: 'john@example.com' })}>
        Login
      </button>
    </div>
  );
}

function Header() {
  const user = useUserStore((state) => state.user);
  // Ререндер только при изменении user
  return <header>Welcome, {user?.name}</header>;
}
```

---

## Селекторы для оптимизации

```typescript
// ❌ Плохо: подписка на весь store
function Component() {
  const store = useUserStore();
  // Ререндер при изменении ЛЮБОГО поля
  return <div>{store.user?.name}</div>;
}

// ✅ Хорошо: селектор для конкретного поля
function Component() {
  const userName = useUserStore((state) => state.user?.name);
  // Ререндер только при изменении user.name
  return <div>{userName}</div>;
}

// ✅ Хорошо: множественные значения
function Component() {
  const { user, setUser } = useUserStore(
    (state) => ({
      user: state.user,
      setUser: state.setUser,
    }),
    shallow // Поверхностное сравнение для объектов
  );
}
```

### Реэкспорт селекторов

```typescript
// stores/userStore.ts
export const useUserStore = create<UserState>(/* ... */)

// Реэкспорт селекторов для удобства
export const useUser = () => useUserStore((state) => state.user)
export const useSetUser = () => useUserStore((state) => state.setUser)

// Использование
function Component() {
  const user = useUser() // Удобно!
  const setUser = useSetUser()
}
```

---

## Асинхронные действия

```typescript
import { create } from 'zustand'
import { apiClient } from '@/lib/api/axios'

interface TodoState {
  todos: Todo[]
  isLoading: boolean
  error: string | null

  fetchTodos: () => Promise<void>
  addTodo: (text: string) => Promise<void>
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => Promise<void>
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await apiClient.get<Todo[]>('/todos')
      set({ todos: data, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  addTodo: async (text) => {
    try {
      const { data } = await apiClient.post<Todo>('/todos', { text })
      set((state) => ({ todos: [...state.todos, data] }))
    } catch (error) {
      set({ error: error.message })
    }
  },

  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }))
  },

  deleteTodo: async (id) => {
    try {
      await apiClient.delete(`/todos/${id}`)
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }))
    } catch (error) {
      set({ error: error.message })
    }
  },
}))
```

---

## Middleware

### persist - сохранение в localStorage

```bash
pnpm add zustand/middleware
```

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage', // Ключ в localStorage
    },
  ),
)
```

### devtools - интеграция с Redux DevTools

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }, false, 'setUser'), // Имя действия
      clearUser: () => set({ user: null }, false, 'clearUser'),
    }),
    { name: 'UserStore' }, // Имя store в DevTools
  ),
)
```

### immer - иммутабельные обновления

```typescript
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UserState {
  profile: {
    name: string
    settings: {
      notifications: boolean
      theme: string
    }
  }
  updateNotifications: (enabled: boolean) => void
}

export const useUserStore = create<UserState>()(
  immer((set) => ({
    profile: {
      name: 'John',
      settings: {
        notifications: true,
        theme: 'light',
      },
    },

    updateNotifications: (enabled) =>
      set((state) => {
        // Мутируем напрямую благодаря immer
        state.profile.settings.notifications = enabled
      }),
  })),
)
```

### Комбинирование middleware

```typescript
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      immer((set) => ({
        // ...
      })),
      { name: 'user-storage' },
    ),
    { name: 'UserStore' },
  ),
)
```

---

## Разделение store (slices)

Для больших приложений разделяйте store на слайсы.

```typescript
// stores/slices/userSlice.ts
import type { StateCreator } from 'zustand'

export interface UserSlice {
  user: User | null
  setUser: (user: User | null) => void
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
})

// stores/slices/settingsSlice.ts
export interface SettingsSlice {
  theme: 'light' | 'dark'
  language: string
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: string) => void
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  theme: 'light',
  language: 'en',
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
})

// stores/index.ts
import { create } from 'zustand'
import { createUserSlice, type UserSlice } from './slices/userSlice'
import { createSettingsSlice, type SettingsSlice } from './slices/settingsSlice'

type AppState = UserSlice & SettingsSlice

export const useAppStore = create<AppState>()((...a) => ({
  ...createUserSlice(...a),
  ...createSettingsSlice(...a),
}))
```

---

## Интеграция с TanStack Query

**Zustand** — для client state, **TanStack Query** — для server state.

```typescript
// stores/uiStore.ts
interface UIState {
  sidebarOpen: boolean;
  selectedTab: string;
  toggleSidebar: () => void;
  setSelectedTab: (tab: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  selectedTab: 'profile',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSelectedTab: (tab) => set({ selectedTab: tab }),
}));

// Компонент использует оба
function Dashboard() {
  // Server state (TanStack Query)
  const { data: users } = useUsers();

  // Client state (Zustand)
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <div>
      {sidebarOpen && <Sidebar />}
      <UserList users={users} />
    </div>
  );
}
```

---

## Сравнение: Zustand vs Redux vs Context

| Критерий           | Zustand     | Redux   | Context API          |
| ------------------ | ----------- | ------- | -------------------- |
| Бойлерплейт        | Минимальный | Много   | Средний              |
| Bundle size        | ~1KB        | ~15KB   | 0 (встроен)          |
| Производительность | ⚡⚡⚡      | ⚡⚡    | ⚡ (без оптимизации) |
| DevTools           | ✅          | ✅      | ❌                   |
| Middleware         | ✅          | ✅      | ❌                   |
| Селекторы          | ✅          | ✅      | ❌ (без библиотек)   |
| TypeScript         | Отличная    | Хорошая | Встроенная           |
| Learning curve     | Низкая      | Высокая | Низкая               |

**Выбор в 2026:**

- **Zustand** — для большинства проектов
- **Redux** — если нужны сложные middleware или строгая архитектура
- **Context** — для простых случаев (theme, i18n)

---

## Паттерны для больших приложений

### Фабрика действий

```typescript
// utils/createActions.ts
export const createActions = <T extends object>(
  set: (fn: (state: T) => void) => void,
) => ({
  reset: (initialState: T) => set(() => initialState),
  patch: (updates: Partial<T>) => set((state) => ({ ...state, ...updates })),
})

// stores/userStore.ts
export const useUserStore = create<UserState>()((set, get) => ({
  user: null,
  isLoading: false,

  ...createActions(set),

  fetchUser: async (id: number) => {
    set({ isLoading: true })
    const user = await fetchUserAPI(id)
    set({ user, isLoading: false })
  },
}))

// Использование
useUserStore.getState().reset({ user: null, isLoading: false })
useUserStore.getState().patch({ isLoading: true })
```

### Computed values (derived state)

```typescript
interface CartState {
  items: CartItem[];

  // Действия
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;

  // Computed getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),

  // Computed values
  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));

// Использование
function Cart() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  return (
    <div>
      {items.map((item) => <CartItem key={item.id} {...item} />)}
      <div>Total: ${getTotalPrice()}</div>
    </div>
  );
}
```

---

## Подписка вне React

```typescript
// Подписка на изменения store
const unsubscribe = useUserStore.subscribe(
  (state) => state.user,
  (user) => {
    console.log('User changed:', user)
  },
)

// Отписка
unsubscribe()

// Получение состояния вне компонента
const user = useUserStore.getState().user

// Изменение состояния вне компонента
useUserStore.getState().setUser({ id: 1, name: 'John' })
```

### Синхронизация с localStorage

```typescript
// Сохранение в localStorage при каждом изменении
useUserStore.subscribe((state) => {
  localStorage.setItem('user', JSON.stringify(state.user))
})

// Восстановление при загрузке
const savedUser = localStorage.getItem('user')
if (savedUser) {
  useUserStore.getState().setUser(JSON.parse(savedUser))
}
```

---

## Testing

```typescript
// userStore.test.ts
import { renderHook, act } from '@testing-library/react'
import { useUserStore } from './userStore'

describe('useUserStore', () => {
  beforeEach(() => {
    // Сброс store перед каждым тестом
    useUserStore.setState({ user: null })
  })

  it('sets user', () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.setUser({ id: 1, name: 'John' })
    })

    expect(result.current.user).toEqual({ id: 1, name: 'John' })
  })

  it('clears user', () => {
    const { result } = renderHook(() => useUserStore())

    act(() => {
      result.current.setUser({ id: 1, name: 'John' })
      result.current.clearUser()
    })

    expect(result.current.user).toBeNull()
  })
})
```

---

## Best Practices

### 1. Используйте селекторы

```typescript
// ❌ Плохо: подписка на весь store
const store = useUserStore()

// ✅ Хорошо: селектор
const user = useUserStore((state) => state.user)
```

### 2. Разделяйте server и client state

```typescript
// ✅ Client state (UI, форма) → Zustand
const sidebarOpen = useUIStore((state) => state.sidebarOpen)

// ✅ Server state (API данные) → TanStack Query
const { data: users } = useUsers()
```

### 3. Используйте TypeScript

```typescript
// ✅ Всегда типизируйте state
interface UserState {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>(/* ... */)
```

### 4. Реэкспортируйте селекторы

```typescript
// ✅ Удобные хуки для часто используемых значений
export const useUser = () => useUserStore((state) => state.user)
export const useTheme = () => useThemeStore((state) => state.theme)
```

### 5. Используйте middleware

```typescript
// ✅ persist для сохранения, devtools для отладки
export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        /* ... */
      }),
      { name: 'settings' },
    ),
  ),
)
```

---

## Миграция с Redux

### Было (Redux):

```typescript
// actions.ts
export const setUser = (user: User) => ({
  type: 'SET_USER',
  payload: user,
})

// reducer.ts
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

// Component
const user = useSelector((state) => state.user.user)
const dispatch = useDispatch()
dispatch(setUser(newUser))
```

### Стало (Zustand):

```typescript
// userStore.ts
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

// Component
const user = useUserStore((state) => state.user)
const setUser = useUserStore((state) => state.setUser)
setUser(newUser)
```

**Выигрыш:**

- 📝 В 3-4 раза меньше кода
- 🚀 Проще понять
- ⚡ Лучше производительность

---

## Заключение

**Zustand** — это современный minimalistic state manager:

- 🎯 **Простота** — минимальный API, нет бойлерплейта
- ⚡ **Производительность** — селекторы предотвращают лишние ререндеры
- 📦 **Размер** — всего 1KB
- 🔧 **Middleware** — persist, devtools, immer
- 🔒 **TypeScript** — отличная поддержка

**Когда использовать:**

- ✅ Client state (UI, формы, настройки)
- ✅ Глобальное состояние (user, theme)
- ✅ Временное состояние (modals, tooltips)

**Когда НЕ использовать:**

- ❌ Server state → используйте TanStack Query
- ❌ Сложные workflows → рассмотрите XState
- ❌ Нужна time-travel отладка → Redux

В следующей главе мы рассмотрим **SSR и современный React-стек** с Next.js и App Router.
