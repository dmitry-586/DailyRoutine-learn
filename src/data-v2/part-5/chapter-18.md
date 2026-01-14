# Глава 18. Типы данных и сравнение

Понимание типов данных и правил сравнения — фундамент JavaScript. От этого зависит, как передаются значения и как работает сравнение.

---

## 18.1. Примитивы и объекты

В JavaScript 8 встроенных типов:

**7 примитивных типов** (передаются по значению):

- `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`

**1 ссылочный тип:**

- `object` — объекты, массивы, функции, `Map`, `Set`, `Date` и т.п.

### Ключевое различие

**Примитивы** — независимые копии значений:

```javascript
let a = 10
let b = a
b = 20
console.log(a) // 10 — не изменился
```

**Объекты** — ссылки на одну область памяти:

```javascript
const obj1 = { x: 1 }
const obj2 = obj1
obj2.x = 2
console.log(obj1.x) // 2 — изменился исходный объект
```

**Практический вывод:** примитивы копируются, объекты — нет.

---

## 18.2. Копирование объектов

При присваивании объекта создаётся только ссылка, а не копия. Чтобы получить независимую копию, нужно копировать явно.

### Неглубокое копирование (Shallow Copy)

Копируется только первый уровень. Вложенные объекты остаются ссылками.

**Способы неглубокого копирования:**

**1. Spread оператор:**

```javascript
const original = { a: 1, b: { c: 2 } }
const copy = { ...original }

copy.a = 10
console.log(original.a) // 1 — не изменился

copy.b.c = 20
console.log(original.b.c) // 20 — изменился! (та же ссылка)
```

**2. Object.assign():**

```javascript
const original = { a: 1, b: { c: 2 } }
const copy = Object.assign({}, original)

copy.a = 10
console.log(original.a) // 1

copy.b.c = 20
console.log(original.b.c) // 20 — изменился
```

**3. Для массивов:**

```javascript
const original = [1, 2, [3, 4]]
const copy = [...original]
// или
const copy2 = original.slice()
// или
const copy3 = Array.from(original)
```

### Глубокое копирование (Deep Copy)

Копируются все уровни вложенности. Каждый объект становится независимым.

**1. JSON.parse(JSON.stringify()) — простой способ:**

```javascript
const original = { a: 1, b: { c: 2 } }
const copy = JSON.parse(JSON.stringify(original))

copy.b.c = 20
console.log(original.b.c) // 2 — не изменился
```

**Ограничения:**

- Не работает с функциями, `undefined`, `Symbol`
- Не работает с `Date` (превращается в строку)
- Не работает с циклическими ссылками

```javascript
const obj = { a: 1, fn: () => {} }
const copy = JSON.parse(JSON.stringify(obj))
console.log(copy.fn) // undefined — функция потерялась
```

**2. StructuredClone() — современный способ:**

```javascript
const original = { a: 1, b: { c: 2 }, date: new Date() }
const copy = structuredClone(original)

copy.b.c = 20
console.log(original.b.c) // 2 — не изменился
console.log(copy.date instanceof Date) // true
```

**Поддерживает:**

- Объекты, массивы, примитивы
- `Date`, `RegExp`, `Map`, `Set`
- Циклические ссылки
- Не поддерживает функции

**3. Рекурсивная функция (для полного контроля):**

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj)
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item))
  }

  const copy = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key])
    }
  }

  return copy
}
```

### Когда что использовать

- **Неглубокое копирование** — когда нужно скопировать только первый уровень (например, обновление состояния в React)
- **Глубокое копирование** — когда структура вложенная и нужно полное разделение данных
- **structuredClone()** — предпочтительный способ для глубокого копирования в современном JavaScript

---

## 18.3. Сравнение `==` и `===`

### `===` (строгое сравнение)

Сравнивает **тип и значение** без приведения:

```javascript
5 === 5 // true
5 === '5' // false (разные типы)
null === null // true
```

### `==` (нестрогое сравнение)

Приводит типы к общему виду перед сравнением. **Правила применяются по порядку:**

1. **Типы одинаковы** → сравнивает значения: `5 == 5` → `true`

2. **`null` и `undefined`** → всегда `true`: `null == undefined` → `true`

3. **Число и строка** → строка приводится к числу: `'5' == 5` → `true`

4. **Boolean и что-то** → boolean приводится к числу (`true` → `1`, `false` → `0`): `true == 1` → `true`

5. **Объект и примитив** → объект приводится к примитиву через `valueOf()` или `toString()`:

```javascript
[5] == 5        // true (массив → '5' → 5)
[] == 0         // true (массив → '' → 0)
[1,2] == '1,2'  // true
```

### Когда использовать

- **`===`** — почти всегда (предсказуемо и безопасно)
- **`== null`** — проверка на `null` или `undefined` одновременно:

```javascript
if (value == null) {
  // Проверяет и null, и undefined
}
```

---

## 18.4. Приведение типов

### Явное приведение

Ты сам указываешь преобразование:

```javascript
Number('42') // 42
String(42) // '42'
Boolean(0) + // false
  '42' // 42 (унарный плюс)
!!1 // true (двойное отрицание)
```

### Неявное приведение

JavaScript делает это автоматически:

**При операциях:**

- `+` с строкой → оба к строке: `'5' + 2` → `'52'`
- `-`, `*`, `/` → оба к числу: `'5' - 2` → `3`

**В условиях:**

- Значение приводится к `boolean`

**Falsy-значения (8 штук):**

- `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`

Всё остальное — **truthy**:

```javascript
if ([]) {
} // выполнится
if ({}) {
} // выполнится
if ('0') {
} // выполнится
```

---

## 18.5. Проверка типов

### typeof

Быстрая проверка, но с ограничениями:

```javascript
typeof 42 // 'number'
typeof 'hello' // 'string'
typeof true // 'boolean'
typeof undefined // 'undefined'
typeof null // 'object' (историческая ошибка)
typeof [] // 'object'
typeof function () {} // 'function'
```

### Специализированные проверки

```javascript
Array.isArray([])      // true
[] instanceof Array    // true
Object.prototype.toString.call([])  // '[object Array]'
```

**Практика:** для массивов используй `Array.isArray()`, для `null` — `value === null`.

---

## Вопросы на собеседовании

### 1. Какие типы данных есть в JavaScript?

8 типов: 7 примитивных (number, string, boolean, null, undefined, symbol, bigint) и 1 ссылочный (object).

### 2. В чём разница между примитивами и объектами?

Примитивы передаются по значению (копируются), объекты — по ссылке (указывают на одну область памяти).

### 3. В чём разница между == и ===?

`===` — строгое сравнение (тип и значение без приведения). `==` — нестрогое сравнение с приведением типов по правилам (null/undefined, число/строка, boolean → число, объект → примитив).

### 4. Что такое falsy значения?

8 значений, которые приводятся к `false`: `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`. Всё остальное — truthy.

### 5. Почему typeof null возвращает 'object'?

Историческая ошибка в JavaScript. `null` — примитив, но `typeof` возвращает `'object'` из-за бага в ранних версиях.

### 6. Как проверить, является ли значение массивом?

`Array.isArray(value)` — самый надёжный способ.

### 7. Как скопировать объект?

Неглубокое копирование: `{ ...obj }` или `Object.assign({}, obj)`. Глубокое копирование: `structuredClone(obj)` или `JSON.parse(JSON.stringify(obj))` (с ограничениями).

### 8. В чём разница между неглубоким и глубоким копированием?

Неглубокое копирование копирует только первый уровень, вложенные объекты остаются ссылками. Глубокое копирование создаёт независимые копии всех уровней вложенности.
