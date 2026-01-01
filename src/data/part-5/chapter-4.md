# Глава 18. Практические аспекты TypeScript

Эта глава охватывает практические аспекты работы с TypeScript: обработку ошибок, асинхронное программирование, модули, взаимодействие с JavaScript и настройку проектов.

---

## 19.1. Обработка ошибок

### Типизация ошибок

В TypeScript нет встроенного типа для ошибок, но можно создать свой:

```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}
```

### Result тип

Паттерн Result позволяет явно обрабатывать ошибки:

```typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { success: false, error: 'Division by zero' }
  }
  return { success: true, data: a / b }
}

function handleResult(result: Result<number, string>) {
  if (result.success) {
    console.log(result.data) // TypeScript знает, что data есть
  } else {
    console.error(result.error) // TypeScript знает, что error есть
  }
}
```

### Try-catch с типизацией

```typescript
async function fetchUser(id: number): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) {
      throw new NotFoundError('User')
    }
    return response.json()
  } catch (error) {
    if (error instanceof NotFoundError) {
      // Обработка конкретной ошибки
      console.error('User not found:', error.message)
    } else if (error instanceof Error) {
      // Обработка общих ошибок
      console.error('Unexpected error:', error.message)
    } else {
      // Неизвестная ошибка
      console.error('Unknown error:', error)
    }
    throw error
  }
}
```

### Обработка ошибок в промисах

```typescript
async function safeFetch<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message)
    }
    throw error
  }
}
```

---

## 19.2. Асинхронное программирование

### Типизация промисов

```typescript
// Промис с типом
function fetchUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then((res) => res.json())
}

// async/await
async function getUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}
```

### Типизация async функций

```typescript
// Автоматически возвращает Promise
async function processData(): Promise<string> {
  const data = await fetchData()
  return data.toString()
}

// Тип возвращаемого значения — Promise<string>
const result: Promise<string> = processData()
```

### Обработка нескольких промисов

```typescript
// Promise.all
async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
  const promises = ids.map((id) => fetchUser(id))
  return Promise.all(promises)
}

// Promise.allSettled
async function fetchUsersSafely(
  ids: number[],
): Promise<PromiseSettledResult<User>[]> {
  const promises = ids.map((id) => fetchUser(id))
  return Promise.allSettled(promises)
}

// Promise.race
async function fetchWithTimeout(
  url: string,
  timeout: number,
): Promise<Response> {
  const fetchPromise = fetch(url)
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), timeout),
  )
  return Promise.race([fetchPromise, timeoutPromise])
}
```

### Типизация генераторов

```typescript
async function* fetchUsersBatch(
  ids: number[],
): AsyncGenerator<User, void, unknown> {
  for (const id of ids) {
    yield await fetchUser(id)
  }
}

// Использование
async function processUsers() {
  const generator = fetchUsersBatch([1, 2, 3])
  for await (const user of generator) {
    console.log(user)
  }
}
```

---

## 19.3. Модули и пространства имён

### ES модули

```typescript
// user.ts
export interface User {
  id: number
  name: string
}

export function createUser(name: string): User {
  return { id: Date.now(), name }
}

// index.ts
import { User, createUser } from './user'
import type { User as UserType } from './user' // type-only import

const user = createUser('Alice')
```

### Re-export

```typescript
// utils/index.ts
export { formatDate } from './date'
export { formatCurrency } from './currency'
export type { DateFormat } from './date'

// Использование
import { formatDate, formatCurrency } from './utils'
```

### Namespace (устаревший подход)

```typescript
namespace MathUtils {
  export function add(a: number, b: number): number {
    return a + b
  }

  export function multiply(a: number, b: number): number {
    return a * b
  }
}

// Использование
MathUtils.add(2, 3)
```

**⚠️ Рекомендация:** Используй ES модули вместо namespace.

### Ambient модули

Для описания внешних модулей:

```typescript
// types/custom.d.ts
declare module 'custom-module' {
  export function doSomething(): void
  export const value: string
}

// Использование
import { doSomething, value } from 'custom-module'
```

---

## 19.4. Взаимодействие с JavaScript

### Декларации типов (.d.ts)

Для JavaScript библиотек без типов:

```typescript
// types/my-library.d.ts
declare module 'my-library' {
  export function doSomething(param: string): number
  export interface Config {
    apiUrl: string
  }
}
```

### Типизация существующего JavaScript кода

```typescript
// utils.js (JavaScript)
export function formatDate(date) {
  return date.toISOString()
}

// utils.d.ts (TypeScript декларации)
export function formatDate(date: Date): string
```

### Постепенная миграция

Можно смешивать `.ts` и `.js` файлы:

```typescript
// utils.js (JavaScript)
export function add(a, b) {
  return a + b
}

// app.ts (TypeScript)
import { add } from './utils'

const result = add(1, 2) // TypeScript выведет тип
```

### JSDoc для типизации

TypeScript понимает JSDoc комментарии:

```javascript
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function add(a, b) {
  return a + b
}
```

---

## 19.5. Работа с DOM

### Типизация элементов

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

// События формы
function handleSubmit(event: SubmitEvent) {
  event.preventDefault()
  // ...
}
```

### Типизация обработчиков

```typescript
button.addEventListener('click', (event: MouseEvent) => {
  console.log('Clicked')
})

input.addEventListener('input', (event: Event) => {
  const target = event.target as HTMLInputElement
  console.log(target.value)
})
```

---

## 19.6. Настройка проекта

### tsconfig.json — ключевые опции

```json
{
  "compilerOptions": {
    // Целевая версия JavaScript
    "target": "ES2020",

    // Система модулей
    "module": "ESNext",

    // Разрешение модулей
    "moduleResolution": "bundler",

    // Доступные API
    "lib": ["ES2020", "DOM"],

    // Строгий режим
    "strict": true,

    // Дополнительные проверки
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    // Совместимость
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,

    // Пути и алиасы
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    // Вывод
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Множественные конфигурации

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020"
  }
}

// tsconfig.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}

// tsconfig.test.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "types": ["jest", "node"]
  },
  "include": ["src/**/*.test.ts"]
}
```

### Интеграция с бандлерами

**Vite:**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  // TypeScript уже поддерживается из коробки
})
```

**Webpack:**

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
```

---

## 19.7. Работа с библиотеками

### Типизация сторонних библиотек

Если библиотека не имеет типов:

```typescript
// types/my-library.d.ts
declare module 'my-library' {
  export function doSomething(param: string): void
  export const version: string
}
```

### @types пакеты

Для популярных библиотек есть готовые типы:

```bash
npm install --save-dev @types/node
npm install --save-dev @types/react
npm install --save-dev @types/lodash
```

### Создание типов для API

```typescript
// types/api.d.ts
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

// Использование
async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch('/api/users')
  return response.json()
}
```

---

## 19.8. Производительность и оптимизация

### Избегание лишних проверок типов

```typescript
// Плохо: лишние проверки
function process(data: any) {
  if (typeof data === 'string') {
    // ...
  }
}

// Хорошо: правильная типизация
function process(data: string | number) {
  if (typeof data === 'string') {
    // ...
  }
}
```

### Использование const assertions

```typescript
// Плохо: широкий тип
const config = {
  theme: 'dark',
  size: 10,
} // { theme: string; size: number }

// Хорошо: узкий тип
const config = {
  theme: 'dark',
  size: 10,
} as const // { readonly theme: "dark"; readonly size: 10 }
```

### Избегание any

```typescript
// Плохо
function process(data: any) {
  return data.value
}

// Хорошо
function process<T extends { value: unknown }>(data: T) {
  return data.value
}
```

---

## 19.9. Лучшие практики

### 1. Всегда используй strict mode

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 2. Избегай any, используй unknown

```typescript
// Плохо
function process(data: any) {
  // ...
}

// Хорошо
function process(data: unknown) {
  if (typeof data === 'string') {
    // ...
  }
}
```

### 3. Используй type-only imports

```typescript
import type { User } from './types'
import { createUser } from './utils'
```

### 4. Документируй публичные API

```typescript
/**
 * Создаёт нового пользователя
 * @param name - Имя пользователя
 * @param email - Email пользователя
 * @returns Объект пользователя
 */
export function createUser(name: string, email: string): User {
  // ...
}
```

### 5. Используй утилитарные типы

```typescript
// Вместо дублирования
type UserUpdate = {
  name?: string
  email?: string
  age?: number
}

// Используй Partial
type UserUpdate = Partial<User>
```

### 6. Типизируй ошибки

```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
  ) {
    super(message)
  }
}
```

---

## Вопросы на собеседовании

### 1. Как типизировать ошибки в TypeScript?

Создать классы ошибок, наследуясь от Error, или использовать Result тип для явной обработки ошибок.

### 2. Как работать с JavaScript кодом в TypeScript проекте?

Создать `.d.ts` файлы с декларациями типов или использовать JSDoc комментарии.

### 3. Что такое ambient модули?

Декларации типов для внешних модулей без типов, описанные через `declare module`.

### 4. Как настроить TypeScript для большого проекта?

Использовать множественные конфигурации через `extends`, настроить пути через `paths`, включить строгие проверки.

### 5. Как оптимизировать производительность TypeScript?

Избегать `any`, использовать правильную типизацию, применять `const assertions`, использовать type-only imports.

### 6. Какие флаги tsconfig самые важные?

`strict`, `target`, `module`, `moduleResolution`, `lib`, `esModuleInterop`.

---

## Key Takeaways

- Обработка ошибок: классы ошибок или Result тип
- Асинхронность: типизация промисов и async/await
- Модули: ES модули предпочтительнее namespace
- Взаимодействие с JS: `.d.ts` файлы и JSDoc
- Настройка: strict mode обязателен, множественные конфигурации для больших проектов
- Лучшие практики: избегать `any`, использовать `unknown`, документировать API

---

TypeScript — это не просто «JavaScript с типами», а мощный инструмент для проектирования надёжных и масштабируемых приложений. Понимание системы типов, продвинутых возможностей и практических паттернов позволяет создавать код, который не только работает, но и защищён от ошибок на этапе разработки.
