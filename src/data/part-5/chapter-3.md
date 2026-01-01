# Глава 17. Классы, продвинутые типы и паттерны

Эта глава — граница между «я умею писать на TS» и «я проектирую на TS». Здесь мы рассмотрим классы, продвинутые возможности системы типов и паттерны, которые делают код одновременно безопасным и удобным в использовании.

---

## 18.1. Классы в TypeScript

### Базовый синтаксис

```typescript
class User {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  greet(): string {
    return `Hello, I'm ${this.name}`
  }
}

const user = new User('Alice', 30)
console.log(user.greet()) // "Hello, I'm Alice"
```

### Модификаторы доступа

```typescript
class User {
  public name: string // доступ везде (по умолчанию)
  private id: number // доступ только внутри класса
  protected role: string // доступ в классе и наследниках

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
    this.role = 'user'
  }

  public getId(): number {
    return this.id // OK, внутри класса
  }
}

const user = new User('Alice', 1)
user.name // OK, public
user.id // Error: Property 'id' is private
user.role // Error: Property 'role' is protected
```

### Readonly поля

```typescript
class Config {
  readonly env = 'prod'
  readonly apiUrl = 'https://api.example.com'

  constructor(env: string) {
    this.env = env // OK в конструкторе
  }

  updateEnv() {
    this.env = 'dev' // Error: Cannot assign to 'env' because it is a read-only property
  }
}
```

### Приватные поля (#) — ES2022

Современный способ создания приватных полей:

```typescript
class User {
  #password: string

  setPassword(pwd: string) {
    this.#password = pwd
  }

  getPassword() {
    return this.#password // OK, внутри класса
  }
}

const user = new User()
user.#password // Error: Property '#password' is not accessible
```

**Разница между `private` и `#`:**
- `private` — проверяется только TypeScript, в runtime доступно
- `#` — настоящая приватность, недоступно в runtime

### Абстрактные классы

```typescript
abstract class Animal {
  abstract makeSound(): void

  move(): void {
    console.log('Moving...')
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log('Woof!')
  }
}

// Нельзя создать экземпляр абстрактного класса
const animal = new Animal() // Error: Cannot create an instance of an abstract class

const dog = new Dog() // OK
dog.makeSound() // "Woof!"
```

### Наследование

```typescript
class Animal {
  constructor(public name: string) {}

  move(): void {
    console.log(`${this.name} is moving`)
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name) // Вызов конструктора родителя
  }

  bark(): void {
    console.log('Woof!')
  }

  // Переопределение метода
  move(): void {
    super.move() // Вызов метода родителя
    console.log('Running')
  }
}

const dog = new Dog('Rex', 'Labrador')
dog.move() // "Rex is moving" "Running"
dog.bark() // "Woof!"
```

### Статические члены

```typescript
class MathUtils {
  static PI = 3.14159

  static add(a: number, b: number): number {
    return a + b
  }
}

console.log(MathUtils.PI) // 3.14159
console.log(MathUtils.add(2, 3)) // 5

// Нельзя вызвать на экземпляре
const utils = new MathUtils()
utils.add(2, 3) // Error: Property 'add' does not exist on type 'MathUtils'
```

### Геттеры и сеттеры

```typescript
class Temperature {
  private _celsius: number = 0

  get celsius(): number {
    return this._celsius
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error('Temperature below absolute zero')
    }
    this._celsius = value
  }

  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32
  }

  set fahrenheit(value: number) {
    this.celsius = (value - 32) * 5 / 9
  }
}

const temp = new Temperature()
temp.celsius = 25
console.log(temp.fahrenheit) // 77
temp.fahrenheit = 100
console.log(temp.celsius) // 37.777...
```

---

## 18.2. Интерфейсы для классов

### Реализация интерфейсов

```typescript
interface Flyable {
  fly(): void
}

interface Swimmable {
  swim(): void
}

class Duck implements Flyable, Swimmable {
  fly(): void {
    console.log('Flying...')
  }

  swim(): void {
    console.log('Swimming...')
  }
}
```

### Разница между extends и implements

- **extends** — наследование (класс от класса)
- **implements** — реализация интерфейса (класс реализует интерфейс)

```typescript
// Наследование
class Animal {
  name: string
}

class Dog extends Animal {
  // Наследует name
}

// Реализация интерфейса
interface Flyable {
  fly(): void
}

class Bird implements Flyable {
  fly(): void {
    // Должен реализовать метод
  }
}
```

---

## 18.3. Discriminated Unions

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

## 18.4. Type Guards

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

### Проверка на null/undefined

```typescript
function processValue(value: string | null | undefined) {
  if (value != null) {
    // здесь value — string (не null и не undefined)
    console.log(value.toUpperCase())
  }
}

// Или с type guard
function isNotNull<T>(value: T | null | undefined): value is T {
  return value != null
}

if (isNotNull(value)) {
  // value — string
}
```

---

## 18.5. Conditional Types

Условные типы позволяют создавать типы, которые зависят от условий.

### Базовый синтаксис

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
```

### Распределительные условные типы

```typescript
type ToArray<T> = T extends any ? T[] : never

type StrArrOrNumArr = ToArray<string | number>
// string[] | number[]

// Без распределения
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never
type StrArrOrNumArr2 = ToArrayNonDist<string | number>
// (string | number)[]
```

### Infer в conditional types

`infer` позволяет извлечь тип из другого типа:

```typescript
// Извлечь тип элемента массива
type ArrayElementType<T> = T extends (infer U)[] ? U : never

type Element = ArrayElementType<string[]> // string
type Element2 = ArrayElementType<number[]> // number

// Извлечь тип возвращаемого значения функции
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Fn = (a: number) => string
type R = ReturnType<Fn> // string
```

### Практический пример: Flatten

```typescript
type Flatten<T> = T extends (infer U)[] ? U : T

type Nested = string[][]
type Flat = Flatten<Nested> // string[]
```

---

## 18.6. Mapped Types

Позволяют создавать новые типы на основе существующих, трансформируя их свойства.

### Базовый синтаксис

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

### Модификаторы: readonly и ?

```typescript
// Убрать readonly
type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

// Убрать опциональность
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

### Фильтрация ключей

```typescript
// Только строковые ключи
type StringKeys<T> = {
  [K in keyof T as K extends string ? K : never]: T[K]
}

// Исключить определённые ключи
type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}
```

### Преобразование ключей

```typescript
// Префикс для всех ключей
type Prefixed<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K]
}

type User = { name: string; age: number }
type PrefixedUser = Prefixed<User, 'user_'>
// { user_name: string; user_age: number }
```

---

## 18.7. Template Literal Types

Позволяют создавать типы на основе строковых шаблонов.

### Базовый синтаксис

```typescript
type EventName = 'click' | 'scroll' | 'mousemove'
type HandlerName = `on${EventName}`
// 'onclick' | 'onscroll' | 'onmousemove'
```

### Преобразование регистра

```typescript
type Uppercase<S extends string> = // встроенный тип
type Lowercase<S extends string> = // встроенный тип
type Capitalize<S extends string> = // встроенный тип
type Uncapitalize<S extends string> = // встроенный тип

type Event = 'click' | 'scroll'
type Handler = `on${Capitalize<Event>}`
// 'onClick' | 'onScroll'
```

### Извлечение из шаблона

```typescript
type ExtractEvent<T> = T extends `on${infer E}` ? E : never

type Event = ExtractEvent<'onclick'> // 'click'
```

---

## 18.8. Декораторы (Decorators)

Декораторы — экспериментальная возможность TypeScript для метапрограммирования.

### Включение декораторов

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### Базовый синтаксис

```typescript
function Log(target: any) {
  console.log(target)
}

@Log
class User {}
```

### Декораторы методов

```typescript
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args)
    return original.apply(this, args)
  }
}

class Calculator {
  @Log
  add(a: number, b: number) {
    return a + b
  }
}
```

**Используются в:**
- Angular
- NestJS
- TypeORM

---

## 18.9. Практические паттерны

### Типизация состояния загрузки

```typescript
type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function handleState<T>(state: LoadingState<T>) {
  switch (state.status) {
    case 'idle':
      return 'Ready to load'
    case 'loading':
      return 'Loading...'
    case 'success':
      return `Data: ${state.data}`
    case 'error':
      return `Error: ${state.error}`
  }
}
```

### Типизация формы с ошибками

```typescript
type FormState<T> = {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
}

type UserForm = {
  name: string
  email: string
  age: number
}

const form: FormState<UserForm> = {
  values: { name: '', email: '', age: 0 },
  errors: { email: 'Invalid email' },
  touched: { email: true },
}
```

---

## Вопросы на собеседовании

### 1. Разница между private и # (приватные поля)?

`private` проверяется только TypeScript, в runtime доступно. `#` — настоящая приватность, недоступно в runtime.

### 2. Что такое discriminated union?

Union type с общим полем-дискриминантом, позволяющим TypeScript точно определять тип.

### 3. Как работают type guards?

Функции, которые проверяют тип и сужают его в условных блоках. Позволяют TypeScript понимать тип.

### 4. Что такое conditional types?

Типы, которые зависят от условий. Позволяют создавать сложные трансформации типов.

### 5. Как работают mapped types?

Создают новые типы на основе существующих, трансформируя их свойства через итерацию по ключам.

### 6. Что такое template literal types?

Типы на основе строковых шаблонов. Позволяют создавать типы из строковых литералов.

---

## Key Takeaways

- Классы поддерживают модификаторы доступа, наследование, статические члены
- Discriminated unions — мощный паттерн для типобезопасности
- Type guards сужают типы в условных блоках
- Conditional types и mapped types позволяют создавать сложные трансформации
- Template literal types работают со строковыми шаблонами
- Декораторы — экспериментальная возможность для метапрограммирования

---

В следующей главе мы рассмотрим практические аспекты: обработку ошибок, асинхронность, модули и взаимодействие с JavaScript кодом.
