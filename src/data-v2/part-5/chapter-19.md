# Глава 19. Scope, hoisting, TDZ и объявление переменных (var, let, const)

Область видимости (scope) и hoisting — фундаментальные концепции JavaScript. Понимание этих механизмов критично для написания предсказуемого кода и успешного прохождения собеседований.

---

## 19.1. Область видимости (Scope)

**Область видимости (scope)** — ответ на вопрос: «Где эта переменная доступна в коде?»

Основные виды областей видимости в современном JS:

1. **глобальная** (global scope)
2. **функция** (function scope)
3. **блок** `{ ... }` (block scope)

### Глобальная область видимости

Переменные, объявленные вне функций и блоков, доступны везде:

```javascript
const globalVar = 'I am global'

function test() {
  console.log(globalVar) // 'I am global'
}

test()
console.log(globalVar) // 'I am global'
```

**В браузере:**

```javascript
var x = 10
console.log(window.x) // 10 (var создаёт свойство window)
```

**В Node.js:**

```javascript
var x = 10
console.log(global.x) // 10
```

Глобальные переменные — антипаттерн. Избегайте их.

### Function scope

Переменные, объявленные внутри функции, доступны только внутри этой функции:

```javascript
function test() {
  const localVar = 'I am local'
  console.log(localVar) // 'I am local'
}

test()
console.log(localVar) // ReferenceError
```

### Block scope

Переменные, объявленные внутри блока `{ ... }`, доступны только внутри этого блока:

```javascript
if (true) {
  const blockVar = 'I am in block'
  console.log(blockVar) // 'I am in block'
}

console.log(blockVar) // ReferenceError
```

**Блоки создают scope для:**

- `if`, `else`
- `for`, `while`, `do...while`
- `switch`
- `try`, `catch`, `finally`
- просто `{ ... }`

---

## 19.2. var: function scope

`var` **игнорирует блоки** — живёт на уровне функции или глобально.

```javascript
if (true) {
  var x = 10
}

console.log(x) // 10 — переменная всё ещё доступна
```

**Проблема с var:**

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i) // 3, 3, 3 (не 0, 1, 2!)
  }, 100)
}
```

**Почему?**

`var` создаёт одну переменную `i` на всю функцию, и все setTimeout'ы ссылаются на одно и то же значение.

**Решение с let:**

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i) // 0, 1, 2
  }, 100)
}
```

**Переобъявление var:**

```javascript
var x = 1
var x = 2 // Ок, не ошибка
console.log(x) // 2
```

---

## 19.3. let и const: block scope

`let` и `const` живут **строго внутри блока** `{ ... }`.

```javascript
if (true) {
  let y = 20
  const z = 30
}

console.log(y) // ReferenceError
console.log(z) // ReferenceError
```

**Преимущества block scope:**

- Предсказуемость
- Избежание конфликтов имён
- Правильная работа в циклах
- Лучшая оптимизация движком

**Переобъявление:**

```javascript
let x = 1
let x = 2 // SyntaxError: Identifier 'x' has already been declared
```

---

## 19.4. Hoisting: поднятие объявлений

Движок JavaScript **сначала** проходит файл, «регистрирует» объявления, а уже потом выполняет код. Это и называется hoisting.

### var и hoisting

```javascript
console.log(a) // undefined, но не ошибка
var a = 5
```

Под капотом это похоже на:

```javascript
var a // Объявление поднято, инициализировано undefined
console.log(a) // undefined
a = 5 // Присваивание остаётся на месте
```

**Важно:** Поднимается только объявление, не присваивание.

### let / const и TDZ

`let` и `const` тоже поднимаются, но попадают в **Temporal Dead Zone (TDZ)**: участок кода **от начала области до строки объявления**, где переменную **нельзя использовать**.

```javascript
console.log(b) // ReferenceError: Cannot access 'b' before initialization
let b = 10
```

**TDZ существует для:**

- `let`
- `const`
- `class`

**Почему TDZ?**

Чтобы предотвратить использование переменных до их инициализации и сделать код более предсказуемым.

**Пример TDZ:**

```javascript
function test() {
  // TDZ для x начинается здесь
  console.log(typeof x) // ReferenceError (не 'undefined'!)
  let x = 10
  // TDZ для x заканчивается здесь
}
```

**Сравнение:**

```javascript
// var
console.log(a) // undefined
var a = 5

// let
console.log(b) // ReferenceError
let b = 5

// const
console.log(c) // ReferenceError
const c = 5
```

---

## 19.5. var, let, const: сравнение

### var

**Характеристики:**

- область видимости: **функция**
- hoisting: да, значение по умолчанию `undefined`
- можно переобъявлять в той же области
- нет TDZ
- можно менять значение

**Примеры:**

```javascript
function test() {
  console.log(x) // undefined
  var x = 10
  var x = 20 // Ок
  x = 30 // Ок
}
```

### let

**Характеристики:**

- область видимости: **блок**
- hoisting: да, но с TDZ (нельзя использовать до строки объявления)
- переобъявление в одной области запрещено
- можно менять значение

**Примеры:**

```javascript
function test() {
  console.log(x) // ReferenceError
  let x = 10
  // let x = 20 // SyntaxError
  x = 30 // Ок
}
```

### const

**Характеристики:**

- область видимости: **блок**
- hoisting: да, но с TDZ
- переобъявление и переназначение запрещены
- **но** внутреннее состояние объекта / массива менять можно

**Примеры:**

```javascript
const obj = { x: 1 }
obj.x = 2 // Ок — меняем свойство
// obj = {} // TypeError: Assignment to constant variable

const arr = [1, 2, 3]
arr.push(4) // Ок — меняем массив
// arr = [] // TypeError: Assignment to constant variable
```

**Важно:** `const` не делает объект иммутабельным, он только запрещает переназначение переменной.

---

## 19.6. Современные практики

**Правило по умолчанию:**

1. Используй `const` по умолчанию
2. Переходи на `let`, когда значение действительно должно меняться
3. `var` в новом коде не используй **никогда**, кроме как в учебных целях

**Пример:**

```javascript
//  Хорошо
const users = []
const config = { apiUrl: '...' }

let currentUser = null
let isLoading = false

//  Плохо
var users = []
var config = {}
```

**Почему const по умолчанию?**

- Предотвращает случайные переприсваивания
- Делает код более предсказуемым
- Улучшает читаемость (видно, что значение не меняется)
- Помогает движку оптимизировать код

---

## 19.7. Лексическая область видимости (Lexical Scope)

JavaScript — **лексически скоупированный язык**: область видимости определяется **по месту записи в коде**, а не по месту вызова.

```javascript
const x = 'global'

function outer() {
  const x = 'outer'

  function inner() {
    console.log(x) // 'outer' — берётся из внешней функции
  }

  inner()
}

outer()
```

**Правило поиска переменной:**

1. Ищется в текущей области видимости
2. Если не найдена — ищется во внешней области
3. И так до глобальной области
4. Если не найдена — ReferenceError

**Цепочка областей видимости (Scope Chain):**

```javascript
const global = 'global'

function level1() {
  const l1 = 'level1'

  function level2() {
    const l2 = 'level2'

    function level3() {
      console.log(global) // 'global'
      console.log(l1) // 'level1'
      console.log(l2) // 'level2'
    }

    level3()
  }

  level2()
}

level1()
```

---

## 19.8. Затенение переменных (Variable Shadowing)

Когда внутренняя переменная «затеняет» внешнюю с тем же именем:

```javascript
const x = 'outer'

function test() {
  const x = 'inner'
  console.log(x) // 'inner' — внутренняя переменная
}

test()
console.log(x) // 'outer' — внешняя переменная
```

**Важно:** Затенение может быть источником багов. Избегайте одинаковых имён.

---

## Вопросы на собеседовании

### 1. Что такое область видимости?

Область видимости определяет, где переменная доступна в коде. В JS есть глобальная, функциональная и блочная области видимости.

### 2. В чём разница между var, let и const?

- var: function scope, hoisting с undefined, можно переобъявлять
- let: block scope, hoisting с TDZ, нельзя переобъявлять, можно менять
- const: block scope, hoisting с TDZ, нельзя переобъявлять и переназначать

### 3. Что такое hoisting?

Механизм, при котором объявления переменных и функций «поднимаются» в начало области видимости перед выполнением кода.

### 4. Что такое TDZ?

Temporal Dead Zone — участок кода от начала области до строки объявления, где переменную нельзя использовать. Существует для let, const и class.

### 5. Почему var устарел?

var имеет function scope вместо block scope, что приводит к неожиданному поведению в циклах и блоках. let и const более предсказуемы.

### 6. Можно ли менять объект, объявленный через const?

Да, const запрещает только переназначение переменной, но не изменение свойств объекта или элементов массива.

### 7. Что такое лексическая область видимости?

Область видимости определяется по месту записи в коде, а не по месту вызова. JavaScript — лексически скоупированный язык.

### 8. Что выведет этот код?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
```

Выведет 3, 3, 3, потому что var создаёт одну переменную на всю функцию, и все setTimeout'ы ссылаются на одно значение.
