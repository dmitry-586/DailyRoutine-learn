# Глава 17. Архитектура стилей: modules, BEM, CSS-in-JS, utility-first и Tailwind CSS

Когда проект растёт, «чистый CSS» становится проблемой: конфликты имён, сложность поддержки, непредсказуемость. Современная экосистема предлагает множество подходов к организации стилей: CSS Modules, BEM, CSS-in-JS, utility-first и Tailwind CSS.

На собеседованиях уровня Middle+ эту главу часто используют, чтобы понять:

- работали ли вы с большими кодовыми базами
- понимаете ли проблемы масштабирования CSS
- умеете ли выбирать инструмент под задачу, а не наоборот

---

## 17.1. CSS Modules

CSS Modules — это расширение сборщика (Webpack, Vite, и др.), а не нативный CSS. Требует поддержки со стороны инструментов сборки.

CSS Modules решают главную проблему CSS — глобальную область видимости.

Это техника, сейчас распространённая в React/Vue/Svelte.

**Пример:**

```css
/* button.module.css */
.primary {
  background: blue;
  padding: 10px 20px;
}

.secondary {
  background: gray;
}
```

**В JS:**

```javascript
import styles from './button.module.css'

<button className={styles.primary}>Click</button>
```

**Что происходит под капотом?**

Класс превращается в: `primary__3Gh7s`

Конфликты исчезают. Более того, стили компонентны по определению.

**Плюсы:**

- изоляция
- отсутствие конфликтов
- хорошая интеграция с React/Vue
- типобезопасность (с TypeScript)

**Минусы:**

- нельзя динамически формировать селекторы
- не нативный CSS
- требует сборки
- нет динамических runtime-возможностей (как у CSS Variables)

**Использование в React:**

```tsx
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return (
    <button className={styles[variant]}>
      Click
    </button>
  )
}
```

---

## 17.2. БЭМ: методология и практика

Методологии нужны только для больших проектов. Если ты работаешь над лендингом — BEM, скорее всего, лишний. Но в продуктовых командах методология даёт структуру.

БЭМ = Блок — Элемент — Модификатор

**Принцип:**

- `block` — независимый компонент
- `block__element` — часть блока
- `block--modifier` — вариант блока

**Пример карточки:**

```html
<div class="card card--featured">
  <h2 class="card__title">Header</h2>
  <p class="card__description">Description</p>
  <button class="button button--primary">Buy</button>
</div>
```

```css
/* Блок */
.card {
  padding: 20px;
  border: 1px solid #ccc;
}

/* Элемент */
.card__title {
  font-size: 24px;
  margin-bottom: 12px;
}

.card__description {
  color: #666;
}

/* Модификатор */
.card--featured {
  border-color: gold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Другой блок */
.button {
  padding: 10px 20px;
}

.button--primary {
  background: blue;
  color: white;
}
```

**Принципы:**

- каждый блок независим
- вложенность минимальна
- селекторы простые
- стили предсказуемы

**Плюсы БЭМ:**

- масштабируемость
- читаемость
- легко поддерживать
- идеален для командной разработки
- не требует сборки

**Минусы:**

- длинные классы
- может казаться громоздким
- многословность
- строгая дисциплина

**Когда использовать:**

- Большие проекты с командой
- Долгосрочная поддержка
- Когда нужна предсказуемость
- Проекты без сборки

---

## 17.3. CSS-in-JS

CSS-in-JS — подход, при котором стили описываются прямо в JS. Появилась из мира React, но потом распространилась шире.

**Идея простая:** Компонент отвечает сам за свои стили. Стиль — это часть логики UI.

**Самые популярные варианты:**

- styled-components
- Emotion
- JSS
- stitches
- vanilla-extract

**Пример (styled-components):**

```javascript
import styled from 'styled-components'

const Button = styled.button`
  padding: 10px;
  border-radius: 6px;
  background: ${(props) => (props.primary ? 'blue' : 'gray')};
  color: white;

  &:hover {
    background: ${(props) => (props.primary ? 'darkblue' : 'darkgray')};
  }
`

// Использование
<Button primary>Click</Button>
```

**Пример (Emotion):**

```javascript
import { css } from '@emotion/react'

const buttonStyle = css`
  padding: 10px;
  background: blue;
  color: white;

  &:hover {
    background: darkblue;
  }
`

<button css={buttonStyle}>Click</button>
```

Это сочетает:

- динамику JS
- читаемость CSS
- возможность темизации

**Плюсы:**

- динамические стили
- theme-поддержка
- колокация кода и стилей
- типобезопасность (с TypeScript)
- автоматическая изоляция

**Минусы:**

- runtime-нагрузка
- сложнее дебажить
- зависит от библиотеки
- проблемы производительности в больших проектах
- увеличивает размер бандла

**Когда CSS-in-JS оправдан?**

- сложная тема
- динамические дизайн-системы
- UI-библиотеки
- стили зависят от props компонента, состояния, бизнес-логики
- React-приложения с высокой динамикой

**Когда не использовать:**

- Статические сайты
- Проекты, где важна производительность
- Когда стили не зависят от JS

---

## 17.4. Utility-first и Tailwind CSS

Utility-first — подход, при котором стили задаются через маленькие утилитарные классы вместо семантических.

### Философия utility-first

**Традиционный подход:**

```html
<div class="card">
  <h2 class="card-title">Title</h2>
</div>
```

```css
.card {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
}
```

**Utility-first подход:**

```html
<div class="p-5 bg-white rounded-lg">
  <h2 class="text-2xl font-bold">Title</h2>
</div>
```

Стили рядом с разметкой, не нужно придумывать имена классов.

### Tailwind CSS

Tailwind CSS — самый популярный utility-first фреймворк.

**Основные концепции:**

- Утилитарные классы вместо семантических
- Только используемые классы попадают в финальный CSS
- Конфигурируемая дизайн-система
- JIT (Just-In-Time) компиляция

**Пример:**

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Click
  </button>
</div>
```

**Преимущества:**

- Быстрее писать (не нужны имена классов)
- Нет разрастания CSS (только используемые классы)
- Стили рядом с разметкой
- Переиспользование через компоненты
- Консистентность через дизайн-систему

**Недостатки:**

- Длинные className
- Может показаться «грязным»
- Требует изучения API
- Зависимость от фреймворка

### Tailwind CSS v4

**Ключевые изменения:**

1. **Oxide Engine** — новый Rust-движок (в 10-100 раз быстрее v3)
2. **Встроенный PostCSS** — не нужен отдельный `postcss.config.js`
3. **Lightning CSS** — замена PostCSS для трансформаций
4. **Нативный CSS** — использует CSS-переменные вместо конфига
5. **Композитные утилиты** — `@variant` для кастомных вариантов
6. **Zero-config** — работает из коробки

**Новый CSS-файл (не JS config!):**

```css
/* src/index.css */
@import 'tailwindcss';

/* Кастомные цвета через CSS-переменные */
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --font-sans: 'Inter', system-ui, sans-serif;
  --breakpoint-3xl: 1920px;
}

/* Кастомные утилиты */
@utility text-glow {
  text-shadow: 0 0 10px currentColor;
}

/* Композитные варианты */
@variant hocus (&:hover, &:focus);
```

**Больше никакого `tailwind.config.js`!** Всё через CSS.

### Базовые утилиты Tailwind

**Layout:**

```tsx
{/* Flexbox */}
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

{/* Grid */}
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

**Spacing:**

```tsx
{/* Margin */}
<div className="m-4">All sides</div>
<div className="mx-auto">Horizontal centering</div>

{/* Padding */}
<div className="p-6">All sides</div>
<div className="px-4 py-2">Different horizontal/vertical</div>
```

**Typography:**

```tsx
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-base leading-relaxed">Text with comfortable line height</p>
```

**Responsive:**

```tsx
<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
  Responsive box
</div>
```

**Dark Mode:**

```tsx
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  Auto dark mode
</div>
```

### Переиспользуемые компоненты с Tailwind

```tsx
// components/Button.tsx
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  onClick?: () => void
}

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2',
        variants[variant],
        sizes[size],
      )}
    >
      {children}
    </button>
  )
}
```

**Утилита для объединения классов:**

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 17.5. Когда что использовать (практические рекомендации)

**Для продуктового интерфейса на React:**

- CSS Modules или CSS-in-JS
- CSS Custom Properties для темизации
- частично — Cascade Layers
- немного БЭМ для стабильных блоков

**Для больших сайтов с множеством страниц:**

- БЭМ
- каскадные слои
- переменные
- минимальный CSS-in-JS

**Для виджетов и микрофронтендов:**

- Shadow DOM
- CSS Variables
- изолированные стили

**Для дизайн-систем:**

- строгий БЭМ
- каскадные слои
- Grid/Flex
- переменные темизации

**Для быстрого прототипирования:**

- Tailwind CSS
- Utility-first подход

**Для динамических React-приложений:**

- CSS-in-JS (styled-components, Emotion)
- CSS Modules как альтернатива

---

## Вопросы на собеседовании

### 1. Чем CSS-переменные отличаются от SCSS-переменных?

CSS Variables — динамические, runtime, наследуются, участвуют в каскаде. SCSS переменные — статические, compile-time, подставляются при сборке.

### 2. Что такое CSS Modules и зачем они нужны?

Техника изоляции стилей через уникальные имена классов. Решает проблему глобальной области видимости CSS.

### 3. В чём плюсы и минусы CSS-in-JS?

Плюсы: динамические стили, темизация, колокация. Минусы: runtime-нагрузка, сложнее дебажить, проблемы производительности.

### 4. Как БЭМ помогает масштабировать CSS?

Структурирует именование, делает селекторы предсказуемыми, упрощает поддержку в команде.

### 5. Что такое utility-first подход?

Подход, при котором стили задаются через маленькие утилитарные классы вместо семантических. Tailwind CSS — самый популярный пример.

### 6. Почему глобальный CSS — проблема?

Конфликты имён, сложность поддержки, непредсказуемость при масштабировании.

### 7. Когда использовать Tailwind, а когда CSS Modules?

Tailwind — для быстрого прототипирования, utility-first проектов. CSS Modules — для компонентных приложений, когда нужна изоляция без runtime-нагрузки.

### 8. Что нового в Tailwind CSS v4?

Oxide Engine, встроенный PostCSS, CSS-конфигурация вместо JS, композитные утилиты, zero-config.

---

## Key Takeaways

- CSS Modules дают изоляцию без runtime
- БЭМ — надёжная методология для командных проектов
- CSS-in-JS полезен для динамических UI, но требует внимательности к производительности
- Utility-first (Tailwind) — быстрый способ разработки с консистентностью
- Выбор подхода зависит от проекта: размер, команда, требования
- Современные инструменты делают стили предсказуемыми и масштабируемыми
- Tailwind v4 использует CSS-переменные и нативный CSS вместо JS-конфига

