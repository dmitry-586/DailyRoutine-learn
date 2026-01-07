# Глава 27. Promise и async/await: состояния, цепочки, ошибки

Промисы и async/await — основа асинхронного программирования в современном JavaScript. Понимание их работы критично для написания правильного асинхронного кода и обработки ошибок.

---

## 27.1. Promise: что это такое

**Promise** — это объект, который представляет результат асинхронной операции.

Состояния промиса:

- `pending` — ожидание результата
- `fulfilled` — успешно завершён
- `rejected` — завершён с ошибкой

**Важно:** переход из `pending` в `fulfilled` или `rejected` происходит **один раз и навсегда**. Промис нельзя изменить после разрешения.

---

## 27.2. Создание промиса

```javascript
const p = new Promise((resolve, reject) => {
  // асинхронная операция
  
  if (success) {
    resolve(data) // Переход в fulfilled
  } else {
    reject(error) // Переход в rejected
  }
})
```

**Пример:**

```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'Alice' })
      } else {
        reject(new Error('Invalid ID'))
      }
    }, 1000)
  })
}
```

**Статические методы:**

```javascript
// Уже выполненный промис
Promise.resolve(value) // fulfilled с value
Promise.reject(error) // rejected с error
```

---

## 27.3. then / catch / finally

### then

```javascript
promise.then(
  (value) => {
    // Обработка успешного результата
    return newValue
  },
  (error) => {
    // Обработка ошибки (альтернатива catch)
  }
)
```

**Важно:** `then` возвращает **новый промис**, что позволяет строить цепочки.

### catch

```javascript
promise.catch((error) => {
  // Обработка ошибки
})
```

`catch` — это сокращение для `then(null, errorHandler)`.

### finally

```javascript
promise.finally(() => {
  // Выполняется всегда, независимо от результата
  // Не получает аргументов
})
```

**Пример цепочки:**

```javascript
fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw new Error('HTTP error')
    }
    return res.json()
  })
  .then((data) => {
    console.log(data)
    return processData(data)
  })
  .catch((error) => {
    console.error('Request failed', error)
  })
  .finally(() => {
    console.log('Request finished')
  })
```

---

## 27.4. Типичные ошибки

### Забытый return

```javascript
//  Плохо
fetch(url)
  .then((res) => {
    res.json() // Промис создан, но не возвращён
  })
  .then((data) => {
    // data === undefined
  })

//  Хорошо
fetch(url)
  .then((res) => {
    return res.json() // Возвращаем промис
  })
  .then((data) => {
    // data содержит результат
  })
```

**Правило:** Нужно **обязательно возвращать** промис или значение из `then`, если планируешь пользоваться результатом дальше.

### Смешивание then и async/await

```javascript
//  Плохо — смешивание стилей
async function load() {
  const res = await fetch(url)
  return res.json().then(data => processData(data))
}

//  Хорошо — последовательный await
async function load() {
  const res = await fetch(url)
  const data = await res.json()
  return processData(data)
}

//  Хорошо — полностью then
function load() {
  return fetch(url)
    .then(res => res.json())
    .then(data => processData(data))
}
```

---

## 27.5. async / await: синтаксический сахар

`async / await` делают асинхронный код похожим на синхронный, но под капотом это по‑прежнему промисы и microtasks.

```javascript
async function loadData(url) {
  const res = await fetch(url)
  
  if (!res.ok) {
    throw new Error('HTTP error')
  }
  
  const data = await res.json()
  return data
}
```

**Особенности `async`‑функций:**

- всегда возвращают **промис**
- любое выброшенное исключение превращается в `rejected`‑состояние промиса
- `await` останавливает функцию до завершения промиса (не блокируя поток в целом)

**Эквивалент через then:**

```javascript
function loadData(url) {
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('HTTP error')
      }
      return res.json()
    })
}
```

---

## 27.6. Обработка ошибок с async / await

### try / catch

```javascript
async function safeLoad(url) {
  try {
    const data = await loadData(url)
    return data
  } catch (error) {
    console.error('Failed to load', error)
    throw error // Пробрасываем дальше, если нужно
  }
}
```

### Обработка ошибок в цепочке

```javascript
async function process() {
  try {
    const data = await fetchData()
    const processed = await processData(data)
    return processed
  } catch (error) {
    // Ловит ошибки из всех await в блоке try
    handleError(error)
  }
}
```

### Проброс ошибок

```javascript
async function load() {
  const data = await fetchData() // Если ошибка, промис будет rejected
  return data
}

// Вызывающий код должен обработать ошибку
load()
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

---

## 27.7. Параллельное vs последовательное выполнение

### Последовательное выполнение (плохо для независимых операций)

```javascript
//  Плохо — запросы выполняются последовательно
const a = await fetch(url1)
const b = await fetch(url2)
// Общее время = время(url1) + время(url2)
```

### Параллельное выполнение

```javascript
//  Хорошо — запросы выполняются параллельно
const [a, b] = await Promise.all([
  fetch(url1),
  fetch(url2)
])
// Общее время = max(время(url1), время(url2))
```

**Когда использовать параллельное выполнение:**

- Независимые операции
- Нет зависимостей между запросами
- Нужно ускорить выполнение

**Когда использовать последовательное выполнение:**

- Второй запрос зависит от результата первого
- Нужно контролировать порядок выполнения
- Ограниченные ресурсы (rate limiting)

---

## 27.8. Возвращаемые значения

### async функция всегда возвращает промис

```javascript
async function getValue() {
  return 42
}

getValue() // Promise<42>
getValue().then(value => console.log(value)) // 42
```

### Выброс исключения = rejected промис

```javascript
async function fail() {
  throw new Error('Oops')
}

fail() // Promise<rejected>
fail().catch(error => console.error(error)) // Error: Oops
```

### await разворачивает промис

```javascript
async function example() {
  const value = await Promise.resolve(42)
  console.log(value) // 42 (не Promise)
  
  const error = await Promise.reject(new Error('Oops'))
  // Выбросит исключение
}
```

---

## 27.9. Глобальная обработка необработанных отклонений

```javascript
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  // Можно отправить в систему мониторинга
  // event.preventDefault() — предотвратить вывод в консоль
})
```

**Важно:** Это последний рубеж, не замена нормальной обработки ошибок. Всегда обрабатывайте ошибки явно.

---

## 27.10. Практические паттерны

### Обработка с fallback

```javascript
async function loadWithFallback(url, fallbackUrl) {
  try {
    return await fetch(url).then(res => res.json())
  } catch (error) {
    console.warn('Primary failed, using fallback')
    return await fetch(fallbackUrl).then(res => res.json())
  }
}
```

### Таймаут для промиса

```javascript
function withTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ])
}

const data = await withTimeout(fetch(url), 5000)
```

### Retry логика

```javascript
async function retry(fn, maxAttempts = 3) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxAttempts - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
```

---

## Вопросы на собеседовании

### 1. Что такое Promise?

Объект, представляющий результат асинхронной операции. Может быть в состоянии pending, fulfilled или rejected.

### 2. В чём разница между then и await?

`then` — метод промиса для обработки результата. `await` — синтаксис для ожидания промиса в async функции. `await` делает код более читаемым.

### 3. Как обработать ошибки в async функции?

Использовать try/catch блок вокруг await выражений.

### 4. Что возвращает async функция?

Всегда возвращает промис. Если функция возвращает значение, оно оборачивается в fulfilled промис.

### 5. Что произойдёт, если забыть return в then?

Следующий then получит undefined вместо результата предыдущего промиса.

### 6. Как выполнить несколько промисов параллельно?

Использовать `Promise.all` или `await Promise.all([...])`.

### 7. Что такое unhandledrejection?

Событие, которое срабатывает, когда промис отклонён, но ошибка не обработана. Последний рубеж для обработки ошибок.
