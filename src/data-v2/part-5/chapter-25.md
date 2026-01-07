# Глава 25. Методы массивов и иммутабельные паттерны

Методы массивов — основа функционального программирования в JavaScript. Они позволяют работать с данными декларативно, без явных циклов. Понимание этих методов и иммутабельных паттернов критично для написания чистого и предсказуемого кода.

---

## 25.1. Иммутабельность

**Иммутабельность** — принцип, при котором данные не изменяются после создания. Вместо изменения создаются новые данные.

**Почему это важно:**

- Предсказуемость кода
- Легче отлаживать
- Работа с React (избежание мутаций состояния)
- Безопасность в многопоточных средах

**Мутация vs Иммутабельность:**

```javascript
//  Мутация
const arr = [1, 2, 3]
arr.push(4) // Изменяет исходный массив

//  Иммутабельно
const arr = [1, 2, 3]
const newArr = [...arr, 4] // Создаёт новый массив
```

---

## 25.2. map: трансформация элементов

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

- `map` **не изменяет** исходный массив (создаёт новый)
- всегда возвращает массив той же длины
- если функция ничего не возвращает, в новом массиве будут `undefined`

---

## 25.3. filter: фильтрация элементов

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

- `filter` **не изменяет** исходный массив
- возвращает массив, длина которого может быть меньше исходного
- функция должна возвращать `true` или `false` (truthy/falsy значения тоже работают)

---

## 25.4. reduce: агрегация данных

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

- `reduce` **не изменяет** исходный массив
- начальное значение (`initialValue`) важно — без него первый элемент становится аккумулятором
- можно использовать для любых операций агрегации: суммирование, группировка, поиск максимума/минимума

---

## 25.5. Комбинирование методов

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
// 26.67
```

---

## 25.6. Другие важные методы массивов

### forEach

Выполнение действия для каждого элемента:

```javascript
const numbers = [1, 2, 3]
numbers.forEach((n, index) => {
  console.log(`Index ${index}: ${n}`)
})
// Index 0: 1
// Index 1: 2
// Index 2: 3
```

**Важно:** `forEach` не возвращает значение (возвращает `undefined`). Используйте `map`, если нужно создать новый массив.

### find

Поиск первого элемента:

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]
const user = users.find((u) => u.id === 2)
// { id: 2, name: 'Bob' }
```

### findIndex

Поиск индекса первого элемента:

```javascript
const numbers = [10, 20, 30]
const index = numbers.findIndex((n) => n > 15)
// 1
```

### some

Проверка, есть ли хотя бы один элемент:

```javascript
const numbers = [1, 2, 3, 4, 5]
const hasEven = numbers.some((n) => n % 2 === 0)
// true
```

### every

Проверка, все ли элементы соответствуют условию:

```javascript
const numbers = [2, 4, 6, 8]
const allEven = numbers.every((n) => n % 2 === 0)
// true
```

### flat

Выравнивание вложенных массивов:

```javascript
const nested = [1, [2, 3], [4, [5, 6]]]
const flat = nested.flat(2) // глубина 2
// [1, 2, 3, 4, 5, 6]
```

### flatMap

map + flat в одном:

```javascript
const words = ['hello world', 'foo bar']
const letters = words.flatMap((word) => word.split(' '))
// ['hello', 'world', 'foo', 'bar']

// Эквивалентно:
const letters2 = words.map((word) => word.split(' ')).flat()
// ['hello', 'world', 'foo', 'bar']
```

### sort

Сортировка ( **мутирует массив!**):

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

 **Важно:** `sort` **мутирует** исходный массив. Если нужно сохранить исходный, создайте копию:

```javascript
const sorted = [...numbers].sort((a, b) => a - b)
```

---

## 25.7. Иммутабельные паттерны для массивов

### Добавление элемента

```javascript
//  Мутация
arr.push(item)

//  Иммутабельно
const newArr = [...arr, item]
// или
const newArr = arr.concat(item)
```

### Удаление элемента

```javascript
//  Мутация
arr.splice(index, 1)

//  Иммутабельно
const newArr = arr.filter((_, i) => i !== index)
// или
const newArr = [...arr.slice(0, index), ...arr.slice(index + 1)]
```

### Изменение элемента

```javascript
//  Мутация
arr[index] = newValue

//  Иммутабельно
const newArr = arr.map((item, i) => i === index ? newValue : item)
```

### Обновление объекта в массиве

```javascript
//  Мутация
users[index].name = 'New Name'

//  Иммутабельно
const newUsers = users.map((user, i) =>
  i === index ? { ...user, name: 'New Name' } : user
)
```

---

## 25.8. Иммутабельные паттерны для объектов

### Добавление свойства

```javascript
//  Мутация
obj.newProp = 'value'

//  Иммутабельно
const newObj = { ...obj, newProp: 'value' }
```

### Изменение свойства

```javascript
//  Мутация
obj.name = 'New Name'

//  Иммутабельно
const newObj = { ...obj, name: 'New Name' }
```

### Удаление свойства

```javascript
//  Мутация
delete obj.prop

//  Иммутабельно
const { prop, ...newObj } = obj
```

### Вложенные объекты

```javascript
//  Мутация
user.profile.email = 'new@email.com'

//  Иммутабельно
const newUser = {
  ...user,
  profile: {
    ...user.profile,
    email: 'new@email.com'
  }
}
```

---

## 25.9. Когда что использовать

- **map** — когда нужно преобразовать каждый элемент в новый формат
- **filter** — когда нужно оставить только часть элементов
- **reduce** — когда нужно свести массив к одному значению (сумма, произведение, группировка, поиск максимума)
- **find** — когда нужно найти один элемент по условию
- **some/every** — когда нужно проверить наличие элементов
- **forEach** — когда нужно выполнить действие для каждого элемента без создания нового массива

---

## 25.10. Производительность

- `map`, `filter`, `reduce` создают новые массивы — это может быть дорого для больших данных
- для простых операций циклы `for` могут быть быстрее
- но читаемость и декларативность часто важнее микрооптимизаций
- современные движки JavaScript хорошо оптимизируют методы массивов

---

## Вопросы на собеседовании

### 1. В чём разница между map, filter и reduce?

- `map` — преобразует каждый элемент, возвращает массив той же длины
- `filter` — оставляет только элементы, соответствующие условию
- `reduce` — сводит массив к одному значению

### 2. Что такое иммутабельность?

Принцип, при котором данные не изменяются после создания. Вместо изменения создаются новые данные.

### 3. Как иммутабельно добавить элемент в массив?

`const newArr = [...arr, item]` или `arr.concat(item)`

### 4. Как иммутабельно обновить объект?

`const newObj = { ...obj, property: newValue }`

### 5. Почему sort мутирует массив?

Это историческое поведение. Для иммутабельной сортировки создайте копию: `[...arr].sort()`

### 6. Что возвращает forEach?

`undefined`. Используйте `map`, если нужно создать новый массив.

### 7. В чём разница между some и every?

`some` — проверяет, есть ли хотя бы один элемент. `every` — проверяет, все ли элементы соответствуют условию.
