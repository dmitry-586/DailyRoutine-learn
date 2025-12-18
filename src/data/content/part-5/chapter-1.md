# Глава 16. Основы TypeScript

TypeScript — это не просто «JavaScript с типами». Это инструмент проектирования API, компонентов и архитектуры, который позволяет ловить ошибки до запуска кода.

На собеседованиях TypeScript — маркер зрелости разработчика. Понимание типизации показывает способность проектировать надёжные системы.

---

## 16.1. Типы данных, union и intersection

### Базовые типы

```typescript
let count: number = 10
let title: string = 'Hello'
let isOpen: boolean = true
let data: null = null
let value: undefined = undefined
```

### Массивы

```typescript
let ids: number[] = [1, 2, 3]
let names: Array<string> = ['Alice', 'Bob']
```

### Объекты

```typescript
let user: { name: string; age: number } = {
  name: 'Alice',
  age: 30,
}
```

### Union types

Позволяет ограничить набор допустимых значений.

```typescript
type Status = 'loading' | 'success' | 'error'
type ID = string | number

function processStatus(status: Status) {
  // TypeScript знает все возможные значения
}
```

### Intersection types

Объединяет несколько типов.

```typescript
type User = { name: string }
type Admin = { role: string }

type AdminUser = User & Admin
// { name: string; role: string }
```

---

## 16.2. Интерфейсы и типы

### Interface

```typescript
interface User {
  id: number
  name: string
  email?: string // опциональное поле
}
```

**Расширение интерфейса:**

```typescript
interface Admin extends User {
  role: string
}
```

### Type

```typescript
type User = {
  id: number
  name: string
}
```

### Различия

**interface:**

- Расширяемость: да (extends)
- Union: нет
- Intersection: да
- Декларации: можно расширять

**type:**

- Расширяемость: нет
- Union: да
- Intersection: да
- Декларации: нельзя

**Практическое правило:**

- interface — для публичных API, объектов, классов
- type — для сложных композиций, union, утилитарных типов

**Примеры:**

```typescript
interface ButtonProps {
  title: string
  onClick: () => void
}

type Theme = 'light' | 'dark'
type ButtonVariant = 'primary' | 'secondary'
```

---

## 16.3. Кортежи, enum и literal types

### Кортежи

```typescript
type Point = [number, number]
type UserData = [string, number, boolean]

const point: Point = [10, 20]
```

### Enum

```typescript
enum Role {
  User,
  Admin,
}
```

⚠️ Enum увеличивает размер бандла.

Часто лучше использовать union types:

```typescript
type Role = 'user' | 'admin'
```

### Literal types

```typescript
let direction: 'left' | 'right' = 'left'
let size: 1 | 2 | 3 = 2
```

Позволяют создавать строго типизированные значения.

---

## 16.4. unknown vs any vs never

### any

Отключает типизацию полностью. Использовать крайне редко.

```typescript
let x: any = 5
x = 'string' // OK, но теряем безопасность типов
```

### unknown

Безопасная альтернатива any. Требует проверки перед использованием.

```typescript
let x: unknown = getData()

if (typeof x === 'string') {
  console.log(x.toUpperCase()) // теперь безопасно
}
```

### never

Функция никогда не возвращает значение.

```typescript
function fail(): never {
  throw new Error()
}

function infiniteLoop(): never {
  while (true) {}
}
```

**Используется для:**

- функций, которые всегда выбрасывают ошибку
- exhaustive checks в switch

---

## 16.5. Type inference

TypeScript умеет выводить типы автоматически:

```typescript
const count = 10 // number
const name = 'Alice' // string
const arr = [1, 2, 3] // number[]
```

**Явная типизация нужна когда:**

- тип не может быть выведен
- нужно ограничить тип
- публичное API

```typescript
function sum(a: number, b: number): number {
  return a + b
}
```

---

## 16.6. Strict mode

```json
"strict": true
```

Флаг 'strict': true включает следующие проверки:

- strictNullChecks — null и undefined не присваиваются автоматически
- noImplicitAny — ошибка при неявном any
- strictFunctionTypes — строгая проверка типов функций
- strictPropertyInitialization — поля класса должны быть инициализированы
- strictBindCallApply — строгая проверка bind/call/apply
- noImplicitThis — ошибка при неявном this
- alwaysStrict — всегда в strict mode

Можно включать флаги по отдельности для постепенной миграции существующих проектов.

Рекомендуется всегда включать strict mode для новых проектов.

---

## Вопросы на собеседовании

### 1. Зачем нужен TypeScript?

Ловит ошибки до запуска, улучшает автодополнение, документирует код, упрощает рефакторинг.

### 2. Разница между interface и type?

interface можно расширять, лучше для объектов. type поддерживает union, лучше для композиций.

### 3. Что такое union и intersection?

Union (|) — одно из значений. Intersection (&) — объединение всех свойств.

### 4. Почему any — плохо?

Отключает проверку типов, теряется безопасность и автодополнение.

### 5. Когда использовать unknown?

Когда тип неизвестен, но нужно проверить перед использованием. Безопасная альтернатива any.

### 6. Что такое never?

Тип для значений, которые никогда не появятся. Функции, которые всегда выбрасывают ошибку.

### 7. Что такое strict mode?

Набор строгих проверок TypeScript для максимальной типобезопасности.

### 8. Что такое type inference?

Автоматическое определение типов TypeScript на основе значений.

---

## Key Takeaways

- TypeScript — инструмент проектирования, а не просто аннотации
- interface для объектов, type для композиций
- Union types ограничивают набор значений
- unknown безопаснее any
- never для функций, которые никогда не возвращают значение
- Strict mode обязателен для новых проектов
- Type inference упрощает код, но явная типизация важна для API

---

Дальше мы углубимся в прикладные аспекты TS: посмотрим на типизацию реальных API, utility-типы, шаблонные типы и паттерны, которые делают код одновременно безопасным и удобным в использовании.
