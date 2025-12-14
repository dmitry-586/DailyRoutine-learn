# Глава 25. Основы Node.js

Фронтенд-разработчик сегодня — это не только браузер. Node.js нужен для:

- сборки
- SSR
- BFF (Backend For Frontend)
- простых API

На собеседованиях проверяют не умение писать бэкенд, а понимание модели выполнения.

---

## 25.1. Event Loop в Node.js

Node.js однопоточен, но неблокирующий. Это возможно благодаря Event Loop.

### Фазы Event Loop

1. timers — setTimeout, setInterval
2. pending callbacks — отложенные колбэки
3. idle, prepare — внутренние операции
4. poll — получение новых I/O событий
5. check — setImmediate
6. close callbacks — закрытие соединений

### Microtasks

- process.nextTick — самый приоритетный
- Promise.then

Выполняются между фазами.

### Сравнение с браузером

**Браузер:**

- Web APIs
- macrotasks
- microtasks

**Node:**

- libuv
- phases
- nextTick / Promise

---

## 25.2. CommonJS vs ES Modules

### CommonJS

```javascript
const fs = require('fs')
```

- синхронная загрузка
- runtime
- используется в старых проектах Node.js

### ES Modules

```javascript
import fs from 'fs'
```

- статический анализ
- tree-shaking
- современный стандарт

### Когда что

- старые проекты — CJS
- новые — ESM

---

## 25.3. npm-скрипты

### package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

### Lifecycle hooks

- prebuild — перед сборкой
- postinstall — после установки

**Используется для:**

- генерации файлов
- подготовки окружения

---

## 25.4. Лёгкое API: Express / Fastify

### Express

```javascript
app.get('/api', (req, res) => {
  res.json({ ok: true })
})
```

### Fastify

- быстрее
- schema-based валидация
- лучше для production

### Когда фронту нужен Node

- SSR (Next.js, Remix)
- proxy API
- mock сервер
- server actions

---

## Вопросы на собеседовании

### 1. Почему Node однопоточен?

Одна нить выполнения, но неблокирующий I/O через Event Loop.

### 2. Event Loop в Node и браузере — различия?

Разные фазы, process.nextTick в Node, разные приоритеты.

### 3. process.nextTick vs Promise?

nextTick выполняется раньше Promise в Node.js.

### 4. CommonJS vs ES Modules?

CJS — динамический, runtime. ESM — статический, compile-time.

### 5. Зачем фронту Node?

Сборка, SSR, инструменты разработки, BFF.

### 6. Express vs Fastify?

Fastify быстрее, имеет schema-based валидацию. Express проще, больше экосистема.

---

## Key Takeaways

- Node.js однопоточен, но неблокирующий через Event Loop
- Event Loop в Node отличается от браузера
- CommonJS vs ESM — важное различие
- Node нужен фронтендеру для инструментов и SSR
- Express/Fastify для простых API и BFF

---

**Часть X. Подготовка к собеседованию**
