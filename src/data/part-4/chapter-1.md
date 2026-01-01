# Глава 14. NPM, сборщики и инструменты разработки

## Введение

Инфраструктура — это то, что отличает «код на ноутбуке» от продакшн-приложения. На уровне Middle от разработчика ожидают понимание того, как живёт проект, а не только как пишутся компоненты.

В этой главе мы рассмотрим:

- Управление зависимостями (npm, pnpm, bun)
- Структуру package.json и lock-файлы
- Современные сборщики (Vite, Webpack, Turbopack)
- Транспиляцию и оптимизацию кода

---

## Часть 1. Управление зависимостями

### npm, pnpm, bun (2025)

Все три инструмента решают одну задачу: управление зависимостями и скриптами проекта.

#### npm (Node Package Manager)

- Стандарт де-факто
- Идёт вместе с Node.js
- Самый распространённый

```bash
npm install react
npm run build
```

**Новое в npm 10+:**

- Улучшенная производительность установки
- Встроенная поддержка workspaces
- Автоматический lockfile merge

#### pnpm

Современный инструмент с фокусом на производительность и дисковое пространство.

**Как работает pnpm?**

- Использует content-addressable storage
- Зависимости хранятся один раз в глобальном store
- Проекты используют symlinks (жёсткие ссылки)
- Строгий node_modules (нет phantom dependencies)

```bash
pnpm add react
pnpm run build
```

**Плюсы:**

- ⚡ В 2-3 раза быстрее npm
- 💾 Экономит до 70% дискового пространства
- 🔒 Нет "phantom dependencies"
- 🎯 Идеален для монорепозиториев

#### bun (новый игрок)

**Bun** — это всё-в-одном: runtime, bundler, package manager.

```bash
bun install react
bun run build
```

**Особенности:**

- ⚡⚡⚡ В 10-20 раз быстрее npm
- Написан на Zig (не Node.js)
- Совместим с npm registry
- Встроенный bundler и transpiler
- Нативная поддержка TypeScript

**Производительность (2025):**

```
Установка 1000 пакетов:
npm:  ~45s
pnpm: ~18s
bun:  ~2s
```

#### Когда что выбирать?

**Стандартный проект** → npm (совместимость)

**Большие монорепозитории** → pnpm (экономия места, строгость)

**Новые проекты с фокусом на скорость** → bun (экспериментально)

---

## package.json: сердце проекта

package.json — это контракт проекта.

### Основные поля

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "typescript": "^5.7.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### dependencies vs devDependencies

**dependencies:**

- Нужны в runtime
- Устанавливаются в продакшне

**devDependencies:**

- Нужны только для разработки
- Не устанавливаются в продакшне (`npm install --production`)

**Примеры:**

- `react`, `axios` → dependencies
- `vite`, `typescript`, `eslint` → devDependencies

### peerDependencies

Используются библиотеками для указания совместимости:

```json
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

**Зачем?**

- Предотвращает дублирование React в bundle
- Гарантирует совместимость версий
- Приложение предоставляет зависимость один раз

---

## SemVer (Semantic Versioning)

**Формат:** MAJOR.MINOR.PATCH

**Пример:** 2.4.1

- **MAJOR** — breaking changes (несовместимые изменения)
- **MINOR** — новые фичи (обратно совместимые)
- **PATCH** — багфиксы

### Символы версий

```json
{
  "react": "^18.3.0", // >=18.3.0 <19.0.0
  "axios": "~1.7.0", // >=1.7.0 <1.8.0
  "lodash": "4.17.21" // точная версия
}
```

- **^** (caret) — разрешает MINOR и PATCH обновления
- **~** (tilde) — только PATCH обновления
- **без символа** — строго указанная версия

**Почему это важно?**

```javascript
// Проект работал с react@18.2.0
// После npm install получили react@18.3.0
// Всё сломалось из-за бага в новой версии

// Решение: точная версия в lock-файле
```

---

## Lock-файлы

- `package-lock.json` (npm)
- `pnpm-lock.yaml` (pnpm)
- `bun.lockb` (bun)

**Зачем они нужны?**

- Фиксируют **точные** версии всех зависимостей (включая транзитивные)
- Гарантируют одинаковую сборку на всех машинах
- Обязательны для коммита в репозиторий

**Пример проблемы без lock-файла:**

```
Developer A:
  react@18.2.0 → react-dom@18.2.0

Developer B (неделю спустя):
  react@18.3.1 → react-dom@18.3.1

Разные версии = разное поведение
```

⚠️ **Правило:** Всегда коммитьте lock-файлы!

---

## Скрипты и lifecycle hooks

### Скрипты

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "test": "vitest"
  }
}
```

**Запуск:**

```bash
npm run dev
# или короткие команды
npm start  # алиас для "start"
npm test   # алиас для "test"
```

### Lifecycle hooks

npm автоматически запускает хуки:

```json
{
  "scripts": {
    "preinstall": "node check-node-version.js",
    "postinstall": "husky install",
    "prebuild": "rm -rf dist",
    "build": "vite build",
    "postbuild": "node generate-sitemap.js"
  }
}
```

**Последовательность:**

```
npm run build
  → prebuild
  → build
  → postbuild
```

**Используется для:**

- Проверки версии Node.js
- Установки git hooks (husky)
- Генерации файлов
- Очистки директорий

---

## Часть 2. Современные сборщики

### Эволюция сборщиков

```
2015: Webpack (module bundler)
2020: Vite (ESM-based dev server)
2024: Turbopack (Rust-powered, Next.js)
2025: Rspack (Rust, Webpack-compatible)
```

---

## Vite: современный стандарт

**Vite 6** (2024-2025) — инструмент нового поколения для фронтенд-разработки.

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

---

## Webpack: всё ещё актуален

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

## Turbopack: будущее Next.js

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

- ⚡ В 10x быстрее Webpack в dev
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

## Сравнение сборщиков (2025)

| Критерий         | Vite       | Webpack             | Turbopack   |
| ---------------- | ---------- | ------------------- | ----------- |
| Dev server       | ⚡⚡⚡     | ⚡                  | ⚡⚡⚡      |
| Конфигурация     | Простая    | Сложная             | Минимальная |
| Production build | ⚡⚡       | ⚡⚡⚡              | ⚡⚡⚡      |
| Legacy support   | Ограничено | Отлично             | Хорошо      |
| Плагины          | Много      | Огромная экосистема | Растёт      |
| Размер bundle    | Средний    | Контролируемый      | Оптимальный |

**Когда использовать:**

**Vite:**

- ✅ Новые проекты (React, Vue, Svelte)
- ✅ Быстрая разработка
- ✅ Современные браузеры

**Webpack:**

- ✅ Legacy проекты
- ✅ Сложные требования к сборке
- ✅ Специфичные плагины

**Turbopack:**

- ✅ Next.js 14+
- ✅ Максимальная производительность
- ⚠️ Ограниченная экосистема (пока)

---

## Babel и транспиляция

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

## Tree Shaking

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

---

## Code Splitting

Разделение кода на чанки для оптимизации загрузки.

### Динамический импорт

```typescript
// Вместо статического импорта
import HeavyComponent from './HeavyComponent';

// Динамический импорт (lazy loading)
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Route-based splitting

```typescript
// router.tsx
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
];
```

### Vendor splitting

```javascript
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

- 📦 Меньше начальный бандл
- ⚡ Быстрее загрузка
- 🎯 Лучший Core Web Vitals
- 🔄 Кеширование vendor кода

---

## Оптимизация бандла

### Анализ размера

```bash
# Vite
npm run build
npx vite-bundle-visualizer

# Webpack
npx webpack-bundle-analyzer dist/stats.json
```

### Стратегии оптимизации

```typescript
// 1. Динамические импорты для тяжёлых библиотек
const Chart = lazy(() => import('react-chartjs-2'))

// 2. Импорт только нужных функций
import { debounce } from 'lodash-es/debounce' // ✅
import _ from 'lodash' // ❌ весь lodash

// 3. Используйте lighter альтернативы
import dayjs from 'dayjs' // 2KB
// вместо moment.js // 70KB

// 4. Code splitting по роутам
const Dashboard = lazy(() => import('./Dashboard'))
```

---

## Монорепозитории

### Turborepo (современный стандарт)

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "cache": false
    }
  }
}
```

**Преимущества:**

- ⚡ Параллельные задачи
- 🎯 Кеширование результатов
- 📦 Инкрементальные сборки

### pnpm workspaces

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```json
// package.json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

---

## Best Practices

### 1. Используйте современные инструменты

```bash
# ❌ Старый стек
webpack + babel + npm

# ✅ Современный стек
vite + esbuild + pnpm
```

### 2. Настройте Git-хуки

```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "devDependencies": {
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0"
  }
}
```

```javascript
// .husky/pre-commit
npm run lint
npm run type-check
```

### 3. Версионируйте Node.js

```json
// .nvmrc
20.11.0

// package.json
{
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

### 4. Используйте переменные окружения

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=$npm_package_version
```

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Заключение

**Современная инфраструктура фронтенда (2025):**

- 📦 **Package Manager**: pnpm (или bun для скорости)
- ⚡ **Dev Server**: Vite 6 (мгновенный HMR)
- 🏗️ **Build Tool**: Rollup через Vite (tree-shaking из коробки)
- 🔧 **Transpiler**: esbuild (встроен в Vite)
- 🎯 **Монорепо**: Turborepo + pnpm workspaces

**Ключевые takeaways:**

1. Lock-файлы — обязательны для стабильности
2. Vite — стандарт для новых проектов
3. Tree-shaking требует ES Modules
4. Code splitting критичен для производительности
5. pnpm экономит место и предотвращает phantom dependencies

В следующей главе мы рассмотрим **тестирование** — как unit, integration и E2E-тесты встраиваются в инфраструктуру проекта.
