# Глава 20. Функции: виды и особенности

В JavaScript есть несколько способов объявить функцию. Они ведут себя по-разному с точки зрения hoisting, `this`, области видимости и использования. Понимание этих различий критично для написания правильного кода.

---

## 20.1. Function Declaration

**Синтаксис:**

```javascript
function sum(a, b) {
  return a + b
}
```

**Характеристики:**

- поднимается целиком (можно вызывать до объявления)
- имеет собственный `this` и `arguments`
- можно использовать как конструктор (`new`)
- удобно для «главных» функций модуля

**Hoisting:**

```javascript
say() // 'Hello' — работает!

function say() {
  console.log('Hello')
}
```

**Использование:**

```javascript
// Основные функции модуля
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// Рекурсивные функции
function factorial(n) {
  if (n === 0) return 1
  return n * factorial(n - 1)
}
```

---

## 20.2. Function Expression

**Синтаксис:**

```javascript
const sum = function (a, b) {
  return a + b
}
```

**Характеристики:**

- сначала создаётся переменная, потом в неё кладут функцию
- поднимается только объявление переменной (`const sum`), но не значение
- имеет собственный `this` и `arguments`
- можно использовать как конструктор
- популярно для коллбеков и когда важен порядок определения

**Hoisting:**

```javascript
say() // TypeError: say is not a function

const say = function () {
  console.log('Hello')
}
```

**Использование:**

```javascript
// Коллбеки
setTimeout(function () {
  console.log('Delayed')
}, 1000)

// Условное создание функции
const fn = condition
  ? function () {
      return 'A'
    }
  : function () {
      return 'B'
    }
```

---

## 20.3. Arrow Function (стрелочные функции)

**Синтаксис:**

```javascript
const sum = (a, b) => a + b

// С телом функции
const sum = (a, b) => {
  return a + b
}

// Один параметр — скобки необязательны
const double = (x) => x * 2

// Без параметров
const greet = () => console.log('Hello')
```

**Характеристики:**

- **не имеет собственного `this`** — берёт из внешнего контекста
- **не имеет собственного `arguments`**
- нельзя вызывать через `new` (не конструктор)
- нет `super` и `new.target`
- нет прототипа
- идеально подходит для коротких функций и коллбеков

**Пример с this:**

```javascript
const obj = {
  value: 42,
  printLater() {
    setTimeout(() => {
      console.log(this.value) // 42 — this из printLater
    }, 100)
  },
}

obj.printLater()
```

**Где стрелки плохи:**

```javascript
const user = {
  name: 'Alice',
  say: () => {
    console.log(this.name) // undefined — this из глобального контекста
  },
}

user.say()
```

**Практическое правило:**

- стрелки — **для коллбеков, маленьких функций, методов, завязанных на внешний `this`**
- обычные функции — **для методов объектов, конструкторов, когда `this` должен зависеть от способа вызова**

---

## 20.4. Named Function Expression

**Синтаксис:**

```javascript
const factorial = function fact(n) {
  if (n === 0) return 1
  return n * fact(n - 1) // Использует имя fact
}
```

**Характеристики:**

- имя `fact` доступно только внутри самой функции
- удобно для рекурсии и отладки (имя видно в стеке вызовов)
- не создаёт переменную в внешней области видимости

**Использование:**

```javascript
const fibonacci = function fib(n) {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
}

// В стеке вызовов будет видно 'fib', а не 'anonymous'
```

---

## 20.5. IIFE (Immediately Invoked Function Expression)

**Синтаксис:**

```javascript
;(function () {
  // Код
})()(
  // Или
  (function () {
    // Код
  })(),
)
```

**Характеристики:**

- функция выполняется сразу после объявления
- создаёт изолированную область видимости
- раньше использовалась для модулей (до ES6)

**Использование:**

```javascript
// Изоляция кода
;(function () {
  const private = 'secret'
  // private недоступен снаружи
})()(
  // Передача параметров
  function (global) {
    // Использование global
  },
)(window)
```

**Современная альтернатива:**

```javascript
// Блок создаёт scope
{
  const private = 'secret'
  // private недоступен снаружи
}
```

---

## 20.6. Методы объектов

**Обычный метод:**

```javascript
const obj = {
  name: 'Alice',
  say() {
    console.log(this.name) // 'Alice'
  },
}

obj.say()
```

**Стрелочная функция как метод:**

```javascript
const obj = {
  name: 'Alice',
  say: () => {
    console.log(this.name) // undefined — this из глобального контекста
  },
}

obj.say()
```

Не используйте стрелки как методы объектов, если нужен `this`.

---

## 20.7. Генераторы

Генератор — это функция, которую можно **ставить на паузу** и **продолжать** с того же места.
Это удобно, когда нужно «выдавать значения по одному» (лениво), а не создавать сразу массив.

### Как это работает

- `function*` — объявляет генератор.
- `yield` — «вернуть значение наружу и остановиться».
- Вызов генератора **не выполняет** его тело сразу. Он возвращает **итератор**.
- Итератор имеет метод `next()`, который возвращает объект вида `{ value, done }`:
  - `value` — текущее значение
  - `done` — закончился генератор или нет

**Важно запомнить:** вызов генератора возвращает итератор и не выполняет код функции сразу. Код выполняется только при вызове `next()`.

### Минимальный пример (yield + next)

```javascript
function* generator() {
  yield 1
  yield 2
  yield 3
}

const gen = generator()
console.log(gen.next()) // { value: 1, done: false }
console.log(gen.next()) // { value: 2, done: false }
console.log(gen.next()) // { value: 3, done: false }
console.log(gen.next()) // { value: undefined, done: true }
```

### Генератор отлично дружит с for...of

`for...of` сам вызывает `next()` и останавливается, когда `done: true`:

```javascript
for (const n of generator()) {
  console.log(n) // 1, потом 2, потом 3
}
```

### Понятный практический пример: range

```javascript
function* range(from, to) {
  for (let i = from; i <= to; i++) {
    yield i
  }
}

console.log([...range(3, 6)]) // [3, 4, 5, 6]
```

### Где реально полезно

- **Ленивые последовательности**: значения считаются только когда понадобились.
- **Кастомная итерация**: удобно сделать объект «итерируемым» через `*[Symbol.iterator]()` (не обязательно для старта, но часто встречается).

> Если вы не пишете библиотеки/сложные итераторы, генераторы обычно нужны редко. Главное — понимать идею `yield` и `next()` (это иногда спрашивают на собеседованиях).

---

## 20.8. Асинхронные функции

**Синтаксис:**

```javascript
async function fetchData() {
  const response = await fetch('/api/data')
  return response.json()
}

// Стрелочная async функция
const fetchData = async () => {
  const response = await fetch('/api/data')
  return response.json()
}
```

**Характеристики:**

- всегда возвращает Promise
- можно использовать `await` внутри
- упрощает работу с асинхронным кодом

---

## 20.9. Параметры функций

### Параметры по умолчанию

```javascript
function greet(name = 'Guest') {
  console.log(`Hello, ${name}`)
}

greet() // 'Hello, Guest'
greet('Alice') // 'Hello, Alice'
```

### Rest параметры

```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0)
}

sum(1, 2, 3, 4) // 10
```

### Деструктуризация параметров

```javascript
function greet({ name, age = 18 }) {
  console.log(`${name} is ${age} years old`)
}

greet({ name: 'Alice', age: 25 })
```

---

## 20.10. Сравнение видов функций

**Function Declaration:**

- Hoisting: полное
- this: собственный
- arguments: есть
- new: можно
- prototype: есть
- Имя в стеке: да

**Function Expression:**

- Hoisting: только переменная
- this: собственный
- arguments: есть
- new: можно
- prototype: есть
- Имя в стеке: нет (или через NFE)

**Arrow Function:**

- Hoisting: только переменная
- this: из внешнего контекста
- arguments: нет
- new: нельзя
- prototype: нет
- Имя в стеке: нет

---

## Вопросы на собеседовании

### 1. В чём разница между Function Declaration и Function Expression?

Function Declaration поднимается целиком, можно вызывать до объявления. Function Expression поднимается только переменная, значение — нет.

### 2. Чем стрелочные функции отличаются от обычных?

Стрелки не имеют собственного `this` и `arguments`, нельзя вызывать через `new`, нет прототипа. `this` берётся из внешнего контекста.

### 3. Когда использовать стрелочные функции?

Для коллбеков, коротких функций, когда нужно сохранить `this` из внешнего контекста (например, в setTimeout).

### 4. Можно ли использовать стрелку как метод объекта?

Технически да, но не рекомендуется, если нужен `this` объекта. Стрелка возьмёт `this` из внешнего контекста, а не объекта.

### 5. Что такое IIFE?

Immediately Invoked Function Expression — функция, которая выполняется сразу после объявления. Раньше использовалась для изоляции кода.

### 6. Что такое Named Function Expression?

Function Expression с именем, доступным только внутри функции. Удобно для рекурсии и отладки.

### 7. Что такое rest параметры?

Параметры, которые собирают оставшиеся аргументы в массив. Обозначаются `...name`.
