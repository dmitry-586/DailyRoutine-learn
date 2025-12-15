# Глава 10. Работа с DOM

DOM — это мост между JavaScript и визуальным представлением страницы. Ошибки в работе с DOM напрямую приводят к проблемам с производительностью, багам и «тормозам» интерфейса — поэтому на собеседованиях эту тему проверяют особенно тщательно.

---

## 10.1. Навигация и поиск элементов

DOM — это дерево узлов.

### Основные методы поиска

**По id:**

```javascript
document.getElementById('app')
```

**По селекторам (рекомендуется):**

```javascript
document.querySelector('.card')
document.querySelectorAll('.card')
```

querySelectorAll возвращает NodeList, а не массив.

### HTMLCollection vs NodeList

**HTMLCollection:**

- Живая коллекция: да
- Тип: элементы

**NodeList:**

- Живая коллекция: нет
- Тип: узлы

HTMLCollection — живая коллекция, обновляется при изменении DOM. NodeList — статичная коллекция (обычно), содержит узлы.

---

## 10.2. Манипуляции DOM

### Создание элементов

```javascript
const div = document.createElement('div')
div.textContent = 'Hello'
```

### Вставка

- `parent.append(div)` — в конец
- `parent.prepend(div)` — в начало
- `parent.before(div)` — перед элементом
- `parent.after(div)` — после элемента

### Удаление

`div.remove()`

### Изменение классов

- `el.classList.add("active")`
- `el.classList.remove("active")`
- `el.classList.toggle("open")`
- `el.classList.contains("active")` — проверка

### innerHTML vs textContent

**innerHTML:**

- парсит HTML (опасно при XSS)

**textContent:**

- безопасный текст (не парсит HTML)

Важно: innerHTML может быть уязвим к XSS-атакам, если вставляются пользовательские данные.

---

## 10.3. События и делегирование

### Добавление обработчика

`button.addEventListener("click", handler)`

### Удаление обработчика

`button.removeEventListener("click", handler)`

### Фазы событий

1. Capturing (погружение) — от корня к целевому элементу
2. Target — на целевом элементе
3. Bubbling (всплытие) — от целевого элемента к корню

По умолчанию используется bubbling.

**Обработка на стадии capturing:**

`element.addEventListener("click", handler, true)`

### Делегирование

Один обработчик на родителе вместо множества на детях.

```javascript
list.addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    console.log(e.target.textContent)
  }
})
```

**Почему это важно?**

- меньше обработчиков
- динамические элементы (добавленные позже тоже работают)
- лучшая производительность
- меньше потребление памяти

### Остановка всплытия

- `e.stopPropagation()` — останавливает всплытие
- `e.preventDefault()` — предотвращает стандартное поведение

---

## 10.4. Производительность DOM

DOM — медленный по сравнению с JS.

### Частые ошибки

- частые чтения layout (offsetHeight, getBoundingClientRect)
- вставка элементов по одному
- синхронные изменения стилей
- layout thrashing (чередование чтения и записи layout-свойств)

### Оптимизация

**DocumentFragment:**

```javascript
const fragment = document.createDocumentFragment()

items.forEach((item) => {
  fragment.append(createNode(item))
})

container.append(fragment)
```

Одна операция вместо множества — значительно быстрее.

**Batch updates:**

```javascript
el.style.display = 'none'
// все изменения
el.style.display = ''
```

Изменения группируются, браузер делает один reflow вместо множества.

### Избегание layout thrashing

**Плохо:**

```javascript
for (let i = 0; i < 1000; i++) {
  element.style.left = i + 'px'
  console.log(element.offsetLeft) // провоцирует reflow
}
```

**Хорошо:**

```javascript
let left = 0
for (let i = 0; i < 1000; i++) {
  left += 1
}

element.style.left = left + 'px'
```

Порядок: сначала все чтения, потом все записи.

---

## 10.5. Observer API

### IntersectionObserver

Используется для:

- lazy-loading изображений
- бесконечной прокрутки
- отслеживания видимости элементов

```javascript
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMore()
  }
})

observer.observe(element)
```

### Lazy-loading изображений

```javascript
const images = document.querySelectorAll('img[data-src]')

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src
      observer.unobserve(entry.target)
    }
  })
})

images.forEach((img) => observer.observe(img))
```

### MutationObserver

Отслеживает изменения DOM.

```javascript
const observer = new MutationObserver(callback)

observer.observe(target, {
  childList: true,
  attributes: true,
  subtree: true,
})
```

Используется для:

- отслеживания изменений структуры
- отладки
- реактивных систем

### ResizeObserver

Отслеживает изменения размеров элементов.

```javascript
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry.contentRect.width)
  })
})

observer.observe(element)
```

---

## Вопросы на собеседовании

### 1. Что такое DOM?

Document Object Model — объектное представление HTML-документа в виде дерева узлов.

### 2. Разница между NodeList и HTMLCollection?

HTMLCollection — живая коллекция элементов, обновляется при изменении DOM. NodeList — обычно статичная коллекция узлов.

### 3. innerHTML vs textContent?

innerHTML парсит HTML (опасно при XSS), textContent — безопасный текст.

### 4. Что такое всплытие событий?

Механизм, при котором событие распространяется от целевого элемента вверх по дереву DOM.

### 5. Зачем нужно делегирование?

Один обработчик на родителе вместо множества на детях. Работает с динамическими элементами, лучше производительность.

### 6. Почему DOM-операции дорогие?

DOM находится в отдельном процессе, каждое обращение требует IPC. Операции с DOM вызывают reflow/repaint.

### 7. Что такое layout thrashing?

Чередование чтения и записи layout-свойств, вызывающее множественные reflow. Решение: группировать чтения и записи.

### 8. Для чего нужен IntersectionObserver?

Отслеживание видимости элементов: lazy-loading, бесконечная прокрутка, аналитика.

### 9. MutationObserver vs IntersectionObserver?

MutationObserver отслеживает изменения DOM. IntersectionObserver отслеживает видимость элементов.

### 10. Как оптимизировать работу с DOM?

- использовать DocumentFragment
- группировать изменения (batch updates)
- избегать layout thrashing
- использовать делегирование событий
- минимизировать количество DOM-операций

---

## Key Takeaways

- DOM — медленный, минимизируй обращения к нему
- Делегирование событий — лучшая практика для динамических элементов
- DocumentFragment ускоряет массовую вставку элементов
- Layout thrashing — частая причина проблем производительности
- IntersectionObserver — современный способ lazy-loading
- MutationObserver отслеживает изменения DOM
- Порядок операций: сначала все чтения, потом все записи
- innerHTML опасен при работе с пользовательскими данными

---

Дальше мы посмотрим, как все эти знания про синхронный код и DOM сочетаются с асинхронностью: разберём Event Loop, промисы, async/await и типичные ловушки, из‑за которых интерфейсы начинают «жить своей жизнью».
