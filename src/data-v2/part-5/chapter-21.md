# Глава 21. Execution context, call stack и замыкания

Понимание Execution Context, Call Stack и замыканий — ключ к глубокому пониманию JavaScript. Эти концепции объясняют, как язык работает под капотом и почему функции «помнят» переменные из внешней области видимости.

---

## 21.1. Execution Context (контекст выполнения)

Когда движок JS выполняет код, он создаёт **контексты выполнения** (Execution Context):

- **глобальный контекст** (при загрузке файла)
- **контекст функции** (при вызове любой функции)
- (в ES-модулях — ещё и контекст модуля)

### Что включает Execution Context

Каждый контекст включает в себя:

- **Lexical Environment** — где хранятся переменные и ссылки наружу
- **Variable Environment** (исторически выделяется отдельно, в упрощении можно считать частью LE)
- **связку `this`**

### Фазы создания контекста

**1. Creation Phase (фаза создания):**

- Создаётся Lexical Environment
- Регистрируются объявления переменных и функций (hoisting)
- Устанавливается `this`
- Создаётся ссылка на внешнее окружение (outer environment)

**2. Execution Phase (фаза выполнения):**

- Выполняется код
- Присваиваются значения переменным
- Вызываются функции

---

## 21.2. Lexical Environment (лексическое окружение)

**Lexical Environment** — это структура, которая:

- хранит переменные и их значения
- хранит ссылку на внешнее окружение (outer environment)
- определяет, какие переменные доступны в текущем контексте

### Структура Lexical Environment

```javascript
LexicalEnvironment = {
  EnvironmentRecord: {
    // Переменные и функции
    x: 10,
    y: 20
  },
  Outer: <ссылка на внешнее окружение>
}
```

### Цепочка областей видимости (Scope Chain)

При поиске переменной движок:

1. Ищет в текущем Lexical Environment
2. Если не найдена — идёт по ссылке Outer во внешнее окружение
3. Продолжает до глобального контекста
4. Если не найдена — ReferenceError

**Пример:**

```javascript
const global = 'global'

function outer() {
  const outerVar = 'outer'
  
  function inner() {
    const innerVar = 'inner'
    console.log(global) // Ищет: inner → outer → global
    console.log(outerVar) // Ищет: inner → outer
    console.log(innerVar) // Ищет: inner
  }
  
  inner()
}

outer()
```

---

## 21.3. Call Stack (стек вызовов)

JavaScript — **однопоточный** язык: в каждый момент времени выполняется только один фрагмент кода. Управляет этим **стек вызовов** (Call Stack).

### Как работает Call Stack

Стек работает по принципу LIFO (Last In, First Out):

- При вызове функции её контекст **добавляется** на вершину стека
- При завершении функции её контекст **удаляется** со стека
- Выполняется всегда контекст на **вершине** стека

### Пример стека вызовов

```javascript
function a() {
  b()
}

function b() {
  c()
}

function c() {
  console.log('Hi')
}

a()
```

**Последовательность в стеке:**

1. Глобальный контекст
2. Вызов `a` → контекст `a` на вершине стека
3. `a` вызывает `b` → сверху новый контекст `b`
4. `b` вызывает `c` → сверху контекст `c`
5. `c` завершилась → её контекст снимается со стека
6. Завершается `b`, потом `a`, потом глобальный код

**Визуализация:**

```
[глобальный]
[глобальный, a]
[глобальный, a, b]
[глобальный, a, b, c]
[глобальный, a, b] ← c завершилась
[глобальный, a] ← b завершилась
[глобальный] ← a завершилась
```

### Stack Overflow

Если стек переполняется (слишком много вложенных вызовов), возникает ошибка:

```javascript
function recursive() {
  recursive() // Бесконечная рекурсия
}

recursive() // RangeError: Maximum call stack size exceeded
```

---

## 21.4. Замыкания (Closures)

С формальной точки зрения:

> **Замыкание — это функция вместе с её лексическим окружением.**

Проще:

> Функция «помнит» переменные, которые были рядом во время её создания, даже если внешняя функция уже закончила выполнение.

### Базовый пример

```javascript
function makeCounter() {
  let count = 0

  return function () {
    count++
    console.log(count)
  }
}

const counter = makeCounter()
counter() // 1
counter() // 2
counter() // 3
```

**Что происходит:**

1. `makeCounter` создаёт переменную `count` в своём Lexical Environment
2. Возвращает функцию, которая ссылается на `count`
3. После завершения `makeCounter` её контекст должен был бы удалиться
4. Но внутренняя функция **удерживает** ссылку на Lexical Environment `makeCounter`
5. `count` продолжает жить в памяти, пока существует замыкание

### Важно: замыкание — это ссылка, а не копия

Новички часто думают, что внутренняя функция запомнила «значение на момент создания». На самом деле она хранит **ссылку на переменную**.

**Пример:**

```javascript
function outer() {
  let x = 10
  
  function inner() {
    console.log(x)
  }
  
  x = 20 // Изменяем x
  
  return inner
}

const fn = outer()
fn() // 20, а не 10!
```

### Классическая задача с циклом

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10)
}
// Выведет: 3, 3, 3
```

**Почему?**

`var` создаёт **одну переменную `i`** на весь цикл, и все стрелочные функции смотрят в одно и то же место в памяти. К моменту выполнения setTimeout цикл уже завершился, и `i = 3`.

**Правильные варианты:**

```javascript
// 1. let даёт новую переменную i на каждую итерацию
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10)
}
// Выведет: 0, 1, 2

// 2. IIFE (исторический паттерн)
for (var i = 0; i < 3; i++) {
  ;((j) => {
    setTimeout(() => console.log(j), 10)
  })(i)
}
// Выведет: 0, 1, 2

// 3. bind
for (var i = 0; i < 3; i++) {
  setTimeout(function(j) {
    console.log(j)
  }.bind(null, i), 10)
}
```

---

## 21.5. Практическое использование замыканий

### Инкапсуляция состояния

```javascript
function createCounter() {
  let count = 0
  
  return {
    increment() {
      count++
      return count
    },
    decrement() {
      count--
      return count
    },
    getValue() {
      return count
    }
  }
}

const counter = createCounter()
counter.increment() // 1
counter.increment() // 2
counter.getValue() // 2
// count недоступен снаружи
```

### Приватные данные

```javascript
function createUser(name) {
  let secret = 'hidden'
  let password = '12345'

  return {
    getName() {
      return name
    },
    getSecret() {
      return secret
    },
    // password остаётся приватным
  }
}

const user = createUser('Bob')
user.getName() // 'Bob'
user.getSecret() // 'hidden'
// user.password // undefined
```

### Мемоизация

```javascript
function memoize(fn) {
  const cache = {}
  
  return function(...args) {
    const key = JSON.stringify(args)
    
    if (cache[key]) {
      return cache[key]
    }
    
    const result = fn(...args)
    cache[key] = result
    return result
  }
}

const expensiveFunction = (n) => {
  // Долгие вычисления
  return n * 2
}

const memoized = memoize(expensiveFunction)
memoized(5) // Вычисляется
memoized(5) // Берётся из кэша
```

### Фабрики функций

```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier
  }
}

const double = createMultiplier(2)
const triple = createMultiplier(3)

double(5) // 10
triple(5) // 15
```

---

## 21.6. Функции высшего порядка (HOF)

**Функция высшего порядка (Higher-Order Function, HOF)** — это функция, которая:

- принимает другую функцию как аргумент **или**
- возвращает функцию как результат

**Встроенные примеры:**

```javascript
[1, 2, 3].map(x => x * 2) // [2, 4, 6]
[1, 2, 3].filter(x => x > 1) // [2, 3]
[1, 2, 3].reduce((a, b) => a + b, 0) // 6
```

**Кастомный пример:**

```javascript
function withLogging(fn) {
  return function(...args) {
    console.log('Calling with', args)
    const result = fn(...args)
    console.log('Result:', result)
    return result
  }
}

const sum = (a, b) => a + b
const loggedSum = withLogging(sum)

loggedSum(4, 5)
// Calling with [4, 5]
// Result: 9
```

---

## 21.7. Каррирование и частичное применение

### Каррирование (currying)

Каррирование — превращение функции с несколькими аргументами в цепочку функций с одним аргументом:

```javascript
// Обычная функция
const add = (a, b, c) => a + b + c

// Каррированная версия
const curriedAdd = (a) => (b) => (c) => a + b + c

curriedAdd(1)(2)(3) // 6

// Частичное применение
const addOne = curriedAdd(1)
const addOneAndTwo = addOne(2)
addOneAndTwo(3) // 6
```

### Частичное применение (partial application)

Частичное применение — когда мы фиксируем **часть аргументов**, а остальные передаём позже:

```javascript
function partial(fn, ...fixed) {
  return (...rest) => fn(...fixed, ...rest)
}

const multiply = (a, b, c) => a * b * c
const double = partial(multiply, 2)

double(3, 4) // 24 (2 * 3 * 4)
```

---

## 21.8. Утечки памяти в замыканиях

Замыкания могут удерживать большие объекты в памяти:

```javascript
function createHandler() {
  const largeData = new Array(1000000).fill('data')
  
  return function() {
    // Использует только smallData, но largeData тоже в памяти
    const smallData = largeData.slice(0, 10)
    console.log(smallData)
  }
}

const handler = createHandler()
// largeData остаётся в памяти, пока существует handler
```

**Решение:**

```javascript
function createHandler() {
  const largeData = new Array(1000000).fill('data')
  const smallData = largeData.slice(0, 10) // Извлекаем нужное
  
  return function() {
    console.log(smallData)
    // largeData больше не нужна
  }
  // largeData может быть удалена сборщиком мусора
}
```

---

## Вопросы на собеседовании

### 1. Что такое Execution Context?

Структура, которая создаётся при выполнении кода. Включает Lexical Environment, Variable Environment и `this`.

### 2. Что такое Lexical Environment?

Структура, которая хранит переменные и ссылку на внешнее окружение. Определяет доступность переменных.

### 3. Как работает Call Stack?

Стек вызовов управляет выполнением кода. При вызове функции её контекст добавляется на вершину стека, при завершении — удаляется.

### 4. Что такое замыкание?

Функция вместе с её лексическим окружением. Функция «помнит» переменные из внешней области видимости даже после её завершения.

### 5. Почему цикл с var выводит 3, 3, 3?

var создаёт одну переменную на весь цикл. Все замыкания ссылаются на одно и то же значение, которое к моменту выполнения уже равно 3.

### 6. Как замыкания используются на практике?

Инкапсуляция состояния, приватные данные, мемоизация, фабрики функций, функции высшего порядка.

### 7. Что такое функция высшего порядка?

Функция, которая принимает другую функцию как аргумент или возвращает функцию как результат.

### 8. В чём разница между каррированием и частичным применением?

Каррирование превращает функцию в цепочку функций с одним аргументом. Частичное применение фиксирует часть аргументов заранее.
