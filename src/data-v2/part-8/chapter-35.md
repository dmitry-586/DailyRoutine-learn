# Глава 35. Interface и type

Интерфейсы и типы — два способа описания структуры данных в TypeScript. Понимание различий и когда что использовать критично для написания правильного кода.

---

## 35.1. Интерфейсы (Interfaces)

### Базовый синтаксис

Интерфейс описывает форму объекта:

```typescript
interface User {
  id: number
  name: string
  email?: string // опциональное поле
}

const user: User = {
  id: 1,
  name: 'Alice',
  // email можно не указывать
}
```

### Опциональные свойства

```typescript
interface Config {
  apiUrl: string
  timeout?: number // опционально
  retries?: number // опционально
}

const config: Config = {
  apiUrl: 'https://api.example.com',
  // timeout и retries можно не указывать
}
```

### Readonly свойства

```typescript
interface Point {
  readonly x: number
  readonly y: number
}

const point: Point = { x: 10, y: 20 }
point.x = 30 // Error: Cannot assign to 'x' because it is a read-only property
```

### Индексные сигнатуры

Позволяют описывать объекты с динамическими ключами:

```typescript
interface StringMap {
  [key: string]: string
}

const map: StringMap = {
  name: 'Alice',
  city: 'Moscow',
  // Можно добавлять любые строковые ключи
}
```

### Расширение интерфейсов

```typescript
interface User {
  id: number
  name: string
}

interface Admin extends User {
  role: 'admin'
  permissions: string[]
}

const admin: Admin = {
  id: 1,
  name: 'Alice',
  role: 'admin',
  permissions: ['read', 'write'],
}
```

### Множественное расширение

```typescript
interface Timestamped {
  createdAt: Date
  updatedAt: Date
}

interface Identifiable {
  id: number
}

interface Entity extends Timestamped, Identifiable {
  name: string
}
```

### Объявление интерфейсов (Declaration Merging)

TypeScript позволяет объявлять интерфейс несколько раз — они автоматически объединяются:

```typescript
interface Window {
  myCustomProperty: string
}

interface Window {
  anotherProperty: number
}

// Теперь Window имеет оба свойства
window.myCustomProperty = 'test'
window.anotherProperty = 42
```

---

## 35.2. Типы (Type Aliases)

### Базовый синтаксис

`type` создаёт псевдоним для типа:

```typescript
type User = {
  id: number
  name: string
  email?: string
}

const user: User = {
  id: 1,
  name: 'Alice',
}
```

### Union types

```typescript
type Status = 'loading' | 'success' | 'error'
type ID = string | number
```

### Intersection types

```typescript
type User = { name: string }
type Admin = { role: string }

type AdminUser = User & Admin
```

### Mapped types

```typescript
type Optional<T> = {
  [K in keyof T]?: T[K]
}

type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}
```

---

## 35.3. Различия между interface и type

### interface

**Преимущества:**

-  Можно расширять через `extends`
-  Поддерживает declaration merging
-  Лучше для объектов и классов
-  Более читаемый синтаксис для объектов

**Ограничения:**

-  Не поддерживает union types напрямую
-  Не поддерживает intersection напрямую (но можно через extends)

### type

**Преимущества:**

-  Поддерживает union, intersection, mapped types
-  Лучше для композиций и утилитарных типов
-  Более гибкий

**Ограничения:**

-  Нельзя расширять (но можно использовать intersection)
-  Не поддерживает declaration merging

---

## 35.4. Когда использовать interface

**Используй interface для:**

- Публичных API
- Объектов и классов
- Когда нужна расширяемость
- Когда нужен declaration merging

```typescript
interface ButtonProps {
  title: string
  onClick: () => void
}

interface ComponentProps extends ButtonProps {
  disabled?: boolean
}
```

---

## 35.5. Когда использовать type

**Используй type для:**

- Union types
- Intersection types
- Mapped types
- Утилитарных типов
- Примитивов и композиций

```typescript
type Theme = 'light' | 'dark'
type ButtonVariant = 'primary' | 'secondary'

type Optional<T> = { [K in keyof T]?: T[K] }
type Readonly<T> = { readonly [K in keyof T]: T[K] }
```

---

## 35.6. Практические примеры

### Комбинирование interface и type

```typescript
// Базовый интерфейс
interface BaseEntity {
  id: number
  createdAt: Date
}

// Union type для статуса
type Status = 'draft' | 'published' | 'archived'

// Интерфейс с использованием type
interface Post extends BaseEntity {
  title: string
  content: string
  status: Status
}

// Mapped type для создания вариаций
type PostPreview = Pick<Post, 'id' | 'title' | 'status'>
```

### Declaration merging для расширения глобальных типов

```typescript
// Расширение Window
interface Window {
  gtag: (...args: any[]) => void
}

// Использование
window.gtag('event', 'page_view')
```

### Типы для утилит

```typescript
// Утилитарные типы
type Nullable<T> = T | null
type Optional<T> = T | undefined
type Maybe<T> = T | null | undefined

// Использование
type User = {
  id: number
  name: string
  email: Maybe<string>
}
```

---

## 35.7. Совместимость interface и type

Интерфейсы и типы совместимы, если их структура совпадает:

```typescript
interface IUser {
  name: string
}

type TUser = {
  name: string
}

// Взаимозаменяемы
const user1: IUser = { name: 'Alice' }
const user2: TUser = user1 // OK
const user3: IUser = user2 // OK
```

**Но есть нюансы:**

```typescript
interface IUser {
  name: string
}

type TUser = {
  name: string
}

// Интерфейс можно расширить
interface Admin extends IUser {
  role: string
}

// Тип нельзя расширить, но можно использовать intersection
type Admin = TUser & {
  role: string
}
```

---

## Вопросы на собеседовании

### 1. В чём разница между interface и type?

`interface` можно расширять через `extends`, поддерживает declaration merging. `type` поддерживает union, intersection, mapped types, более гибкий.

### 2. Когда использовать interface?

Для публичных API, объектов, классов, когда нужна расширяемость или declaration merging.

### 3. Когда использовать type?

Для union types, intersection types, mapped types, утилитарных типов, примитивов.

### 4. Что такое declaration merging?

Автоматическое объединение нескольких объявлений интерфейса с одним именем. Работает только для `interface`, не для `type`.

### 5. Можно ли расширить type?

Напрямую нет, но можно использовать intersection types (`&`).

### 6. Совместимы ли interface и type?

Да, если их структура совпадает. Они взаимозаменяемы в большинстве случаев.
