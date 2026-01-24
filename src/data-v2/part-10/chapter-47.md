# Глава 47. Context API и перерендеры

Context API позволяет передавать данные через дерево компонентов без явной передачи пропсов на каждом уровне. Однако неправильное использование может привести к проблемам с производительностью.

---

## 47.1. Создание и использование контекста

### Базовое использование

```jsx
const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value='dark'>
      <Child />
    </ThemeContext.Provider>
  )
}

function Child() {
  const theme = useContext(ThemeContext)
  return <div className={theme}>Content</div>
}
```

### Контекст с состоянием

```jsx
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Child />
    </ThemeProvider>
  )
}

function Child() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}
```

---

## 47.2. Проблемы Context API

### 1. Ререндер всех потребителей

При изменении значения контекста **все** компоненты, использующие этот контекст, перерендериваются, даже если они используют только часть данных:

```jsx
const AppContext = createContext({ user: null, theme: 'light' })

function App() {
  const [state, setState] = useState({ user: null, theme: 'light' })

  return (
    <AppContext.Provider value={state}>
      <UserProfile /> {/* перерендерится при изменении theme */}
      <ThemeSwitcher /> {/* перерендерится при изменении user */}
    </AppContext.Provider>
  )
}
```

**Проблема:** изменение `theme` вызывает ререндер `UserProfile`, хотя он использует только `user`.

### Решение: разделение контекстов

```jsx
const UserContext = createContext(null)
const ThemeContext = createContext('light')

function App() {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <UserProfile /> {/* перерендерится только при изменении user */}
        <ThemeSwitcher /> {/* перерендерится только при изменении theme */}
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}
```

### 2. Объекты в value

Если передавать объект напрямую, он создаётся заново при каждом рендере:

```jsx
//  Плохо: новый объект при каждом рендере
function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Child />
    </UserContext.Provider>
  )
}
```

**Проблема:** новый объект при каждом рендере вызывает ререндер всех потребителей.

**Решение: мемоизация**

```jsx
//  Хорошо: объект мемоизирован
function App() {
  const [user, setUser] = useState(null)

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  )

  return (
    <UserContext.Provider value={value}>
      <Child />
    </UserContext.Provider>
  )
}
```

### 3. Context — не замена Redux

Context API подходит для:

- темы, языка интерфейса;
- данных пользователя (если не меняются часто);
- простого глобального состояния.

Context API НЕ подходит для:

- сложного состояния с множеством переходов;
- частых обновлений (каждое обновление вызывает ререндер всех потребителей);
- когда нужны middleware, time-travel debugging и другие возможности Redux.

---

## 47.3. Оптимизация Context API

### Разделение контекстов

Разделяй контексты по частоте обновления и области использования:

```jsx
// Контекст для редко меняющихся данных
const UserContext = createContext(null)

// Контекст для часто меняющихся данных
const UIStateContext = createContext({
  sidebarOpen: false,
  modalOpen: false,
})
```

### Мемоизация значения

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
      },
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### Селекторы (как в Redux)

Можно создать хук с селектором для подписки только на нужную часть контекста:

```jsx
function useTheme() {
  const context = useContext(ThemeContext)
  return context.theme
}

function useToggleTheme() {
  const context = useContext(ThemeContext)
  return context.toggleTheme
}

// Использование
function Component() {
  const theme = useTheme() // подписывается только на theme
  const toggleTheme = useToggleTheme() // подписывается только на toggleTheme
}
```

Однако это не предотвращает ререндеры полностью — React всё равно ререндерит при изменении контекста.

### Разделение на Provider и Consumer

```jsx
const ThemeStateContext = createContext(null)
const ThemeDispatchContext = createContext(null)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={setTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  )
}

function useThemeState() {
  return useContext(ThemeStateContext)
}

function useThemeDispatch() {
  return useContext(ThemeDispatchContext)
}

// Использование
function Component() {
  const theme = useThemeState() // ререндерится только при изменении theme
  const setTheme = useThemeDispatch() // не ререндерится (функция стабильна)
}
```

---

## 47.4. Паттерны использования

### Паттерн: Provider с хуками

```jsx
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Загрузка пользователя
    fetchUser().then((user) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (credentials) => {
        const user = await login(credentials)
        setUser(user)
      },
      logout: () => {
        setUser(null)
      },
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### Паттерн: разделение State и Dispatch

```jsx
const CountStateContext = createContext(0)
const CountDispatchContext = createContext(null)

function CountProvider({ children }) {
  const [count, setCount] = useState(0)

  return (
    <CountStateContext.Provider value={count}>
      <CountDispatchContext.Provider value={setCount}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

function useCountState() {
  return useContext(CountStateContext)
}

function useCountDispatch() {
  return useContext(CountDispatchContext)
}
```

---

## 47.5. Когда использовать Context API

###  Подходит для

- Тема (light/dark)
- Язык интерфейса
- Данные пользователя (редко меняются)
- Простое глобальное состояние

###  НЕ подходит для

- Частые обновления (каждое обновление → ререндер всех потребителей)
- Сложное состояние (много переходов, middleware)
- Когда нужны селекторы, time-travel debugging

### Альтернативы

- **Zustand** — для клиентского состояния
- **TanStack Query** — для серверного состояния
- **Redux** — для сложного состояния с middleware

---

## Вопросы на собеседовании

### 1. В чём проблема Context API с производительностью?

При изменении значения контекста все потребители перерендериваются, даже если используют только часть данных.

### 2. Как оптимизировать Context API?

Разделять контексты, мемоизировать значения, разделять State и Dispatch.

### 3. Когда использовать Context API?

Для редко меняющихся данных (тема, язык, данные пользователя). Не для частых обновлений.

### 4. В чём разница между Context API и Redux?

Context API проще, но не подходит для сложного состояния и частых обновлений. Redux предоставляет middleware, time-travel debugging, селекторы.

### 5. Как предотвратить ререндеры при использовании Context?

Разделять контексты, мемоизировать значения, использовать селекторы (частично помогает).
