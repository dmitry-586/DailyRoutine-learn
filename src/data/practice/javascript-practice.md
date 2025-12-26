# Практикум по основам JavaScript, DOM и асинхронности

Эта глава — **чистая практика**. Здесь нет новых концепций, только задачи и сценарии, которые помогают закрепить материал глав 8–11:

- типы данных и приведение типов;
- области видимости, hoisting, `var / let / const`;
- функции, `this`, замыкания и прототипы;
- работа с DOM и событиями;
- асинхронность, Event Loop, промисы и `async/await`.

Рекомендуемый формат работы:

1. Прочитай условие, **предскажи результат** или набросай решение в голове.
2. Запиши решение в редакторе.
3. Запусти код в консоли браузера / Node и сравни результат со своей гипотезой.
4. Если результат отличается — разберись, **на каком шаге твоё mental‑model расходится с реальным поведением JS**.

---

## 12.1. Тест на типы и приведение

### Задание 1

Предскажи результат и объясни **почему так**:

```javascript
console.log('5' + 3)
console.log('5' - 3)
console.log(true + 1)
console.log(false == 0)
console.log(null == undefined)
console.log([] == 0)
console.log([1, 2] + [3, 4])
```

**Проверь себя:** запусти в консоли и поясни для каждого выражения:

- какой оператор сработал (конкатенация vs арифметика);
- какие приведения типов применились;
- где сравнение было строгим, а где с приведением.

### Задание 2

Заполни пропуски так, чтобы условие выполнялось:

```javascript
// должно быть true
console.log(____ == null)
console.log(____ === null)
console.log(____ === undefined)
```

Подумай, в каких случаях уместно использовать `== null`, а в каких — нет.

---

## 12.2. Области видимости и hoisting

### Задание 3

Объясни по шагам, что выведет код и почему:

```javascript
console.log(a)
var a = 10

console.log(b)
let b = 20
```

Ответь на вопросы:

- что именно поднимается при hoisting для `var` и `let`;
- почему в первом случае `undefined`, а во втором — ошибка.

### Задание 4

Перепиши код так, чтобы он **не кидал ошибок** и вел себя предсказуемо:

```javascript
if (true) {
  var x = 5
}

function log() {
  console.log(x)
}

log()
```

Подумай, как бы ты написал это в современном проекте на `let`/`const`.

---

## 12.3. Функции, `this` и замыкания

### Задание 5: потеря контекста

Что выведет код и почему?

```javascript
const user = {
  name: 'Alice',
  say() {
    console.log(this.name)
  },
}

const say = user.say
say()
```

Попробуй:

1. объяснить, куда делся `this`;
2. исправить код так, чтобы он **гарантированно** выводил `'Alice'` при вызове `say()`.

### Задание 6: замыкание‑счётчик

Реализуй функцию `createCounter`, которая работает так:

```javascript
const counter = createCounter()

counter() // 1
counter() // 2
counter() // 3
```

Требования:

- счётчик должен хранить внутреннее состояние **без глобальных переменных**;
- состояние должно быть недоступно снаружи напрямую.

### Задание 7: цикл и setTimeout

Сделай так, чтобы код выводил `0, 1, 2` (а не `3, 3, 3`):

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10)
}
```

Найди **два разных решения**:

1. с использованием `let`;
2. без `let`, только средствами ES5.

---

## 12.4. Прототипы и классы

### Задание 8: функция‑конструктор

Реализуй функцию‑конструктор `User`, чтобы код внизу работал:

```javascript
function User(/* ... */) {
  // твой код
}

User.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`)
}

const u = new User('Alex')
u.sayHi() // Hi, I'm Alex
```

Условия:

- имя должно передаваться в конструктор;
- метод `sayHi` должен быть общим для всех экземпляров (в прототипе).

### Задание 9: класс и наследование

Перепиши предыдущее решение на ES6‑классы с наследованием:

```javascript
class User {
  // ...
}

class Admin extends User {
  // ...
}

const admin = new Admin('Root')
admin.sayHi() // Hi, I'm Root
admin.isAdmin() // true (например, лог в консоль)
```

Сфокусируйся на:

- использовании `extends`;
- вызове `super` в конструкторе;
- размещении общих методов в прототипе через синтаксис класса.

---

## 12.5. DOM и события

### Задание 10: делегирование

У тебя есть HTML:

```html
<ul id="list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

Сделай с помощью делегирования так, чтобы при клике на любой `li` в консоль выводился его текст.

Условия:

- **не** вешай обработчик на каждый `li` отдельно;
- используй один `addEventListener` на `ul#list`.

### Задание 11: безопасная вставка

Реализуй функцию `renderMessage(el, text)`, которая выводит текст в элемент и **гарантированно защищена от XSS**:

```javascript
function renderMessage(el, text) {
  // твой код
}

renderMessage(container, '<script>alert(1)</script>')
```

Подсказка: вспомни разницу между `innerHTML` и `textContent`.

---

## 12.6. Event Loop и асинхронность

### Задание 12: порядок логов

Предскажи порядок вывода и объясни, почему именно такой:

```javascript
console.log('A')

setTimeout(() => console.log('B'), 0)

Promise.resolve()
  .then(() => console.log('C'))
  .then(() => console.log('D'))

console.log('E')
```

Объяснение должно опираться на:

- синхронный код;
- очередь microtasks;
- очередь macrotasks.

### Задание 13: параллельные запросы

Есть функция:

```javascript
async function loadUserAndPosts(userId) {
  const userResponse = await fetch(`/api/users/${userId}`)
  const postsResponse = await fetch(`/api/users/${userId}/posts`)

  const user = await userResponse.json()
  const posts = await postsResponse.json()

  return { user, posts }
}
```

Перепиши её так, чтобы оба запроса выполнялись **параллельно**, а не последовательно.

### Задание 14: обработка ошибок

Перепиши функцию из предыдущего задания так, чтобы она:

- корректно обрабатывала сетевые и HTTP‑ошибки;
- выбрасывала понятное исключение при неуспехе;
- позволяла верхнему уровню (вызову) решить, что делать при ошибке.

Используй `async/await` и `try/catch`.

---

## 12.7. Дополнительные задания по типам и приведению

### Задание 15: Truthy и Falsy

Определи, какие из этих выражений вернут `true`, а какие — `false`:

```javascript
console.log(Boolean(0))
console.log(Boolean('0'))
console.log(Boolean([]))
console.log(Boolean({}))
console.log(Boolean(null))
console.log(Boolean(undefined))
console.log(Boolean(NaN))
console.log(Boolean(''))
```

Объясни логику: почему пустой массив — truthy, а пустая строка — falsy?

### Задание 16: Сложное приведение

Предскажи результат и объясни каждый шаг:

```javascript
console.log(![] == [])
console.log(!{} == {})
console.log([] + {})
console.log({} + [])
console.log([].toString())
console.log({}.toString())
```

### Задание 17: Операторы сравнения

Что вернёт каждое выражение и почему:

```javascript
console.log(0 == false)
console.log(0 === false)
console.log('' == false)
console.log('' === false)
console.log(null == undefined)
console.log(null === undefined)
console.log(NaN == NaN)
console.log(NaN === NaN)
```

### Задание 18: Примитивы vs объекты

Объясни разницу в поведении:

```javascript
let a = 5
let b = a
b = 10
console.log(a, b) // ?

const obj1 = { x: 1 }
const obj2 = obj1
obj2.x = 2
console.log(obj1.x, obj2.x) // ?

const arr1 = [1, 2]
const arr2 = arr1
arr2.push(3)
console.log(arr1, arr2) // ?
```

---

## 12.8. Дополнительные задания по областям видимости

### Задание 19: Вложенные области видимости

Что выведет код и почему:

```javascript
let x = 1

function outer() {
  let x = 2

  function inner() {
    console.log(x)
  }

  inner()
}

outer()
console.log(x)
```

### Задание 20: var в циклах и функциях

Объясни поведение:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}

function test() {
  for (var j = 0; j < 3; j++) {
    // ...
  }
  console.log(j) // что выведет?
}

test()
```

### Задание 21: const и объекты

Почему это работает, хотя `const` должен быть константой:

```javascript
const obj = { count: 0 }
obj.count = 5
console.log(obj.count) // ?

const arr = [1, 2]
arr.push(3)
console.log(arr) // ?
```

### Задание 22: Function Declaration vs Expression

Что выведет код и почему:

```javascript
console.log(fn1)
console.log(fn2)

function fn1() {
  return 'declaration'
}

const fn2 = function () {
  return 'expression'
}
```

---

## 12.9. Дополнительные задания по this и замыканиям

### Задание 23: this в разных контекстах

Предскажи результат:

```javascript
const obj = {
  name: 'Alice',
  regular: function () {
    console.log(this.name)
  },
  arrow: () => {
    console.log(this.name)
  },
}

obj.regular()
obj.arrow()

const { regular, arrow } = obj
regular()
arrow()
```

### Задание 24: call, apply, bind

Реализуй функцию `multiply`, которая работает так:

```javascript
function multiply(a, b) {
  // твой код
}

const double = multiply.bind(null, 2)
console.log(double(5)) // 10

const triple = multiply.bind(null, 3)
console.log(triple(4)) // 12
```

### Задание 25: Замыкание с параметрами

Создай функцию `createMultiplier(factor)`, которая возвращает функцию-умножитель:

```javascript
const multiplyBy2 = createMultiplier(2)
const multiplyBy5 = createMultiplier(5)

console.log(multiplyBy2(3)) // 6
console.log(multiplyBy5(4)) // 20
```

### Задание 26: Модульный паттерн

Реализуй модуль с приватными переменными:

```javascript
const counter = (function () {
  // твой код
})()

counter.increment()
counter.increment()
console.log(counter.getValue()) // 2
// counter.count недоступен снаружи
```

### Задание 27: this в классах

Что выведет код:

```javascript
class Button {
  constructor(label) {
    this.label = label
  }

  click() {
    console.log(this.label)
  }

  clickArrow = () => {
    console.log(this.label)
  }
}

const btn = new Button('Submit')
const { click, clickArrow } = btn

btn.click()
btn.clickArrow()
click()
clickArrow()
```

---

## 12.10. Дополнительные задания по прототипам и классам

### Задание 28: Цепочка прототипов

Объясни, что происходит:

```javascript
function Animal(name) {
  this.name = name
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`)
}

function Dog(name) {
  Animal.call(this, name)
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.speak = function () {
  console.log(`${this.name} barks`)
}

const dog = new Dog('Rex')
dog.speak()
console.log(dog instanceof Dog)
console.log(dog instanceof Animal)
```

### Задание 29: Статические методы

Реализуй класс `MathUtils` со статическими методами:

```javascript
class MathUtils {
  // твой код
}

console.log(MathUtils.sum(1, 2, 3)) // 6
console.log(MathUtils.average(10, 20, 30)) // 20
```

### Задание 30: Геттеры и сеттеры

Создай класс `Temperature` с геттером и сеттером:

```javascript
class Temperature {
  // твой код
}

const temp = new Temperature()
temp.celsius = 25
console.log(temp.fahrenheit) // 77
temp.fahrenheit = 86
console.log(temp.celsius) // 30
```

---

## 12.11. Дополнительные задания по DOM

### Задание 31: Динамическое создание списка

Создай функцию, которая принимает массив строк и создаёт `<ul>` с элементами:

```javascript
function createList(items, containerId) {
  // твой код
}

createList(['Apple', 'Banana', 'Cherry'], 'app')
```

### Задание 32: Удаление элементов

Реализуй функцию `removeElements(selector)`, которая удаляет все элементы по селектору:

```javascript
function removeElements(selector) {
  // твой код
}

removeElements('.to-remove')
```

### Задание 33: Переключение классов

Создай функцию `toggleClass(el, className)`, которая добавляет класс, если его нет, и удаляет, если есть:

```javascript
function toggleClass(el, className) {
  // твой код
}
```

### Задание 34: Обработка формы

Реализуй обработчик формы, который:

- предотвращает стандартную отправку;
- собирает данные из всех полей;
- выводит объект с данными в консоль.

```javascript
const form = document.getElementById('myForm')
// твой код
```

### Задание 35: Debounce

Реализуй функцию `debounce(func, delay)`, которая откладывает вызов функции:

```javascript
function debounce(func, delay) {
  // твой код
}

const handleInput = debounce((value) => {
  console.log('Search:', value)
}, 300)

// При быстром вводе функция вызовется только после паузы 300мс
```

---

## 12.12. Дополнительные задания по Event Loop и асинхронности

### Задание 36: Сложный порядок выполнения

Предскажи порядок логов:

```javascript
console.log('1')

setTimeout(() => console.log('2'), 0)

Promise.resolve()
  .then(() => {
    console.log('3')
    return Promise.resolve()
  })
  .then(() => console.log('4'))

queueMicrotask(() => console.log('5'))

console.log('6')
```

### Задание 37: Promise.all vs Promise.allSettled

Реализуй функцию `loadAllSettled(urls)`, которая загружает несколько URL и возвращает результаты всех, даже если некоторые запросы упали.

Требования:

- используй `Promise.allSettled`;
- функция должна возвращать массив объектов с полями `url`, `data` (если успех) или `error` (если ошибка), и `success` (boolean);
- все запросы должны выполняться параллельно.

Пример использования:

```javascript
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

### Задание 38: Promise.race для timeout

Создай функцию `timeout(promise, ms)`, которая отклоняет промис, если он не выполнился за указанное время:

- используй `Promise.race`;
- если исходный промис выполнится быстрее — верни его результат;
- если истечёт таймаут — верни ошибку с сообщением `'Timeout'`.

```javascript
function timeout(promise, ms) {
  // твой код
}

timeout(fetch('/api/data'), 5000)
  .then((data) => console.log(data))
  .catch((error) => console.error('Timeout or error', error))
```

### Задание 39: Последовательные запросы

Реализуй функцию, которая делает запросы последовательно (каждый следующий только после успеха предыдущего):

```javascript
async function loadSequentially(urls) {
  // твой код
}

loadSequentially(['/api/1', '/api/2', '/api/3'])
```

### Задание 40: Retry механизм

Создай функцию `retry(fn, maxAttempts)`, которая повторяет вызов функции при ошибке:

```javascript
async function retry(fn, maxAttempts = 3) {
  // твой код
}

retry(() => fetch('/api/unstable'), 3)
```

### Задание 41: Обработка ошибок в цепочке

Что не так с этим кодом и как это исправить:

```javascript
async function process() {
  try {
    const data = await fetch('/api/data')
    return data.json()
  } catch (error) {
    console.error(error)
  }
}

process().then((result) => {
  console.log(result) // что будет, если запрос упадёт?
})
```

**Вопросы для размышления:**

1. Что вернёт функция `process()`, если `fetch` упадёт с ошибкой?
2. Что вернёт функция, если `fetch` вернёт HTTP 404 или 500?
3. Как исправить код, чтобы ошибки корректно обрабатывались и пробрасывались дальше?

### Задание 42: Async генератор

Реализуй асинхронный генератор, который загружает данные порциями:

```javascript
async function* loadPages(url, pageSize = 10) {
  // твой код
}

for await (const page of loadPages('/api/items')) {
  console.log(page)
}
```

---

## Как использовать этот практикум дальше

- Возвращайся к этим задачам через 1–2 недели и реши их **ещё раз** без подсказок.
- Если какая‑то задача вызывает трудности — вернись к соответствующей главе (8–11) и перечитай именно тот раздел, который связан с проблемой.
- Придумай к каждому блоку **ещё по 1–2 своих варианта задач**:
  - дополнительный пример на делегирование;
  - ещё один кейс с потерей контекста `this`;
  - свой сценарий race condition в асинхронном коде.

Цель этого раздела — не зазубрить синтаксис, а натренировать **правильное ментальное модель**: понимать, _почему_ код ведёт себя именно так, а не иначе. Когда эта модель устойчива, любые собеседовательские «угадай вывод» превращаются в спокойную пошаговую задачу.

---

> **Разбор решений** ко всем заданиям (включая новые) находится в следующей главе.
