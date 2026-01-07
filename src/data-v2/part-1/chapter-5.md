# Глава 5. Ограничения браузера: Same-Origin, CORS, cookies

Браузеры накладывают строгие ограничения на взаимодействие между разными источниками (origins) для обеспечения безопасности. Понимание Same-Origin Policy, CORS и работы с cookies критично для фронтенд-разработчика.

---

## 5.1. Same-Origin Policy

Same-Origin Policy (SOP) — это фундаментальный механизм безопасности браузера, который ограничивает взаимодействие между ресурсами из разных источников.

### Что такое Origin?

`origin = protocol + domain + port`

**Примеры:**

- `https://example.com:443` — origin
- `http://example.com:80` → **другой origin** (другой протокол)
- `https://api.example.com` → **другой origin** (другой домен)
- `https://example.com:8080` → **другой origin** (другой порт)
- `https://example.com/path` → **тот же origin** (путь не учитывается)

### Что блокирует Same-Origin Policy?

**Блокируется:**

- JavaScript доступ к DOM другого origin
- Чтение ответов AJAX/fetch запросов к другому origin
- Доступ к cookies другого origin
- Доступ к localStorage/sessionStorage другого origin

**Разрешается:**

- Загрузка ресурсов (изображения, CSS, скрипты) с другого origin
- Формы могут отправляться на другой origin (но ответ не читается)
- Встраивание iframe с другого origin (с ограничениями)

### Почему это важно?

SOP защищает пользователей от:

- **XSS атак** — вредоносные скрипты не могут читать данные с других сайтов
- **CSRF атак** — ограничивает возможности межсайтовых запросов
- **Утечки данных** — предотвращает доступ к конфиденциальной информации

---

## 5.2. CORS (Cross-Origin Resource Sharing)

CORS — механизм, позволяющий частично ослаблять Same-Origin Policy для безопасного взаимодействия между разными origins.

**Важно:** CORS настраивает **сервер**, а не браузер. Браузер лишь исполняет политику сервера.

### Как работает CORS?

Когда браузер делает запрос к другому origin, он:

1. Отправляет запрос с заголовком `Origin`
2. Сервер отвечает с заголовками `Access-Control-Allow-*`
3. Браузер проверяет заголовки и решает, разрешить ли доступ к ответу

### Простые запросы (Simple Requests)

Не требуют preflight:

- Методы: GET, HEAD, POST
- Заголовки: только стандартные (`Content-Type: text/plain`, `application/x-www-form-urlencoded`, `multipart/form-data`)
- Без кастомных заголовков

**Пример:**

```javascript
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
```

**Ответ сервера:**

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Credentials: true
Content-Type: application/json

{"data": "..."}
```

### Сложные запросы (Preflight Requests)

Требуют предварительного OPTIONS запроса:

- Методы: PUT, DELETE, PATCH
- Кастомные заголовки
- `Content-Type: application/json`

**Процесс:**

1. Браузер отправляет **OPTIONS** запрос (preflight)
2. Сервер отвечает разрешениями
3. Если разрешено — браузер отправляет реальный запрос

**Пример preflight:**

```http
OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization
```

**Ответ сервера:**

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

### CORS заголовки

**На сервере (ответ):**

- `Access-Control-Allow-Origin: *` или `https://example.com` — разрешённые origins
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE` — разрешённые методы
- `Access-Control-Allow-Headers: Content-Type, Authorization` — разрешённые заголовки
- `Access-Control-Allow-Credentials: true` — разрешить cookies/credentials
- `Access-Control-Max-Age: 86400` — кэширование preflight ответа (в секундах)
- `Access-Control-Expose-Headers: X-Custom-Header` — заголовки, доступные JavaScript

**На клиенте (запрос):**

- `Origin: https://example.com` — автоматически добавляется браузером
- `Access-Control-Request-Method: POST` — в preflight запросе
- `Access-Control-Request-Headers: Content-Type` — в preflight запросе

### Credentials и cookies

Для отправки cookies в cross-origin запросах:

**Клиент:**

```javascript
fetch('https://api.example.com/users', {
  credentials: 'include', // или 'same-origin'
})
```

**Сервер:**

```http
Access-Control-Allow-Origin: https://example.com  // НЕ *
Access-Control-Allow-Credentials: true
```

**Важно:** Если `Access-Control-Allow-Credentials: true`, то `Access-Control-Allow-Origin` **не может быть** `*`. Должен быть конкретный origin.

### Типичные ошибки CORS

**1. Забыли настроить сервер:**

```
Access to fetch at 'https://api.example.com' from origin 'https://example.com'
has been blocked by CORS policy
```

**Решение:** Настроить заголовки на сервере.

**2. Использовали `*` с credentials:**

```
The value of the 'Access-Control-Allow-Origin' header in the response
must not be the wildcard '*' when the request's credentials mode is 'include'
```

**Решение:** Указать конкретный origin.

**3. Неправильные заголовки в preflight:**

```
Request header field X-Custom-Header is not allowed by
Access-Control-Allow-Headers
```

**Решение:** Добавить заголовок в `Access-Control-Allow-Headers`.

---

## 5.3. Cookies

Cookies — это механизм хранения небольших данных на клиенте, которые автоматически отправляются с каждым запросом к серверу.

### Атрибуты cookies

**Set-Cookie заголовок:**

```http
Set-Cookie: sessionId=abc123; Path=/; Domain=.example.com;
Max-Age=3600; Secure; HttpOnly; SameSite=Strict
```

**Атрибуты:**

- `Path=/` — путь, для которого cookie действительна
- `Domain=.example.com` — домен (точка в начале означает поддомены)
- `Max-Age=3600` — время жизни в секундах (или `Expires=...`)
- `Secure` — отправляется только по HTTPS
- `HttpOnly` — недоступна через JavaScript (защита от XSS)
- `SameSite=Strict|Lax|None` — защита от CSRF

### SameSite атрибут

**Strict:**

- Cookie **никогда** не отправляется в cross-site запросах
- Максимальная защита от CSRF
- Может ломать функциональность (например, переходы по ссылкам)

**Lax (по умолчанию в современных браузерах):**

- Cookie отправляется в top-level навигации (GET запросы)
- Не отправляется в POST запросах с другого сайта
- Баланс между безопасностью и функциональностью

**None:**

- Cookie отправляется во всех cross-site запросах
- Требует `Secure` флаг
- Используется для iframe и cross-site функциональности

### Работа с cookies в JavaScript

**Чтение:**

```javascript
// Все cookies
document.cookie // "sessionId=abc123; theme=dark"

// Парсинг
const cookies = document.cookie.split(';').reduce((acc, cookie) => {
  const [key, value] = cookie.trim().split('=')
  acc[key] = value
  return acc
}, {})
```

**Запись:**

```javascript
document.cookie = 'sessionId=abc123; Path=/; Max-Age=3600; Secure; HttpOnly'
```

**Важно:** `HttpOnly` cookies **нельзя** установить через JavaScript. Только через `Set-Cookie` заголовок сервера.

### Cookies vs LocalStorage vs SessionStorage

**Cookies:**

- Размер: ~4KB
- Отправка на сервер: автоматически
- Доступ с сервера: да
- Срок жизни: настраивается
- Доступ из JavaScript: да (если не HttpOnly)
- Защита от XSS: HttpOnly флаг
- Защита от CSRF: SameSite

**LocalStorage:**

- Размер: ~5-10MB
- Отправка на сервер: нет
- Доступ с сервера: нет
- Срок жизни: до удаления
- Доступ из JavaScript: да
- Защита от XSS: нет
- Защита от CSRF: нет

**SessionStorage:**

- Размер: ~5-10MB
- Отправка на сервер: нет
- Доступ с сервера: нет
- Срок жизни: до закрытия вкладки
- Доступ из JavaScript: да
- Защита от XSS: нет
- Защита от CSRF: нет

---

## 5.4. Практические паттерны

### Работа с CORS в разработке

**Проблема:** Локальный фронтенд (`http://localhost:3000`) обращается к API (`https://api.example.com`).

**Решения:**

1. **Прокси в dev-сервере** (Vite, Webpack):

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
      },
    },
  },
}
```

2. **CORS на сервере** (для разработки):

```http
Access-Control-Allow-Origin: http://localhost:3000
```

3. **Browser extension** (только для разработки, не для продакшена)

### Безопасная работа с credentials

```javascript
// Хорошо: явно указываем credentials
fetch('https://api.example.com/users', {
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

// Плохо: полагаемся на cookies без явного указания
fetch('https://api.example.com/users')
```

---

## Вопросы на собеседовании

### 1. Что такое Same-Origin Policy?

Механизм безопасности браузера, который ограничивает взаимодействие между ресурсами из разных origins. Origin = protocol + domain + port.

### 2. Что такое CORS?

Cross-Origin Resource Sharing — механизм, позволяющий ослаблять Same-Origin Policy. Настраивается на сервере через заголовки `Access-Control-Allow-*`.

### 3. В чём разница между простым и preflight запросом?

Простой запрос (GET, POST с простыми заголовками) отправляется сразу. Preflight запрос (OPTIONS) отправляется перед сложными запросами (PUT, DELETE, кастомные заголовки).

### 4. Почему нельзя использовать `*` с `credentials: include`?

Это небезопасно. Если разрешены credentials, должен быть указан конкретный origin.

### 5. Что такое SameSite у cookies?

Атрибут, контролирующий отправку cookies в cross-site запросах. `Strict` — никогда, `Lax` — только в top-level навигации, `None` — всегда (требует Secure).

### 6. Чем cookies отличаются от LocalStorage?

Cookies автоматически отправляются на сервер, имеют ограничение ~4KB, поддерживают HttpOnly и SameSite. LocalStorage доступен только в JavaScript, больше по размеру, не отправляется автоматически.

