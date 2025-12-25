# Глава 23. SSR и современный React-стек

Современный фронтенд — это уже не просто SPA, загружаемая одним JS-файлом. Сегодня важно понимать, где выполняется код, когда происходит рендер и какой код доезжает до браузера.

На собеседованиях SSR — частый фильтр на уровень Middle+. Понимание SSR, SSG, гидратации и Server Components показывает, что ты мыслишь не только в рамках клиентского кода, но и понимаешь полный цикл работы приложения.

В этой главе разберём:

- проблемы классического SPA и как их решает SSR;
- что такое гидратация и почему она важна;
- Next.js и его эволюцию (Pages Router → App Router);
- Server Components и их отличие от SSR;
- типы рендеринга (SSR, SSG, ISR, CSR);
- код-сплиттинг и оптимизацию бандла.

---

## 23.1. Проблемы классического SPA

Классическое SPA (Single Page Application) имеет ряд ограничений, которые становятся критичными на медленных сетях и для SEO.

### 1. Долгий Time To First Contentful Paint (TTFB)

Пользователь видит пустой экран, пока:

- загружается HTML (обычно минимальный);
- загружается и парсится JavaScript;
- выполняется JavaScript;
- выполняются запросы к API;
- рендерится контент.

На медленных сетях это может занимать несколько секунд.

**Пример временной шкалы:**

```
0ms    → Запрос страницы
200ms  → HTML загружен (пустой <div id="root"></div>)
500ms  → JavaScript начал загружаться
1500ms → JavaScript загружен и парсится
2000ms → JavaScript выполняется
2500ms → Запрос к API
3000ms → Данные получены
3500ms → Контент отрендерен
```

Пользователь **3.5 секунды** видит пустой экран!

### 2. Пустой HTML при первой загрузке

Поисковые системы и социальные сети видят пустую страницу:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="/app.js"></script>
  </body>
</html>
```

Контент появляется только после выполнения JavaScript.

**Проблема для SEO:**

- поисковые роботы могут не дождаться выполнения JS;
- социальные сети (Open Graph) видят пустую страницу;
- требуется дополнительная настройка (pre-rendering, sitemap).

### 3. Проблемы SEO

Поисковые системы могут:

- не индексировать контент, который появляется только после выполнения JS;
- видеть пустую страницу при первом запросе;
- требовать дополнительной настройки (pre-rendering, sitemap).

**Пример:**

```jsx
// SPA: поисковик видит это
<div id="root"></div>

// А не это (контент появляется только после JS)
<div>
  <h1>Заголовок статьи</h1>
  <p>Содержимое статьи...</p>
</div>
```

### 4. Плохой UX на медленных сетях

На медленных соединениях:

- пользователь долго видит пустой экран;
- интерактивность появляется только после загрузки всего JS;
- плохой First Input Delay (FID) — задержка до первого взаимодействия.

**Метрики Core Web Vitals страдают:**

- **LCP (Largest Contentful Paint)** — долго до появления контента;
- **FID (First Input Delay)** — долго до интерактивности;
- **CLS (Cumulative Layout Shift)** — возможны сдвиги при загрузке.

### 5. Долгая интерактивность (TTI)

Time To Interactive (TTI) — время до полной интерактивности страницы — может быть очень долгим, особенно на мобильных устройствах.

**Проблема:**

- даже после появления контента страница может быть не интерактивной;
- нужно дождаться загрузки всех обработчиков событий;
- на слабых устройствах это особенно заметно.

---

## 23.2. SSR (Server-Side Rendering): рендеринг на сервере

SSR — это рендеринг React-приложения **на сервере** перед отправкой клиенту.

### Как это работает

1. **Клиент запрашивает страницу** — браузер отправляет HTTP-запрос на сервер.
2. **Сервер рендерит React в HTML** — сервер выполняет React-код и генерирует HTML.
3. **Клиент получает готовую разметку** — браузер получает HTML с контентом.
4. **JS «гидратирует» приложение** — JavaScript загружается и «оживляет» HTML.

### Простой пример SSR (концептуально)

```javascript
// server.js (упрощённо)
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'

app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(<App />)
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>My App</title></head>
      <body>
        <div id="root">${html}</div>
        <script src="/app.js"></script>
      </body>
    </html>
  `)
})
```

Клиент получает HTML с контентом сразу, а не пустую страницу.

**Временная шкала SSR:**

```
0ms    → Запрос страницы
200ms  → HTML загружен (с контентом!)
500ms  → JavaScript начал загружаться
1500ms → JavaScript загружен
2000ms → Hydration завершена, страница интерактивна
```

Пользователь видит контент уже через **200ms** вместо 3500ms!

### Hydration: оживление HTML

**Hydration** — процесс, при котором React:

- привязывает обработчики событий к существующим DOM-элементам;
- делает HTML интерактивным;
- восстанавливает состояние компонентов;
- подключает клиентскую логику.

**⚠️ Критически важно:** HTML, сгенерированный на сервере, должен **совпадать** с тем, что рендерится на клиенте. Несоответствие → hydration errors.

### Пример hydration error

```jsx
// ❌ Проблема: разный HTML на сервере и клиенте
function Component() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // На сервере: <div>Server</div>
  // На клиенте после hydration: <div>Client</div>
  // → hydration error!
  return <div>{mounted ? 'Client' : 'Server'}</div>
}
```

**Почему возникает ошибка:**

- React ожидает, что DOM на клиенте совпадёт с тем, что был на сервере;
- при несовпадении React не может правильно «привязать» обработчики;
- это приводит к ошибкам и неправильному поведению.

**Решение:**

```jsx
// ✅ Используй useEffect для клиент-специфичного контента
function Component() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      <p>Always visible</p>
      {mounted && <p>Client only</p>}
    </div>
  )
}
```

**Или используй проверку на клиент:**

```jsx
function Component() {
  if (typeof window === 'undefined') {
    // Серверный рендер
    return <div>Server</div>
  }

  // Клиентский рендер
  return <div>Client</div>
}
```

### Преимущества SSR

- **быстрый First Contentful Paint** — пользователь сразу видит контент;
- **лучше SEO** — поисковые системы видят полный HTML;
- **работает без JavaScript** — базовый контент доступен даже при отключённом JS;
- **лучший UX на медленных сетях** — контент появляется быстрее.

### Недостатки SSR

- **нагрузка на сервер** — каждый запрос требует рендеринга на сервере;
- **сложнее архитектура** — нужен сервер, который может выполнять Node.js;
- **проблемы с гидратацией** — нужно следить за совпадением серверного и клиентского HTML;
- **медленнее Time To Interactive** — нужно дождаться загрузки JS для интерактивности.

**Trade-off:**

SSR улучшает First Contentful Paint, но может ухудшить Time To Interactive, если JavaScript большой.

---

## 23.3. Next.js: стандарт для SSR/SSG в React

Next.js — фреймворк для React, который предоставляет SSR, SSG и другие возможности из коробки.

### Версии и эволюция

**Next.js 9-12: Pages Router**

- файловая маршрутизация (`pages/about.js` → `/about`);
- `getServerSideProps` для SSR;
- `getStaticProps` для SSG;
- `getStaticPaths` для динамических маршрутов.

**Пример (Pages Router):**

```jsx
// pages/about.js
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data')
  return {
    props: {
      data: await data.json(),
    },
  }
}

export default function About({ data }) {
  return <div>{data.title}</div>
}
```

**Next.js 13+: App Router**

- новая система маршрутизации (`app/about/page.tsx`);
- Server Components по умолчанию;
- async компоненты;
- улучшенная производительность.

**Пример (App Router):**

```tsx
// app/about/page.tsx
async function AboutPage() {
  const data = await fetch('https://api.example.com/data')
  const json = await data.json()

  return <div>{json.title}</div>
}
```

**Next.js 15+: Дальнейшие улучшения**

- оптимизация производительности;
- улучшенный кэширование;
- новые API для работы с данными.

**Next.js 16: Стабильные Server Components**

- стабильные React Server Components (RSC);
- улучшенная система кэширования;
- оптимизированная работа с изображениями;
- улучшенная поддержка TypeScript;
- новые API для работы с данными;
- улучшенная производительность сборки.

### Типы рендеринга в Next.js

#### SSR (Server-Side Rendering)

**Когда:** на каждый запрос.

**Особенности:**

- страница рендерится на сервере при каждом запросе;
- подходит для динамического контента;
- данные всегда актуальные.

**Пример (App Router):**

```tsx
// app/products/[id]/page.tsx
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`/api/products/${params.id}`)
  const data = await product.json()

  return <div>{data.name}</div>
}
```

**Когда использовать:**

- динамический контент, который меняется часто;
- данные, которые должны быть актуальными при каждом запросе;
- персонализированный контент.

#### SSG (Static Site Generation)

**Когда:** на этапе билда.

**Особенности:**

- страницы генерируются во время сборки;
- подходит для статического контента (блог, документация);
- быстрее, чем SSR (нет нагрузки на сервер при запросе).

**Пример (App Router):**

```tsx
// app/blog/[slug]/page.tsx
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return <article>{post.content}</article>
}

// Генерируется на этапе билда
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```

**Когда использовать:**

- статический контент (блог, документация, лендинги);
- контент, который не меняется часто;
- когда важна максимальная производительность.

#### ISR (Incremental Static Regeneration)

**Когда:** SSG + периодическое обновление.

**Особенности:**

- страница статическая, но может «переиздаваться» по расписанию или по запросу;
- гибридный подход — статическая страница с возможностью обновления;
- баланс между производительностью SSG и актуальностью SSR.

**Пример:**

```tsx
// app/products/[id]/page.tsx
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`/api/products/${params.id}`, {
    next: { revalidate: 3600 }, // пересобирать раз в час
  })
  const data = await product.json()

  return <div>{data.name}</div>
}
```

**Аналогия:** как газета — она статична для читателя, но выпускается регулярно с новыми данными.

**Когда использовать:**

- контент, который меняется, но не критично часто;
- баланс между производительностью и актуальностью;
- каталоги товаров, статьи блога.

#### CSR (Client-Side Rendering)

**Когда:** на клиенте (классическое SPA).

**Особенности:**

- рендеринг происходит в браузере;
- подходит для интерактивных частей приложения;
- может комбинироваться с SSR/SSG.

**Пример:**

```tsx
'use client' // Client Component

function InteractiveComponent() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Когда использовать:**

- интерактивные части приложения;
- данные, которые загружаются по требованию;
- части страницы, которые не критичны для SEO.

### Сравнение типов рендеринга

| Тип | Когда рендерится        | Производительность | Актуальность данных      |
| --- | ----------------------- | ------------------ | ------------------------ |
| SSR | На каждый запрос        | Медленнее          | Всегда актуальные        |
| SSG | На этапе билда          | Быстрее всего      | Могут устареть           |
| ISR | На билде + периодически | Быстро             | Обновляются периодически |
| CSR | На клиенте              | Зависит от сети    | Зависит от запросов      |

---

## 23.4. Server Components: новый этап React

React Server Components (RSC) — это компоненты, которые выполняются **только на сервере** и не попадают в клиентский JavaScript-бандл.

### Идея Server Components

- код выполняется на сервере;
- не попадает в JS-бандл → уменьшает размер клиента;
- прямой доступ к БД и файловой системе;
- нет гидратации (только HTML).

**Ключевое отличие от SSR:**

- SSR отправляет HTML + JS, происходит гидратация;
- Server Components отправляют только HTML, гидратации нет.

### Отличия от SSR

**SSR:**

- HTML + JS отправляется клиенту;
- происходит гидратация;
- большой бандл (весь React-код);
- полный JS на клиенте.

**Server Components:**

- только HTML отправляется клиенту;
- нет гидратации;
- меньший бандл (только Client Components);
- только клиентские компоненты в JS.

**Пример разницы в размере бандла:**

```
SSR:
- app.js: 200KB (весь React-код)

Server Components:
- app.js: 50KB (только Client Components)
```

### Server Components в Next.js App Router

В App Router компоненты по умолчанию являются **Server Components**. Client Components помечаются директивой `'use client'`.

**Server Component:**

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

**Client Component:**

```tsx
'use client' // Директива для Client Component

import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### Ограничения Server Components

Server Components **не могут:**

- использовать хуки (`useState`, `useEffect` и т.д.);
- использовать браузерные API (`window`, `document`, `localStorage`);
- обрабатывать события (`onClick`, `onChange`);
- использовать состояние.

**Server Components могут:**

- делать async/await;
- обращаться к БД напрямую;
- читать файлы;
- использовать серверные API.

### Когда использовать Server vs Client Components

**Server Components:**

- загрузка данных;
- работа с БД;
- статический контент;
- части страницы, которые не требуют интерактивности.

**Client Components:**

- интерактивность (кнопки, формы);
- состояние (`useState`, `useReducer`);
- браузерные API;
- обработка событий.

**Правило:** используй Server Components по умолчанию, переходи на Client Components только когда нужна интерактивность.

**Пример комбинации:**

```tsx
// Server Component
async function ProductPage({ id }) {
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
;('use client')
function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await addToCart(productId)
    setLoading(false)
  }

  return <button onClick={handleClick}>Add to Cart</button>
}
```

---

## 23.5. Код-сплиттинг и оптимизация бандла

### Проблема большого бандла

Большой JavaScript-бандл приводит к:

- долгой загрузке;
- плохому Time To Interactive;
- плохому опыту на медленных сетях;
- высокому потреблению трафика.

**Пример:**

```
app.js: 2MB
→ Загрузка на 3G: ~10 секунд
→ Парсинг: ~2 секунды
→ Выполнение: ~1 секунда
Итого: ~13 секунд до интерактивности
```

### Dynamic import

React предоставляет `lazy` для динамической загрузки компонентов:

```jsx
import { lazy, Suspense } from 'react'

const Heavy = lazy(() => import('./Heavy'))

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Heavy />
    </Suspense>
  )
}
```

**Что происходит:**

- компонент `Heavy` загружается только когда он нужен;
- создаётся отдельный чанк (chunk) для этого компонента;
- `Suspense` показывает fallback во время загрузки.

**Результат:**

```
app.js: 500KB (основной код)
heavy.chunk.js: 1.5MB (загружается по требованию)
```

### Route-based splitting

В Next.js каждый роут автоматически становится отдельным чанком:

```
app/
  page.tsx          → chunk-1.js (200KB)
  about/
    page.tsx        → chunk-2.js (150KB)
  products/
    page.tsx        → chunk-3.js (300KB)
```

Пользователь загружает только код для текущей страницы.

**Преимущества:**

- меньший начальный бандл;
- быстрее загрузка первой страницы;
- пользователь загружает только нужный код.

### Оптимизация изображений

Next.js предоставляет компонент `Image` для оптимизации изображений:

```tsx
import Image from 'next/image'
;<Image src='/photo.jpg' width={500} height={300} alt='Description' />
```

**Что делает:**

- автоматическая оптимизация размера;
- lazy loading;
- поддержка современных форматов (WebP, AVIF);
- предотвращение Cumulative Layout Shift (CLS).

**Результат:**

```
Без оптимизации:
- photo.jpg: 2MB

С оптимизацией:
- photo-500x300.webp: 50KB
```

### Почему это важно

- **меньший начальный JS-бандл** → быстрее загрузка;
- **лучший Core Web Vitals** → выше рейтинг в поисковиках;
- **лучший UX** → пользователь загружает только нужный код;
- **экономия трафика** → особенно важно для мобильных пользователей.

---

## 23.6. Мини‑самопроверка по главе

Проверь, что ты можешь:

- объяснить проблемы классического SPA и как их решает SSR;
- описать процесс SSR от запроса до отображения страницы;
- объяснить, что такое hydration и почему важно совпадение серверного и клиентского HTML;
- различать SSR, SSG, ISR и CSR и объяснить, когда что использовать;
- описать эволюцию Next.js (Pages Router → App Router);
- объяснить, что такое Server Components и чем они отличаются от SSR;
- перечислить ограничения Server Components и когда их использовать;
- объяснить, зачем нужен код-сплиттинг и как он работает.

Если это получается связно, ты понимаешь современный React-стек и можешь работать с SSR, SSG и Server Components.

---

В следующей части мы сделаем шаг назад от конкретных технологий и посмотрим на архитектуру целиком: как структурировать проект, разделять ответственность, выбирать подходящий уровень сложности и не превращать кодовую базу в «большой шар грязи».
