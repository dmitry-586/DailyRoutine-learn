# Глава 27. Promise и async/await

Цель этой главы — понимать промисы на уровне **типовых задач и вопросов на собеседовании**. Без углубления в “как это реализовано внутри движка”.

---

## 27.1. Что такое Promise

**Promise** — это объект, который представляет результат операции “когда-нибудь потом”.

У промиса есть 3 состояния:

- `pending` — ещё ждём
- `fulfilled` — успешно (есть значение)
- `rejected` — ошибка (есть причина/ошибка)

Важно:

- промис переходит из `pending` в `fulfilled/rejected` **один раз** и дальше не меняется

---

## 27.2. then / catch / finally (главное)

### then

`then` — обработчик успешного результата.

```javascript
fetch('/api/user')
  .then((res) => res.json())
  .then((user) => {
    console.log(user)
  })
```

Важно:

- `then` возвращает **новый промис**, поэтому можно строить цепочки

### catch

`catch` — обработчик ошибки (по сути это `then(null, handler)`):

```javascript
fetch('/api/user')
  .then((res) => res.json())
  .catch((err) => {
    console.error('Ошибка запроса', err)
  })
```

### finally

`finally` выполняется всегда (успех/ошибка), не получает результат:

```javascript
doSomething()
  .finally(() => {
    console.log('cleanup')
  })
```

---

## 27.3. 3 частые ошибки (то, что реально ломает код)

### Ошибка 1: забыли `return` в `then`

```javascript
fetch('/api/user')
  .then((res) => {
    res.json() // промис не возвращён
  })
  .then((data) => {
    console.log(data) // undefined
  })
```

Правильно:

```javascript
fetch('/api/user')
  .then((res) => res.json())
  .then((data) => console.log(data))
```

### Ошибка 2: смешали `then` и `await` в одной функции

Лучше выбрать один стиль в конкретной функции: либо цепочки `then`, либо `async/await`.

### Ошибка 3: забыли обработать ошибку

Если не обработать ошибку — получите `UnhandledPromiseRejection` (или событие `unhandledrejection` в браузере).

---

## 27.4. async/await (как это понимать)

`async/await` — это более читаемый способ работать с промисами.

Факты:

- `async`‑функция **всегда возвращает Promise**
- `return value` → промис “успешный” со значением `value`
- `throw error` → промис “ошибка”

Пример:

```javascript
async function loadUser() {
  const res = await fetch('/api/user')
  if (!res.ok) throw new Error('HTTP error')
  return await res.json()
}
```

Обработка ошибки:

```javascript
async function safeLoadUser() {
  try {
    return await loadUser()
  } catch (e) {
    console.error(e)
    return null
  }
}
```

---

## 27.5. Параллельно vs последовательно (типовой вопрос)

Если запросы независимы — делайте параллельно через `Promise.all`:

```javascript
const [a, b] = await Promise.all([fetch('/a'), fetch('/b')])
```

Если второй зависит от первого — делайте последовательно:

```javascript
const a = await fetch('/a')
const b = await fetch(`/b?from=${a.id}`)
```

---

## Вопросы на собеседовании

### 1. Что такое Promise?

Объект-обёртка над будущим результатом (успех или ошибка).

### 2. `then` vs `await`?

`await` — синтаксис поверх промисов, делает код линейным. `then` — цепочки коллбеков. По смыслу одно и то же.

### 3. Как обработать ошибку?

`catch` для цепочек или `try/catch` для `async/await`.

### 4. Как выполнить несколько промисов параллельно?

`Promise.all`.

