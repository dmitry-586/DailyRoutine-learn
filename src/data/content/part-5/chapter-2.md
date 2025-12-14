# Глава 16. Продвинутый TypeScript

Эта глава — граница между «я умею писать на TS» и «я проектирую на TS». На уровне Middle+ TypeScript используется как язык описания контрактов и бизнес-логики, а не просто аннотаций.

---

## 16.1. Дженерики (Generics)

Дженерики позволяют писать переиспользуемый и типобезопасный код.

### Простейший пример

```typescript
function identity<T>(value: T): T {
  return value
}

const num = identity<number>(42)
const str = identity<string>('hello')
```

TypeScript может вывести тип:

```typescript
const num = identity(42) // автоматически number
```

### Ограничения (extends)

```typescript
function logLength<T extends { length: number }>(value: T) {
  console.log(value.length)
}

logLength('string') // OK
logLength([1, 2, 3]) // OK
logLength(42) // Error
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
```

### Дженерики в классах

```typescript
class Repository<T> {
  private items: T[] = []

  add(item: T) {
    this.items.push(item)
  }

  find(id: number): T | undefined {
    return this.items.find((item) => (item as any).id === id)
  }
}

const userRepo = new Repository<User>()
```

### Множественные дженерики

```typescript
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn)
}

const numbers = [1, 2, 3]
const strings = map(numbers, (n) => n.toString()) // string[]
```

---

## 16.2. Утилитарные типы

TypeScript предоставляет готовые утилиты для работы с типами.

### Pick

Выбирает указанные свойства из типа.

```typescript
type User = { id: number; name: string; email: string; role: string }
type UserPreview = Pick<User, 'id' | 'name'>
// { id: number; name: string }
```

### Omit

Исключает указанные свойства.

```typescript
type UserWithoutId = Omit<User, 'id'>
// { name: string; email: string; role: string }
```

### Partial

Делает все свойства опциональными.

```typescript
type UserUpdate = Partial<User>
// { id?: number; name?: string; ... }
```

### Required

Делает все свойства обязательными.

```typescript
type RequiredUser = Required<Partial<User>>
// все поля обязательны
```

### Readonly

Делает все свойства только для чтения.

```typescript
type ReadonlyUser = Readonly<User>
// все поля readonly
```

### Record

Создаёт тип объекта с заданными ключами и значениями.

```typescript
type UserRoles = Record<string, 'admin' | 'user'>
// { [key: string]: "admin" | "user" }
```

### Exclude / Extract

Exclude — исключает типы из union. Extract — извлекает типы из union.

```typescript
type T = Exclude<'a' | 'b' | 'c', 'a'> // "b" | "c"
type U = Extract<'a' | 'b' | 'c', 'a' | 'b'> // "a" | "b"
```

### NonNullable

Удаляет null и undefined из типа.

```typescript
type T = NonNullable<string | null | undefined> // string
```

### ReturnType / Parameters

Получает тип возвращаемого значения и параметров функции.

```typescript
type Fn = (a: number, b: string) => boolean
type R = ReturnType<Fn> // boolean
type P = Parameters<Fn> // [number, string]
```

---

## 16.3. Классы и модификаторы доступа

### Модификаторы

- public (по умолчанию) — доступ везде
- private — доступ только внутри класса
- protected — доступ в классе и наследниках

```typescript
class User {
  public name: string
  private id: number
  protected role: string

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
    this.role = 'user'
  }
}
```

### Readonly-поля

```typescript
class Config {
  readonly env = 'prod'
  readonly apiUrl = 'https://api.example.com'
}
```

### Приватные поля (#)

Современный способ (ES2022):

```typescript
class User {
  #password: string

  setPassword(pwd: string) {
    this.#password = pwd
  }
}
```

---

## 16.4. Discriminated Unions

Один из самых мощных паттернов TS. Позволяет TypeScript точно определять тип на основе дискриминанта.

**Пример:**

```typescript
type Action =
  | { type: 'ADD'; payload: number }
  | { type: 'REMOVE'; payload: number }
  | { type: 'RESET' }
```

**Использование:**

```typescript
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

TypeScript гарантирует, что все кейсы обработаны.

---

## 16.5. Type Guards

Позволяют сузить тип в условных блоках.

### typeof

```typescript
if (typeof x === 'string') {
  // здесь x — string
}
```

### instanceof

```typescript
if (obj instanceof User) {
  // здесь obj — User
}
```

### in

```typescript
if ('role' in user) {
  // user имеет свойство role
}
```

### Пользовательский guard

```typescript
function isAdmin(user: User | Admin): user is Admin {
  return 'role' in user && user.role === 'admin'
}

if (isAdmin(user)) {
  // здесь user — Admin
}
```

---

## 16.6. Декораторы

Декораторы — экспериментальная возможность TypeScript.

```typescript
function Log(target: any) {
  console.log(target)
}

@Log
class User {}
```

**Используются в:**

- Angular
- NestJS

**Требуют включения в tsconfig:**

```json
"experimentalDecorators": true
```

---

## 16.7. tsconfig: продвинутые настройки

### Важные флаги

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

### target и lib

Определяют:

- версию JavaScript на выходе
- доступные API (DOM, ES2020 и т.д.)

### moduleResolution

- "node" — для Node.js
- "bundler" — для современных бандлеров
- "classic" — устаревший

### Частые ошибки

- overengineering типов
- any в продакшне
- игнорирование strict
- сложные conditional-типы без необходимости

---

## Вопросы на собеседовании

### 1. Что такое дженерики?

Механизм создания переиспользуемых типобезопасных функций/классов с параметризованными типами.

### 2. Когда использовать Pick и Omit?

Pick — когда нужно выбрать несколько полей. Omit — когда нужно исключить несколько полей.

### 3. Что такое discriminated union?

Union type с общим полем-дискриминантом, позволяющим TypeScript точно определять тип.

### 4. Как работают type guards?

Функции, которые проверяют тип и сужают его в условных блоках. Позволяют TypeScript понимать тип.

### 5. private vs protected?

private — доступ только в классе. protected — доступ в классе и наследниках.

### 6. Зачем нужны декораторы?

Метапрограммирование, добавление функциональности к классам/методам без изменения их кода.

### 7. Какие флаги tsconfig самые важные?

strict, noImplicitAny, strictNullChecks, target, module, moduleResolution.

### 8. Когда TypeScript мешает, а не помогает?

При overengineering, излишней сложности типов, когда типы становятся препятствием для разработки.

---

## Key Takeaways

- Дженерики делают код переиспользуемым и типобезопасным
- Утилитарные типы упрощают работу с типами
- Discriminated unions — мощный паттерн для типобезопасности
- Type guards сужают типы в условных блоках
- Модификаторы доступа обеспечивают инкапсуляцию
- tsconfig настраивает поведение компилятора
- TypeScript должен помогать, а не мешать разработке

---

**Часть VI. React и современная разработка SPA**
