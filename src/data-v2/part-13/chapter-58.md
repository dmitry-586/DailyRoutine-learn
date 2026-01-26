# Глава 58. Data fetching и кэширование в Next.js

Главная идея: в App Router данные лучше получать на сервере, а кэширование выбирать по типу контента.

---

## 58.1. Почему не нужен useEffect

В Server Components запросы делаются прямо в компоненте — это нормально и правильно для Next.js.

`useEffect` нужен только в Client Components, когда:

- используется браузерный API,
- данные зависят от действий пользователя,
- нужен эффект после рендера.

Итог: **на сервере — без useEffect, на клиенте — с useEffect или React Query**.

---

## 58.2. Три режима кэша, которые реально нужны

- **Статический контент** — кэш навсегда (по умолчанию).
- **Периодическое обновление** — `revalidate`.
- **Всегда свежие данные** — `cache: 'no-store'`.

Минимальные примеры:

```ts
fetch(url) // статично
fetch(url, { next: { revalidate: 3600 } }) // обновлять раз в час
fetch(url, { cache: 'no-store' }) // всегда свежие
```

---

## 58.3. Как выбрать режим на практике

- Маркетинг/документация → статично.
- Каталог/цены → `revalidate`.
- Кабинет/дашборд → `no-store`.

---

## 58.4. Производительность без лишней сложности

- Параллель `Promise.all` для независимых запросов.
- Streaming/Suspense, если часть страницы может подгружаться позже.

Этого достаточно для большинства проектов.

---

## 58.5. Где нужен клиентский data fetching

Клиентский запрос уместен, если:

- данные зависят от действий пользователя,
- нужен частый рефетч без перезагрузки страницы,
- важно «живое» обновление в UI.

В таком случае используйте TanStack Query, а `useEffect` — только для простых кейсов.

---

## 58.6. Prefetching с HydrationBoundary

**Prefetching** позволяет загрузить данные на сервере и передать их в клиентские компоненты без водопадов (waterfalls).

### HydrationBoundary в Server Components

Используйте `HydrationBoundary` в Server Components для передачи предзагруженных данных в клиентские компоненты:

```typescript
// app/users/page.tsx (Server Component)
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/query-client'
import { UsersList } from '@/features/users/components/UsersList'

export default async function UsersPage() {
  const queryClient = getQueryClient()
  
  // Предзагрузка на сервере
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersList /> {/* Клиентский компонент получает данные из кеша */}
    </HydrationBoundary>
  )
}
```

**Преимущества:**
- Данные загружаются на сервере параллельно с рендерингом
- Клиентский компонент получает данные мгновенно из кеша
- Нет водопадов запросов

---

## 58.7. Zustand в App Router: per-request store

**Критически важно:** в App Router нельзя создавать глобальный стор как константу в модуле (на сервере), так как он будет общим для всех пользователей.

### ❌ Плохо: глобальный стор в модуле

```typescript
// ОПАСНО: стор будет общим для всех запросов
import { create } from 'zustand'

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

**Проблема:** на сервере один экземпляр стора будет использоваться для всех пользователей, что приведёт к утечкам данных между запросами.

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

---

## 58.8. Про useEffect и «плохой подход»

`useEffect` не плох сам по себе. Плохой подход — использовать его там, где данные должны быть на сервере.

Правило:

- данные для первого экрана — на сервере,
- интерактивные обновления — на клиенте.

Так вы и UX улучшаете, и избегаете лишнего JS.

---

## 58.9. Кеш и консистентность

- `revalidate` подходит, если данные могут быть «почти свежими».
- `no-store` обязателен для персональных данных.
- Внутри одного запроса Next.js может дедуплицировать одинаковые fetch.

Это помогает не дублировать запросы.

---

## 58.10. Когда нужна принудительная ревалидация

Если данные меняются по событию (создание, удаление):

- используйте `revalidatePath`,
- или `revalidateTag`, если настроены теги.

Это даёт контроль без полного отключения кеша.

---

## 58.11. Практическая схема выбора

- Контент не меняется → статично.
- Меняется раз в часы → `revalidate`.
- Меняется постоянно → `no-store`.
- Нужен интерактив → клиентский запрос.

Это закрывает 90% кейсов.