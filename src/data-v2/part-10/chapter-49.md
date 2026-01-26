# Глава 49. Error Boundaries и стратегия обработки ошибок

Обработка ошибок — критическая часть React-приложений. Error Boundaries позволяют gracefully обрабатывать ошибки в компонентах и предотвращать полный крах приложения. Но важно понимать не только как их создавать, но и **где их размещать** для максимальной эффективности.

---

## 49.1. Что такое Error Boundaries

Error Boundaries — это React-компоненты, которые ловят ошибки JavaScript в любом месте дерева дочерних компонентов, логируют их и отображают запасной UI вместо упавшего дерева компонентов.

**Важно понимать границы возможностей:**

Error Boundaries ловят ошибки только в:

- рендере компонентов;
- методах жизненного цикла;
- конструкторах компонентов.

Error Boundaries **НЕ ловят** ошибки в:

- обработчиках событий (используй `try/catch`);
- асинхронном коде (setTimeout, промисы, async/await);
- серверном рендеринге (SSR);
- самом Error Boundary (ошибка в самом boundary не ловится).

Error Boundaries — это не магия, они не видят ошибки внутри обработчиков событий или асинхронных запросов. Для таких случаев нужен `try/catch`.

---

## 49.2. Создание Error Boundary

Error Boundary — это классовый компонент (пока нет хука для этого):

```jsx
import { Component, ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Можно отправить ошибку в сервис мониторинга
    // logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div>
            <h2>Something went wrong.</h2>
            <p>{this.state.error?.message}</p>
          </div>
        )
      )
    }

    return this.props.children
  }
}
```

### Использование

```jsx
function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Dashboard />
    </ErrorBoundary>
  )
}
```

---

## 49.3. Стратегия размещения: вложенные предохранители

Главный вопрос: **где размещать Error Boundaries?** Ответ зависит от того, какую часть приложения ты хочешь защитить.

### На верхнем уровне

Размещение на верхнем уровне защищает всё приложение:

```jsx
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}
```

Если падает любая страница, пользователь увидит запасной UI вместо белого экрана. Но это означает, что падение одного виджета может «убить» всё приложение.

### На уровне страниц

Более гранулярный подход — размещать Error Boundary на уровне каждой страницы:

```jsx
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ErrorBoundary>
              <DashboardPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/profile"
          element={
            <ErrorBoundary>
              <ProfilePage />
            </ErrorBoundary>
          }
        />
      </Routes>
    </Router>
  )
}
```

Теперь падение одной страницы не влияет на другие. Пользователь может перейти на другую страницу, даже если одна из них упала.

### Вокруг критичных компонентов

Самый гранулярный подход — размещать Error Boundaries вокруг отдельных виджетов:

```jsx
function Dashboard() {
  return (
    <div>
      <Header />
      <ErrorBoundary fallback={<ChartError />}>
        <Chart />
      </ErrorBoundary>
      <ErrorBoundary fallback={<TableError />}>
        <DataTable />
      </ErrorBoundary>
    </div>
  )
}
```

Если падает один виджет (например, график), остальные продолжают работать. Это стратегия «вложенных предохранителей»: если падает один виджет, всё приложение должно продолжать работать.

---

## 49.4. Обработка ошибок в обработчиках событий

Error Boundaries не ловят ошибки в обработчиках событий. Используй `try/catch`:

```jsx
function Button() {
  const handleClick = () => {
    try {
      // Код, который может упасть
      riskyOperation()
    } catch (error) {
      console.error('Error in click handler:', error)
      // Обработка ошибки
    }
  }

  return <button onClick={handleClick}>Click</button>
}
```

---

## 49.5. Обработка ошибок в асинхронном коде

Error Boundaries не ловят ошибки в асинхронном коде. Используй `try/catch` или `.catch()`:

```jsx
function Component() {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('/api/data')
        setData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error)
      }
    }

    fetchData()
  }, [])

  // Или с .catch()
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
      .catch((error) => {
        console.error('Error:', error)
        setError(error)
      })
  }, [])
}
```

---

## 49.6. Стратегия обработки ошибок

### 1. Разные уровни Error Boundaries

Используй вложенные Error Boundaries для разных уровней защиты:

```jsx
function App() {
  return (
    <ErrorBoundary fallback={<AppError />}>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ErrorBoundary fallback={<PageError />}>
                <DashboardPage />
              </ErrorBoundary>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}
```

Если падает страница, показывается `PageError`. Если падает что-то критичное на уровне приложения, показывается `AppError`.

### 2. Специализированные Error Boundaries

Создавай специализированные Error Boundaries для разных частей приложения:

```jsx
function ChartErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallback={
        <div>
          <p>Не удалось загрузить график</p>
          <button onClick={() => window.location.reload()}>
            Перезагрузить
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
```

Разные части приложения могут иметь разные стратегии восстановления.

### 3. Логирование ошибок

Всегда логируй ошибки для отладки:

```jsx
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // Локальное логирование
    console.error('Error caught:', error, errorInfo)

    // Отправка в сервис мониторинга
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      })
    }
  }
}
```

### 4. Восстановление после ошибки

Предоставляй возможность восстановления:

```jsx
class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      )
    }

    return this.props.children
  }
}
```

Пользователь может попробовать снова без перезагрузки страницы.

---

## 49.7. Best Practices

### 1. Размещай Error Boundaries стратегически

```jsx
// Хорошо: на разных уровнях
<ErrorBoundary>
  <App />
</ErrorBoundary>

<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>

<ErrorBoundary>
  <Chart />
</ErrorBoundary>
```

### 2. Используй try/catch для событий и асинхронного кода

```jsx
// Хорошо
const handleClick = () => {
  try {
    riskyOperation()
  } catch (error) {
    console.error(error)
  }
}
```

### 3. Логируй ошибки

```jsx
// Хорошо
componentDidCatch(error, errorInfo) {
  console.error('Error:', error)
  logErrorToService(error, errorInfo)
}
```

### 4. Предоставляй возможность восстановления

```jsx
// Хорошо
if (this.state.hasError) {
  return (
    <div>
      <p>Something went wrong</p>
      <button onClick={this.handleReset}>Try again</button>
    </div>
  )
}
```

---

## Вопросы на собеседовании

### 1. Что такое Error Boundary?

React-компонент, который ловит ошибки в дочерних компонентах и отображает запасной UI. Это способ предотвратить полный крах приложения при ошибке в одном компоненте.

### 2. Какие ошибки ловит Error Boundary?

Ошибки в рендере, методах жизненного цикла и конструкторах. НЕ ловит ошибки в обработчиках событий и асинхронном коде — для них нужен `try/catch`.

### 3. Почему Error Boundary — классовый компонент?

Пока нет хука для Error Boundary. Нужны методы `getDerivedStateFromError` и `componentDidCatch`, которые доступны только в классовых компонентах.

### 4. Как обрабатывать ошибки в обработчиках событий?

Использовать `try/catch` в обработчике события. Error Boundaries не ловят ошибки в обработчиках событий.

### 5. Где размещать Error Boundaries?

Стратегически: на верхнем уровне для защиты всего приложения, на уровне страниц для изоляции страниц, вокруг критичных компонентов для изоляции виджетов. Стратегия «вложенных предохранителей»: если падает один виджет, всё приложение должно продолжать работать.
