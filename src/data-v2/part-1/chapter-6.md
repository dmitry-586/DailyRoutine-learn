# Глава 6. Realtime в вебе: WebSocket и SSE

Современные веб-приложения часто требуют realtime взаимодействия: чаты, уведомления, live-обновления данных, стриминг. Для этого используются WebSocket и Server-Sent Events (SSE) — протоколы, которые выходят за рамки классического request-response цикла HTTP.

---

## 6.1. Ограничения HTTP для realtime

Классический HTTP работает по модели request-response:

- Клиент отправляет запрос
- Сервер отвечает
- Соединение закрывается

**Проблемы для realtime:**

1. **Polling** — постоянные запросы каждые N секунд:
   - Неэффективно (много запросов)
   - Задержка до N секунд
   - Нагрузка на сервер

2. **Long Polling** — запрос остаётся открытым до получения данных:
   - Лучше, чем polling
   - Но всё ещё один запрос = один ответ
   - Сложнее управление соединениями

**Решение:** WebSocket и SSE — постоянные соединения для двусторонней или односторонней связи.

---

## 6.2. WebSocket

WebSocket — протокол для **двусторонней** связи между клиентом и сервером через постоянное TCP-соединение.

### Характеристики

- **Двусторонняя связь** — клиент и сервер могут отправлять данные в любой момент
- **Постоянное соединение** — не нужно устанавливать новое для каждого сообщения
- **Низкая задержка** — нет overhead HTTP заголовков
- **Бинарные данные** — поддерживает не только текст, но и бинарные данные

### Установка соединения

WebSocket начинается с HTTP handshake:

```http
GET /ws HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

**Ответ сервера:**

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

После этого соединение «переключается» на протокол WebSocket.

### Использование в JavaScript

**Клиент:**

```javascript
const ws = new WebSocket('wss://example.com/ws')

// Открытие соединения
ws.onopen = () => {
  console.log('Connected')
  ws.send('Hello Server')
}

// Получение сообщений
ws.onmessage = (event) => {
  console.log('Received:', event.data)
  // event.data может быть строкой или Blob
}

// Ошибки
ws.onerror = (error) => {
  console.error('WebSocket error:', error)
}

// Закрытие
ws.onclose = (event) => {
  console.log('Closed:', event.code, event.reason)
  // event.code: 1000 (нормальное), 1001, 1006 и др.
}

// Отправка данных
ws.send('Text message')
ws.send(JSON.stringify({ type: 'message', data: '...' }))
ws.send(new Blob([data])) // бинарные данные

// Закрытие соединения
ws.close(1000, 'Normal closure')
```

### Коды закрытия

- `1000` — нормальное закрытие
- `1001` — сервер уходит (shutdown)
- `1006` — аномальное закрытие (без close frame)
- `1008` — нарушение политики
- `1011` — внутренняя ошибка сервера

### Типы данных

**Текст:**

```javascript
ws.send('Hello')
ws.send(JSON.stringify({ data: '...' }))
```

**Бинарные:**

```javascript
ws.send(new ArrayBuffer(8))
ws.send(new Blob([data]))
ws.binaryType = 'arraybuffer' // или 'blob'
```

### Переподключение

```javascript
let ws
let reconnectAttempts = 0
const maxReconnectAttempts = 5

function connect() {
  ws = new WebSocket('wss://example.com/ws')

  ws.onopen = () => {
    reconnectAttempts = 0
    console.log('Connected')
  }

  ws.onclose = (event) => {
    if (event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000)
      setTimeout(connect, delay)
    }
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
}

connect()
```

### Когда использовать WebSocket

**Идеально для:**

- Чат-приложений
- Онлайн-игр
- Коллаборативных редакторов
- Торговых платформ (live цены)
- Любых приложений, где нужна **двусторонняя** связь в реальном времени

**Не использовать для:**

- Простой отправки данных на сервер (достаточно HTTP POST)
- Одностороннего потока данных (лучше SSE)
- Статических данных (достаточно HTTP GET)

---

## 6.3. Server-Sent Events (SSE)

SSE — протокол для **односторонней** связи: сервер → клиент через постоянное HTTP-соединение.

### Характеристики

- **Односторонняя связь** — только сервер → клиент
- **Проще, чем WebSocket** — работает поверх обычного HTTP
- **Автоматическое переподключение** — встроено в браузер
- **Только текст** — не поддерживает бинарные данные
- **Дешевле по ресурсам** — меньше overhead, чем WebSocket

### Использование в JavaScript

**Клиент:**

```javascript
const eventSource = new EventSource('https://example.com/events')

// Получение сообщений
eventSource.onmessage = (event) => {
  console.log('Received:', event.data)
  const data = JSON.parse(event.data)
}

// Слушатель конкретного события
eventSource.addEventListener('custom-event', (event) => {
  console.log('Custom event:', event.data)
})

// Ошибки
eventSource.onerror = (error) => {
  console.error('SSE error:', error)
  // Браузер автоматически переподключается
}

// Открытие соединения
eventSource.onopen = () => {
  console.log('SSE connected')
}

// Закрытие
eventSource.close()
```

**Сервер (пример на Node.js):**

```javascript
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  // Отправка данных
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  // Кастомное событие
  const sendCustomEvent = (event, data) => {
    res.write(`event: ${event}\n`)
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  // Отправка каждые 5 секунд
  const interval = setInterval(() => {
    sendEvent({ message: 'Hello', timestamp: Date.now() })
  }, 5000)

  // Закрытие при отключении клиента
  req.on('close', () => {
    clearInterval(interval)
    res.end()
  })
})
```

### Формат SSE сообщений

```
data: First message\n\n

data: Second message\n
data: with multiple lines\n\n

event: custom-event\n
data: {"type": "notification"}\n\n

id: 123\n
data: Message with ID\n\n
```

**Правила:**

- Каждое сообщение заканчивается `\n\n`
- `data:` — данные сообщения
- `event:` — имя события (по умолчанию `message`)
- `id:` — ID сообщения (для переподключения)
- `retry:` — интервал переподключения в миллисекундах

### Автоматическое переподключение

SSE автоматически переподключается при потере соединения:

```javascript
eventSource.onerror = (error) => {
  // Браузер автоматически переподключится через 3 секунды
  // Можно изменить через retry: в ответе сервера
}
```

**Сервер может указать интервал:**

```
retry: 5000\n
data: Message\n\n
```

### Когда использовать SSE

**Идеально для:**

- Уведомлений в реальном времени
- Ленты новостей (live updates)
- Мониторинга (статусы, метрики)
- Прогресс-баров (загрузка файлов)
- Любых приложений, где нужен **односторонний** поток данных

**Не использовать для:**

- Двусторонней связи (нужен WebSocket)
- Бинарных данных (нужен WebSocket)
- Частых сообщений в обе стороны (нужен WebSocket)

---

## 6.4. Сравнение WebSocket и SSE

| Характеристика      | WebSocket                       | SSE                             |
| ------------------- | ------------------------------- | ------------------------------- |
| Направление         | Двустороннее                    | Одностороннее (сервер → клиент) |
| Протокол            | Собственный (начинается с HTTP) | HTTP                            |
| Типы данных         | Текст и бинарные                | Только текст                    |
| Переподключение     | Нужно реализовывать вручную     | Автоматическое                  |
| Сложность           | Выше                            | Ниже                            |
| Overhead            | Меньше (после handshake)        | Больше (HTTP заголовки)         |
| Поддержка браузеров | Хорошая                         | Хорошая (кроме IE)              |
| Использование       | Чат, игры, коллаборация         | Уведомления, мониторинг         |

---

## 6.5. Практические паттерны

### Fallback для старых браузеров

**SSE:**

```javascript
if (typeof EventSource !== 'undefined') {
  const eventSource = new EventSource('/events')
  // ...
} else {
  // Fallback на polling
  setInterval(() => {
    fetch('/api/events').then(/* ... */)
  }, 5000)
}
```

**WebSocket:**

```javascript
if ('WebSocket' in window) {
  const ws = new WebSocket('wss://example.com/ws')
  // ...
} else {
  // Fallback на long polling или SSE
}
```

### Обработка ошибок и переподключение

**WebSocket с экспоненциальной задержкой:**

```javascript
let reconnectDelay = 1000
const maxDelay = 30000

function connect() {
  const ws = new WebSocket('wss://example.com/ws')

  ws.onopen = () => {
    reconnectDelay = 1000
  }

  ws.onclose = () => {
    setTimeout(() => {
      reconnectDelay = Math.min(reconnectDelay * 2, maxDelay)
      connect()
    }, reconnectDelay)
  }
}
```

### Отправка данных через SSE (обходное решение)

SSE не поддерживает отправку данных от клиента, но можно комбинировать:

```javascript
const eventSource = new EventSource('/events')

// Для отправки данных используем обычный HTTP
function sendMessage(message) {
  fetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify({ message }),
  })
}

// Для получения используем SSE
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  // ...
}
```

---

## Вопросы на собеседовании

### 1. Чем WebSocket отличается от SSE?

WebSocket — двусторонняя связь, поддерживает бинарные данные, требует ручного переподключения. SSE — односторонняя связь (сервер → клиент), только текст, автоматическое переподключение.

### 2. Когда использовать WebSocket, а когда SSE?

WebSocket — для чатов, игр, коллаборативных приложений (нужна двусторонняя связь). SSE — для уведомлений, мониторинга, live-обновлений (односторонний поток).

### 3. Как работает установка WebSocket соединения?

Начинается с HTTP handshake (Upgrade: websocket), затем соединение переключается на протокол WebSocket.

### 4. Что такое автоматическое переподключение в SSE?

Браузер автоматически переподключается при потере соединения. Интервал можно настроить через заголовок `retry:` в ответе сервера.

### 5. Можно ли отправлять данные от клиента через SSE?

Нет, SSE только для сервер → клиент. Для отправки данных нужно использовать обычный HTTP (POST, PUT и т.д.).

---

## Key Takeaways

- WebSocket — для двусторонней связи в реальном времени
- SSE — для одностороннего потока данных от сервера
- WebSocket сложнее, но мощнее (бинарные данные, двусторонняя связь)
- SSE проще и имеет автоматическое переподключение
- Выбор зависит от требований: нужна ли двусторонняя связь или только получение данных
