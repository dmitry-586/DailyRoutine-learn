# Глава 26. Event Loop

Event Loop нужен, чтобы понять **порядок выполнения**: почему "таймер с 0ms" не срабатывает сразу и почему промисы часто "обгоняют" `setTimeout`.

---

## 26.1. Три вещи, которые достаточно знать

1. **Call Stack** — выполняется синхронный код (строка за строкой).
2. **Очереди задач** — туда попадают коллбеки, которые надо выполнить позже.
3. **Event Loop** — запускает задачи из очередей, когда стек пуст.

---

## 26.2. Microtasks vs Macrotasks (практический минимум)

### Macrotasks (очередь "обычных задач")

Примеры:

- `setTimeout`, `setInterval`
- события (клик, input и т.п.)

### Microtasks (очередь "сразу после текущего кода")

Примеры:

- `Promise.then/catch/finally`
- `queueMicrotask`
- `MutationObserver`

### Главное правило

> После завершения текущего синхронного кода движок **сначала выполняет все microtasks**, и только потом берёт следующую macrotask.

---

## 26.3. Понятная визуализация

```
Синхронный код выполняется в Call Stack
          │
          ▼ (когда стек пуст)
   выполняем ВСЕ microtasks
          │
          ▼
   выполняем ОДНУ macrotask
          │
          └── повторяем цикл
```

Запоминалка: **stack → microtasks (все) → macrotask (одна) → microtasks (все) → ...**

---

## 26.4. Примеры (2 штуки, чтобы стало ясно)

### Пример 1: Promise "обгоняет" setTimeout

```javascript
console.log(1)

setTimeout(() => console.log(2), 0)

Promise.resolve().then(() => console.log(3))

console.log(4)
```

Порядок: `1, 4, 3, 2`

Почему:

- `1` и `4` — синхронно
- `then` — microtask → выполнится раньше
- `setTimeout` — macrotask → после microtasks

### Пример 2: microtask внутри macrotask

```javascript
console.log(1)

setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => console.log(3))
}, 0)

console.log(4)
```

Порядок: `1, 4, 2, 3`

Почему:

- сначала синхронно `1, 4`
- потом macrotask (таймер) печатает `2`
- и только затем microtask из `then` печатает `3`

---

## Вопросы на собеседовании

### 1. Что такое Event Loop?

Механизм, который запускает отложенные задачи (из очередей) **когда Call Stack пуст**.

### 2. Чем microtask отличается от macrotask?

Microtasks выполняются **раньше**: после синхронного кода сначала выполняются **все microtasks**, и только потом — следующая macrotask.

### 3. Почему `setTimeout(fn, 0)` не "сразу"?

Потому что это macrotask: она выполнится только когда завершится текущий синхронный код и будут выполнены microtasks.
