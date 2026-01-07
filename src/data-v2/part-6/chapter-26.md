# Глава 26. Event Loop: модель выполнения, microtasks и macrotasks

Асинхронность — одна из самых болезненных тем на практике и на собеседованиях. Большинство «магических» багов в фронтенде возникает не из‑за синтаксиса, а из‑за непонимания **порядка выполнения кода**.

Понимание Event Loop критично для написания правильного асинхронного кода и отладки проблем с производительностью.

---

## 26.1. Как однопоточный JS становится неблокирующим

JavaScript выполняет код **в одном потоке**, но при этом не блокирует интерфейс при сетевых запросах, таймерах и т.д. Это достигается за счёт разделения:

- **Call Stack** — стек вызовов функций
- **Web APIs** (в браузере) / системные API (в Node.js)
- **очередей задач**: macrotask и microtask
- **Event Loop**, который координирует всё это

### Общая схема

1. Выполняется синхронный код — функции попадают в Call Stack и отрабатывают до конца
2. Асинхронные операции (таймеры, `fetch`, события) передаются во внешние API
3. Когда операция завершена, её коллбек ставится в одну из очередей (macrotask или microtask)
4. Event Loop берёт задачи из очередей **только когда стек пуст**, и отправляет их на выполнение

---

## 26.2. Macrotasks и microtasks

### Macrotasks

Примеры **macrotasks**:

- `setTimeout`, `setInterval`
- I/O операции
- события UI (клики, скролл и т.п.)
- `setImmediate` (Node.js)

### Microtasks

Примеры **microtasks**:

- `Promise.then`, `catch`, `finally`
- `queueMicrotask`
- `MutationObserver`

**Критически важное правило:**

> После выполнения синхронного кода **сначала** выполняются все microtasks, и только потом — следующая macrotask.

---

## 26.3. Порядок выполнения: примеры

### Пример 1: базовый порядок

```javascript
console.log(1)

setTimeout(() => console.log(2), 0)

Promise.resolve().then(() => console.log(3))

console.log(4)
```

**Порядок вывода:** `1, 4, 3, 2`

**Объяснение:**

- `1` и `4` — синхронный код
- `Promise.then` — microtask → будет выполнен сразу после синхронного кода
- `setTimeout` — macrotask → пойдёт после всех microtasks

**Последовательность фаз:**

1. синхронный код (1, 4)
2. все microtasks (3)
3. первая macrotask (2)
4. снова все microtasks, образовавшиеся во время этой macrotask
5. следующая macrotask и т.д.

### Пример 2: вложенные microtasks

```javascript
console.log(1)

Promise.resolve().then(() => {
  console.log(2)
  Promise.resolve().then(() => console.log(3))
})

setTimeout(() => console.log(4), 0)

console.log(5)
```

**Порядок вывода:** `1, 5, 2, 3, 4`

**Объяснение:**

1. Синхронный код: 1, 5
2. Все microtasks: 2, 3 (вложенный Promise тоже microtask)
3. Macrotask: 4

### Пример 3: microtasks внутри macrotask

```javascript
console.log(1)

setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => console.log(3))
}, 0)

Promise.resolve().then(() => console.log(4))

console.log(5)
```

**Порядок вывода:** `1, 5, 4, 2, 3`

**Объяснение:**

1. Синхронный код: 1, 5
2. Microtasks: 4
3. Macrotask (setTimeout): 2
4. Microtasks, созданные внутри macrotask: 3

---

## 26.4. Различия браузера и Node.js

### В браузере

- microtasks выполняются после каждой macrotask
- `Promise.then` и `queueMicrotask` на одной ступени приоритета
- `MutationObserver` тоже microtask

### В Node.js (упрощённо)

- есть несколько фаз Event Loop (timers, poll, check и т.д.)
- `process.nextTick` выполняется **раньше** microtasks промисов
- детали важны, если вы пишете низкоуровневый Node‑код или библиотеки

**Фазы Event Loop в Node.js:**

1. **Timers** — `setTimeout`, `setInterval`
2. **Pending callbacks** — отложенные коллбеки
3. **Idle, prepare** — внутренние операции
4. **Poll** — получение новых I/O событий
5. **Check** — `setImmediate` коллбеки
6. **Close callbacks** — закрытие соединений

Для фронтенда достаточно понимать общую идею о приоритетах microtask → macrotask.

---

## 26.5. queueMicrotask

Явное добавление задачи в очередь microtasks:

```javascript
console.log(1)

queueMicrotask(() => {
  console.log(2)
})

Promise.resolve().then(() => console.log(3))

console.log(4)
```

**Порядок вывода:** `1, 4, 2, 3` (или `1, 4, 3, 2` — порядок между queueMicrotask и Promise.then может варьироваться)

**Использование:**

```javascript
function processData(data) {
  // Синхронная обработка
  const processed = data.map(transform)
  
  // Асинхронное обновление UI
  queueMicrotask(() => {
    updateUI(processed)
  })
}
```

---

## 26.6. Блокирующий код и Event Loop

**Проблема:**

```javascript
console.log(1)

setTimeout(() => console.log(2), 0)

// Блокирующий код
for (let i = 0; i < 1000000000; i++) {
  // Долгие вычисления
}

console.log(3)
```

**Порядок вывода:** `1, 3, 2`

**Почему?**

Блокирующий код выполняется синхронно и не даёт Event Loop обработать задачи из очередей. Таймеры и другие асинхронные операции будут ждать, пока стек не освободится.

**Решение:**

Используйте Web Workers для тяжёлых вычислений или разбивайте работу на части:

```javascript
function processChunk(data, index) {
  // Обработка части данных
  const chunk = data.slice(index, index + 1000)
  process(chunk)
  
  if (index + 1000 < data.length) {
    // Планируем следующую часть
    setTimeout(() => processChunk(data, index + 1000), 0)
  }
}
```

---

## 26.7. Визуализация Event Loop

**Упрощённая модель:**

```
┌─────────────────┐
│   Call Stack    │ ← Синхронный код
└─────────────────┘
        │
        ↓ (когда стек пуст)
┌─────────────────┐
│  Microtask Queue│ ← Promise.then, queueMicrotask
└─────────────────┘
        │
        ↓ (все microtasks выполнены)
┌─────────────────┐
│  Macrotask Queue│ ← setTimeout, события
└─────────────────┘
```

**Цикл:**

1. Выполнить весь синхронный код из стека
2. Выполнить все microtasks
3. Выполнить одну macrotask
4. Вернуться к шагу 2

---

## 26.8. Практические последствия

### UI блокируется при долгих операциях

```javascript
// ❌ Плохо
function processLargeData(data) {
  // Блокирует UI
  return data.map(heavyTransform)
}

// ✅ Хорошо
async function processLargeData(data) {
  const chunks = chunkArray(data, 1000)
  
  for (const chunk of chunks) {
    await new Promise(resolve => {
      queueMicrotask(() => {
        process(chunk)
        resolve()
      })
    })
  }
}
```

### Порядок обновлений в React

```javascript
// React использует microtasks для батчинга обновлений
setState(1)
setState(2)
setState(3)
// Все три обновления батчатся и применяются вместе
```

---

## Вопросы на собеседовании

### 1. Как работает Event Loop?

Event Loop координирует выполнение кода: сначала синхронный код, затем все microtasks, затем одна macrotask, и так по кругу.

### 2. В чём разница между macrotask и microtask?

Macrotasks — setTimeout, события. Microtasks — Promise.then, queueMicrotask. Microtasks выполняются раньше macrotasks.

### 3. Что выведет этот код?

```javascript
console.log(1)
setTimeout(() => console.log(2), 0)
Promise.resolve().then(() => console.log(3))
console.log(4)
```

`1, 4, 3, 2` — синхронный код, затем microtasks, затем macrotasks.

### 4. Почему блокирующий код задерживает таймеры?

Блокирующий код выполняется синхронно и не даёт Event Loop обработать задачи из очередей. Таймеры ждут, пока стек не освободится.

### 5. Что такое queueMicrotask?

API для явного добавления задачи в очередь microtasks. Полезно для планирования асинхронных операций с высоким приоритетом.

### 6. В чём разница между браузером и Node.js в Event Loop?

В Node.js есть несколько фаз Event Loop, `process.nextTick` выполняется раньше microtasks промисов. В браузере проще: microtasks → macrotasks.

---

## Key Takeaways

- JavaScript однопоточный, но неблокирующий благодаря Event Loop
- Порядок выполнения: синхронный код → все microtasks → одна macrotask → повтор
- Microtasks имеют приоритет над macrotasks
- Блокирующий код задерживает обработку асинхронных операций
- Понимание Event Loop критично для отладки асинхронного кода
- queueMicrotask позволяет явно планировать microtasks

