# Глава 24. Модули: ESM и CommonJS

Модули позволяют разбивать код на отдельные файлы, изолировать области видимости и переиспользовать код. В JavaScript есть два основных формата модулей: ES Modules (ESM) и CommonJS (CJS). Понимание различий критично для работы с современными проектами.

---

## 24.1. Зачем нужны модули

**Проблемы без модулей:**

- Глобальные переменные конфликтуют
- Сложно управлять зависимостями
- Нет изоляции кода
- Сложно переиспользовать код

**Преимущества модулей:**

- Изоляция области видимости
- Явные зависимости
- Переиспользование кода
- Tree-shaking (удаление неиспользуемого кода)
- Лучшая организация проекта

---

## 24.2. ES Modules (ESM)

ES Modules — современный стандарт модулей в JavaScript.

### Экспорт (export)

**Named export (именованный экспорт):**

```javascript
// math.js
export const sum = (a, b) => a + b
export const multiply = (a, b) => a * b
export const PI = 3.14159

// Или в конце файла
const sum = (a, b) => a + b
const multiply = (a, b) => a * b
export { sum, multiply }
```

**Default export (экспорт по умолчанию):**

```javascript
// User.js
class User {
  constructor(name) {
    this.name = name
  }
}

export default User

// Или
export default class User {
  constructor(name) {
    this.name = name
  }
}
```

**Комбинированный экспорт:**

```javascript
export const PI = 3.14159
export default class Calculator {}
```

### Импорт (import)

**Named import:**

```javascript
import { sum, multiply } from './math.js'
import { sum as add, multiply as mult } from './math.js'
import * as math from './math.js' // math.sum, math.multiply
```

**Default import:**

```javascript
import User from './User.js'
import Calculator from './Calculator.js'
```

**Комбинированный импорт:**

```javascript
import User, { PI } from './module.js'
```

**Динамический импорт:**

```javascript
// Статический импорт (на этапе сборки)
import { sum } from './math.js'

// Динамический импорт (во время выполнения)
const module = await import('./math.js')
const { sum } = module
```

### Особенности ESM

- **Статический импорт** — известен на этапе сборки
- **Позволяет tree-shaking** — удаление неиспользуемого кода
- **Строгий режим по умолчанию**
- **Топ-уровневый await** (в некоторых контекстах)
- **Циклические зависимости** обрабатываются корректно
- **Стандарт для браузеров** и современного Node.js

**В браузере:**

```html
<script type="module">
  import { sum } from './math.js'
  console.log(sum(1, 2))
</script>
```

**В Node.js:**

```json
{
  "type": "module"
}
```

Или используйте расширение `.mjs`:

```javascript
// math.mjs
export const sum = (a, b) => a + b
```

---

## 24.3. CommonJS (CJS)

CommonJS — исторический стандарт модулей для Node.js.

### Экспорт (module.exports)

**Экспорт объекта:**

```javascript
// math.js
const sum = (a, b) => a + b
const multiply = (a, b) => a * b

module.exports = {
  sum,
  multiply
}
```

**Экспорт функции:**

```javascript
// User.js
function User(name) {
  this.name = name
}

module.exports = User
```

**Экспорт через exports:**

```javascript
// math.js
exports.sum = (a, b) => a + b
exports.multiply = (a, b) => a * b
```

⚠️ `exports` — это ссылка на `module.exports`. Нельзя переназначать `exports` напрямую.

### Импорт (require)

```javascript
// Импорт объекта
const math = require('./math.js')
math.sum(1, 2)

// Деструктуризация
const { sum, multiply } = require('./math.js')

// Импорт функции
const User = require('./User.js')
```

### Особенности CommonJS

- **Динамический импорт** — можно вызывать `require` в любом месте кода
- **Выполняется синхронно**
- **Нет tree-shaking**
- **Исторический стандарт для Node.js**
- **В новых фронтенд‑проектах ESM — предпочтительный вариант**

**Динамический require:**

```javascript
if (condition) {
  const module = require('./module.js')
}
```

---

## 24.4. Сравнение ESM и CommonJS

| Характеристика | ESM | CommonJS |
|---------------|-----|----------|
| Синтаксис | `import/export` | `require/module.exports` |
| Когда определяется | На этапе сборки (статически) | Во время выполнения (динамически) |
| Tree-shaking | Да | Нет |
| Строгий режим | По умолчанию | Нет |
| Топ-уровневый await | Да (в некоторых контекстах) | Нет |
| Циклические зависимости | Обрабатываются корректно | Могут быть проблемными |
| Где используется | Браузеры, современный Node.js | Старый Node.js, некоторые сборщики |

---

## 24.5. Смешанное использование

В Node.js можно использовать оба формата, но есть ограничения:

**ESM может импортировать CommonJS:**

```javascript
// math.cjs
module.exports = {
  sum: (a, b) => a + b
}

// main.mjs
import math from './math.cjs' // Работает
```

**CommonJS не может импортировать ESM:**

```javascript
// math.mjs
export const sum = (a, b) => a + b

// main.cjs
const math = require('./math.mjs') // Ошибка!
```

**Решение:** Используйте динамический импорт:

```javascript
// main.cjs
const math = await import('./math.mjs')
```

---

## 24.6. Циклические зависимости

### ESM

ESM корректно обрабатывает циклические зависимости:

```javascript
// a.js
import { b } from './b.js'
export const a = 'a'

// b.js
import { a } from './a.js'
export const b = 'b'
```

### CommonJS

Могут быть проблемными:

```javascript
// a.js
const { b } = require('./b.js')
module.exports = { a: 'a' }

// b.js
const { a } = require('./a.js')
module.exports = { b: 'b' }
```

В CommonJS может быть `undefined` из-за порядка выполнения.

---

## 24.7. Практические рекомендации

### Когда использовать ESM

- ✅ Новые проекты
- ✅ Фронтенд-приложения
- ✅ Современный Node.js (14+)
- ✅ Когда нужен tree-shaking
- ✅ Когда нужен топ-уровневый await

### Когда использовать CommonJS

- ✅ Старые проекты Node.js
- ✅ Библиотеки, которые должны работать везде
- ✅ Когда нужен динамический импорт в любом месте

### Миграция с CommonJS на ESM

1. Добавьте `"type": "module"` в `package.json`
2. Замените `require` на `import`
3. Замените `module.exports` на `export`
4. Используйте расширение `.mjs` или переименуйте файлы
5. Обновите пути (ESM требует расширения файлов)

---

## 24.8. Tree-shaking

Tree-shaking — удаление неиспользуемого кода на этапе сборки.

**ESM поддерживает tree-shaking:**

```javascript
// utils.js
export const used = () => 'used'
export const unused = () => 'unused'

// main.js
import { used } from './utils.js'
// unused не попадёт в бандл
```

**CommonJS не поддерживает tree-shaking:**

```javascript
// utils.js
exports.used = () => 'used'
exports.unused = () => 'unused'

// main.js
const { used } = require('./utils.js')
// unused всё равно попадёт в бандл
```

---

## Вопросы на собеседовании

### 1. В чём разница между ESM и CommonJS?

ESM использует `import/export`, статический анализ, поддерживает tree-shaking. CommonJS использует `require/module.exports`, динамический импорт, не поддерживает tree-shaking.

### 2. Что такое tree-shaking?

Удаление неиспользуемого кода на этапе сборки. Работает только с ESM.

### 3. Можно ли использовать ESM в Node.js?

Да, начиная с Node.js 14+ с флагом или `"type": "module"` в package.json.

### 4. Можно ли импортировать CommonJS в ESM?

Да, ESM может импортировать CommonJS модули.

### 5. Можно ли импортировать ESM в CommonJS?

Нет, напрямую нельзя. Нужно использовать динамический `import()`.

### 6. Что такое default export?

Экспорт по умолчанию — один основной экспорт из модуля. Импортируется без фигурных скобок.

### 7. В чём разница между `export` и `export default`?

`export` — именованный экспорт (может быть несколько). `export default` — экспорт по умолчанию (один на модуль).

---

## Key Takeaways

- ESM — современный стандарт, CommonJS — исторический для Node.js
- ESM статический, CommonJS динамический
- ESM поддерживает tree-shaking, CommonJS — нет
- ESM может импортировать CommonJS, обратное — нет
- В новых проектах предпочтительнее ESM
- Понимание модулей критично для работы с современными проектами

