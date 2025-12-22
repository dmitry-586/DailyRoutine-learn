# Глава 19. Хуки и управление состоянием

Хуки — это механизм, который позволил React отказаться от классов и сделать логику компонентов **компонуемой и переиспользуемой**.

На собеседованиях хуки — одна из самых частых тем: ошибки в `useEffect`, неправильные зависимости и лишние ререндеры быстро показывают реальный уровень кандидата.

В этой главе разберём:

- как работают основные хуки (`useState`, `useEffect`, `useMemo`, `useCallback`);
- правила хуков и почему их нельзя нарушать;
- типичные ошибки и как их избежать;
- кастомные хуки для переиспользования логики;
- Context API и его ограничения.

---

## 19.1. useState: управление локальным состоянием

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
// ❌ Проблема: count может быть устаревшим
setCount(count + 1)
setCount(count + 1) // не сработает как ожидается

// ✅ Правильно: гарантирует актуальное значение
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
// ❌ Вычисляется при каждом рендере (даже если не используется)
const [data, setData] = useState(expensiveCalculation())

// ✅ Вычисляется только один раз при первом рендере
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

// ❌ Мутация — React не заметит изменение
user.age = 31
setUser(user)

// ✅ Создание нового объекта
setUser({ ...user, age: 31 })

// Или для вложенных объектов
setUser({ ...user, profile: { ...user.profile, email: 'new@email.com' } })
```

**Почему это важно:**

- React сравнивает ссылки на объекты, а не их содержимое;
- если ссылка не изменилась, React считает, что состояние не изменилось;
- это может привести к пропуску обновлений и багам.

---

## 19.2. useEffect: побочные эффекты в функциональных компонентах

`useEffect` используется для побочных эффектов:

- запросы к API;
- подписки на события;
- таймеры и интервалы;
- работа с DOM напрямую;
- синхронизация с внешними системами.

### Синтаксис

```jsx
useEffect(() => {
  // effect — код, который выполняется
  return () => {
    // cleanup — код, который выполняется перед следующим эффектом или размонтированием
  }
}, [deps]) // массив зависимостей
```

### Массив зависимостей

**deps отсутствует:**

```jsx
useEffect(() => {
  console.log('Выполняется при каждом рендере')
})
```

**Поведение:** эффект выполняется **при каждом рендере**. Обычно это антипаттерн.

**deps = `[]`:**

```jsx
useEffect(() => {
  console.log('Выполняется только при монтировании')
}, [])
```

**Поведение:** эффект выполняется **только один раз** при монтировании компонента.

**deps = `[a, b]`:**

```jsx
useEffect(() => {
  console.log('Выполняется при изменении a или b')
}, [a, b])
```

**Поведение:** эффект выполняется при изменении любого из значений в массиве зависимостей.

### Cleanup функция

Cleanup функция выполняется:

- **перед следующим эффектом** — если зависимости изменились;
- **при размонтировании компонента** — если компонент удаляется из DOM.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)

  return () => {
    clearInterval(timer) // cleanup
  }
}, [])
```

**Зачем нужен cleanup:**

- предотвращает утечки памяти (таймеры, подписки);
- отменяет запросы, которые больше не нужны;
- очищает ресурсы, которые были выделены в эффекте.

### Типичные ошибки в useEffect

#### 1. Забытые зависимости

```jsx
function Component({ userId }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`/api/user/${userId}`).then(setData)
  }, []) // ❌ userId не в зависимостях!
}
```

**Проблема:** если `userId` изменится, запрос не выполнится заново.

**Решение:**

```jsx
useEffect(() => {
  fetch(`/api/user/${userId}`).then(setData)
}, [userId]) // ✅
```

#### 2. Stale closures

```jsx
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count) // всегда выводит 0!
    }, 1000)

    return () => clearInterval(timer)
  }, []) // ❌ count не в зависимостях
}
```

**Проблема:** `count` в замыкании всегда будет равен начальному значению (0).

**Решение:**

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount((prev) => {
      console.log(prev) // актуальное значение
      return prev + 1
    })
  }, 1000)

  return () => clearInterval(timer)
}, []) // можно оставить пустым, т.к. используем функциональное обновление
```

Или добавить `count` в зависимости, если нужно его читать:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count)
  }, 1000)

  return () => clearInterval(timer)
}, [count]) // ✅
```

#### 3. Бесконечные циклы

```jsx
function Component() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
  }, [data]) // ❌ data в зависимостях → бесконечный цикл
}
```

**Проблема:** эффект обновляет `data`, что вызывает новый эффект, который снова обновляет `data`, и так далее.

**Решение:**

```jsx
useEffect(() => {
  fetch('/api/data')
    .then((res) => res.json())
    .then(setData)
}, []) // ✅ выполнится только один раз
```

#### 4. Отсутствие cleanup для подписок

```jsx
useEffect(() => {
  const subscription = subscribe()
  // ❌ нет cleanup → утечка памяти
}, [])
```

**Решение:**

```jsx
useEffect(() => {
  const subscription = subscribe()
  return () => {
    subscription.unsubscribe() // ✅ cleanup
  }
}, [])
```

---

## 19.3. useMemo и useCallback: оптимизация производительности

### useMemo: мемоизация значений

`useMemo` мемоизирует результат вычисления и пересчитывает его только при изменении зависимостей:

```jsx
const expensiveValue = useMemo(() => {
  return expensiveCalculation(items)
}, [items])
```

**Когда использовать:**

- вычисление **дорогое** (сложные алгоритмы, большие массивы);
- значение передаётся в дочерние компоненты как проп;
- нужно предотвратить лишние вычисления при ререндерах.

**Когда НЕ использовать:**

- простые вычисления (сложение, конкатенация строк);
- преждевременная оптимизация без профилирования;
- когда зависимости меняются часто (мемоизация не поможет).

### useCallback: мемоизация функций

`useCallback` мемоизирует функцию и создаёт новую только при изменении зависимостей:

```jsx
const handleClick = useCallback(() => {
  setCount((c) => c + 1)
}, [])
```

**Когда использовать:**

- функция передаётся в дочерние компоненты как проп;
- функция используется в зависимостях других хуков (`useEffect`, `useMemo`);
- нужно предотвратить лишние ререндеры дочерних компонентов.

**Когда НЕ использовать:**

- функция не передаётся в дочерние компоненты;
- функция не используется в зависимостях других хуков;
- преждевременная оптимизация без доказанной необходимости.

### Важно: не злоупотребляй оптимизацией

**Правило:** сначала пиши код без оптимизаций, затем **профилируй** и оптимизируй только то, что действительно медленно.

`useMemo` и `useCallback` сами по себе имеют накладные расходы:

- нужно хранить предыдущие значения;
- нужно сравнивать зависимости;
- может усложнить код и сделать его менее читаемым.

**Пример неправильного использования:**

```jsx
// ❌ Избыточная оптимизация
const sum = useMemo(() => a + b, [a, b])
const handleClick = useCallback(() => console.log('click'), [])
```

**Пример правильного использования:**

```jsx
// ✅ Оправданная оптимизация
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price)
}, [items])

const handleItemClick = useCallback(
  (id) => {
    onItemSelect(id)
  },
  [onItemSelect],
)
```

---

## 19.4. useRef: мутабельные значения без ререндеров

### Базовое использование

```jsx
const inputRef = useRef(null)
```

`useRef` возвращает объект с свойством `current`, которое можно изменять без вызова ререндера.

**Особенности:**

- значение сохраняется между рендерами;
- изменение `current` **не вызывает ререндер**;
- можно использовать для хранения любых значений, не только DOM-элементов.

### Использование для DOM-элементов

```jsx
function Input() {
  const inputRef = useRef(null)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  )
}
```

### Использование для хранения предыдущих значений

```jsx
function Component({ value }) {
  const prevValueRef = useRef()

  useEffect(() => {
    prevValueRef.current = value
  })

  const prevValue = prevValueRef.current

  return (
    <div>
      Current: {value}, Previous: {prevValue}
    </div>
  )
}
```

### Использование для таймеров и интервалов

```jsx
function Timer() {
  const intervalRef = useRef(null)

  const start = () => {
    intervalRef.current = setInterval(() => {
      console.log('Tick')
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  )
}
```

### forwardRef: передача ref в дочерний компонент

`forwardRef` позволяет передавать `ref` в дочерний компонент:

```jsx
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />
})

// Использование
function Form() {
  const inputRef = useRef(null)

  return <Input ref={inputRef} />
}
```

**Когда использовать:**

- создаёшь библиотечный компонент, который должен поддерживать `ref`;
- нужно получить доступ к DOM-элементу внутри дочернего компонента;
- передаёшь `ref` через несколько уровней компонентов.

---

## 19.5. useReducer: управление сложным состоянием

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

---

## 19.6. Context API: передача данных без проп-дриллинга

Context API позволяет передавать данные через дерево компонентов без явной передачи пропсов на каждом уровне.

### Создание и использование контекста

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

### Проблемы Context API

**1. Ререндер всех потребителей**

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

**Решение:** разделить контексты:

```jsx
const UserContext = createContext(null)
const ThemeContext = createContext('light')

function App() {
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

**2. Context — не замена Redux**

Context API подходит для:

- темы, языка интерфейса;
- данных пользователя (если не меняются часто);
- простого глобального состояния.

Context API НЕ подходит для:

- сложного состояния с множеством переходов;
- частых обновлений (каждое обновление вызывает ререндер всех потребителей);
- когда нужны middleware, time-travel debugging и другие возможности Redux.

**3. Проблемы производительности**

Частые обновления контекста могут привести к проблемам производительности. Решение:

- мемоизация значений контекста;
- разделение контекстов;
- использование селекторов (как в Redux).

---

## 19.7. Правила хуков

Хуки можно вызывать только:

1. **На верхнем уровне** — не в условиях, циклах, вложенных функциях.
2. **В React-функциях** — компонентах или кастомных хуках.

### ❌ Неправильно

```jsx
function Component() {
  if (condition) {
    const [state, setState] = useState(0) // ❌
  }

  for (let i = 0; i < 10; i++) {
    useEffect(() => {}, []) // ❌
  }

  const handleClick = () => {
    const [count, setCount] = useState(0) // ❌
  }
}
```

### ✅ Правильно

```jsx
function Component() {
  const [state, setState] = useState(0) // ✅

  useEffect(() => {}, []) // ✅

  const handleClick = () => {
    setState(state + 1) // ✅ можно вызывать setState
  }
}
```

**Почему это важно:**

- React полагается на **порядок вызовов хуков** для правильной работы;
- нарушение правил приводит к непредсказуемому поведению и багам;
- хуки должны вызываться в одном и том же порядке при каждом рендере.

---

## 19.8. Кастомные хуки: переиспользование логики

Кастомные хуки — это функции, начинающиеся с `use`, которые могут использовать другие хуки.

### Пример: useCounter

```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)

  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)
  const reset = () => setCount(initial)

  return { count, increment, decrement, reset }
}

// Использование
function Counter() {
  const { count, increment, decrement } = useCounter(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
```

### Пример: useFetch

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

// Использование
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`)

  if (loading) return <Spinner />
  if (error) return <Error message={error.message} />
  return <Profile data={data} />
}
```

**Преимущества кастомных хуков:**

- переиспользование логики между компонентами;
- инкапсуляция сложной логики;
- тестируемость (можно тестировать отдельно от компонентов);
- читаемость (компоненты становятся проще).

---

## 19.9. Мини‑самопроверка по главе

Проверь, что ты можешь:

- объяснить разницу между `useState` и `useReducer` и когда что использовать;
- описать, как работает `useEffect` и что такое cleanup функция;
- объяснить, почему важен массив зависимостей и что произойдёт, если его неправильно указать;
- показать пример stale closure в `useEffect` и как его исправить;
- объяснить разницу между `useMemo` и `useCallback` и когда их использовать;
- описать, для чего нужен `useRef` и чем он отличается от `useState`;
- объяснить проблемы Context API и как их решить;
- перечислить правила хуков и показать примеры их нарушения;
- создать кастомный хук для переиспользования логики;
- объяснить, почему `useMemo` и `useCallback` не всегда нужны.

Если это получается связно и без заучивания, ты прошёл через самую «скользкую» часть работы с React — дальше будет проще связывать это с архитектурой и оптимизацией.

---

## 19.10. Практические задания

### Задание 1: Исправление useEffect

Найди и исправь ошибки в коде:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
  }, [])

  return <div>{user.name}</div>
}
```

### Задание 2: Счётчик с интервалом

Создай компонент счётчика, который автоматически увеличивается каждую секунду. Добавь кнопки для запуска и остановки. Убедись, что интервал правильно очищается.

### Задание 3: Кастомный хук useLocalStorage

Создай кастомный хук `useLocalStorage`, который:

- сохраняет значение в localStorage;
- синхронизируется между вкладками;
- возвращает значение и функцию для обновления.

### Задание 4: Оптимизация с useMemo и useCallback

Дан компонент:

```jsx
function ExpensiveList({ items, onItemClick }) {
  const sorted = items.sort((a, b) => a.price - b.price)

  return (
    <ul>
      {sorted.map((item) => (
        <ListItem key={item.id} item={item} onClick={onItemClick} />
      ))}
    </ul>
  )
}
```

Оптимизируй его с помощью `useMemo` и `useCallback`. Объясни, почему это помогает.

### Задание 5: Форма с useReducer

Создай форму входа с валидацией, используя `useReducer` для управления состоянием. Форма должна иметь поля: email, password, и кнопку отправки.

---

В следующей главе мы посмотрим на архитектурные паттерны в React‑приложениях: Redux, TanStack Query, compound‑компоненты и подходы, которые помогают держать большие SPA‑проекты в порядке.
