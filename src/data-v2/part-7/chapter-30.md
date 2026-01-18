# Глава 30. DOM операции и производительность

DOM‑операции значительно тяжелее обычных вычислений в JS. Понимание того, что дорого, и как оптимизировать работу с DOM, критично для создания быстрых интерфейсов.

---

## 30.1. DOM как дерево узлов

**DOM (Document Object Model)** — это объектное представление HTML‑документа в виде дерева.

Узлы бывают разных типов:

- элемент (`<div>`, `<button>` и т.д.)
- текстовый узел
- комментарий и служебные узлы

Понимание, что DOM — это **дерево**, важно для:

- навигации (родители, дети, соседи)
- всплытия и погружения событий
- измерения размеров и позиции элементов

---

## 30.2. Поиск элементов

Современный практический минимум:

```javascript
// по id
const app = document.getElementById('app')

// по CSS‑селектору (первый элемент)
const card = document.querySelector('.card')

// по CSS‑селектору (все элементы)
const cards = document.querySelectorAll('.card')
```

**Сравнение методов:**

**`getElementById`:**

- Возвращает: Element или null
- Производительность: самый быстрый
- Использование: когда есть id

**`querySelector`:**

- Возвращает: Element или null
- Производительность: медленнее
- Использование: универсальный селектор

**`querySelectorAll`:**

- Возвращает: NodeList
- Производительность: медленнее
- Использование: множественные элементы

**Рекомендация:** Используйте `getElementById` для id, `querySelector`/`querySelectorAll` для остального.

### HTMLCollection vs NodeList

**HTMLCollection:**

- «живая» коллекция (обновляется при изменении DOM)
- содержит только элементы (`Element`)
- возвращается `getElementsBy*` методами

**NodeList:**

- обычно статичная (не меняется после получения)
- может содержать любые узлы
- возвращается `querySelectorAll`

**Практический вывод:**

- в современном коде чаще используем `querySelector` / `querySelectorAll` и работаем с `NodeList`
- если вдруг нужно отслеживать изменения коллекции — смотри в сторону `MutationObserver`, а не опирайся на «живость» коллекций

**Преобразование в массив:**

```javascript
const cards = document.querySelectorAll('.card')
const arr = Array.from(cards)
// или
const arr2 = [...cards]
```

---

## 30.3. Создание и изменение элементов

### Создание и вставка

```javascript
const div = document.createElement('div')

div.textContent = 'Hello'
div.classList.add('card')

container.append(div) // в конец
// container.prepend(div) — в начало
// el.before(div)        — перед элементом
// el.after(div)         — после элемента
```

**Современные методы вставки:**

- `append` / `prepend` — в конец/начало
- `before` / `after` — перед/после элемента
- `replaceWith` — заменить элемент

**Устаревшие методы (избегайте):**

- `appendChild` — используйте `append`
- `insertBefore` — используйте `before`

### Удаление

```javascript
div.remove() // Современный метод
// div.parentNode.removeChild(div) — устаревший
```

### Работа с классами

```javascript
el.classList.add('active')
el.classList.remove('hidden')
el.classList.toggle('open')
el.classList.replace('old', 'new')

if (el.classList.contains('error')) {
  // ...
}
```

**Преимущества `classList`:**

- Можно добавлять/удалять несколько классов
- Автоматически обрабатывает дубликаты
- Более читаемо, чем `className`

### `innerHTML` vs `textContent`

**`innerHTML`:**

- парсит строку как HTML
- удобно для быстрого шаблонирования
- **опасно** при вставке пользовательских данных (XSS)

**`textContent`:**

- воспринимает всё как текст
- **безопасен по умолчанию**
- не парсит HTML

**Примеры:**

```javascript
// потенциально опасно, если text пришёл от пользователя
el.innerHTML = `<p>${text}</p>`

// безопасно
el.textContent = text

// Безопасная вставка HTML (если нужно)
el.innerHTML = sanitizeHTML(userInput)
```

**Практическое правило:**

- `innerHTML` только для статических шаблонов, где ты полностью контролируешь содержимое
- пользовательские данные — только через `textContent` или безопасные шаблонизаторы

---

## 30.4. Производительность DOM: где реально дорого

DOM‑операции значительно тяжелее обычных вычислений в JS. Основные источники проблем:

- частые обращения к layout‑свойствам (`offsetWidth`, `getBoundingClientRect`)
- многократные вставки / удаления элементов по одному
- чередование чтения и записи layout‑свойств (**layout thrashing**)

### DocumentFragment: массовая вставка

Вместо тысячи `.append` по одному элементу:

```javascript
// Плохо — много перерисовок
items.forEach((item) => {
  const node = createNode(item)
  container.append(node) // Каждый append вызывает перерисовку
})

// Хорошо — одна перерисовка
const fragment = document.createDocumentFragment()

items.forEach((item) => {
  const node = createNode(item)
  fragment.append(node)
})

container.append(fragment) // Одна операция вставки
```

Это резко уменьшает количество перерисовок.

### Batch‑обновления стилей

**Плохо:**

```javascript
for (let i = 0; i < 1000; i++) {
  element.style.left = `${i}px` // Каждое изменение вызывает перерисовку
}
```

**Лучше вычислить всё в JS, а затем применить один раз:**

```javascript
let left = 0

for (let i = 0; i < 1000; i++) {
  left += 1
}

element.style.left = `${left}px` // Одна перерисовка
```

**Или использовать CSS классы:**

```javascript
// Плохо
element.style.display = 'none'
element.style.opacity = '0'
element.style.transform = 'translateY(10px)'

// Хорошо
element.classList.add('hidden')
```

### Layout thrashing

**Антипаттерн:** чередование чтения layout‑свойств и записи стилей в цикле:

```javascript
// Плохо — layout thrashing
for (let i = 0; i < 1000; i++) {
  element.style.left = `${i}px` // Запись
  console.log(element.offsetLeft) // Чтение — провоцирует пересчёт layout
}
```

**Правильный подход:**

- сначала все чтения (сохранить значения в переменные)
- потом все записи

```javascript
// Хорошо — сначала чтения, потом записи
const widths = []
for (let i = 0; i < 1000; i++) {
  widths.push(elements[i].offsetWidth) // Все чтения
}

for (let i = 0; i < 1000; i++) {
  elements[i].style.left = `${widths[i]}px` // Все записи
}
```

**Практический совет:** если в цикле нужно и читать, и писать свойства DOM, делайте это в два прохода: сначала все «чтения» свойств (например, `offsetWidth`, `getBoundingClientRect()`), а затем все «записи» стилей. Если их чередовать в одном цикле, браузер будет вынужден пересчитывать верстку на каждой итерации, что резко снижает производительность.

---

## 30.5. Дорогие layout‑свойства

Следующие свойства вызывают пересчёт layout (reflow):

- `offsetWidth`, `offsetHeight`
- `offsetTop`, `offsetLeft`
- `clientWidth`, `clientHeight`
- `scrollWidth`, `scrollHeight`
- `getBoundingClientRect()`
- `getComputedStyle()` (в некоторых случаях)

**Правило:** Кэшируйте значения этих свойств, если используете их несколько раз.

```javascript
// Плохо
const width = element.offsetWidth
const height = element.offsetHeight
const rect = element.getBoundingClientRect()
// Каждое чтение вызывает reflow

// Хорошо
const rect = element.getBoundingClientRect() // Один reflow
const width = rect.width
const height = rect.height
```

---

## 30.6. Оптимизация работы с DOM

### 1. Кэширование элементов

```javascript
// Плохо — поиск на каждой итерации
for (let i = 0; i < 100; i++) {
  const element = document.querySelector('.item')
  element.textContent = i
}

// Хорошо — кэширование
const element = document.querySelector('.item')
for (let i = 0; i < 100; i++) {
  element.textContent = i
}
```

### 2. Минимизация изменений DOM

```javascript
// Плохо — много изменений
items.forEach((item) => {
  const div = document.createElement('div')
  div.textContent = item.name
  container.append(div)
})

// Хорошо — один раз
const html = items.map((item) => `<div>${item.name}</div>`).join('')
container.innerHTML = html
```

### 3. Использование виртуального DOM (в фреймворках)

React, Vue и другие фреймворки используют виртуальный DOM для минимизации реальных изменений DOM.

### 4. requestAnimationFrame для анимаций

```javascript
// Плохо
setInterval(() => {
  element.style.left = `${x++}px`
}, 16)

// Хорошо
function animate() {
  element.style.left = `${x++}px`
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
```

---

## 30.7. Измерение производительности

```javascript
// Измерение времени выполнения
const start = performance.now()

// DOM операции
for (let i = 0; i < 1000; i++) {
  element.style.left = `${i}px`
}

const end = performance.now()
console.log(`Took ${end - start}ms`)
```

**DevTools Performance:**

- Записывайте профиль производительности
- Ищите длительные задачи (Long Tasks)
- Анализируйте Layout и Paint события

---

## Вопросы на собеседовании

### 1. Что такое layout thrashing?

Чередование чтения layout‑свойств и записи стилей в цикле, что вызывает множественные пересчёты layout. Решение: сначала все чтения, потом все записи.

### 2. Как оптимизировать массовую вставку элементов?

Использовать `DocumentFragment` для группировки элементов и одной вставки вместо множественных.

### 3. В чём разница между innerHTML и textContent?

`innerHTML` парсит HTML и может быть опасен (XSS). `textContent` безопасен, воспринимает всё как текст.

### 4. Какие свойства вызывают reflow?

`offsetWidth`, `offsetHeight`, `getBoundingClientRect()`, `getComputedStyle()` и другие layout‑свойства.

### 5. Как кэшировать элементы?

Сохранять результаты `querySelector` в переменные вместо повторных поисков.

### 6. В чём разница между HTMLCollection и NodeList?

HTMLCollection — «живая» коллекция, обновляется при изменении DOM. NodeList — обычно статичная.

