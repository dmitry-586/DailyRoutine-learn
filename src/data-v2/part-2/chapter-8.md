# Глава 8. Оптимизация загрузки и Web Vitals: жизненный цикл страницы, TTFB, LCP, CLS, INP

Производительность веб-приложения — это не просто «быстро загружается». Это комплексная метрика, которая включает время до первого байта, скорость отображения контента, стабильность layout и отзывчивость интерфейса. Web Vitals — это набор метрик, которые Google использует для оценки качества пользовательского опыта.

---

## 8.1. Жизненный цикл страницы

Понимание жизненного цикла страницы критично для оптимизации загрузки и правильной работы с событиями.

### События загрузки

**DOMContentLoaded**

- HTML загружен и распарсен
- CSS и картинки могут ещё грузиться
- JS (не async/defer) уже отработал

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // DOM готов, можно работать с элементами
  console.log('DOM ready')
})
```

**load**

- Загружено абсолютно всё, включая картинки
- Страница полностью готова

```javascript
window.addEventListener('load', () => {
  // Все ресурсы загружены
  console.log('Page fully loaded')
})
```

**beforeunload**

- Срабатывает перед закрытием страницы
- Можно показать подтверждение

```javascript
window.addEventListener('beforeunload', (e) => {
  e.preventDefault()
  e.returnValue = '' // Для Chrome
  return '' // Для других браузеров
})
```

**visibilitychange**

- Пользователь переключил вкладку
- Важное событие для аналитики и оптимизации

```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Вкладка скрыта — можно приостановить анимации, таймеры
    console.log('Tab hidden')
  } else {
    // Вкладка видна — возобновить работу
    console.log('Tab visible')
  }
})
```

### Порядок событий

1. `DOMContentLoaded` — DOM готов
2. `load` — все ресурсы загружены
3. `beforeunload` — перед закрытием
4. `unload` — страница выгружается

---

## 8.2. Предварительные оптимизации загрузки

Браузеры умеют предсказывать, какие ресурсы вам понадобятся.

### DNS Prefetch

```html
<link rel="dns-prefetch" href="//cdn.example.com" />
```

Заранее выполняет DNS-запрос. Экономит время при последующих запросах к этому домену.

### Preconnect

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

Заранее устанавливает TCP/TLS handshake. Это мощная оптимизация для шрифтов и внешних API.

**Что делает:**

- DNS lookup
- TCP handshake
- TLS handshake (если HTTPS)

**Когда использовать:**

- Для критических внешних ресурсов (шрифты, CDN, API)

### Prefetch

```html
<link rel="prefetch" href="/next-page.html" />
```

Загружает данные, которые возможно понадобятся позже. Prefetch не блокирует загрузку основного контента.

**Когда использовать:**

- Для страниц, на которые пользователь может перейти
- Для ресурсов, которые понадобятся позже

### Preload

```html
<link rel="preload" href="/main.css" as="style" />
<link rel="preload" href="/critical.js" as="script" />
```

Говорит браузеру: «этот ресурс точно критичен». Без preload браузер узнаёт о CSS только после парсинга HTML.

**Атрибут `as`:**

- `style` — CSS
- `script` — JavaScript
- `font` — шрифты
- `image` — изображения
- `fetch` — fetch запросы

**Когда использовать:**

- Для критических ресурсов, которые нужны сразу
- Для ресурсов, которые браузер не обнаружит автоматически

### Отличие prefetch и preload

**Preload:**

- Критический ресурс для текущей страницы
- Блокирует рендеринг (если критичен)
- Высокий приоритет

**Prefetch:**

- Ресурс для будущей навигации
- Не блокирует текущую страницу
- Низкий приоритет

---

## 8.3. Web Vitals

Web Vitals — это набор метрик, которые Google использует для оценки качества пользовательского опыта. Они измеряют реальное восприятие производительности пользователями.

### Core Web Vitals

**TTFB (Time To First Byte)**

Время от отправки запроса до получения первого байта ответа.

**Что измеряет:**

- Скорость сервера
- Сетевая задержка
- DNS lookup
- TCP/TLS handshake

**Хорошие значения:**

- < 200ms — отлично
- 200-500ms — нормально
- > 500ms — плохо

**Как оптимизировать:**

- CDN для статики
- Оптимизация сервера
- Кэширование
- HTTP/2 и HTTP/3

**LCP (Largest Contentful Paint)**

Время до отображения самого большого элемента контента.

**Что измеряет:**

- Когда пользователь видит основной контент
- Включает: изображения, видео, блоки текста

**Хорошие значения:**

- < 2.5s — отлично
- 2.5-4s — нормально
- > 4s — плохо

**Как оптимизировать:**

- Оптимизация изображений (WebP, lazy loading)
- Предзагрузка критических ресурсов
- Оптимизация серверного рендеринга
- Минимизация блокирующих ресурсов

**CLS (Cumulative Layout Shift)**

Мера визуальной стабильности — сколько элементов сдвигаются во время загрузки.

**Что измеряет:**

- Неожиданные сдвиги layout
- Влияет на воспринимаемую производительность

**Хорошие значения:**

- < 0.1 — отлично
- 0.1-0.25 — нормально
- > 0.25 — плохо

**Как оптимизировать:**

- Указывать размеры изображений (width, height)
- Резервировать место для рекламы/виджетов
- Избегать вставки контента поверх существующего
- Использовать font-display: swap аккуратно

**INP (Interaction to Next Paint)**

Время от взаимодействия пользователя до следующего кадра.

**Что измеряет:**

- Отзывчивость интерфейса
- Заменяет FID (First Input Delay) в 2024

**Хорошие значения:**

- < 200ms — отлично
- 200-500ms — нормально
- > 500ms — плохо

**Как оптимизировать:**

- Оптимизация JavaScript (code splitting, lazy loading)
- Использование Web Workers для тяжёлых вычислений
- Дебаунсинг и троттлинг событий
- Минимизация работы в главном потоке

### Другие важные метрики

**FCP (First Contentful Paint)**

Время до первого отображения контента (текст, изображение, SVG).

**TTI (Time to Interactive)**

Время до полной интерактивности страницы.

**TBT (Total Blocking Time)**

Общее время, когда главный поток был заблокирован более 50ms.

---

## 8.4. Измерение Web Vitals

### Performance API

```javascript
// LCP
new PerformanceObserver((list) => {
  const entries = list.getEntries()
  const lastEntry = entries[entries.length - 1]
  console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
}).observe({ entryTypes: ['largest-contentful-paint'] })

// CLS
let clsValue = 0
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value
    }
  }
  console.log('CLS:', clsValue)
}).observe({ entryTypes: ['layout-shift'] })

// INP
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('INP:', entry.processingStart - entry.startTime)
  }
}).observe({ entryTypes: ['event'] })
```

### Chrome DevTools

1. Открыть Performance tab
2. Записать сессию
3. Посмотреть метрики в Summary

### Lighthouse

Автоматизированная проверка производительности:

```bash
lighthouse https://example.com --view
```

Или через Chrome DevTools → Lighthouse tab.

---

## 8.5. Практические паттерны оптимизации

### Оптимизация изображений

```html
<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" alt="..." />

<!-- Responsive images -->
<img
  srcset="image-small.jpg 480w, image-large.jpg 800w"
  sizes="(max-width: 600px) 480px, 800px"
  src="image-large.jpg"
  alt="..."
/>

<!-- WebP с fallback -->
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." />
</picture>
```

### Оптимизация шрифтов

```css
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* или optional, block */
}
```

**font-display:**

- `block` — блокирует рендеринг до загрузки (может увеличить CLS)
- `swap` — показывает fallback, затем заменяет (может вызвать FOIT)
- `optional` — использует только если загружен быстро
- `fallback` — короткий блок, затем fallback

### Code splitting

```javascript
// Динамический импорт
const module = await import('./heavy-module.js')

// React.lazy
const Component = React.lazy(() => import('./Component'))
```

### Минимизация блокирующих ресурсов

```html
<!-- Плохо -->
<script src="heavy.js"></script>

<!-- Хорошо -->
<script src="heavy.js" defer></script>
<!-- или -->
<script src="heavy.js" async></script>
```

---

## Вопросы на собеседовании

### 1. Что такое Web Vitals?

Набор метрик для оценки качества пользовательского опыта: TTFB, LCP, CLS, INP.

### 2. В чём разница между DOMContentLoaded и load?

DOMContentLoaded — DOM готов, но ресурсы могут грузиться. load — все ресурсы загружены.

### 3. Чем preload отличается от prefetch?

Preload — критический ресурс для текущей страницы (высокий приоритет). Prefetch — ресурс для будущей навигации (низкий приоритет).

### 4. Что такое LCP и как его оптимизировать?

Largest Contentful Paint — время до отображения самого большого элемента. Оптимизация: оптимизация изображений, предзагрузка, минимизация блокирующих ресурсов.

### 5. Что такое CLS и как его уменьшить?

Cumulative Layout Shift — мера визуальной стабильности. Уменьшение: указывать размеры изображений, резервировать место, избегать вставки контента поверх существующего.

### 6. Что такое INP?

Interaction to Next Paint — время от взаимодействия до следующего кадра. Заменяет FID в 2024.
