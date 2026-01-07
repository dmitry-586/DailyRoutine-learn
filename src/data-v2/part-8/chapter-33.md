# Глава 33. Зачем TypeScript и строгий режим

TypeScript — это не просто «JavaScript с типами». Это инструмент проектирования API, компонентов и архитектуры, который позволяет ловить ошибки до запуска кода и создавать масштабируемые приложения.

На собеседованиях TypeScript — маркер зрелости разработчика. Понимание типизации показывает способность проектировать надёжные системы.

---

## 33.1. Зачем нужен TypeScript

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

## 33.2. Компилятор TypeScript

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

---

## 33.3. Настройка компилятора: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
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

---

## 33.4. Строгий режим (strict)

**`strict: true`** включает все строгие проверки:

- `strictNullChecks` — строгая проверка null/undefined
- `noImplicitAny` — ошибка при неявном any
- `strictFunctionTypes` — строгая проверка типов функций
- `strictPropertyInitialization` — поля класса должны быть инициализированы
- `strictBindCallApply` — строгая проверка bind/call/apply
- `noImplicitThis` — ошибка при неявном this

### strictNullChecks

```typescript
// Без strictNullChecks
function greet(name: string) {
  return `Hello, ${name.toUpperCase()}`
}

greet(null) // OK, но упадёт в runtime

// С strictNullChecks
function greet(name: string) {
  return `Hello, ${name.toUpperCase()}`
}

greet(null) // Error: Argument of type 'null' is not assignable to parameter of type 'string'

// Правильно
function greet(name: string | null) {
  if (name === null) {
    return 'Hello, Guest'
  }
  return `Hello, ${name.toUpperCase()}`
}
```

### noImplicitAny

```typescript
// Без noImplicitAny
function process(data) {
  return data.value
}

// С noImplicitAny
function process(data: { value: number }) {
  return data.value
}
```

### strictPropertyInitialization

```typescript
// Без strictPropertyInitialization
class User {
  name: string // OK
}

// С strictPropertyInitialization
class User {
  name: string // Error: Property 'name' has no initializer

  // Решения:
  // 1. Инициализация
  name: string = ''

  // 2. Опциональное поле
  name?: string

  // 3. Definite assignment assertion
  name!: string

  // 4. Инициализация в конструкторе
  constructor(name: string) {
    this.name = name
  }
}
```

---

## 33.5. Система типов TypeScript

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

// 2. Нужна более широкая типизация
let value: string | number = getValue()
```

---

## 33.6. Рекомендации по настройке

**Минимальная конфигурация для нового проекта:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  }
}
```

**Для React:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  }
}
```

---

## Вопросы на собеседовании

### 1. Зачем нужен TypeScript?

Статическая проверка типов, автодополнение, безопасный рефакторинг, документация через типы, масштабируемость.

### 2. В чём разница между TypeScript и JavaScript?

TypeScript добавляет статическую типизацию, проверку типов на этапе компиляции, автодополнение и лучшую поддержку IDE.

### 3. Что такое strict режим?

Включает все строгие проверки: strictNullChecks, noImplicitAny, strictFunctionTypes и другие.

### 4. Что такое структурная типизация?

Типы совместимы, если их структура совпадает, независимо от имён типов.

### 5. Что такое type inference?

Автоматическое определение типов компилятором TypeScript на основе контекста.

### 6. Когда нужна явная типизация?

Когда тип не может быть выведен, нужна более широкая типизация, или для документации API.

---

## Key Takeaways

- TypeScript добавляет статическую типизацию к JavaScript
- Ошибки ловятся на этапе компиляции, а не runtime
- Строгий режим (`strict: true`) критичен для надёжности
- TypeScript использует структурную типизацию
- Type inference автоматически определяет типы
- Правильная настройка tsconfig.json важна для продуктивности
- Понимание TypeScript критично для современной разработки

