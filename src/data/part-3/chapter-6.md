# Разбор решений к практикуму по JavaScript, DOM и асинхронности

Эта глава — **подробный разбор** заданий из практикума (Глава 12).

Рекомендация по работе:

- сначала решай задания из практикума «вслепую»;
- только потом сверяйся с этой главой;
- не ограничивайся ответом — пытайся восстановить ход рассуждений.

---

## Ответы к заданиям 1–2 (типы и приведение)

### Задание 1

```javascript
'5' + 3         // '53' — сработала конкатенация строки и числа
'5' - 3         // 2 — оператор '-' приводит обе стороны к number
true + 1        // 2 — true → 1, 1 + 1 = 2
false == 0      // true — нестрогое сравнение, false → 0
null == undefined // true — спец‑правило абстрактного сравнения
[] == 0         // true — [] → '' → 0 при приведении к числу
[1, 2] + [3, 4] // '1,23,4' — массивы приводятся к строкам ('1,2' + '3,4')
```

Ключевые моменты:

- `+` со строкой → конкатенация, остальные операторы (`-`, `*`, `/`) → числовое приведение;
- `==` использует сложные правила приведения, `===` — нет;
- массивы при приведении к строке используют `Array.prototype.toString`.

### Задание 2 (один из возможных вариантов)

```javascript
console.log(null == null) // true
console.log(null === null) // true
console.log(undefined === undefined) // true
```

Смысл:

- `== null` часто используют как «`null` ИЛИ `undefined`» сразу;
- `=== null` и `=== undefined` — строгая проверка на конкретное значение;
- в продакшене чаще используют `===`, а `== null` — осознанно и точечно.

---

## Ответы к заданиям 3–4 (scope и hoisting)

### Задание 3

```javascript
console.log(a) // undefined — объявление var a поднято, но значение ещё не присвоено
var a = 10

console.log(b) // ReferenceError — b в TDZ до строки let b = 20
let b = 20
```

Разбор:

- `var a` поднимается и инициализируется `undefined`, поэтому доступ к `a` есть, но значение ещё не присвоено;
- `let b` тоже поднимается, но попадает в **Temporal Dead Zone**: доступ к переменной запрещён до фактической инициализации.

### Задание 4 (один из вариантов на let/const)

```javascript
let x = 0

if (true) {
  x = 5
}

function log() {
  console.log(x)
}

log() // 5
```

Альтернатива с блочной областью видимости, если `x` нужен только внутри:

```javascript
if (true) {
  const x = 5
  function log() {
    console.log(x)
  }
  log()
}
```

Ключевая идея: не опираться на «протекающий» `var`, а делать область видимости явной.

---

## Ответы к заданиям 5–7 (this и замыкания)

### Задание 5

```javascript
const user = {
  name: 'Alice',
  say() {
    console.log(this.name)
  },
}

const say = user.say
say() // undefined (в strict‑режиме this === undefined)
```

Почему так:

- при вызове `user.say()` контекстом (`this`) будет объект `user`;
- при присваивании `const say = user.say` мы теряем связь с объектом;
- при простом вызове `say()` в strict‑режиме `this === undefined`.

Исправление (один из вариантов):

```javascript
const say = user.say.bind(user)
say() // 'Alice'
```

Либо всегда вызывать через объект:

```javascript
const userSay = () => user.say()
userSay() // 'Alice'
```

### Задание 6 (пример решения)

```javascript
function createCounter() {
  let count = 0

  return function () {
    count += 1
    return count
  }
}
```

Почему это замыкание:

- внутренняя функция «захватывает» переменную `count` из внешней области;
- после возврата внешней функции контекст не уничтожается, пока есть ссылка на внутреннюю функцию;
- внешнему коду недоступно прямое изменение `count`, только через вызов счётчика.

### Задание 7

1. С `let`:

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10)
}
```

Каждая итерация цикла создаёт свою «копию» `i` благодаря блочной области видимости `let`.

2. ES5‑вариант с IIFE:

```javascript
for (var i = 0; i < 3; i++) {
  ;(function (j) {
    setTimeout(function () {
      console.log(j)
    }, 10)
  })(i)
}
```

Здесь `j` — параметр немедленно вызываемой функции, который фиксирует текущее значение `i`.

---

## Ответы к заданиям 8–9 (прототипы и классы)

### Задание 8

```javascript
function User(name) {
  this.name = name
}

User.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`)
}
```

Идея:

- данные экземпляра (`name`) живут на самом экземпляре;
- общие методы (`sayHi`) кладём в прототип, чтобы не дублировать их в памяти.

### Задание 9

```javascript
class User {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}`)
  }
}

class Admin extends User {
  constructor(name) {
    super(name)
  }

  isAdmin() {
    console.log(true)
  }
}
```

Важные моменты:

- `extends` настраивает прототипное наследование между классами;
- `super(name)` обязательно вызывать в конструкторе дочернего класса **до** использования `this`;
- методы класса по‑прежнему лежат в прототипе.

---

## Ответы к заданиям 10–11 (DOM и события)

### Задание 10

```javascript
const list = document.getElementById('list')

list.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLElement)) return

  if (target.matches('li')) {
    console.log(target.textContent)
  }
})
```

Почему это делегирование:

- обработчик висит на родительском элементе (`ul`), а не на каждом `li`;
- используем всплытие событий и проверяем `event.target`;
- можно динамически добавлять/удалять `li` без переназначения обработчиков.

### Задание 11

```javascript
function renderMessage(el, text) {
  el.textContent = text
}
```

Ключевой момент: `textContent` интерпретирует строку как **текст**, а не как HTML, поэтому скрипты не выполняются и разметка не парсится → это защита от XSS.

---

## Ответы к заданиям 12–14 (Event Loop и async)

### Задание 12

```javascript
console.log('A')
// sync
// -> 'A'

setTimeout(() => console.log('B'), 0) // macrotask

Promise.resolve()
  .then(() => console.log('C')) // microtask
  .then(() => console.log('D')) // microtask

console.log('E')
// sync -> 'E'
```

Фактический порядок: `A, E, C, D, B`.

Разбор:

1. Выполняется весь синхронный код: логи `A`, затем `E`.
2. После этого Event Loop выполняет **все microtasks**: `C`, затем `D`.
3. Затем берётся первая macrotask из очереди: `B` от `setTimeout`.

### Задание 13

```javascript
async function loadUserAndPosts(userId) {
  const [userResponse, postsResponse] = await Promise.all([
    fetch(`/api/users/${userId}`),
    fetch(`/api/users/${userId}/posts`),
  ])

  const [user, posts] = await Promise.all([
    userResponse.json(),
    postsResponse.json(),
  ])

  return { user, posts }
}
```

Что изменилось:

- оба `fetch` запускаются **одновременно**, а не последовательно;
- `Promise.all` ждёт, пока оба промиса перейдут в `fulfilled` или пока один не зафейлится;
- парсинг JSON также выполняется параллельно.

### Задание 14 (упрощённый пример)

```javascript
async function loadUserAndPosts(userId) {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      fetch(`/api/users/${userId}`),
      fetch(`/api/users/${userId}/posts`),
    ])

    if (!userResponse.ok || !postsResponse.ok) {
      throw new Error('Failed to load user or posts')
    }

    const [user, posts] = await Promise.all([
      userResponse.json(),
      postsResponse.json(),
    ])

    return { user, posts }
  } catch (error) {
    // логируем и пробрасываем дальше, чтобы вызывающий код решил, что делать
    console.error('loadUserAndPosts error', error)
    throw error
  }
}
```

Идея обработки ошибок:

- не игнорировать флаг `response.ok` — HTTP 4xx/5xx не кидают исключения сами по себе;
- оборачивать асинхронную логику в `try/catch`;
- логировать ошибку и пробрасывать её дальше, чтобы UI/верхний уровень решил, как реагировать.

---

## Ответы к заданиям 15–18 (дополнительные: типы и приведение)

### Задание 15: Truthy и Falsy

```javascript
console.log(Boolean(0)) // false — 0 это falsy
console.log(Boolean('0')) // true — непустая строка truthy
console.log(Boolean([])) // true — массив (объект) truthy
console.log(Boolean({})) // true — объект truthy
console.log(Boolean(null)) // false — null falsy
console.log(Boolean(undefined)) // false — undefined falsy
console.log(Boolean(NaN)) // false — NaN falsy
console.log(Boolean('')) // false — пустая строка falsy
```

**Ключевой момент:** пустой массив `[]` — это объект, а не примитив. Объекты всегда truthy, кроме `null` (который технически не объект). Пустая строка — примитив и falsy.

### Задание 16: Сложное приведение

```javascript
console.log(![] == []) // true — ![] → false, false == [] → false == 0 → true
console.log(!{} == {}) // false — !{} → false, false == {} → false == '[object Object]' → false
console.log([] + {}) // '[object Object]' — оба приводятся к строкам
console.log({} + []) // '[object Object]' — аналогично
console.log([].toString()) // '' — пустой массив → пустая строка
console.log({}.toString()) // '[object Object]' — стандартное представление объекта
```

### Задание 17: Операторы сравнения

```javascript
console.log(0 == false) // true — нестрогое сравнение, 0 → false
console.log(0 === false) // false — строгое сравнение, разные типы
console.log('' == false) // true — '' → 0, false → 0
console.log('' === false) // false — строгое сравнение
console.log(null == undefined) // true — спец‑правило
console.log(null === undefined) // false — строгое сравнение
console.log(NaN == NaN) // false — NaN не равен самому себе
console.log(NaN === NaN) // false — NaN не равен самому себе
```

### Задание 18: Примитивы vs объекты

```javascript
let a = 5
let b = a
b = 10
console.log(a, b) // 5, 10 — примитивы копируются по значению

const obj1 = { x: 1 }
const obj2 = obj1
obj2.x = 2
console.log(obj1.x, obj2.x) // 2, 2 — объекты копируются по ссылке

const arr1 = [1, 2]
const arr2 = arr1
arr2.push(3)
console.log(arr1, arr2) // [1, 2, 3], [1, 2, 3] — массивы тоже объекты
```

---

## Ответы к заданиям 19–22 (дополнительные: области видимости)

### Задание 19: Вложенные области видимости

```javascript
let x = 1

function outer() {
  let x = 2 // новая переменная, перекрывает внешнюю

  function inner() {
    console.log(x) // 2 — берёт из ближайшей области (outer)
  }

  inner()
}

outer()
console.log(x) // 1 — внешняя переменная не изменилась
```

**Вывод:** `2`, затем `1`. Внутренняя функция использует `x` из области `outer`, а не глобальную.

### Задание 20: var в циклах и функциях

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// Выведет: 3, 3, 3 — все таймеры видят одно и то же i

function test() {
  for (var j = 0; j < 3; j++) {
    // ...
  }
  console.log(j) // 3 — var «протекает» за пределы цикла
}

test()
```

### Задание 21: const и объекты

```javascript
const obj = { count: 0 }
obj.count = 5
console.log(obj.count) // 5 — работает!

const arr = [1, 2]
arr.push(3)
console.log(arr) // [1, 2, 3] — работает!
```

**Объяснение:** `const` запрещает **переприсваивание** переменной, но не изменение содержимого объекта/массива. `obj` и `arr` остаются ссылками на те же объекты, но их свойства можно менять.

### Задание 22: Function Declaration vs Expression

```javascript
console.log(fn1) // [Function: fn1] — поднята (hoisting)
console.log(fn2) // ReferenceError — в TDZ

function fn1() {
  return 'declaration'
}

const fn2 = function () {
  return 'expression'
}
```

**Разница:** Function Declaration поднимается полностью, Function Expression (через `const`) попадает в TDZ до инициализации.

---

## Ответы к заданиям 23–27 (дополнительные: this и замыкания)

### Задание 23: this в разных контекстах

```javascript
const obj = {
  name: 'Alice',
  regular: function () {
    console.log(this.name)
  },
  arrow: () => {
    console.log(this.name) // this из глобальной области
  },
}

obj.regular() // 'Alice' — метод объекта
obj.arrow() // undefined — стрелка берёт this из глобальной области (window/undefined)

const { regular, arrow } = obj
regular() // undefined — потеря контекста
arrow() // undefined — стрелка уже зафиксировала this из глобальной области
```

### Задание 24: call, apply, bind

**Решение:**

```javascript
function multiply(a, b) {
  return a * b
}

const double = multiply.bind(null, 2)
console.log(double(5)) // 10

const triple = multiply.bind(null, 3)
console.log(triple(4)) // 12
```

**Идея:** `bind` фиксирует первые аргументы, создавая частично применённую функцию (currying). Первый аргумент `null` — это контекст `this`, который здесь не используется, поэтому можно передать `null`.

### Задание 25: Замыкание с параметрами

```javascript
function createMultiplier(factor) {
  return function (number) {
    return number * factor
  }
}

const multiplyBy2 = createMultiplier(2)
const multiplyBy5 = createMultiplier(5)

console.log(multiplyBy2(3)) // 6
console.log(multiplyBy5(4)) // 20
```

### Задание 26: Модульный паттерн

```javascript
const counter = (function () {
  let count = 0 // приватная переменная

  return {
    increment() {
      count++
    },
    getValue() {
      return count
    },
  }
})()

counter.increment()
counter.increment()
console.log(counter.getValue()) // 2
// counter.count недоступен снаружи
```

**Паттерн:** IIFE создаёт замыкание, которое скрывает внутреннее состояние.

### Задание 27: this в классах

```javascript
class Button {
  constructor(label) {
    this.label = label
  }

  click() {
    console.log(this.label) // обычный метод
  }

  clickArrow = () => {
    console.log(this.label) // поле-стрелка
  }
}

const btn = new Button('Submit')
const { click, clickArrow } = btn

btn.click() // 'Submit' — метод объекта
btn.clickArrow() // 'Submit' — поле-стрелка
click() // undefined — потеря контекста
clickArrow() // 'Submit' — стрелка зафиксировала this при создании
```

**Разница:** поле-стрелка (`clickArrow`) создаётся в конструкторе и фиксирует `this` на экземпляре класса.

---

## Ответы к заданиям 28–30 (дополнительные: прототипы и классы)

### Задание 28: Цепочка прототипов

```javascript
function Animal(name) {
  this.name = name
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`)
}

function Dog(name) {
  Animal.call(this, name) // вызываем конструктор родителя
}

Dog.prototype = Object.create(Animal.prototype) // наследование
Dog.prototype.constructor = Dog // восстанавливаем constructor

Dog.prototype.speak = function () {
  console.log(`${this.name} barks`) // переопределение метода
}

const dog = new Dog('Rex')
dog.speak() // 'Rex barks'
console.log(dog instanceof Dog) // true
console.log(dog instanceof Animal) // true — цепочка прототипов
```

### Задание 29: Статические методы

```javascript
class MathUtils {
  static sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0)
  }

  static average(...numbers) {
    return MathUtils.sum(...numbers) / numbers.length
  }
}

console.log(MathUtils.sum(1, 2, 3)) // 6
console.log(MathUtils.average(10, 20, 30)) // 20
```

**Статические методы** принадлежат классу, а не экземпляру.

### Задание 30: Геттеры и сеттеры

```javascript
class Temperature {
  constructor() {
    this._celsius = 0
  }

  get celsius() {
    return this._celsius
  }

  set celsius(value) {
    this._celsius = value
  }

  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32
  }

  set fahrenheit(value) {
    this._celsius = ((value - 32) * 5) / 9
  }
}

const temp = new Temperature()
temp.celsius = 25
console.log(temp.fahrenheit) // 77
temp.fahrenheit = 86
console.log(temp.celsius) // 30
```

---

## Ответы к заданиям 31–35 (дополнительные: DOM)

### Задание 31: Динамическое создание списка

```javascript
function createList(items, containerId) {
  const container = document.getElementById(containerId)
  const ul = document.createElement('ul')

  items.forEach((item) => {
    const li = document.createElement('li')
    li.textContent = item
    ul.appendChild(li)
  })

  container.appendChild(ul)
}

createList(['Apple', 'Banana', 'Cherry'], 'app')
```

### Задание 32: Удаление элементов

```javascript
function removeElements(selector) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el) => el.remove())
}

removeElements('.to-remove')
```

**Альтернатива:** можно использовать `forEach` с `remove()` или `removeChild()`.

### Задание 33: Переключение классов

```javascript
function toggleClass(el, className) {
  el.classList.toggle(className)
}
```

**Или вручную:**

```javascript
function toggleClass(el, className) {
  if (el.classList.contains(className)) {
    el.classList.remove(className)
  } else {
    el.classList.add(className)
  }
}
```

### Задание 34: Обработка формы

```javascript
const form = document.getElementById('myForm')

form.addEventListener('submit', (event) => {
  event.preventDefault() // предотвращаем отправку

  const formData = new FormData(form)
  const data = {}

  for (const [key, value] of formData.entries()) {
    data[key] = value
  }

  console.log(data)
})
```

**Альтернатива** с `Object.fromEntries`:

```javascript
const data = Object.fromEntries(new FormData(form))
```

### Задание 35: Debounce

```javascript
function debounce(func, delay) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

const handleInput = debounce((value) => {
  console.log('Search:', value)
}, 300)
```

**Идея:** каждый новый вызов сбрасывает предыдущий таймер. Функция выполнится только после паузы в `delay` миллисекунд.

---

## Ответы к заданиям 36–42 (дополнительные: Event Loop и async)

### Задание 36: Сложный порядок выполнения

```javascript
console.log('1') // синхронный

setTimeout(() => console.log('2'), 0) // macrotask

Promise.resolve()
  .then(() => {
    console.log('3') // microtask
    return Promise.resolve()
  })
  .then(() => console.log('4')) // microtask

queueMicrotask(() => console.log('5')) // microtask

console.log('6') // синхронный
```

**Порядок:** `1, 6, 3, 4, 5, 2`

- Сначала весь синхронный код (`1`, `6`)
- Затем все microtasks (`3`, `4`, `5`)
- Затем macrotask (`2`)

### Задание 37: Promise.all vs Promise.allSettled

**Решение:**

```javascript
async function loadAllSettled(urls) {
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      return response.json()
    }),
  )

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return { url: urls[index], data: result.value, success: true }
    } else {
      return { url: urls[index], error: result.reason, success: false }
    }
  })
}

loadAllSettled(['/api/1', '/api/2', '/api/3']).then((results) => {
  results.forEach((r) => {
    if (r.success) {
      console.log('Success:', r.url, r.data)
    } else {
      console.error('Failed:', r.url, r.error)
    }
  })
})
```

**Разница между Promise.all и Promise.allSettled:**

- `Promise.all` — падает при первой ошибке, остальные результаты теряются. Используй, когда нужны все результаты и любая ошибка критична.
- `Promise.allSettled` — ждёт все промисы, возвращает статус каждого. Используй, когда нужно обработать все результаты, включая ошибки.

### Задание 38: Promise.race для timeout

**Решение:**

```javascript
function timeout(promise, ms) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms)
  })

  return Promise.race([promise, timeoutPromise])
}

timeout(fetch('/api/data'), 5000)
  .then((data) => console.log(data))
  .catch((error) => console.error('Timeout or error', error))
```

**Идея:** `Promise.race` возвращает результат того промиса, который выполнится первым. Если исходный промис выполнится быстрее таймаута — вернётся его результат. Если таймаут истечёт раньше — вернётся ошибка `'Timeout'`.

**Важно:** если исходный промис отклоняется, ошибка будет проброшена в `catch`, а не таймаут.

### Задание 39: Последовательные запросы

```javascript
async function loadSequentially(urls) {
  const results = []

  for (const url of urls) {
    const response = await fetch(url)
    const data = await response.json()
    results.push(data)
  }

  return results
}

loadSequentially(['/api/1', '/api/2', '/api/3'])
```

**Альтернатива** с `reduce`:

```javascript
async function loadSequentially(urls) {
  return urls.reduce(async (accPromise, url) => {
    const acc = await accPromise
    const response = await fetch(url)
    const data = await response.json()
    return [...acc, data]
  }, Promise.resolve([]))
}
```

### Задание 40: Retry механизм

```javascript
async function retry(fn, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error
      }
      console.log(`Attempt ${attempt} failed, retrying...`)
    }
  }
}

retry(() => fetch('/api/unstable'), 3)
  .then((data) => console.log('Success', data))
  .catch((error) => console.error('All attempts failed', error))
```

**Улучшенная версия** с экспоненциальной задержкой:

```javascript
async function retry(fn, maxAttempts = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error
      }
      await new Promise((resolve) => setTimeout(resolve, delay * attempt))
    }
  }
}
```

### Задание 41: Обработка ошибок в цепочке

**Проблемы в исходном коде:**

1. Если `fetch` упадёт с сетевой ошибкой, `catch` перехватит её, но функция вернёт `undefined` (так как нет `return` в `catch`).
2. Если `fetch` вернёт HTTP 404/500, `fetch` не выбросит ошибку автоматически — нужно проверять `response.ok`.
3. Ошибка логируется, но не пробрасывается дальше, поэтому вызывающий код не узнает об ошибке.

**Исправление:**

```javascript
async function process() {
  try {
    const data = await fetch('/api/data')
    if (!data.ok) {
      throw new Error(`HTTP ${data.status}`)
    }
    return data.json()
  } catch (error) {
    console.error(error)
    throw error // пробрасываем дальше
  }
}

process()
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error('Failed to process', error)
  })
```

**Или без try/catch в функции:**

```javascript
async function process() {
  const data = await fetch('/api/data')
  if (!data.ok) {
    throw new Error(`HTTP ${data.status}`)
  }
  return data.json()
}

process()
  .then((result) => console.log(result))
  .catch((error) => console.error('Failed', error))
```

### Задание 42: Async генератор

```javascript
async function* loadPages(url, pageSize = 10) {
  let page = 1
  let hasMore = true

  while (hasMore) {
    const response = await fetch(`${url}?page=${page}&size=${pageSize}`)
    const data = await response.json()

    yield data.items

    hasMore = data.hasMore
    page++
  }
}

// Использование
for await (const page of loadPages('/api/items')) {
  console.log(page)
}
```

**Идея:** генератор позволяет загружать данные порциями (лениво), не загружая всё сразу.

---

Если при разборе какого‑то задания чувствуешь, что рассуждения «висят в воздухе» —
вернись к соответствующей главе 8–11 и перечитай теоретический блок перед повторной попыткой.
