# Глава 34. Типы: any, unknown, never, Union, Intersection, literal types

Понимание специальных типов TypeScript критично для написания безопасного и гибкого кода. Эти типы позволяют точно описывать структуры данных и ограничения.

---

## 34.1. Иерархия типов

TypeScript имеет иерархию типов, где каждый тип занимает своё место:

**Ключевые понятия:**

- **`unknown`** — верхушечный тип (супертип для всего). Любой тип можно присвоить `unknown`, но использовать его нельзя без проверки. Это самый широкий тип в системе.
- **`never`** — низший тип (подтип для всего). `never` можно присвоить любому типу, но значение типа `never` получить невозможно. Это самый узкий тип в системе.

Между ними находятся все остальные типы: `object`, `number`, `string`, `Array<T>` и другие. Эта иерархия — основа для понимания совместимости типов в TypeScript.

```typescript
// unknown — супертип, принимает всё
let value: unknown = 42
value = 'hello'
value = { data: 'test' }

// never — подтип, можно присвоить куда угодно
function fail(): never {
  throw new Error()
}

let num: number = fail() // OK
let str: string = fail() // OK
```

---

## 34.2. any — отключение проверки типов

`any` полностью отключает проверку типов. Использовать **крайне редко**.

```typescript
let x: any = 5
x = 'string' // OK, но теряем безопасность типов
x.foo() // OK, но может упасть в runtime
```

**Когда использовать:**

- Миграция существующего JavaScript кода
- Работа с динамическими данными без типов
- Временное решение при рефакторинге

**Проблемы с any:**

```typescript
function process(data: any) {
  return data.value.toUpperCase() // Может упасть, если data.value не строка
}

process({ value: 42 }) // Runtime error!
```

---

## 34.3. unknown — безопасная альтернатива any

`unknown` требует проверки типа перед использованием:

```typescript
let x: unknown = getData()

// Ошибка: нельзя использовать без проверки
x.toUpperCase() // Error: Object is of type 'unknown'

// Нужна проверка типа
if (typeof x === 'string') {
  x.toUpperCase() // OK, теперь TypeScript знает, что x — string
}
```

**Правило:** Используй `unknown` вместо `any`, когда тип неизвестен.

**Практический пример:**

```typescript
function safeProcess(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    const obj = data as { value: unknown }
    if (typeof obj.value === 'string') {
      return obj.value.toUpperCase()
    }
  }
  throw new Error('Invalid data')
}
```

---

## 34.4. never — тип для невозможных значений

`never` означает, что значение никогда не появится:

```typescript
// Функция, которая всегда выбрасывает ошибку
function fail(): never {
  throw new Error('Something went wrong')
}

// Функция с бесконечным циклом
function infiniteLoop(): never {
  while (true) {
    // ...
  }
}
```

### Exhaustive checks в switch

```typescript
type Status = 'loading' | 'success' | 'error'

function handleStatus(status: Status) {
  switch (status) {
    case 'loading':
      return 'Loading...'
    case 'success':
      return 'Success!'
    case 'error':
      return 'Error!'
    default:
      const _exhaustive: never = status // Если добавишь новый статус, будет ошибка
      return _exhaustive
  }
}
```

**Если добавить новый вариант:**

```typescript
type Status = 'loading' | 'success' | 'error' | 'pending'

// Теперь будет ошибка в default, потому что 'pending' не обработан
```

### never в union types

```typescript
type NonEmptyArray<T> = T[] & { 0: T }

function first<T>(arr: NonEmptyArray<T>): T {
  return arr[0]
}

first([]) // Error: Type '[]' is not assignable to type 'NonEmptyArray<never>'
```

---

## 34.5. Union types (|)

Позволяет ограничить набор допустимых значений:

```typescript
type Status = 'loading' | 'success' | 'error'
type ID = string | number

function processStatus(status: Status) {
  // TypeScript знает все возможные значения
  if (status === 'loading') {
    // ...
  }
}
```

### Union для разных типов

```typescript
type StringOrNumber = string | number

function format(value: StringOrNumber): string {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value.toString()
}
```

### Discriminated unions

```typescript
type Success = { status: 'success'; data: string }
type Error = { status: 'error'; message: string }
type Loading = { status: 'loading' }

type Result = Success | Error | Loading

function handleResult(result: Result) {
  switch (result.status) {
    case 'success':
      console.log(result.data) // TypeScript знает, что есть data
      break
    case 'error':
      console.error(result.message) // TypeScript знает, что есть message
      break
    case 'loading':
      console.log('Loading...')
      break
  }
}
```

---

## 34.6. Intersection types (&)

Объединяет несколько типов:

```typescript
type User = { name: string }
type Admin = { role: string }

type AdminUser = User & Admin
// { name: string; role: string }

const admin: AdminUser = {
  name: 'Alice',
  role: 'admin',
}
```

**Практический пример:**

```typescript
type Timestamped = { createdAt: Date }
type Identifiable = { id: number }

type Entity = Timestamped & Identifiable & { name: string }

const entity: Entity = {
  id: 1,
  name: 'Item',
  createdAt: new Date(),
}
```

### Intersection с функциями

```typescript
type Loggable = {
  log: (message: string) => void
}

type Serializable = {
  serialize: () => string
}

type Logger = Loggable & Serializable

const logger: Logger = {
  log: (msg) => console.log(msg),
  serialize: () => JSON.stringify({}),
}
```

---

## 34.7. Literal types

Тип, который может быть только конкретным значением:

```typescript
let direction: 'left' | 'right' = 'left'
let size: 1 | 2 | 3 = 2

// Функция принимает только конкретные значения
function setTheme(theme: 'light' | 'dark') {
  // ...
}

setTheme('light') // OK
setTheme('auto') // Error: Argument of type '"auto"' is not assignable
```

### Вывод максимально узких типов через const

Ключевое слово `const` заставляет TypeScript выводить максимально узкий тип — литеральный тип вместо общего:

```typescript
// let — выводит общий тип
let value = true // тип: boolean

// const — выводит литеральный тип
const value = true // тип: true (не boolean!)

// Это уникальная фишка TypeScript
const theme = 'dark' // тип: "dark" (не string)
const count = 42 // тип: 42 (не number)
```

Это позволяет создавать точные типы без явных аннотаций:

```typescript
// Без const — общий тип
let config = {
  theme: 'dark',
  size: 10,
}
// тип: { theme: string; size: number }

// С const — литеральные типы
const config = {
  theme: 'dark',
  size: 10,
}
// тип: { theme: "dark"; size: 10 }
```

### String literal types

```typescript
type Theme = 'light' | 'dark'
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

function request(method: Method, url: string) {
  // ...
}

request('GET', '/api') // OK
request('PATCH', '/api') // Error
```

### Number literal types

```typescript
type Size = 8 | 16 | 32 | 64

function setSize(size: Size) {
  // ...
}

setSize(16) // OK
setSize(20) // Error
```

### Boolean literal types

```typescript
type TrueOnly = true

function enable(flag: TrueOnly) {
  // ...
}

enable(true) // OK
enable(false) // Error
```

---

## 34.8. const assertions

Делает объект/массив **рекурсивно readonly** и выводит максимально узкие типы (литеральные типы):

```typescript
// Без const assertion
const config = {
  theme: 'dark',
  size: 10,
}
// Тип: { theme: string; size: number }

// С const assertion — рекурсивно readonly
const config = {
  theme: 'dark',
  size: 10,
  nested: {
    value: 'test',
  },
} as const
// Тип: { 
//   readonly theme: "dark"; 
//   readonly size: 10;
//   readonly nested: { readonly value: "test" }
// }

// Все свойства становятся readonly, включая вложенные
config.theme = 'light' // Error: Cannot assign to 'theme' because it is a read-only property
config.nested.value = 'new' // Error: Cannot assign to 'value' because it is a read-only property

// Массивы
const colors = ['red', 'green', 'blue'] as const
// Тип: readonly ["red", "green", "blue"]
// colors[0] имеет тип "red", а не string
```

### Извлечение типов из const assertions

```typescript
const themes = ['light', 'dark'] as const
type Theme = typeof themes[number] // 'light' | 'dark'

const config = {
  api: {
    url: 'https://api.example.com',
    timeout: 5000,
  },
} as const

type Config = typeof config
// { readonly api: { readonly url: "https://api.example.com"; readonly timeout: 5000 } }
```

---

## 34.9. Кортежи (Tuples)

Кортеж — массив с **фиксированной длиной** и известными типами элементов на каждой позиции:

```typescript
type Point = [number, number]
type UserInfo = [string, number, boolean]

const point: Point = [10, 20]
const user: UserInfo = ['Alice', 30, true]

// Доступ по индексу
const x = point[0] // number
const name = user[0] // string
```

**Ключевая особенность:** Кортеж гарантирует фиксированную структуру — количество элементов и их типы на каждой позиции известны заранее.

### Optional элементы в кортежах

```typescript
type OptionalTuple = [string, number?]

const t1: OptionalTuple = ['hello'] // OK
const t2: OptionalTuple = ['hello', 42] // OK
```

### Readonly кортежи

```typescript
type ReadonlyPoint = readonly [number, number]

const point: ReadonlyPoint = [10, 20]
point[0] = 30 // Error: Cannot assign to '0' because it is a read-only property
```

---

## Вопросы на собеседовании

### 1. В чём разница между any и unknown?

`any` отключает проверку типов полностью. `unknown` требует проверки типа перед использованием, более безопасен.

### 2. Когда использовать never?

Для функций, которые никогда не возвращают значение (throw, infinite loop), и для exhaustive checks в switch.

### 3. Что такое union types?

Тип, который может быть одним из нескольких вариантов. Обозначается через `|`.

### 4. Что такое intersection types?

Тип, который объединяет несколько типов. Обозначается через `&`.

### 5. Что такое literal types?

Тип, который может быть только конкретным значением (например, `'light'` или `'dark'`).

### 6. Что делает const assertion?

Делает объект/массив readonly и выводит максимально узкие типы (literal types вместо общих).

### 7. Что такое кортеж?

Массив с фиксированной длиной и известными типами элементов на каждой позиции.

- Кортежи для массивов с фиксированной структурой