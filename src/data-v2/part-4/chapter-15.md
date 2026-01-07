# Глава 15. Современные раскладки: Flexbox и Grid

Flexbox и Grid — это революция в CSS layout. Они заменили float, таблицы и сложные хаки для создания макетов. Понимание этих инструментов критично для современной вёрстки.

---

## 15.1. Flexbox: полное руководство

Flexbox — идеальный инструмент для одномерных раскладок. Это система, ориентированная на одну ось: горизонтальную или вертикальную. Его задача — распределять пространство.

### Основные свойства контейнера

```css
.container {
  display: flex;
  flex-direction: row | column | row-reverse | column-reverse;
  justify-content: center | space-between | space-around | space-evenly |
    flex-start | flex-end;
  align-items: center | flex-start | flex-end | stretch | baseline;
  flex-wrap: wrap | nowrap | wrap-reverse;
  gap: 20px; /* Современная замена margin */
}
```

**flex-direction:**

- `row` — горизонтально (по умолчанию)
- `column` — вертикально
- `row-reverse` — горизонтально, обратный порядок
- `column-reverse` — вертикально, обратный порядок

**justify-content** — выравнивание по главной оси:

- `flex-start` — к началу
- `flex-end` — к концу
- `center` — по центру
- `space-between` — равномерно, первый и последний прижаты к краям
- `space-around` — равномерно с отступами вокруг
- `space-evenly` — равномерно с одинаковыми отступами

**align-items** — выравнивание по поперечной оси:

- `stretch` — растягиваются (по умолчанию)
- `flex-start` — к началу
- `flex-end` — к концу
- `center` — по центру
- `baseline` — по базовой линии текста

**flex-wrap:**

- `nowrap` — не переносится (по умолчанию)
- `wrap` — переносится на новую строку
- `wrap-reverse` — переносится в обратном порядке

### Основные свойства элемента

```css
.item {
  flex-grow: 0 | 1 | …; /* Делит свободное пространство */
  flex-shrink: 1 | 0; /* Определяет, как элемент сжимается */
  flex-basis: auto | ...; /* Базовая ширина */
  align-self: …; /* Переопределяет align-items */
  order: …; /* Порядок отображения */
}
```

**flex-grow:**

Определяет, как элемент будет расти, если есть свободное пространство.

```css
.item-1 {
  flex-grow: 1; /* Займёт 1 часть свободного пространства */
}

.item-2 {
  flex-grow: 2; /* Займёт 2 части свободного пространства */
}
```

**flex-shrink:**

Определяет, как элемент будет сжиматься, если не хватает места.

```css
.item {
  flex-shrink: 0; /* Не сжимается */
  flex-shrink: 1; /* Сжимается (по умолчанию) */
}
```

**flex-basis:**

Базовая ширина (или высота в column-направлении) элемента до распределения свободного пространства.

```css
.item {
  flex-basis: 200px; /* Базовая ширина 200px */
  flex-basis: auto; /* Автоматически (по умолчанию) */
  flex-basis: 0; /* Минимальная базовая ширина */
}
```

**Сокращение:**

```css
.item {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  flex: 0 1 auto; /* По умолчанию */
  flex: 1 0 200px; /* grow: 1, shrink: 0, basis: 200px */
}
```

**align-self:**

Переопределяет align-items для конкретного элемента.

```css
.item {
  align-self: flex-end; /* Этот элемент внизу, остальные по центру */
}
```

**order:**

Изменяет порядок отображения элементов.

```css
.item-1 {
  order: 2; /* Будет вторым */
}

.item-2 {
  order: 1; /* Будет первым */
}
```

### Как это работает?

Flexbox сначала распределяет пространство по одной оси (основной), затем по другой (вторичной).

**Главная ось vs Поперечная ось:**

- При `flex-direction: row`: главная = горизонтальная, поперечная = вертикальная
- При `flex-direction: column`: главная = вертикальная, поперечная = горизонтальная

### Примеры использования

**Равномерное распределение:**

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

**Центрирование:**

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

**Адаптивная навигация:**

```css
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

**Карточки с равной высотой:**

```css
.cards {
  display: flex;
  gap: 20px;
}

.card {
  flex: 1; /* Все карточки равной ширины */
}
```

**Когда использовать Flexbox:**

- меню и навигация
- header/footer
- горизонтальные списки
- простые карточки
- центровка
- одномерные макеты

---

## 15.2. CSS Grid: современная раскладка

Grid — это двумерный инструмент: строки + колонки. Если Flex — линейка, то Grid — арочная система строительства.

### Основные свойства контейнера

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px; /* Или gap: 20px */
}
```

**grid-template-columns:**

```css
.container {
  /* Фиксированные колонки */
  grid-template-columns: 200px 200px 200px;

  /* Фракции (fr) */
  grid-template-columns: 1fr 2fr 1fr; /* 1:2:1 */

  /* Повторение */
  grid-template-columns: repeat(3, 1fr); /* 3 равные колонки */

  /* Автоматическая адаптивность */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

**fr** — это «фракция свободного пространства». 1fr = одна часть доступного пространства.

**grid-template-rows:**

Аналогично columns, но для строк.

```css
.container {
  grid-template-rows: 100px auto 100px; /* Фиксированная шапка и футер */
}
```

**gap:**

Современная замена margin'ам между элементами. Работает и в Flexbox!

```css
.container {
  gap: 20px; /* Отступ между всеми элементами */
  row-gap: 20px; /* Только между строками */
  column-gap: 20px; /* Только между колонками */
}
```

### Размещение элементов

**По умолчанию:**

Grid автоматически размещает элементы слева направо, сверху вниз.

**Явное размещение:**

```css
.item {
  grid-column: 1 / 3; /* От колонки 1 до 3 */
  grid-row: 1 / 2; /* От строки 1 до 2 */
}

/* Или сокращённо */
.item {
  grid-column: span 2; /* Занимает 2 колонки */
  grid-row: span 1; /* Занимает 1 строку */
}
```

**Именованные линии:**

```css
.container {
  grid-template-columns: [start] 1fr [middle] 1fr [end];
}

.item {
  grid-column: start / end; /* От start до end */
}
```

### Grid Areas

Мощный инструмент для создания сложных макетов.

```css
.container {
  grid-template-areas:
    'header header'
    'sidebar main'
    'footer footer';
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}
```

**Авторазмещение:**

```css
.container {
  grid-auto-flow: dense; /* Заполняет пустые ячейки */
}
```

### Выравнивание в Grid

Grid даёт больше возможностей:

```css
.container {
  align-items: start | end | center | stretch;
  justify-items: start | end | center | stretch;
  place-items: center; /* align-items + justify-items */
  align-content: start | end | center | space-between;
  justify-content: start | end | center | space-between;
  place-content: center; /* align-content + justify-content */
}
```

**Для элементов:**

```css
.item {
  align-self: center;
  justify-self: center;
  place-self: center; /* align-self + justify-self */
}
```

### Адаптивная сетка

**auto-fit и auto-fill:**

```css
.container {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

- `auto-fit` — создаёт столько колонок, сколько помещается, растягивает их
- `auto-fill` — создаёт столько колонок, сколько помещается, оставляет пустые

**minmax:**

```css
.container {
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  /* Минимум 200px, максимум 1fr */
}
```

### Когда Flex, когда Grid?

**Один ряд/колонка** → Flexbox

**Две оси, сетка** → Grid

**Равномерное распределение** → Flex

**Макет страницы** → Grid

**Когда использовать Grid:**

- сложные массовые сетки
- страницы каталога
- галереи
- адаптивные макеты
- формы/панели/таблицы
- сложные layout'ы

Grid способен заменить Bootstrap/12-column system без фреймворков.

---

## 15.3. Типичные ошибки

### Flexbox

**1. Забыли flex-wrap:**

```css
/* Плохо */
.container {
  display: flex;
  /* Элементы не переносятся */
}

/* Хорошо */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
```

**2. Неправильное использование flex-grow:**

```css
/* Плохо */
.item {
  flex-grow: 10; /* Избыточно */
}

/* Хорошо */
.item {
  flex-grow: 1; /* Достаточно */
}
```

**3. Игнорирование flex-basis:**

```css
/* Плохо */
.item {
  flex: 1; /* Может быть слишком маленьким */
}

/* Хорошо */
.item {
  flex: 1 1 200px; /* Минимум 200px */
}
```

### Grid

**1. Слишком сложные grid-template:**

```css
/* Плохо */
.container {
  grid-template-columns: 100px 1fr 200px 1fr 100px;
  /* Сложно поддерживать */
}

/* Хорошо */
.container {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* Адаптивно и просто */
}
```

**2. Забыли gap:**

```css
/* Плохо */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Нет отступов между элементами */
}

/* Хорошо */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

---

## Вопросы на собеседовании

### 1. Как работает Flexbox?

Одномерная система распределения пространства. Сначала по главной оси, затем по поперечной.

### 2. Как работает Grid?

Двумерная система: строки + колонки. Позволяет создавать сложные макеты.

### 3. В чём разница justify-content и align-items?

- justify-content — выравнивание по главной оси
- align-items — выравнивание по поперечной оси

### 4. Чем Grid отличается от Flexbox?

Flex — одномерная система (одна ось). Grid — двухмерная (строки + колонки).

### 5. Что такое fr в Grid?

Фракция свободного пространства. 1fr = одна часть доступного пространства.

### 6. Когда grid-template-columns: 1fr 1fr 1fr имеет смысл?

Когда нужно равномерно поделить пространство между тремя колонками.

### 7. Как сделать карточки, которые автоматически перестраиваются в зависимости от ширины контейнера?

Grid с auto-fit/auto-fill:

```css
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
```

### 8. Что делает flex: 1?

Сокращение для flex-grow: 1, flex-shrink: 1, flex-basis: 0%. Элемент растёт и сжимается, занимая доступное пространство.

### 9. Что такое gap?

Современное свойство для отступов между элементами в Grid и Flexbox. Заменяет margin между элементами.

---

## Key Takeaways

- Flexbox идеален для одномерных макетов, Grid — для двухмерных
- justify-content и align-items работают по разным осям
- gap — современная замена margin'ам между элементами
- auto-fit/auto-fill делают Grid адаптивным автоматически
- Grid Areas упрощают создание сложных layout'ов
- flex: 1 — мощный инструмент для равномерного распределения
- Grid и Flex делают фреймворки вроде Bootstrap практически ненужными

