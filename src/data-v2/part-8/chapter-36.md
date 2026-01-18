# Глава 36. Типизация функций и перегрузки

Правильная типизация функций — основа типобезопасного кода. Понимание перегрузок, типов функций и параметров критично для создания надёжных API.

---

## 36.1. Базовый синтаксис

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

---

## 36.2. Опциональные параметры

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

**Важно:** Опциональные параметры должны идти после обязательных.

```typescript
//  Плохо
function createUser(name?: string, age: number): User {
  // ...
}

//  Хорошо
function createUser(age: number, name?: string): User {
  // ...
}
```

---

## 36.3. Параметры по умолчанию

```typescript
function greet(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}!`
}

greet('Alice') // 'Hello, Alice!'
greet('Bob', 'Hi') // 'Hi, Bob!'
```

---

## 36.4. Rest параметры

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0)
}

sum(1, 2, 3) // 6
sum(1, 2, 3, 4, 5) // 15
```

### Типизация rest параметров

```typescript
function join(separator: string, ...items: string[]): string {
  return items.join(separator)
}

join(', ', 'a', 'b', 'c') // 'a, b, c'
```

---

## 36.5. Типы функций

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

### Альтернативный синтаксис

```typescript
interface Calculator {
  add(a: number, b: number): number
  subtract(a: number, b: number): number
}
```

### Полная сигнатура вызова

Разница между краткой записью `() => T` и полной `{ (): T }`:

**Краткая запись** — только тип функции:
```typescript
type Handler = () => void

const handler: Handler = () => {
  console.log('clicked')
}
```

**Полная сигнатура** — позволяет добавлять свойства к функции:
```typescript
type Handler = {
  (): void
  once?: boolean
}

const handler: Handler = () => {
  console.log('clicked')
}
handler.once = true // OK — можно добавить свойство

// Или функция с дополнительными свойствами
function createHandler(): Handler {
  const fn = () => console.log('clicked')
  fn.once = true
  return fn
}
```

Это нужно, когда функция должна иметь дополнительные свойства (например, `once`, `priority`).

---

## 36.6. Перегрузка функций (Function Overloads)

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

**Важно:** Сигнатура реализации (последняя функция) **невидима для вызывающего кода**. TypeScript использует только сигнатуры перегрузок для проверки типов.

**Практический пример:**

```typescript
// Разные сигнатуры для разных случаев
function getData(id: number): Promise<User>
function getData(ids: number[]): Promise<User[]>
// Сигнатура реализации невидима для вызывающего кода
function getData(idOrIds: number | number[]): Promise<User | User[]> {
  if (Array.isArray(idOrIds)) {
    return fetchUsers(idOrIds)
  }
  return fetchUser(idOrIds)
}

// TypeScript знает тип возвращаемого значения на основе сигнатур перегрузок
const user = await getData(1) // Promise<User>
const users = await getData([1, 2, 3]) // Promise<User[]>
```

### Перегрузки с разными типами параметров

```typescript
function createElement(tag: 'div'): HTMLDivElement
function createElement(tag: 'span'): HTMLSpanElement
function createElement(tag: 'button'): HTMLButtonElement
function createElement(tag: string): HTMLElement {
  return document.createElement(tag) as HTMLElement
}

const div = createElement('div') // HTMLDivElement
const span = createElement('span') // HTMLSpanElement
```

---

## 36.7. Контекстная типизация

TypeScript выводит типы параметров функции на основе места, где она вызывается (контекста):

```typescript
// Тип параметра выводится из контекста использования
const numbers = [1, 2, 3]

// TypeScript знает, что item — number
numbers.forEach((item) => {
  console.log(item.toFixed(2)) // OK, item: number
})

// В коллбэках
function processItems<T>(
  items: T[],
  callback: (item: T, index: number) => void,
): void {
  items.forEach(callback)
}

// Тип T выводится из первого аргумента
processItems([1, 2, 3], (item) => {
  // item автоматически имеет тип number
  console.log(item.toFixed(2))
})
```

**Практический пример:**

```typescript
// Типизация this в методах
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

---

## 36.8. Типизация async функций

```typescript
// Автоматически возвращает Promise
async function processData(): Promise<string> {
  const data = await fetchData()
  return data.toString()
}

// Тип возвращаемого значения — Promise<string>
const result: Promise<string> = processData()
```

### Типизация промисов

```typescript
function fetchUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then((res) => res.json())
}

async function getUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}
```

---

## 36.8. Типизация коллбеков

```typescript
function processItems(
  items: string[],
  callback: (item: string, index: number) => void,
): void {
  items.forEach(callback)
}

processItems(['a', 'b', 'c'], (item, index) => {
  console.log(`${index}: ${item}`)
})
```

### Типизация обработчиков событий

```typescript
type ClickHandler = (event: MouseEvent) => void

function addClickListener(handler: ClickHandler) {
  document.addEventListener('click', handler)
}

addClickListener((event) => {
  console.log(event.clientX, event.clientY)
})
```

---

## 36.9. Условные типы в функциях

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function getUser() {
  return { id: 1, name: 'John' }
}

type User = ReturnType<typeof getUser>
// User = { id: number; name: string; }
```

---

## Вопросы на собеседовании

### 1. Как типизировать функцию?

Указать типы параметров и возвращаемого значения: `function name(param: Type): ReturnType {}`

### 2. Что такое перегрузка функций?

Несколько сигнатур для одной функции, позволяющие описать разные варианты использования.

### 3. Что такое контекстная типизация?

Механизм, при котором TypeScript выводит типы параметров функции на основе места, где она вызывается (например, в коллбэках).

### 4. В чём разница между опциональными параметрами и параметрами по умолчанию?

Опциональные параметры могут отсутствовать, параметры по умолчанию имеют значение, если не переданы.

### 5. Как типизировать async функцию?

Указать возвращаемый тип как `Promise<Type>`. TypeScript автоматически оборачивает возвращаемое значение в Promise.

### 6. Что такое тип функции?

Тип, описывающий сигнатуру функции: `(param: Type) => ReturnType`

- Понимание типизации функций критично для типобезопасного кода