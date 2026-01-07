# Глава 39. Branded types и безопасные идентификаторы

Branded types позволяют создавать номинальные типы в структурной системе типизации TypeScript. Это критично для предотвращения ошибок смешивания разных типов с одинаковой структурой.

---

## 39.1. Проблема структурной типизации

**Проблема:** TypeScript использует структурную типизацию — два типа с одинаковой структурой взаимозаменяемы.

```typescript
type UserId = string
type PostId = string

function getUser(id: UserId) {
  // ...
}

const postId: PostId = 'post-123'
getUser(postId) //  Компилируется, но логически неверно!
```

Это может привести к ошибкам, когда разные сущности имеют одинаковый базовый тип.

---

## 39.2. Решение: Branded Types

Branded types добавляют уникальный маркер к типу, делая его несовместимым с другими типами.

### Базовый подход

```typescript
// Создаём уникальный бренд через unique symbol
declare const UserIdBrand: unique symbol
declare const PostIdBrand: unique symbol

type UserId = string & { readonly [UserIdBrand]: typeof UserIdBrand }
type PostId = string & { readonly [PostIdBrand]: typeof PostIdBrand }

// Функции-конструкторы с валидацией
function createUserId(id: string): UserId {
  if (!id.startsWith('user-')) {
    throw new Error('Invalid user ID format')
  }
  return id as UserId
}

function createPostId(id: string): PostId {
  if (!id.startsWith('post-')) {
    throw new Error('Invalid post ID format')
  }
  return id as PostId
}

// Теперь типы несовместимы
function getUser(id: UserId) {
  // ...
}

const userId = createUserId('user-123')
const postId = createPostId('post-456')

getUser(userId) //  OK
getUser(postId) //  Type 'PostId' is not assignable to type 'UserId'
```

### Упрощённый подход с строковым брендом

```typescript
type UserId = string & { readonly __brand: 'UserId' }
type PostId = string & { readonly __brand: 'PostId' }

function createUserId(id: string): UserId {
  if (!id.startsWith('user-')) {
    throw new Error('Invalid user ID format')
  }
  return id as UserId
}

function createPostId(id: string): PostId {
  if (!id.startsWith('post-')) {
    throw new Error('Invalid post ID format')
  }
  return id as PostId
}
```

---

## 39.3. Практическое применение

### Валидированные данные

```typescript
type ValidatedEmail = string & { readonly __brand: 'ValidatedEmail' }
type ValidatedPhone = string & { readonly __brand: 'ValidatedPhone' }

function validateEmail(email: string): ValidatedEmail {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) {
    throw new Error('Invalid email')
  }
  return email as ValidatedEmail
}

function validatePhone(phone: string): ValidatedPhone {
  const regex = /^\+?[1-9]\d{1,14}$/
  if (!regex.test(phone)) {
    throw new Error('Invalid phone')
  }
  return phone as ValidatedPhone
}

// API принимает только валидированные данные
function sendEmail(to: ValidatedEmail, subject: string) {
  // Гарантированно валидный email
}

//  Не компилируется
sendEmail('invalid', 'Test')

//  OK
const email = validateEmail('user@example.com')
sendEmail(email, 'Test')
```

### Единицы измерения

```typescript
// Создаём номинальные типы для различных единиц измерения
type Meters = number & { readonly __brand: unique symbol }
type Feet = number & { readonly __brand: unique symbol }
type Kilometers = number & { readonly __brand: unique symbol }

function meters(value: number): Meters {
  return value as Meters
}

function feet(value: number): Feet {
  return value as Feet
}

function kilometers(value: number): Kilometers {
  return value as Kilometers
}

// Конвертация между единицами
function metersToKilometers(m: Meters): Kilometers {
  return kilometers(m / 1000)
}

function feetToMeters(f: Feet): Meters {
  return meters(f * 0.3048)
}

// Использование
const distance = meters(100)
const distanceInKm = metersToKilometers(distance)

//  Нельзя смешивать разные единицы
function calculateArea(width: Meters, height: Feet) {
  //  Type error!
  return width * height
}
```

---

## 39.4. Безопасные идентификаторы

### Базовый паттерн

```typescript
type UserId = string & { readonly __brand: 'UserId' }
type PostId = string & { readonly __brand: 'PostId' }
type CommentId = string & { readonly __brand: 'CommentId' }

function createUserId(id: string): UserId {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid user ID')
  }
  return id as UserId
}

function createPostId(id: string): PostId {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid post ID')
  }
  return id as PostId
}

// Использование
function getUser(id: UserId): User {
  // ...
}

function getPost(id: PostId): Post {
  // ...
}

const userId = createUserId('user-123')
const postId = createPostId('post-456')

getUser(userId) //  OK
getUser(postId) //  Error
```

### Генерация идентификаторов

```typescript
function generateUserId(): UserId {
  return createUserId(`user-${crypto.randomUUID()}`)
}

function generatePostId(): PostId {
  return createPostId(`post-${crypto.randomUUID()}`)
}
```

---

## 39.5. Branded types с валидацией

```typescript
type PositiveNumber = number & { readonly __brand: 'PositiveNumber' }

function createPositiveNumber(value: number): PositiveNumber {
  if (value <= 0) {
    throw new Error('Number must be positive')
  }
  return value as PositiveNumber
}

type NonEmptyString = string & { readonly __brand: 'NonEmptyString' }

function createNonEmptyString(value: string): NonEmptyString {
  if (value.trim().length === 0) {
    throw new Error('String must not be empty')
  }
  return value as NonEmptyString
}
```

---

## 39.6. Комбинирование с другими типами

```typescript
type UserId = string & { readonly __brand: 'UserId' }
type PostId = string & { readonly __brand: 'PostId' }

interface User {
  id: UserId
  name: string
}

interface Post {
  id: PostId
  authorId: UserId
  title: string
}

function createPost(authorId: UserId, title: string): Post {
  return {
    id: createPostId(`post-${Date.now()}`),
    authorId,
    title,
  }
}

const userId = createUserId('user-123')
const post = createPost(userId, 'My Post')
//  Типы совместимы
```

---

## 39.7. Утилита для создания branded types

```typescript
type Brand<T, B> = T & { readonly __brand: B }

type UserId = Brand<string, 'UserId'>
type PostId = Brand<string, 'PostId'>
type Email = Brand<string, 'Email'>

function createUserId(id: string): UserId {
  // валидация
  return id as UserId
}
```

---

## 39.8. Ограничения и предостережения

### Runtime поведение

Branded types существуют только на уровне типов. В runtime это обычные значения:

```typescript
const userId: UserId = createUserId('user-123')
const regularString: string = userId //  Работает в runtime

// Но TypeScript предотвращает смешивание на этапе компиляции
function processString(str: string) {
  // ...
}

processString(userId) //  OK, так как UserId extends string
```

### Производительность

Branded types не влияют на производительность — это только проверки типов на этапе компиляции.

---

## Вопросы на собеседовании

### 1. Что такое Branded Types?

Механизм для создания номинальных типов в структурной системе типизации TypeScript через добавление уникального маркера.

### 2. Зачем нужны Branded Types?

Для предотвращения ошибок смешивания разных типов с одинаковой структурой (например, UserId и PostId).

### 3. Как создать Branded Type?

Использовать intersection с объектом, содержащим уникальный маркер: `type UserId = string & { readonly __brand: 'UserId' }`

### 4. Работают ли Branded Types в runtime?

Нет, это только проверки типов на этапе компиляции. В runtime это обычные значения.

### 5. Можно ли использовать Branded Types с числами?

Да, например, для единиц измерения: `type Meters = number & { readonly __brand: 'Meters' }`

### 6. Как валидировать Branded Types?

Создавать функции-конструкторы, которые проверяют значение перед приведением к branded типу.
