# Глава 38. Продвинутые типы: Utility types, Discriminated unions, Type guards, Conditional/Mapped/Template literal types

Продвинутые типы TypeScript позволяют создавать мощные и гибкие системы типизации. Понимание этих концепций критично для написания типобезопасного кода на уровне Senior.

---

## 38.1. Utility Types

TypeScript предоставляет готовые утилиты для работы с типами.

### Pick<T, K>

Выбирает указанные свойства из типа:

```typescript
type User = { id: number; name: string; email: string; role: string }
type UserPreview = Pick<User, 'id' | 'name'>
// { id: number; name: string }
```

### Omit<T, K>

Исключает указанные свойства:

```typescript
type UserWithoutId = Omit<User, 'id'>
// { name: string; email: string; role: string }
```

### Partial<T>

Делает все свойства опциональными:

```typescript
type UserUpdate = Partial<User>
// { id?: number; name?: string; email?: string; role?: string }
```

### Required<T>

Делает все свойства обязательными:

```typescript
type RequiredUser = Required<Partial<User>>
// все поля обязательны
```

### Readonly<T>

Делает все свойства только для чтения:

```typescript
type ReadonlyUser = Readonly<User>
// все поля readonly
```

### Record<K, T>

Создаёт тип объекта с заданными ключами и значениями:

```typescript
type UserRoles = Record<string, 'admin' | 'user'>
// { [key: string]: "admin" | "user" }

type UserMap = Record<number, User>
// { [key: number]: User }
```

### Exclude<T, U> / Extract<T, U>

**Exclude** — исключает типы из union:

```typescript
type T = Exclude<'a' | 'b' | 'c', 'a'> // "b" | "c"
```

**Extract** — извлекает типы из union:

```typescript
type U = Extract<'a' | 'b' | 'c', 'a' | 'b'> // "a" | "b"
```

### NonNullable<T>

Удаляет `null` и `undefined` из типа:

```typescript
type T = NonNullable<string | null | undefined> // string
```

### ReturnType<T> / Parameters<T>

Получает тип возвращаемого значения и параметров функции:

```typescript
type Fn = (a: number, b: string) => boolean
type R = ReturnType<Fn> // boolean
type P = Parameters<Fn> // [number, string]
```

### Awaited<T>

Распаковывает Promise:

```typescript
type UserPromise = Promise<User>
type UserValue = Awaited<UserPromise> // User
```

---

## 38.2. Discriminated Unions

Один из самых мощных паттернов TypeScript. Позволяет TypeScript точно определять тип на основе дискриминанта.

### Базовый пример

```typescript
type Action =
  | { type: 'ADD'; payload: number }
  | { type: 'REMOVE'; payload: number }
  | { type: 'RESET' }

function reducer(action: Action) {
  switch (action.type) {
    case 'ADD':
      return action.payload // TypeScript знает, что payload есть
    case 'REMOVE':
      return -action.payload
    case 'RESET':
      return 0
    default:
      const _exhaustive: never = action // проверка полноты
      return _exhaustive
  }
}
```

### Практический пример: API ответы

```typescript
type ApiResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
  | { status: 'loading' }

function handleResult<T>(result: ApiResult<T>) {
  switch (result.status) {
    case 'loading':
      return 'Loading...'
    case 'success':
      return result.data // TypeScript знает, что data есть
    case 'error':
      return result.message // TypeScript знает, что message есть
  }
}
```

### Exhaustive checks

TypeScript гарантирует, что все кейсы обработаны:

```typescript
type Status = 'idle' | 'loading' | 'success' | 'error'

function handleStatus(status: Status) {
  switch (status) {
    case 'idle':
      return 'Ready'
    case 'loading':
      return 'Loading...'
    case 'success':
      return 'Done'
    // Если добавишь новый статус, будет ошибка
    default:
      const _exhaustive: never = status
      return _exhaustive
  }
}
```

---

## 38.3. Type Guards

Позволяют сузить тип в условных блоках.

### typeof guards

```typescript
function process(value: string | number) {
  if (typeof value === 'string') {
    // здесь value — string
    console.log(value.toUpperCase())
  } else {
    // здесь value — number
    console.log(value.toFixed(2))
  }
}
```

### instanceof guards

```typescript
class User {
  name: string
}

class Admin {
  role: string
}

function processUser(user: User | Admin) {
  if (user instanceof User) {
    // здесь user — User
    console.log(user.name)
  } else {
    // здесь user — Admin
    console.log(user.role)
  }
}
```

### in guards

```typescript
interface User {
  name: string
}

interface Admin {
  name: string
  role: string
}

function processUser(user: User | Admin) {
  if ('role' in user) {
    // здесь user — Admin
    console.log(user.role)
  } else {
    // здесь user — User
    console.log(user.name)
  }
}
```

### Пользовательские type guards

```typescript
function isAdmin(user: User | Admin): user is Admin {
  return 'role' in user && user.role === 'admin'
}

function processUser(user: User | Admin) {
  if (isAdmin(user)) {
    // здесь user — Admin
    console.log(user.role)
  } else {
    // здесь user — User
    console.log(user.name)
  }
}
```

---

## 38.4. Conditional Types

Условные типы позволяют выбирать тип на основе условия.

### Базовый синтаксис

```typescript
type IsArray<T> = T extends any[] ? true : false

type A = IsArray<number[]> // true
type B = IsArray<string> // false
```

### Infer для извлечения типов

```typescript
// Извлечение типа возвращаемого значения
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function getUser() {
  return { id: 1, name: 'John' }
}

type User = ReturnType<typeof getUser>
// User = { id: number; name: string; }

// Извлечение типа элементов массива
type ArrayElement<T> = T extends (infer E)[] ? E : never

type Numbers = ArrayElement<number[]> // number
type Strings = ArrayElement<string[]> // string

// Извлечение типов параметров Promise
type Awaited<T> = T extends Promise<infer U> ? U : T

type Value = Awaited<Promise<string>> // string
type Value2 = Awaited<number> // number
```

### Распределительные Conditional Types

```typescript
// Базовый пример
type Extract<T, U> = T extends U ? T : never

type Result = Extract<'a' | 'b' | 'c', 'a' | 'f'>
// Result = 'a'

// Практический пример: извлечение функциональных свойств
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

interface User {
  name: string
  age: number
  greet(): void
  sayGoodbye(): void
}

type UserMethods = FunctionPropertyNames<User>
// UserMethods = 'greet' | 'sayGoodbye'
```

### Сложные conditional types

```typescript
// Фильтрация типов
type NonNullable<T> = T extends null | undefined ? never : T

type Result = NonNullable<string | null | undefined>
// Result = string

// Извлечение обязательных полей
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

interface User {
  id: number
  name: string
  email?: string
  phone?: string
}

type Required = RequiredKeys<User>
// Required = 'id' | 'name'
```

---

## 38.5. Mapped Types

Позволяют создавать новые типы на основе существующих.

### Базовый синтаксис

```typescript
type Optional<T> = {
  [K in keyof T]?: T[K]
}

type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}
```

### Key Remapping

```typescript
// Префикс для всех ключей
type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K]
}

interface User {
  id: number
  name: string
}

type DBUser = PrefixKeys<User, 'db_'>
// { db_id: number; db_name: string; }

// Фильтрация ключей
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}

interface Mixed {
  id: number
  name: string
  isActive: boolean
  callback: () => void
}

type NoFunctions = OmitByType<Mixed, Function>
// { id: number; name: string; isActive: boolean; }
```

### Getters/Setters

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void
}

interface State {
  count: number
  name: string
}

type StateGetters = Getters<State>
// { getCount: () => number; getName: () => string; }

type StateSetters = Setters<State>
// { setCount: (value: number) => void; setName: (value: string) => void; }
```

---

## 38.6. Template Literal Types

Позволяют создавать типы на основе строковых шаблонов.

### Базовый пример

```typescript
type Color = 'red' | 'blue' | 'green'
type Quantity = 'one' | 'two' | 'three'

type ColoredQuantity = `${Quantity}-${Color}`
// 'one-red' | 'one-blue' | 'one-green' | 'two-red' | ...
```

### Практический пример: API endpoints

```typescript
type HTTPMethod = 'get' | 'post' | 'put' | 'delete'
type Resource = 'users' | 'posts' | 'comments'

type APIEndpoint = `/${Resource}`
type APIMethod = `${HTTPMethod}${Capitalize<Resource>}`

type UserAPI = APIMethod
// 'getUsers' | 'postUsers' | 'putUsers' | 'deleteUsers' | ...
```

### Утилиты для строк

```typescript
// Intrinsic String Manipulation Types
type Uppercase<S extends string> = intrinsic
type Lowercase<S extends string> = intrinsic
type Capitalize<S extends string> = intrinsic
type Uncapitalize<S extends string> = intrinsic

// Пример использования
type Method = 'getUserById'
type UpperMethod = Uppercase<Method> // 'GETUSERBYID'
type LowerMethod = Lowercase<Method> // 'getuserbyid'
```

### Парсинг строк

```typescript
type Split<S extends string, D extends string> =
  S extends `${infer T}${D}${infer U}`
    ? [T, ...Split<U, D>]
    : [S]

type Path = 'user.profile.name'
type PathSegments = Split<Path, '.'>
// ['user', 'profile', 'name']
```

---

## 38.7. Рекурсивные типы

### DeepReadonly

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K]
}

interface Config {
  database: {
    host: string
    port: number
    credentials: {
      username: string
      password: string
    }
  }
  cache: {
    ttl: number
  }
}

type ReadonlyConfig = DeepReadonly<Config>
// Все вложенные поля становятся readonly
```

### DeepPartial

```typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K]
}

// Используется для частичных обновлений
function updateConfig(updates: DeepPartial<Config>) {
  // Можно передать любой вложенный объект
}

updateConfig({
  database: {
    credentials: {
      password: 'new-password' // Только один вложенный ключ
    }
  }
})
```

### Flatten Array Type

```typescript
type Flatten<T> = T extends Array<infer U>
  ? U extends Array<any>
    ? Flatten<U>
    : U
  : T

type NestedArray = number[][][]
type Flat = Flatten<NestedArray> // number
```

---

## Вопросы на собеседовании

### 1. Что такое Utility Types?

Готовые утилиты TypeScript для работы с типами: Pick, Omit, Partial, Required, Readonly и другие.

### 2. Что такое Discriminated Unions?

Union типы с общим полем-дискриминантом, позволяющие TypeScript точно определять тип в switch/case.

### 3. Что такое Type Guards?

Функции и проверки, которые сужают тип в условных блоках.

### 4. Что такое Conditional Types?

Типы, которые выбирают один из вариантов на основе условия через тернарный оператор.

### 5. Что такое Mapped Types?

Типы, которые создают новые типы на основе существующих, итерируя по ключам.

### 6. Что такое Template Literal Types?

Типы, созданные на основе строковых шаблонов, позволяющие генерировать union типы из строк.

### 7. Как работает infer в Conditional Types?

Позволяет извлекать типы из других типов, например, тип возвращаемого значения функции.

- Понимание продвинутых типов критично для Senior уровня