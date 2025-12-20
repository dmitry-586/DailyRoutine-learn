# Глава 12. Практикум по основам JavaScript, DOM и асинхронности

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

## 12.7. Как использовать этот практикум дальше

- Возвращайся к этим задачам через 1–2 недели и реши их **ещё раз** без подсказок.
- Если какая‑то задача вызывает трудности — вернись к соответствующей главе (8–11) и перечитай именно тот раздел, который связан с проблемой.
- Придумай к каждому блоку **ещё по 1–2 своих варианта задач**:
  - дополнительный пример на делегирование;
  - ещё один кейс с потерей контекста `this`;
  - свой сценарий race condition в асинхронном коде.

Цель этого раздела — не зазубрить синтаксис, а натренировать **правильное ментальное модель**: понимать, _почему_ код ведёт себя именно так, а не иначе. Когда эта модель устойчива, любые собеседовательские «угадай вывод» превращаются в спокойную пошаговую задачу.

---

## 12.8. Ответы к заданиям (раскрой, только если уже попробовал сам)

> Рекомендуется сначала честно попытаться решить задачу, а уже потом раскрывать ответы.

### Ответы к заданиям 1–2 (типы и приведение)

#### Задание 1

```javascript
'5' + 3         // '53' — сработала конкатенация строки и числа
'5' - 3         // 2 — оператор '-' приводит обе стороны к number
true + 1        // 2 — true → 1, 1 + 1 = 2
false == 0      // true — нестрогое сравнение, false → 0
null == undefined // true — спец‑правило абстрактного сравнения
[] == 0         // true — [] → '' → 0 при приведении к числу
[1, 2] + [3, 4] // '1,23,4' — массивы приводятся к строкам ('1,2' + '3,4')
```

#### Задание 2 (один из возможных вариантов)

```javascript
console.log(null == null) // true
console.log(null === null) // true
console.log(undefined === undefined) // true
```

Смысл:

- `== null` часто используют, чтобы проверить «`null` или `undefined`» сразу;
- `=== null` и `=== undefined` — для строгой проверки конкретного значения.

### Ответы к заданиям 3–4 (scope и hoisting)

#### Задание 3

```javascript
console.log(a) // undefined — объявление var a поднято, но значение ещё не присвоено
var a = 10

console.log(b) // ReferenceError — b в TDZ до строки let b = 20
let b = 20
```

- `var` поднимает объявление и инициализирует `a` как `undefined`;
- `let` тоже поднимается, но попадает в Temporal Dead Zone до фактической инициализации.

#### Задание 4 (один из вариантов на let/const)

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

Или с блочной областью видимости, если `x` нужен только внутри:

```javascript
if (true) {
  const x = 5
  function log() {
    console.log(x)
  }
  log()
}
```

### Ответы к заданиям 5–7 (this и замыкания)

#### Задание 5

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

`this` потерялся, потому что функция вызывается как обычная (`fn()`), без объекта слева.

Исправление (один из вариантов):

```javascript
const say = user.say.bind(user)
say() // 'Alice'
```

#### Задание 6 (пример решения)

```javascript
function createCounter() {
  let count = 0

  return function () {
    count += 1
    return count
  }
}
```

#### Задание 7

1. С `let`:

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10)
}
```

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

### Ответы к заданиям 8–9 (прототипы и классы)

#### Задание 8

```javascript
function User(name) {
  this.name = name
}

User.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`)
}
```

#### Задание 9

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

Главное: `extends` для наследования и `super(name)` для вызова конструктора родителя.

### Ответы к заданиям 10–11 (DOM и события)

#### Задание 10

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

#### Задание 11

```javascript
function renderMessage(el, text) {
  el.textContent = text
}
```

Используем `textContent`, чтобы не исполнять HTML/JS из строки.

### Ответы к заданиям 12–14 (Event Loop и async)

#### Задание 12

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

- сначала весь синхронный код (`A`, затем `E`);
- затем очередь microtasks (`C`, `D`);
- затем первая macrotask (`B`).

#### Задание 13

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

#### Задание 14 (упрощённый пример)

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
