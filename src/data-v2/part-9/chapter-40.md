# Глава 40. Зависимости: package.json, semver, lockfiles и обновления

Управление зависимостями — основа стабильности проекта. Понимание package.json, semver и lock-файлов критично для предотвращения проблем с версиями и обеспечения воспроизводимости сборок.

---

## 40.1. package.json: сердце проекта

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
- Примеры: `react`, `axios`, `lodash`

**devDependencies:**

- Нужны только для разработки
- Не устанавливаются в продакшне (`npm install --production`)
- Примеры: `vite`, `typescript`, `eslint`, `jest`

**Правило:** Если пакет нужен только для сборки/тестирования/линтинга → `devDependencies`.

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

**Пример:**

```json
// Библиотека компонентов
{
  "peerDependencies": {
    "react": ">=18.0.0"
  }
}

// Приложение должно установить react
// Библиотека использует react из приложения
```

### optionalDependencies

Зависимости, которые не обязательны для работы:

```json
{
  "optionalDependencies": {
    "fsevents": "^2.3.0"
  }
}
```

Если установка не удалась, npm продолжит работу без ошибки.

---

## 40.2. SemVer (Semantic Versioning)

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
- **\*** — любая версия (не рекомендуется)

**Примеры:**

```json
{
  "react": "^18.3.0", // 18.3.0, 18.4.0, 18.9.9, но не 19.0.0
  "axios": "~1.7.0", // 1.7.0, 1.7.1, 1.7.9, но не 1.8.0
  "lodash": "4.17.21" // только 4.17.21
}
```

### Почему это важно?

```javascript
// Проект работал с react@18.2.0
// После npm install получили react@18.3.0
// Всё сломалось из-за бага в новой версии

// Решение: точная версия в lock-файле
```

---

## 40.3. Lock-файлы

- `package-lock.json` (npm)
- `pnpm-lock.yaml` (pnpm)
- `bun.lockb` (bun)
- `yarn.lock` (yarn)

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

### Структура package-lock.json

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "packages": {
    "": {
      "dependencies": {
        "react": "^18.3.0"
      }
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-..."
    }
  }
}
```

**Важные поля:**

- `version` — точная версия
- `resolved` — URL пакета
- `integrity` — хеш для проверки целостности

---

## 40.4. npm, pnpm, bun

Все три инструмента решают одну задачу: управление зависимостями и скриптами проекта.

### npm (Node Package Manager)

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

### pnpm

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

- В 2-3 раза быстрее npm
- Экономит до 70% дискового пространства
- Нет "phantom dependencies"
- Идеален для монорепозиториев

### bun (новый игрок)

**Bun** — это всё-в-одном: runtime, bundler, package manager.

```bash
bun install react
bun run build
```

**Особенности:**

- В 10-20 раз быстрее npm
- Написан на Zig (не Node.js)
- Совместим с npm registry
- Встроенный bundler и transpiler
- Нативная поддержка TypeScript

**Производительность (2026):**

```
Установка 1000 пакетов:
npm:  ~45s
pnpm: ~18s
bun:  ~2s
```

### Когда что выбирать?

**Стандартный проект** → npm (совместимость)

**Большие монорепозитории** → pnpm (экономия места, строгость)

**Новые проекты с фокусом на скорость** → bun (экспериментально)

---

## 40.5. Скрипты и lifecycle hooks

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

## 40.6. Обновление зависимостей

### Проверка устаревших пакетов

```bash
# npm
npm outdated

# pnpm
pnpm outdated

# bun
bun outdated
```

### Обновление пакетов

```bash
# Обновить один пакет
npm install react@latest

# Обновить все пакеты (осторожно!)
npm update

# Проверить, что изменится
npm outdated
```

### Обновление major версий

```bash
# Использовать npx для безопасного обновления
npx npm-check-updates -u
npm install
```

### Стратегии обновления

**1. Постепенное обновление:**

```bash
# Сначала patch версии
npm update

# Потом minor версии
npm install package@^new-minor

# Major версии — вручную с проверкой breaking changes
```

**2. Использование инструментов:**

```bash
# npm-check-updates
npx npm-check-updates -u

# Dependabot (GitHub)
# Автоматически создаёт PR с обновлениями
```

---

## 40.7. Безопасность зависимостей

### Проверка уязвимостей

```bash
# npm
npm audit

# Исправление
npm audit fix

# pnpm
pnpm audit

# bun
bun audit
```

### Автоматические обновления безопасности

```json
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix"
  }
}
```

---

## Вопросы на собеседовании

### 1. В чём разница между dependencies и devDependencies?

`dependencies` нужны в runtime, устанавливаются в продакшне. `devDependencies` только для разработки, не устанавливаются в продакшне.

### 2. Что такое peerDependencies?

Зависимости, которые должны быть предоставлены приложением. Используются библиотеками для предотвращения дублирования.

### 3. Что такое SemVer?

Semantic Versioning — формат версий MAJOR.MINOR.PATCH. MAJOR — breaking changes, MINOR — новые фичи, PATCH — багфиксы.

### 4. В чём разница между ^ и ~?

`^` разрешает MINOR и PATCH обновления. `~` разрешает только PATCH обновления.

### 5. Зачем нужны lock-файлы?

Фиксируют точные версии всех зависимостей, гарантируют одинаковую сборку на всех машинах.

### 6. В чём разница между npm, pnpm и bun?

npm — стандарт. pnpm быстрее и экономит место. bun самый быстрый, но экспериментальный.

### 7. Что такое lifecycle hooks?

Автоматически выполняемые скрипты: preinstall, postinstall, prebuild, postbuild и т.д.

---

## Key Takeaways

- package.json — контракт проекта
- dependencies для runtime, devDependencies для разработки
- peerDependencies предотвращают дублирование
- SemVer: MAJOR.MINOR.PATCH
- ^ для minor/patch, ~ только для patch
- Lock-файлы обязательны для воспроизводимости
- pnpm быстрее и экономит место
- Lifecycle hooks для автоматизации
- Понимание зависимостей критично для стабильности проекта

