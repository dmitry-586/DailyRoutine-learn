# Глава 21. Zod: runtime валидация и типизация

## Введение

TypeScript обеспечивает типобезопасность **на этапе компиляции**, но никак не защищает от невалидных данных **в runtime**. API может вернуть что угодно, пользователь может ввести что угодно, внешние данные непредсказуемы.

**Zod** решает эту проблему: это schema-based валидация с автоматическим выводом типов TypeScript. Один источник правды для валидации и типизации.

---

## Зачем нужна runtime валидация?

### Проблема: TypeScript не проверяет runtime данные

```typescript
interface User {
  id: number;
  email: string;
  age: number;
}

async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json(); // ⚠️ Верим что API вернёт User
}

const user = await getUser('123');
user.email.toLowerCase(); // 💥 Может упасть, если email = null
```

**API может вернуть:**
- `null` вместо объекта
- `string` вместо `number`
- Отсутствующие поля
- Дополнительные поля

TypeScript не может это предотвратить.

### Решение: Runtime валидация с Zod

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  age: z.number().positive(),
});

// Автоматический вывод типа из схемы!
type User = z.infer<typeof UserSchema>;

async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  
  // Валидация runtime данных
  return UserSchema.parse(data); // ✅ Выбросит ошибку если невалидно
}
```

---

## Установка и базовое использование

```bash
pnpm add zod
```

### Примитивные типы

```typescript
import { z } from 'zod';

// Строки
const StringSchema = z.string();
StringSchema.parse('hello'); // ✅
StringSchema.parse(123); // ❌ ZodError

// Числа
const NumberSchema = z.number();
const PositiveSchema = z.number().positive();
const IntSchema = z.number().int();

// Булевы
const BooleanSchema = z.boolean();

// Даты
const DateSchema = z.date();
DateSchema.parse(new Date()); // ✅
DateSchema.parse('2024-01-01'); // ❌
```

### Валидация строк

```typescript
const EmailSchema = z.string().email();
const UrlSchema = z.string().url();
const UuidSchema = z.string().uuid();

// Кастомные паттерны
const PhoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/);

// Длина
const PasswordSchema = z.string().min(8).max(100);

// Transform
const TrimmedSchema = z.string().trim();
const LowercaseSchema = z.string().toLowerCase();
```

---

## Объекты и вложенные схемы

```typescript
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string().regex(/^\d{5}$/),
  country: z.string().default('USA'),
});

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(2),
  age: z.number().int().positive().optional(),
  address: AddressSchema,
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.date(),
});

type User = z.infer<typeof UserSchema>;
```

### Partial, Pick, Omit

```typescript
// Partial - все поля опциональны
const PartialUserSchema = UserSchema.partial();
type PartialUser = z.infer<typeof PartialUserSchema>;

// Pick - выбрать конкретные поля
const UserCredentialsSchema = UserSchema.pick({
  email: true,
  password: true,
});

// Omit - исключить поля
const PublicUserSchema = UserSchema.omit({ password: true });

// Extend - расширить схему
const UserWithTokenSchema = UserSchema.extend({
  token: z.string(),
});
```

---

## Массивы и коллекции

```typescript
// Массив строк
const StringArraySchema = z.array(z.string());
StringArraySchema.parse(['a', 'b']); // ✅
StringArraySchema.parse(['a', 1]); // ❌

// Массив объектов
const UsersSchema = z.array(UserSchema);

// Валидация длины
const TagsSchema = z.array(z.string()).min(1).max(5);

// Не пустой массив
const NonEmptySchema = z.array(z.string()).nonempty();

// Tuple (фиксированная длина)
const CoordinatesSchema = z.tuple([z.number(), z.number()]);
type Coordinates = z.infer<typeof CoordinatesSchema>; // [number, number]
```

### Record и Map

```typescript
// Record<string, number>
const ScoresSchema = z.record(z.string(), z.number());
type Scores = z.infer<typeof ScoresSchema>;
// { [key: string]: number }

// Map
const UserMapSchema = z.map(z.string(), UserSchema);
```

---

## Union, Discriminated Union, Intersection

### Union (или)

```typescript
const StringOrNumberSchema = z.union([z.string(), z.number()]);

StringOrNumberSchema.parse('hello'); // ✅
StringOrNumberSchema.parse(123); // ✅
StringOrNumberSchema.parse(true); // ❌

// Синтаксический сахар
const StringOrNumberSchema2 = z.string().or(z.number());
```

### Discriminated Union (tagged union)

```typescript
const SuccessSchema = z.object({
  status: z.literal('success'),
  data: z.string(),
});

const ErrorSchema = z.object({
  status: z.literal('error'),
  error: z.string(),
});

const ResultSchema = z.discriminatedUnion('status', [
  SuccessSchema,
  ErrorSchema,
]);

type Result = z.infer<typeof ResultSchema>;
// { status: 'success'; data: string } | { status: 'error'; error: string }

function handleResult(result: Result) {
  if (result.status === 'success') {
    console.log(result.data); // ✅ типизировано
  } else {
    console.log(result.error); // ✅ типизировано
  }
}
```

### Intersection (и)

```typescript
const TimestampsSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

const UserWithTimestampsSchema = UserSchema.and(TimestampsSchema);
```

---

## Интеграция с React Hook Form

Zod идеально работает с React Hook Form через `@hookform/resolvers`.

```bash
pnpm add react-hook-form @hookform/resolvers
```

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    // data гарантированно валиден
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Войти</button>
    </form>
  );
}
```

### Сложные формы

```typescript
const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  age: z.number().int().min(18),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие с условиями' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof SignupSchema>;
```

---

## Валидация API ответов

### Безопасная работа с API

```typescript
// api/users.ts
import { z } from 'zod';
import { apiClient } from '@/lib/api/axios';

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().url().nullable(),
});

const UsersResponseSchema = z.object({
  data: z.array(UserSchema),
  total: z.number(),
  page: z.number(),
});

type User = z.infer<typeof UserSchema>;
type UsersResponse = z.infer<typeof UsersResponseSchema>;

export async function getUsers(page = 1): Promise<UsersResponse> {
  const { data } = await apiClient.get('/users', { params: { page } });
  
  // Валидация ответа от API
  return UsersResponseSchema.parse(data);
}

// При невалидном ответе выбросится ZodError с детальным описанием
```

### Обработка ошибок

```typescript
import { ZodError } from 'zod';

try {
  const users = await getUsers(1);
} catch (error) {
  if (error instanceof ZodError) {
    console.error('Validation errors:', error.errors);
    // [
    //   {
    //     path: ['data', 0, 'email'],
    //     message: 'Invalid email',
    //     code: 'invalid_string',
    //   }
    // ]
  }
}
```

### safeParse для graceful обработки

```typescript
async function getUserSafely(id: number) {
  const { data } = await apiClient.get(`/users/${id}`);
  
  const result = UserSchema.safeParse(data);
  
  if (result.success) {
    return result.data; // ✅ Валидные данные
  } else {
    console.error('Validation failed:', result.error);
    return null;
  }
}
```

---

## Кастомные валидаторы

### refine - кастомная логика

```typescript
const PasswordSchema = z.string()
  .min(8)
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Пароль должен содержать заглавную букву',
  })
  .refine((val) => /[0-9]/.test(val), {
    message: 'Пароль должен содержать цифру',
  })
  .refine((val) => /[!@#$%^&*]/.test(val), {
    message: 'Пароль должен содержать спецсимвол',
  });
```

### superRefine - множественные ошибки

```typescript
const SignupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
}).superRefine((data, ctx) => {
  // Проверка 1: пароли совпадают
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    });
  }

  // Проверка 2: username не содержит email
  if (data.username.includes('@')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Username не должен содержать @',
      path: ['username'],
    });
  }
});
```

---

## Трансформации данных

### transform - преобразование значений

```typescript
// Преобразование строки в число
const NumberStringSchema = z.string().transform((val) => parseInt(val, 10));

NumberStringSchema.parse('123'); // 123 (number)

// Преобразование даты
const DateStringSchema = z.string().transform((val) => new Date(val));

DateStringSchema.parse('2024-01-01'); // Date object

// Очистка данных
const TrimmedEmailSchema = z.string()
  .trim()
  .toLowerCase()
  .email();

TrimmedEmailSchema.parse('  USER@EXAMPLE.COM  ');
// 'user@example.com'
```

### preprocess - предобработка

```typescript
// Преобразование пустых строк в null
const OptionalStringSchema = z.preprocess(
  (val) => (val === '' ? null : val),
  z.string().nullable()
);

OptionalStringSchema.parse(''); // null
OptionalStringSchema.parse('hello'); // 'hello'

// Парсинг JSON
const JSONSchema = z.preprocess(
  (val) => (typeof val === 'string' ? JSON.parse(val) : val),
  z.object({ id: z.number() })
);
```

---

## Интеграция с TanStack Query

```typescript
// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { apiClient } from '@/lib/api/axios';

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
});

const UsersSchema = z.array(UserSchema);

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await apiClient.get('/users');
      
      // Валидация ответа
      return UsersSchema.parse(data);
    },
  });
};

// Использование
function UsersList() {
  const { data: users, error } = useUsers();

  if (error) {
    // Zod ошибки тоже попадут сюда
    return <div>Error: {error.message}</div>;
  }

  // users гарантированно типизирован и валиден
  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Продвинутые паттерны

### Lazy схемы (для рекурсивных структур)

```typescript
interface Category {
  id: number;
  name: string;
  subcategories: Category[];
}

const CategorySchema: z.ZodType<Category> = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string(),
    subcategories: z.array(CategorySchema),
  })
);
```

### Brand types с Zod

```typescript
const UserIdSchema = z.string().uuid().brand<'UserId'>();
const PostIdSchema = z.string().uuid().brand<'PostId'>();

type UserId = z.infer<typeof UserIdSchema>;
type PostId = z.infer<typeof PostIdSchema>;

function getUser(id: UserId) { /* ... */ }

const userId = UserIdSchema.parse('123e4567-e89b-12d3-a456-426614174000');
const postId = PostIdSchema.parse('223e4567-e89b-12d3-a456-426614174000');

getUser(userId); // ✅
getUser(postId); // ❌ Type error!
```

### Environment Variables валидация

```typescript
// env.ts
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  API_URL: z.string().url(),
  API_KEY: z.string().min(1),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().optional(),
});

// Валидация при старте приложения
export const env = EnvSchema.parse(process.env);

// Типизированные env переменные
console.log(env.PORT); // number
console.log(env.API_URL); // string (гарантированно URL)
```

---

## Сравнение: Zod vs Yup vs Joi

| Критерий | Zod | Yup | Joi |
|----------|-----|-----|-----|
| TypeScript-first | ✅ | ⚠️ | ❌ |
| Вывод типов | Автоматический | Ручной | Ручной |
| Bundle size | ~8KB | ~15KB | ~150KB |
| Трансформации | ✅ | ✅ | ✅ |
| Async валидация | ✅ | ✅ | ✅ |
| Браузер | ✅ | ✅ | ❌ (Node only) |
| Производительность | ⚡⚡⚡ | ⚡⚡ | ⚡ |

**Выбор в 2025:** Zod — стандарт для TypeScript проектов.

---

## Best Practices

### 1. Создавайте переиспользуемые схемы

```typescript
// schemas/common.ts
export const EmailSchema = z.string().email();
export const PasswordSchema = z.string().min(8).max(100);
export const TimestampsSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

// schemas/user.ts
import { EmailSchema, TimestampsSchema } from './common';

export const UserSchema = z.object({
  id: z.number(),
  email: EmailSchema,
}).merge(TimestampsSchema);
```

### 2. Используйте describe для документации

```typescript
const UserSchema = z.object({
  email: z.string().email().describe('Электронная почта пользователя'),
  age: z.number().int().min(18).describe('Возраст должен быть 18+'),
});

// Можно извлечь описание
console.log(UserSchema.shape.email.description);
```

### 3. Валидируйте на границах приложения

```typescript
// ✅ Хорошо: валидация на входе
async function createUser(input: unknown) {
  const data = UserSchema.parse(input); // Валидация здесь
  // Дальше работаем с типизированными данными
  return db.users.create(data);
}

// ❌ Плохо: валидация внутри логики
async function createUser(input: User) {
  // Доверяем что input валиден
}
```

### 4. Используйте safeParse для UI

```typescript
// Для форм лучше safeParse
function handleSubmit(formData: FormData) {
  const result = UserSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    // Показываем ошибки пользователю
    setErrors(result.error.flatten().fieldErrors);
    return;
  }
  
  // Отправляем данные
  await createUser(result.data);
}
```

---

## Заключение

**Zod** решает критическую проблему TypeScript — отсутствие runtime валидации.

**Ключевые преимущества:**
- 🔒 **Type-safe** — автоматический вывод типов из схем
- 🚀 **Производительный** — минимальный размер (8KB)
- 🎯 **Композируемый** — легко создавать сложные схемы
- 🔧 **Интеграции** — React Hook Form, TanStack Query, tRPC
- 📝 **DX** — отличная документация и типизация

**Когда использовать:**
- ✅ Валидация API ответов
- ✅ Валидация форм (с React Hook Form)
- ✅ Валидация env переменных
- ✅ Парсинг пользовательского ввода
- ✅ Валидация конфигурационных файлов

**Альтернативы:**
- **Yup** — если нужна совместимость со старым кодом
- **Joi** — только для Node.js приложений
- **io-ts** — более функциональный подход

В следующей части мы перейдём к **React и SPA** — изучим современные паттерны разработки с React 18+.

