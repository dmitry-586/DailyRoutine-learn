# Глава 9. Глубокая механика JavaScript

Эта глава — ключевая для уровня Middle и Strong Middle. Именно здесь чаще всего «отваливаются» кандидаты: this, замыкания, прототипы и модули проверяют не знание синтаксиса, а понимание того, как язык работает под капотом.

Функции — центральная сущность JavaScript. Это не просто способ повторного использования кода, а фундамент механизма:

- области видимости
- замыканий
- контекста исполнения
- прототипов
- классов

Но главная причина путаницы в JS — это контекст (this). Часто говорят: «this в JS ведёт себя странно». На самом деле он ведёт себя строго и логично, если понимать правила.

Эта глава объясняет:

1. Виды функций
2. Как создаются функции
3. Как работает this
4. Отличие call / apply / bind
5. Отличие стрелочных функций
6. Замыкания
7. Прототипы
8. Модули
9. Важные edge-cases из реальных собеседований

---

## 9.1. this: правила вычисления контекста

this — не свойство функции, а значение, определяемое в момент вызова.

**Главное правило JS:**

this определяется в момент вызова, а не в момент объявления.

Но важно понимать: стрелочные функции — исключение (they capture lexical this).

### 5 основных правил определения this

**1. Global context:**

```javascript
console.log(this) // window (в браузере)
```

**В strict mode:**

```javascript
'use strict'
console.log(this) // undefined
```

**2. Method call: obj.method()**

```javascript
const user = {
  name: 'Alex',
  say() {
    console.log(this.name)
  },
}

user.say() // Alex
```

this = объект слева от точки.

**3. Function call: func()**

```javascript
function say() {
  console.log(this)
}
say() // window / undefined
```

В строгом режиме this = undefined. В нестрогом — глобальный объект (window в браузере).

**4. Explicit binding: call / apply / bind**

```javascript
function show() {
  console.log(this.name)
}
const obj = { name: 'Bob' }

show.call(obj) // "Bob"
show.apply(obj) // "Bob"
show.bind(obj)() // "Bob"
```

**5. new: вызов конструктора**

```javascript
function User(name) {
  this.name = name
}

const u = new User('Alice')
console.log(u.name) // Alice
```

При вызове через new:

- создаётся новый объект
- this указывает на новый объект
- функция возвращает this, если явно не вернуть другой объект

### Arrow functions

Стрелки не имеют собственного this:

```javascript
const obj = {
  name: 'Alex',
  say: () => {
    console.log(this.name)
  },
}
```

this берётся из внешнего контекста.

**Важный принцип:** Стрелочная функция не имеет собственного this. Она берёт this из внешнего lexical environment.

**Пример:**

```javascript
const user = {
  name: 'Alice',
  say: () => console.log(this.name),
}

user.say() // undefined
```

**Почему?**

- стрелка смотрит наружу
- наружу — это глобальная область
- name там нет

---

## 9.2. call, apply, bind — отличия

### call

`fn.call(context, arg1, arg2, arg3...)`

Передача аргументов через запятую. Вызывает функцию сразу.

### apply

`fn.apply(context, [args])`

Передача аргументов массивом. Вызывает функцию сразу. Чаще используется при работе с Math:

```javascript
Math.max.apply(null, [1, 2, 3]) // 3
```

### bind

bind создаёт новую функцию, навсегда привязанную к контексту.

```javascript
const f = fn.bind(obj)
f() // всегда this = obj
```

Это особенно важно в UI:

```javascript
button.addEventListener('click', this.handleClick.bind(this))
```

### Практический пример

```javascript
function greet() {
  console.log(this.name)
}
const user = { name: 'Alex' }

greet.call(user) // Alex
```

---

## 9.3. Стрелочные функции: полное объяснение

У стрелки нет:

- своего this
- arguments
- super
- new.target
- возможности вызываться через new
- прототипа

Это делает стрелку идеальной для:

- коллбэков
- коротких функций
- функционального программирования

Но плохой для методов объектов.

### Правильное использование стрелок

**Хорошо:**

```javascript
arr.map((x) => x * 2)
```

**Плохо:**

```javascript
const obj = {
  name: 'Kate',
  say: () => console.log(this.name),
}
```

Стрелка не создаст свой this, и код станет некорректным.

### this в стрелочных функциях внутри методов

**Паттерн:**

```javascript
const obj = {
  value: 42,
  printLater() {
    setTimeout(() => {
      console.log(this.value) // 42
    }, 100)
  },
}
```

**Почему работает?**

Потому что стрелка берёт this из printLater — а он был вызван как метод.

---

## 9.4. Частые ловушки и edge cases

### Потеря контекста

```javascript
const user = {
  name: 'Alice',
  say() {
    console.log(this.name)
  },
}

setTimeout(user.say, 1000)
```

**Результат:** undefined

**Почему?**

Функция передаётся как callback. При выполнении она вызывается как обычная функция, без объекта слева.

**Решение:**

```javascript
setTimeout(user.say.bind(user), 1000)
```

### this внутри обработчиков

```javascript
button.addEventListener('click', function () {
  console.log(this) // button
})
```

А вот стрелка:

```javascript
button.addEventListener('click', () => {
  console.log(this) // берёт контекст выше (скорее всего window)
})
```

### this в классах

```javascript
class User {
  name = 'Alice'

  say() {
    console.log(this.name)
  }
}

const u = new User()
u.say() // работает
```

Но:

```javascript
const say = u.say
say() // undefined
```

Метод потерял контекст. Это одна из самых частых ошибок Джунов.

**Решение:**

**Привязка в конструкторе:**

```javascript
this.say = this.say.bind(this)
```

**Стрелочные поля класса:**

```javascript
say = () => {
  console.log(this.name)
}
```

### this и прототипное наследование

МЕТОД, НАХОДЯЩИЙСЯ В ПРОТОТИПЕ, ПРИ ВЫЗОВЕ КАК obj.method() ИМЕЕТ this = obj.

```javascript
function User(name) {
  this.name = name
}

User.prototype.say = function () {
  console.log(this.name)
}

const u = new User('Alex')
u.say() // Alex
```

---

## 9.5. Замыкания (Closures)

Замыкание — это функция + её лексическое окружение.

Большинство разработчиков думают, что замыкания — это «функция, запоминающая переменные». Это верно, но это только поверхность.

Чтобы понимать замыкания по-настоящему, нужно понимать:

- как работает Lexical Environment
- как движок хранит ссылки на память
- как формируется цепочка окружений
- что происходит при возврате функции из функции

### Что такое замыкание: простое определение

Замыкание — это функция, которая запоминает своё лексическое окружение даже после того, как внешняя функция завершила выполнение.

**Пример:**

```javascript
function outer() {
  let x = 10

  return function inner() {
    console.log(x)
  }
}

const fn = outer()
fn() // 10
```

**Вопрос на собеседовании:**

Почему inner всё ещё знает о x, несмотря на то что outer уже закончил работу?

**Правильный ответ:**

Потому что inner хранит ссылку на Lexical Environment outer. Это и есть замыкание.

### Lexical Environment: детальное объяснение

Каждая функция при создании запоминает:

- свои локальные переменные
- внешнее окружение

Lexical Environment выглядит примерно так:

```javascript
Inner.LexicalEnvironment = {
  EnvironmentRecord: { ... },
  outer: Outer.LexicalEnvironment
}
```

То есть функции образуют цепочку окружений, а не «снимок переменных».

### Замыкание — это ссылка, а не копия

Новички часто думают, что замыкание «копирует» значение переменной. Это неправда. Запоминается ссылка, а не значение.

**Пример:**

```javascript
function counter() {
  let count = 0

  return function () {
    count++
    console.log(count)
  }
}

const c = counter()
c() // 1
c() // 2
```

Переменная count живёт в памяти, пока существует хотя бы одно замыкание, ссылающееся на неё.

### Частая ошибка: замыкание внутри циклов

Одна из классических задач:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10)
}
```

**Вывод:** 3 3 3

**Почему?**

Потому что var имеет функцию scope, и внутри всех стрелок i была одна и та же переменная.

**Правильный способ:**

**Способ 1: заменить var на let**

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10)
}
```

**Способ 2: IIFE**

```javascript
for (var i = 0; i < 3; i++) {
  ;((j) => {
    setTimeout(() => console.log(j), 10)
  })(i)
}
```

### Практическое применение замыканий

- инкапсуляция состояния
- фабрики функций
- мемоизация
- обработчики событий

### Замыкания и приватность данных

До появления #private полей в классах, приватность делали через замыкания.

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
console.log(u.getSecret()) // hidden
```

Переменная secret — полностью недоступна извне.

### Garbage Collector и замыкания

Замыкание удерживает переменные в памяти. Это может привести к утечкам.

**Плохой пример:**

```javascript
function createBigClosure() {
  const hugeArray = new Array(1000000).fill('data')

  return function () {
    console.log('Using closure')
  }
}

const fn = createBigClosure()
// hugeArray никогда не освободится → утечка
```

Вывод: Используй замыкания осознанно.

---

## 9.6. Функции высшего порядка (HOF)

Функция высшего порядка — это функция, которая:

- принимает другую функцию
- возвращает другую функцию

**Примеры встроенных HOF:**

- map
- filter
- reduce
- forEach
- sort

**Пример:**

```javascript
function withLogging(fn) {
  return function (...args) {
    console.log('Calling with', args)
    return fn(...args)
  }
}

const sum = (a, b) => a + b
const logged = withLogging(sum)
logged(4, 5) // Calling with [4,5] → 9
```

Это и есть замыкание в работе.

### Каррирование (currying)

Каррирование — это превращение функции из:

`f(a, b, c)`

в:

`f(a)(b)(c)`

**Пример:**

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }

    return function (...next) {
      return curried(...args, ...next)
    }
  }
}
```

**Использование:**

```javascript
const sum = (a, b, c) => a + b + c
const curried = curry(sum)
curried(1)(2)(3) // 6
curried(1, 2)(3) // 6
```

**Где каррирование реально используется?**

- валидация данных
- middleware
- логирование
- декораторы
- частичное применение

### Частичное применение (partial application)

В отличие от каррирования, частичное применение фиксирует часть аргументов.

```javascript
function partial(fn, ...fixed) {
  return function (...rest) {
    return fn(...fixed, ...rest)
  }
}

const multiply = (a, b, c) => a * b * c
const double = partial(multiply, 2)
double(3, 4) // 24
```

---

## 9.7. Прототипы и наследование

JavaScript — прототипно-ориентированный язык. В основе JS — прототипная модель, а не классическая.

### Что такое прототип — простое объяснение

Прототип — это объект, на который ссылается другой объект, чтобы наследовать свойства.

Каждый объект в JS имеет скрытую ссылку на свой прототип. Эта ссылка называется:

- [[Prototype]] (официально в спецификации)
- `__proto__` (неофициально, но доступно в браузерах)

**Примечание:** `__proto__` — устаревший способ доступа к прототипу.

Рекомендуется использовать:

- `Object.getPrototypeOf(obj)` — для получения прототипа
- `Object.setPrototypeOf(obj, proto)` — для установки прототипа
- `Object.create(proto)` — для создания объекта с прототипом

**Пример:**

```javascript
const obj = {}
console.log(obj.__proto__) // устаревший способ
console.log(Object.getPrototypeOf(obj)) // рекомендуемый способ
```

Результат — объект Object.prototype.

### Как работает поиск свойств: prototype chain

Когда вы обращаетесь к свойству: `user.name`

JS выполняет поиск в несколько шагов:

1. Ищет name внутри объекта user
2. Если не найдено → смотрит в user.`__proto__`
3. Если не найдено → смотрит дальше по цепочке
4. Конечная точка — Object.prototype
5. Если нигде нет → результат undefined

Это называется цепочка прототипов.

**Иллюстрация:**

user → user.`__proto__` → Object.prototype → null

### Прототипная цепочка

obj → obj.`__proto__` → Object.prototype → null

**Пример:**

```javascript
const animal = {
  eats: true,
}

const dog = Object.create(animal)
dog.barks = true

console.log(dog.eats) // true
```

**Поиск свойства:**

1. объект
2. его prototype
3. prototype prototype
4. null

### Функции и свойство prototype

Каждая функция в JS имеет свойство prototype.

**Пример:**

```javascript
function User() {}
console.log(User.prototype)
```

В prototype хранятся методы и свойства, которые будут доступны экземплярам, созданным через:

```javascript
new User()
```

**Важно:** prototype есть только у функций

Не путай:

- у функции есть prototype
- у объекта есть `__proto__`
- и это не одно и то же

А связь такая:

`instance.__proto__ === Constructor.prototype`

**Пример:**

```javascript
function User() {}
const u = new User()
console.log(u.__proto__ === User.prototype) // true
```

### Создание объектов через new

При вызове функции-конструктора:

```javascript
new User()
```

JS делает четыре шага:

1. создаёт пустой объект {}
2. связывает объект с прототипом: obj.`__proto__` = User.prototype
3. вызывает функцию: User.call(obj)
4. возвращает новый объект

Это ключевое правило, которое любят спрашивать на собеседованиях.

### Прототипное наследование: пример в чистом виде

**Создаём прототип:**

```javascript
const animal = {
  eat() {
    console.log('eating')
  },
}
```

**Создаём объект, наследующий от animal:**

```javascript
const dog = {
  bark() {
    console.log('woof')
  },
}

dog.__proto__ = animal
dog.eat() // "eating" — унаследовано
```

### Наследование конструкторов (до ES6)

До появления классов писали так:

```javascript
function Animal(name) {
  this.name = name
}

Animal.prototype.eat = function () {
  console.log(this.name, 'eats')
}

function Dog(name) {
  Animal.call(this, name) // наследование свойств
}

Dog.prototype = Object.create(Animal.prototype) // наследование методов
Dog.prototype.constructor = Dog
```

Это важная конструкция — её всё ещё спрашивают, чтобы проверить понимание JS «под капотом».

---

## 9.8. Классы в JS: что под капотом

### ES6 классы: синтаксический сахар, а не новая модель

Классы — это синтаксический сахар над прототипами.

**Современный способ:**

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
```

**Под капотом:**

- функции-конструкторы
- prototype-методы

### Что такое super

В классах super используется в двух случаях:

**1. `super()` в конструкторе наследника**

Должен быть вызван до использования this.

```javascript
class Dog extends Animal {
  constructor(name) {
    super(name)
  }
}
```

**2. `super.method()` — обращение к методу родителя**

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
```

### Отличия классов от функций-конструкторов

1. классы не поднимаются (не hoisted)
2. методы в классе автоматически попадают в prototype
3. классы работают в strict mode
4. класс нельзя вызвать без new

### Статические методы

```javascript
class User {
  static createGuest() {
    return new User('Guest')
  }
}
```

Используются для фабрик и утилитарных методов.

### Приватные поля (#)

Современный способ скрывать данные:

```javascript
class User {
  #password = 'secret'

  getPassword() {
    return this.#password
  }
}
```

---

## 9.9. Модули: ES Modules vs CommonJS

### ES Modules

```javascript
export const sum = (a, b) => a + b
import { sum } from './sum.js'
```

**Особенности:**

- static imports
- tree-shaking
- работает в браузере
- анализ на этапе компиляции

### CommonJS

```javascript
module.exports = sum
const sum = require('./sum')
```

**Особенности:**

- dynamic
- используется в Node.js
- выполнение во время выполнения

**Когда что:**

- старые проекты — CJS
- новые — ESM

---

## 9.10. Destructuring, Spread, Rest и современные операторы

### Destructuring

```javascript
const { name, age } = user
const [a, b] = arr
```

**С дефолтами:**

```javascript
const { role = 'user' } = data
```

### Spread / Rest

```javascript
const arr2 = [...arr1]
function sum(...nums) {
  return nums.reduce((a, b) => a + b)
}
```

### Операторы и паттерны

- Optional chaining `?.`
- Nullish coalescing `??`
- Logical assignment `||= &&= ??=`

```javascript
user?.profile?.email ?? 'no email'
```

---

## Вопросы на собеседовании

### 1. Как определяется this?

this определяется в момент вызова по 5 правилам: метод, обычный вызов, явная привязка, конструктор, стрелка.

### 2. Чем стрелочная функция отличается от обычной?

У стрелок нет собственного this, arguments, super, new.target, нельзя использовать как конструктор.

### 3. Чем отличаются call, apply и bind?

- call — вызывает функцию сразу, аргументы через запятую
- apply — вызывает функцию сразу, аргументы массивом
- bind — создаёт новую функцию с привязанным контекстом

### 4. Можно ли использовать стрелочную функцию как конструктор?

Нет. У стрелки нет прототипа и new.target.

### 5. Как избежать потери контекста в callback'ах?

- bind
- стрелочные поля класса
- wrapper-функция

### 6. Почему this в методе объекта может стать undefined?

Потому что метод был вызван без объекта слева (потеря контекста).

### 7. Что такое замыкание?

Функция запоминает внешние переменные, даже если внешняя функция завершена. Это ссылка на Lexical Environment, а не копия значения.

### 8. Где применяются замыкания?

Инкапсуляция состояния, фабрики функций, мемоизация, обработчики событий, приватность данных.

### 9. Разница между переменной в замыкании и копией значения?

Замыкание хранит ссылку, не копирует значение.

### 10. Почему var в цикле вызывает проблему при замыканиях?

Потому что var имеет function scope, и для всех итераций существует одна переменная.

### 11. Что такое каррирование?

Преобразование функции с множеством аргументов в цепочку функций по одному аргументу.

### 12. Как работает прототипная цепочка?

Поиск свойства идёт от объекта → его prototype → prototype prototype → null.

### 13. Классы в JS — это настоящий OOP?

Нет, это синтаксический сахар над прототипами. Под капотом — функции-конструкторы и prototype.

### 14. В чём разница ES Modules и CommonJS?

ES Modules — static imports, tree-shaking, работает в браузере. CommonJS — dynamic, используется в Node.js.

### 15. Что такое destructuring?

Извлечение значений из объектов и массивов в отдельные переменные.

### 16. Что делают spread и rest?

Spread — разворачивает массив/объект. Rest — собирает аргументы в массив.

---

## Key Takeaways

- this определяется в момент вызова
- Способы вызова: метод, обычный вызов, явная привязка, конструктор, стрелка
- call/apply — вызов; bind — создание новой функции
- Стрелочные функции не имеют своего this и arguments
- Потеря контекста — самая частая ошибка начинающих
- Методы класса нужно биндить или делать стрелочными
- Замыкания — это ссылки на лексическое окружение, а не копии значений
- var ломает замыкания в циклах — let исправляет это
- Функции высшего порядка — сердце функционального подхода
- Каррирование делает код более гибким и модульным
- Прототипная модель — основа объектной модели JavaScript
- Классы — синтаксический сахар над прототипами
- ES Modules предпочтительнее CommonJS для новых проектов

---

**Часть III. JavaScript: фундамент, механика, архитектура**
