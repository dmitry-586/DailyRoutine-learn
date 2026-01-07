# Глава 41. Сборка: Vite, Webpack, Turbopack, Babel и TypeScript в пайплайне

Современные сборщики — основа фронтенд-разработки. Понимание их работы и различий критично для выбора правильного инструмента и оптимизации процесса сборки.

---

## 41.1. Эволюция сборщиков

```
2015: Webpack (module bundler)
2020: Vite (ESM-based dev server)
2024: Turbopack (Rust-powered, Next.js)
2026: Rspack (Rust, Webpack-compatible)
```

---

## 41.2. Vite: современный стандарт

**Vite 6** (2024-2026) — инструмент нового поколения для фронтенд-разработки.

### Почему Vite быстрее?

**Dev mode:**

- Использует native ES Modules
- Без бандлинга в dev
- Сервер отдаёт файлы напрямую
- HMR (Hot Module Replacement) на уровне модулей

**Build:**

- Использует Rollup для продакшн-сборки
- Оптимизированная конфигурация из коробки
- Tree-shaking и minification автоматически

### Конфигурация Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
})
```

### Плагины Vite

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    svgr(), // SVG как React компоненты
    VitePWA({ registerType: 'autoUpdate' }), // PWA
  ],
})
```

### Переменные окружения

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=$npm_package_version
```

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 41.3. Webpack: всё ещё актуален

**Webpack 5** остаётся стандартом для сложных конфигураций.

### Базовая концепция

1. **Entry** — точка входа
2. **Graph** — граф зависимостей
3. **Loaders** — обработка файлов
4. **Plugins** — расширение логики
5. **Output** — результат сборки

### Минимальная конфигурация

```javascript
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
```

### Loaders vs Plugins

**Loader:**

- Трансформирует отдельные файлы
- Работают справа налево в цепочке
- Пример: `ts-loader`, `css-loader`

**Plugin:**

- Работает на уровне всего процесса сборки
- Доступ к compilation events
- Пример: `HtmlWebpackPlugin`, `MiniCssExtractPlugin`

---

## 41.4. Turbopack: будущее Next.js

**Turbopack** — новый сборщик от Vercel на Rust.

```javascript
// next.config.js
module.exports = {
  experimental: {
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },
}
```

**Особенности:**

- В 10x быстрее Webpack в dev
- Инкрементальная компиляция
- Встроенная поддержка TypeScript, JSX, CSS
- Интеграция с Next.js 14+

**Производительность:**

```
Cold start (Next.js app):
Webpack: ~12s
Vite:    ~5s
Turbopack: ~1.8s
```

---

## 41.5. Сравнение сборщиков (2026)

**Vite:**

- Dev server: очень быстрый
- Конфигурация: простая
- Production build: быстрый
- Legacy support: ограничено
- Плагины: много
- Размер bundle: средний

**Webpack:**

- Dev server: медленнее
- Конфигурация: сложная
- Production build: очень быстрый
- Legacy support: отлично
- Плагины: огромная экосистема
- Размер bundle: контролируемый

**Turbopack:**

- Dev server: очень быстрый
- Конфигурация: минимальная
- Production build: очень быстрый
- Legacy support: хорошо
- Плагины: растёт
- Размер bundle: оптимальный

**Когда использовать:**

**Vite:**

- Новые проекты (React, Vue, Svelte)
- Быстрая разработка
- Современные браузеры

**Webpack:**

- Legacy проекты
- Сложные требования к сборке
- Специфичные плагины

**Turbopack:**

- Next.js 14+
- Максимальная производительность
- Ограниченная экосистема (пока)

---

## 41.6. Babel и транспиляция

**Babel** — транспилятор JavaScript.

### Зачем нужен?

Превращает современный JavaScript в код для старых браузеров:

```javascript
// Исходный код (ES2024)
const sum = (a, b) => a + b
const result = numbers?.find((n) => n > 10)

// После Babel (ES5)
var sum = function (a, b) {
  return a + b
}
var result =
  numbers &&
  numbers.find(function (n) {
    return n > 10
  })
```

### Presets

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [">0.25%", "not dead"]
        },
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

### Polyfills

**Babel** трансформирует только **синтаксис**.

Для **API** нужны polyfills:

```javascript
// Без polyfill — ошибка в IE11
const hasValue = array.includes(5)
const promise = Promise.resolve(42)

// С polyfill работает везде
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```

**Современный подход (Vite):**

Polyfills не нужны! Vite генерирует два bundle:

1. **Modern** (ES2020+) — для новых браузеров
2. **Legacy** (ES5) — для старых (с polyfills)

---

## 41.7. TypeScript в пайплайне

### Компиляция TypeScript

**Вариант 1: tsc (TypeScript Compiler)**

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "build": "tsc && vite build"
  }
}
```

**Вариант 2: Встроенная поддержка (Vite)**

Vite использует esbuild для транспиляции TypeScript:

```typescript
// vite.config.ts
export default defineConfig({
  // TypeScript обрабатывается автоматически
  // esbuild быстрее tsc
})
```

**Вариант 3: Babel + TypeScript**

```json
{
  "presets": ["@babel/preset-typescript"]
}
```

### Настройка tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler"
  }
}
```

---

## 41.8. Пайплайн сборки

### Типичный пайплайн

```
Исходный код (.ts, .tsx, .css)
    ↓
[TypeScript/ESLint проверка]
    ↓
[Транспиляция (esbuild/Babel)]
    ↓
[Обработка CSS (PostCSS)]
    ↓
[Бандлинг (Rollup/Webpack)]
    ↓
[Оптимизация (minify, tree-shake)]
    ↓
Готовый bundle
```

### Пример конфигурации

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(), // JSX → JS
  ],
  build: {
    target: 'esnext', // Современный JS
    minify: 'esbuild', // Минификация
    sourcemap: true, // Source maps
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
```

---

## Вопросы на собеседовании

### 1. Почему Vite быстрее Webpack в dev режиме?

Vite использует native ES Modules без бандлинга в dev, сервер отдаёт файлы напрямую. Webpack бандлит всё перед запуском.

### 2. В чём разница между Loader и Plugin в Webpack?

Loader трансформирует отдельные файлы. Plugin работает на уровне всего процесса сборки.

### 3. Что такое Turbopack?

Новый сборщик от Vercel на Rust, в 10x быстрее Webpack, интегрирован с Next.js 14+.

### 4. Зачем нужен Babel?

Транспиляция современного JavaScript в код для старых браузеров. Трансформирует синтаксис.

### 5. В чём разница между транспиляцией и компиляцией?

Транспиляция — преобразование кода в код (JS → JS). Компиляция — преобразование в машинный код.

### 6. Как TypeScript обрабатывается в Vite?

Vite использует esbuild для транспиляции TypeScript, что быстрее tsc.

### 7. Когда использовать Webpack вместо Vite?

Для legacy проектов, сложных конфигураций, специфичных плагинов.

