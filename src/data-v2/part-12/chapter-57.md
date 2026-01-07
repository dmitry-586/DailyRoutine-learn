# Глава 57. Data fetching, кэширование и производительность в Next.js

Next.js предоставляет мощную систему кэширования и оптимизации для data fetching. Понимание механизмов кэширования критично для создания производительных приложений.

---

## 57.1. Data Fetching в Server Components

В App Router Server Components могут напрямую делать async запросы.

### Базовый data fetching

```tsx
// app/products/page.tsx
async function ProductsPage() {
  const res = await fetch('https://api.example.com/products')
  const products = await res.json()

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

### Прямой доступ к БД

```tsx
// app/users/page.tsx
import { db } from '@/lib/db'

async function UsersPage() {
  const users = await db.users.findMany()

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

---

## 57.2. Кэширование fetch запросов

Next.js автоматически кэширует результаты `fetch` в Server Components.

### Статическое кэширование (по умолчанию)

```tsx
// app/products/page.tsx
async function ProductsPage() {
  // Кэшируется навсегда (статическая генерация)
  const res = await fetch('https://api.example.com/products')
  const products = await res.json()

  return <div>{/* ... */}</div>
}
```

**Поведение:**

- Запрос выполняется один раз на этапе билда
- Результат кэшируется навсегда
- Подходит для статического контента

### ISR с revalidate

```tsx
// app/products/page.tsx
async function ProductsPage() {
  // Пересобирается каждые 3600 секунд (1 час)
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 },
  })
  const products = await res.json()

  return <div>{/* ... */}</div>
}
```

**Поведение:**

- Запрос выполняется на билде
- Результат кэшируется на 1 час
- После истечения времени страница пересобирается в фоне

### Динамическое кэширование (no-store)

```tsx
// app/products/page.tsx
async function ProductsPage() {
  // Не кэшируется, выполняется на каждый запрос
  const res = await fetch('https://api.example.com/products', {
    cache: 'no-store',
  })
  const products = await res.json()

  return <div>{/* ... */}</div>
}
```

**Поведение:**

- Запрос выполняется на каждый запрос
- Результат не кэшируется
- Подходит для динамического контента

### Force revalidate

```tsx
// app/products/page.tsx
async function ProductsPage() {
  // Кэшируется, но можно принудительно обновить
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 },
  })
  const products = await res.json()

  return <div>{/* ... */}</div>
}

// Принудительное обновление через revalidatePath
import { revalidatePath } from 'next/cache'

export async function POST() {
  revalidatePath('/products')
  return Response.json({ revalidated: true })
}
```

---

## 57.3. Стратегии кэширования

### 1. Статический контент (SSG)

```tsx
// app/blog/[slug]/page.tsx
async function BlogPost({ params }: { params: { slug: string } }) {
  // Кэшируется навсегда
  const post = await getPost(params.slug)

  return <article>{post.content}</article>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```

### 2. Периодическое обновление (ISR)

```tsx
// app/products/[id]/page.tsx
async function ProductPage({ params }: { params: { id: string } }) {
  // Пересобирается раз в час
  const product = await fetch(`/api/products/${params.id}`, {
    next: { revalidate: 3600 },
  })

  return <div>{product.name}</div>
}
```

### 3. Динамический контент (SSR)

```tsx
// app/dashboard/page.tsx
async function DashboardPage() {
  // Не кэшируется, всегда свежие данные
  const data = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store',
  })

  return <div>{/* ... */}</div>
}
```

---

## 57.4. Оптимизация производительности

### Параллельные запросы

```tsx
// app/user/[id]/page.tsx
async function UserPage({ params }: { params: { id: string } }) {
  // Запросы выполняются параллельно
  const [user, posts, comments] = await Promise.all([
    fetch(`/api/users/${params.id}`).then((r) => r.json()),
    fetch(`/api/users/${params.id}/posts`).then((r) => r.json()),
    fetch(`/api/users/${params.id}/comments`).then((r) => r.json()),
  ])

  return (
    <div>
      <h1>{user.name}</h1>
      <PostsList posts={posts} />
      <CommentsList comments={comments} />
    </div>
  )
}
```

### Последовательные запросы

```tsx
// app/user/[id]/page.tsx
async function UserPage({ params }: { params: { id: string } }) {
  // Сначала получаем пользователя
  const user = await fetch(`/api/users/${params.id}`).then((r) => r.json())

  // Затем его посты (зависит от user)
  const posts = await fetch(`/api/users/${user.id}/posts`).then((r) =>
    r.json(),
  )

  return (
    <div>
      <h1>{user.name}</h1>
      <PostsList posts={posts} />
    </div>
  )
}
```

### Streaming с Suspense

```tsx
// app/products/page.tsx
import { Suspense } from 'react'

async function ProductsList() {
  const products = await fetch('https://api.example.com/products').then(
    (r) => r.json(),
  )

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}

async function CategoriesList() {
  const categories = await fetch('https://api.example.com/categories').then(
    (r) => r.json(),
  )

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsList />
      </Suspense>
      <Suspense fallback={<div>Loading categories...</div>}>
        <CategoriesList />
      </Suspense>
    </div>
  )
}
```

**Преимущества:**

- Компоненты загружаются независимо
- Пользователь видит контент по мере загрузки
- Лучший UX на медленных сетях

---

## 57.5. Оптимизация изображений

Next.js предоставляет компонент `Image` для автоматической оптимизации.

### Базовое использование

```tsx
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={300}
      />
      <h3>{product.name}</h3>
    </div>
  )
}
```

**Что делает:**

- Автоматическая оптимизация размера
- Lazy loading
- Поддержка WebP, AVIF
- Предотвращение CLS

### Приоритетная загрузка

```tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Загружается сразу, без lazy loading
/>
```

---

## 57.6. Оптимизация шрифтов

Next.js оптимизирует загрузку шрифтов через `next/font`.

### Google Fonts

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

**Преимущества:**

- Автоматическая оптимизация
- Предзагрузка шрифтов
- Предотвращение layout shift

### Локальные шрифты

```tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
})
```

---

## 57.7. Code Splitting

Next.js автоматически разбивает код на чанки по маршрутам.

### Route-based splitting

```
app/
├── page.tsx          → chunk-1.js
├── about/
│   └── page.tsx      → chunk-2.js
└── products/
    └── page.tsx      → chunk-3.js
```

### Dynamic imports

```tsx
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Не рендерить на сервере
})

export default function Dashboard() {
  return (
    <div>
      <HeavyChart />
    </div>
  )
}
```

---

## 57.8. Оптимизация метаданных

### Статические метаданные

```tsx
// app/products/[id]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  }
}
```

### Динамические метаданные

```tsx
// app/products/page.tsx
export const metadata = {
  title: 'Products',
  description: 'Browse our products',
}
```

---

## Вопросы на собеседовании

### 1. Как работает кэширование fetch в Next.js?

По умолчанию fetch кэшируется навсегда. Можно настроить через `next: { revalidate }` или `cache: 'no-store'`.

### 2. В чём разница между revalidate и no-store?

`revalidate` — периодическое обновление кэша. `no-store` — отключение кэширования.

### 3. Как оптимизировать загрузку данных?

Параллельные запросы через `Promise.all`, streaming с Suspense, правильная стратегия кэширования.

### 4. Зачем нужен компонент Image?

Автоматическая оптимизация размера, lazy loading, поддержка современных форматов, предотвращение CLS.

### 5. Как работает code splitting в Next.js?

Автоматически по маршрутам. Каждая страница — отдельный чанк.

- Правильная стратегия кэширования критична для производительности