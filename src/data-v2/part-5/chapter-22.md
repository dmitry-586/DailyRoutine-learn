# Глава 22. this и правила привязки

`this` — одна из самых «скользких» тем в JavaScript, потому что значение `this` зависит не от того, **где** функция написана, а от того, **как** она вызвана.

---

## 22.1. Что такое this

Главное, что нужно запомнить:

> **`this` в JavaScript определяется в момент вызова функции, а не в момент её объявления.**

`this` — это значение, которое движок подставляет внутрь функции при вызове. Какое именно — решают правила ниже.

---

## 22.2. Правила привязки this

Есть несколько базовых сценариев, по которым вычисляется `this`:

### 1. Глобальный контекст

В браузере (в нестрогом режиме):

```javascript
console.log(this) // window
```

В strict mode (и в ES-модулях):

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

**Важно:** Не важно, где функция объявлена, важно, как она вызывается:

```javascript
const user = {
  name: 'Alex',
  say() {
    console.log(this.name)
  },
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

Практически: если вызываете функцию через `new`, `this` будет новым объектом.

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
  },
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
  },
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
  },
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
setTimeout(function () {
  user.say()
}, 1000)
```

То же самое происходит везде, где вы передаёте метод как коллбек: `setTimeout`, обработчики событий, `forEach` и т.п.

---

## 22.5. Частые ловушки и как их чинить

### Ловушка 1: «оторвали» метод и потеряли this

```javascript
const user = {
  name: 'Alice',
  say() {
    console.log(this.name)
  },
}

const say = user.say
say() // undefined в strict mode
```

**Решение:** `bind` или обёртка.

```javascript
const sayFixed = user.say.bind(user)
sayFixed() // 'Alice'
```

### Ловушка 2: обычная функция внутри метода

```javascript
const obj = {
  data: [1, 2, 3],
  print() {
    this.data.forEach(function () {
      console.log(this) // undefined в strict mode
    })
  },
}
```

**Решение:** стрелка (берёт `this` снаружи) или `bind`.

```javascript
const obj = {
  data: [1, 2, 3],
  print() {
    this.data.forEach(() => {
      console.log(this.data) // [1, 2, 3]
    })
  },
}
```

### Ловушка 3: стрелка как метод объекта

```javascript
const user = {
  name: 'Alice',
  say: () => console.log(this.name),
}

user.say() // undefined
```

**Правило:** если метод должен видеть `this` объекта — пишите обычную функцию `say() { ... }`.

---

## Вопросы на собеседовании

### 1. Что такое this в JavaScript?

`this` — ссылка на объект, в контексте которого выполняется функция. Определяется в момент вызова, а не объявления.

### 2. Как определяется this?

Коротко: `obj.method()` → this=obj; `fn()` → undefined (в strict mode); `call/apply/bind` задают this; `new` делает this новым объектом; у стрелок this берётся снаружи.

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
  say: () => console.log(this.name),
}
obj.say()
```

undefined, потому что стрелка берёт this из глобального контекста, а не объекта.
