# Глава 56. Маршрутизация и компоновка: layout, loading, error

Next.js App Router предоставляет мощную систему маршрутизации на основе файловой структуры с поддержкой специальных файлов для компоновки, загрузки и обработки ошибок.

---

## 56.1. App Router: файловая маршрутизация

В Next.js 13+ App Router маршрутизация основана на файловой структуре в папке `app/`.

### Базовые маршруты

```
app/
├── page.tsx          → / (главная страница)
├── about/
│   └── page.tsx      → /about
└── products/
    ├── page.tsx      → /products
    └── [id]/
        └── page.tsx  → /products/:id
```

**Пример:**

```tsx
// app/page.tsx
export default function HomePage() {
  return <h1>Home</h1>
}

// app/about/page.tsx
export default function AboutPage() {
  return <h1>About</h1>
}
```

### Динамические маршруты

```tsx
// app/products/[id]/page.tsx
export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  return <h1>Product {params.id}</h1>
}
```

### Catch-all маршруты

```tsx
// app/docs/[...slug]/page.tsx
export default function DocsPage({
  params,
}: {
  params: { slug: string[] }
}) {
  return <h1>Docs: {params.slug.join('/')}</h1>
}
```

---

## 56.2. Layout: общая компоновка

`layout.tsx` — специальный файл для создания общих компонентов, которые не размонтируются при навигации.

### Корневой layout

```tsx
// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'My App',
  description: 'My awesome app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>Navigation</nav>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  )
}
```

**Особенности:**

- `layout.tsx` оборачивает все страницы в сегменте
- Layout не размонтируется при навигации
- Можно вкладывать layouts друг в друга

### Вложенные layouts

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <aside>Dashboard Sidebar</aside>
      <main>{children}</main>
    </div>
  )
}

// app/dashboard/page.tsx
export default function DashboardPage() {
  return <h1>Dashboard</h1>
}
```

**Результат:**

```
RootLayout
  └── DashboardLayout
      └── DashboardPage
```

### Server Components в layout

```tsx
// app/layout.tsx
import { getCurrentUser } from '@/lib/auth'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <html>
      <body>
        <header>
          {user ? <UserMenu user={user} /> : <LoginButton />}
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
```

---

## 56.3. Loading: состояния загрузки

`loading.tsx` — специальный файл для отображения состояния загрузки во время загрузки страницы или данных.

### Базовый loading

```tsx
// app/products/loading.tsx
export default function Loading() {
  return <div>Loading products...</div>
}
```

**Когда показывается:**

- При первой загрузке страницы
- При навигации на страницу
- Во время загрузки данных в Server Components

### Suspense в loading

```tsx
// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  )
}
```

### Loading для конкретного сегмента

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return <div>Loading dashboard...</div>
}

// app/dashboard/analytics/loading.tsx
export default function AnalyticsLoading() {
  return <div>Loading analytics...</div>
}
```

**Иерархия:**

- При переходе на `/dashboard` показывается `app/dashboard/loading.tsx`
- При переходе на `/dashboard/analytics` показывается `app/dashboard/analytics/loading.tsx`

---

## 56.4. Error: обработка ошибок

`error.tsx` — специальный файл для обработки ошибок в сегменте.

### Базовый error boundary

```tsx
// app/products/error.tsx
'use client' // Error boundaries должны быть Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

**Особенности:**

- `error.tsx` должен быть Client Component (`'use client'`)
- Обрабатывает ошибки в дочерних компонентах
- `reset()` перезагружает сегмент

### Разные error boundaries

```tsx
// app/error.tsx (глобальный)
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

// app/dashboard/error.tsx (для dashboard)
'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Обработка разных типов ошибок

```tsx
// app/products/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Логирование ошибки
    console.error('Product error:', error)
  }, [error])

  if (error.message.includes('404')) {
    return (
      <div>
        <h2>Product not found</h2>
        <button onClick={() => reset()}>Go back</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

---

## 56.5. Not Found: 404 страницы

`not-found.tsx` — специальный файл для отображения 404 страницы.

### Базовый not-found

```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  )
}
```

### Вызов not-found программно

```tsx
// app/products/[id]/page.tsx
import { notFound } from 'next/navigation'

async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound() // Показывает app/not-found.tsx
  }

  return <div>{product.name}</div>
}
```

### Специфичные not-found

```tsx
// app/products/not-found.tsx
export default function ProductsNotFound() {
  return (
    <div>
      <h2>Product not found</h2>
      <p>The product you're looking for doesn't exist.</p>
    </div>
  )
}
```

---

## 56.6. Template: переиспользуемые шаблоны

`template.tsx` — похож на `layout.tsx`, но создаёт новый экземпляр при навигации.

### Разница между layout и template

**Layout:**

- Не размонтируется при навигации
- Сохраняет состояние между переходами
- Подходит для общих компонентов (header, sidebar)

**Template:**

- Создаёт новый экземпляр при навигации
- Сбрасывает состояние
- Подходит для анимаций переходов

```tsx
// app/template.tsx
export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  )
}
```

---

## 56.7. Route Groups: организация маршрутов

Route Groups позволяют организовать маршруты без влияния на URL.

### Структура

```
app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx      → /about
│   └── contact/
│       └── page.tsx      → /contact
└── (shop)/
    ├── products/
    │   └── page.tsx      → /products
    └── cart/
        └── page.tsx      → /cart
```

**Преимущества:**

- Разделение маршрутов по функциональности
- Общие layouts для группы
- Не влияет на URL

### Layout для группы

```tsx
// app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav>Marketing Nav</nav>
      {children}
    </div>
  )
}
```

---

## 56.8. Parallel Routes: параллельные маршруты

Parallel Routes позволяют одновременно рендерить несколько страниц в одном layout.

### Структура

```
app/
└── dashboard/
    ├── @analytics/
    │   └── page.tsx
    ├── @team/
    │   └── page.tsx
    └── page.tsx
```

**Использование:**

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      {children}
      <div className="grid">
        <div>{analytics}</div>
        <div>{team}</div>
      </div>
    </div>
  )
}
```

---

## 56.9. Intercepting Routes: перехват маршрутов

Intercepting Routes позволяют перехватывать навигацию и показывать модальные окна.

### Структура

```
app/
├── @modal/
│   └── (.)products/
│       └── [id]/
│           └── page.tsx
└── products/
    └── [id]/
        └── page.tsx
```

**Синтаксис:**

- `(.)` — перехватывает на том же уровне
- `(..)` — перехватывает на уровень выше
- `(..)(..)` — перехватывает на два уровня выше
- `(...)` — перехватывает с корня

---

## Вопросы на собеседовании

### 1. В чём разница между layout и template?

Layout не размонтируется при навигации, template создаёт новый экземпляр.

### 2. Когда показывается loading.tsx?

При первой загрузке страницы, навигации и загрузке данных в Server Components.

### 3. Почему error.tsx должен быть Client Component?

Error boundaries работают только в Client Components.

### 4. Что такое Route Groups?

Организация маршрутов без влияния на URL через папки в скобках.

### 5. Зачем нужны Parallel Routes?

Для одновременного рендеринга нескольких страниц в одном layout.

- Parallel Routes для параллельного рендеринга
- Intercepting Routes для модальных окон