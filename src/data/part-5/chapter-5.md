# Глава 19. Продвинутые техники TypeScript

## Введение

После освоения основ TypeScript пора погрузиться в продвинутые техники, которые отличают Senior-разработчика от Middle. В этой главе мы изучим паттерны типизации, которые решают реальные проблемы: от брендированных типов до type-level programming.

---

## Branded Types (Брендированные типы)

**Проблема:** TypeScript использует структурную типизацию — два типа с одинаковой структурой взаимозаменяемы.

```typescript
type UserId = string;
type PostId = string;

function getUser(id: UserId) { /* ... */ }

const postId: PostId = 'post-123';
getUser(postId); // ✅ Компилируется, но логически неверно!
```

### Решение: Branded Types

```typescript
// Создаём уникальный бренд через unique symbol
declare const UserIdBrand: unique symbol;
declare const PostIdBrand: unique symbol;

type UserId = string & { readonly [UserIdBrand]: typeof UserIdBrand };
type PostId = string & { readonly [PostIdBrand]: typeof PostIdBrand };

// Функции-конструкторы с валидацией
function createUserId(id: string): UserId {
  if (!id.startsWith('user-')) {
    throw new Error('Invalid user ID format');
  }
  return id as UserId;
}

function createPostId(id: string): PostId {
  if (!id.startsWith('post-')) {
    throw new Error('Invalid post ID format');
  }
  return id as PostId;
}

// Теперь типы несовместимы
function getUser(id: UserId) { /* ... */ }

const userId = createUserId('user-123');
const postId = createPostId('post-456');

getUser(userId); // ✅ OK
getUser(postId); // ❌ Type 'PostId' is not assignable to type 'UserId'
```

### Практическое применение

```typescript
// Валидированные данные
type ValidatedEmail = string & { readonly __brand: 'ValidatedEmail' };
type ValidatedPhone = string & { readonly __brand: 'ValidatedPhone' };

function validateEmail(email: string): ValidatedEmail {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    throw new Error('Invalid email');
  }
  return email as ValidatedEmail;
}

// API принимает только валидированные данные
function sendEmail(to: ValidatedEmail, subject: string) {
  // Гарантированно валидный email
}

// ❌ Не компилируется
sendEmail('invalid', 'Test');

// ✅ OK
const email = validateEmail('user@example.com');
sendEmail(email, 'Test');
```

---

## Nominal Typing через unique symbol

```typescript
// Создаём номинальные типы для различных единиц измерения
type Meters = number & { readonly __brand: unique symbol };
type Feet = number & { readonly __brand: unique symbol };
type Kilometers = number & { readonly __brand: unique symbol };

function meters(value: number): Meters {
  return value as Meters;
}

function feet(value: number): Feet {
  return value as Feet;
}

function kilometers(value: number): Kilometers {
  return value as Kilometers;
}

// Конвертация между единицами
function metersToKilometers(m: Meters): Kilometers {
  return kilometers(m / 1000);
}

function feetToMeters(f: Feet): Meters {
  return meters(f * 0.3048);
}

// Использование
const distance = meters(100);
const distanceInKm = metersToKilometers(distance);

// ❌ Нельзя смешивать разные единицы
function calculateArea(width: Meters, height: Feet) { // ❌ Type error!
  return width * height; 
}
```

---

## Продвинутые Conditional Types

### Распределительные Conditional Types

```typescript
// Базовый пример
type Extract<T, U> = T extends U ? T : never;

type Result = Extract<'a' | 'b' | 'c', 'a' | 'f'>;
// Result = 'a'

// Практический пример: извлечение функциональных свойств
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface User {
  name: string;
  age: number;
  greet(): void;
  sayGoodbye(): void;
}

type UserMethods = FunctionPropertyNames<User>;
// UserMethods = 'greet' | 'sayGoodbye'
```

### Infer для извлечения типов

```typescript
// Извлечение типа возвращаемого значения
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: 'John' };
}

type User = ReturnType<typeof getUser>;
// User = { id: number; name: string; }

// Извлечение типа элементов массива
type ArrayElement<T> = T extends (infer E)[] ? E : never;

type Numbers = ArrayElement<number[]>; // number
type Strings = ArrayElement<string[]>; // string

// Извлечение типов параметров Promise
type Awaited<T> = T extends Promise<infer U> ? U : T;

type Value = Awaited<Promise<string>>; // string
type Value2 = Awaited<number>; // number

// Вложенные Promise
type DeepAwaited<T> = T extends Promise<infer U> 
  ? DeepAwaited<U> 
  : T;

type DeepValue = DeepAwaited<Promise<Promise<string>>>;
// DeepValue = string
```

### Сложные conditional types

```typescript
// Фильтрация типов
type NonNullable<T> = T extends null | undefined ? never : T;

type Result = NonNullable<string | null | undefined>;
// Result = string

// Извлечение обязательных полей
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

type Required = RequiredKeys<User>;
// Required = 'id' | 'name'
```

---

## Рекурсивные типы

### Глубокое копирование типов

```typescript
// DeepReadonly - рекурсивно делает все поля readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  cache: {
    ttl: number;
  };
}

type ReadonlyConfig = DeepReadonly<Config>;
// Все вложенные поля становятся readonly

const config: ReadonlyConfig = {
  database: {
    host: 'localhost',
    port: 5432,
    credentials: {
      username: 'admin',
      password: 'secret',
    },
  },
  cache: { ttl: 3600 },
};

// ❌ Все изменения запрещены
config.database.host = 'newhost';
config.database.credentials.password = 'newpass';
```

### DeepPartial

```typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

// Используется для частичных обновлений
function updateConfig(updates: DeepPartial<Config>) {
  // Можно передать любой вложенный объект
}

updateConfig({
  database: {
    credentials: {
      password: 'new-password' // Только один вложенный ключ
    }
  }
});
```

### Flatten Array Type (рекурсивное разворачивание)

```typescript
type Flatten<T> = T extends Array<infer U>
  ? U extends Array<any>
    ? Flatten<U>
    : U
  : T;

type NestedArray = number[][][];
type Flat = Flatten<NestedArray>; // number
```

---

## Template Literal Types

```typescript
// Базовый пример
type Color = 'red' | 'blue' | 'green';
type Quantity = 'one' | 'two' | 'three';

type ColoredQuantity = `${Quantity}-${Color}`;
// 'one-red' | 'one-blue' | 'one-green' | 'two-red' | ...

// Практический пример: типизация CSS-in-JS
type CSSProperties = 'color' | 'backgroundColor' | 'fontSize';
type CSSValue = string | number;

type CSSObject = {
  [K in CSSProperties]?: CSSValue;
};

// Hover states
type EventType = 'click' | 'hover' | 'focus';
type EventHandler<E extends EventType> = `on${Capitalize<E>}`;

type Handlers = EventHandler<EventType>;
// 'onClick' | 'onHover' | 'onFocus'

// API endpoints
type HTTPMethod = 'get' | 'post' | 'put' | 'delete';
type Resource = 'users' | 'posts' | 'comments';

type APIEndpoint = `/${Resource}`;
type APIMethod = `${HTTPMethod}${Capitalize<Resource>}`;

type UserAPI = APIMethod; 
// 'getUsers' | 'postUsers' | 'putUsers' | 'deleteUsers' | ...
```

### Утилиты для строк

```typescript
// Intrinsic String Manipulation Types
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;

// Пример использования
type Method = 'getUserById';
type UpperMethod = Uppercase<Method>; // 'GETUSERBYID'
type LowerMethod = Lowercase<Method>; // 'getuserbyid'

// Парсинг строк (продвинутый пример)
type Split<S extends string, D extends string> = 
  S extends `${infer T}${D}${infer U}`
    ? [T, ...Split<U, D>]
    : [S];

type Path = 'user.profile.name';
type PathSegments = Split<Path, '.'>;
// ['user', 'profile', 'name']
```

---

## Mapped Types (продвинутые паттерны)

### Key Remapping

```typescript
// Префикс для всех ключей
type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K];
};

interface User {
  id: number;
  name: string;
}

type DBUser = PrefixKeys<User, 'db_'>;
// { db_id: number; db_name: string; }

// Фильтрация ключей
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

interface Mixed {
  id: number;
  name: string;
  isActive: boolean;
  callback: () => void;
}

type NoFunctions = OmitByType<Mixed, Function>;
// { id: number; name: string; isActive: boolean; }
```

### Getters/Setters

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface State {
  count: number;
  name: string;
}

type StateGetters = Getters<State>;
// { getCount: () => number; getName: () => string; }

type StateSetters = Setters<State>;
// { setCount: (value: number) => void; setName: (value: string) => void; }

type StateWithMethods = State & StateGetters & StateSetters;
```

---

## Type-Level Programming

### Числовые операции на уровне типов

```typescript
// Длина tuple на уровне типов
type Length<T extends any[]> = T['length'];

type Tuple = [string, number, boolean];
type TupleLength = Length<Tuple>; // 3

// Append к tuple
type Append<T extends any[], U> = [...T, U];

type NewTuple = Append<[1, 2], 3>; // [1, 2, 3]

// Range числа (рекурсивно)
type BuildArray<
  Length extends number,
  Acc extends number[] = []
> = Acc['length'] extends Length
  ? Acc
  : BuildArray<Length, [...Acc, Acc['length']]>;

type Range = BuildArray<5>; // [0, 1, 2, 3, 4]
```

### Объединение типов (Merge)

```typescript
type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};

interface Defaults {
  theme: 'light';
  language: 'en';
}

interface UserPrefs {
  theme: 'dark';
  fontSize: 14;
}

type FinalPrefs = Merge<Defaults, UserPrefs>;
// { theme: 'dark'; language: 'en'; fontSize: 14; }
```

---

## Declaration Merging (расширенное)

### Расширение глобальных интерфейсов

```typescript
// Расширение Window
declare global {
  interface Window {
    myApp: {
      version: string;
      config: AppConfig;
    };
  }
}

window.myApp.version; // ✅ Типизировано

// Расширение Array
interface Array<T> {
  first(): T | undefined;
  last(): T | undefined;
}

Array.prototype.first = function() {
  return this[0];
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

[1, 2, 3].first(); // ✅ Типизировано
```

### Module Augmentation

```typescript
// Расширение сторонней библиотеки
import 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}

// Теперь доступно во всём проекте
app.get('/profile', (req, res) => {
  const userId = req.user?.id; // ✅ Типизировано
});
```

---

## Паттерны и Best Practices

### Builder Pattern с типизацией

```typescript
class QueryBuilder<T> {
  private filters: Array<(item: T) => boolean> = [];
  private sortFn?: (a: T, b: T) => number;

  where<K extends keyof T>(
    key: K,
    value: T[K]
  ): QueryBuilder<T> {
    this.filters.push((item) => item[key] === value);
    return this;
  }

  sortBy<K extends keyof T>(
    key: K,
    order: 'asc' | 'desc' = 'asc'
  ): QueryBuilder<T> {
    this.sortFn = (a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    };
    return this;
  }

  execute(data: T[]): T[] {
    let result = data.filter(item =>
      this.filters.every(f => f(item))
    );
    if (this.sortFn) {
      result = result.sort(this.sortFn);
    }
    return result;
  }
}

// Использование
const users = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
];

const result = new QueryBuilder<typeof users[0]>()
  .where('age', 30)
  .sortBy('name', 'asc')
  .execute(users);
```

### Discriminated Unions для State Machines

```typescript
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };

function handleState(state: State) {
  switch (state.status) {
    case 'idle':
      // state.data ❌ нет доступа
      break;
    case 'loading':
      // state.data ❌ нет доступа
      break;
    case 'success':
      console.log(state.data); // ✅ типизировано
      break;
    case 'error':
      console.log(state.error.message); // ✅ типизировано
      break;
  }
}
```

---

## Заключение

**Продвинутые техники TypeScript:**

- 🏷️ **Branded Types** — предотвращают логические ошибки через номинальную типизацию
- 🔄 **Conditional Types** — динамическая типизация на основе условий
- 📚 **Рекурсивные типы** — работа с вложенными структурами
- 🔤 **Template Literal Types** — типизация строковых паттернов
- 🗺️ **Mapped Types** — трансформация типов
- 🧮 **Type-Level Programming** — вычисления на уровне типов
- 🔧 **Declaration Merging** — расширение существующих типов

Эти техники отличают Senior-разработчика: они решают реальные проблемы и делают код более безопасным и поддерживаемым.

В следующей главе мы рассмотрим **Zod** — библиотеку для runtime валидации с автоматической типизацией.

