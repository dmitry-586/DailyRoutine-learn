# Глава 11. Функции, this, замыкания и прототипы

В предыдущей главе мы разобрали фундамент: типы, области видимости, Execution Context. Теперь — **ядро JavaScript‑механики**, без которой невозможно уверенно чувствовать себя на mid‑/senior‑собеседованиях:

- как вычисляется `this` в разных контекстах;
- чем отличаются обычные и стрелочные функции;
- что такое замыкания и зачем они нужны в реальном коде;
- как устроены прототипы и классы под капотом;
- как работают модули и современные синтаксические конструкции.

Эта глава снимает большую часть «магии» вокруг языка.

---

## 9.1. `this`: простая система из нескольких правил

Главное, что нужно запомнить:

> **`this` в JavaScript определяется в момент вызова функции, а не в момент её объявления.**

И есть несколько базовых сценариев, по которым вычисляется `this`.

### 1. Глобальный контекст

В браузере:

```javascript
console.log(this) // window
```

В строгом режиме (`'use strict'`):

```javascript
'use strict'
console.log(this) // undefined
```

### 2. Вызов как метод объекта: `obj.method()`

```javascript
const user = {
  name: 'Alex',
  say() {
    console.log(this.name)
  },
}

user.say() // 'Alex'
```

**Правило:** `this` — объект **слева от точки** в момент вызова.

### 3. Обычный вызов функции: `fn()`

```javascript
function say() {
  console.log(this)
}

say() // в нестрогом режиме: window, в strict: undefined
```

Если функция вызывается **без объекта слева**, в строгом режиме `this` будет `undefined`.

### 4. Явная привязка: `call`, `apply`, `bind`

```javascript
function show() {
  console.log(this.name)
}

const obj = { name: 'Bob' }

show.call(obj) // 'Bob'
show.apply(obj) // 'Bob'

const bound = show.bind(obj)
bound() // 'Bob'
```

- `call(context, ...args)` — вызывает функцию сразу, аргументы через запятую;
- `apply(context, argsArray)` — вызывает функцию сразу, аргументы массивом;
- `bind(context)` — **создаёт новую функцию** с зафиксированным `this`.

### 5. Вызов через `new`: конструктор

```javascript
function User(name) {
  this.name = name
}

const u = new User('Alice')
console.log(u.name) // 'Alice'
```

При вызове с `new` движок:

1. создаёт новый объект;
2. связывает его прототип с `User.prototype`;
3. вызывает функцию с `this = новый объект`;
4. возвращает `this` (если явно не вернуть другой объект).

**Резюме по `this`:**

При ответе на собеседовании достаточно уверенно проговорить **эти 5 сценариев**.

---

## 9.2. Стрелочные функции и `this`

Стрелочные функции были добавлены в ES6 и решают две основные задачи:

1. короткий синтаксис для коллбеков;
2. удобная работа с `this` внутри методов и классов.

### Ключевые особенности стрелок

Стрелочная функция **не имеет собственного**:

- `this`;
- `arguments`;
- `super`;
- `new.target`;
- прототипа (нельзя вызывать через `new`).

```javascript
const obj = {
  value: 42,
  printLater() {
    setTimeout(() => {
      console.log(this.value)
    }, 100)
  },
}

obj.printLater() // 42
```

Здесь стрелка **наследует `this` из внешней функции `printLater`**, которая была вызвана как метод объекта.

### Где стрелки плохи

```javascript
const user = {
  name: 'Alice',
  say: () => {
    console.log(this.name)
  },
}

user.say() // undefined
```

Причина:

- `say` — стрелка, она не создаёт свой `this`;
- `this` берётся из внешнего лексического окружения (глобальный контекст);
- там `name` нет.

**Практическое правило:**

- стрелки — **для коллбеков, маленьких функций, методов, завязаных на внешний `this`** (как в примере с `setTimeout`);
- обычные функции — **для методов объектов, конструкторов, когда `this` должен зависеть от способа вызова**.

---

## 9.3. Потеря контекста: частая причина багов

Классическая ловушка:

```javascript
const user = {
  name: 'Alice',
  say() {
    console.log(this.name)
  },
}

setTimeout(user.say, 1000) // что выведет?
```

Результат: `undefined` (или ошибка в строгом режиме).

**Почему:**

- в `setTimeout` передаётся **ссылка на функцию**, а не «вызов как метод»;
- когда движок позже вызывает этот коллбек, он делает это как `fn()`, без объекта слева → `this` теряется.

**Правильные варианты:**

```javascript
setTimeout(() => user.say(), 1000)
// или
setTimeout(user.say.bind(user), 1000)
```

То же самое происходит при работе с методами классов и реакт‑компонентами.

---

## 9.4. Замыкания (Closures) без магии

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
```

`count` продолжает жить в памяти, пока существует хотя бы одно замыкание (внутренняя функция), которое на него ссылается.

### Важно: замыкание — это **ссылка**, а не копия

Новички часто думают, что внутренняя функция запомнила «значение на момент создания». На самом деле она хранит **ссылку на переменную**.

Это объясняет и классическую задачу с циклом:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10)
}
// 3 3 3
```

`var` создаёт **одну переменную `i`** на весь цикл, и все стрелочные функции смотрят в одно и то же место в памяти.

Правильные варианты:

```javascript
// 1. let даёт новую переменную i на каждую итерацию
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10)
}

// 2. IIFE (исторический паттерн)
for (var i = 0; i < 3; i++) {
  ;((j) => {
    setTimeout(() => console.log(j), 10)
  })(i)
}
```

### Практическое использование замыканий

- инкапсуляция состояния (счётчики, кэши);
- фабрики функций с преднастроенными параметрами;
- мемоизация;
- приватные данные до появления `#private` полей в классах.

```javascript
function createUser(name) {
  let secret = 'hidden'

  return {
    getName() {
      return name
    },
    getSecret() {
      return secret
    },
  }
}

const u = createUser('Bob')
u.getSecret() // 'hidden', прямого доступа к secret нет
```

---

## 9.5. Функции высшего порядка, каррирование и частичное применение

**Функция высшего порядка (Higher-Order Function, HOF)** — это функция, которая:

- принимает другую функцию как аргумент **или**
- возвращает функцию как результат.

Встроенные примеры: `map`, `filter`, `reduce`, `forEach`, `sort`.

```javascript
function withLogging<T extends unknown[], R>(fn: (...args: T) => R) {
  return (...args: T): R => {
    console.log('Calling with', args)
    return fn(...args)
  }
}

const sum = (a: number, b: number) => a + b
const loggedSum = withLogging(sum)

loggedSum(4, 5) // лог + 9
```

### Каррирование (currying)

Каррирование — превращение:

```text
f(a, b, c)
```

в:

```text
f(a)(b)(c)
```

Это удобно, когда часть аргументов известна заранее.

### Частичное применение (partial application)

Частичное применение — когда мы фиксируем **часть аргументов**, а остальные передаём позже.

```javascript
function partial(fn, ...fixed) {
  return (...rest) => fn(...fixed, ...rest)
}

const multiply = (a, b, c) => a * b * c
const double = partial(multiply, 2)

double(3, 4) // 24
```

На практике подобные приёмы часто видны в:

- middleware;
- логгерах;
- валидации;
- функциональных утилитах (`lodash/fp`, `ramda`).

---

## 9.5.1. Методы массивов: map, filter, reduce и другие

Методы массивов — это основа функционального программирования в JavaScript. Они позволяют работать с данными декларативно, без явных циклов.

### map: трансформация элементов

`map` создаёт новый массив, применяя функцию к каждому элементу исходного массива.

**Синтаксис:**

```javascript
const newArray = array.map((element, index, array) => {
  // возвращаем новое значение
  return transformedValue
})
```

**Примеры:**

```javascript
// Удвоить каждое число
const numbers = [1, 2, 3, 4]
const doubled = numbers.map((n) => n * 2)
// [2, 4, 6, 8]

// Извлечь имена из объектов пользователей
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
]
const names = users.map((user) => user.name)
// ['Alice', 'Bob']

// Преобразовать в другой формат
const prices = [10, 20, 30]
const formatted = prices.map((price) => `$${price.toFixed(2)}`)
// ['$10.00', '$20.00', '$30.00']
```

**Важно:**

- `map` **не изменяет** исходный массив (создаёт новый);
- всегда возвращает массив той же длины;
- если функция ничего не возвращает, в новом массиве будут `undefined`.

### filter: фильтрация элементов

`filter` создаёт новый массив, содержащий только те элементы, для которых функция возвращает `true`.

**Синтаксис:**

```javascript
const filtered = array.filter((element, index, array) => {
  return condition // true или false
})
```

**Примеры:**

```javascript
// Оставить только чётные числа
const numbers = [1, 2, 3, 4, 5, 6]
const evens = numbers.filter((n) => n % 2 === 0)
// [2, 4, 6]

// Найти активных пользователей
const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
]
const activeUsers = users.filter((user) => user.active)
// [{ id: 1, name: 'Alice', active: true }, { id: 3, name: 'Charlie', active: true }]

// Удалить пустые значения
const data = [1, null, 2, undefined, 3, '', 4]
const clean = data.filter((item) => item != null && item !== '')
// [1, 2, 3, 4]
```

**Важно:**

- `filter` **не изменяет** исходный массив;
- возвращает массив, длина которого может быть меньше исходного;
- функция должна возвращать `true` или `false` (truthy/falsy значения тоже работают).

### reduce: агрегация данных

`reduce` — самый мощный метод массивов. Он сводит массив к одному значению, применяя функцию-аккумулятор.

**Синтаксис:**

```javascript
const result = array.reduce((accumulator, currentValue, index, array) => {
  // возвращаем новое значение аккумулятора
  return newAccumulator
}, initialValue)
```

**Примеры:**

```javascript
// Сумма чисел
const numbers = [1, 2, 3, 4, 5]
const sum = numbers.reduce((acc, n) => acc + n, 0)
// 15

// Подсчёт количества элементов по условию
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' },
]
const adminCount = users.reduce((count, user) => {
  return user.role === 'admin' ? count + 1 : count
}, 0)
// 2

// Группировка по ключу
const items = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
]
const grouped = items.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = []
  }
  acc[item.category].push(item)
  return acc
}, {})
// { fruit: [{ category: 'fruit', name: 'apple' }, ...], vegetable: [...] }

// Преобразование массива в объект
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]
const usersMap = users.reduce((acc, user) => {
  acc[user.id] = user
  return acc
}, {})
// { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }
```

**Важно:**

- `reduce` **не изменяет** исходный массив;
- начальное значение (`initialValue`) важно — без него первый элемент становится аккумулятором;
- можно использовать для любых операций агрегации: суммирование, группировка, поиск максимума/минимума.

### Комбинирование методов

Методы массивов можно комбинировать, создавая цепочки трансформаций:

```javascript
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 20, active: true },
  { name: 'David', age: 35, active: true },
]

// Найти имена активных пользователей старше 21 года
const result = users
  .filter((user) => user.active && user.age > 21)
  .map((user) => user.name)
// ['Alice', 'David']

// Подсчитать средний возраст активных пользователей
const activeUsers = users.filter((user) => user.active)
const avgAge =
  activeUsers.reduce((sum, user) => sum + user.age, 0) / activeUsers.length
// 26.67 (сумма возрастов: 25 + 20 + 35 = 80, делим на 3 = 26.67)
```

### Другие важные методы массивов

**forEach: выполнение действия для каждого элемента**

```javascript
const numbers = [1, 2, 3]
numbers.forEach((n, index) => {
  console.log(`Index ${index}: ${n}`)
})
// Index 0: 1
// Index 1: 2
// Index 2: 3
```

**Важно:** `forEach` не возвращает значение (возвращает `undefined`). Используй `map`, если нужно создать новый массив.

**find: поиск первого элемента**

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]
const user = users.find((u) => u.id === 2)
// { id: 2, name: 'Bob' }
```

**some: проверка, есть ли хотя бы один элемент**

```javascript
const numbers = [1, 2, 3, 4, 5]
const hasEven = numbers.some((n) => n % 2 === 0)
// true
```

**every: проверка, все ли элементы соответствуют условию**

```javascript
const numbers = [2, 4, 6, 8]
const allEven = numbers.every((n) => n % 2 === 0)
// true
```

**flat: выравнивание вложенных массивов**

```javascript
const nested = [1, [2, 3], [4, [5, 6]]]
const flat = nested.flat(2) // глубина 2
// [1, 2, 3, 4, 5, 6]
```

**flatMap: map + flat в одном**

```javascript
const words = ['hello world', 'foo bar']
const letters = words.flatMap((word) => word.split(' '))
// ['hello', 'world', 'foo', 'bar']

// Эквивалентно:
const letters2 = words.map((word) => word.split(' ')).flat()
// ['hello', 'world', 'foo', 'bar']
```

**sort: сортировка (мутирует массив!)**

```javascript
const numbers = [3, 1, 4, 1, 5]
numbers.sort((a, b) => a - b) // по возрастанию
// [1, 1, 3, 4, 5]

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
]
users.sort((a, b) => a.age - b.age) // по возрасту
```

**⚠️ Важно:** `sort` **мутирует** исходный массив. Если нужно сохранить исходный, создай копию:

```javascript
const sorted = [...numbers].sort((a, b) => a - b)
```

### Когда что использовать

- **map** — когда нужно преобразовать каждый элемент в новый формат;
- **filter** — когда нужно оставить только часть элементов;
- **reduce** — когда нужно свести массив к одному значению (сумма, произведение, группировка, поиск максимума);
- **find** — когда нужно найти один элемент по условию;
- **some/every** — когда нужно проверить наличие элементов;
- **forEach** — когда нужно выполнить действие для каждого элемента без создания нового массива.

### Производительность

- `map`, `filter`, `reduce` создают новые массивы — это может быть дорого для больших данных;
- для простых операций циклы `for` могут быть быстрее;
- но читаемость и декларативность часто важнее микрооптимизаций;
- современные движки JavaScript хорошо оптимизируют методы массивов.

---

## 9.6. Прототипная модель: как работает `new` и `prototype`

JavaScript — **прототипно‑ориентированный** язык. Классы в ES6 — это **синтаксический сахар**, а не новая модель.

### Что такое прототип

У каждого объекта есть скрытая ссылка `[[Prototype]]` (в браузерах — `__proto__`), которая указывает на другой объект.

При обращении к `user.name` движок делает:

1. ищет `name` в самом объекте `user`;
2. если нет — идёт по цепочке в прототип: `Object.getPrototypeOf(user)`;
3. так доходит до `Object.prototype`;
4. если не нашёл — возвращает `undefined`.

Это и есть **цепочка прототипов (prototype chain)**.

### Функции‑конструкторы и свойство `prototype`

```javascript
function User(name) {
  this.name = name
}

User.prototype.say = function () {
  console.log(this.name)
}

const u = new User('Alex')
u.say() // 'Alex'
```

Здесь происходит следующее:

- у функции `User` есть объект `User.prototype`;
- при вызове `new User()` движок создаёт новый объект и делает:

```javascript
instance.__proto__ === User.prototype // true
```

То есть все методы, записанные в `User.prototype`, становятся доступны всем экземплярам.

### Алгоритм `new` в 4 шага

Условно:

1. создаётся пустой объект `{}`;
2. его прототип связывается с `Constructor.prototype`;
3. вызывается конструктор с `this = новый объект`;
4. если конструктор вернул объект — он и будет результатом; иначе вернётся `this`.

Это любят спрашивать на собеседованиях, чтобы проверить понимание прототипной модели.

---

## 9.7. ES6‑классы: синтаксический сахар над прототипами

Современный синтаксис:

```javascript
class Animal {
  constructor(name) {
    this.name = name
  }

  eat() {
    console.log(this.name, 'eats')
  }
}

class Dog extends Animal {
  bark() {
    console.log(this.name, 'barks')
  }
}

const d = new Dog('Rex')
d.eat() // 'Rex eats'
d.bark() // 'Rex barks'
```

Под капотом это всё те же **функции‑конструкторы и прототипы**.

### Важные особенности классов

- классы **не поднимаются** как Function Declaration;
- внутри классов по умолчанию strict mode;
- методы автоматически попадают в `prototype`;
- класс нельзя вызвать без `new`.

### `super` и наследование

```javascript
class A {
  say() {
    console.log('A')
  }
}

class B extends A {
  say() {
    super.say()
    console.log('B')
  }
}

new B().say() // A \n B
```

- `super()` в конструкторе — вызов конструктора родителя (обязательно до `this`);
- `super.method()` — вызов метода родителя.

### Приватные поля (#)

Современный стандарт приватности:

```javascript
class User {
  #password = 'secret'

  getPassword() {
    return this.#password
  }
}
```

Доступ к `#password` возможен только внутри класса.

---

## 9.8. Модули: ES Modules и CommonJS

Сегодня ты почти наверняка встретишь **оба подхода**:

### ES Modules (ESM)

```javascript
// sum.js
export const sum = (a, b) => a + b

// usage
import { sum } from './sum.js'
```

Особенности:

- статический импорт (известен на этапе сборки);
- позволяет tree‑shaking;
- стандарт для браузеров и современного Node.js.

### CommonJS (CJS)

```javascript
// sum.cjs
module.exports = (a, b) => a + b

// usage
const sum = require('./sum.cjs')
```

Особенности:

- динамический импорт (можно вызывать `require` в любом месте кода);
- исторический стандарт для Node.js;
- в новых фронтенд‑проектах ESM — предпочтительный вариант.

---

## 9.9. Современный синтаксис: destructuring, spread, rest

Эти конструкции облегчают работу с объектами, массивами и аргументами функций.

### Деструктуризация

```javascript
const user = { name: 'Alex', age: 25 }
const { name, age } = user

const arr = [1, 2, 3]
const [first, second] = arr
```

С дефолтами и переименованием:

```javascript
const { role = 'user', name: username } = data
```

### Spread и rest

```javascript
const arr2 = [...arr1, 4, 5]

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0)
}

sum(1, 2, 3) // 6
```

Также важны:

- **optional chaining** `?.`;
- **nullish coalescing** `??`;
- логические присваивания `||=`, `&&=`, `??=`.

```javascript
user?.profile?.email ?? 'no email'
```

---

## 9.10. Мини‑самопроверка по главе

Проверь, что ты можешь:

- объяснить 5 основных способов, которыми определяется `this`, и привести пример для каждого;
- показать на примере, почему стрелочную функцию нельзя использовать как метод объекта, и где она, наоборот, помогает;
- объяснить, что такое замыкание, почему оно хранит **ссылку**, а не копию значения, и решить задачу с циклом и `setTimeout`;
- рассказать, как работает `new`: какие шаги выполняет движок и как связаны `instance.__proto__` и `Constructor.prototype`;
- объяснить, почему классы в JS — это синтаксический сахар над прототипами, а не «классический ООП»;
- различать ESM и CommonJS и понимать, когда какой формат встречается в реальных проектах.

Если это получается связно и без заучивания, ты прошёл через самую «скользкую» часть механики JavaScript — дальше будет проще связывать это с DOM и асинхронностью.
