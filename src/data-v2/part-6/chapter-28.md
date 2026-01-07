# Глава 28. Комбинаторы промисов: all, allSettled, race, any

Комбинаторы промисов позволяют работать с несколькими асинхронными операциями одновременно. Понимание различий между ними критично для выбора правильного инструмента под задачу.

---

## 28.1. Promise.all

Ждёт, пока **все** промисы выполнятся успешно, или падает при первой ошибке.

**Синтаксис:**

```javascript
Promise.all([promise1, promise2, promise3])
  .then(([result1, result2, result3]) => {
    // Все три успешны
  })
  .catch((error) => {
    // Хотя бы один отклонён
  })
```

**Пример:**

```javascript
const [user, posts, comments] = await Promise.all([
  fetchUser(userId),
  fetchPosts(userId),
  fetchComments(userId)
])
```

**Характеристики:**

- Возвращает массив результатов в том же порядке, что и входные промисы
- Если хотя бы один промис отклонён, весь `Promise.all` отклоняется
- Остальные промисы продолжают выполняться, но их результаты игнорируются

**Используется, когда:**

- все операции обязательны
- без любого из результатов продолжать нельзя
- нужны все результаты одновременно

**Пример использования:**

```javascript
// Загрузка нескольких ресурсов для страницы
const [header, sidebar, content] = await Promise.all([
  fetch('/api/header'),
  fetch('/api/sidebar'),
  fetch('/api/content')
])
```

---

## 28.2. Promise.allSettled

Всегда дожидается завершения **всех** промисов, независимо от успеха или ошибки.

**Синтаксис:**

```javascript
Promise.allSettled([promise1, promise2])
  .then((results) => {
    // results: [
    //   { status: 'fulfilled', value: ... },
    //   { status: 'rejected', reason: ... }
    // ]
  })
```

**Пример:**

```javascript
const results = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`Request ${index} succeeded:`, result.value)
  } else {
    console.error(`Request ${index} failed:`, result.reason)
  }
})
```

**Характеристики:**

- Всегда возвращает массив результатов
- Каждый результат имеет `status: 'fulfilled' | 'rejected'`
- Успешные результаты в `value`, ошибки в `reason`
- Никогда не отклоняется сам

**Используется, когда:**

- агрегация результатов, где часть может упасть
- логирование, метрики
- параллельные запросы на разные сервисы
- нужно обработать все результаты, даже если некоторые упали

**Пример использования:**

```javascript
// Отправка аналитики в несколько сервисов
const analytics = await Promise.allSettled([
  sendToGoogleAnalytics(data),
  sendToAmplitude(data),
  sendToMixpanel(data)
])

// Обрабатываем результаты независимо
analytics.forEach(result => {
  if (result.status === 'rejected') {
    logError('Analytics failed', result.reason)
  }
})
```

---

## 28.3. Promise.race

Возвращает результат **первого завершившегося** промиса (успех или ошибка).

**Синтаксис:**

```javascript
Promise.race([promise1, promise2])
  .then((result) => {
    // Результат того, кто завершился первым
  })
  .catch((error) => {
    // Ошибка того, кто завершился первым
  })
```

**Пример:**

```javascript
const result = await Promise.race([
  fetch('/api/data'),
  timeout(5000) // Промис, который отклоняется через 5 секунд
])
```

**Характеристики:**

- Возвращает результат первого завершившегося промиса
- Остальные промисы продолжают выполняться, но их результаты игнорируются
- Может вернуть как успех, так и ошибку (в зависимости от того, что завершилось первым)

**Используется для:**

- реализации таймаутов
- конкурентных запросов (когда нужен только первый результат)
- отмены операций

**Пример использования:**

```javascript
// Таймаут для запроса
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ])
}

// Конкурентные запросы к разным серверам
const data = await Promise.race([
  fetchFromServer1(),
  fetchFromServer2(),
  fetchFromServer3()
])
```

---

## 28.4. Promise.any

Возвращает результат **первого успешно завершившегося** промиса. Отклоняется только если все промисы отклонены.

**Синтаксис:**

```javascript
Promise.any([promise1, promise2])
  .then((result) => {
    // Результат первого успешного промиса
  })
  .catch((error) => {
    // Все промисы отклонены
    // error.errors содержит массив всех ошибок
  })
```

**Пример:**

```javascript
// Пробуем загрузить с разных CDN
const data = await Promise.any([
  fetch('https://cdn1.example.com/data.json'),
  fetch('https://cdn2.example.com/data.json'),
  fetch('https://cdn3.example.com/data.json')
])
```

**Характеристики:**

- Возвращает результат первого успешного промиса
- Игнорирует ошибки до первого успеха
- Отклоняется только если все промисы отклонены
- В ошибке доступен массив всех ошибок через `error.errors`

**Используется для:**

- fallback стратегий
- загрузки с нескольких источников
- когда нужен хотя бы один успешный результат

**Пример использования:**

```javascript
// Загрузка с основного сервера или fallback
const data = await Promise.any([
  fetch('/api/data'),
  fetch('/api/fallback/data')
]).catch(error => {
  // Оба сервера недоступны
  return getCachedData()
})
```

---

## 28.5. Сравнение комбинаторов

| Комбинатор | Успех | Ошибка | Когда использовать |
|-----------|-------|--------|-------------------|
| `Promise.all` | Все успешны | Первая ошибка отклоняет все | Все операции обязательны |
| `Promise.allSettled` | Всегда возвращает результаты | Никогда не отклоняется | Нужны все результаты, даже с ошибками |
| `Promise.race` | Первый завершившийся | Первая ошибка | Таймауты, конкурентные запросы |
| `Promise.any` | Первый успешный | Все отклонены | Fallback стратегии |

---

## 28.6. Практические примеры

### Загрузка данных для страницы

```javascript
// Все данные обязательны
const [user, posts, settings] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchSettings()
])
```

### Агрегация метрик

```javascript
// Некоторые метрики могут упасть, но нужны все результаты
const metrics = await Promise.allSettled([
  getPageViews(),
  getUniqueVisitors(),
  getBounceRate()
])

const report = metrics.map(m => 
  m.status === 'fulfilled' ? m.value : null
)
```

### Таймаут для операции

```javascript
async function fetchWithTimeout(url, ms) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), ms)
  
  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}
```

### Fallback стратегия

```javascript
// Пробуем загрузить с основного, затем с резервного
const data = await Promise.any([
  fetch('/api/primary'),
  fetch('/api/fallback')
]).catch(() => {
  // Оба упали, используем кэш
  return getCachedData()
})
```

---

## 28.7. Комбинирование комбинаторов

```javascript
// Загружаем пользователей параллельно
const users = await Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3)
])

// Для каждого пользователя загружаем посты (тоже параллельно)
const postsByUser = await Promise.all(
  users.map(user => fetchPosts(user.id))
)

// Или с таймаутом для каждого запроса
const usersWithTimeout = await Promise.all(
  userIds.map(id => 
    Promise.race([
      fetchUser(id),
      timeout(5000)
    ])
  )
)
```

---

## Вопросы на собеседовании

### 1. В чём разница между Promise.all и Promise.allSettled?

`Promise.all` отклоняется при первой ошибке. `Promise.allSettled` всегда возвращает все результаты, независимо от успеха или ошибки.

### 2. Когда использовать Promise.race?

Для таймаутов, конкурентных запросов, когда нужен результат первого завершившегося промиса.

### 3. В чём разница между Promise.race и Promise.any?

`Promise.race` возвращает результат первого завершившегося (успех или ошибка). `Promise.any` возвращает результат первого успешного, отклоняется только если все отклонены.

### 4. Что произойдёт, если один промис в Promise.all упадёт?

Весь `Promise.all` будет отклонён с этой ошибкой. Остальные промисы продолжат выполняться, но их результаты игнорируются.

### 5. Как реализовать таймаут для промиса?

Использовать `Promise.race` с промисом, который отклоняется через заданное время.

### 6. Когда использовать Promise.allSettled?

Когда нужны все результаты, даже если некоторые операции упали (логирование, метрики, агрегация данных).

---

## Key Takeaways

- `Promise.all` — все обязательны, первая ошибка отклоняет все
- `Promise.allSettled` — все результаты, даже с ошибками
- `Promise.race` — первый завершившийся (успех или ошибка)
- `Promise.any` — первый успешный, отклоняется только если все отклонены
- Выбор комбинатора зависит от требований к обработке ошибок
- Комбинаторы можно комбинировать для сложных сценариев

