# Глава 46. Мемоизация: сохранение ссылочной целостности

**Главное правило:** мемоизация — это не про «ускорение». Это про **сохранение ссылочной целостности** для предотвращения лишних циклов рендеринга.

Представь: компонент получает объект `{ id: 1, name: 'John' }` как проп. При каждом рендере создаётся **новый объект** с тем же содержимым. React видит, что ссылка изменилась, и решает, что нужно перерендерить компонент, даже если содержимое не изменилось. Это приводит к лишним ререндерам и потере производительности.

**Мемоизация решает эту проблему:** она сохраняет ссылку на объект, пока его содержимое не изменилось. React видит, что ссылка та же, и пропускает ререндер.

**Важно:** не оптимизируй то, что и так работает быстро. Преждевременная оптимизация усложняет код. Сначала пиши код без оптимизаций, затем **профилируй** и оптимизируй только то, что действительно медленно.

---

## 46.1. useRef: тайный карман компонента

`useRef` — это «тайный карман» компонента, где можно хранить данные, которые не должны вызывать перерисовку. В отличие от `useState`, изменение `ref.current` не вызывает ререндер компонента.

```jsx
const inputRef = useRef(null)
```

`useRef` возвращает объект с свойством `current`, которое можно изменять без вызова ререндера. Значение сохраняется между рендерами, но изменение `current` не вызывает перерисовку.

### Использование для DOM-элементов

Самое частое использование — получение ссылки на DOM-элемент:

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

`useRef` идеален для хранения таймеров, потому что они не должны вызывать ререндер, но должны сохраняться между рендерами.

---

## 46.2. useMemo: сохранение ссылки на значение

`useMemo` сохраняет **ссылку на результат вычисления**, пока зависимости не изменились. Это не про «ускорение вычислений» — это про **предотвращение лишних ререндеров** дочерних компонентов.

**Проблема без useMemo:**

```jsx
function Parent() {
  const [count, setCount] = useState(0)
  
  // При каждом рендере создаётся НОВЫЙ объект
  const user = { id: 1, name: 'John' }
  
  return <Child user={user} /> // Child ререндерится каждый раз
}

const Child = memo(({ user }) => {
  // Ререндерится, даже если user не изменился
  return <div>{user.name}</div>
})
```

React видит, что ссылка на `user` изменилась (новый объект при каждом рендере), и решает, что нужно перерендерить `Child`, даже если содержимое не изменилось.

**Решение с useMemo:**

```jsx
function Parent() {
  const [count, setCount] = useState(0)
  const [userId, setUserId] = useState(1)
  const [userName, setUserName] = useState('John')
  
  // Ссылка сохраняется, пока userId и userName не изменились
  const user = useMemo(() => ({ id: userId, name: userName }), [userId, userName])
  
  return <Child user={user} /> // Child НЕ ререндерится при изменении count
}
```

Теперь `Child` ререндерится только когда действительно изменяется `userId` или `userName`, а не при каждом изменении `count`.

**Когда использовать:**

- значение передаётся в дочерние компоненты как проп (предотвращает лишние ререндеры);
- значение используется в зависимостях других хуков (`useEffect`, `useMemo`);
- вычисление **дорогое** (сложные алгоритмы, большие массивы) — но это вторично, главное — ссылочная целостность.

**Когда НЕ использовать:**

- простые вычисления (сложение, конкатенация строк) — накладные расходы на мемоизацию больше выгоды;
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

Если фильтрация и сортировка дорогие (большой массив), `useMemo` предотвратит пересчёт при каждом рендере, если зависимости не изменились.

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

Мемоизация объекта предотвращает создание нового объекта при каждом рендере, что важно для зависимостей в `useEffect`.

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

- функция передаётся в дочерние компоненты как проп (предотвращает лишние ререндеры);
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

  // Плохо: новая функция при каждом рендере
  const handleClick = () => {
    setCount(count + 1)
  }

  // Хорошо: функция мемоизирована
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

Если `Child` обёрнут в `memo`, он не будет ререндериться, если пропсы не изменились. Мемоизация функции гарантирует, что ссылка на функцию не меняется при каждом рендере.

### Пример: функция в зависимостях useEffect

```jsx
function Component({ userId }) {
  // Плохо: новая функция при каждом рендере
  const fetchUser = () => {
    return fetch(`/api/users/${userId}`).then((res) => res.json())
  }

  useEffect(() => {
    fetchUser().then(setUser)
  }, [fetchUser]) // бесконечный цикл

  // Хорошо: функция мемоизирована
  const fetchUser = useCallback(() => {
    return fetch(`/api/users/${userId}`).then((res) => res.json())
  }, [userId])

  useEffect(() => {
    fetchUser().then(setUser)
  }, [fetchUser]) // работает корректно
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
// Избыточная оптимизация
const sum = useMemo(() => a + b, [a, b])
const handleClick = useCallback(() => console.log('click'), [])
```

Сложение двух чисел — это настолько быстро, что накладные расходы на мемоизацию больше выгоды. То же самое с простой функцией, которая не передаётся в дочерние компоненты.

### Пример правильного использования

```jsx
// Оправданная оптимизация
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

Сортировка большого массива может быть дорогой, поэтому мемоизация оправдана. Функция передаётся в дочерний компонент, поэтому мемоизация предотвращает лишние ререндеры.

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

Кастомное сравнение позволяет контролировать, когда компонент должен ререндериться.

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

Комбинация `useMemo`, `useCallback` и `memo` может значительно улучшить производительность, но только если это действительно нужно. Профилируй перед оптимизацией.

---

## Вопросы на собеседовании

### 1. В чём разница между useMemo и useCallback?

`useMemo` мемоизирует значение, `useCallback` мемоизирует функцию. Оба пересчитывают/создают новое только при изменении зависимостей.

### 2. Когда использовать useRef?

Для хранения мутабельных значений без ререндеров: DOM-элементы, таймеры, предыдущие значения. `useRef` — это «тайный карман» компонента, где можно хранить данные, которые не должны вызывать перерисовку.

### 3. Всегда ли нужны useMemo и useCallback?

Нет. Только когда есть доказанная необходимость: дорогие вычисления, передача в дочерние компоненты, использование в зависимостях других хуков. Преждевременная оптимизация усложняет код и может не дать ожидаемого эффекта.

### 4. Что такое React.memo?

HOC для мемоизации компонентов. Предотвращает ререндер, если пропсы не изменились. Используй для компонентов, которые рендерятся часто, но пропсы меняются редко.

### 5. Почему преждевременная оптимизация вредна?

Усложняет код, добавляет накладные расходы, может не дать ожидаемого эффекта. Сначала профилируй, потом оптимизируй. Не оптимизируй то, что и так работает быстро.
