# Глава 9. Tailwind CSS v4: utility-first революция

## Введение

**Tailwind CSS v4** (2024-2025) — это полная переработка популярного utility-first CSS-фреймворка. Версия 4.0 принесла кардинальные изменения: новый движок Oxide, встроенный PostCSS, Lightning CSS и радикально улучшенную производительность.

В этой главе мы изучим Tailwind v4 с нуля, включая новые возможности, миграцию с v3 и best practices для 2025 года.

---

## Что нового в Tailwind CSS v4?

### Ключевые изменения

1. **Oxide Engine** — новый Rust-движок (в 10-100 раз быстрее v3)
2. **Встроенный PostCSS** — не нужен отдельный `postcss.config.js`
3. **Lightning CSS** — замена PostCSS для трансформаций
4. **Нативный CSS** — использует CSS-переменные вместо конфига
5. **Композитные утилиты** — `@variant` для кастомных вариантов
6. **Улучшенный JIT** — мгновенная компиляция
7. **Zero-config** — работает из коробки

### Размер и производительность

```
Tailwind v3: компиляция ~500ms, полный CSS ~3.8 MB
Tailwind v4: компиляция ~50ms, полный CSS ~2.1 MB (+ tree-shaking)
```

---

## Установка и настройка

### Установка

```bash
npm install tailwindcss@next
# или
pnpm add tailwindcss@next
```

### Конфигурация для Vite + React

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
```

### Новый CSS-файл (не JS config!)

В v4 конфигурация происходит через CSS:

```css
/* src/index.css */
@import 'tailwindcss';

/* Кастомные цвета через CSS-переменные */
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-danger: #ef4444;

  --font-sans: 'Inter', system-ui, sans-serif;

  --breakpoint-3xl: 1920px;
}

/* Кастомные утилиты */
@utility text-glow {
  text-shadow: 0 0 10px currentColor;
}

/* Композитные варианты */
@variant hocus (&:hover, &:focus);
@variant supports-grid (supports(display: grid));
```

**Больше никакого `tailwind.config.js`!** Всё через CSS.

---

## Философия utility-first

### Традиционный CSS

```css
/* styles.css */
.user-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-card__title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
```

```html
<div class="user-card">
  <h2 class="user-card__title">John Doe</h2>
</div>
```

### Tailwind CSS

```tsx
<div className='flex flex-col rounded-lg bg-white p-4 shadow-md'>
  <h2 className='mb-2 text-xl font-bold'>John Doe</h2>
</div>
```

**Преимущества:**

- 🚀 Быстрее писать (не нужны имена классов)
- 🔒 Нет разрастания CSS (только используемые классы)
- 🎯 Стили рядом с разметкой
- ♻️ Переиспользование через компоненты

---

## Базовые утилиты

### Layout

```tsx
{
  /* Flexbox */
}

;<div className='flex items-center justify-between'>
  <span>Left</span>
  <span>Right</span>
</div>

{
  /* Grid */
}

;<div className='grid grid-cols-3 gap-4'>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

{
  /* Container */
}

;<div className='container mx-auto px-4'>
  {/* Центрированный контейнер с паддингами */}
</div>
```

### Sizing

```tsx
{/* Width/Height */}
<div className="w-64 h-32">Fixed size</div>
<div className="w-full h-screen">Full width + viewport height</div>
<div className="w-1/2 h-1/3">Fractional sizing</div>

{/* Min/Max */}
<div className="min-w-0 max-w-prose">
  Flexible width with constraints
</div>
```

### Spacing

```tsx
{/* Margin */}
<div className="m-4">All sides</div>
<div className="mx-auto">Horizontal centering</div>
<div className="mt-8 mb-4">Top/bottom</div>

{/* Padding */}
<div className="p-6">All sides</div>
<div className="px-4 py-2">Different horizontal/vertical</div>

{/* Gap */}
<div className="flex gap-3">
  <button>One</button>
  <button>Two</button>
</div>
```

### Typography

```tsx
{/* Font size */}
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-base leading-relaxed">
  Text with comfortable line height
</p>

{/* Text alignment */}
<p className="text-center">Centered</p>
<p className="text-right">Right aligned</p>

{/* Text color */}
<span className="text-gray-700">Gray text</span>
<span className="text-primary">Custom color</span>
```

### Colors & Backgrounds

```tsx
{/* Text colors */}
<p className="text-blue-600">Blue text</p>
<p className="text-gray-900 dark:text-white">Dark mode aware</p>

{/* Backgrounds */}
<div className="bg-linear-to-r from-purple-500 to-pink-500">
  Gradient background
</div>

{/* Opacity */}
<div className="bg-black/50">50% opacity black</div>
```

---

## Responsive Design

Tailwind использует mobile-first подход:

```tsx
<div className='{/* Mobile: full width */} {/* ≥640px: half width */} {/* ≥768px: one-third */} {/* ≥1024px: one-quarter */} {/* ≥1280px: one-sixth */} {/* ≥1536px: one-twelfth */} w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-1/12'>
  Responsive box
</div>
```

### Адаптивная сетка

```tsx
<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
  {products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>
```

### Container Queries (новое в v4!)

```tsx
<div className='@container'>
  <div className='@lg:grid @lg:grid-cols-2 gap-4'>
    {/* Адаптация к размеру контейнера, а не viewport */}
  </div>
</div>
```

---

## Dark Mode

### Настройка

```css
/* src/index.css */
@import 'tailwindcss';

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1a1a1a;
    --color-text: #ffffff;
  }
}
```

### Использование

```tsx
<div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
  Auto dark mode
</div>
```

### Управление через класс

```tsx
// App.tsx
export function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className='rounded bg-gray-200 p-2 dark:bg-gray-700'
      >
        Toggle Dark Mode
      </button>
    </div>
  )
}
```

---

## Кастомизация

### CSS-переменные (новый подход v4)

```css
/* src/index.css */
@theme {
  /* Цвета */
  --color-brand-50: #f0f9ff;
  --color-brand-500: #3b82f6;
  --color-brand-900: #1e3a8a;

  /* Spacing */
  --spacing-18: 4.5rem;

  /* Typography */
  --font-display: 'Playfair Display', serif;
  --font-mono: 'Fira Code', monospace;

  /* Breakpoints */
  --breakpoint-mobile: 375px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1440px;
}
```

```tsx
<h1 className='text-brand-500 font-display'>Custom styled heading</h1>
```

### Кастомные утилиты

```css
@utility truncate-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

@utility glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

```tsx
<div className="glass rounded-lg p-6">
  Glassmorphism effect
</div>

<p className="truncate-2">
  Long text that will be truncated to 2 lines...
</p>
```

### Композитные варианты

```css
@variant hocus (&:hover, &:focus);
@variant group-hocus (.group:hover &, .group:focus &);
@variant not-last (&:not(:last-child));
```

```tsx
<button className="hocus:scale-105 transition">
  {/* Сработает и на hover, и на focus */}
  Hover or Focus Me
</button>

<ul>
  <li className="not-last:border-b">Item 1</li>
  <li className="not-last:border-b">Item 2</li>
  <li className="not-last:border-b">Item 3</li>
</ul>
```

---

## Интеграция с React

### Переиспользуемые компоненты

```tsx
// components/Button.tsx
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
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
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-lg font-medium transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants[variant],
        sizes[size],
      )}
    >
      {children}
    </button>
  )
}
```

### Утилита для объединения классов

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```bash
pnpm add clsx tailwind-merge
```

**Почему нужна `cn`:**

```tsx
// Без cn - конфликт классов
<div className={`p-4 ${isActive ? 'p-8' : ''}`}>
  {/* Применятся оба p-4 и p-8! */}
</div>

// С cn - правильное слияние
<div className={cn('p-4', isActive && 'p-8')}>
  {/* Применится только p-8 */}
</div>
```

### Условные стили

```tsx
// Паттерн 1: cn + условия
<div
  className={cn(
    'rounded-lg p-4',
    isActive && 'border-blue-500 bg-blue-100',
    hasError && 'border-red-500',
    disabled && 'cursor-not-allowed opacity-50',
  )}
/>

// Паттерн 2: объект вариантов
const variants = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
}

<Alert className={cn('rounded p-4', variants[type])} />
```

---

## Оптимизация производительности

### Content Configuration (v4)

В v4 Content Paths не нужны — Oxide автоматически сканирует файлы!

Но можно явно указать:

```css
/* src/index.css */
@import 'tailwindcss';

@source "../../**/*.{ts,tsx,html}";
```

### Purging неиспользуемых классов

В v4 происходит автоматически. Только используемые классы попадут в продакшн.

```tsx
// ❌ Плохо: динамические классы не попадут в билд
const color = 'blue';
<div className={`bg-${color}-500`} />

// ✅ Хорошо: статические классы
<div className={color === 'blue' ? 'bg-blue-500' : 'bg-red-500'} />

// ✅ Или используйте CSS-переменные
<div
  className="bg-[--dynamic-color]"
  style={{ '--dynamic-color': colors[color] } as React.CSSProperties}
/>
```

### Bundle Size

```bash
# Проверка размера CSS
npm run build

# Анализ
npx vite-bundle-visualizer
```

**Типичные размеры:**

- Development: ~2.1 MB (все классы)
- Production: ~15-50 KB (только используемые)

---

## Продвинутые техники

### Arbitrary Values

```tsx
{
  /* Произвольные значения */
}

;<div className='w-[137px] bg-[#1da1f2]'>Custom width and color</div>

{
  /* Произвольные CSS свойства */
}

<div className='[backdrop-filter:blur(10px)] mask-type-alpha'>
  Advanced CSS
</div>
```

### Group & Peer

```tsx
{/* Group: родитель влияет на детей */}
<div className="group hover:bg-blue-100">
  <span className="group-hover:text-blue-600">
    Changes on parent hover
  </span>
</div>

{/* Peer: сосед влияет на элемент */}
<input type="checkbox" className="peer sr-only" />
<label className="peer-checked:bg-green-500">
  Changes when checkbox is checked
</label>
```

### Data Attributes (новое в v4!)

```tsx
<div data-state="active" className="data-[state=active]:bg-blue-500">
  Active state
</div>

<button data-loading className="data-loading:opacity-50">
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

---

## Tailwind vs CSS-in-JS vs CSS Modules

### Сравнение

| Критерий            | Tailwind  | CSS-in-JS | CSS Modules |
| ------------------- | --------- | --------- | ----------- |
| Скорость разработки | ⚡⚡⚡    | ⚡⚡      | ⚡          |
| Производительность  | ⚡⚡⚡    | ⚡        | ⚡⚡⚡      |
| Bundle size         | Маленький | Большой   | Средний     |
| Type safety         | ✅ (v4)   | ✅        | ❌          |
| Динамические стили  | ⚠️        | ✅        | ⚠️          |
| Learning curve      | Средняя   | Высокая   | Низкая      |

### Когда использовать Tailwind

✅ **Используйте Tailwind если:**

- Быстрая разработка UI приоритет
- Команда работает с дизайн-системой
- Нужна консистентность стилей
- Прототипирование и MVP

❌ **Не используйте Tailwind если:**

- Сложные анимации и динамические стили
- Уникальный дизайн без системы
- Команда против utility-first подхода

---

## Миграция с Tailwind v3 на v4

### Основные изменения

```javascript
// ❌ v3: tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
}
```

```css
/* ✅ v4: src/index.css */
@theme {
  --color-primary: #3b82f6;
}
```

### Удалите устаревшие файлы

```bash
# Удалить
rm tailwind.config.js
rm postcss.config.js  # Больше не нужен!
```

### Обновите импорты

```css
/* ❌ v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ✅ v4 */
@import 'tailwindcss';
```

---

## Best Practices

### 1. Используйте компоненты для повторяющихся паттернов

```tsx
// ❌ Плохо: дублирование
<button className="px-4 py-2 bg-blue-600 text-white rounded">A</button>
<button className="px-4 py-2 bg-blue-600 text-white rounded">B</button>

// ✅ Хорошо: компонент
<Button>A</Button>
<Button>B</Button>
```

### 2. Используйте CSS-переменные для динамики

```tsx
// ❌ Плохо: инлайн стили везде
<div style={{ backgroundColor: color }} />

// ✅ Хорошо: CSS-переменная + Tailwind
<div
  className="bg-[--custom-color] p-4"
  style={{ '--custom-color': color } as React.CSSProperties}
/>
```

### 3. Группируйте связанные классы

```tsx
// ❌ Плохо: хаотично
<div className="text-white p-4 bg-blue-600 rounded hover:bg-blue-700" />

// ✅ Хорошо: логическая группировка
<div className="
  bg-blue-600 hover:bg-blue-700
  text-white
  p-4 rounded
" />
```

### 4. Используйте конфигурацию для дизайн-системы

```css
@theme {
  /* Spacing scale */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Color palette */
  --color-primary-*: /* ... */;
  --color-secondary-*: /* ... */;
}
```

---

## Заключение

**Tailwind CSS v4** — это эволюция utility-first подхода:

- 🚀 **Производительность**: в 10+ раз быстрее благодаря Oxide
- 🎨 **Гибкость**: CSS-конфигурация вместо JS
- 🔧 **Простота**: zero-config из коробки
- ⚡ **Современность**: Container Queries, Lightning CSS, нативные CSS-переменные

**Ключевые takeaways:**

1. Используйте `@theme` для кастомизации
2. Создавайте композитные варианты через `@variant`
3. Объединяйте классы через `cn()` утилиту
4. Применяйте компоненты для переиспользования
5. Используйте CSS-переменные для динамических значений

В следующей главе мы перейдём к **JavaScript** и изучим фундаментальные концепции языка.
