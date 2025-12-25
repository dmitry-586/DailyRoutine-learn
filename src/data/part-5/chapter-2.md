# Глава 17. Типы, интерфейсы и функции

Эта глава углубляется в систему типов TypeScript: как описывать структуры данных через интерфейсы и типы, как типизировать функции и использовать продвинутые возможности системы типов.

---

## 17.1. Интерфейсы (Interfaces)

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
const w: Window = {
  myCustomProperty: 'test',
  anotherProperty: 42,
  // ... остальные свойства Window
}
```

---

## 17.2. Типы (Type Aliases)

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

### Различия между interface и type

**interface:**

- ✅ Можно расширять через `extends`
- ✅ Поддерживает declaration merging
- ❌ Не поддерживает union types напрямую
- ✅ Лучше для объектов и классов

**type:**

- ❌ Нельзя расширять (но можно использовать intersection)
- ❌ Не поддерживает declaration merging
- ✅ Поддерживает union, intersection, mapped types
- ✅ Лучше для композиций и утилитарных типов

### Когда использовать interface, когда type?

**Используй interface для:**

- Публичных API
- Объектов и классов
- Когда нужна расширяемость

```typescript
interface ButtonProps {
  title: string
  onClick: () => void
}
```

**Используй type для:**

- Union types
- Intersection types
- Mapped types
- Утилитарных типов

```typescript
type Theme = 'light' | 'dark'
type ButtonVariant = 'primary' | 'secondary'
type Optional<T> = { [K in keyof T]?: T[K] }
```

---

## 17.3. Типизация функций

### Базовый синтаксис

```typescript
// Обычная функция
function greet(name: string): string {
  return `Hello, ${name}!`
}

// Стрелочная функция
const greet = (name: string): string => {
  return `Hello, ${name}!`
}

// Функция без возвращаемого значения
function log(message: string): void {
  console.log(message)
}
```

### Опциональные параметры

```typescript
function createUser(name: string, age?: number): User {
  return {
    name,
    age: age ?? 0,
  }
}

createUser('Alice') // OK
createUser('Bob', 30) // OK
```

### Параметры по умолчанию

```typescript
function greet(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}!`
}

greet('Alice') // 'Hello, Alice!'
greet('Bob', 'Hi') // 'Hi, Bob!'
```

### Rest параметры

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0)
}

sum(1, 2, 3) // 6
sum(1, 2, 3, 4, 5) // 15
```

### Типы функций

Функция как тип:

```typescript
// Тип функции как переменной
type MathOperation = (a: number, b: number) => number

const add: MathOperation = (a, b) => a + b
const multiply: MathOperation = (a, b) => a * b

// Использование типа функции
function calculate(a: number, b: number, op: MathOperation): number {
  return op(a, b)
}

calculate(5, 3, add) // 8
calculate(5, 3, multiply) // 15
```

### Функции как свойства объекта

```typescript
interface Calculator {
  add: (a: number, b: number) => number
  subtract: (a: number, b: number) => number
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
}
```

### Перегрузка функций (Function Overloads)

Позволяет описать несколько сигнатур для одной функции:

```typescript
function format(value: string): string
function format(value: number): string
function format(value: boolean): string
function format(value: string | number | boolean): string {
  return String(value)
}

format('hello') // string
format(42) // string
format(true) // string
```

**Практический пример:**

```typescript
// Разные сигнатуры для разных случаев
function getData(id: number): Promise<User>
function getData(ids: number[]): Promise<User[]>
function getData(idOrIds: number | number[]): Promise<User | User[]> {
  if (Array.isArray(idOrIds)) {
    return fetchUsers(idOrIds)
  }
  return fetchUser(idOrIds)
}

// TypeScript знает тип возвращаемого значения
const user = await getData(1) // Promise<User>
const users = await getData([1, 2, 3]) // Promise<User[]>
```

---

## 17.4. this в функциях

### Типизация this

TypeScript позволяет явно указать тип `this`:

```typescript
interface User {
  name: string
  greet(this: User): void
}

const user: User = {
  name: 'Alice',
  greet() {
    console.log(`Hello, I'm ${this.name}`)
  },
}

user.greet() // OK
const greet = user.greet
greet() // Error: The 'this' context of type 'void' is not assignable
```

### Связанные функции (Bound functions)

```typescript
class Button {
  constructor(public label: string) {}

  onClick(this: Button) {
    console.log(`Clicked: ${this.label}`)
  }
}

const button = new Button('Submit')
button.onClick() // OK

const onClick = button.onClick
onClick() // Error: 'this' context is lost

// Решение: bind
const boundOnClick = button.onClick.bind(button)
boundOnClick() // OK
```

---

## 17.5. Дженерики (Generics)

### Зачем нужны дженерики

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

### Ограничения дженериков (extends)

```typescript
// T должен иметь свойство length
function logLength<T extends { length: number }>(value: T) {
  console.log(value.length)
}

logLength('string') // OK
logLength([1, 2, 3]) // OK
logLength(42) // Error: Argument of type 'number' is not assignable
```

### Дженерики в интерфейсах

```typescript
interface ApiResponse<T> {
  data: T
  error?: string
  status: number
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'Alice' },
  status: 200,
}

const usersResponse: ApiResponse<User[]> = {
  data: [{ id: 1, name: 'Alice' }],
  status: 200,
}
```

### Дженерики в классах

```typescript
class Repository<T> {
  private items: T[] = []

  add(item: T): void {
    this.items.push(item)
  }

  find(id: number): T | undefined {
    return this.items.find((item) => (item as any).id === id)
  }

  getAll(): T[] {
    return this.items
  }
}

const userRepo = new Repository<User>()
userRepo.add({ id: 1, name: 'Alice' })
const user = userRepo.find(1) // User | undefined
```

### Множественные дженерики

```typescript
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn)
}

const numbers = [1, 2, 3]
const strings = map(numbers, (n) => n.toString()) // string[]
```

### Дженерики с ограничениями и значениями по умолчанию

```typescript
// Ограничение: T должен иметь id
interface Identifiable {
  id: number
}

// Значение по умолчанию: если не указан, используется Identifiable
function findById<T extends Identifiable = Identifiable>(
  items: T[],
  id: number,
): T | undefined {
  return items.find((item) => item.id === id)
}
```

---

## 17.6. Утилитарные типы (Utility Types)

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

### Awaited<T> (TypeScript 4.5+)

Распаковывает Promise:

```typescript
type UserPromise = Promise<User>
type UserValue = Awaited<UserPromise> // User
```

---

## 17.7. Практические паттерны

### Типизация событий

```typescript
// События мыши
function handleClick(event: MouseEvent) {
  console.log(event.clientX, event.clientY)
}

// События клавиатуры
function handleKeyPress(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    // ...
  }
}

// События формы (React)
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  // ...
}

// События input (React)
function handleInput(event: ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value)
}
```

### Типизация DOM элементов

```typescript
// Получение элементов
const button = document.getElementById('btn') as HTMLButtonElement
const input = document.querySelector('input') as HTMLInputElement

// Проверка типа
const element = document.getElementById('app')
if (element instanceof HTMLElement) {
  element.style.color = 'red'
}
```

### Типизация API ответов

```typescript
interface ApiResponse<T> {
  data: T
  error?: string
  status: number
}

interface User {
  id: number
  name: string
  email: string
}

async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch('/api/users')
  return response.json()
}
```

---

## Вопросы на собеседовании

### 1. Разница между interface и type?

`interface` можно расширять и объявлять несколько раз (declaration merging). `type` поддерживает union, intersection, mapped types. `interface` лучше для объектов, `type` — для композиций.

### 2. Когда использовать перегрузку функций?

Когда функция может принимать разные типы аргументов и возвращать разные типы в зависимости от них.

### 3. Что такое дженерики?

Механизм создания переиспользуемых типобезопасных функций/классов с параметризованными типами.

### 4. Когда использовать Pick и Omit?

`Pick` — когда нужно выбрать несколько полей. `Omit` — когда нужно исключить несколько полей.

### 5. Как типизировать this в функции?

Указать тип `this` как первый параметр: `function method(this: Class, ...args) {}`

### 6. Что такое ReturnType и Parameters?

Утилитарные типы для получения типа возвращаемого значения и параметров функции.

---

## Key Takeaways

- `interface` для объектов и публичных API, `type` для композиций
- Перегрузка функций позволяет описать несколько сигнатур
- Дженерики делают код переиспользуемым и типобезопасным
- Утилитарные типы упрощают работу с типами
- `this` можно типизировать явно
- Практические паттерны: события, DOM, API

---

В следующей главе мы рассмотрим классы, продвинутые типы, type guards и discriminated unions — инструменты для создания надёжных типобезопасных систем.
