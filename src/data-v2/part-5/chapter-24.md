# Глава 24. Модули: ESM и CommonJS

Модуль — это файл, который **явно экспортирует** то, что отдаёт наружу, и **явно импортирует** то, что берёт снаружи.
В 2026 году в фронтенде стандарт — **ES Modules (ESM)**.

---

## 24.1. Зачем нужны модули

- **Изоляция**: переменные не «утекают» в глобальную область.
- **Переиспользование**: один модуль — много мест использования.
- **Понятные зависимости**: видно, что откуда берётся.
- **Бандл оптимизации**: ESM позволяет tree-shaking (удаление неиспользуемого кода).

---

## 24.2. ESM (ES Modules) — основной вариант

### Именованные экспорты (named export)

```javascript
// math.js
export const sum = (a, b) => a + b
export const multiply = (a, b) => a * b
```

Импорт:

```javascript
import { sum, multiply } from './math.js'
import { sum as add } from './math.js'
```

### Экспорт по умолчанию (default export)

```javascript
// User.js
export default class User {
  constructor(name) {
    this.name = name
  }
}
```

Импорт:

```javascript
import User from './User.js'
```

### Динамический импорт (ленивая загрузка)

Нужен, когда модуль тяжёлый или нужен не всегда.

```javascript
const mod = await import('./heavy.js')
mod.run()
```

---

## 24.3. CommonJS (CJS) — исторический формат (встречается в Node/старом коде)

Экспорт:

```javascript
// math.cjs
module.exports = {
  sum(a, b) {
    return a + b
  },
}
```

Импорт:

```javascript
const math = require('./math.cjs')
math.sum(1, 2)
```

Главные минусы CJS для фронтенда:

- `require` выполняется **во время выполнения** (хуже анализируется сборщиками)
- **нет нормального tree-shaking**

---

## 24.4. Что выбрать на практике

- **Фронтенд / Next.js**: почти всегда **ESM**.
- **CommonJS**: только если вынуждены (старый код/старые пакеты/Node-скрипты).

---

## Вопросы на собеседовании

### 1. В чём разница между ESM и CommonJS?

ESM — `import/export`, статический анализ, tree-shaking. CommonJS — `require/module.exports`, динамика во время выполнения, tree-shaking обычно хуже.

### 2. Что такое tree-shaking?

Удаление неиспользуемого кода при сборке (лучше всего работает с ESM).

### 3. Зачем динамический import()?

Чтобы загружать модуль только когда он нужен (код-сплиттинг/уменьшение стартового бандла).
