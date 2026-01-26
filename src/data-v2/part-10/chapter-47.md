# Глава 47. Context API и перерендеры

Context API позволяет передавать данные через дерево компонентов без явной передачи пропсов на каждом уровне. Но важно понимать: Context — это **способ доставки данных**, а не система управления состоянием. Неправильное использование может привести к проблемам с производительностью.

---

## 47.1. Context как способ доставки данных

Context API решает проблему «прокидывания пропсов» через множество уровней компонентов. Вместо того чтобы передавать данные через каждый уровень, ты создаёшь контекст и «доставляешь» данные напрямую тем компонентам, которым они нужны.

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

Часто контекст используется вместе с состоянием:

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

## 47.2. Эффект домино: главная проблема Context

При изменении значения контекста **все** компоненты, использующие этот контекст, перерендериваются, даже если они используют только часть данных. Это «эффект домино» — изменение одного маленького значения заставляет перерендериваться всех подписчиков.

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

**Проблема:** изменение `theme` вызывает ререндер `UserProfile`, хотя он использует только `user`. Изменение `user` вызывает ререндер `ThemeSwitcher`, хотя он использует только `theme`. Это неэффективно и может привести к проблемам производительности.

### Решение: разделение контекстов

Разделяй контексты по частоте обновления и области использования:

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

Теперь каждый компонент подписывается только на нужный контекст и ререндерится только при изменении релевантных данных.

---

## 47.3. Объекты в value: проблема с ререндерами

Если передавать объект напрямую, он создаётся заново при каждом рендере:

```jsx
// Плохо: новый объект при каждом рендере
function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Child />
    </UserContext.Provider>
  )
}
```

**Проблема:** новый объект при каждом рендере вызывает ререндер всех потребителей, даже если `user` не изменился.

**Решение: мемоизация**

```jsx
// Хорошо: объект мемоизирован
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

Мемоизация гарантирует, что объект создаётся заново только при изменении `user`.

---

## 47.4. Context — не замена Redux

Важно понимать разницу:

- **Context API** — это способ доставки данных. Он простой, встроенный в React, но не подходит для частых обновлений и сложного состояния.
- **Redux** — это система управления данными. Он предоставляет middleware, time-travel debugging, селекторы и другие возможности для сложных приложений.

**Context API подходит для:**

- темы (light/dark);
- языка интерфейса;
- данных пользователя (если не меняются часто);
- простого глобального состояния.

**Context API НЕ подходит для:**

- частых обновлений (каждое обновление → ререндер всех потребителей);
- сложного состояния (много переходов, middleware);
- когда нужны селекторы, time-travel debugging и другие возможности Redux.

### Альтернативы

- **Zustand** — для клиентского состояния (проще Redux, мощнее Context);
- **TanStack Query** — для серверного состояния (кэширование, синхронизация);
- **Redux** — для сложного состояния с middleware.

---

## 47.5. Оптимизация Context API

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

### Разделение на State и Dispatch

Более продвинутый паттерн — разделить состояние и функции обновления:

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

Компоненты, которым нужна только функция обновления, не будут ререндериться при изменении состояния.

---

## 47.6. Паттерны использования

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

Кастомный хук `useAuth` инкапсулирует логику работы с контекстом и предоставляет удобный API.

---

## Вопросы на собеседовании

### 1. В чём проблема Context API с производительностью?

При изменении значения контекста все потребители перерендериваются, даже если используют только часть данных. Это «эффект домино» — изменение одного значения заставляет перерендериваться всех подписчиков.

### 2. Как оптимизировать Context API?

Разделять контексты по частоте обновления и области использования, мемоизировать значения, разделять State и Dispatch. Это предотвращает лишние ререндеры и улучшает производительность.

### 3. Когда использовать Context API?

Для редко меняющихся данных (тема, язык, данные пользователя). Не для частых обновлений — каждое обновление вызывает ререндер всех потребителей.

### 4. В чём разница между Context API и Redux?

Context API — это способ доставки данных, простой и встроенный в React. Redux — это система управления данными с middleware, time-travel debugging, селекторами. Context подходит для простого состояния, Redux — для сложного.

### 5. Как предотвратить ререндеры при использовании Context?

Разделять контексты, мемоизировать значения, использовать разделение State и Dispatch. Компоненты будут ререндериться только при изменении релевантных данных.
