# Глава 8. Tailwind CSS v4

## Введение

**Tailwind CSS v4** (2024-2026) — это полная переработка популярного utility-first CSS-фреймворка. Версия 4.0 принесла кардинальные изменения: новый движок Oxide, встроенный PostCSS, Lightning CSS и радикально улучшенную производительность.

---

## Что нового в Tailwind CSS v4?

### Ключевые изменения

1. **Oxide Engine** — новый Rust-движок (в 10-100 раз быстрее v3)
2. **Встроенный PostCSS** — не нужен отдельный `postcss.config.js`
3. **Lightning CSS** — замена PostCSS для трансформаций
4. **Нативный CSS** — использует CSS-переменные вместо конфига
5. **Композитные утилиты** — `@variant` для кастомных вариантов
6. **Zero-config** — работает из коробки

---

## Установка и настройка

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

### Tailwind CSS

```tsx
<div className='flex flex-col rounded-lg bg-white p-4 shadow-md'>
  <h2 className='mb-2 text-xl font-bold'>John Doe</h2>
</div>
```

**Преимущества:**

- Быстрее писать (не нужны имена классов)
- Нет разрастания CSS (только используемые классы)
- Стили рядом с разметкой
- Переиспользование через компоненты

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
```

### Spacing

```tsx
{/* Margin */}
<div className="m-4">All sides</div>
<div className="mx-auto">Horizontal centering</div>

{/* Padding */}
<div className="p-6">All sides</div>
<div className="px-4 py-2">Different horizontal/vertical</div>
```

### Typography

```tsx
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-base leading-relaxed">Text with comfortable line height</p>
```

---

## Responsive Design

Tailwind использует mobile-first подход:

```tsx
<div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>Responsive box</div>
```

### Адаптивная сетка

```tsx
<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
  {products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))}
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

  /* Typography */
  --font-display: 'Playfair Display', serif;
}
```

```tsx
<h1 className='text-brand-500 font-display'>Custom styled heading</h1>
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

---

## Best Practices

### 1. Используйте компоненты для повторяющихся паттернов

```tsx
// ✅ Хорошо: компонент
<Button>A</Button>
<Button>B</Button>
```

### 2. Используйте CSS-переменные для динамики

```tsx
<div
  className='bg-[--custom-color] p-4'
  style={{ '--custom-color': color } as React.CSSProperties}
/>
```

### 3. Группируйте связанные классы

```tsx
<div className='rounded bg-blue-600 p-4 text-white hover:bg-blue-700' />
```

---

## Миграция с Tailwind v3 на v4

### Основные изменения

```css
/* ❌ v3: tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
}

/* ✅ v4: src/index.css */
@theme {
  --color-primary: #3b82f6;
}
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

## Заключение

**Tailwind CSS v4** — это эволюция utility-first подхода:

- **Производительность**: в 10+ раз быстрее благодаря Oxide
- **Гибкость**: CSS-конфигурация вместо JS
- **Простота**: zero-config из коробки
- **Современность**: Container Queries, Lightning CSS

**Ключевые takeaways:**

1. Используйте `@theme` для кастомизации
2. Создавайте композитные варианты через `@variant`
3. Объединяйте классы через `cn()` утилиту
4. Применяйте компоненты для переиспользования

В следующей главе мы перейдём к **JavaScript** и изучим фундаментальные концепции языка.
