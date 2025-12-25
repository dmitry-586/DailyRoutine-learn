# Разбор решений к практикуму по React и архитектуре

Эта глава — **подробный разбор** заданий из практикума (Глава 24).

Рекомендация по работе:

- сначала решай задания из практикума «вслепую»;
- только потом сверяйся с этой главой;
- не ограничивайся ответом — пытайся восстановить ход рассуждений.

---

## Ответы к заданиям 1–5 (основы React)

### Задание 1: Понимание Virtual DOM

**Решение:**

```jsx
function ItemList() {
  const [items, setItems] = useState(['Item 1', 'Item 2'])

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`])
  }

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  )
}
```

**Объяснение:**

- компонент перерендерится **один раз** при добавлении элемента;
- React обновит только новый `<li>` элемент в DOM, остальные останутся без изменений;
- `key` помогает React определить, какой элемент новый, а какой уже существовал.

**Улучшение:** использовать стабильный ID вместо индекса:

```jsx
{
  items.map((item) => <li key={item.id}>{item.name}</li>)
}
```

### Задание 2: Условный рендеринг

**Решение:**

```jsx
function UserProfile({ user }) {
  return user ? (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : (
    <LoginForm />
  )
}
```

### Задание 3: Список с ключами

**Решение с индексом (плохо):**

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
  ])

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo.text}
          <button onClick={() => removeTodo(index)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
```

**Проблема:** при удалении элемента индексы меняются, React может неправильно сопоставить элементы.

**Решение с ID (хорошо):**

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
  ])

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
```

**Почему лучше:** ID стабилен, React правильно отслеживает элементы даже при удалении.

### Задание 4: Контролируемый vs неконтролируемый

**Контролируемый компонент:**

```jsx
function ControlledForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

**Неконтролируемый компонент:**

```jsx
function UncontrolledForm() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='email' ref={emailRef} />
      <input type='password' ref={passwordRef} />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

**Когда что использовать:**

- **Контролируемый:** когда нужна валидация в реальном времени, условный рендеринг на основе значений, интеграция с формами-библиотеками.
- **Неконтролируемый:** когда форма простая, не нужна валидация, производительность критична (меньше ререндеров).

### Задание 5: Исправление ошибок

**Проблемы в коде:**

1. `fetch` вызывается при каждом рендере (бесконечный цикл запросов).
2. `data` может быть `null`, обращение к `data.name` вызовет ошибку.
3. Нет обработки ошибок.

**Исправление:**

```jsx
function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data</div>

  return <div>{data.name}</div>
}
```

---

## Ответы к заданиям 6–10 (хуки)

### Задание 6: Исправление useEffect

**Проблемы:**

1. Отсутствует `userId` в зависимостях — запрос не обновится при изменении `userId`.
2. `user` может быть `null`, обращение к `user.name` вызовет ошибку.

**Исправление:**

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return

    setLoading(true)
    setError(null)

    fetch(`/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        return res.json()
      })
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [userId]) // ✅ добавлен userId

  if (loading) return <Spinner />
  if (error) return <Error message={error.message} />
  if (!user) return <div>User not found</div>

  return <div>{user.name}</div>
}
```

### Задание 7: Счётчик с интервалом

**Решение:**

```jsx
function AutoCounter() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCount((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}
```

**Ключевые моменты:**

- cleanup функция очищает интервал при размонтировании или изменении `isRunning`;
- используется функциональное обновление `setCount((prev) => prev + 1)` для гарантии актуального значения;
- интервал хранится в `ref`, чтобы не терять ссылку при ререндерах.

### Задание 8: useLocalStorage

**Решение:**

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

      // Синхронизация между вкладками
      window.dispatchEvent(new Event('storage'))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue]
}
```

### Задание 9: Оптимизация с useMemo и useCallback

**Решение:**

```jsx
function ExpensiveList({ items, onItemClick }) {
  // ✅ Мемоизация сортировки
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => a.price - b.price)
  }, [items])

  // ✅ Мемоизация обработчика
  const handleClick = useCallback(
    (item) => {
      onItemClick(item)
    },
    [onItemClick],
  )

  return (
    <ul>
      {sorted.map((item) => (
        <ListItem key={item.id} item={item} onClick={handleClick} />
      ))}
    </ul>
  )
}
```

**Почему это помогает:**

- `useMemo` предотвращает пересортировку при каждом рендере (только при изменении `items`);
- `useCallback` создаёт стабильную ссылку на функцию, предотвращая лишние ререндеры `ListItem`;
- создаётся копия массива `[...items]`, чтобы не мутировать исходный.

### Задание 10: Форма с useReducer

**Решение:**

```jsx
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: '',
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

const initialState = {
  values: { email: '', password: '' },
  errors: {},
}

function LoginForm() {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const validate = () => {
    const errors = {}
    if (!state.values.email.includes('@')) {
      errors.email = 'Invalid email'
    }
    if (state.values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length === 0) {
      console.log('Submit:', state.values)
    } else {
      Object.entries(errors).forEach(([field, error]) => {
        dispatch({ type: 'SET_ERROR', field, error })
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={state.values.email}
        onChange={(e) =>
          dispatch({
            type: 'SET_FIELD',
            field: 'email',
            value: e.target.value,
          })
        }
      />
      {state.errors.email && <span>{state.errors.email}</span>}
      <input
        type='password'
        value={state.values.password}
        onChange={(e) =>
          dispatch({
            type: 'SET_FIELD',
            field: 'password',
            value: e.target.value,
          })
        }
      />
      {state.errors.password && <span>{state.errors.password}</span>}
      <button type='submit'>Submit</button>
    </form>
  )
}
```

---

## Ответы к заданиям 11–16 (архитектура)

### Задание 11: Выбор state manager

**1. Небольшое приложение:**

**Выбор:** `useState` + Context API (если нужно) или Zustand.

**Обоснование:**

- простое состояние, не нужна сложная логика;
- Context API достаточно для избежания проп-дриллинга;
- Zustand — если нужна простота без boilerplate.

**2. Большое e-commerce:**

**Выбор:** Redux Toolkit + TanStack Query.

**Обоснование:**

- Redux для глобального состояния (корзина, фильтры);
- TanStack Query для server state (товары, заказы);
- нужна предсказуемость и инструменты отладки.

**3. Дашборд с WebSocket:**

**Выбор:** Zustand или MobX + TanStack Query.

**Обоснование:**

- реактивность важна для real-time данных;
- Zustand проще, MobX более реактивный;
- TanStack Query для обычных API запросов.

### Задание 12: Redux Toolkit slice

**Решение:**

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      )
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
```

### Задание 13: TanStack Query с мутациями

**Решение:**

```typescript
// queryKeys.ts
export const queryKeys = {
  users: ['users'] as const,
  user: (id: number) => ['users', id] as const,
}

// hooks/useUsers.ts
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: fetchUsers,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users })
      const previousUsers = queryClient.getQueryData(queryKeys.users)

      queryClient.setQueryData(queryKeys.users, (old: User[]) =>
        old.map((user) => (user.id === newUser.id ? newUser : user)),
      )

      return { previousUsers }
    },
    onError: (err, newUser, context) => {
      queryClient.setQueryData(queryKeys.users, context.previousUsers)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users })
    },
  })
}
```

### Задание 14: Compound Components

**Решение:**

```jsx
const AccordionContext = createContext()

function Accordion({ children, defaultItem }) {
  const [activeItem, setActiveItem] = useState(defaultItem)

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className='accordion'>{children}</div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({ id, children }) {
  return <div className='accordion-item'>{children}</div>
}

function AccordionHeader({ id, children }) {
  const { activeItem, setActiveItem } = useContext(AccordionContext)

  return (
    <button
      className={activeItem === id ? 'active' : ''}
      onClick={() => setActiveItem(activeItem === id ? null : id)}
    >
      {children}
    </button>
  )
}

function AccordionPanel({ id, children }) {
  const { activeItem } = useContext(AccordionContext)

  if (activeItem !== id) return null

  return <div className='accordion-panel'>{children}</div>
}

Accordion.Item = AccordionItem
Accordion.Header = AccordionHeader
Accordion.Panel = AccordionPanel
```

### Задание 15: Архитектурное решение

**Решение:**

**State Management:**

- **TanStack Query** — для server state (товары, заказы, профиль);
- **Zustand** — для client state (корзина, фильтры, UI состояние);
- **WebSocket** — отдельный хук для real-time уведомлений.

**Структура папок:**

```
src/
  features/
    products/      # Товары (список, фильтры)
    cart/          # Корзина
    auth/          # Авторизация
    orders/        # Заказы
    notifications/ # Уведомления
  shared/
    ui/            # UI компоненты
    hooks/         # Общие хуки
    utils/         # Утилиты
  app/             # Инициализация
```

**Потоки данных:**

- Товары загружаются через TanStack Query;
- Корзина хранится в Zustand, синхронизируется с localStorage;
- Уведомления приходят через WebSocket, обновляют Zustand store.

### Задание 16: Миграция с Context на Redux

**Решение:**

```typescript
// cartSlice.ts
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
  },
})

// Компонент
function CartButton() {
  const items = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()

  const addItem = (item) => {
    dispatch(cartSlice.actions.addItem(item))
  }

  return <button onClick={() => addItem({ id: 1 })}>Add</button>
}
```

**Обоснование миграции:**

- **Нужна миграция**, если:
  - состояние используется во многих компонентах;
  - нужны инструменты отладки (Redux DevTools);
  - нужна сложная логика обновлений.

- **Не нужна миграция**, если:
  - состояние используется только в нескольких компонентах;
  - Context достаточно для задачи;
  - не нужны дополнительные инструменты.

---

## Ответы к заданиям 17–22 (SSR)

### Задание 17: Проблемы SPA

**Проблемы:**

1. **Долгий TTFB** — пользователь видит пустой экран 3–5 секунд.
2. **Пустой HTML** — поисковики видят пустую страницу.
3. **Плохой SEO** — контент не индексируется.
4. **Плохой UX на медленных сетях** — долгая загрузка.

**Как SSR решает:**

1. **TTFB** — контент приходит сразу с сервера (200–500ms).
2. **HTML** — поисковики видят полный контент.
3. **SEO** — контент индексируется без проблем.
4. **UX** — пользователь видит контент сразу.

### Задание 18: Hydration error

**Проблема:** HTML на сервере и клиенте не совпадает.

**Решение 1: Использовать useEffect**

```tsx
function Component() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <ServerOnly />
  }

  return <ClientOnly />
}
```

**Решение 2: Проверка на клиент**

```tsx
function Component() {
  if (typeof window === 'undefined') {
    return <ServerOnly />
  }

  return <ClientOnly />
}
```

**Решение 3: Dynamic import с ssr: false**

```tsx
import dynamic from 'next/dynamic'

const ClientOnly = dynamic(() => import('./ClientOnly'), { ssr: false })
```

### Задание 19: Выбор типа рендеринга

1. **Главная страница** — ISR (обновляется периодически, но быстро).
2. **Страница товара** — SSR (динамический контент, нужна актуальность).
3. **Личный кабинет** — SSR (персонализированный контент).
4. **Блог** — SSG (статический контент, генерируется на билде).
5. **Форма обратной связи** — CSR (не критично для SEO, интерактивность).

### Задание 20: Server vs Client Components

**Решение:**

```tsx
// app/products/[id]/page.tsx (Server Component)
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  const similarProducts = await getSimilarProducts(params.id)

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} />
      <SimilarProducts products={similarProducts} />
      <Reviews productId={product.id} />
    </div>
  )
}

// components/AddToCartButton.tsx (Client Component)
;('use client')
function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false)
  // ...
}

// components/Reviews.tsx (Client Component)
;('use client')
function Reviews({ productId }) {
  const [reviews, setReviews] = useState([])
  // ...
}
```

**Обоснование:**

- Server Components для данных (нет интерактивности);
- Client Components для интерактивности (кнопки, формы).

### Задание 21: Оптимизация бандла

**До:**

```tsx
import HeavyComponent from './HeavyComponent'

function Page() {
  return <HeavyComponent />
}
```

**После:**

```tsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

**Результат:**

- начальный бандл уменьшается на размер `HeavyComponent`;
- компонент загружается только когда нужен;
- улучшается Time To Interactive.

### Задание 22: ISR с revalidation

**Решение:**

```tsx
// app/blog/[slug]/page.tsx
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return <article>{post.content}</article>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export const revalidate = 60 // пересобирать каждые 60 секунд

// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { slug } = await request.json()
  await revalidatePath(`/blog/${slug}`)
  return Response.json({ revalidated: true })
}
```

---

Если при разборе какого‑то задания чувствуешь, что рассуждения «висят в воздухе» — вернись к соответствующей главе 18–21 и перечитай теоретический блок перед повторной попыткой.
