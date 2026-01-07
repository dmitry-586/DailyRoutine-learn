# Глава 45. Состояние: useState и useReducer

Управление состоянием — основа React-приложений. `useState` и `useReducer` — два основных способа управления состоянием в функциональных компонентах.

---

## 45.1. useState: управление локальным состоянием

### Базовое использование

```jsx
const [count, setCount] = useState(0)
```

`useState` возвращает массив из двух элементов:

1. **Текущее значение состояния** — `count`.
2. **Функция для обновления** — `setCount`.

**Важно понимать:**

- `useState` вызывается **при каждом рендере**, но React запоминает значение между рендерами;
- обновление состояния **асинхронное** — изменения применяются не сразу;
- обновление состояния **вызывает повторный рендер** компонента.

### Функциональное обновление

Когда новое значение зависит от предыдущего, нужно использовать **функциональное обновление**:

```jsx
// Проблема: count может быть устаревшим
setCount(count + 1)
setCount(count + 1) // не сработает как ожидается

// Правильно: гарантирует актуальное значение
setCount((prev) => prev + 1)
setCount((prev) => prev + 1) // теперь работает корректно
```

**Почему это важно:**

- React может батчить (группировать) обновления состояния;
- при батчинге несколько вызовов `setCount(count + 1)` будут использовать одно и то же значение `count`;
- функциональное обновление всегда получает актуальное значение из предыдущего обновления.

### Ленивая инициализация

Если начальное значение дорого вычислять, можно передать функцию:

```jsx
// Плохо: вычисляется при каждом рендере (даже если не используется)
const [data, setData] = useState(expensiveCalculation())

// Хорошо: вычисляется только один раз при первом рендере
const [data, setData] = useState(() => expensiveCalculation())
```

**Когда использовать:**

- когда начальное значение требует сложных вычислений;
- когда нужно прочитать значение из localStorage или другого источника;
- когда инициализация должна происходить только один раз.

### Объекты и массивы в состоянии

При обновлении объектов и массивов нужно создавать **новые** объекты/массивы, а не мутировать существующие:

```jsx
const [user, setUser] = useState({ name: 'John', age: 30 })

// Плохо: мутация — React не заметит изменение
user.age = 31
setUser(user)

// Хорошо: создание нового объекта
setUser({ ...user, age: 31 })

// Или для вложенных объектов
setUser({ ...user, profile: { ...user.profile, email: 'new@email.com' } })
```

**Почему это важно:**

- React сравнивает ссылки на объекты, а не их содержимое;
- если ссылка не изменилась, React считает, что состояние не изменилось;
- это может привести к пропуску обновлений и багам.

### Пример: счётчик

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
```

---

## 45.2. useReducer: управление сложным состоянием

`useReducer` — альтернатива `useState` для сложного состояния с множеством переходов.

### Синтаксис

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
```

### Когда использовать useReducer

**useReducer подходит для:**

- сложной логики обновления состояния (много условий, вложенные объекты);
- состояния с множеством переходов (формы, многошаговые процессы);
- когда логику обновления нужно вынести из компонента;
- подготовки к миграции на Redux (похожий паттерн).

**useState подходит для:**

- простого состояния (число, строка, булево значение);
- независимых значений состояния;
- когда логика обновления простая.

### Преимущества useReducer

- **Централизованная логика** — вся логика обновления в одном месте (reducer);
- **Предсказуемые обновления** — все изменения проходят через reducer;
- **Легче тестировать** — reducer — чистая функция;
- **Поддержка сложных действий** — можно передавать дополнительные данные в `action`.

### Пример: форма с валидацией

```jsx
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field]: action.value,
        },
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value })
    // валидация...
  }

  return <form>{/* поля формы */}</form>
}
```

### Передача данных в action

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) }
    case 'set':
      return { count: action.payload }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>
        +5
      </button>
      <button onClick={() => dispatch({ type: 'set', payload: 100 })}>
        Set to 100
      </button>
    </div>
  )
}
```

### Ленивая инициализация

Как и в `useState`, можно передать функцию для инициализации начального состояния:

```jsx
function init(initialCount) {
  return { count: initialCount }
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'reset':
      return init(action.payload)
    default:
      return state
  }
}

function Counter({ initialCount = 0 }) {
  // Третий параметр — функция инициализации
  const [state, dispatch] = useReducer(reducer, initialCount, init)

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button
        onClick={() => dispatch({ type: 'reset', payload: initialCount })}
      >
        Reset
      </button>
    </div>
  )
}
```

**Когда использовать:** когда начальное состояние требует вычислений или чтения из localStorage.

### Типизация с TypeScript

Для типобезопасности определите типы для state и action:

```tsx
interface CounterState {
  count: number
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number }

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    case 'set':
      return { count: action.payload }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  // TypeScript знает типы state и action
}
```

### Action Creators

Для удобства создавайте функции-создатели действий:

```tsx
const increment = () => ({ type: 'increment' as const })
const decrement = () => ({ type: 'decrement' as const })
const setCount = (payload: number) => ({ type: 'set' as const, payload })

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(setCount(100))}>Set to 100</button>
    </div>
  )
}
```

**Преимущества:** централизованное управление действиями, меньше опечаток, легче рефакторить.

### Интеграция с Context API

`useReducer` часто используется вместе с Context для глобального состояния:

```tsx
interface AppState {
  user: User | null
  theme: 'light' | 'dark'
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light',
  })

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
```

**Когда использовать:** для простого глобального состояния без необходимости в Redux.

---

## 45.3. Сравнение useState и useReducer

**useState:**

- Простота: проще
- Логика: в компоненте
- Тестируемость: сложнее
- Сложное состояние: неудобно
- Множество действий: много setState
- Предсказуемость: меньше

**useReducer:**

- Простота: сложнее
- Логика: в reducer
- Тестируемость: легче (чистая функция)
- Сложное состояние: удобно
- Множество действий: один dispatch
- Предсказуемость: больше

**Правило выбора:**

- **useState** — для простого состояния (число, строка, булево значение, простой объект).
- **useReducer** — для сложного состояния с множеством переходов (формы, многошаговые процессы, сложная логика).

---

## 45.4. Типичные ошибки

### 1. Мутация состояния

```jsx
// Плохо
const [items, setItems] = useState([1, 2, 3])
items.push(4)
setItems(items)

// Хорошо
setItems([...items, 4])
```

### 2. Забытое функциональное обновление

```jsx
// Проблема при батчинге
setCount(count + 1)
setCount(count + 1)

// Правильно
setCount((prev) => prev + 1)
setCount((prev) => prev + 1)
```

### 3. Неправильная инициализация

```jsx
// Плохо: вычисляется при каждом рендере
const [data, setData] = useState(expensiveCalculation())

// Хорошо: вычисляется один раз
const [data, setData] = useState(() => expensiveCalculation())
```

---

## Вопросы на собеседовании

### 1. В чём разница между useState и useReducer?

`useState` для простого состояния, `useReducer` для сложного состояния с множеством переходов. `useReducer` централизует логику обновления в reducer.

### 2. Когда использовать функциональное обновление?

Когда новое значение зависит от предыдущего, особенно при батчинге обновлений.

### 3. Почему нужно создавать новые объекты/массивы?

React сравнивает ссылки, а не содержимое. Если ссылка не изменилась, React не заметит изменение.

### 4. Зачем нужна ленивая инициализация?

Чтобы дорогие вычисления выполнялись только один раз при первом рендере, а не при каждом.

### 5. Когда использовать useReducer вместо useState?

Для сложного состояния с множеством переходов, когда логику обновления нужно вынести из компонента.
