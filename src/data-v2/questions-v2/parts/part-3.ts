import type { QuizQuestion } from '@/shared/types/quiz.types'

export const part3Questions: QuizQuestion[] = [
  {
    id: 'q-v2-3-1',
    type: 'single',
    question: 'Что такое семантическая вёрстка?',
    answers: [
      {
        id: 'a-v2-3-1-1',
        text: 'Использование HTML-тегов по смыслу (роль и назначение), а не только ради внешнего вида',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-1-2',
        text: 'Разметка, где все элементы имеют CSS-классы с “говорящими” именами для поддержки',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-1-3',
        text: 'Подход, при котором структуру страницы задают только CSS-стили, а HTML остаётся минимальным',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-1-4',
        text: 'Разметка, где все интерактивные элементы реализованы через JavaScript для одинакового поведения',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-10',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-3-2',
    type: 'single',
    question: 'Почему семантика HTML важна?',
    answers: [
      {
        id: 'a-v2-3-2-1',
        text: 'Она улучшает доступность, SEO, структурность и даёт нативное поведение элементов “из коробки”',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-2-2',
        text: 'Она нужна только для SEO, а для доступности достаточно добавить ARIA-атрибуты на div',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-2-3',
        text: 'Она ускоряет сеть (TTFB), потому что браузер быстрее скачивает семантические теги, чем div',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-2-4',
        text: 'Она важна только в SSR: в SPA семантика не влияет на поведение и индексацию',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-10',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-3-3',
    type: 'single',
    question: 'Для чего нужны `<section>` и `<article>`?',
    answers: [
      {
        id: 'a-v2-3-3-1',
        text: '`<section>` — смысловой раздел страницы, `<article>` — автономный самодостаточный блок контента (пост/новость/запись)',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-3-2',
        text: '`<section>` — контейнер только для навигации, `<article>` — контейнер только для медиа (картинки/видео)',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-3-3',
        text: '`<section>` — для списка ссылок, `<article>` — для формы с данными пользователя',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-3-4',
        text: '`<section>` и `<article>` полностью эквивалентны, разница только в стилях браузера по умолчанию',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-10',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-3-4',
    type: 'single',
    question: 'Как правильно структурировать заголовки h1–h6?',
    answers: [
      {
        id: 'a-v2-3-4-1',
        text: 'Один `h1` на страницу и иерархия без пропусков уровней (h1 → h2 → h3 …)',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-4-2',
        text: 'Можно свободно “прыгать” по уровням, главное — чтобы визуально заголовки были разного размера',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-4-3',
        text: 'Лучше использовать только `h1` и `h2`, а остальные уровни делать `div` + CSS',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-4-4',
        text: 'В SEO важны только `h1` и `h3`, поэтому `h2` обычно пропускают',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-10',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-3-5',
    type: 'single',
    question: 'Почему `alt` у изображений важен для SEO и доступности?',
    answers: [
      {
        id: 'a-v2-3-5-1',
        text: 'Он помогает screen readers понять содержание изображения и даёт поисковикам контекст для индексирования',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-5-2',
        text: 'Он ускоряет загрузку изображения, потому что браузер может закэшировать картинку по alt-тексту',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-5-3',
        text: 'Он заменяет мета-тег description, поэтому поисковики берут описание страницы из alt',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-5-4',
        text: 'Он нужен только для fallback при ошибке сети, а для SEO и доступности не используется',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-10',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-3-6',
    type: 'single',
    question:
      'Чем `<button>` отличается от `<div onclick>` с точки зрения UX и доступности?',
    answers: [
      {
        id: 'a-v2-3-6-1',
        text: '`<button>` имеет нативное поведение (фокус, Enter/Space) и понятен ассистивным технологиям; `div onclick` требует ручной реализации',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-6-2',
        text: '`div onclick` быстрее по производительности, потому что не создаёт нативных обработчиков и не влияет на таб-порядок',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-6-3',
        text: '`<button>` предназначен только для отправки форм, а для UI-кнопок по стандарту используют `div`',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-6-4',
        text: 'Разницы почти нет: screen reader и клавиатура одинаково работают с `div` и `button` без дополнительных настроек',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-10',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-3-7',
    type: 'single',
    question: 'Когда нужна ARIA (в минимальном понимании для фронтенда)?',
    answers: [
      {
        id: 'a-v2-3-7-1',
        text: 'Когда нативной семантики недостаточно: кастомные компоненты или нужно сообщить состояние (expanded/selected) ассистивным технологиям',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-7-2',
        text: 'Всегда: любые элементы интерфейса должны иметь ARIA, иначе screen reader не сможет прочитать страницу',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-7-3',
        text: 'Только в формах: ARIA относится к input/label и не нужна для навигации и кнопок',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-7-4',
        text: 'Только для SEO: ARIA — это подсказки для поисковых роботов, а не для доступности',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-11',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-3-8',
    type: 'single',
    question: 'Почему `<button>` обычно лучше, чем `<div role="button">`?',
    answers: [
      {
        id: 'a-v2-3-8-1',
        text: '`<button>` из коробки фокусируется и активируется с клавиатуры; `div role="button"` требует ручной фокусировки и обработки клавиш',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-8-2',
        text: '`div role="button"` автоматически наследует всю клавиатурную поддержку от ARIA-ролей без дополнительного кода',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-8-3',
        text: '`<button>` хуже для доступности, потому что screen reader озвучивает его “слишком подробно”',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-8-4',
        text: '`div role="button"` безопаснее, потому что не допускает отправку форм и не имеет дефолтных действий',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-11',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-3-9',
    type: 'single',
    question: 'Что важно в модальном окне с точки зрения доступности?',
    answers: [
      {
        id: 'a-v2-3-9-1',
        text: 'Перевести фокус внутрь при открытии, удерживать фокус внутри (focus trap) и вернуть фокус туда, где был пользователь, при закрытии',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-9-2',
        text: 'Спрятать модалку от screen reader, чтобы он читал только фон, и отключить tab-навигацию до закрытия',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-9-3',
        text: 'Сделать модалку `position: fixed`, тогда фокус всегда останется внутри автоматически',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-9-4',
        text: 'Убрать outline у всех элементов внутри модалки, чтобы интерфейс выглядел аккуратнее',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-11',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-3-10',
    type: 'single',
    question: 'Зачем `label` в формах?',
    answers: [
      {
        id: 'a-v2-3-10-1',
        text: 'Даёт полю понятное имя, улучшает UX (клик по тексту фокусирует поле) и помогает доступности и автозаполнению',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-10-2',
        text: 'Нужен только для визуального дизайна: screen reader берёт название поля из placeholder',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-10-3',
        text: 'Нужен только для валидации: без label браузер не сможет проверить required/pattern',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-10-4',
        text: 'Необязателен, если есть `aria-label`: это полностью заменяет все UX-плюсы label',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-12',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-3-11',
    type: 'single',
    question: 'Когда достаточно HTML5-валидации, а когда нужна кастомная?',
    answers: [
      {
        id: 'a-v2-3-11-1',
        text: 'HTML5 часто хватает для required/type/длины/диапазона; кастомная нужна для бизнес-логики и единого формата сообщений',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-11-2',
        text: 'HTML5-валидация нужна только для доступности, а проверку корректности всегда делают кастомной в JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-11-3',
        text: 'Кастомная валидация нужна всегда, потому что нативная HTML5-валидация не работает в современных браузерах',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-11-4',
        text: 'HTML5-валидация применяется только на сервере, а на клиенте она не имеет смысла',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-12',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-3-12',
    type: 'single',
    question: 'Где должна быть “главная” валидация формы?',
    answers: [
      {
        id: 'a-v2-3-12-1',
        text: 'На сервере: клиентская валидация — для удобства, но клиенту доверять нельзя',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-12-2',
        text: 'На клиенте: если включить строгие pattern и required, сервер может не проверять повторно',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-12-3',
        text: 'В браузере: нативная HTML5-валидация гарантирует корректность и заменяет серверные проверки',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-12-4',
        text: 'В базе данных: ограничения схемы полностью заменяют валидацию на уровне API',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-12',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-3-13',
    type: 'single',
    question:
      'Как сделать ошибки в форме доступными для ассистивных технологий?',
    answers: [
      {
        id: 'a-v2-3-13-1',
        text: 'Связать текст ошибки с полем через aria-describedby, пометить поле aria-invalid и для динамики использовать aria-live/role="alert"',
        isCorrect: true,
      },
      {
        id: 'a-v2-3-13-2',
        text: 'Достаточно подсветить поле красной рамкой — screen reader сам поймёт, что это ошибка',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-13-3',
        text: 'Скрыть ошибку визуально и оставить только aria-hidden, чтобы не отвлекать пользователя',
        isCorrect: false,
      },
      {
        id: 'a-v2-3-13-4',
        text: 'Сделать ошибки только в заголовке формы: это улучшит доступность, потому что читалка прочитает верх страницы',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-12',
    partId: 'part-3',
    difficulty: 'hard',
  },
]
