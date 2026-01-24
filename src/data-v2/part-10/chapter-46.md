# Глава 46. Оптимизация рендеров: useRef, useMemo и useCallback

Оптимизация рендеров — важная часть работы с React. `useRef`, `useMemo` и `useCallback` помогают избежать лишних ререндеров и оптимизировать производительность.

---

## 46.1. useRef: мутабельные значения без ререндеров

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

## 46.2. useMemo: мемоизация значений

`useMemo` мемоизирует результат вычисления и пересчитывает его только при изменении зависимостей:

```jsx
const expensiveValue = useMemo(() => {
  return expensiveCalculation(items)
}, [items])
```

### Когда использовать

**useMemo подходит для:**

- вычисление **дорогое** (сложные алгоритмы, большие массивы);
- значение передаётся в дочерние компоненты как проп;
- нужно предотвратить лишние вычисления при ререндерах.

**Когда НЕ использовать:**

- простые вычисления (сложение, конкатенация строк);
- преждевременная оптимизация без профилирования;
- когда зависимости меняются часто (мемоизация не поможет).

### Пример: фильтрация и сортировка

```jsx
function ProductList({ products, filter, sortBy }) {
  const filteredAndSorted = useMemo(() => {
    return products
      .filter((p) => p.category === filter)
      .sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price
        return a.name.localeCompare(b.name)
      })
  }, [products, filter, sortBy])

  return (
    <ul>
      {filteredAndSorted.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}
```

### Пример: мемоизация объекта

```jsx
function Component({ userId, userName }) {
  const user = useMemo(
    () => ({
      id: userId,
      name: userName,
    }),
    [userId, userName]
  )

  useEffect(() => {
    fetchUserData(user)
  }, [user])

  return <div>{user.name}</div>
}
```

---

## 46.3. useCallback: мемоизация функций

`useCallback` мемоизирует функцию и создаёт новую только при изменении зависимостей:

```jsx
const handleClick = useCallback(() => {
  setCount((c) => c + 1)
}, [])
```

### Когда использовать

**useCallback подходит для:**

- функция передаётся в дочерние компоненты как проп;
- функция используется в зависимостях других хуков (`useEffect`, `useMemo`);
- нужно предотвратить лишние ререндеры дочерних компонентов.

**Когда НЕ использовать:**

- функция не передаётся в дочерние компоненты;
- функция не используется в зависимостях других хуков;
- преждевременная оптимизация без доказанной необходимости.

### Пример: передача функции в дочерний компонент

```jsx
function Parent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  //  Плохо: новая функция при каждом рендере
  const handleClick = () => {
    setCount(count + 1)
  }

  //  Хорошо: функция мемоизирована
  const handleClick = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Child onClick={handleClick} />
    </div>
  )
}

const Child = memo(({ onClick }) => {
  return <button onClick={onClick}>Increment</button>
})
```

### Пример: функция в зависимостях useEffect

```jsx
function Component({ userId }) {
  //  Плохо: новая функция при каждом рендере
  const fetchUser = () => {
    return fetch(`/api/users/${userId}`).then((res) => res.json())
  }

  useEffect(() => {
    fetchUser().then(setUser)
  }, [fetchUser]) //  бесконечный цикл

  //  Хорошо: функция мемоизирована
  const fetchUser = useCallback(() => {
    return fetch(`/api/users/${userId}`).then((res) => res.json())
  }, [userId])

  useEffect(() => {
    fetchUser().then(setUser)
  }, [fetchUser]) //  работает корректно
}
```

---

## 46.4. Важно: не злоупотребляй оптимизацией

**Правило:** сначала пиши код без оптимизаций, затем **профилируй** и оптимизируй только то, что действительно медленно.

`useMemo` и `useCallback` сами по себе имеют накладные расходы:

- нужно хранить предыдущие значения;
- нужно сравнивать зависимости;
- может усложнить код и сделать его менее читаемым.

### Пример неправильного использования

```jsx
//  Избыточная оптимизация
const sum = useMemo(() => a + b, [a, b])
const handleClick = useCallback(() => console.log('click'), [])
```

### Пример правильного использования

```jsx
//  Оправданная оптимизация
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price)
}, [items])

const handleItemClick = useCallback(
  (id) => {
    onItemSelect(id)
  },
  [onItemSelect]
)
```

---

## 46.5. React.memo: мемоизация компонентов

`React.memo` — это HOC (Higher-Order Component), который мемоизирует результат рендера компонента:

```jsx
const ExpensiveComponent = memo(({ data }) => {
  // Сложные вычисления
  return <div>{/* ... */}</div>
})
```

**Когда использовать:**

- компонент рендерится часто;
- пропсы меняются редко;
- компонент выполняет дорогие вычисления.

**Когда НЕ использовать:**

- компонент рендерится редко;
- пропсы меняются часто;
- преждевременная оптимизация.

### Пример с кастомным сравнением

```jsx
const UserCard = memo(
  ({ user }) => {
    return <div>{user.name}</div>
  },
  (prevProps, nextProps) => {
    // Возвращает true, если пропсы равны (не нужно ререндерить)
    return prevProps.user.id === nextProps.user.id
  }
)
```

---

## 46.6. Комбинация оптимизаций

### Пример: оптимизированный список

```jsx
function ProductList({ products, onSelect }) {
  // Мемоизация отфильтрованного списка
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.inStock)
  }, [products])

  // Мемоизация обработчика
  const handleSelect = useCallback(
    (id) => {
      onSelect(id)
    },
    [onSelect]
  )

  return (
    <ul>
      {filteredProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onSelect={handleSelect}
        />
      ))}
    </ul>
  )
}

// Мемоизация компонента
const ProductItem = memo(({ product, onSelect }) => {
  return (
    <li onClick={() => onSelect(product.id)}>
      {product.name}
    </li>
  )
})
```

---

## Вопросы на собеседовании

### 1. В чём разница между useMemo и useCallback?

`useMemo` мемоизирует значение, `useCallback` мемоизирует функцию. Оба пересчитывают/создают новое только при изменении зависимостей.

### 2. Когда использовать useRef?

Для хранения мутабельных значений без ререндеров: DOM-элементы, таймеры, предыдущие значения.

### 3. Всегда ли нужны useMemo и useCallback?

Нет. Только когда есть доказанная необходимость: дорогие вычисления, передача в дочерние компоненты, использование в зависимостях других хуков.

### 4. Что такое React.memo?

HOC для мемоизации компонентов. Предотвращает ререндер, если пропсы не изменились.

### 5. Почему преждевременная оптимизация вредна?

Усложняет код, добавляет накладные расходы, может не дать ожидаемого эффекта. Сначала профилируй, потом оптимизируй.
