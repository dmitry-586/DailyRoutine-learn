# Глава 59. Server Components и границы ответственности

Server Components выполняются на сервере и не попадают в клиентский бандл. Это снижает размер JS и ускоряет старт.

---

## 59.1. Возвращение к истокам: сервер делает тяжёлую работу

Server Components — это не «новая фича». Это **возвращение к истокам**: когда сервер делал тяжёлую работу (рендеринг, загрузка данных), а клиент получал лёгкий HTML.

**Историческая перспектива:**

Раньше веб работал так: сервер рендерил HTML, клиент получал готовую разметку. Потом появился JavaScript, и мы начали рендерить всё на клиенте. Теперь Server Components возвращают нас к истокам: сервер делает тяжёлую работу, клиент получает лёгкий HTML.

**В чём смысл:**

- **меньше JS на клиенте** — только интерактивные части попадают в бандл
- **данные можно получать напрямую на сервере** — без лишних запросов с клиента
- **быстрый первый экран** — HTML приходит готовым, не нужно ждать JS

В отличие от SSR, клиент получает только то, что действительно интерактивно. Остальное остаётся на сервере.

---

## 59.2. Server vs Client

**Server Components** — по умолчанию, подходят для:

- загрузки данных,
- статического контента,
- SEO-критичных блоков.

**Client Components** — только когда нужна интерактивность:

- состояние,
- события,
- браузерные API.

Правило: **Server по умолчанию, Client по необходимости**.

**Критически важно:** RSC (Server Components) **не должны** взаимодействовать со сторами (Zustand/Redux). Они работают вне контекста клиентского состояния. Сторы доступны только в Client Components.

---

## 59.3. Границы ответственности (без схем)

Серверные компоненты готовят данные и HTML. Клиентские компоненты принимают готовые данные через props и отвечают за интерактивность. Клиент не должен импортировать серверные компоненты.

---

## 59.4. Простой пример разделения

```tsx
// Server Component
async function ProductPage() {
  const product = await getProduct()
  return <AddToCartButton productId={product.id} />
}

// Client Component
'use client'
function AddToCartButton({ productId }: { productId: string }) {
  return <button>Add to cart</button>
}
```

---

## 59.5. Streaming с useSuspenseQuery

`useSuspenseQuery` позволяет Next.js автоматически стримить контент по мере готовности данных. Это улучшает воспринимаемую производительность:

```typescript
'use client'
import { useSuspenseQuery } from '@tanstack/react-query'

function UserProfile({ userId }: { userId: number }) {
  const { data: user } = useSuspenseQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
  })

  return <div>{user.name}</div>
}

// В Server Component
export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile userId={123} />
    </Suspense>
  )
}
```

**Преимущества:**
- Данные стримятся по мере готовности
- UI отображается постепенно, без блокировки
- Лучший UX для медленных запросов

---

## 59.6. Server Actions — зачем

Server Actions упрощают мутации: форма вызывает серверную функцию без отдельного API-роута. Это снижает количество кода и ошибок.

---

## 59.7. Короткий чек-лист

- Данные грузим на сервере.
- Интерактивность — только в Client Components.
- Передача данных — через props.
- Сторы (Zustand/Redux) — только в Client Components.

---

## 59.8. Что чаще всего делают неправильно

- Перенос интерактивности в Server Components.
- Использование браузерных API на сервере.
- Попытка использовать сторы в Server Components.
- Слишком большие Client Components, которые тянут весь бандл.

Если сомневаешься — выноси интерактивность в отдельный маленький клиентский компонент.

---

## 59.9. Как думать про границы

Простой принцип:

- Server готовит данные и HTML.
- Client отвечает за события и состояние.
- Сторы работают только на клиенте.

Чем меньше Client — тем быстрее сайт.

---

## 59.10. Server Actions vs API Routes

Server Actions подходят, когда:

- есть формы и мутации,
- нужен простой путь «клиент → сервер».

API Routes остаются полезными, если:

- нужен внешний доступ к API,
- есть сложные интеграции,
- нужно отдавать данные другим клиентам.

---

## 59.11. Производительность и бандл

Server Components уменьшают JS, но:

- большие клиентские библиотеки всё равно попадут в бандл,
- если компонент «use client» — всё дерево ниже тоже клиентское.

Контролируй границы, иначе эффект исчезает.

---

## 59.12. Zustand в App Router: per-request store

**Критически важно:** в Next.js App Router нельзя объявлять стор как глобальную константу, иначе данные утекут между разными пользователями сервера.

### ❌ Плохо: глобальный стор в модуле

```typescript
// ОПАСНО: стор будет общим для всех запросов
import { create } from 'zustand'

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

**Проблема:** на сервере один экземпляр стора будет использоваться для всех пользователей, что приведёт к утечкам данных между запросами. Пользователь A увидит данные пользователя B.

### ✅ Правильно: per-request store через Context

Стор должен создаваться **на каждый запрос** и передаваться через Context:

```typescript
// lib/store-context.tsx
'use client'
import { createContext, useContext, useRef } from 'react'
import { create } from 'zustand'

const StoreContext = createContext(null)

export function StoreProvider({ children, initialState }) {
  const storeRef = useRef()
  
  if (!storeRef.current) {
    storeRef.current = create((set) => ({
      ...initialState,
      setUser: (user) => set({ user }),
    }))
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used within StoreProvider')
  return store
}
```

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <StoreProvider initialState={{ user: null }}>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
```

**Почему это важно:** понимание изоляции состояния на сервере критично для безопасности и корректной работы SSR приложений. Без per-request store данные одного пользователя могут «утечь» к другому.

---

## 59.13. Мини-памятка

- Старайся держать UI-логику в маленьких Client Components.
- Не делай всё «use client» из удобства.
- Разделяй отображение и интерактивность.
- Сторы (Zustand/Redux) — только в Client Components.
- **Per-request store** — критично для SSR, иначе данные утекут между пользователями.