# Глава 12. Формы: валидация и UX ошибок

Формы — это один из самых важных элементов веб-интерфейса. От качества их реализации зависит конверсия, пользовательский опыт и доступность. Правильная валидация, понятные сообщения об ошибках и хороший UX критичны для успешных форм.

На собеседованиях это проверяют, потому что:

- формы — основа большинства веб-приложений
- валидация влияет на безопасность и UX
- доступность форм — требование WCAG
- работа с формами показывает понимание UX принципов

---

## 12.1. Нативные элементы форм

### Базовые элементы

- `<form>` — контейнер формы
- `<label>` — подпись поля (обязательна!)
- `<input>` — поле ввода
- `<textarea>` — многострочное поле
- `<select>` — выпадающий список
- `<button>` — кнопка отправки

Без `<label>` многие screen readers не понимают предназначение поля.

**Обязательное правило:**

```html
<label for="email">Email</label>
<input id="email" type="email" />
```

**Почему?**

- фокус можно поставить по клику на текст
- читатель вслух связывает label и input
- помогает автозаполнению
- улучшает UX

**Альтернативный синтаксис:**

```html
<label>
  Email
  <input type="email" />
</label>
```

---

## 12.2. Типы input

**text** — обычные поля

**email** — проверка email встроена

```html
<input type="email" required />
```

**number** — допускает числовой ввод

```html
<input type="number" min="0" max="100" step="1" />
```

**tel** — удобная клавиатура на мобильных

```html
<input type="tel" pattern="[0-9]{10}" />
```

**date** — календарь

```html
<input type="date" min="2024-01-01" max="2024-12-31" />
```

**range** — слайдер

```html
<input type="range" min="0" max="100" value="50" />
```

**password** — скрытый ввод

```html
<input type="password" autocomplete="current-password" />
```

**search** — поле поиска

```html
<input type="search" />
```

**url** — валидация URL

```html
<input type="url" />
```

**checkbox** — чекбокс

```html
<input type="checkbox" id="agree" />
<label for="agree">Я согласен</label>
```

**radio** — радио-кнопки

```html
<input type="radio" id="male" name="gender" value="male" />
<label for="male">Мужской</label>
<input type="radio" id="female" name="gender" value="female" />
<label for="female">Женский</label>
```

---

## 12.3. Валидация HTML5

Атрибуты валидации:

- `required` — поле обязательно
- `pattern` — регулярное выражение
- `min`, `max` — минимальное/максимальное значение
- `maxlength`, `minlength` — длина строки
- `type="email"` — валидация email
- `step` — шаг для number/range

Браузер сам покажет пользователю ошибку.

**Пример:**

```html
<form>
  <label for="email">Email</label>
  <input
    id="email"
    type="email"
    required
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  />
  
  <label for="age">Возраст</label>
  <input
    id="age"
    type="number"
    min="18"
    max="120"
    required
  />
  
  <label for="phone">Телефон</label>
  <input
    id="phone"
    type="tel"
    pattern="[0-9]{10}"
    placeholder="1234567890"
    required
  />
  
  <button type="submit">Отправить</button>
</form>
```

### Custom-валидация через Constraint API

```javascript
const input = document.querySelector('#email')

// Установить кастомное сообщение
input.setCustomValidity('Введите корректный email')

// Проверить валидность
if (input.validity.valid) {
  // Поле валидно
} else {
  // Поле невалидно
  console.log(input.validity)
  // validity: {
  //   valueMissing: true/false
  //   typeMismatch: true/false
  //   patternMismatch: true/false
  //   tooLong: true/false
  //   tooShort: true/false
  //   rangeUnderflow: true/false
  //   rangeOverflow: true/false
  //   stepMismatch: true/false
  //   badInput: true/false
  //   customError: true/false
  //   valid: true/false
  // }
}

// Сбросить кастомное сообщение
input.setCustomValidity('')
```

**Почему важно использовать нативную валидацию?**

- она бесплатная
- работает из коробки
- идеально интегрирована с доступностью
- не ломается при выключенном JS
- автоматически локализуется браузером

---

## 12.4. UX ошибок в формах

### Показ ошибок

**Плохо:**

```html
<!-- Ошибка показывается только после отправки -->
<form>
  <input type="email" required />
  <span class="error" style="display: none;">Неверный email</span>
</form>
```

**Хорошо:**

```html
<form novalidate>
  <label for="email">Email</label>
  <input
    id="email"
    type="email"
    required
    aria-invalid="false"
    aria-describedby="email-error"
  />
  <span id="email-error" class="error" role="alert" aria-live="polite">
    <!-- Сообщение об ошибке -->
  </span>
</form>
```

**Правила:**

1. Показывать ошибки сразу при потере фокуса (blur)
2. Использовать `aria-invalid` для screen readers
3. Использовать `aria-describedby` для связи с сообщением об ошибке
4. Использовать `role="alert"` для динамических сообщений
5. Валидировать при вводе (для некоторых полей)

### Сообщения об ошибках

**Хорошие сообщения:**

- Конкретные (не "Ошибка", а "Email должен содержать @")
- Понятные (не "Pattern mismatch", а "Введите корректный номер телефона")
- Позитивные (не "Не используйте пробелы", а "Используйте только буквы и цифры")
- Показывают, что исправить

**Пример:**

```html
<input
  type="password"
  id="password"
  aria-invalid="false"
  aria-describedby="password-error password-hint"
/>
<span id="password-hint" class="hint">
  Минимум 8 символов, буквы и цифры
</span>
<span id="password-error" class="error" role="alert"></span>
```

### Визуальная индикация

```css
input:invalid {
  border-color: red;
}

input:valid {
  border-color: green;
}

input:focus:invalid {
  outline-color: red;
}

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

---

## 12.5. Доступность форм

### Обязательные поля

```html
<label for="email">
  Email
  <span aria-label="обязательное поле">*</span>
</label>
<input id="email" type="email" required aria-required="true" />
```

### Группировка полей

```html
<fieldset>
  <legend>Контактная информация</legend>
  <label for="email">Email</label>
  <input id="email" type="email" />
  
  <label for="phone">Телефон</label>
  <input id="phone" type="tel" />
</fieldset>
```

### Таблицы в формах

Используем:

- `<thead>`
- `<tbody>`
- `<th>`

И главное:

```html
<th scope="col">Price</th>
<th scope="row">Tomatoes</th>
```

Это помогает людям с экранными читалками.

---

## 12.6. Практические паттерны

### Валидация в реальном времени

```javascript
const emailInput = document.querySelector('#email')

emailInput.addEventListener('blur', () => {
  validateEmail(emailInput)
})

emailInput.addEventListener('input', () => {
  if (emailInput.value.length > 0) {
    validateEmail(emailInput)
  }
})

function validateEmail(input) {
  const email = input.value
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
    input.setCustomValidity('Введите корректный email')
    input.setAttribute('aria-invalid', 'true')
    showError(input, 'Введите корректный email')
  } else {
    input.setCustomValidity('')
    input.setAttribute('aria-invalid', 'false')
    hideError(input)
  }
}
```

### Отправка формы

```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  // Валидация всех полей
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }
  
  // Показать индикатор загрузки
  submitButton.disabled = true
  submitButton.textContent = 'Отправка...'
  
  try {
    const formData = new FormData(form)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    })
    
    if (response.ok) {
      showSuccess('Форма успешно отправлена')
      form.reset()
    } else {
      showError('Ошибка при отправке формы')
    }
  } catch (error) {
    showError('Ошибка сети')
  } finally {
    submitButton.disabled = false
    submitButton.textContent = 'Отправить'
  }
})
```

### Автозаполнение

```html
<input
  type="email"
  autocomplete="email"
  name="email"
/>

<input
  type="password"
  autocomplete="current-password"
  name="password"
/>

<input
  type="text"
  autocomplete="name"
  name="name"
/>
```

**Значения autocomplete:**

- `name`, `given-name`, `family-name`
- `email`, `username`
- `current-password`, `new-password`
- `tel`, `address-line1`, `city`, `country`

---

## Вопросы на собеседовании

### 1. Почему `<label>` обязателен для форм?

Без label screen readers не понимают предназначение поля. Также label улучшает UX (клик по тексту фокусирует поле).

### 2. Как работает нативная валидация HTML5?

Браузер автоматически проверяет поля по атрибутам (required, pattern, type) и показывает сообщения об ошибках.

### 3. Как показать кастомное сообщение об ошибке?

Использовать `setCustomValidity()` и `aria-invalid` + `aria-describedby`.

### 4. Когда показывать ошибки в форме?

При потере фокуса (blur) и при отправке формы. Для некоторых полей — при вводе.

### 5. Как сделать форму доступной?

Использовать label, aria-атрибуты, правильную структуру, визуальные индикаторы ошибок.

### 6. Что такое Constraint API?

API для программной валидации форм через `validity`, `setCustomValidity()`, `checkValidity()`.

---

## Key Takeaways

- `<label>` обязателен для всех полей ввода
- Нативная валидация HTML5 работает из коробки и доступна
- Показывать ошибки сразу при потере фокуса
- Сообщения об ошибках должны быть конкретными и понятными
- Использовать aria-атрибуты для доступности
- Автозаполнение улучшает UX
- Правильная валидация критична для безопасности и UX

