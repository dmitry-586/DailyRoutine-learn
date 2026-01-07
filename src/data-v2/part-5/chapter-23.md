# Глава 23. Прототипы, наследование и классы

JavaScript — **прототипно‑ориентированный** язык. Классы в ES6 — это **синтаксический сахар**, а не новая модель. Понимание прототипов критично для работы с наследованием, классами и объектно-ориентированным программированием в JavaScript.

---

## 23.1. Что такое прототип

У каждого объекта есть скрытая ссылка `[[Prototype]]` (в браузерах доступна через `__proto__`), которая указывает на другой объект.

При обращении к свойству объекта движок делает:

1. ищет свойство в самом объекте
2. если нет — идёт по цепочке в прототип: `Object.getPrototypeOf(obj)`
3. так доходит до `Object.prototype`
4. если не нашёл — возвращает `undefined`

Это и есть **цепочка прототипов (prototype chain)**.

**Пример:**

```javascript
const obj = {}
obj.toString() // '[object Object]' — метод из Object.prototype
```

**Проверка прототипа:**

```javascript
const obj = {}
Object.getPrototypeOf(obj) === Object.prototype // true
obj.__proto__ === Object.prototype // true (не рекомендуется использовать)
```

---

## 23.2. Функции-конструкторы и свойство prototype

До появления классов использовались функции-конструкторы:

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

**Что происходит:**

- у функции `User` есть объект `User.prototype`
- при вызове `new User()` движок создаёт новый объект и делает:

```javascript
instance.__proto__ === User.prototype // true
```

То есть все методы, записанные в `User.prototype`, становятся доступны всем экземплярам.

**Преимущество:**

Методы хранятся в одном месте (в прототипе), а не копируются в каждый экземпляр.

---

## 23.3. Алгоритм `new` в 4 шага

При вызове `new Constructor()` движок выполняет:

1. **Создаётся пустой объект** `{}`
2. **Его прототип связывается** с `Constructor.prototype`
3. **Вызывается конструктор** с `this = новый объект`
4. **Если конструктор вернул объект** — он и будет результатом; иначе вернётся `this`

**Ручная реализация `new`:**

```javascript
function myNew(Constructor, ...args) {
  // 1. Создаём пустой объект
  const obj = {}
  
  // 2. Связываем прототип
  Object.setPrototypeOf(obj, Constructor.prototype)
  
  // 3. Вызываем конструктор
  const result = Constructor.apply(obj, args)
  
  // 4. Возвращаем результат
  return result instanceof Object ? result : obj
}

// Использование
const u = myNew(User, 'Alex')
```

Это любят спрашивать на собеседованиях, чтобы проверить понимание прототипной модели.

---

## 23.4. Цепочка прототипов

```javascript
function Animal(name) {
  this.name = name
}

Animal.prototype.eat = function() {
  console.log(this.name, 'eats')
}

function Dog(name) {
  Animal.call(this, name)
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.bark = function() {
  console.log(this.name, 'barks')
}

const dog = new Dog('Rex')
dog.eat() // 'Rex eats' — из Animal.prototype
dog.bark() // 'Rex barks' — из Dog.prototype
```

**Цепочка:**

```
dog → Dog.prototype → Animal.prototype → Object.prototype → null
```

---

## 23.5. ES6‑классы: синтаксический сахар над прототипами

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

**Эквивалент через функции:**

```javascript
function Animal(name) {
  this.name = name
}

Animal.prototype.eat = function() {
  console.log(this.name, 'eats')
}

function Dog(name) {
  Animal.call(this, name)
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.bark = function() {
  console.log(this.name, 'barks')
}
```

---

## 23.6. Важные особенности классов

### Классы не поднимаются (hoisting)

```javascript
const instance = new MyClass() // ReferenceError

class MyClass {}
```

В отличие от Function Declaration, классы не поднимаются.

### Strict mode по умолчанию

Внутри классов по умолчанию strict mode, даже без `'use strict'`.

### Методы автоматически попадают в prototype

```javascript
class User {
  say() {
    // Попадает в User.prototype.say
  }
}
```

### Класс нельзя вызвать без `new`

```javascript
class User {}

User() // TypeError: Class constructor User cannot be invoked without 'new'
```

---

## 23.7. Наследование и `super`

### extends

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
  constructor(name, breed) {
    super(name) // Вызов конструктора родителя
    this.breed = breed
  }

  bark() {
    console.log(this.name, 'barks')
  }
}
```

### super в методах

```javascript
class A {
  say() {
    console.log('A')
  }
}

class B extends A {
  say() {
    super.say() // Вызов метода родителя
    console.log('B')
  }
}

new B().say() // A \n B
```

**Правила:**

- `super()` в конструкторе — вызов конструктора родителя (обязательно до `this`)
- `super.method()` — вызов метода родителя
- `super` можно использовать только в методах классов

---

## 23.8. Статические методы и свойства

Статические методы принадлежат классу, а не экземпляру:

```javascript
class MathUtils {
  static sum(a, b) {
    return a + b
  }
  
  static PI = 3.14159
}

MathUtils.sum(1, 2) // 3
MathUtils.PI // 3.14159

const instance = new MathUtils()
instance.sum(1, 2) // TypeError: instance.sum is not a function
```

**Под капотом:**

```javascript
MathUtils.sum = function(a, b) {
  return a + b
}
```

---

## 23.9. Приватные поля (#)

Современный стандарт приватности:

```javascript
class User {
  #password = 'secret'
  #email = 'user@example.com'

  getPassword() {
    return this.#password
  }
  
  setEmail(email) {
    this.#email = email
  }
}

const user = new User()
user.#password // SyntaxError: Private field '#password' must be declared in an enclosing class
user.getPassword() // 'secret'
```

**Особенности:**

- Приватные поля начинаются с `#`
- Доступны только внутри класса
- Не наследуются (каждый класс имеет свои приватные поля)
- Нельзя получить доступ извне даже через `user['#password']`

**Статические приватные поля:**

```javascript
class Counter {
  static #count = 0
  
  static increment() {
    Counter.#count++
  }
  
  static getCount() {
    return Counter.#count
  }
}
```

---

## 23.10. Геттеры и сеттеры

```javascript
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ')
  }
}

const user = new User('John', 'Doe')
console.log(user.fullName) // 'John Doe'
user.fullName = 'Jane Smith'
console.log(user.firstName) // 'Jane'
```

---

## 23.11. Проверка принадлежности

### instanceof

```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog()

dog instanceof Dog // true
dog instanceof Animal // true
dog instanceof Object // true
```

`instanceof` проверяет всю цепочку прототипов.

### Object.prototype.isPrototypeOf

```javascript
Dog.prototype.isPrototypeOf(dog) // true
Animal.prototype.isPrototypeOf(dog) // true
```

---

## 23.12. Сравнение: функции-конструкторы vs классы

| Характеристика | Функции-конструкторы | Классы |
|---------------|---------------------|--------|
| Синтаксис | Старый | Современный |
| Hoisting | Да | Нет |
| Strict mode | Нет (по умолчанию) | Да |
| Вызов без new | Возможно | Ошибка |
| Наследование | Сложное | Простое (extends) |
| Приватные поля | Нет | Да (#) |
| Статические методы | Вручную | Синтаксис static |

**Рекомендация:** Используйте классы в новом коде.

---

## Вопросы на собеседовании

### 1. Что такое прототип?

Скрытая ссылка `[[Prototype]]`, которая указывает на другой объект. Используется для поиска свойств по цепочке.

### 2. Как работает new?

1. Создаётся пустой объект
2. Его прототип связывается с Constructor.prototype
3. Вызывается конструктор с this = новый объект
4. Возвращается объект (или this, если конструктор не вернул объект)

### 3. В чём разница между `__proto__` и `prototype`?

`__proto__` — ссылка на прототип экземпляра. `prototype` — объект, который используется как прототип для новых экземпляров.

### 4. Почему классы — это синтаксический сахар?

Под капотом классы компилируются в функции-конструкторы и прототипы. Это не новая модель, а удобный синтаксис.

### 5. Что такое super?

`super` используется для вызова методов и конструктора родительского класса. `super()` в конструкторе обязательно до `this`.

### 6. Как работают приватные поля?

Приватные поля начинаются с `#` и доступны только внутри класса. Не наследуются и недоступны извне.

### 7. Что такое статические методы?

Методы, принадлежащие классу, а не экземпляру. Вызываются через имя класса, а не через экземпляр.

### 8. Как проверить, является ли объект экземпляром класса?

Использовать `instanceof`, который проверяет всю цепочку прототипов.

---

## Key Takeaways

- JavaScript использует прототипную модель наследования
- Классы — синтаксический сахар над функциями-конструкторами и прототипами
- `new` создаёт объект и связывает его с прототипом конструктора
- `extends` упрощает наследование
- `super` используется для доступа к родительскому классу
- Приватные поля (`#`) обеспечивают инкапсуляцию
- Понимание прототипов критично для работы с классами и наследованием

