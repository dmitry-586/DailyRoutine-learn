# Глава 29. Отмена задач, таймауты и race conditions: AbortController

Управление жизненным циклом асинхронных операций — критичный навык. Отмена запросов, таймауты и предотвращение race conditions необходимы для создания надёжных приложений.

---

## 29.1. AbortController: отмена асинхронных операций

`AbortController` позволяет отменять асинхронные операции (fetch, промисы и т.д.).

**Базовое использование:**

```javascript
const controller = new AbortController()
const signal = controller.signal

// Передаём signal в операцию
fetch('/api/data', { signal })
  .then(res => res.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request cancelled')
    }
  })

// Отменяем операцию
controller.abort()
```

### Отмена fetch запроса

```javascript
const controller = new AbortController()

const fetchData = async () => {
  try {
    const response = await fetch('/api/data', {
      signal: controller.signal
    })
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted')
    } else {
      throw error
    }
  }
}

// Начинаем загрузку
const dataPromise = fetchData()

// Отменяем через 5 секунд
setTimeout(() => {
  controller.abort()
}, 5000)
```

### Отмена нескольких операций

```javascript
const controller = new AbortController()

// Все запросы используют один signal
const [users, posts, comments] = await Promise.all([
  fetch('/api/users', { signal: controller.signal }),
  fetch('/api/posts', { signal: controller.signal }),
  fetch('/api/comments', { signal: controller.signal })
])

// Отмена отменит все три запроса
controller.abort()
```

---

## 29.2. Создание отменяемых промисов

Промисы по умолчанию не отменяемы, но можно обернуть:

```javascript
function cancellablePromise(promise, signal) {
  return new Promise((resolve, reject) => {
    // Если уже отменён
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }
    
    // Слушаем отмену
    signal.addEventListener('abort', () => {
      reject(new DOMException('Aborted', 'AbortError'))
    })
    
    // Выполняем оригинальный промис
    promise.then(resolve, reject)
  })
}

// Использование
const controller = new AbortController()
const promise = fetch('/api/data').then(res => res.json())

const cancellable = cancellablePromise(promise, controller.signal)

// Отменяем
controller.abort()
```

---

## 29.3. Таймауты для промисов

### Таймаут с Promise.race

```javascript
function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`))
    }, timeoutMs)
  })
  
  return Promise.race([promise, timeoutPromise])
}

// Использование
try {
  const data = await withTimeout(fetch('/api/data'), 5000)
} catch (error) {
  if (error.message.includes('timed out')) {
    console.log('Request timeout')
  }
}
```

### Таймаут с AbortController

```javascript
function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  
  return fetch(url, { signal: controller.signal })
    .then(res => {
      clearTimeout(timeoutId)
      return res
    })
    .catch(error => {
      clearTimeout(timeoutId)
      if (error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    })
}
```

---

## 29.4. Race conditions (гонки состояний)

Проблема возникает, когда несколько асинхронных операций меняют общее состояние.

### Пример проблемы

```javascript
let counter = 0

async function increment() {
  const current = counter
  await delay(100) // Имитация асинхронной операции
  counter = current + 1
}

increment()
increment()
// Теоретически counter может стать 1 вместо 2
```

**Почему?**

Обе функции читают `counter = 0`, затем обе записывают `counter = 1`.

### Решения

#### 1. Сериализация операций

```javascript
let queue = Promise.resolve()

async function increment() {
  queue = queue.then(async () => {
    const current = counter
    await delay(100)
    counter = current + 1
  })
  return queue
}

await increment()
await increment()
// counter = 2
```

#### 2. Использование функций обновления (React)

```javascript
// ❌ Плохо — race condition
setCount(count + 1)

// ✅ Хорошо — актуальное состояние
setCount(prev => prev + 1)
```

#### 3. Атомарные операции на сервере

```javascript
// На сервере используйте транзакции или атомарные операции
await db.increment('counter', { by: 1 })
```

---

## 29.5. Отмена при размонтировании компонента (React)

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const controller = new AbortController()
    
    fetchUser(userId, { signal: controller.signal })
      .then(setUser)
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error(error)
        }
      })
    
    // Отменяем при размонтировании
    return () => {
      controller.abort()
    }
  }, [userId])
  
  return <div>{user?.name}</div>
}
```

---

## 29.6. Отмена при изменении зависимостей

```javascript
function SearchResults({ query }) {
  const [results, setResults] = useState([])
  
  useEffect(() => {
    const controller = new AbortController()
    
    search(query, { signal: controller.signal })
      .then(setResults)
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error(error)
        }
      })
    
    // При изменении query предыдущий запрос отменяется
    return () => {
      controller.abort()
    }
  }, [query])
  
  return <div>{results.map(/* ... */)}</div>
}
```

---

## 29.7. Комбинирование таймаутов и отмены

```javascript
async function fetchWithTimeoutAndCancel(url, timeoutMs, signal) {
  const controller = new AbortController()
  
  // Объединяем внешний signal и таймаут
  const combinedSignal = AbortSignal.any([
    signal,
    AbortSignal.timeout(timeoutMs)
  ])
  
  // Если внешний signal отменён, отменяем и наш
  signal.addEventListener('abort', () => {
    controller.abort()
  })
  
  return fetch(url, { signal: combinedSignal })
}
```

**Или вручную:**

```javascript
function fetchWithTimeoutAndCancel(url, timeoutMs, externalSignal) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  
  // Если внешний signal отменён, отменяем и наш
  if (externalSignal) {
    externalSignal.addEventListener('abort', () => {
      clearTimeout(timeoutId)
      controller.abort()
    })
  }
  
  return fetch(url, { signal: controller.signal })
    .finally(() => {
      clearTimeout(timeoutId)
    })
}
```

---

## 29.8. AbortSignal.timeout (современный API)

```javascript
// Создание signal с таймаутом
const signal = AbortSignal.timeout(5000)

fetch('/api/data', { signal })
  .then(res => res.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request timeout')
    }
  })
```

**Поддержка:** Современные браузеры (Chrome 103+, Firefox 102+)

---

## 29.9. Практические паттерны

### Хук для отменяемых запросов (React)

```javascript
function useCancellableFetch() {
  const controllerRef = useRef(null)
  
  const fetchData = useCallback(async (url, options = {}) => {
    // Отменяем предыдущий запрос
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    
    // Создаём новый controller
    const controller = new AbortController()
    controllerRef.current = controller
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })
      return await response.json()
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request cancelled')
      }
      throw error
    }
  }, [])
  
  useEffect(() => {
    return () => {
      // Отменяем при размонтировании
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [])
  
  return fetchData
}
```

### Retry с отменой

```javascript
async function fetchWithRetry(url, maxRetries = 3, signal) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, { signal })
      return await response.json()
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error // Не повторяем отменённые запросы
      }
      
      if (i === maxRetries - 1) {
        throw error
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
```

---

## Вопросы на собеседовании

### 1. Что такое AbortController?

API для отмены асинхронных операций. Создаёт signal, который можно передать в fetch и другие операции для их отмены.

### 2. Как отменить fetch запрос?

Передать `signal` из `AbortController` в опции fetch, затем вызвать `controller.abort()`.

### 3. Что такое race condition?

Проблема, когда несколько асинхронных операций одновременно изменяют общее состояние, что приводит к неожиданным результатам.

### 4. Как предотвратить race condition?

Сериализация операций, использование функций обновления (в React), атомарные операции на сервере.

### 5. Как реализовать таймаут для промиса?

Использовать `Promise.race` с промисом, который отклоняется через заданное время, или `AbortSignal.timeout()`.

### 6. Как отменить запрос при размонтировании React компонента?

Использовать `useEffect` с cleanup функцией, которая вызывает `controller.abort()`.

### 7. В чём разница между AbortController и Promise.race для таймаутов?

`AbortController` позволяет отменить операцию вручную. `Promise.race` только создаёт таймаут, но не позволяет отменить его явно.

---

## Key Takeaways

- AbortController позволяет отменять асинхронные операции
- Таймауты можно реализовать через Promise.race или AbortSignal.timeout
- Race conditions возникают при одновременном изменении общего состояния
- В React отменяйте запросы при размонтировании компонента
- Комбинируйте таймауты и отмену для надёжных операций
- Понимание отмены критично для предотвращения утечек памяти и ненужных операций

