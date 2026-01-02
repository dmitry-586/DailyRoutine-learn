# Глава 22. React Hook Form: производительные формы

## Введение

Формы — одна из самых сложных частей React-приложений. Нативные формы вызывают ререндеры при каждом вводе символа, сложны в валидации и управлении состоянием.

**React Hook Form** решает эти проблемы через uncontrolled компоненты и минимальные ререндеры. В 2026 году это стандарт для форм в React.

---

## Проблемы нативных форм

### Controlled компоненты = много ререндеров

```typescript
// ❌ Плохо: ререндер на каждый символ
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Компонент ререндерится при каждом нажатии клавиши
  return (
    <form>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </form>
  );
}
```

**Проблемы:**

- 🐌 Ререндер всего компонента на каждый символ
- 📦 Сложно масштабируется (большие формы)
- 🔄 Дублирование кода для каждого поля
- ⚠️ Валидация требует много бойлерплейта

---

## Установка и базовое использование

```bash
pnpm add react-hook-form
```

### Простая форма

```typescript
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data); // { email: '...', password: '...' }
  };

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
  );
}
```

**Преимущества:**

- ✅ Нет ререндеров при вводе
- ✅ Минимальный код
- ✅ Типизация из коробки

---

## Встроенная валидация

```typescript
export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email обязателен',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Некорректный email',
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password', {
          required: 'Пароль обязателен',
          minLength: {
            value: 8,
            message: 'Минимум 8 символов',
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input
        type="number"
        {...register('age', {
          required: 'Возраст обязателен',
          min: {
            value: 18,
            message: 'Вам должно быть 18+',
          },
          valueAsNumber: true, // Преобразует в number
        })}
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
```

---

## Интеграция с Zod

React Hook Form + Zod = идеальная комбинация.

```bash
pnpm add @hookform/resolvers zod
```

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const SignupSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
  confirmPassword: z.string(),
  age: z.number().int().min(18, 'Вам должно быть 18+'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof SignupSchema>;

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    // data гарантированно валиден
    console.log(data);
  };

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

      <input type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age && <span>{errors.age.message}</span>}

      <label>
        <input type="checkbox" {...register('terms')} />
        Согласен с условиями
      </label>
      {errors.terms && <span>{errors.terms.message}</span>}

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
```

---

## Управление ошибками

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

### Touched состояния

```typescript
const {
  formState: { touchedFields, dirtyFields },
} = useForm();

// Показывать ошибку только после blur
{touchedFields.email && errors.email && (
  <span>{errors.email.message}</span>
)}
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

## Watched значения и условная логика

### watch для реактивности

```typescript
function ProfileForm() {
  const { register, watch } = useForm();

  const country = watch('country');

  return (
    <form>
      <select {...register('country')}>
        <option value="US">USA</option>
        <option value="CA">Canada</option>
        <option value="UK">UK</option>
      </select>

      {/* Условное поле в зависимости от country */}
      {country === 'US' && (
        <input {...register('state')} placeholder="State" />
      )}

      {/* Поле SSN только для USA */}
      {country === 'US' && (
        <input {...register('ssn')} placeholder="SSN" />
      )}
    </form>
  );
}
```

### Подписка на изменения

```typescript
const { watch } = useForm()

useEffect(() => {
  const subscription = watch((value, { name, type }) => {
    console.log('Changed field:', name, value)
  })

  return () => subscription.unsubscribe()
}, [watch])
```

---

## Динамические поля (Field Arrays)

```typescript
import { useForm, useFieldArray } from 'react-hook-form';

interface FormData {
  users: Array<{ name: string; email: string }>;
}

export function UsersForm() {
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      users: [{ name: '', email: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  });

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
  );
}
```

---

## Controlled компоненты (Controller)

Для кастомных UI библиотек (Radix, MUI, etc.).

```typescript
import { Controller, useForm } from 'react-hook-form';
import { Select } from '@/components/ui/Select';

export function SettingsForm() {
  const { control, handleSubmit } = useForm();

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
  );
}
```

---

## Оптимизация производительности

### Режим валидации

```typescript
const { register } = useForm({
  mode: 'onBlur', // Валидация при потере фокуса (default: onSubmit)
  // mode: 'onChange', // При каждом изменении
  // mode: 'onTouched', // После первого blur
  // mode: 'all', // onChange + onBlur
})
```

### Отключение ререндеров

```typescript
// ❌ watch вызывает ререндер
const value = watch('email')

// ✅ Используйте getValues без ререндера
const { getValues } = useForm()
const value = getValues('email')
```

### Изоляция форм

```typescript
// Разбейте большую форму на подформы
function BigForm() {
  return (
    <>
      <PersonalInfoForm />
      <AddressForm />
      <PaymentForm />
    </>
  );
}

// Каждая подформа изолирована
function PersonalInfoForm() {
  const { register } = useForm();
  // Ререндер только этой части
}
```

---

## Сравнение: React Hook Form vs Formik

| Критерий           | React Hook Form | Formik  |
| ------------------ | --------------- | ------- |
| Ререндеры          | Минимальные     | Много   |
| Bundle size        | ~9KB            | ~15KB   |
| Производительность | ⚡⚡⚡          | ⚡      |
| TypeScript         | Отличная        | Хорошая |
| Валидация          | Zod, Yup, Joi   | Yup     |
| Uncontrolled       | ✅              | ❌      |
| Field Arrays       | ✅              | ✅      |
| Ecosystem          | Растёт          | Зрелая  |

**Выбор в 2026:** React Hook Form — стандарт.

---

## Интеграция с TanStack Query

```typescript
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

type UserFormData = z.infer<typeof UserSchema>;

export function CreateUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  });

  const createUser = useMutation({
    mutationFn: (data: UserFormData) => apiClient.post('/users', data),
    onSuccess: () => {
      reset(); // Очистка формы
    },
    onError: (error: any) => {
      // Обработка серверных ошибок
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, message]) => {
            setError(field as keyof UserFormData, {
              type: 'server',
              message: message as string,
            });
          }
        );
      }
    },
  });

  const onSubmit = (data: UserFormData) => {
    createUser.mutate(data);
  };

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
  );
}
```

---

## Переиспользуемые поля

```typescript
// components/FormField.tsx
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
}

// Использование
function SignupForm() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField name="email" label="Email" type="email" />
        <FormField name="password" label="Password" type="password" />
        <button type="submit">Sign Up</button>
      </form>
    </FormProvider>
  );
}
```

---

## Best Practices

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

### 3. Используйте defaultValues

```typescript
const { register } = useForm({
  defaultValues: {
    email: '',
    rememberMe: false,
  },
})
```

### 4. Разделяйте большие формы

```typescript
// ❌ Плохо: одна гигантская форма
function MegaForm() {
  // 50 полей...
}

// ✅ Хорошо: разделение на шаги
function MultiStepForm() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <PersonalInfoStep />}
      {step === 2 && <AddressStep />}
      {step === 3 && <PaymentStep />}
    </>
  );
}
```

---

## Заключение

**React Hook Form** — это современный стандарт для форм в React:

- ⚡ **Производительность** — минимальные ререндеры
- 🎯 **Простота** — меньше кода, чем у конкурентов
- 🔧 **Гибкость** — встроенная валидация или Zod/Yup
- 📦 **Размер** — всего 9KB
- 🔒 **Типизация** — отличная поддержка TypeScript

**Ключевые паттерны:**

1. Используйте `zodResolver` для валидации
2. `Controller` для кастомных UI компонентов
3. `useFieldArray` для динамических полей
4. `setError` для серверных ошибок
5. Разделяйте большие формы на компоненты

В следующей главе мы рассмотрим **TanStack Query** для управления серверным состоянием.
