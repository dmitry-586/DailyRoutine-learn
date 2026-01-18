# Глава 39. Branded types и безопасные идентификаторы

Branded types позволяют создавать номинальные типы в структурной системе типизации TypeScript. Это способ «имитации номинальных типов» для предотвращения ошибок смешивания разных типов с одинаковой структурой.

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

Branded types добавляют уникальный маркер к типу через `unique symbol`, делая его несовместимым с другими типами.

### Базовый подход с unique symbol

```typescript
// Создаём уникальный бренд через unique symbol
declare const UserIdBrand: unique symbol
declare const PostIdBrand: unique symbol

type UserId = string & { readonly [UserIdBrand]: typeof UserIdBrand }
type PostId = string & { readonly [PostIdBrand]: typeof PostIdBrand }

// Функции-конструкторы
function createUserId(id: string): UserId {
  return id as UserId
}

function createPostId(id: string): PostId {
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

**Зачем это нужно:** Чтобы не перепутать `UserId` и `PostId`, даже если они оба являются строками.

---

## 39.3. Ограничения

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

Branded types не влияют на производительность — это только проверки типов на этапе компиляции.

---

## Вопросы на собеседовании

### 1. Что такое Branded Types?

Механизм для создания номинальных типов в структурной системе типизации TypeScript через добавление уникального маркера.

### 2. Зачем нужны Branded Types?

Для предотвращения ошибок смешивания разных типов с одинаковой структурой (например, UserId и PostId).

### 3. Как создать Branded Type?

Использовать intersection с `unique symbol`: `type UserId = string & { readonly [UserIdBrand]: typeof UserIdBrand }`

### 4. Работают ли Branded Types в runtime?

Нет, это только проверки типов на этапе компиляции. В runtime это обычные значения.

### 5. Можно ли использовать Branded Types с числами?

Да, например, для единиц измерения: `type Meters = number & { readonly [MetersBrand]: typeof MetersBrand }`
