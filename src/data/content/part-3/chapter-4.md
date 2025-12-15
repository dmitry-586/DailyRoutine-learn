# Глава 11. Асинхронность

Асинхронность — одна из самых критичных тем для фронтенд-разработчика. Большинство реальных багов связано не с синтаксисом, а с непониманием порядка выполнения кода.

На собеседованиях почти всегда:

- просят объяснить Event Loop
- дают код «угадай вывод»
- спрашивают про промисы и async/await

Эта глава объясняет:

1. Event Loop и модель выполнения
2. Промисы
3. async/await
4. Web APIs
5. Обработка ошибок
6. Частые ошибки и паттерны

---

## 11.1. Event Loop: как выполняется JavaScript

JavaScript — однопоточный, но не блокирующий. Это возможно благодаря Event Loop.

### Основные сущности

1. Call Stack — стек вызовов функций
2. Web APIs — браузерные API (setTimeout, fetch, DOM и т.д.)
3. Task Queue (macrotasks) — очередь макрозадач
4. Microtask Queue — очередь микрозадач
5. Event Loop — механизм, переносящий задачи из очередей в стек

### Схема выполнения

1. Выполняется синхронный код (попадает в Call Stack)
2. Асинхронные операции уходят в Web APIs
3. Callback попадает в очередь (macrotask или microtask)
4. Event Loop переносит задачи в Call Stack (когда стек пуст)

### Macrotasks

- setTimeout
- setInterval
- setImmediate
- UI events (клики, скролл)
- I/O операции

### Microtasks

- Promise.then
- Promise.catch
- Promise.finally
- queueMicrotask
- MutationObserver

⚠️ Важно: Microtasks выполняются до следующей macrotask.

### Пример

```javascript
console.log(1)

setTimeout(() => console.log(2), 0)

Promise.resolve().then(() => console.log(3))

console.log(4)
```

**Вывод:** 1 4 3 2

**Почему?**

1. Синхронный код: 1, 4
2. Promise.then — microtask, выполняется сразу после синхронного кода
3. setTimeout — macrotask, выполняется после всех microtasks

**Порядок выполнения:**

1. Синхронный код
2. Все microtasks
3. Одна macrotask
4. Снова все microtasks
5. Следующая macrotask
6. И так далее

### Различия Event Loop в браузере и Node.js

**Браузер:**

- Microtasks выполняются после каждой macrotask
- Promise.then и queueMicrotask имеют одинаковый приоритет
- Web APIs обрабатываются браузером

**Node.js:**

- process.nextTick имеет приоритет над Promise.then
- Microtasks выполняются между фазами Event Loop
- Фазы: timers → pending callbacks → idle/prepare → poll → check → close callbacks
- libuv обрабатывает I/O операции

Важно: В Node.js process.nextTick выполняется раньше Promise.then, что может влиять на порядок выполнения асинхронного кода.

---

## 11.2. Промисы

Promise — объект, представляющий результат асинхронной операции.

### Состояния

- pending — ожидание
- fulfilled — успешно выполнено
- rejected — отклонено

### Создание

```javascript
const p = new Promise((resolve, reject) => {
  // асинхронная операция
  if (success) {
    resolve(data)
  } else {
    reject(error)
  }
})
```

### Цепочки

```javascript
fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => console.log('done'))
```

**Почему then возвращает Promise?**

Это позволяет строить цепочки. Каждый then возвращает новый Promise.

### Promise.all

Ожидает выполнения всех промисов:

```javascript
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    // все промисы выполнены
  })
  .catch((err) => {
    // хотя бы один отклонён
  })
```

### Promise.allSettled

Ждёт завершения всех, независимо от результата:

```javascript
Promise.allSettled([promise1, promise2]).then((results) => {
  // все завершены, есть статус каждого
})
```

### Promise.race

Возвращает результат первого завершившегося:

```javascript
Promise.race([fastPromise, slowPromise]).then((result) => {
  // результат первого
})
```

---

## 11.3. async / await

Синтаксический сахар над промисами. Делает асинхронный код похожим на синхронный.

```javascript
async function load() {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (e) {
    console.error(e)
  }
}
```

**Что происходит под капотом?**

- функция всегда возвращает Promise
- await ставит выполнение «на паузу»
- фактически создаётся цепочка then
- ошибки обрабатываются через try/catch

### Ошибка новичков

```javascript
await fetch(url)
await fetch(url2)
```

Если запросы независимы — лучше:

```javascript
await Promise.all([fetch(url), fetch(url2)])
```

Параллельное выполнение независимых операций ускоряет код.

---

## 11.4. Web APIs

### Timers

```javascript
setTimeout(fn, 0)
```

Не означает «выполнится сразу». Минимальная задержка — 4ms (в браузере).

```javascript
setTimeout(() => console.log('timeout'), 0)
Promise.resolve().then(() => console.log('promise'))
// promise выполнится раньше
```

### setInterval

Повторяет выполнение функции:

```javascript
const interval = setInterval(() => {
  console.log('tick')
}, 1000)

clearInterval(interval) // остановка
```

### fetch

Современный API для HTTP-запросов:

```javascript
fetch('/api').then((r) => r.json())
```

⚠️ Важно: Fetch не отклоняет промис при 4xx/5xx. Нужно проверять r.ok:

```javascript
fetch('/api').then((r) => {
  if (!r.ok) throw new Error('HTTP error')
  return r.json()
})
```

### Web Workers

Запускают код в отдельном потоке. Используются для тяжёлых вычислений.

```javascript
const worker = new Worker('worker.js')

worker.postMessage(data)
worker.onmessage = (e) => {
  console.log(e.data)
}
```

**Ограничения:**

- нет доступа к DOM
- нет доступа к window
- общение только через postMessage

### Streams API

Используется для работы с потоками данных.

```javascript
const reader = response.body.getReader()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  // обработка value
}
```

Позволяет:

- обрабатывать большие файлы
- стримить видео
- экономить память

---

## 11.5. Обработка ошибок

### В промисах

```javascript
fetch(url)
  .then((data) => {
    // обработка
  })
  .catch((err) => {
    // обработка ошибки
  })
```

### В async/await

```javascript
async function load() {
  try {
    const data = await fetch(url)
    return data
  } catch (err) {
    console.error(err)
    throw err // пробрасываем дальше
  }
}
```

### Глобальная обработка

```javascript
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})
```

### Частые ошибки в асинхронности

- забыли return в then
- не обработали ошибку
- смешали await и then
- гонки состояний (race conditions)
- параллельное выполнение независимых операций через await

**Пример гонки состояний:**

```javascript
let counter = 0

async function increment() {
  const current = counter
  await delay(100)
  counter = current + 1
}

increment()
increment()
// counter может быть 1 вместо 2
```

Решение: использовать атомарные операции или блокировки.

---

## Вопросы на собеседовании

### 1. Как работает Event Loop?

Однопоточный механизм выполнения: синхронный код → microtasks → одна macrotask → снова microtasks → следующая macrotask.

### 2. Разница между macrotask и microtask?

Macrotasks — setTimeout, UI events. Microtasks — Promise.then, queueMicrotask. Microtasks выполняются до следующей macrotask.

### 3. Почему Promise.then выполняется раньше setTimeout?

Promise.then — microtask, setTimeout — macrotask. Microtasks имеют приоритет.

### 4. Что возвращает async-функция?

Всегда Promise. Даже если функция возвращает обычное значение, оно оборачивается в Promise.

### 5. Как правильно обрабатывать ошибки в async/await?

Через try/catch блок или .catch() на возвращаемом Promise.

### 6. Когда использовать Promise.all?

Когда нужно дождаться выполнения всех промисов. Все должны быть успешными.

### 7. Почему fetch не падает на 404?

Fetch отклоняет промис только при сетевых ошибках. HTTP-ошибки (4xx, 5xx) нужно проверять через r.ok.

### 8. Зачем нужны Web Workers?

Для тяжёлых вычислений в отдельном потоке, чтобы не блокировать основной поток и UI.

### 9. Что такое race condition?

Ситуация, когда результат зависит от порядка выполнения асинхронных операций.

### 10. Как избежать race conditions?

Использовать атомарные операции, блокировки, или правильную последовательность await.

---

## Key Takeaways

- Event Loop управляет порядком выполнения асинхронного кода
- Microtasks выполняются до следующей macrotask
- Промисы — основа современной асинхронности в JS
- async/await делает код читаемее, но под капотом — промисы
- Promise.all для параллельного выполнения независимых операций
- Fetch не отклоняет промис при HTTP-ошибках — нужно проверять r.ok
- Web Workers для тяжёлых вычислений в отдельном потоке
- Обработка ошибок обязательна в асинхронном коде
- Race conditions — частая проблема в асинхронном коде

---

## 11.6. Самопроверка

Если ты можешь:

- объяснить на доске, как Event Loop обрабатывает сочетание `setTimeout`, `Promise` и синхронного кода, и предсказать порядок логов;
- уверенно различать, когда использовать `Promise.all`, `Promise.allSettled` и `Promise.race` в реальных сценариях;
- переписать цепочку `.then().catch()` в `async/await` (и обратно), не теряя обработку ошибок и финализацию (`finally`);
- заметить потенциальную гонку состояний в асинхронном коде (например, при обновлении общего счётчика или состояния React) и предложить безопасное решение;
- объяснить, почему fetch не кидает исключение на 404/500 и как правильно обработать такие ошибки,

то твой уровень понимания асинхронности уже соответствует ожиданиям сильного Middle‑фронтендера.

---

Следующий блок будет уже не про сам язык, а про окружение, в котором он живёт: мы разберём инструменты инфраструктуры — npm, сборщики, тестирование — без которых невозможно поддерживать серьёзные фронтенд‑проекты в продакшене.
