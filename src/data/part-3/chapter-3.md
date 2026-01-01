# Глава 11. Работа с DOM без магии и тормозов

DOM — это «лицо» вашего JavaScript‑кода. Любая ошибка здесь превращается в:

- дёрганый интерфейс;
- ненужные перерисовки;
- утечки памяти и лаги;
- сложные для отладки баги с событиями.

В этой главе мы разберём **DOM как систему**, а не набор разрозненных методов:

- как искать и навигировать по элементам;
- как безопасно изменять содержимое и классы;
- как правильно работать с событиями и делегированием;
- как думать о производительности DOM‑операций;
- когда и как использовать современные Observer‑API.

---

## 10.1. DOM как дерево узлов

**DOM (Document Object Model)** — это объектное представление HTML‑документа в виде дерева.

Узлы бывают разных типов:

- элемент (`<div>`, `<button>` и т.д.);
- текстовый узел;
- комментарий и служебные узлы.

Понимание, что DOM — это **дерево**, важно для:

- навигации (родители, дети, соседи);
- всплытия и погружения событий;
- измерения размеров и позиции элементов.

### Поиск элементов

Современный практический минимум:

```javascript
// по id
const app = document.getElementById('app')

// по CSS‑селектору (первый элемент)
const card = document.querySelector('.card')

// по CSS‑селектору (все элементы)
const cards = document.querySelectorAll('.card')
```

`querySelectorAll` возвращает **NodeList** (не массив, но итерируемый). При необходимости можно превратить в массив:

```javascript
const arr = Array.from(cards)
// или
const arr2 = [...cards]
```

### HTMLCollection vs NodeList

**HTMLCollection**:

- «живая» коллекция (обновляется при изменении DOM);
- содержит только элементы (`Element`).

**NodeList**:

- обычно статичная (не меняется после получения);
- может содержать любые узлы.

Практический вывод:

- в современном коде чаще используем `querySelector` / `querySelectorAll` и работаем с `NodeList`;
- если вдруг нужно отслеживать изменения коллекции — смотри в сторону `MutationObserver`, а не опирайся на «живость» коллекций.

---

## 10.2. Создание и изменение элементов

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

Удаление:

```javascript
div.remove()
```

### Работа с классами

```javascript
el.classList.add('active')
el.classList.remove('hidden')
el.classList.toggle('open')

if (el.classList.contains('error')) {
  // ...
}
```

### `innerHTML` vs `textContent`

`innerHTML`:

- парсит строку как HTML;
- удобно для быстрого шаблонирования;
- **опасно** при вставке пользовательских данных (XSS).

`textContent`:

- воспринимает всё как текст;
- **безопасен по умолчанию**.

```javascript
// потенциально опасно, если text пришёл от пользователя
el.innerHTML = `<p>${text}</p>`

// безопасно
el.textContent = text
```

Практическое правило:

- `innerHTML` только для статических шаблонов, где ты полностью контролируешь содержимое;
- пользовательские данные — только через `textContent` или безопасные шаблонизаторы.

---

## 10.3. События: от простых обработчиков к делегированию

### Подписка и отписка

```javascript
function handleClick(event) {
  console.log('clicked', event.target)
}

button.addEventListener('click', handleClick)

// позже
button.removeEventListener('click', handleClick)
```

Важно: чтобы отписаться, нужно передать **ровно ту же функцию**, что и при подписке.

### Фазы события

1. **Capturing** (погружение) — событие идёт сверху вниз к целевому элементу.
2. **Target** — событие на целевом элементе.
3. **Bubbling** (всплытие) — от целевого элемента вверх к `document`.

По умолчанию обработчики в `addEventListener` подписываются на фазу всплытия.

```javascript
// обработчик на фазе capturing
el.addEventListener('click', handler, true)
```

### Делегирование событий

**Идея:** вместо ста обработчиков на каждом элементе — один обработчик на общем родителе.

```javascript
list.addEventListener('click', (event) => {
  const target = event.target

  if (!(target instanceof HTMLElement)) return

  if (target.matches('li')) {
    console.log('clicked item:', target.textContent)
  }
})
```

Преимущества делегирования:

- меньше обработчиков → меньше нагрузка на память и CPU;
- работает с динамическими элементами (добавленными после подписки);
- проще централизованно управлять поведением.

### Остановка всплытия и дефолтного поведения

```javascript
a.addEventListener('click', (event) => {
  event.preventDefault() // отменить переход по ссылке
  event.stopPropagation() // остановить всплытие
})
```

Злоупотреблять `stopPropagation()` не стоит — это усложняет отладку.

---

## 10.4. Производительность DOM: где реально дорого

DOM‑операции значительно тяжелее обычных вычислений в JS. Основные источники проблем:

- частые обращения к layout‑свойствам (`offsetWidth`, `getBoundingClientRect`);
- многократные вставки / удаления элементов по одному;
- чередование чтения и записи layout‑свойств (**layout thrashing**).

### DocumentFragment: массовая вставка

Вместо тысячи `.append` по одному элементу:

```javascript
const fragment = document.createDocumentFragment()

items.forEach((item) => {
  const node = createNode(item)
  fragment.append(node)
})

container.append(fragment) // одна операция вставки
```

Это резко уменьшает количество перерисовок.

### Batch‑обновления стилей

Плохо:

```javascript
for (let i = 0; i < 1000; i++) {
  element.style.left = `${i}px`
}
```

Лучше вычислить всё в JS, а затем применить один раз:

```javascript
let left = 0

for (let i = 0; i < 1000; i++) {
  left += 1
}

element.style.left = `${left}px`
```

### Layout thrashing

**Антипаттерн:** чередование чтения layout‑свойств и записи стилей в цикле:

```javascript
for (let i = 0; i < 1000; i++) {
  element.style.left = `${i}px`
  console.log(element.offsetLeft) // каждое чтение провоцирует пересчёт layout
}
```

Правильный подход:

- сначала все чтения (сохранить значения в переменные);
- потом все записи.

---

## 10.5. Observer‑API: Intersection, Mutation, Resize

Современные браузеры дают мощные API для «наблюдения» за DOM без постоянных опросов.

### IntersectionObserver

Используется для:

- lazy‑loading картинок;
- бесконечной прокрутки;
- отслеживания видимости блоков (аналитика, анимации при появлении).

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMore()
    }
  })
})

observer.observe(sentinelElement)
```

### Lazy‑loading изображений

```javascript
const images = document.querySelectorAll('img[data-src]')

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return

    const img = entry.target as HTMLImageElement
    img.src = img.dataset.src ?? ''

    obs.unobserve(img)
  })
})

images.forEach((img) => observer.observe(img))
```

### MutationObserver

Отслеживает изменения в DOM‑дереве:

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log(mutation.type)
  })
})

observer.observe(targetElement, {
  childList: true,
  attributes: true,
  subtree: true,
})
```

Применения:

- отладка сторонних скриптов;
- реактивные биндинги в «ванильном» JS;
- тестирование (проверка, что DOM изменился ожидаемым образом).

### ResizeObserver

Отслеживает изменения размеров элемента:

```javascript
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    console.log('width:', entry.contentRect.width)
  })
})

observer.observe(element)
```

Используется для:

- адаптивных виджетов;
- синхронизации размеров (например, колонок);
- аналитики и логирования.

---

## 10.6. Мини‑самопроверка по DOM

Проверь, что ты умеешь:

- объяснить разницу между `querySelector`, `querySelectorAll`, `getElementById` и когда что применять;
- безопасно вставлять пользовательский текст, не используя `innerHTML`;
- описать на словах, как работает делегирование событий и чем оно лучше отдельных обработчиков на каждом элементе;
- показать пример layout thrashing и переписать его на корректный вариант с батч‑обновлениями;
- объяснить, в каких задачах используешь `IntersectionObserver`, `MutationObserver` и `ResizeObserver`.

Если это получается, у тебя есть практическое понимание DOM не как «набор методов», а как системы, с которой нужно работать бережно и осознанно.
