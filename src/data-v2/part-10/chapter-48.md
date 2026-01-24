# Глава 48. Кастомные хуки

Кастомные хуки — это функции, начинающиеся с `use`, которые могут использовать другие хуки. Это основной способ переиспользования логики в React.

---

## 48.1. Что такое кастомные хуки

Кастомные хуки — это функции, которые:

- начинаются с `use`;
- могут вызывать другие хуки;
- инкапсулируют логику для переиспользования.

**Преимущества:**

- переиспользование логики между компонентами;
- инкапсуляция сложной логики;
- тестируемость (можно тестировать отдельно от компонентов);
- читаемость (компоненты становятся проще);
- композиция (можно комбинировать хуки).

**Правила:**

- должны начинаться с `use`;
- могут вызывать другие хуки;
- должны следовать правилам хуков (не вызываться условно);
- могут возвращать что угодно (объект, массив, значение).

---

## 48.2. Примеры кастомных хуков

### useCounter

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

### useFetch

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        return res.json()
      })
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

### useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// Использование
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  )
}
```

### useDebounce

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Использование для поиска
function SearchBox() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      // Выполнить поиск
      search(debouncedQuery)
    }
  }, [debouncedQuery])

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />
}
```

### usePrevious

```jsx
function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// Использование
function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

### useToggle

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)

  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return [value, { toggle, setTrue, setFalse }]
}

// Использование
function Modal() {
  const [isOpen, { toggle, setTrue, setFalse }] = useToggle(false)

  return (
    <>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && <div>Modal content</div>}
    </>
  )
}
```

### useClickOutside

```jsx
function useClickOutside(ref, handler) {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref, handler])
}

// Использование
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, () => setIsOpen(false))

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>Dropdown content</div>}
    </div>
  )
}
```

### useWindowSize

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}

// Использование
function ResponsiveComponent() {
  const { width, height } = useWindowSize()

  return (
    <div>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  )
}
```

---

## 48.3. Композиция хуков

Кастомные хуки можно комбинировать для создания более сложной логики:

```jsx
function useUserProfile(userId) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`)
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const { width } = useWindowSize()

  return {
    user,
    loading,
    error,
    theme,
    setTheme,
    isMobile: width < 768,
  }
}

// Использование
function ProfilePage({ userId }) {
  const { user, theme, isMobile } = useUserProfile(userId)

  return (
    <div className={theme}>
      {isMobile ? <MobileLayout user={user} /> : <DesktopLayout user={user} />}
    </div>
  )
}
```

---

## 48.4. Тестирование кастомных хуков

Кастомные хуки можно тестировать с помощью `@testing-library/react-hooks`:

```jsx
import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from './useCounter'

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter(0))

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})
```

---

## 48.5. Best Practices

### 1. Именование

```jsx
//  Хорошо: начинается с use
function useAuth() {}
function useUserData() {}

//  Плохо: не начинается с use
function getAuth() {}
function fetchUserData() {}
```

### 2. Возвращаемое значение

```jsx
//  Хорошо: объект для множественных значений
function useAuth() {
  return { user, login, logout }
}

//  Хорошо: массив для двух значений (как useState)
function useToggle() {
  return [value, toggle]
}

//  Хорошо: одно значение
function useWindowWidth() {
  return width
}
```

### 3. Инкапсуляция логики

```jsx
//  Хорошо: вся логика в хуке
function useForm() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  return { values, errors, handleChange }
}

//  Плохо: логика в компоненте
function Form() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  // ... много логики
}
```

---

## Вопросы на собеседовании

### 1. Что такое кастомные хуки?

Функции, начинающиеся с `use`, которые могут использовать другие хуки для переиспользования логики.

### 2. Какие правила для кастомных хуков?

Должны начинаться с `use`, могут вызывать другие хуки, должны следовать правилам хуков.

### 3. Зачем нужны кастомные хуки?

Для переиспользования логики, инкапсуляции сложной логики, улучшения читаемости и тестируемости.

### 4. Можно ли комбинировать кастомные хуки?

Да, кастомные хуки можно комбинировать для создания более сложной логики.

### 5. Как тестировать кастомные хуки?

С помощью `@testing-library/react-hooks` или тестируя компоненты, которые их используют.
