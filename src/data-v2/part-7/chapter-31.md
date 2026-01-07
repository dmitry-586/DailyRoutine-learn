# Глава 31. События: capturing, bubbling, распространение и делегирование

События — основа интерактивности веб-приложений. Понимание фаз событий, всплытия и делегирования критично для написания правильного и производительного кода.

---

## 31.1. Подписка и отписка

### addEventListener

```javascript
function handleClick(event) {
  console.log('clicked', event.target)
}

button.addEventListener('click', handleClick)
```

**Параметры:**

```javascript
element.addEventListener(type, listener, options)
```

**options может быть:**

- `boolean` — `useCapture` (устаревший способ)
- `object`:
  - `capture: true/false` — фаза захвата
  - `once: true` — выполнить один раз
  - `passive: true` — не вызывать `preventDefault()`
  - `signal: AbortSignal` — отмена через AbortController

**Примеры:**

```javascript
// Один раз
button.addEventListener('click', handler, { once: true })

// Passive (для прокрутки)
element.addEventListener('scroll', handler, { passive: true })

// С отменой
const controller = new AbortController()
button.addEventListener('click', handler, { signal: controller.signal })
controller.abort() // Отменяет подписку
```

### removeEventListener

```javascript
button.removeEventListener('click', handleClick)
```

**Важно:** чтобы отписаться, нужно передать **ровно ту же функцию**, что и при подписке.

```javascript
// ❌ Не работает
button.addEventListener('click', () => console.log('click'))
button.removeEventListener('click', () => console.log('click')) // Другая функция!

// ✅ Работает
const handler = () => console.log('click')
button.addEventListener('click', handler)
button.removeEventListener('click', handler)
```

---

## 31.2. Фазы события

События проходят через три фазы:

1. **Capturing (погружение)** — событие идёт сверху вниз к целевому элементу
2. **Target** — событие на целевом элементе
3. **Bubbling (всплытие)** — от целевого элемента вверх к `document`

**Визуализация:**

```
document
  └── html
      └── body
          └── div (capturing здесь)
              └── button (target здесь)
          └── div (bubbling здесь)
  └── document (bubbling здесь)
```

**Пример:**

```html
<div id="parent">
  <button id="child">Click</button>
</div>
```

```javascript
const parent = document.getElementById('parent')
const child = document.getElementById('child')

// Capturing фаза
parent.addEventListener('click', () => console.log('Parent capturing'), true)

// Bubbling фаза (по умолчанию)
parent.addEventListener('click', () => console.log('Parent bubbling'))

// Target
child.addEventListener('click', () => console.log('Child'))
```

**Порядок вывода при клике на button:**

1. `Parent capturing` (capturing)
2. `Child` (target)
3. `Parent bubbling` (bubbling)

**По умолчанию** обработчики в `addEventListener` подписываются на фазу всплытия.

---

## 31.3. event.target vs event.currentTarget

**`event.target`:**

- Элемент, на котором произошло событие (целевой элемент)
- Может быть вложенным элементом

**`event.currentTarget`:**

- Элемент, на котором установлен обработчик
- Всегда равен `this` в обработчике

**Пример:**

```html
<div id="parent">
  <button>Click</button>
</div>
```

```javascript
const parent = document.getElementById('parent')

parent.addEventListener('click', function(event) {
  console.log('target:', event.target) // <button>
  console.log('currentTarget:', event.currentTarget) // <div>
  console.log('this:', this) // <div> (то же, что currentTarget)
})
```

---

## 31.4. Делегирование событий

**Идея:** вместо ста обработчиков на каждом элементе — один обработчик на общем родителе.

**Пример без делегирования:**

```javascript
// ❌ Плохо — много обработчиков
const items = document.querySelectorAll('li')
items.forEach(item => {
  item.addEventListener('click', () => {
    console.log('Clicked:', item.textContent)
  })
})

// Проблема: новые элементы не получают обработчик
```

**Пример с делегированием:**

```javascript
// ✅ Хорошо — один обработчик
const list = document.querySelector('ul')

list.addEventListener('click', (event) => {
  const target = event.target

  if (!(target instanceof HTMLElement)) return

  if (target.matches('li')) {
    console.log('Clicked:', target.textContent)
  }
})

// Работает для всех элементов, включая динамически добавленные
```

**Преимущества делегирования:**

- меньше обработчиков → меньше нагрузка на память и CPU
- работает с динамическими элементами (добавленными после подписки)
- проще централизованно управлять поведением
- лучше производительность

**Проверка целевого элемента:**

```javascript
list.addEventListener('click', (event) => {
  const target = event.target

  // Проверка через matches
  if (target.matches('li.item')) {
    handleItemClick(target)
  }

  // Проверка через closest
  const item = target.closest('li.item')
  if (item) {
    handleItemClick(item)
  }
})
```

**`closest` полезен, когда:**

- Целевой элемент может быть вложенным (например, кнопка внутри `li`)

```javascript
list.addEventListener('click', (event) => {
  const button = event.target.closest('button')
  if (button) {
    const item = button.closest('li')
    handleButtonClick(button, item)
  }
})
```

---

## 31.5. Остановка распространения

### preventDefault

Отменяет дефолтное поведение элемента:

```javascript
a.addEventListener('click', (event) => {
  event.preventDefault() // Отменить переход по ссылке
})

form.addEventListener('submit', (event) => {
  event.preventDefault() // Отменить отправку формы
})
```

### stopPropagation

Останавливает всплытие события:

```javascript
button.addEventListener('click', (event) => {
  event.stopPropagation() // Событие не всплывёт дальше
  // Родительские элементы не получат событие
})
```

### stopImmediatePropagation

Останавливает всплытие и предотвращает вызов других обработчиков на том же элементе:

```javascript
button.addEventListener('click', (event) => {
  event.stopImmediatePropagation() // Остальные обработчики не вызовутся
})
```

**⚠️ Злоупотреблять `stopPropagation()` не стоит** — это усложняет отладку и может сломать другие обработчики.

---

## 31.6. Типы событий

### События мыши

- `click` — клик
- `dblclick` — двойной клик
- `mousedown` — нажатие кнопки
- `mouseup` — отпускание кнопки
- `mousemove` — движение мыши
- `mouseenter` — вход в элемент (не всплывает)
- `mouseleave` — выход из элемента (не всплывает)
- `mouseover` — наведение (всплывает)
- `mouseout` — уход (всплывает)

### События клавиатуры

- `keydown` — нажатие клавиши
- `keyup` — отпускание клавиши
- `keypress` — устаревшее, не использовать

### События формы

- `submit` — отправка формы
- `change` — изменение значения
- `input` — ввод текста
- `focus` — получение фокуса
- `blur` — потеря фокуса

### События загрузки

- `load` — загрузка завершена
- `DOMContentLoaded` — DOM готов
- `beforeunload` — перед закрытием страницы

---

## 31.7. События и производительность

### Passive listeners

Для событий прокрутки и касаний используйте `passive: true`:

```javascript
element.addEventListener('scroll', handler, { passive: true })
element.addEventListener('touchstart', handler, { passive: true })
```

**Почему?**

Браузер может оптимизировать прокрутку, зная, что `preventDefault()` не будет вызван.

### Throttling и debouncing

**Throttling** — ограничение частоты вызова:

```javascript
function throttle(func, delay) {
  let lastCall = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func.apply(this, args)
    }
  }
}

window.addEventListener('scroll', throttle(handleScroll, 100))
```

**Debouncing** — задержка вызова до паузы:

```javascript
function debounce(func, delay) {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

input.addEventListener('input', debounce(handleInput, 300))
```

---

## 31.8. Кастомные события

```javascript
// Создание события
const event = new CustomEvent('myevent', {
  detail: { data: 'some data' },
  bubbles: true
})

// Отправка
element.dispatchEvent(event)

// Подписка
element.addEventListener('myevent', (event) => {
  console.log(event.detail.data) // 'some data'
})
```

---

## 31.9. Практические паттерны

### Обработка кликов вне элемента

```javascript
document.addEventListener('click', (event) => {
  const menu = document.getElementById('menu')
  
  if (!menu.contains(event.target)) {
    menu.classList.remove('open')
  }
})
```

### Обработка клавиатуры

```javascript
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
  
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault()
    save()
  }
})
```

### Делегирование для динамических списков

```javascript
const list = document.getElementById('list')

list.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-btn')
  if (deleteButton) {
    const item = deleteButton.closest('li')
    item.remove()
  }
})
```

---

## Вопросы на собеседовании

### 1. Что такое capturing и bubbling?

Capturing — фаза погружения (сверху вниз). Bubbling — фаза всплытия (снизу вверх). По умолчанию обработчики на фазе bubbling.

### 2. В чём разница между event.target и event.currentTarget?

`target` — элемент, на котором произошло событие. `currentTarget` — элемент, на котором установлен обработчик.

### 3. Что такое делегирование событий?

Подход, при котором один обработчик на родителе обрабатывает события всех дочерних элементов. Улучшает производительность и работает с динамическими элементами.

### 4. Как остановить всплытие события?

Использовать `event.stopPropagation()`. Но злоупотреблять не стоит.

### 5. В чём разница между stopPropagation и preventDefault?

`stopPropagation` останавливает всплытие. `preventDefault` отменяет дефолтное поведение элемента.

### 6. Зачем нужен passive: true?

Для оптимизации прокрутки. Браузер знает, что `preventDefault()` не будет вызван, и может оптимизировать рендеринг.

### 7. Как отписаться от события?

Использовать `removeEventListener` с той же функцией, что и при подписке.

---

## Key Takeaways

- События проходят через фазы: capturing → target → bubbling
- Делегирование событий улучшает производительность и работает с динамическими элементами
- `event.target` — целевой элемент, `event.currentTarget` — элемент с обработчиком
- Используйте `preventDefault` для отмены дефолтного поведения
- `stopPropagation` останавливает всплытие, но злоупотреблять не стоит
- Passive listeners оптимизируют прокрутку
- Throttling и debouncing для частых событий
- Понимание событий критично для интерактивных приложений

