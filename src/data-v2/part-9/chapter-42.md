# Глава 42. Оптимизация бандла: tree-shaking, side effects, code splitting и динамические импорты

Оптимизация бандла критична для производительности приложения. Понимание tree-shaking, code splitting и динамических импортов позволяет создавать быстрые приложения с минимальным размером бандла.

---

## 42.1. Tree Shaking

Удаление неиспользуемого кода из бандла.

### Как работает?

```javascript
// math.js
export const sum = (a, b) => a + b
export const multiply = (a, b) => a * b
export const divide = (a, b) => a / b

// app.js
import { sum } from './math'
console.log(sum(2, 3))

// В bundle попадёт только sum
// multiply и divide будут удалены
```

### Требования для tree-shaking

1. **ES Modules** (не CommonJS)
2. **Статические импорты** (не динамические)
3. **Side-effect free** код

```javascript
// ❌ Плохо: CommonJS — не работает tree-shaking
const { sum } = require('./math')

// ✅ Хорошо: ES Modules
import { sum } from './math'
```

### Side Effects

```json
// package.json
{
  "sideEffects": false  // нет side-effects, можно смело tree-shake
}

// Или указываем файлы с side-effects
{
  "sideEffects": ["*.css", "*.scss", "src/polyfills.js"]
}
```

**Что такое side effects?**

Любой код, который выполняет действия помимо экспорта:

```javascript
// ❌ Side effect
window.myGlobal = 'value'

// ❌ Side effect
import './styles.css' // CSS должен быть в sideEffects

// ✅ Pure (нет side effects)
export const sum = (a, b) => a + b
```

---

## 42.2. Code Splitting

Разделение кода на чанки для оптимизации загрузки.

### Динамический импорт

```typescript
// Вместо статического импорта
import HeavyComponent from './HeavyComponent'

// Динамический импорт (lazy loading)
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### Route-based splitting

```typescript
// router.tsx
import { lazy } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
]
```

### Vendor splitting

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
          ],
        },
      },
    },
  },
})
```

**Преимущества:**

- Меньше начальный бандл
- Быстрее загрузка
- Лучший Core Web Vitals
- Кеширование vendor кода

---

## 42.3. Стратегии оптимизации

### 1. Динамические импорты для тяжёлых библиотек

```typescript
// ❌ Плохо — весь Chart.js в начальном бандле
import { Chart } from 'chart.js'

// ✅ Хорошо — загружается только при необходимости
const Chart = lazy(() => import('chart.js'))
```

### 2. Импорт только нужных функций

```typescript
// ❌ Плохо — весь lodash
import _ from 'lodash'

// ✅ Хорошо — только нужная функция
import { debounce } from 'lodash-es/debounce'

// ✅ Ещё лучше — tree-shakeable версия
import debounce from 'lodash-es/debounce'
```

### 3. Используйте lighter альтернативы

```typescript
// ❌ Плохо — moment.js (70KB)
import moment from 'moment'

// ✅ Хорошо — dayjs (2KB)
import dayjs from 'dayjs'
```

### 4. Code splitting по роутам

```typescript
const Dashboard = lazy(() => import('./Dashboard'))
const Profile = lazy(() => import('./Profile'))
```

### 5. Условная загрузка компонентов

```typescript
function App() {
  const [showChart, setShowChart] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<div>Loading...</div>}>
          <Chart />
        </Suspense>
      )}
    </div>
  )
}
```

---

## 42.4. Анализ размера бандла

### Vite

```bash
npm run build
npx vite-bundle-visualizer
```

### Webpack

```bash
npx webpack-bundle-analyzer dist/stats.json
```

### Анализ в браузере

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react'
            }
            if (id.includes('lodash')) {
              return 'vendor-utils'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
```

---

## 42.5. Оптимизация изображений

### Lazy loading

```typescript
<img
  src="image.jpg"
  loading="lazy"
  alt="Description"
/>
```

### Responsive images

```typescript
<img
  srcSet="image-320w.jpg 320w, image-640w.jpg 640w"
  sizes="(max-width: 640px) 320px, 640px"
  src="image-640w.jpg"
  alt="Description"
/>
```

### WebP и AVIF

```typescript
<picture>
  <source srcSet="image.avif" type="image/avif" />
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

---

## 42.6. Оптимизация CSS

### CSS Modules

```typescript
// Component.module.css
.button {
  background: blue;
}

// Component.tsx
import styles from './Component.module.css'
<button className={styles.button}>Click</button>
```

### Critical CSS

```typescript
// Извлечение критического CSS
import { extractCritical } from '@emotion/server'

const { html, css } = extractCritical(renderedHtml)
```

### CSS-in-JS оптимизация

```typescript
// Использование runtime CSS-in-JS только для динамических стилей
// Статические стили — в CSS файлы
```

---

## 42.7. Preloading и Prefetching

### Preload критических ресурсов

```html
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/critical.css" as="style" />
```

### Prefetch для будущих страниц

```typescript
// Prefetch следующей страницы при hover
<Link
  to="/dashboard"
  onMouseEnter={() => {
    import('./pages/Dashboard')
  }}
>
  Dashboard
</Link>
```

---

## 42.8. Минификация и сжатие

### Минификация

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'esbuild', // или 'terser'
  },
})
```

### Gzip/Brotli сжатие

```typescript
// Настройка на сервере
// Nginx
gzip on;
gzip_types text/javascript application/javascript;

// Vercel/Netlify — автоматически
```

---

## Вопросы на собеседовании

### 1. Что такое tree-shaking?

Удаление неиспользуемого кода из бандла. Требует ES Modules и статических импортов.

### 2. Что такое side effects?

Код, который выполняет действия помимо экспорта (например, изменение глобальных переменных).

### 3. Что такое code splitting?

Разделение кода на чанки для оптимизации загрузки. Позволяет загружать только нужный код.

### 4. Как работает динамический импорт?

Создаёт отдельный чанк, который загружается по требованию. Используется с `lazy()` и `Suspense`.

### 5. Зачем нужен vendor splitting?

Отделение библиотек от кода приложения для лучшего кеширования и оптимизации загрузки.

### 6. Как анализировать размер бандла?

Использовать bundle analyzer: `vite-bundle-visualizer` или `webpack-bundle-analyzer`.

### 7. В чём разница между preload и prefetch?

Preload загружает критический ресурс немедленно. Prefetch загружает ресурс для будущего использования.

---

## Key Takeaways

- Tree-shaking требует ES Modules и статических импортов
- Side effects должны быть явно указаны в package.json
- Code splitting уменьшает начальный размер бандла
- Динамические импорты для lazy loading компонентов
- Vendor splitting для кеширования библиотек
- Анализ бандла помогает найти проблемы
- Оптимизация бандла критична для производительности

