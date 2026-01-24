# Глава 60. Безопасность во фронтенде

Безопасность во фронтенде — это не про «сервер всё проверит», а про минимизацию поверхности атаки. На уровне Middle+ ожидается понимание моделей угроз, а не просто список терминов.

---

## 60.1. XSS (Cross-Site Scripting)

XSS — внедрение вредоносного JS-кода в доверенный контекст.

### Виды XSS

**Отражённая (Reflected):**

Код возвращается в ответе сервера. Пользователь видит вредоносный URL.

```javascript
// URL: /search?q=<script>alert('XSS')</script>
// Сервер возвращает: <div>Результаты для: <script>alert('XSS')</script></div>
```

**Хранимая (Stored):**

Код сохраняется в БД и исполняется у всех пользователей.

```javascript
// Пользователь оставляет комментарий: <script>stealCookies()</script>
// Комментарий сохраняется в БД
// Все пользователи видят этот комментарий → скрипт выполняется
```

**DOM-based:**

Манипуляции DOM без участия сервера. Вредоносный код в клиентском JS.

```javascript
// Клиентский код
const hash = window.location.hash
element.innerHTML = hash //  XSS через URL hash
```

### Пример уязвимости

```javascript
//  Опасно
element.innerHTML = userInput

//  Безопасно
element.textContent = userInput
```

### Защита от XSS

- **Экранирование (sanitization)** — очистка пользовательского ввода
- **Content Security Policy (CSP)** — ограничение источников скриптов
- **Отказ от innerHTML** — использование textContent
- **Использование фреймворков** — React экранирует по умолчанию
- **Валидация на сервере** — никогда не доверяй клиенту

### React и XSS

React автоматически экранирует значения:

```tsx
//  Безопасно: React экранирует
function UserProfile({ name }: { name: string }) {
  return <div>{name}</div> // Автоматически экранируется
}

//  Опасно: dangerouslySetInnerHTML
function UserContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

//  Безопасно: санитизация перед dangerouslySetInnerHTML
import DOMPurify from 'dompurify'

function UserContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}
```

---

## 60.2. CSRF (Cross-Site Request Forgery)

CSRF — выполнение запроса от имени пользователя без его ведома.

### Как работает

1. Пользователь залогинен на сайте A (bank.com)
2. Пользователь переходит на сайт B (evil.com)
3. Сайт B отправляет запрос на bank.com от имени пользователя
4. Браузер автоматически отправляет cookies с bank.com
5. Запрос выполняется успешно

**Пример:**

```html
<!-- evil.com -->
<img src="https://bank.com/transfer?to=attacker&amount=1000" />
```

### Защита от CSRF

- **CSRF-токены** — уникальный токен для каждого запроса
- **SameSite cookies** — ограничение отправки cookies
- **Проверка Origin / Referer** — проверка источника запроса
- **Двойная отправка cookies** — проверка совпадения cookies

### SameSite cookies

```javascript
// Strict — только same-site запросы
Set-Cookie: session=abc123; SameSite=Strict

// Lax — GET-запросы с других сайтов разрешены
Set-Cookie: session=abc123; SameSite=Lax

// None — требует Secure
Set-Cookie: session=abc123; SameSite=None; Secure
```

---

## 60.3. CORS (Cross-Origin Resource Sharing)

CORS — механизм контроля доступа между origin'ами.

### Preflight-запрос

Для сложных запросов браузер сначала отправляет OPTIONS:

```
OPTIONS /api/users
Origin: https://example.com
Access-Control-Request-Method: POST
```

Сервер отвечает:

```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: POST, GET
Access-Control-Allow-Headers: Content-Type
```

### Типичная ошибка

```javascript
//  Опасно: открытый CORS
Access-Control-Allow-Origin: *

//  Безопасно: конкретные домены
Access-Control-Allow-Origin: https://myapp.com
```

**Важно:** CORS — это защита браузера, а не сервера. Сервер настраивает политику, браузер её исполняет.

---

## 60.4. Cookie-флаги

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

## 60.5. Токены и аутентификация

### JWT (JSON Web Token)

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
- Хранится в памяти или HttpOnly cookie

**Refresh token:**

- Долгоживущий (7 дней)
- Используется для обновления access token
- Хранится в HttpOnly cookie

### Где хранить токены

** localStorage:**

```javascript
// Уязвимо к XSS
localStorage.setItem('token', 'abc123')
// Атакующий может прочитать через XSS
```

** HttpOnly cookies:**

```javascript
// Безопасно: JS не может прочитать
Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Strict
```

**Рекомендация:**

- Access token — в памяти (для SPA) или HttpOnly cookie
- Refresh token — в HttpOnly cookie
- Никогда не хранить в localStorage

---

## 60.6. OWASP Top-10

**Ключевые пункты для фронтенда:**

- **XSS** — внедрение скриптов
- **CSRF** — подделка запросов
- **Insecure storage** — небезопасное хранение данных
- **Misconfiguration** — неправильная конфигурация

### Типичные ошибки

- Хранение токенов в localStorage
- Отключение CORS без понимания
- Доверие данным от клиента
- Открытый CORS (`Access-Control-Allow-Origin: *`)
- Отсутствие валидации на клиенте и сервере

---

## 60.7. Практические сценарии

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

### Сценарий 4: Загрузка файлов

**Ситуация:** фронт позволяет загружать файлы и показывает превью.

**Риски:**

- попытка загрузки HTML/JS под видом картинки
- XSS-атаки при отображении имени файла или описания без экранирования

**Как лучше:**

- валидировать тип и размер файла на клиенте и на сервере
- никогда не доверять `file.name` и другим полям, всегда экранировать при выводе
- использовать безопасные CDN/поддомены для раздачи пользовательского контента

---

## Вопросы на собеседовании

### 1. Разница между видами XSS?

Reflected — в URL, Stored — в БД, DOM-based — в клиентском JS.

### 2. Как защититься от XSS?

Экранирование, CSP, textContent вместо innerHTML, фреймворки (React экранирует по умолчанию).

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

- Никогда не доверяй данным от клиента — валидация на сервере обязательна