# Глава 11. Доступность: фокус, клавиатура, роли, ARIA

Доступность (accessibility, a11y) — это не дополнительная опция, а обязательная часть разработки. Около 20% пользователей используют клавиатуру вместо мыши, а миллионы людей полагаются на ассистивные технологии (screen readers, голосовое управление).

Хорошо доступный интерфейс работает для всех:

- пользователей с клавиатурой
- пользователей с screen readers
- пользователей с ограниченной моторикой
- пользователей с нарушениями зрения
- всех остальных

На собеседованиях это проверяют, потому что:

- доступность — требование законодательства в ряде стран (ADA, WCAG)
- это показатель профессионализма разработчика
- доступность улучшает UX для всех пользователей
- это часть инклюзивного дизайна

---

## 11.1. ARIA (Accessible Rich Internet Applications)

ARIA (Accessible Rich Internet Applications) — набор атрибутов, которые помогают screen readers понять назначение взаимодействия.

**Главное правило:**

Не добавляй ARIA там, где хватает нативной семантики.

ARIA — это не «волшебная палочка для доступности», а инструмент точечной настройки. Если можно решить задачу нативным тегом (`<button>`, `<label>`, `<nav>`), так и нужно делать — это всегда надёжнее, проще и предсказуемее для ассистивных технологий.

ARIA используется, когда:

- нативного элемента нет (например, выпадающий список на кастомном UI)
- поведение меняется динамически (открыто/закрыто, выбрано/не выбрано)
- нужно сообщать screen reader-ам состояние или дополнительный контекст

**Правило WAI-ARIA №1:**

Не используйте ARIA, если можно использовать нативный элемент.

### Основные ARIA-атрибуты

**Роли (role)**

- `button` — кнопка
- `dialog` — диалоговое окно
- `navigation` — навигация
- `alert` — предупреждение
- `checkbox` — чекбокс
- `progressbar` — прогресс-бар

**Пример:**

```html
<div role="button" tabindex="0">Save</div>
```

Но лучше:

```html
<button>Save</button>
```

**Состояния и свойства (aria-\*)**

- `aria-label="…"` — прямое текстовое описание
- `aria-labelledby="…"` — ссылка на ID элемента с описанием
- `aria-describedby="…"` — ссылка на ID элемента с дополнительным описанием
- `aria-hidden="true"` — скрыть от screen readers
- `aria-expanded="true/false"` — состояние раскрытия (для меню, аккордеонов)
- `aria-selected` — выбран ли элемент
- `aria-checked` — отмечен ли чекбокс/радио
- `aria-controls="id"` — элемент управляет другим элементом
- `aria-live="polite/assertive"` — область с динамическим контентом

**Пример для раскрывающегося меню:**

```html
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>
  <li>Item A</li>
</ul>
```

**aria-label — невидимое текстовое описание:**

```html
<button aria-label="Search button"></button>
```

**aria-labelledby vs aria-label:**

```html
<!-- aria-label: прямое описание -->
<button aria-label="Close dialog">×</button>

<!-- aria-labelledby: ссылка на другой элемент -->
<h2 id="dialog-title">Confirm Action</h2>
<div role="dialog" aria-labelledby="dialog-title">
  <!-- содержимое -->
</div>
```

---

## 11.2. Доступность интерфейсов: UX без мыши

Важно помнить: около 20% пользователей используют клавиатуру вместо мыши.

То есть интерфейс должен работать так:

- **Tab** перемещает фокус
- **Enter/Space** активируют элементы
- **Escape** закрывает popup
- **Стрелки** навигируют в списках/меню
- Фокус не должен «застревать» в модальных окнах

**Проблема с кастомными компонентами:**

если ты создаёшь кастомный dropdown или modal из div'ов — тебе придётся вручную описывать навигацию по клавиатуре.

### Управление фокусом

**tabindex:**

- `tabindex="0"` — элемент в порядке табуляции
- `tabindex="-1"` — элемент не в порядке табуляции, но может получить фокус программно
- `tabindex="1+"` — не использовать (нарушает естественный порядок)

**Пример:**

```html
<!-- Обычный порядок табуляции -->
<button>Button 1</button>
<div tabindex="0">Custom button</div>
<button>Button 2</button>

<!-- Программный фокус -->
<div tabindex="-1" id="modal">Modal</div>
<script>
  document.getElementById('modal').focus()
</script>
```

### Фокус в модальных окнах

При открытии модального окна:

1. Сохранить текущий фокус
2. Переместить фокус в модальное окно
3. Заблокировать фокус внутри модального окна (trap focus)
4. При закрытии вернуть фокус на предыдущий элемент

**Пример:**

```javascript
let previousFocus

function openModal() {
  previousFocus = document.activeElement
  modal.focus()
  // Trap focus внутри modal
}

function closeModal() {
  modal.hidden = true
  previousFocus?.focus()
}
```

### Визуальные скрытия vs доступные скрытия

Иногда нужно скрыть элемент визуально, но оставить доступным читателю.

**Плохо:**

```css
display: none; /* Скрывает и от screen readers */
visibility: hidden; /* Тоже скрывает от screen readers */
```

**Хорошо:**

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

Элемент визуально скрыт, но доступен для screen readers.

---

## 11.3. Контраст, размеры и фокус

### Контраст

Контраст текста и фона должен соответствовать WCAG 2.1:

- **AA (минимальный):** 4.5:1 для обычного текста, 3:1 для крупного текста
- **AAA (улучшенный):** 7:1 для обычного текста, 4.5:1 для крупного текста

**Инструменты:**

- Chrome DevTools → Accessibility → Contrast
- WebAIM Contrast Checker

### Размеры интерактивных элементов

Минимальный размер интерактивного элемента — **44×44 px** (WCAG 2.1).

Это касается:

- кнопок
- ссылок
- полей ввода
- чекбоксов
- радио-кнопок

**Пример:**

```css
button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 24px; /* Увеличивает кликабельную область */
}
```

### Визуальный индикатор фокуса

Все интерактивные элементы должны иметь видимый индикатор фокуса.

**Плохо:**

```css
button:focus {
  outline: none; /* Убирает стандартный outline */
}
```

**Хорошо:**

```css
button:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* Или кастомный стиль */
button:focus-visible {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
```

**focus vs focus-visible:**

- `:focus` — срабатывает при любом фокусе (мышь, клавиатура)
- `:focus-visible` — срабатывает только при фокусе с клавиатуры (современный подход)

---

## 11.4. Типичные ошибки новичков

**1. Добавление ролей там, где они уже есть**

```html
<!-- Плохо -->
<button role="button">Click</button>

<!-- Хорошо -->
<button>Click</button>
```

**2. Использование role="button" вместо `<button>`**

```html
<!-- Плохо -->
<div role="button" tabindex="0" onclick="...">Click</div>

<!-- Хорошо -->
<button onclick="...">Click</button>
```

**3. Скрытие текста без альтернативы для screen reader**

```html
<!-- Плохо -->
<button></button> <!-- Screen reader скажет только "кнопка" -->

<!-- Хорошо -->
<button aria-label="Search"></button>
```

**4. Наследование aria-атрибутов (что не работает)**

ARIA-атрибуты не наследуются. Нужно указывать на каждом элементе.

```html
<!-- aria-label не наследуется -->
<div aria-label="Container">
  <button>Click</button> <!-- Не имеет aria-label -->
</div>
```

**5. Использование aria-hidden на интерактивных элементах**

```html
<!-- Плохо -->
<button aria-hidden="true">Click</button> <!-- Недоступен для screen readers -->

<!-- aria-hidden только для декоративных элементов -->
<div aria-hidden="true"></div>
```

---

## 11.5. Практические паттерны

### Кастомный чекбокс

```html
<div class="checkbox">
  <input type="checkbox" id="agree" aria-describedby="agree-desc">
  <label for="agree">Я согласен</label>
  <span id="agree-desc" class="visually-hidden">
    Согласие на обработку персональных данных
  </span>
</div>
```

### Кастомное модальное окно

```html
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-modal="true"
  tabindex="-1"
>
  <h2 id="modal-title">Confirm Action</h2>
  <button aria-label="Close dialog">×</button>
  <!-- содержимое -->
</div>
```

### Кастомное меню

```html
<button aria-expanded="false" aria-controls="menu" aria-haspopup="true">
  Menu
</button>
<ul id="menu" role="menu" hidden>
  <li role="menuitem"><a href="/">Home</a></li>
  <li role="menuitem"><a href="/about">About</a></li>
</ul>
```

---

## Вопросы на собеседовании

### 1. Что такое ARIA и когда она нужна?

ARIA — набор атрибутов для улучшения доступности. Используется только если нет нативных тегов или поведение сильно кастомное.

### 2. Почему `<button>` лучше, чем `<div role="button">`?

**`<button>`:**

- работает с клавиатурой
- имеет роль
- активируется Enter/Space
- фокусируется
- сообщает состояние screen reader

**`<div role="button">`:**

- нужно вручную реализовать всё поведение
- хуже для доступности
- чаще всего ошибка

### 3. Чем отличается aria-label от aria-labelledby?

- aria-label — прямое текстовое описание
- aria-labelledby — ссылка на ID другого элемента, который содержит описание

### 4. Какие правила доступности вы знаете?

- WCAG 2.1 стандарты
- контраст текста и фона (4.5:1 для AA)
- минимальный размер интерактивного элемента 44×44 px
- все интерактивные элементы должны быть фокусируемыми
- правильная навигация по клавиатуре

### 5. Что такое WCAG?

Web Content Accessibility Guidelines — международные стандарты доступности веб-контента.

### 6. Как управлять фокусом в модальном окне?

При открытии — переместить фокус в модальное окно и заблокировать его внутри (trap focus). При закрытии — вернуть фокус на предыдущий элемент.
