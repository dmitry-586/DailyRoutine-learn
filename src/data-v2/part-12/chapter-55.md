# Глава 55. Формы и контракты: React Hook Form и Zod

React Hook Form и Zod — идеальная комбинация для создания производительных форм с runtime валидацией. Понимание их интеграции критично для работы с формами в React.

---

## 55.1. Проблемы нативных форм

### Controlled компоненты = много ререндеров

При использовании `useState` для каждого поля формы возникают проблемы:

- **Ререндер на каждый символ** — весь компонент перерисовывается при вводе
- **Плохо масштабируется** — форма на 20 полей = 20 useState + 20 onChange
- **Много бойлерплейта** — дублирование кода для каждого поля
- **Сложная валидация** — приходится писать вручную для каждого поля

React Hook Form решает все эти проблемы, используя uncontrolled компоненты под капотом.

---

## 55.2. React Hook Form: базовое использование

```bash
npm install react-hook-form
```

### Как это работает

React Hook Form использует **uncontrolled компоненты** — значения хранятся в DOM, а не в React state. Это даёт:

- **Нет ререндеров при вводе** — компонент не перерисовывается на каждый символ
- **Минимальный код** — `register('field')` вместо value + onChange
- **Типизация из коробки** — TypeScript знает структуру формы

**Ключевые методы:**

- **register('fieldName')** — регистрирует поле в форме
- **handleSubmit(onSubmit)** — обёртка для submit handler
- **formState.errors** — объект с ошибками валидации

**Важно:** компонент ререндерится только при submit или при изменении `formState` (ошибки, dirty, etc).

---

## 55.3. Zod: runtime валидация

### Зачем нужна runtime валидация?

TypeScript проверяет типы **при компиляции**, но не защищает от невалидных данных **в runtime**.

**Проблема:** когда вы получаете данные от API, TypeScript просто верит вам на слово. Если API вернёт `null` вместо email — приложение упадёт.

**Решение:** Zod валидирует данные в runtime и гарантирует соответствие схеме.

### Преимущества Zod

1. **Runtime валидация** — проверка реальных данных, а не только типов
2. **Автовывод типов** — `z.infer<typeof Schema>` создаёт TypeScript тип из схемы
3. **Единый источник правды** — схема определяет и тип, и валидацию
4. **Понятные сообщения об ошибках** — можно настроить для каждого поля

**Два метода валидации:**

- **parse()** — выбрасывает ошибку при невалидных данных
- **safeParse()** — возвращает `{ success: true, data }` или `{ success: false, error }`

---

## 55.4. Интеграция React Hook Form и Zod

```bash
npm install @hookform/resolvers zod
```

### Как это работает

`zodResolver` связывает Zod-схему с React Hook Form:

1. **Определяете Zod-схему** — описывает структуру и правила валидации
2. **Выводите TypeScript тип** — `z.infer<typeof Schema>`
3. **Передаёте resolver** — `resolver: zodResolver(Schema)`
4. **Получаете валидные данные** — в `onSubmit` данные гарантированно соответствуют схеме

**Преимущества интеграции:**

- **Единый источник правды** — схема определяет и тип, и валидацию
- **Автоматические сообщения об ошибках** — из Zod-схемы в `formState.errors`
- **Кросс-поле валидация** — через `.refine()` (например, совпадение паролей)

**Важно:** используйте кастомные сообщения в схеме: `z.string().email('Некорректный email')` — это пойдёт в UI.

### Продвинутая валидация

**Кросс-поле валидация с `.refine()`:**

Используйте `.refine()` для валидации, которая зависит от нескольких полей. Например, проверка совпадения паролей: `.refine(data => data.password === data.confirmPassword, { message: 'Пароли не совпадают', path: ['confirmPassword'] })`.

**Параметр `path`** указывает, к какому полю привязать ошибку.

**Checkbox-согласие:**

Для обязательного checkbox используйте `z.literal(true)` с кастомным сообщением.

**Числовые поля:**

HTML input всегда возвращает строку. Используйте `{ valueAsNumber: true }` в register для автоматического преобразования в число.

---

## 55.5. Управление ошибками

### Состояния формы

`formState` содержит полезные флаги:

- **errors** — объект с ошибками для каждого поля
- **isSubmitting** — форма отправляется (для disabled кнопки)
- **isValid** — форма валидна (для активации кнопки)
- **isDirty** — форма изменена (для предупреждения о несохранённых данных)

### Серверные ошибки

API может вернуть ошибки, которые не покрывает клиентская валидация (например, «email уже занят»).

Используйте `setError()` для добавления серверных ошибок к полям формы. Это позволяет показывать серверные ошибки в том же месте, что и клиентские.

---

## 55.6. Интеграция с TanStack Query

React Hook Form + Zod + TanStack Query — полный стек для работы с формами.

**Стандартный паттерн:** форма (RHF) → мутация (TanStack Query) → инвалидация списка.

**Паттерн интеграции:**

1. **Zod-схема** — определяет валидацию
2. **useForm** — управляет формой
3. **useMutation** — отправляет данные на сервер
4. **Инвалидация** — обновление списка после успешной мутации

**Пример полного цикла:**

```typescript
const createUserSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  email: z.string().email('Некорректный email'),
})

type CreateUserForm = z.infer<typeof createUserSchema>

function CreateUserForm() {
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
  })

  const createUser = useMutation({
    mutationFn: (data: CreateUserForm) => apiClient.post('/users', data),
    onSuccess: () => {
      form.reset() // Очистить форму
      queryClient.invalidateQueries({ queryKey: ['users'] }) // Обновить список
      toast.success('Пользователь создан')
    },
    onError: (error) => {
      // Маппинг серверных ошибок на поля
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, message]) => {
          form.setError(field as keyof CreateUserForm, { message })
        })
      }
    },
  })

  return (
    <form onSubmit={form.handleSubmit((data) => createUser.mutate(data))}>
      <input {...form.register('name')} />
      {form.formState.errors.name && <span>{form.formState.errors.name.message}</span>}
      
      <input {...form.register('email')} />
      {form.formState.errors.email && <span>{form.formState.errors.email.message}</span>}
      
      <button disabled={createUser.isPending}>
        {createUser.isPending ? 'Создание...' : 'Создать'}
      </button>
    </form>
  )
}
```

**Обработка результатов:**

- **onSuccess** — очистить форму через `reset()`, инвалидировать список, показать уведомление
- **onError** — мапить серверные ошибки на поля через `setError()`

**Кнопка submit:**

- `disabled={createUser.isPending}` — блокировать при отправке
- Показывать состояние: «Создание...» / «Создать»

---

## 55.7. Валидация API ответов с Zod

### Зачем валидировать ответы API?

Zod полезен не только для форм, но и для проверки того, что пришло с бэкенда. Это защита от «сломанных» контрактов.

**Проблема:** API — это граница вашего приложения. Данные извне могут быть невалидными: backend изменился, ошибка в API, атака. TypeScript не защищает от runtime ошибок.

**Паттерн:** валидируйте ВСЕ данные на границе приложения через Zod-схемы.

### Пример валидации API ответа

```typescript
// Схема для ответа API
const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
})

type UserResponse = z.infer<typeof UserResponseSchema>

// В queryFn валидируем ответ
const useUser = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/users/${id}`)
      // Валидация на границе приложения
      return UserResponseSchema.parse(data) // Выбросит ошибку при невалидных данных
    },
  })
}
```

### parse vs safeParse

- **parse()** — выбрасывает ошибку при невалидных данных. Используйте когда невалидные данные = критическая ошибка. TanStack Query обработает ошибку автоматически.

- **safeParse()** — возвращает `{ success, data/error }`. Используйте когда нужно graceful handling (показать fallback UI, залогировать ошибку).

**Рекомендация:** для API запросов используйте `parse()` — пусть TanStack Query обработает ошибку. Для необязательных данных (localStorage, query params) — `safeParse()`.

---

## 55.8. Продвинутые возможности

### Field Arrays (динамические поля)

Используйте `useFieldArray` когда количество полей неизвестно заранее: список товаров в заказе, несколько email-адресов, динамические фильтры.

**Ключевые методы:**

- **fields** — массив полей для рендеринга
- **append(defaultValue)** — добавить поле
- **remove(index)** — удалить поле
- **move(from, to)** — переместить поле

**Важно:** используйте `field.id` как key, а не index — это критично для правильной работы React.

### Controller (для controlled компонентов)

Сторонние UI-библиотеки (Select, DatePicker, Slider) часто требуют controlled подхода.

`Controller` оборачивает такие компоненты и связывает их с React Hook Form. В `render` получаете `field` с `value` и `onChange`.

---

## 55.9. Best Practices

### 1. Используйте Zod resolver вместо встроенной валидации

Встроенная валидация React Hook Form (`required: true`, `pattern: ...`) работает, но Zod даёт:
- Единый источник правды (тип + валидация)
- Переиспользуемые схемы
- Лучшие сообщения об ошибках

### 2. Всегда типизируйте формы

Передавайте тип в `useForm<FormData>()` — это даёт автокомплит и защиту от опечаток в именах полей.

### 3. Валидируйте данные на границах

API ответы, localStorage, query params — всё что приходит извне должно проходить через Zod-схему.

### 4. Разделяйте большие формы

Форма на 50 полей = кошмар для пользователя. Используйте multi-step формы с прогресс-индикатором. Каждый шаг — отдельный компонент со своей валидацией.

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
