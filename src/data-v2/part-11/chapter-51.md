# Глава 51. Server state и client state

Разделение Server State и Client State — фундаментальный принцип современной архитектуры React-приложений. Понимание различий критично для выбора правильных инструментов и паттернов.

---

## 51.1. Client State

**Client State** — это состояние, которое контролируется приложением и существует только в браузере.

### Характеристики

- **Синхронный** — доступен сразу, не требует асинхронных операций
- **Контролируется приложением** — полностью под нашим контролем
- **Не устаревает** — данные актуальны, пока мы их не изменим
- **Не требует кеширования** — данные всегда в памяти

### Примеры

```typescript
// ✅ useState для UI состояния
const [isOpen, setIsOpen] = useState(false)
const [theme, setTheme] = useState('light')
const [selectedTab, setSelectedTab] = useState('profile')
const [sidebarOpen, setSidebarOpen] = useState(false)
```

**Типичные случаи использования:**

- UI состояние (модальные окна, сайдбары, табы)
- Тема приложения
- Локальные фильтры и сортировка
- Временное состояние форм (до отправки)
- Состояние анимаций

### Инструменты для Client State

- **useState** — локальное состояние компонента
- **useReducer** — сложное локальное состояние
- **Context API** — простое глобальное состояние (тема, язык)
- **Zustand** — глобальное состояние с лучшей производительностью
- **Jotai/Recoil** — атомарное состояние

---

## 51.2. Server State

**Server State** — это данные, которые приходят с сервера и могут устареть.

### Характеристики

- **Асинхронный** — требует запросов к API
- **Может устареть** — данные на сервере могут измениться
- **Требует кеширования** — чтобы не делать лишние запросы
- **Требует синхронизации** — нужно обновлять при изменениях
- **Требует фоновых обновлений** — для актуальности данных

### Проблемы с useState для Server State

```typescript
// ❌ Плохо: useState для серверных данных
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(() => {
  setLoading(true)
  fetch('/api/users')
    .then((r) => r.json())
    .then(setUsers)
    .catch(setError)
    .finally(() => setLoading(false))
}, [])

// Проблемы:
// - Нет кеширования
// - Нет фоновых обновлений
// - Нет повторных запросов при ошибке
// - Нет optimistic updates
// - Много бойлерплейта
// - Нет синхронизации между компонентами
```

### Примеры Server State

- Список пользователей
- Данные профиля
- Посты и комментарии
- Товары в каталоге
- Любые данные с API

---

## 51.3. Разделение типов состояния

### Правильное разделение

```tsx
function Dashboard() {
  // Server state (TanStack Query)
  const { data: users } = useUsers()
  const { data: posts } = usePosts()

  // Client state (Zustand)
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)

  // Local state (useState)
  const [selectedTab, setSelectedTab] = useState('overview')

  return (
    <div>
      {sidebarOpen && <Sidebar />}
      {/* ... */}
    </div>
  )
}
```

### Когда что использовать

**Server State → TanStack Query:**

- Данные с API
- Требуют кеширования
- Могут устареть
- Нужны фоновые обновления

**Client State → Zustand/Context:**

- UI состояние (тема, сайдбар)
- Временное состояние
- Не требует синхронизации с сервером

**Local State → useState:**

- Состояние внутри компонента
- Не требует глобального доступа
- Простая логика

---

## 51.4. Проблемы смешивания

### ❌ Антипаттерн: Server State в useState

```typescript
// Проблемы:
// 1. Нет кеширования — каждый компонент делает свой запрос
// 2. Нет синхронизации — изменения в одном месте не видны в другом
// 3. Много бойлерплейта — loading, error, retry логика
// 4. Нет фоновых обновлений
// 5. Нет optimistic updates
```

### ✅ Правильно: Server State в TanStack Query

```typescript
// Преимущества:
// 1. Автоматическое кеширование
// 2. Синхронизация между компонентами
// 3. Минимум бойлерплейта
// 4. Фоновые обновления
// 5. Optimistic updates
// 6. Retry логика
```

---

## 51.5. Гибридные случаи

Иногда данные могут быть и Server, и Client State:

### Пример: фильтры

```typescript
// Server State: список пользователей
const { data: users } = useUsers()

// Client State: фильтры (применяются локально)
const [filter, setFilter] = useState('active')

const filteredUsers = useMemo(() => {
  return users?.filter((user) => user.status === filter) ?? []
}, [users, filter])
```

### Пример: редактирование

```typescript
// Server State: исходные данные
const { data: user } = useUser(id)

// Client State: локальные изменения (до сохранения)
const [editedUser, setEditedUser] = useState(user)

useEffect(() => {
  setEditedUser(user)
}, [user])
```

---

## Вопросы на собеседовании

### 1. В чём разница между Server State и Client State?

Server State — асинхронные данные с сервера, могут устареть, требуют кеширования. Client State — синхронное состояние приложения, контролируется нами, не устаревает.

### 2. Почему не стоит использовать useState для Server State?

Нет кеширования, синхронизации, фоновых обновлений, много бойлерплейта.

### 3. Какие инструменты использовать для Server State?

TanStack Query — стандарт для управления серверным состоянием.

### 4. Какие инструменты использовать для Client State?

useState для локального, Zustand/Context для глобального.

### 5. Когда использовать Context API, а когда Zustand?

Context API для редко меняющихся данных (тема, язык). Zustand для частых обновлений и лучшей производительности.

---

## Key Takeaways

- Server State — данные с сервера, асинхронные, могут устареть
- Client State — состояние приложения, синхронное, под нашим контролем
- TanStack Query для Server State
- Zustand/Context для Client State
- useState для локального состояния
- Разделение критично для правильной архитектуры
- Смешивание приводит к проблемам с производительностью и синхронизацией

