# Глава 48. Кастомные хуки

Кастомные хуки — это способ «вынести мозг» (логику) компонента наружу, оставив в самом компоненте только описание интерфейса. Это основной способ переиспользования логики в React.

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

## 48.2. useFetch: работа с API

Один из самых частых паттернов — загрузка данных. Вместо того чтобы писать логику загрузки в каждом компоненте, вынеси её в хук:

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

Теперь компонент описывает только интерфейс, а вся логика загрузки данных инкапсулирована в хуке. Это можно переиспользовать в любом компоненте, который нужно загружать данные.

---

## 48.3. useDebounce: оптимизация запросов

Частая задача — не отправлять запрос при каждом изменении инпута, а подождать, пока пользователь перестанет печатать. Это называется debounce:

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
      // Выполнить поиск только после паузы в 300мс
      search(debouncedQuery)
    }
  }, [debouncedQuery])

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />
}
```

Хук задерживает обновление значения на указанное время. Если значение меняется раньше, таймер сбрасывается. Это предотвращает лишние запросы при быстром вводе.

---

## 48.4. useLocalStorage: синхронизация с хранилищем

Ещё один частый паттерн — сохранение состояния в localStorage и восстановление при загрузке:

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

Хук автоматически синхронизирует состояние с localStorage, сохраняя значение при изменении и восстанавливая при загрузке страницы.

---

## 48.5. Композиция хуков

Кастомные хуки можно комбинировать для создания более сложной логики:

```jsx
function useUserProfile(userId) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`)
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  return {
    user,
    loading,
    error,
    theme,
    setTheme,
    query,
    setQuery,
    debouncedQuery,
  }
}

// Использование
function ProfilePage({ userId }) {
  const { user, theme, query, debouncedQuery } = useUserProfile(userId)

  return (
    <div className={theme}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <Profile user={user} searchQuery={debouncedQuery} />
    </div>
  )
}
```

Композиция хуков позволяет создавать сложную логику из простых частей, делая код более модульным и переиспользуемым.

---

## 48.6. Best Practices

### 1. Именование

```jsx
// Хорошо: начинается с use
function useAuth() {}
function useUserData() {}

// Плохо: не начинается с use
function getAuth() {}
function fetchUserData() {}
```

### 2. Возвращаемое значение

```jsx
// Хорошо: объект для множественных значений
function useAuth() {
  return { user, login, logout }
}

// Хорошо: массив для двух значений (как useState)
function useToggle() {
  return [value, toggle]
}

// Хорошо: одно значение
function useWindowWidth() {
  return width
}
```

### 3. Инкапсуляция логики

```jsx
// Хорошо: вся логика в хуке
function useForm() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  return { values, errors, handleChange }
}

// Плохо: логика в компоненте
function Form() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  // ... много логики
}
```

---

## Вопросы на собеседовании

### 1. Что такое кастомные хуки?

Функции, начинающиеся с `use`, которые могут использовать другие хуки для переиспользования логики. Это способ «вынести мозг» компонента наружу, оставив в компоненте только описание интерфейса.

### 2. Какие правила для кастомных хуков?

Должны начинаться с `use`, могут вызывать другие хуки, должны следовать правилам хуков (не вызываться условно).

### 3. Зачем нужны кастомные хуки?

Для переиспользования логики, инкапсуляции сложной логики, улучшения читаемости и тестируемости. Компоненты становятся проще, а логика — переиспользуемой.

### 4. Можно ли комбинировать кастомные хуки?

Да, кастомные хуки можно комбинировать для создания более сложной логики. Композиция хуков позволяет создавать сложную логику из простых частей.

### 5. Как тестировать кастомные хуки?

С помощью `@testing-library/react-hooks` или тестируя компоненты, которые их используют. Кастомные хуки можно тестировать отдельно от компонентов, что упрощает тестирование.
