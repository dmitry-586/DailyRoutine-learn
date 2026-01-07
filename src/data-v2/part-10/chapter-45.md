# Глава 45. Состояние: useState и useReducer

Управление состоянием — основа React-приложений. `useState` и `useReducer` — два основных способа управления состоянием в функциональных компонентах.

---

## 45.1. useState: управление локальным состоянием

### Базовое использование

```jsx
const [count, setCount] = useState(0)
```

`useState` возвращает массив из двух элементов:

1. **Текущее значение состояния** — `count`.
2. **Функция для обновления** — `setCount`.

**Важно понимать:**

- `useState` вызывается **при каждом рендере**, но React запоминает значение между рендерами;
- обновление состояния **асинхронное** — изменения применяются не сразу;
- обновление состояния **вызывает повторный рендер** компонента.

### Функциональное обновление

Когда новое значение зависит от предыдущего, нужно использовать **функциональное обновление**:

```jsx
// ❌ Проблема: count может быть устаревшим
setCount(count + 1)
setCount(count + 1) // не сработает как ожидается

// ✅ Правильно: гарантирует актуальное значение
setCount((prev) => prev + 1)
setCount((prev) => prev + 1) // теперь работает корректно
```

**Почему это важно:**

- React может батчить (группировать) обновления состояния;
- при батчинге несколько вызовов `setCount(count + 1)` будут использовать одно и то же значение `count`;
- функциональное обновление всегда получает актуальное значение из предыдущего обновления.

### Ленивая инициализация

Если начальное значение дорого вычислять, можно передать функцию:

```jsx
// ❌ Вычисляется при каждом рендере (даже если не используется)
const [data, setData] = useState(expensiveCalculation())

// ✅ Вычисляется только один раз при первом рендере
const [data, setData] = useState(() => expensiveCalculation())
```

**Когда использовать:**

- когда начальное значение требует сложных вычислений;
- когда нужно прочитать значение из localStorage или другого источника;
- когда инициализация должна происходить только один раз.

### Объекты и массивы в состоянии

При обновлении объектов и массивов нужно создавать **новые** объекты/массивы, а не мутировать существующие:

```jsx
const [user, setUser] = useState({ name: 'John', age: 30 })

// ❌ Мутация — React не заметит изменение
user.age = 31
setUser(user)

// ✅ Создание нового объекта
setUser({ ...user, age: 31 })

// Или для вложенных объектов
setUser({ ...user, profile: { ...user.profile, email: 'new@email.com' } })
```

**Почему это важно:**

- React сравнивает ссылки на объекты, а не их содержимое;
- если ссылка не изменилась, React считает, что состояние не изменилось;
- это может привести к пропуску обновлений и багам.

### Пример: счётчик

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
```

---

## 45.2. useReducer: управление сложным состоянием

`useReducer` — альтернатива `useState` для сложного состояния с множеством переходов.

### Синтаксис

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
```

### Когда использовать useReducer

**useReducer подходит для:**

- сложной логики обновления состояния (много условий, вложенные объекты);
- состояния с множеством переходов (формы, многошаговые процессы);
- когда логику обновления нужно вынести из компонента;
- подготовки к миграции на Redux (похожий паттерн).

**useState подходит для:**

- простого состояния (число, строка, булево значение);
- независимых значений состояния;
- когда логика обновления простая.

### Преимущества useReducer

- **Централизованная логика** — вся логика обновления в одном месте (reducer);
- **Предсказуемые обновления** — все изменения проходят через reducer;
- **Легче тестировать** — reducer — чистая функция;
- **Поддержка сложных действий** — можно передавать дополнительные данные в `action`.

### Пример: форма с валидацией

```jsx
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field]: action.value,
        },
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value })
    // валидация...
  }

  return <form>{/* поля формы */}</form>
}
```

### Передача данных в action

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) }
    case 'set':
      return { count: action.payload }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>
        +5
      </button>
      <button onClick={() => dispatch({ type: 'set', payload: 100 })}>
        Set to 100
      </button>
    </div>
  )
}
```

---

## 45.3. Сравнение useState и useReducer

| Критерий         | useState                    | useReducer                  |
| ---------------- | --------------------------- | --------------------------- |
| Простота         | Проще                       | Сложнее                     |
| Логика           | В компоненте                | В reducer                   |
| Тестируемость    | Сложнее                     | Легче (чистая функция)      |
| Сложное состояние | Неудобно                    | Удобно                      |
| Множество действий | Много setState            | Один dispatch               |
| Предсказуемость  | Меньше                      | Больше                      |

**Правило выбора:**

- **useState** — для простого состояния (число, строка, булево значение, простой объект).
- **useReducer** — для сложного состояния с множеством переходов (формы, многошаговые процессы, сложная логика).

---

## 45.4. Типичные ошибки

### 1. Мутация состояния

```jsx
// ❌ Плохо
const [items, setItems] = useState([1, 2, 3])
items.push(4)
setItems(items)

// ✅ Хорошо
setItems([...items, 4])
```

### 2. Забытое функциональное обновление

```jsx
// ❌ Проблема при батчинге
setCount(count + 1)
setCount(count + 1)

// ✅ Правильно
setCount((prev) => prev + 1)
setCount((prev) => prev + 1)
```

### 3. Неправильная инициализация

```jsx
// ❌ Вычисляется при каждом рендере
const [data, setData] = useState(expensiveCalculation())

// ✅ Вычисляется один раз
const [data, setData] = useState(() => expensiveCalculation())
```

---

## Вопросы на собеседовании

### 1. В чём разница между useState и useReducer?

`useState` для простого состояния, `useReducer` для сложного состояния с множеством переходов. `useReducer` централизует логику обновления в reducer.

### 2. Когда использовать функциональное обновление?

Когда новое значение зависит от предыдущего, особенно при батчинге обновлений.

### 3. Почему нужно создавать новые объекты/массивы?

React сравнивает ссылки, а не содержимое. Если ссылка не изменилась, React не заметит изменение.

### 4. Зачем нужна ленивая инициализация?

Чтобы дорогие вычисления выполнялись только один раз при первом рендере, а не при каждом.

### 5. Когда использовать useReducer вместо useState?

Для сложного состояния с множеством переходов, когда логику обновления нужно вынести из компонента.

---

## Key Takeaways

- `useState` для простого состояния, `useReducer` для сложного
- Функциональное обновление гарантирует актуальное значение
- Ленивая инициализация для дорогих вычислений
- Всегда создавай новые объекты/массивы, не мутируй
- `useReducer` централизует логику и легче тестируется
- Выбор между `useState` и `useReducer` зависит от сложности состояния

