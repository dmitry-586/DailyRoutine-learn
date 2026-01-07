# Глава 50. Error boundaries и стратегия обработки ошибок

Обработка ошибок — критическая часть React-приложений. Error Boundaries позволяют gracefully обрабатывать ошибки в компонентах и предотвращать полный крах приложения.

---

## 50.1. Что такое Error Boundaries

Error Boundaries — это React-компоненты, которые ловят ошибки JavaScript в любом месте дерева дочерних компонентов, логируют их и отображают запасной UI вместо упавшего дерева компонентов.

**Важно:**

- Error Boundaries ловят ошибки только в:
  - рендере компонентов;
  - методах жизненного цикла;
  - конструкторах компонентов.
- Error Boundaries НЕ ловят ошибки в:
  - обработчиках событий;
  - асинхронном коде (setTimeout, промисы);
  - серверном рендеринге (SSR);
  - самом Error Boundary.

---

## 50.2. Создание Error Boundary

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

## 50.3. Где размещать Error Boundaries

### На верхнем уровне

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

### На уровне страниц

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

### Вокруг критичных компонентов

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

---

## 50.4. Обработка ошибок в обработчиках событий

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

## 50.5. Обработка ошибок в асинхронном коде

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

## 50.6. Стратегия обработки ошибок

### 1. Разные уровни Error Boundaries

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

### 2. Специализированные Error Boundaries

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

### 3. Логирование ошибок

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

---

## 50.7. Интеграция с мониторингом

### Sentry

```jsx
import * as Sentry from '@sentry/react'

class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    })
  }

  render() {
    return <Sentry.ErrorBoundary>{this.props.children}</Sentry.ErrorBoundary>
  }
}
```

### Логирование в API

```jsx
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // Отправка на сервер
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    })
  }
}
```

---

## 50.8. Best Practices

### 1. Размещай Error Boundaries стратегически

```jsx
// ✅ Хорошо: на разных уровнях
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
// ✅ Хорошо
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
// ✅ Хорошо
componentDidCatch(error, errorInfo) {
  console.error('Error:', error)
  logErrorToService(error, errorInfo)
}
```

### 4. Предоставляй возможность восстановления

```jsx
// ✅ Хорошо
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

React-компонент, который ловит ошибки в дочерних компонентах и отображает запасной UI.

### 2. Какие ошибки ловит Error Boundary?

Ошибки в рендере, методах жизненного цикла и конструкторах. НЕ ловит ошибки в обработчиках событий и асинхронном коде.

### 3. Почему Error Boundary — классовый компонент?

Пока нет хука для Error Boundary. Нужны методы `getDerivedStateFromError` и `componentDidCatch`.

### 4. Как обрабатывать ошибки в обработчиках событий?

Использовать `try/catch` в обработчике события.

### 5. Как обрабатывать ошибки в асинхронном коде?

Использовать `try/catch` с `async/await` или `.catch()` с промисами.

---

## Key Takeaways

- Error Boundaries ловят ошибки в рендере и методах жизненного цикла
- НЕ ловят ошибки в обработчиках событий и асинхронном коде
- Размещай Error Boundaries стратегически на разных уровнях
- Используй try/catch для событий и асинхронного кода
- Логируй ошибки в сервис мониторинга
- Предоставляй возможность восстановления после ошибки
- Error Boundary — пока только классовый компонент

