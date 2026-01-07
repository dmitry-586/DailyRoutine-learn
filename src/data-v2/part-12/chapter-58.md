# Глава 58. Server Components и границы ответственности

Server Components — это компоненты, которые выполняются только на сервере и не попадают в клиентский JavaScript-бандл. Понимание их ограничений и правильного использования критично для создания производительных Next.js приложений.

---

## 58.1. Что такое Server Components

React Server Components (RSC) — это компоненты, которые:

- Выполняются **только на сервере**
- Не попадают в JS-бандл → уменьшают размер клиента
- Имеют прямой доступ к БД и файловой системе
- Не требуют гидратации (только HTML)

### Ключевое отличие от SSR

**SSR:**

- HTML + JS отправляется клиенту
- Происходит гидратация
- Большой бандл (весь React-код)
- Полный JS на клиенте

**Server Components:**

- Только HTML отправляется клиенту
- Нет гидратации
- Меньший бандл (только Client Components)
- Только клиентские компоненты в JS

**Пример разницы в размере бандла:**

```
SSR:
- app.js: 200KB (весь React-код)

Server Components:
- app.js: 50KB (только Client Components)
```

---

## 58.2. Server Components в Next.js App Router

В App Router компоненты по умолчанию являются **Server Components**. Client Components помечаются директивой `'use client'`.

### Server Component (по умолчанию)

```tsx
// app/users/page.tsx (Server Component по умолчанию)
async function UsersPage() {
  // Прямой доступ к БД
  const users = await db.users.findMany()

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

### Client Component

```tsx
// components/Counter.tsx
'use client' // Директива для Client Component

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

## 58.3. Ограничения Server Components

Server Components **не могут:**

- Использовать хуки (`useState`, `useEffect` и т.д.)
- Использовать браузерные API (`window`, `document`, `localStorage`)
- Обрабатывать события (`onClick`, `onChange`)
- Использовать состояние
- Использовать Context API напрямую

**Server Components могут:**

- Делать async/await
- Обращаться к БД напрямую
- Читать файлы
- Использовать серверные API
- Использовать серверные библиотеки

---

## 58.4. Когда использовать Server vs Client Components

### Server Components для:

- Загрузки данных
- Работы с БД
- Статического контента
- Частей страницы, которые не требуют интерактивности
- SEO-критичного контента

### Client Components для:

- Интерактивности (кнопки, формы)
- Состояния (`useState`, `useReducer`)
- Браузерных API
- Обработки событий
- Context API

**Правило:** используй Server Components по умолчанию, переходи на Client Components только когда нужна интерактивность.

---

## 58.5. Комбинация Server и Client Components

Server Components могут импортировать и рендерить Client Components.

```tsx
// Server Component
async function ProductPage({ id }: { id: number }) {
  const product = await getProduct(id)

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Client Component для интерактивности */}
      <AddToCartButton productId={product.id} />
    </div>
  )
}

// Client Component
'use client'
function AddToCartButton({ productId }: { productId: number }) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await addToCart(productId)
    setLoading(false)
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}
```

### ❌ Нельзя: Client Component импортирует Server Component

```tsx
// ❌ Плохо: Client Component не может импортировать Server Component
'use client'
import { ServerComponent } from './ServerComponent' // Ошибка!

export function ClientComponent() {
  return <ServerComponent />
}
```

**Решение:** передавай данные через props.

```tsx
// ✅ Хорошо: передаём данные через props
'use client'
export function ClientComponent({ data }: { data: Data }) {
  return <div>{data.name}</div>
}

// Server Component
async function ServerComponent() {
  const data = await getData()
  return <ClientComponent data={data} />
}
```

---

## 58.6. Границы ответственности

### Разделение по слоям

```
┌─────────────────────────────────────┐
│  Server Components (данные)         │
│  - Загрузка данных                  │
│  - Работа с БД                      │
│  - Статический контент              │
└──────────────┬──────────────────────┘
               │ props
               ▼
┌─────────────────────────────────────┐
│  Client Components (интерактивность)│
│  - Состояние                        │
│  - События                          │
│  - Браузерные API                   │
└─────────────────────────────────────┘
```

### Пример правильного разделения

```tsx
// app/products/page.tsx (Server Component)
async function ProductsPage() {
  const products = await getProducts()

  return (
    <div>
      <h1>Products</h1>
      <ProductsList products={products} />
      <SearchBar /> {/* Client Component */}
    </div>
  )
}

// components/ProductsList.tsx (Server Component)
export function ProductsList({ products }: { products: Product[] }) {
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

// components/SearchBar.tsx (Client Component)
'use client'
export function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

---

## 58.7. Передача данных между Server и Client

### Props (рекомендуется)

```tsx
// Server Component
async function ServerComponent() {
  const data = await getData()
  return <ClientComponent data={data} />
}

// Client Component
'use client'
export function ClientComponent({ data }: { data: Data }) {
  return <div>{data.name}</div>
}
```

### Context API (только в Client Components)

```tsx
// providers/ThemeProvider.tsx
'use client'
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>(null!)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 58.8. Server Actions

Server Actions позволяют вызывать серверные функции из Client Components.

### Определение Server Action

```tsx
// app/actions.ts
'use server'

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  // Валидация, сохранение в БД
  await db.products.create({ data: { name } })
}
```

### Использование в Client Component

```tsx
// components/CreateProductForm.tsx
'use client'
import { createProduct } from '@/app/actions'

export function CreateProductForm() {
  return (
    <form action={createProduct}>
      <input name="name" placeholder="Product name" />
      <button type="submit">Create</button>
    </form>
  )
}
```

### С прогрессом и ошибками

```tsx
'use client'
import { useActionState } from 'react'
import { createProduct } from '@/app/actions'

export function CreateProductForm() {
  const [state, formAction, isPending] = useActionState(createProduct, null)

  return (
    <form action={formAction}>
      <input name="name" placeholder="Product name" />
      {state?.error && <div>{state.error}</div>}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
```

---

## 58.9. Best Practices

### 1. Минимизируй Client Components

```tsx
// ❌ Плохо: всё в Client Component
'use client'
export function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts)
  }, [])

  return <div>{/* ... */}</div>
}

// ✅ Хорошо: Server Component для данных
async function ProductsPage() {
  const products = await getProducts()
  return <ProductsList products={products} />
}
```

### 2. Разделяй по ответственности

```tsx
// Server Component: данные
async function ProductPage({ id }: { id: number }) {
  const product = await getProduct(id)
  return (
    <div>
      <ProductDetails product={product} />
      <AddToCartButton productId={product.id} />
    </div>
  )
}

// Server Component: презентация
function ProductDetails({ product }: { product: Product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  )
}

// Client Component: интерактивность
'use client'
function AddToCartButton({ productId }: { productId: number }) {
  const [loading, setLoading] = useState(false)
  // ...
}
```

### 3. Используй Server Actions для мутаций

```tsx
// ❌ Плохо: API route из Client Component
'use client'
async function handleSubmit() {
  await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ✅ Хорошо: Server Action
'use server'
export async function createProduct(data: ProductData) {
  await db.products.create({ data })
}
```

---

## Вопросы на собеседовании

### 1. В чём разница между Server Components и SSR?

Server Components отправляют только HTML, нет гидратации. SSR отправляет HTML + JS, происходит гидратация.

### 2. Какие ограничения у Server Components?

Не могут использовать хуки, браузерные API, события, состояние.

### 3. Может ли Client Component импортировать Server Component?

Нет, только наоборот. Данные передаются через props.

### 4. Что такое Server Actions?

Серверные функции, которые можно вызывать из Client Components.

### 5. Когда использовать Server vs Client Components?

Server Components по умолчанию для данных, Client Components для интерактивности.

---

## Key Takeaways

- Server Components выполняются только на сервере
- Не попадают в JS-бандл → меньший размер клиента
- Не могут использовать хуки, браузерные API, события
- Server Components могут импортировать Client Components
- Client Components не могут импортировать Server Components
- Данные передаются через props
- Server Actions для мутаций из Client Components
- Используй Server Components по умолчанию
- Переходи на Client Components только для интерактивности

