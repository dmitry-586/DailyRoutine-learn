# Глава 22. Архитектура больших приложений

На этом этапе React перестаёт быть «набором компонентов» и становится платформой для построения сложных систем. Главный вызов больших SPA — управление состоянием, зависимостями и потоками данных.

На собеседованиях эту главу используют, чтобы понять:

- мыслишь ли ты архитектурно;
- умеешь ли масштабировать приложение;
- понимаешь ли trade-off'ы разных подходов;
- можешь ли выбрать правильный инструмент для задачи.

В этой главе разберём:

- Redux Toolkit и когда он оправдан;
- альтернативные state-менеджеры (Zustand, MobX);
- TanStack Query для server state;
- архитектурные паттерны React;
- как не превратить проект в «большой шар грязи».

---

## 22.1. Redux Toolkit: современный способ работы с Redux

Redux Toolkit (RTK) — современный и рекомендуемый способ использования Redux. Redux без RTK сегодня считается устаревшей практикой.

### Ключевые идеи Redux

Redux основан на трёх принципах:

1. **Единое хранилище (single source of truth)** — всё состояние приложения хранится в одном объекте.
2. **Иммутабельные обновления** — состояние нельзя изменять напрямую, только создавать новое.
3. **Однонаправленный поток данных** — данные текут в одном направлении: Action → Reducer → Store → View.

**Почему это важно:**

- **Предсказуемость** — все изменения проходят через один механизм (reducer);
- **Отладка** — можно отследить каждое изменение состояния;
- **Time-travel debugging** — возможность откатывать изменения;
- **Тестируемость** — reducers — чистые функции, легко тестировать.

### Проблемы «старого» Redux

Классический Redux имел проблемы:

- **слишком много boilerplate** — нужно было писать action creators, action types, reducers отдельно;
- **ручная иммутабельность** — нужно было вручную создавать новые объекты, избегая мутаций;
- **сложные async-сценарии** — работа с асинхронностью требовала middleware (redux-thunk, redux-saga).

**Пример старого подхода:**

```javascript
// action types
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

// action creators
function increment() {
  return { type: INCREMENT }
}

// reducer
function counterReducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}
```

Много кода для простой логики!

RTK решает эти проблемы, предоставляя современные инструменты и лучшие практики из коробки.

### createSlice: современный способ создания reducers

`createSlice` объединяет action types, action creators и reducer в одном месте:

```javascript
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value++ // ✅ можно мутировать — Immer под капотом
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

**Что происходит под капотом:**

- RTK использует **Immer** — библиотеку, которая позволяет писать «мутабельный» код, но создаёт иммутабельные обновления;
- автоматически генерируются action types (`counter/increment`, `counter/decrement`) и action creators;
- код становится короче и понятнее.

**Immer в действии:**

```javascript
// Ты пишешь:
state.value++

// Immer делает под капотом:
return { ...state, value: state.value + 1 }
```

### Настройка store

```javascript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**Что даёт `configureStore`:**

- автоматически настраивает Redux DevTools;
- включает redux-thunk для async операций;
- проверяет на мутации в development режиме;
- оптимизирует производительность.

### Использование в компонентах

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { increment } from './counterSlice'

function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  )
}
```

**Типизированные хуки (TypeScript):**

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### Async logic: createAsyncThunk

Для асинхронных операций RTK предоставляет `createAsyncThunk`:

```javascript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await fetch('/api/users')
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  return res.json()
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
```

**В компоненте:**

```jsx
function UsersList() {
  const { items, loading, error } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (loading) return <Spinner />
  if (error) return <Error message={error} />
  return (
    <ul>
      {items.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

**Что делает `createAsyncThunk`:**

- автоматически создаёт три action: `pending`, `fulfilled`, `rejected`;
- обрабатывает ошибки;
- возвращает промис, который можно использовать для дополнительной логики.

### Когда Redux оправдан

Redux стоит использовать, когда:

- **сложные бизнес-процессы** — много взаимосвязанного состояния;
- **много источников данных** — данные приходят из разных API, WebSocket, localStorage;
- **глобальное состояние** — состояние нужно в разных частях приложения;
- **нужен time-travel debugging** — возможность откатывать изменения состояния;
- **большая команда** — нужна предсказуемость и единообразие кода.

### Когда Redux НЕ нужен

Redux не нужен, если:

- **простое локальное состояние** — достаточно `useState`;
- **небольшие приложения** — избыточная сложность;
- **только server state** — используй TanStack Query;
- **нет проблем с проп-дриллингом** — Context API может быть достаточно.

**Правило:** начинай с простого (`useState` → Context → Redux) и усложняй только когда это действительно нужно.

---

## 22.2. Альтернативные state-менеджеры

Redux — не единственный способ управления состоянием. Рассмотрим альтернативы.

### Zustand: минималистичный state manager

Zustand — простой и лёгкий state manager без boilerplate:

```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

// Использование
function Counter() {
  const { count, increment, decrement } = useStore()

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
```

**Преимущества:**

- минималистичный API — нет boilerplate;
- отлично подходит для средних проектов;
- простота использования;
- маленький размер бандла.

**Недостатки:**

- меньше инструментов для отладки, чем у Redux;
- может быть недостаточно для очень сложных приложений.

**Когда использовать:**

- средние проекты;
- когда Redux избыточен;
- нужна простота без потери функциональности.

### MobX: реактивность

MobX использует реактивность — состояние автоматически обновляет компоненты:

```javascript
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

class CounterStore {
  count = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}

const store = new CounterStore()

const Counter = observer(() => {
  return (
    <div>
      <p>{store.count}</p>
      <button onClick={() => store.increment()}>+</button>
      <button onClick={() => store.decrement()}>-</button>
    </div>
  )
})
```

**Преимущества:**

- реактивность — меньше кода для обновлений;
- быстро начать разработку;
- подходит для динамичных интерфейсов;
- объектно-ориентированный подход.

**Недостатки:**

- «магия» под капотом — сложнее отлаживать;
- менее предсказуемо, чем Redux;
- может быть избыточно для простых случаев.

**Когда использовать:**

- высокая динамика интерфейса;
- быстрое прототипирование;
- реактивные интерфейсы.

### Recoil: атомарное состояние

Recoil — экспериментальный state manager от Facebook, использующий атомарное состояние:

```javascript
import { atom, useRecoilState } from 'recoil'

const countState = atom({
  key: 'countState',
  default: 0,
})

function Counter() {
  const [count, setCount] = useRecoilState(countState)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

**Особенности:**

- атомарное состояние — мелкозернистые обновления;
- плотная интеграция с React;
- экспериментальный статус (может измениться).

**Когда использовать:**

- эксперименты;
- атомарное состояние;
- интеграция с React.

### Сравнение state-менеджеров

**Redux Toolkit:**

- Когда использовать: сложная логика, большие команды, нужна предсказуемость.
- Плюсы: предсказуемость, инструменты отладки, большая экосистема.
- Минусы: много boilerplate (хотя RTK это решает), кривая обучения.

**Zustand:**

- Когда использовать: компактные приложения, средние проекты, нужна простота.
- Плюсы: простота, минимализм, легко начать.
- Минусы: меньше инструментов, может быть недостаточно для сложных случаев.

**MobX:**

- Когда использовать: высокая динамика, быстрое прототипирование, реактивные интерфейсы.
- Плюсы: реактивность, меньше кода, быстро.
- Минусы: сложнее отлаживать, менее предсказуемо.

**Recoil:**

- Когда использовать: эксперименты, атомарное состояние, интеграция с React.
- Плюсы: атомарность, интеграция с React.
- Минусы: экспериментальный, может измениться.

---

## 22.3. TanStack Query: управление server state

TanStack Query (ранее React Query) — это **не state manager**, а инструмент для работы с **server state**.

### Server state vs Client state

**Server state:**

- данные, приходящие с сервера (API, БД);
- кэшируются;
- могут устаревать;
- требуют синхронизации с сервером;
- нужна обработка loading/error состояний.

**Client state:**

- локальное состояние UI (открыт ли модал, выбранная вкладка);
- не синхронизируется с сервером;
- управляется через `useState`/`useReducer`.

**Важно:** эти типы состояния требуют разных подходов. Не стоит хранить server state в Redux или Context.

### Базовое использование

```javascript
import { useQuery } from '@tanstack/react-query'

function UsersList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5000, // данные считаются свежими 5 секунд
  })

  if (isLoading) return <Spinner />
  if (error) return <Error message={error.message} />
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

**Настройка QueryClient:**

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersList />
    </QueryClientProvider>
  )
}
```

### Что решает TanStack Query

- **кэширование запросов** — данные кэшируются автоматически;
- **автоматический refetch** — обновление данных при фокусе окна, переподключении сети;
- **loading / error states** — встроенная обработка состояний загрузки и ошибок;
- **дедупликацию запросов** — одинаковые запросы выполняются один раз;
- **оптимистичные обновления** — обновление UI до получения ответа сервера;
- **инвалидацию кэша** — обновление кэша после мутаций.

### Мутации

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // инвалидируем кэш после успешного создания
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return (
    <button onClick={() => mutation.mutate({ name: 'John' })}>
      Create User
    </button>
  )
}
```

### Паттерны TanStack Query

**1. Фабрика ключей:**

Централизуй создание ключей через `queryKeys.ts`:

```javascript
// queryKeys.ts
export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  posts: (userId: string) => ['users', userId, 'posts'] as const,
}
```

**2. Кастомные хуки:**

Инкапсулируй каждый запрос в хук:

```javascript
function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: fetchUsers,
  })
}

function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => fetchUser(id),
    enabled: !!id, // запрос выполнится только если id есть
  })
}
```

**3. Оптимистичные обновления:**

```javascript
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    // отменяем текущие запросы
    await queryClient.cancelQueries({ queryKey: queryKeys.users })

    // сохраняем предыдущее состояние
    const previousUsers = queryClient.getQueryData(queryKeys.users)

    // оптимистично обновляем
    queryClient.setQueryData(queryKeys.users, (old) =>
      old.map((user) => (user.id === newUser.id ? newUser : user)),
    )

    return { previousUsers }
  },
  onError: (err, newUser, context) => {
    // откатываем при ошибке
    queryClient.setQueryData(queryKeys.users, context.previousUsers)
  },
})
```

**4. Предзагрузка:**

```javascript
// при наведении на ссылку
function UserLink({ userId }) {
  const queryClient = useQueryClient()

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.user(userId),
      queryFn: () => fetchUser(userId),
    })
  }

  return (
    <Link to={`/users/${userId}`} onMouseEnter={handleMouseEnter}>
      User
    </Link>
  )
}
```

**5. Селекторы:**

Подписка только на нужные данные:

```javascript
function UserCount() {
  // компонент перерендерится только при изменении длины массива
  const { data: count } = useQuery({
    queryKey: queryKeys.users,
    queryFn: fetchUsers,
    select: (data) => data.length, // подписка только на длину
  })

  return <div>Users: {count}</div>
}
```

### Когда использовать TanStack Query

**Почти всегда, если есть API.** TanStack Query идеален для работы с server state и должен быть первым выбором для запросов к серверу.

---

## 22.4. Архитектурные паттерны React

Архитектурные паттерны помогают структурировать код и делать его более поддерживаемым. В React есть несколько устоявшихся паттернов, которые решают конкретные задачи.

### Render Props

Render Props — паттерн, где компонент принимает функцию как проп и вызывает её для рендеринга:

```jsx
<DataProvider>{(data) => <List data={data} />}</DataProvider>
```

**Реализация:**

```jsx
function DataProvider({ children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return children({ data, loading, error })
}
```

**Использование:**

```jsx
function App() {
  return (
    <DataProvider>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />
        if (error) return <Error message={error.message} />
        return <List items={data} />
      }}
    </DataProvider>
  )
}
```

**Когда использовать:**

- когда нужно передать несколько значений из компонента;
- для переиспользуемой логики с гибким рендерингом.

**Использование сегодня:** редко, но важно знать для понимания паттернов. Часто заменяется хуками.

### HOC (Higher-Order Components)

HOC — функция, которая принимает компонент и возвращает новый компонент:

```jsx
const withAuth = (Component) => (props) =>
  isAuth ? <Component {...props} /> : <Login />

const ProtectedPage = withAuth(Page)
```

**Минусы:**

- сложная вложенность (`withAuth(withTheme(withRouter(Component)))`);
- проблемы с типами в TypeScript;
- сложнее отлаживать.

**Сегодня:** заменяется хуками. Но важно понимать паттерн для работы с legacy кодом.

**Современная альтернатива (хуки):**

```jsx
function useAuth() {
  const [isAuth, setIsAuth] = useState(false)
  // логика авторизации
  return { isAuth }
}

function ProtectedPage() {
  const { isAuth } = useAuth()
  if (!isAuth) return <Login />
  return <Page />
}
```

### Compound Components

Compound Components — паттерн, где компоненты работают вместе через контекст:

```jsx
<Tabs>
  <Tabs.List>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel>Content 1</Tabs.Panel>
  <Tabs.Panel>Content 2</Tabs.Panel>
</Tabs>
```

**Реализация:**

```jsx
const TabsContext = createContext()

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

function TabsList({ children }) {
  return <div className='tabs-list'>{children}</div>
}

function TabsTab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)

  return (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  )
}

Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Panel = TabsPanel
```

**Использование:** в UI-библиотеках (Radix UI, Headless UI). Позволяет создавать гибкие API компонентов.

### Практические рекомендации

**1. Разделяй server и client state:**

- server state → TanStack Query;
- client state → `useState`/`useReducer`/Context/Redux.

**2. Не храни всё в Redux:**

- только глобальное состояние, которое нужно в разных частях приложения;
- локальное состояние — в компонентах.

**3. Начинай с простого:**

- `useState` → Context → Redux;
- усложняй только когда это действительно нужно.

**4. Архитектура — это эволюция:**

- не нужно сразу строить сложную архитектуру;
- добавляй сложность по мере роста проекта.

**5. Используй TanStack Query для server state:**

- почти всегда, если есть API;
- не храни server state в Redux или Context.

**6. Локальное состояние — в компонентах:**

- не поднимай состояние выше, чем нужно;
- используй Context только когда действительно нужно избежать проп-дриллинга.

**7. Глобальное состояние — только когда нужно:**

- не создавай глобальное состояние «на будущее»;
- добавляй только когда появляется реальная необходимость.

---

## 22.5. Структура проекта и организация кода

Правильная структура проекта критична для масштабирования. Рассмотрим основные подходы.

### Feature-Sliced Design (FSD)

FSD — методология организации кода, популярная в React-проектах:

```
src/
  app/           # Инициализация приложения
  pages/         # Страницы приложения
  widgets/       # Крупные блоки (Header, Sidebar)
  features/      # Бизнес-логика (Auth, Cart)
  entities/      # Бизнес-сущности (User, Product)
  shared/        # Переиспользуемый код (UI, utils)
```

**Принципы:**

- изоляция фич друг от друга;
- явные зависимости (верхние слои зависят от нижних);
- переиспользование через shared.

### Модульная структура

Альтернативный подход для небольших проектов:

```
src/
  components/    # UI компоненты
  features/      # Функциональность
  hooks/         # Кастомные хуки
  utils/         # Утилиты
  types/         # TypeScript типы
  api/           # API клиенты
```

### Правила организации

**1. Колокация:**

- держи связанный код рядом (компонент + стили + типы);
- не разноси по папкам то, что используется вместе.

**2. Явные зависимости:**

- избегай циклических зависимостей;
- верхние слои зависят от нижних, не наоборот.

**3. Переиспользование:**

- shared — для действительно общего кода;
- не создавай shared «на будущее».

---

## 22.6. Мини‑самопроверка по главе

Проверь, что ты можешь:

- объяснить, когда нужен Redux, а когда нет, и привести примеры;
- описать преимущества Redux Toolkit над классическим Redux;
- сравнить Redux, Zustand и MobX и объяснить, когда что использовать;
- объяснить разницу между server state и client state;
- описать, что решает TanStack Query и когда его использовать;
- показать пример использования TanStack Query с мутациями и инвалидацией;
- объяснить паттерны TanStack Query (фабрика ключей, кастомные хуки, оптимистичные обновления);
- описать паттерны Render Props, HOC и Compound Components;
- объяснить, почему архитектура — это эволюция, а не догма;
- описать принципы организации кода в больших проектах.

Если это получается связно, ты понимаешь архитектурные подходы и можешь выбрать правильный инструмент для задачи.

---

В следующей главе мы выйдем за рамки чистого клиентского React и посмотрим на то, как он работает вместе с сервером: SSR, SSG, гидратация и современные фреймворки вроде Next.js.
