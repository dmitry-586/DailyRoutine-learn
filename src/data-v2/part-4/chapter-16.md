# Глава 16. Адаптивность и дизайн-токены: media queries, container queries, CSS variables

Адаптивность — не только media queries. Это целый набор инструментов: media queries, container queries, CSS variables, современные функции и единицы измерения. Понимание этих инструментов критично для создания гибких и масштабируемых интерфейсов.

---

## 16.1. Media queries

Media queries — классический метод создания адаптивных интерфейсов.

**Базовый синтаксис:**

```css
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
```

**Типы медиа-запросов:**

- `width`, `min-width`, `max-width` — ширина viewport
- `height`, `min-height`, `max-height` — высота viewport
- `orientation: portrait | landscape` — ориентация
- `prefers-color-scheme: dark | light` — тёмная/светлая тема
- `prefers-reduced-motion: reduce` — уменьшенная анимация
- `hover: hover | none` — поддержка hover

**Частые брейкпоинты:**

- 320px (мобильный минимум)
- 480px (большие мобильные)
- 768px (планшеты)
- 1024px (ноутбуки)
- 1280px (десктопы)
- 1440px (большие десктопы)
- 1920px (Full HD)

Но хороший адаптив строится от контента, а не от устройств.

### Mobile-first стратегия

Современная лучшая практика:

1. Пишем стили для мобильной версии
2. Добавляем более сложные стили для больших экранов через min-width

```css
/* Mobile-first */
.card {
  padding: 16px;
}

@media (min-width: 768px) {
  .card {
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

**Почему mobile-first?**

- Большинство пользователей на мобильных
- Проще добавлять, чем убирать
- Лучше производительность (меньше CSS для мобильных)

### Desktop-first (устаревший подход)

```css
/* Desktop-first (не рекомендуется) */
.card {
  padding: 24px;
  display: grid;
}

@media (max-width: 767px) {
  .card {
    padding: 16px;
    display: block;
  }
}
```

---

## 16.2. Container queries

Container queries — революция в адаптивности. Позволяют применять стили на основе размера контейнера, а не viewport.

**Проблема media queries:**

Media queries реагируют на размер экрана, но не на размер компонента. Если компонент в узком сайдбаре — он всё равно получает стили для широкого экрана.

**Решение — Container Queries:**

```css
.card-container {
  container-type: inline-size; /* Или size */
  container-name: card; /* Опционально */
}

.card {
  padding: 16px;
}

@container (min-width: 400px) {
  .card {
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

/* С именованным контейнером */
@container card (min-width: 400px) {
  .card {
    /* стили */
  }
}
```

**container-type:**

- `inline-size` — отслеживает только ширину
- `size` — отслеживает ширину и высоту
- `normal` — не создаёт контекст (по умолчанию)

**Использование:**

- Компоненты в сайдбарах
- Карточки в сетках
- Виджеты разного размера
- Компоненты, которые должны адаптироваться к родителю

**Поддержка браузеров:**

Современная фича, поддерживается в Chrome 105+, Safari 16+, Firefox 110+.

---

## 16.3. CSS Custom Properties (переменные)

CSS-переменные — это настоящие runtime-переменные, в отличие от препроцессоров.

CSS-переменные выглядят так:

```css
:root {
  --primary-color: #3b82f6;
  --spacing: 16px;
  --font-size-base: 16px;
}
```

**Использование:**

```css
.button {
  background: var(--primary-color);
  padding: var(--spacing);
  font-size: var(--font-size-base);
}
```

### Главное отличие custom properties от препроцессорных переменных

**SCSS:**

- подставляются во время сборки
- статичны
- не видны в DevTools как переменные

**CSS custom properties:**

- вычисляются во время работы
- наследуются
- динамически обновляются через JS
- участвуют в каскаде

### Почему CSS-переменные — лучшее решение для темизации

**Темная тема:**

```css
:root {
  --bg: white;
  --text: black;
  --primary: #3b82f6;
}

[data-theme='dark'] {
  --bg: #1a1a1a;
  --text: #ffffff;
  --primary: #60a5fa;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

JS переключает только атрибут:

```javascript
document.body.dataset.theme = 'dark'
```

А CSS сам всё перекрасит. Без перерендера, без миграций, без сложного JS.

**Почему это важно?**

- работают в runtime
- могут переопределяться в DOM
- реагируют на media queries
- удобны для темизации

### Fallback значения

```css
.button {
  background: var(--primary-color, #3b82f6); /* Fallback если переменная не определена */
}
```

### Работа с переменными в JavaScript

```javascript
// Чтение
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color')

// Запись
document.documentElement.style.setProperty('--primary-color', '#ff0000')
```

---

## 16.4. Дизайн-токены (Design Tokens)

Дизайн-токены — это атомарные значения дизайна: цвета, размеры, отступы, шрифты. CSS Variables — идеальный способ их реализации.

**Структура токенов:**

```css
:root {
  /* Цвета */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;

  /* Отступы */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Типографика */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* Радиусы */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Тени */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

**Использование:**

```css
.button {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-primary-500);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  font-size: var(--font-size-base);
}
```

**Преимущества:**

- Централизованное управление дизайном
- Легко менять тему
- Консистентность во всём приложении
- Интеграция с дизайн-системами

---

## 16.5. Современные функции и единицы

### clamp()

Функция для задания адаптивных, но ограниченных значений.

```css
font-size: clamp(1rem, 2vw, 2rem);
```

Это значит:

- меньше 1rem → не уменьшать
- больше 2rem → не увеличивать
- в пределах — масштабировать от ширины экрана

**Использование:**

```css
.title {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

.container {
  width: clamp(300px, 90vw, 1200px);
}
```

### min(), max()

```css
.container {
  width: min(100%, 1200px); /* Не больше 1200px */
  padding: max(16px, 2vw); /* Не меньше 16px */
}
```

### Единицы измерения для адаптивности

**%** — от родителя

```css
.child {
  width: 50%; /* 50% от ширины родителя */
}
```

**vw, vh** — доли viewport

```css
.full-width {
  width: 100vw; /* Вся ширина viewport */
}

.full-height {
  height: 100vh; /* Вся высота viewport */
}
```

 `100vw` может вызвать горизонтальный скролл из-за полосы прокрутки. Используйте `100%` вместо `100vw`.

**rem, em** — относительные единицы

```css
/* rem — относительно корневого элемента */
.text {
  font-size: 1.5rem; /* 1.5 × 16px = 24px (если root = 16px) */
}

/* em — относительно родителя */
.text {
  font-size: 1.5em; /* 1.5 × font-size родителя */
}
```

**fr** — единицы Grid

```css
.grid {
  grid-template-columns: 1fr 2fr 1fr; /* 1:2:1 */
}
```

### Fluid typography

Современный подход к адаптивной типографике:

```css
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}
```

---

## 16.6. Flexbox и Grid делают адаптив проще

**Flex-wrap:**

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
```

**Grid-автоматизация:**

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

Это мощнейший приём. Автоматически создаёт адаптивную сетку без media queries.

**Адаптивная сетка:**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
```

---

## 16.7. Responsive images

Используем srcset:

```html
<img
  src="image-640.jpg"
  srcset="image-640.jpg 640w, image-1280.jpg 1280w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Description"
/>
```

Браузер сам выбирает правильное изображение.

**picture элемент:**

```html
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg" />
  <source media="(min-width: 400px)" srcset="medium.jpg" />
  <img src="small.jpg" alt="Description" />
</picture>
```

---

## 16.8. Практические примеры

**Пример 1: адаптивная карточка**

```css
.card {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 768px) {
  .card {
    padding: 24px;
    flex-direction: row;
  }
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

**Пример 2: адаптивная навигация**

```css
.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    gap: 24px;
  }
}
```

**Пример 3: sticky header**

```css
header {
  position: sticky;
  top: 0;
  background: var(--bg-primary);
  z-index: 100;
}
```

---

## Вопросы на собеседовании

### 1. Что такое media queries?

Правила CSS, применяемые в зависимости от характеристик устройства (ширина, высота и т.д.).

### 2. Что такое mobile-first?

Стратегия разработки, при которой сначала пишутся стили для мобильных устройств, затем добавляются стили для больших экранов.

### 3. Что такое Container Queries?

Позволяют применять стили на основе размера контейнера, а не viewport. Решают проблему адаптивности компонентов.

### 4. Чем CSS-переменные отличаются от SCSS-переменных?

CSS Variables — динамические, runtime, наследуются, участвуют в каскаде. SCSS переменные — статические, compile-time, подставляются при сборке.

### 5. Что такое clamp()?

Функция CSS для задания адаптивных, но ограниченных значений. `clamp(min, preferred, max)`.

### 6. Как сделать адаптивную сетку без media queries?

Использовать Grid с auto-fit/auto-fill:

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

### 7. Что такое дизайн-токены?

Атомарные значения дизайна (цвета, размеры, отступы), реализуемые через CSS Variables.
