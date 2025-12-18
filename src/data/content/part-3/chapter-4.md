# Глава 11. Асинхронность, Event Loop и промисы без мистики

Асинхронность — одна из самых болезненных тем на практике и на собеседованиях. Большинство «магических» багов в фронтенде возникает не из‑за синтаксиса, а из‑за непонимания **порядка выполнения кода**.

В этой главе разберём:

- как на самом деле работает Event Loop в браузере и Node.js;
- чем отличаются macrotask и microtask очереди;
- как устроены промисы и `async/await` под капотом;
- как правильно обрабатывать ошибки в асинхронном коде;
- типичные ловушки (race conditions, «забытый return», смешивание then/await).

---

## 11.1. Event Loop: как однопоточный JS становится неблокирующим

JavaScript выполняет код **в одном потоке**, но при этом не блокирует интерфейс при сетевых запросах, таймерах и т.д. Это достигается за счёт разделения:

- **Call Stack** — стек вызовов функций;
- **Web APIs** (в браузере) / системные API (в Node.js);
- **очередей задач**: macrotask и microtask;
- **Event Loop**, который координирует всё это.

### Общая схема

1. Выполняется синхронный код — функции попадают в Call Stack и отрабатывают до конца.
2. Асинхронные операции (таймеры, `fetch`, события) передаются во внешние API.
3. Когда операция завершена, её коллбек ставится в одну из очередей (macrotask или microtask).
4. Event Loop берёт задачи из очередей **только когда стек пуст**, и отправляет их на выполнение.

### Macrotasks и microtasks

Примеры **macrotasks**:

- `setTimeout`, `setInterval`;
- I/O операции;
- события UI (клики, скролл и т.п.).

Примеры **microtasks**:

- `Promise.then`, `catch`, `finally`;
- `queueMicrotask`;
- `MutationObserver`.

**Критически важное правило:**

> После выполнения синхронного кода **сначала** выполняются все microtasks, и только потом — следующая macrotask.

### Пример: порядок логов

```javascript
console.log(1)

setTimeout(() => console.log(2), 0)

Promise.resolve().then(() => console.log(3))

console.log(4)
```

Порядок вывода: `1, 4, 3, 2`.

- `1` и `4` — синхронный код;
- `Promise.then` — microtask → будет выполнен сразу после синхронного кода;
- `setTimeout` — macrotask → пойдёт после всех microtasks.

Последовательность фаз:

1. синхронный код (1, 4);
2. все microtasks (3);
3. первая macrotask (2);
4. снова все microtasks, образовавшиеся во время этой macrotask;
5. следующая macrotask и т.д.

### Различия браузера и Node.js (для собеседований)

В браузере:

- microtasks выполняются после каждой macrotask;
- `Promise.then` и `queueMicrotask` на одной ступени приоритета.

В Node.js (упрощённо):

- есть несколько фаз Event Loop (timers, poll, check и т.д.);
- `process.nextTick` выполняется **раньше** microtasks промисов;
- детали важны, если вы пишете низкоуровневый Node‑код или библиотеки.

Для фронтенда достаточно понимать общую идею о приоритетах microtask → macrotask.

---

## 11.2. Промисы: состояния и цепочки

**Promise** — это объект, который представляет результат асинхронной операции.

Состояния промиса:

- `pending` — ожидание результата;
- `fulfilled` — успешно завершён;
- `rejected` — завершён с ошибкой.

### Создание промиса

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

Важно: переход из `pending` в `fulfilled` или `rejected` происходит **один раз и навсегда**.

### then / catch / finally

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
  })
  .catch((error) => {
    console.error('Request failed', error)
  })
  .finally(() => {
    console.log('Request finished')
  })
```

Каждый `then` **возвращает новый промис**, что позволяет строить цепочки.

Типичная ошибка:

```javascript
// забыли return
.then((res) => {
  res.json() // промис создан, но не возвращён
})
.then((data) => {
  // data === undefined
})
```

Нужно **обязательно возвращать** промис или значение из `then`, если планируешь пользоваться результатом дальше.

---

## 11.3. Комбинаторы промисов: all, allSettled, race

### Promise.all

Ждёт, пока **все** промисы выполнятся успешно, или падает при первой ошибке:

```javascript
Promise.all([p1, p2, p3])
  .then(([r1, r2, r3]) => {
    // все три успешны
  })
  .catch((error) => {
    // хотя бы один отклонён
  })
```

Используется, когда:

- все операции обязательны;
- без любого из результатов продолжать нельзя.

### Promise.allSettled

Всегда дожидается завершения **всех** промисов, независимо от успеха или ошибки:

```javascript
Promise.allSettled([p1, p2]).then((results) => {
  // results: [{ status: 'fulfilled' | 'rejected', value | reason }]
})
```

Подходит для:

- агрегации результатов, где часть может упасть (логирование, метрики, параллельные запросы на разные сервисы).

### Promise.race

Возвращает результат **первого завершившегося** промиса (успех или ошибка):

```javascript
Promise.race([slow, fast]).then((result) => {
  // результат того, кто завершился первым
})
```

Используется для реализации таймаутов и конкурентных запросов.

---

## 11.4. `async / await`: синтаксический сахар над промисами

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

Особенности `async`‑функций:

- всегда возвращают **промис**;
- любое выброшенное исключение превращается в `rejected`‑состояние промиса;
- `await` останавливает функцию до завершения промиса (не блокируя поток в целом).

### Обработка ошибок с async / await

```javascript
async function safeLoad(url) {
  try {
    const data = await loadData(url)
    return data
  } catch (error) {
    console.error('Failed to load', error)
    throw error // пробрасываем дальше, если нужно
  }
}
```

### Параллельное vs последовательное выполнение

Плохо, если запросы независимы:

```javascript
const a = await fetch(url1)
const b = await fetch(url2)
```

Лучше запускать параллельно:

```javascript
const [a, b] = await Promise.all([fetch(url1), fetch(url2)])
```

Такой паттерн часто проверяют на собеседованиях.

---

## 11.5. Web APIs: таймеры, fetch, Web Workers, Streams

### Таймеры: `setTimeout` и `setInterval`

```javascript
setTimeout(() => {
  console.log('timeout')
}, 0)

Promise.resolve().then(() => console.log('promise'))
// вывод: 'promise', потом 'timeout'
```

Даже с задержкой `0` таймер попадает в очередь macrotasks, а `Promise.then` — в очередь microtasks.

`setInterval` повторяет вызов функции через заданный интервал:

```javascript
const id = setInterval(() => {
  console.log('tick')
}, 1000)

clearInterval(id)
```

### Fetch API

```javascript
fetch('/api')
  .then((res) => {
    if (!res.ok) {
      throw new Error('HTTP error')
    }
    return res.json()
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
```

Важно: `fetch` **не отклоняет промис при HTTP‑ошибках (4xx, 5xx)** — только при сетевых проблемах. Статус нужно проверять вручную.

### Web Workers

Нужны для запуска тяжёлых вычислений в отдельном потоке, чтобы не блокировать UI.

```javascript
const worker = new Worker('worker.js')

worker.postMessage({ task: 'calculate', payload: 42 })

worker.onmessage = (event) => {
  console.log('Result:', event.data)
}
```

Ограничения воркеров:

- нет доступа к DOM;
- нет доступа к `window`;
- общение только через `postMessage`.

### Streams API (в общих чертах)

Для по‑частной обработки больших объёмов данных:

```javascript
const response = await fetch('/big-file')
const reader = response.body?.getReader()

if (!reader) return

while (true) {
  const { done, value } = await reader.read()
  if (done) break

  // обрабатываем chunk в value
}
```

Это экономит память и уменьшает задержку ответа.

---

## 11.6. Обработка ошибок и типичные ловушки

### Ошибки в промисах

```javascript
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // ...
  })
  .catch((error) => {
    console.error('Request failed', error)
  })
```

Если в любом `then` произойдёт исключение, оно тоже попадёт в ближайший `catch` в цепочке.

### Ошибки в async / await

```javascript
async function load(url) {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch (error) {
    console.error('Failed', error)
    throw error
  }
}
```

### Глобальная обработка необработанных отклонений

```javascript
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})
```

Это последний рубеж, не замена нормальной обработки ошибок.

### Гонки состояний (race conditions)

Проблема возникает, когда несколько асинхронных операций меняют общее состояние.

```javascript
let counter = 0

async function increment() {
  const current = counter
  await delay(100)
  counter = current + 1
}

increment()
increment()
// теоретически counter может стать 1 вместо 2
```

Решения:

- сериализовать операции (ждать завершения предыдущей);
- использовать атомарные операции на сервере;
- в React — учитывать актуальное состояние через функции обновления (`setState((prev) => prev + 1)`).

---

## 11.7. Мини‑самопроверка по асинхронности

Проверь, что ты можешь:

- на словах и на примере объяснить, как Event Loop обрабатывает смесь синхронного кода, `setTimeout` и `Promise.then`, и предсказать порядок логов;
- объяснить разницу между macrotask и microtask и привести примеры API, которые туда попадают;
- переписать цепочку `.then().catch().finally()` в `async/await` (и наоборот), **не потеряв обработку ошибок**;
- выбрать между `Promise.all`, `Promise.allSettled` и `Promise.race` в реальных сценариях (загрузка нескольких ресурсов, агрегация метрик, таймаут запроса);
- заметить потенциальную race condition в асинхронном коде и предложить способ её устранения.

Если это получается — твой уровень понимания асинхронности уже соответствует ожиданиям сильного middle‑фронтендера, и можно уверенно двигаться к более прикладным темам (инфраструктура, архитектура, React / фреймворки).
