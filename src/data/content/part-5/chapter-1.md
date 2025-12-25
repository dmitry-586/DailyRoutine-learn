# Глава 16. TypeScript: вступление и основы

TypeScript — это не просто «JavaScript с типами». Это инструмент проектирования API, компонентов и архитектуры, который позволяет ловить ошибки до запуска кода и создавать масштабируемые приложения.

На собеседованиях TypeScript — маркер зрелости разработчика. Понимание типизации показывает способность проектировать надёжные системы.

---

## 16.1. Зачем нужен TypeScript

### Проблемы JavaScript

JavaScript — язык с динамической типизацией. Это означает:

- Типы проверяются во время выполнения, а не компиляции
- Ошибки обнаруживаются только при запуске кода
- Нет автодополнения и подсказок IDE
- Сложно рефакторить большие проекты

**Пример проблемы:**

```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// Ошибка обнаружится только в runtime
calculateTotal([{ price: '10' }]) // '0' + '10' = '010' (не то, что нужно!)
```

### Что даёт TypeScript

1. **Статическая проверка типов** — ошибки ловятся до запуска
2. **Автодополнение** — IDE понимает структуру данных
3. **Рефакторинг** — безопасные переименования и изменения
4. **Документация** — типы описывают контракты API
5. **Масштабируемость** — код остаётся понятным при росте проекта

**Тот же пример с TypeScript:**

```typescript
interface Item {
  price: number
}

function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// Ошибка на этапе компиляции!
calculateTotal([{ price: '10' }]) // Error: Type 'string' is not assignable to type 'number'
```

---

## 16.2. Компилятор TypeScript

### Как работает компилятор

TypeScript компилятор (`tsc`) выполняет две задачи:

1. **Проверка типов** — статический анализ кода
2. **Транспиляция** — преобразование TS в JavaScript

```bash
# Установка
npm install -g typescript

# Компиляция
tsc app.ts

# Проверка типов без генерации JS
tsc --noEmit app.ts
```

### Процесс компиляции

```
TypeScript код (.ts)
    ↓
[Проверка типов]
    ↓
[Транспиляция в JS]
    ↓
JavaScript код (.js)
```

**Важно:** TypeScript **не изменяет** поведение кода во время выполнения. Он только проверяет типы и удаляет аннотации типов.

### Настройка компилятора: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020", // Версия JavaScript на выходе
    "module": "ESNext", // Система модулей
    "lib": ["ES2020", "DOM"], // Доступные API
    "strict": true, // Строгий режим
    "esModuleInterop": true, // Совместимость с CommonJS
    "skipLibCheck": true, // Пропускать проверку .d.ts файлов
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Ключевые флаги компилятора

**target** — версия JavaScript:

- `ES5`, `ES2015`, `ES2020`, `ESNext`
- Определяет, какой синтаксис можно использовать

**module** — система модулей:

- `CommonJS` — для Node.js
- `ESNext` — для современных бандлеров
- `AMD`, `UMD` — для браузеров

**lib** — доступные API:

- `ES2020` — стандартные возможности языка
- `DOM` — браузерные API
- `WebWorker` — Web Workers API

**strict** — включает все строгие проверки:

- `strictNullChecks` — строгая проверка null/undefined
- `noImplicitAny` — ошибка при неявном any
- `strictFunctionTypes` — строгая проверка типов функций
- `strictPropertyInitialization` — поля класса должны быть инициализированы

---

## 16.3. Система типов TypeScript

### Философия системы типов

TypeScript использует **структурную типизацию** (structural typing), а не номинативную:

```typescript
interface Point {
  x: number
  y: number
}

interface NamedPoint {
  x: number
  y: number
  name: string
}

// Структурная типизация: если структура совпадает, типы совместимы
const point: Point = { x: 1, y: 2 }
const namedPoint: NamedPoint = { x: 1, y: 2, name: 'origin' }

// NamedPoint совместим с Point (имеет все нужные поля)
const p: Point = namedPoint // OK

// Point не совместим с NamedPoint (не хватает поля name)
const np: NamedPoint = point // Error: Property 'name' is missing
```

### Базовые типы

```typescript
// Примитивы
let count: number = 10
let title: string = 'Hello'
let isOpen: boolean = true
let data: null = null
let value: undefined = undefined

// Массивы
let ids: number[] = [1, 2, 3]
let names: Array<string> = ['Alice', 'Bob']

// Объекты
let user: { name: string; age: number } = {
  name: 'Alice',
  age: 30,
}
```

### Type inference (вывод типов)

TypeScript умеет автоматически определять типы:

```typescript
// TypeScript выводит тип автоматически
const count = 10 // number
const name = 'Alice' // string
const arr = [1, 2, 3] // number[]

// Явная типизация нужна когда:
// 1. Тип не может быть выведен
function sum(a: number, b: number): number {
  return a + b
}

// 2. Нужно ограничить тип
let value: string | number = getValue()

// 3. Публичное API
export interface User {
  id: number
  name: string
}
```

---

## 16.4. Типы: any, unknown, never

### any — отключение проверки типов

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

### unknown — безопасная альтернатива any

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

### never — тип для невозможных значений

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

// Exhaustive checks в switch
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

---

## 16.5. Union и Intersection типы

### Union types (|)

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

// Union для разных типов
type StringOrNumber = string | number

function format(value: StringOrNumber): string {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value.toString()
}
```

### Intersection types (&)

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

---

## 16.6. Литеральные типы и const assertions

### Literal types

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

### const assertions

Делает объект/массив неизменяемым и выводит максимально узкие типы:

```typescript
// Без const assertion
const config = {
  theme: 'dark',
  size: 10,
}
// Тип: { theme: string; size: number }

// С const assertion
const config = {
  theme: 'dark',
  size: 10,
} as const
// Тип: { readonly theme: "dark"; readonly size: 10 }

// Массивы
const colors = ['red', 'green', 'blue'] as const
// Тип: readonly ["red", "green", "blue"]
// colors[0] имеет тип "red", а не string
```

---

## 16.7. Кортежи (Tuples)

Кортеж — массив с фиксированной длиной и известными типами элементов:

```typescript
type Point = [number, number]
type UserData = [string, number, boolean]

const point: Point = [10, 20]
const user: UserData = ['Alice', 30, true]

// Доступ по индексу
const x = point[0] // number
const y = point[1] // number

// Ошибка: неправильная длина
const wrong: Point = [10, 20, 30] // Error: Source has 3 element(s) but target allows only 2
```

### Именованные кортежи (TypeScript 4.0+)

```typescript
type Point = [x: number, y: number]

const point: Point = [10, 20]
// При использовании видно имена: point[0] показывается как x, point[1] как y
```

### Optional элементы в кортежах

```typescript
type OptionalTuple = [string, number?]

const t1: OptionalTuple = ['hello'] // OK
const t2: OptionalTuple = ['hello', 42] // OK
```

---

## 16.8. Enum

Enum создаёт именованный набор констант:

```typescript
enum Role {
  User,
  Admin,
}

// Использование
const userRole: Role = Role.User

// Значения по умолчанию: 0, 1, 2, ...
console.log(Role.User) // 0
console.log(Role.Admin) // 1
```

### String enums

```typescript
enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const status: Status = Status.Loading // 'loading'
```

### ⚠️ Проблемы с enum

1. **Увеличивает размер бандла** — генерирует дополнительный JavaScript код
2. **Не типобезопасен** — можно присвоить любое число
3. **Сложно tree-shake** — бандлеры не всегда могут удалить неиспользуемые значения

**Альтернатива — union types:**

```typescript
// Вместо enum
type Role = 'user' | 'admin'
type Status = 'loading' | 'success' | 'error'

// Преимущества:
// - Нет дополнительного JS кода
// - Полная типобезопасность
// - Легко tree-shake
```

---

## 16.9. Настройка проекта: strict mode

### Включение strict mode

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Флаг `strict: true` включает следующие проверки:

- **strictNullChecks** — `null` и `undefined` не присваиваются автоматически
- **noImplicitAny** — ошибка при неявном `any`
- **strictFunctionTypes** — строгая проверка типов функций
- **strictPropertyInitialization** — поля класса должны быть инициализированы
- **strictBindCallApply** — строгая проверка `bind`/`call`/`apply`
- **noImplicitThis** — ошибка при неявном `this`
- **alwaysStrict** — всегда в strict mode

### Постепенная миграция

Для существующих проектов можно включать флаги по отдельности:

```json
{
  "compilerOptions": {
    "strictNullChecks": true,
    "noImplicitAny": false // Включим позже
    // ...
  }
}
```

**Рекомендация:** Всегда включай `strict: true` для новых проектов.

---

## Вопросы на собеседовании

### 1. Зачем нужен TypeScript?

Ловит ошибки до запуска, улучшает автодополнение, документирует код, упрощает рефакторинг, помогает масштабировать проекты.

### 2. Как работает компилятор TypeScript?

Проверяет типы статически и транспилирует TS в JavaScript. Не изменяет поведение кода во время выполнения.

### 3. Что такое структурная типизация?

Типы совместимы, если их структура совпадает, независимо от имён типов.

### 4. Разница между any, unknown и never?

- `any` — отключает проверку типов
- `unknown` — безопасная альтернатива, требует проверки перед использованием
- `never` — тип для значений, которые никогда не появятся

### 5. Почему enum считается проблемным?

Увеличивает размер бандла, не полностью типобезопасен, сложно tree-shake. Лучше использовать union types.

### 6. Что такое strict mode?

Набор строгих проверок TypeScript для максимальной типобезопасности. Включается флагом `strict: true`.

### 7. Когда нужна явная типизация, а когда можно полагаться на inference?

Явная типизация нужна для публичных API, когда тип не может быть выведен, или когда нужно ограничить тип. В остальных случаях можно полагаться на inference.

---

## Key Takeaways

- TypeScript — инструмент проектирования, а не просто аннотации типов
- Компилятор проверяет типы и транспилирует в JavaScript
- Структурная типизация делает типы совместимыми по структуре
- `unknown` безопаснее `any`, `never` для невозможных значений
- Union types предпочтительнее enum в большинстве случаев
- Strict mode обязателен для новых проектов
- Type inference упрощает код, но явная типизация важна для API

---

В следующей главе мы углубимся в систему типов: интерфейсы, типы, функции и их типизацию, а также рассмотрим практические паттерны работы с типами.
