# Глава 32. Observer APIs: IntersectionObserver, MutationObserver, ResizeObserver

Современные браузеры дают мощные API для «наблюдения» за DOM без постоянных опросов. Observer APIs позволяют эффективно отслеживать изменения без производительных затрат на polling.

---

## 32.1. IntersectionObserver

Используется для отслеживания видимости элементов в viewport.

**Применения:**

- lazy‑loading картинок
- бесконечная прокрутка
- отслеживание видимости блоков (аналитика, анимации при появлении)
- отслеживание скролла

### Базовое использование

```javascript
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Элемент виден
      console.log('Element is visible')
    } else {
      // Элемент не виден
      console.log('Element is hidden')
    }
  })
})

observer.observe(element)
```

### Опции

```javascript
const observer = new IntersectionObserver(callback, {
  root: null, // viewport (или конкретный элемент)
  rootMargin: '0px', // Отступы от root
  threshold: 0.5, // Порог видимости (0.0 - 1.0)
})
```

**Параметры:**

- `root` — элемент-контейнер для наблюдения (null = viewport)
- `rootMargin` — отступы от root (как в CSS margin)
- `threshold` — порог видимости (0.0 = появился, 1.0 = полностью виден, массив для нескольких порогов)

### Lazy‑loading изображений

```javascript
const images = document.querySelectorAll('img[data-src]')

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return

    const img = entry.target
    img.src = img.dataset.src || ''
    img.removeAttribute('data-src')

    obs.unobserve(img) // Прекращаем наблюдение
  })
})

images.forEach((img) => observer.observe(img))
```

**HTML:**

```html
<img data-src="image.jpg" alt="Lazy loaded" />
```

### Бесконечная прокрутка

```javascript
const sentinel = document.getElementById('sentinel')

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreItems()
  }
})

observer.observe(sentinel)
```

### Анимации при появлении

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  },
  {
    threshold: 0.1,
  },
)

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
  observer.observe(el)
})
```

### Отслеживание видимости для аналитики

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Отправить событие в аналитику
        analytics.track('view', {
          element: entry.target.id,
          time: entry.time,
        })
      }
    })
  },
  {
    threshold: 0.5, // 50% видимости
  },
)
```

### unobserve и disconnect

```javascript
// Прекратить наблюдение за элементом
observer.unobserve(element)

// Прекратить наблюдение за всеми элементами
observer.disconnect()
```

---

## 32.2. MutationObserver

Отслеживает изменения в DOM‑дереве.

**Применения:**

- отладка сторонних скриптов
- реактивные биндинги в «ванильном» JS
- тестирование (проверка, что DOM изменился ожидаемым образом)
- отслеживание изменений атрибутов

### Базовое использование

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log('Type:', mutation.type)
    console.log('Target:', mutation.target)

    if (mutation.type === 'childList') {
      console.log('Added nodes:', mutation.addedNodes)
      console.log('Removed nodes:', mutation.removedNodes)
    }

    if (mutation.type === 'attributes') {
      console.log('Attribute:', mutation.attributeName)
      console.log('Old value:', mutation.oldValue)
    }
  })
})

observer.observe(targetElement, {
  childList: true, // Изменения дочерних элементов
  attributes: true, // Изменения атрибутов
  subtree: true, // Включая поддерево
  attributeOldValue: true, // Сохранять старое значение атрибута
})
```

### Опции наблюдения

```javascript
observer.observe(element, {
  childList: true, // Добавление/удаление дочерних элементов
  attributes: true, // Изменения атрибутов
  characterData: true, // Изменения текстового содержимого
  subtree: true, // Наблюдать за всем поддеревом
  attributeOldValue: true, // Сохранять старое значение атрибута
  characterDataOldValue: true, // Сохранять старое значение текста
  attributeFilter: ['class', 'id'], // Только указанные атрибуты
})
```

### Отслеживание изменений классов

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const newClasses = mutation.target.classList
      console.log('Classes changed:', newClasses)
    }
  })
})

observer.observe(element, {
  attributes: true,
  attributeFilter: ['class'],
})
```

### Отслеживание добавления элементов

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Обработать новый элемент
        initializeComponent(node)
      }
    })
  })
})

observer.observe(container, {
  childList: true,
  subtree: true,
})
```

### disconnect

```javascript
observer.disconnect() // Прекратить наблюдение
```

---

## 32.3. ResizeObserver

Отслеживает изменения размеров элемента.

**Применения:**

- адаптивные виджеты
- синхронизация размеров (например, колонок)
- аналитика и логирование
- обновление layout при изменении размеров

### Базовое использование

```javascript
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { width, height } = entry.contentRect
    console.log('Width:', width)
    console.log('Height:', height)
  })
})

observer.observe(element)
```

### Адаптивный виджет

```javascript
const widget = document.getElementById('widget')

const observer = new ResizeObserver((entries) => {
  const { width } = entries[0].contentRect

  if (width < 600) {
    widget.classList.add('mobile')
    widget.classList.remove('desktop')
  } else {
    widget.classList.add('desktop')
    widget.classList.remove('mobile')
  }
})

observer.observe(widget)
```

### Синхронизация размеров колонок

```javascript
const columns = document.querySelectorAll('.column')

const observer = new ResizeObserver((entries) => {
  const maxHeight = Math.max(
    ...Array.from(columns).map((col) => col.offsetHeight),
  )

  columns.forEach((col) => {
    col.style.height = `${maxHeight}px`
  })
})

columns.forEach((col) => observer.observe(col))
```

### unobserve и disconnect

```javascript
// Прекратить наблюдение за элементом
observer.unobserve(element)

// Прекратить наблюдение за всеми элементами
observer.disconnect()
```

---

## 32.4. Сравнение Observer APIs

**`IntersectionObserver`:**

- Назначение: видимость элементов
- Когда использовать: lazy loading, infinite scroll, аналитика

**`MutationObserver`:**

- Назначение: изменения DOM
- Когда использовать: отладка, реактивность, тестирование

**`ResizeObserver`:**

- Назначение: изменения размеров
- Когда использовать: адаптивные виджеты, синхронизация

---

## 32.5. Производительность Observer APIs

**Преимущества перед polling:**

- Нет постоянных проверок
- Браузер оптимизирует выполнение
- Меньше нагрузка на CPU
- Более точные события

**Когда не использовать:**

- Простые случаи, где достаточно событий
- Когда нужна мгновенная реакция (Observer может иметь задержку)

---

## 32.6. Практические паттерны

### Комбинирование Observers

```javascript
const intersectionObserver = new IntersectionObserver(/* ... */)
const resizeObserver = new ResizeObserver(/* ... */)

element.addEventListener('load', () => {
  intersectionObserver.observe(element)
  resizeObserver.observe(element)
})
```

### Cleanup в React

```javascript
function Component() {
  useEffect(() => {
    const observer = new IntersectionObserver(/* ... */)
    const element = document.getElementById('target')

    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [])
}
```

### Отслеживание видимости с задержкой

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Задержка перед действием
      setTimeout(() => {
        entry.target.classList.add('visible')
      }, 100)
    }
  })
})
```

---

## Вопросы на собеседовании

### 1. Что такое IntersectionObserver?

API для отслеживания видимости элементов в viewport. Используется для lazy loading, infinite scroll, аналитики.

### 2. В чём разница между IntersectionObserver и scroll событиями?

IntersectionObserver более производительный, не требует постоянных проверок. Scroll события могут вызываться очень часто.

### 3. Что такое MutationObserver?

API для отслеживания изменений в DOM. Позволяет отслеживать добавление/удаление элементов, изменения атрибутов.

### 4. Когда использовать ResizeObserver?

Для отслеживания изменений размеров элементов. Полезен для адаптивных виджетов и синхронизации размеров.

### 5. Как прекратить наблюдение?

Использовать `unobserve(element)` для конкретного элемента или `disconnect()` для всех.

### 6. В чём преимущество Observer APIs перед polling?

Нет постоянных проверок, браузер оптимизирует выполнение, меньше нагрузка на CPU, более точные события.

