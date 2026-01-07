# Глава 37. Дженерики

Дженерики позволяют писать переиспользуемый типобезопасный код. Понимание дженериков критично для создания гибких и безопасных API.

---

## 37.1. Зачем нужны дженерики

Дженерики позволяют писать переиспользуемый типобезопасный код:

```typescript
// Без дженериков — нужно дублировать код
function identityNumber(value: number): number {
  return value
}

function identityString(value: string): string {
  return value
}

// С дженериками — один код для всех типов
function identity<T>(value: T): T {
  return value
}

const num = identity<number>(42) // number
const str = identity<string>('hello') // string

// TypeScript может вывести тип
const num2 = identity(42) // автоматически number
```

---

## 37.2. Базовый синтаксис

```typescript
function identity<T>(value: T): T {
  return value
}

// Явное указание типа
const result = identity<number>(42)

// Вывод типа
const result2 = identity(42) // автоматически number
```

### Дженерики в интерфейсах

```typescript
interface Box<T> {
  value: T
}

const numberBox: Box<number> = { value: 42 }
const stringBox: Box<string> = { value: 'hello' }
```

### Дженерики в классах

```typescript
class Container<T> {
  private items: T[] = []

  add(item: T): void {
    this.items.push(item)
  }

  get(index: number): T {
    return this.items[index]
  }
}

const numberContainer = new Container<number>()
numberContainer.add(1)
numberContainer.add(2)

const stringContainer = new Container<string>()
stringContainer.add('hello')
```

---

## 37.3. Ограничения дженериков (Constraints)

```typescript
// Без ограничений
function getLength<T>(value: T): number {
  return value.length // Error: Property 'length' does not exist on type 'T'
}

// С ограничением
function getLength<T extends { length: number }>(value: T): number {
  return value.length // OK
}

getLength('hello') // 5
getLength([1, 2, 3]) // 3
getLength(42) // Error: Argument of type 'number' is not assignable
```

### Ограничение через keyof

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Alice', age: 30 }
const name = getProperty(user, 'name') // string
const age = getProperty(user, 'age') // number
const invalid = getProperty(user, 'email') // Error: Argument of type '"email"' is not assignable
```

---

## 37.4. Множественные параметры типа

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second]
}

const p = pair<string, number>('hello', 42)
// [string, number]
```

### Практический пример

```typescript
function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn)
}

const numbers = [1, 2, 3]
const strings = map(numbers, (n) => n.toString())
// string[]
```

---

## 37.5. Дженерики по умолчанию

```typescript
interface ApiResponse<T = any> {
  data: T
  status: number
}

const response1: ApiResponse = { data: {}, status: 200 }
const response2: ApiResponse<User> = { data: user, status: 200 }
```

---

## 37.6. Дженерики в типах

```typescript
type Optional<T> = T | undefined
type Nullable<T> = T | null
type Maybe<T> = T | null | undefined

type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

type Partial<T> = {
  [K in keyof T]?: T[K]
}

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

---

## 37.7. Условные типы в дженериках

```typescript
type IsArray<T> = T extends any[] ? true : false

type A = IsArray<number[]> // true
type B = IsArray<string> // false

// Извлечение типа элемента массива
type ArrayElement<T> = T extends (infer E)[] ? E : never

type Numbers = ArrayElement<number[]> // number
type Strings = ArrayElement<string[]> // string
```

---

## 37.8. Практические примеры

### API клиент

```typescript
interface ApiClient {
  get<T>(url: string): Promise<T>
  post<T, U>(url: string, data: T): Promise<U>
}

const client: ApiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url)
    return response.json()
  },
  async post<T, U>(url: string, data: T): Promise<U> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.json()
  },
}

const user = await client.get<User>('/api/users/1')
const newUser = await client.post<CreateUserDto, User>('/api/users', userData)
```

### Кэш

```typescript
class Cache<T> {
  private data: Map<string, T> = new Map()

  set(key: string, value: T): void {
    this.data.set(key, value)
  }

  get(key: string): T | undefined {
    return this.data.get(key)
  }

  has(key: string): boolean {
    return this.data.has(key)
  }
}

const userCache = new Cache<User>()
userCache.set('user-1', user)
const cachedUser = userCache.get('user-1')
```

### Утилиты для работы с массивами

```typescript
function first<T>(array: T[]): T | undefined {
  return array[0]
}

function last<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}

function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate)
}

const numbers = [1, 2, 3, 4, 5]
const firstNum = first(numbers) // number | undefined
const evens = filter(numbers, (n) => n % 2 === 0) // number[]
```

---

## 37.9. Продвинутые паттерны

### Flatten

```typescript
type Flatten<T> = T extends (infer U)[]
  ? U extends any[]
    ? Flatten<U>
    : U
  : T

type Nested = number[][]
type Flat = Flatten<Nested> // number
```

### DeepReadonly

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

type User = {
  name: string
  profile: {
    age: number
    email: string
  }
}

type ReadonlyUser = DeepReadonly<User>
// Все поля readonly, включая вложенные
```

---

## Вопросы на собеседовании

### 1. Что такое дженерики?

Механизм для создания переиспользуемого типобезопасного кода, работающего с разными типами.

### 2. Как ограничить дженерик?

Использовать `extends`: `function example<T extends Constraint>(value: T) {}`

### 3. Можно ли использовать несколько параметров типа?

Да: `function pair<T, U>(first: T, second: U): [T, U] {}`

### 4. Как вывести тип из дженерика?

Использовать `infer`: `type Element<T> = T extends (infer U)[] ? U : never`

### 5. Что такое дженерики по умолчанию?

Значение по умолчанию для параметра типа: `interface Example<T = string> {}`

### 6. В чём разница между дженериками и any?

Дженерики сохраняют типобезопасность, `any` отключает проверку типов.
