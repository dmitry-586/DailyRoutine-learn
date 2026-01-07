# Глава 22. this и правила привязки

`this` — одна из самых сложных и важных концепций JavaScript. Понимание правил привязки `this` критично для работы с методами объектов, классами, событиями и React-компонентами.

---

## 22.1. Что такое this

Главное, что нужно запомнить:

> **`this` в JavaScript определяется в момент вызова функции, а не в момент её объявления.**

`this` — это ссылка на объект, в контексте которого выполняется функция. Значение `this` зависит от того, **как** функция была вызвана.

---

## 22.2. Правила привязки this

Есть несколько базовых сценариев, по которым вычисляется `this`:

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
  }
}

user.say() // 'Alex'
```

**Правило:** `this` — объект **слева от точки** в момент вызова.

**Важно:** Не важно, где функция объявлена, важно, как она вызывается:

```javascript
const user = {
  name: 'Alex',
  say() {
    console.log(this.name)
  }
}

const say = user.say
say() // undefined (или ошибка в strict mode)
```

### 3. Обычный вызов функции: `fn()`

```javascript
function say() {
  console.log(this)
}

say() // в нестрогом режиме: window, в strict: undefined
```

Если функция вызывается **без объекта слева**, в строгом режиме `this` будет `undefined`.

### 4. Явная привязка: `call`, `apply`, `bind`

#### call

```javascript
function show() {
  console.log(this.name)
}

const obj = { name: 'Bob' }

show.call(obj) // 'Bob'
```

`call(context, ...args)` — вызывает функцию сразу, аргументы через запятую.

#### apply

```javascript
function show(a, b) {
  console.log(this.name, a, b)
}

const obj = { name: 'Bob' }

show.apply(obj, [1, 2]) // 'Bob' 1 2
```

`apply(context, argsArray)` — вызывает функцию сразу, аргументы массивом.

#### bind

```javascript
function show() {
  console.log(this.name)
}

const obj = { name: 'Bob' }

const bound = show.bind(obj)
bound() // 'Bob'
```

`bind(context)` — **создаёт новую функцию** с зафиксированным `this`.

**Разница:**

- `call` и `apply` вызывают функцию сразу
- `bind` возвращает новую функцию с привязанным `this`

### 5. Вызов через `new`: конструктор

```javascript
function User(name) {
  this.name = name
}

const u = new User('Alice')
console.log(u.name) // 'Alice'
```

При вызове с `new` движок:

1. создаёт новый объект
2. связывает его прототип с `User.prototype`
3. вызывает функцию с `this = новый объект`
4. возвращает `this` (если явно не вернуть другой объект)

**Проверка:**

```javascript
function User(name) {
  if (!(this instanceof User)) {
    throw new Error('Must be called with new')
  }
  this.name = name
}

// Или в ES6:
function User(name) {
  if (new.target === undefined) {
    throw new Error('Must be called with new')
  }
  this.name = name
}
```

---

## 22.3. Стрелочные функции и this

Стрелочные функции **не имеют собственного `this`**. Они берут `this` из внешнего лексического окружения.

```javascript
const obj = {
  value: 42,
  printLater() {
    setTimeout(() => {
      console.log(this.value) // 42 — this из printLater
    }, 100)
  }
}

obj.printLater()
```

Здесь стрелка **наследует `this` из внешней функции `printLater`**, которая была вызвана как метод объекта.

### Где стрелки плохи с this

```javascript
const user = {
  name: 'Alice',
  say: () => {
    console.log(this.name) // undefined
  }
}

user.say()
```

**Причина:**

- `say` — стрелка, она не создаёт свой `this`
- `this` берётся из внешнего лексического окружения (глобальный контекст)
- там `name` нет

**Практическое правило:**

- стрелки — **для коллбеков, маленьких функций, методов, завязанных на внешний `this`** (как в примере с `setTimeout`)
- обычные функции — **для методов объектов, конструкторов, когда `this` должен зависеть от способа вызова**

---

## 22.4. Потеря контекста: частая причина багов

Классическая ловушка:

```javascript
const user = {
  name: 'Alice',
  say() {
    console.log(this.name)
  }
}

setTimeout(user.say, 1000) // что выведет?
```

Результат: `undefined` (или ошибка в строгом режиме).

**Почему:**

- в `setTimeout` передаётся **ссылка на функцию**, а не «вызов как метод»
- когда движок позже вызывает этот коллбек, он делает это как `fn()`, без объекта слева → `this` теряется

**Правильные варианты:**

```javascript
// 1. Стрелочная функция
setTimeout(() => user.say(), 1000)

// 2. bind
setTimeout(user.say.bind(user), 1000)

// 3. Обёртка
setTimeout(function() {
  user.say()
}, 1000)
```

То же самое происходит при работе с методами классов и React-компонентами.

---

## 22.5. Приоритет правил привязки

Правила применяются в следующем порядке:

1. **`new`** — самый высокий приоритет
2. **Явная привязка** (`call`, `apply`, `bind`)
3. **Вызов как метод** (`obj.method()`)
4. **Обычный вызов** (`fn()`)
5. **Стрелочная функция** — берёт `this` из внешнего контекста

**Пример:**

```javascript
const obj = { name: 'Object' }

function test() {
  console.log(this.name)
}

// 1. new (игнорирует bind)
const Bound = test.bind(obj)
const instance = new Bound() // undefined (новый объект)

// 2. bind
const bound = test.bind(obj)
bound() // 'Object'

// 3. call/apply
test.call(obj) // 'Object'

// 4. Обычный вызов
test() // undefined (в strict mode)
```

---

## 22.6. Практические примеры

### React компоненты

```javascript
class Button extends React.Component {
  constructor(props) {
    super(props)
    // Вариант 1: bind в конструкторе
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick() {
    console.log(this.props) // this = экземпляр компонента
  }
  
  render() {
    // Вариант 2: стрелочная функция
    return <button onClick={() => this.handleClick()}>Click</button>
    
    // Вариант 3: bind в JSX (не рекомендуется)
    // return <button onClick={this.handleClick.bind(this)}>Click</button>
  }
}
```

### Обработчики событий

```javascript
const button = document.querySelector('button')

const handler = {
  count: 0,
  handleClick() {
    this.count++
    console.log(this.count)
  }
}

//  Плохо — потеря контекста
button.addEventListener('click', handler.handleClick)

//  Хорошо — bind
button.addEventListener('click', handler.handleClick.bind(handler))

//  Хорошо — стрелка
button.addEventListener('click', () => handler.handleClick())
```

### Цепочки вызовов

```javascript
const calculator = {
  value: 0,
  add(n) {
    this.value += n
    return this // Возвращаем this для цепочки
  },
  multiply(n) {
    this.value *= n
    return this
  },
  getValue() {
    return this.value
  }
}

calculator.add(5).multiply(2).getValue() // 10
```

---

## 22.7. Частые ошибки

### Ошибка 1: Потеря контекста в коллбеках

```javascript
//  Плохо
const obj = {
  data: [1, 2, 3],
  process() {
    this.data.forEach(function(item) {
      console.log(this.data) // undefined
    })
  }
}

//  Хорошо
const obj = {
  data: [1, 2, 3],
  process() {
    this.data.forEach((item) => {
      console.log(this.data) // [1, 2, 3]
    })
  }
}
```

### Ошибка 2: Стрелка как метод объекта

```javascript
//  Плохо
const obj = {
  name: 'Alice',
  say: () => {
    console.log(this.name) // undefined
  }
}

//  Хорошо
const obj = {
  name: 'Alice',
  say() {
    console.log(this.name) // 'Alice'
  }
}
```

### Ошибка 3: Забыли bind в React

```javascript
//  Плохо
class Component extends React.Component {
  handleClick() {
    console.log(this.props) // TypeError
  }
  
  render() {
    return <button onClick={this.handleClick}>Click</button>
  }
}

//  Хорошо
class Component extends React.Component {
  handleClick = () => {
    console.log(this.props) // Работает
  }
  
  render() {
    return <button onClick={this.handleClick}>Click</button>
  }
}
```

---

## Вопросы на собеседовании

### 1. Что такое this в JavaScript?

`this` — ссылка на объект, в контексте которого выполняется функция. Определяется в момент вызова, а не объявления.

### 2. Как определяется this?

По правилам: new → явная привязка (call/apply/bind) → вызов как метод → обычный вызов → стрелочная функция (из внешнего контекста).

### 3. В чём разница между call, apply и bind?

call и apply вызывают функцию сразу с привязанным this. bind возвращает новую функцию с привязанным this.

### 4. Как this работает в стрелочных функциях?

Стрелки не имеют собственного this. Они берут this из внешнего лексического окружения.

### 5. Что такое потеря контекста?

Когда функция теряет связь с объектом, методом которого она является. Происходит при передаче метода как коллбека.

### 6. Как исправить потерю контекста?

Использовать bind, стрелочную функцию или обёртку.

### 7. Что выведет этот код?

```javascript
const obj = {
  name: 'Alice',
  say: () => console.log(this.name)
}
obj.say()
```

undefined, потому что стрелка берёт this из глобального контекста, а не объекта.
