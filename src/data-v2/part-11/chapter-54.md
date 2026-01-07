# Глава 54. Формы и контракты: React Hook Form и Zod

React Hook Form и Zod — идеальная комбинация для создания производительных форм с runtime валидацией. Понимание их интеграции критично для работы с формами в React.

---

## 54.1. Проблемы нативных форм

### Controlled компоненты = много ререндеров

```typescript
// ❌ Плохо: ререндер на каждый символ
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Компонент ререндерится при каждом нажатии клавиши
  return (
    <form>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </form>
  )
}
```

**Проблемы:**

- 🐌 Ререндер всего компонента на каждый символ
- 📦 Сложно масштабируется (большие формы)
- 🔄 Дублирование кода для каждого поля
- ⚠️ Валидация требует много бойлерплейта

---

## 54.2. React Hook Form: базовое использование

```bash
pnpm add react-hook-form
```

### Простая форма

```typescript
import { useForm } from 'react-hook-form'

interface LoginFormData {
  email: string
  password: string
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = (data: LoginFormData) => {
    console.log(data) // { email: '...', password: '...' }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password')}
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Войти</button>
    </form>
  )
}
```

**Преимущества:**

- ✅ Нет ререндеров при вводе
- ✅ Минимальный код
- ✅ Типизация из коробки

---

## 54.3. Zod: runtime валидация

### Зачем нужна runtime валидация?

TypeScript обеспечивает типобезопасность **на этапе компиляции**, но не защищает от невалидных данных **в runtime**.

```typescript
// ❌ Проблема: TypeScript не проверяет runtime данные
interface User {
  id: number
  email: string
}

async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return response.json() // ⚠️ Верим что API вернёт User
}

const user = await getUser('123')
user.email.toLowerCase() // 💥 Может упасть, если email = null
```

### Решение: Zod

```typescript
import { z } from 'zod'

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  age: z.number().positive(),
})

// Автоматический вывод типа из схемы!
type User = z.infer<typeof UserSchema>

async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()

  // Валидация runtime данных
  return UserSchema.parse(data) // ✅ Выбросит ошибку если невалидно
}
```

---

## 54.4. Интеграция React Hook Form и Zod

React Hook Form + Zod = идеальная комбинация.

```bash
pnpm add @hookform/resolvers zod
```

### Простая форма с Zod

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
})

type LoginFormData = z.infer<typeof LoginSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    // data гарантированно валиден
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Войти</button>
    </form>
  )
}
```

### Сложная форма с валидацией

```typescript
const SignupSchema = z
  .object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(8, 'Минимум 8 символов'),
    confirmPassword: z.string(),
    age: z.number().int().min(18, 'Вам должно быть 18+'),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'Необходимо согласие' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type SignupFormData = z.infer<typeof SignupSchema>

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  })

  const onSubmit = (data: SignupFormData) => {
    // data гарантированно валиден
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <input type="password" {...register('confirmPassword')} />
      {errors.confirmPassword && (
        <span>{errors.confirmPassword.message}</span>
      )}

      <input
        type="number"
        {...register('age', { valueAsNumber: true })}
      />
      {errors.age && <span>{errors.age.message}</span>}

      <label>
        <input type="checkbox" {...register('terms')} />
        Согласен с условиями
      </label>
      {errors.terms && <span>{errors.terms.message}</span>}

      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}
```

---

## 54.5. Управление ошибками

### Ошибки валидации

```typescript
const {
  formState: { errors, isSubmitting, isValid, isDirty },
} = useForm()

// errors - объект с ошибками для каждого поля
errors.email?.message
errors.password?.message

// isSubmitting - форма отправляется
// isValid - форма валидна
// isDirty - форма изменена
```

### Серверные ошибки

```typescript
const { setError, handleSubmit } = useForm<LoginFormData>()

const onSubmit = async (data: LoginFormData) => {
  try {
    await login(data)
  } catch (error) {
    if (error.code === 'INVALID_CREDENTIALS') {
      setError('email', {
        type: 'server',
        message: 'Неверный email или пароль',
      })
    }
  }
}
```

---

## 54.6. Интеграция с TanStack Query

```typescript
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

type UserFormData = z.infer<typeof UserSchema>

export function CreateUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  })

  const createUser = useMutation({
    mutationFn: (data: UserFormData) => apiClient.post('/users', data),
    onSuccess: () => {
      reset() // Очистка формы
    },
    onError: (error: any) => {
      // Обработка серверных ошибок
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, message]) => {
            setError(field as keyof UserFormData, {
              type: 'server',
              message: message as string,
            })
          },
        )
      }
    },
  })

  const onSubmit = (data: UserFormData) => {
    createUser.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? 'Создание...' : 'Создать'}
      </button>
    </form>
  )
}
```

---

## 54.7. Валидация API ответов с Zod

### Безопасная работа с API

```typescript
// api/users.ts
import { z } from 'zod'
import { apiClient } from '@/lib/api/axios'

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().url().nullable(),
})

const UsersResponseSchema = z.object({
  data: z.array(UserSchema),
  total: z.number(),
  page: z.number(),
})

type User = z.infer<typeof UserSchema>
type UsersResponse = z.infer<typeof UsersResponseSchema>

export async function getUsers(page = 1): Promise<UsersResponse> {
  const { data } = await apiClient.get('/users', { params: { page } })

  // Валидация ответа от API
  return UsersResponseSchema.parse(data)
}
```

### safeParse для graceful обработки

```typescript
async function getUserSafely(id: number) {
  const { data } = await apiClient.get(`/users/${id}`)

  const result = UserSchema.safeParse(data)

  if (result.success) {
    return result.data // ✅ Валидные данные
  } else {
    console.error('Validation failed:', result.error)
    return null
  }
}
```

---

## 54.8. Продвинутые возможности

### Динамические поля (Field Arrays)

```typescript
import { useForm, useFieldArray } from 'react-hook-form'

interface FormData {
  users: Array<{ name: string; email: string }>
}

export function UsersForm() {
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      users: [{ name: '', email: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`users.${index}.name`)}
            placeholder="Name"
          />
          <input
            {...register(`users.${index}.email`)}
            placeholder="Email"
          />
          <button type="button" onClick={() => remove(index)}>
            Удалить
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: '', email: '' })}
      >
        Добавить пользователя
      </button>

      <button type="submit">Отправить</button>
    </form>
  )
}
```

### Controlled компоненты (Controller)

```typescript
import { Controller, useForm } from 'react-hook-form'
import { Select } from '@/components/ui/Select'

export function SettingsForm() {
  const { control, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="theme"
        control={control}
        defaultValue="light"
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
          />
        )}
      />

      <button type="submit">Сохранить</button>
    </form>
  )
}
```

---

## 54.9. Best Practices

### 1. Всегда используйте resolver для валидации

```typescript
// ❌ Плохо: встроенная валидация
register('email', {
  required: true,
  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
})

// ✅ Хорошо: Zod resolver
const schema = z.object({
  email: z.string().email(),
})

useForm({ resolver: zodResolver(schema) })
```

### 2. Типизируйте формы

```typescript
// ✅ Всегда указывайте тип
const { register } = useForm<LoginFormData>()
```

### 3. Валидируйте API ответы

```typescript
// ✅ Валидация на границе приложения
async function getUsers(): Promise<UsersResponse> {
  const { data } = await apiClient.get('/users')
  return UsersResponseSchema.parse(data)
}
```

### 4. Разделяйте большие формы

```typescript
// ❌ Плохо: одна гигантская форма
function MegaForm() {
  // 50 полей...
}

// ✅ Хорошо: разделение на шаги
function MultiStepForm() {
  const [step, setStep] = useState(1)

  return (
    <>
      {step === 1 && <PersonalInfoStep />}
      {step === 2 && <AddressStep />}
      {step === 3 && <PaymentStep />}
    </>
  )
}
```

---

## Вопросы на собеседовании

### 1. Почему React Hook Form быстрее нативных форм?

Использует uncontrolled компоненты, нет ререндеров при вводе, валидация только при submit.

### 2. Зачем нужен Zod, если есть TypeScript?

TypeScript проверяет только на этапе компиляции. Zod валидирует runtime данные (API ответы, пользовательский ввод).

### 3. Как интегрировать React Hook Form с Zod?

Через `zodResolver` из `@hookform/resolvers`.

### 4. Как обрабатывать серверные ошибки в формах?

Через `setError` в `onError` мутации или в `catch` блоке.

### 5. Зачем валидировать API ответы?

API может вернуть невалидные данные. Валидация защищает от runtime ошибок.

---

## Key Takeaways

- React Hook Form для производительных форм без ререндеров
- Zod для runtime валидации и типизации
- Интеграция через `zodResolver`
- Валидация API ответов защищает от runtime ошибок
- `setError` для серверных ошибок
- Разделение больших форм на компоненты
- Один источник правды: схема Zod → типы TypeScript

