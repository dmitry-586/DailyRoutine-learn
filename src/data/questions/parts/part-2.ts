import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части II. CSS
 */
export const part2Questions: QuizQuestion[] = [
  {
    id: 'q-2-1',
    type: 'single',
    question:
      'Вы верстаете дашборд: нужно разложить карточки по строкам и столбцам, чтобы элемент мог занимать сразу несколько ячеек (и по ширине, и по высоте). Какой инструмент CSS лучше всего подходит и почему?',
    answers: [
      {
        id: 'a-2-1-1',
        text: 'CSS Grid — двумерная раскладка: управляет строками и столбцами одновременно и позволяет “располагать по сетке”',
        isCorrect: true,
      },
      {
        id: 'a-2-1-3',
        text: 'CSS Grid нужен в основном для анимаций сетки (переходов между состояниями), а не для раскладки',
        isCorrect: false,
      },
      {
        id: 'a-2-1-2',
        text: 'Flexbox — двумерная раскладка, поэтому он лучше Grid подходит для сеток “строки × столбцы”',
        isCorrect: false,
      },
      {
        id: 'a-2-1-4',
        text: 'CSS Grid — это механизм кэширования стилей: он ускоряет CSSOM и снижает стоимость layout',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS Grid — 2D-модель раскладки: вы описываете строки/колонки и размещаете элементы по ячейкам (или диапазонам). Flexbox лучше решает 1D-задачи (ряд/колонка), но для “табличной” сетки с пересечениями (row+column) Grid обычно точнее и проще.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-2',
    type: 'single',
    question:
      'В макете есть и “полоски” (горизонтальные/вертикальные ряды), и полноценная сетка 3×N с контролем по двум осям. Какое утверждение точнее всего описывает разницу Flexbox и CSS Grid?',
    answers: [
      {
        id: 'a-2-2-4',
        text: 'Flexbox не умеет выравнивание и распределение пространства — за это отвечает только CSS Grid',
        isCorrect: false,
      },
      {
        id: 'a-2-2-1',
        text: 'Flexbox — одномерная раскладка (строка или столбец), Grid — двумерная (строки и столбцы одновременно)',
        isCorrect: true,
      },
      {
        id: 'a-2-2-2',
        text: 'Flexbox — двумерная раскладка (2D), а Grid — одномерная (1D): выбирайте Grid только для рядов',
        isCorrect: false,
      },
      {
        id: 'a-2-2-3',
        text: 'Grid не подходит для адаптивных сеток: он всегда требует фиксированного числа колонок и не умеет auto-fit/minmax',
        isCorrect: false,
      },
    ],
    explanation:
      'Ключ — модель раскладки. Flexbox оптимален, когда вы раскладываете элементы вдоль одной оси (ряд или колонка) и “договариваетесь” про выравнивание/перенос. Grid удобнее, когда вы хотите управлять раскладкой сразу по двум осям: строки и столбцы, области, явное размещение элементов.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-3',
    type: 'multiple',
    question:
      'В проекте хочется вложенность, миксины и переменные “на этапе сборки”, до того как CSS попадёт в браузер. Какие инструменты относятся к CSS-препроцессорам?',
    answers: [
      {
        id: 'a-2-3-1',
        text: 'Sass/SCSS',
        isCorrect: true,
      },
      {
        id: 'a-2-3-2',
        text: 'Less',
        isCorrect: true,
      },
      {
        id: 'a-2-3-4',
        text: 'PostCSS',
        isCorrect: false,
      },
      {
        id: 'a-2-3-3',
        text: 'Stylus',
        isCorrect: true,
      },
    ],
    explanation:
      'Sass/SCSS, Less и Stylus — препроцессоры: они расширяют синтаксис и компилируются в CSS. PostCSS чаще выступает как “постобработка” CSS через плагины (autoprefixer, минификация и т.п.), а не как язык-препроцессор.',
    chapterId: 'chapter-2-3',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-4',
    type: 'single',
    question:
      'На сайте есть переключатель темы (light/dark), и вы хотите менять значения цветов без пересборки CSS, прямо в runtime. Какой механизм CSS для этого предназначен?',
    answers: [
      {
        id: 'a-2-4-1',
        text: 'CSS Custom Properties: значения в runtime, которые участвуют в каскаде и могут переопределяться на любом уровне',
        isCorrect: true,
      },
      {
        id: 'a-2-4-3',
        text: 'Механизм импорта переменных из JavaScript в CSS без изменения DOM/inline-стилей',
        isCorrect: false,
      },
      {
        id: 'a-2-4-2',
        text: 'Возможность “создавать свои CSS-свойства”, которые браузер начнёт понимать как новые нативные свойства',
        isCorrect: false,
      },
      {
        id: 'a-2-4-4',
        text: 'Способ оптимизации CSS: переменные всегда уменьшают размер итогового файла и ускоряют загрузку',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS Custom Properties (например, `--color-bg`) существуют в runtime: наследуются, переопределяются в дереве DOM и участвуют в каскаде. Это делает их удобными для темизации и динамических настроек (в отличие от переменных препроцессоров, которые исчезают после сборки).',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-5',
    type: 'single',
    question:
      'В большой кодовой базе стили часто конфликтуют (одинаковые имена классов в разных компонентах). Какой подход решает это за счёт изоляции классов на уровне модуля?',
    answers: [
      {
        id: 'a-2-5-3',
        text: 'Способ объединения нескольких CSS-файлов в один',
        isCorrect: false,
      },
      {
        id: 'a-2-5-4',
        text: 'Механизм для автоматической генерации CSS из JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-2-5-1',
        text: 'CSS Modules: локальные классы превращаются в уникальные имена при сборке, снижая риск конфликтов',
        isCorrect: true,
      },
      {
        id: 'a-2-5-2',
        text: 'Библиотека для создания CSS-анимаций',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS Modules — это фича сборки: классы в файле становятся “локальными” и получают уникальные имена. В результате `.button` в двух компонентах не конфликтуют, а стили проще сопровождать.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-6',
    type: 'multiple',
    question:
      'Команда выбирает CSS-in-JS (например, styled-components/Emotion) для дизайн-системы в React. Какие пункты действительно относятся к типичным преимуществам этого подхода?',
    answers: [
      {
        id: 'a-2-6-1',
        text: 'Динамические стили на основе пропсов и состояния',
        isCorrect: true,
      },
      {
        id: 'a-2-6-2',
        text: 'Автоматическая изоляция стилей',
        isCorrect: true,
      },
      {
        id: 'a-2-6-5',
        text: 'Улучшение производительности рендеринга',
        isCorrect: false,
      },
      {
        id: 'a-2-6-3',
        text: 'Использование переменных JavaScript в стилях',
        isCorrect: true,
      },
      {
        id: 'a-2-6-4',
        text: 'Колокация: стили живут рядом с компонентом, проще темизация/переиспользование и поддержка в UI-библиотеке',
        isCorrect: true,
      },
    ],
    explanation:
      'Плюсы CSS-in-JS обычно в DX и модульности: динамика по пропсам, изоляция, темизация и “стили рядом с компонентом”. Но это не гарантирует прирост производительности: некоторые реализации добавляют runtime-стоимость (генерация/инъекция CSS), поэтому подход выбирают осознанно.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-7',
    type: 'single',
    question:
      'Вы задали блоку `width: 320px` и добавили `padding: 20px` и `border: 2px solid`. В каком режиме box model итоговая ширина останется 320px, и что вообще контролирует `box-sizing`?',
    answers: [
      {
        id: 'a-2-7-1',
        text: 'content-box — width задаёт только content, padding/border добавляются; border-box — width включает padding и border',
        isCorrect: true,
      },
      {
        id: 'a-2-7-4',
        text: 'border-box отличается тем, что width начинает включать ещё и margin (поэтому элементы “не вылезают”)',
        isCorrect: false,
      },
      {
        id: 'a-2-7-2',
        text: 'content-box — для старых браузеров, border-box — для новых',
        isCorrect: false,
      },
      {
        id: 'a-2-7-3',
        text: 'content-box — для блочных элементов, border-box — для инлайн-элементов',
        isCorrect: false,
      },
    ],
    explanation:
      '`box-sizing` определяет, что именно входит в `width/height`. При `content-box` padding/border увеличивают итоговый размер, при `border-box` — “впитываются” внутрь заданной ширины. Поэтому `border-box` делает размеры предсказуемыми.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-8',
    type: 'single',
    question:
      'У вас два правила попадают на один элемент, и нужно понять, какое победит. Как в CSS вычисляется специфичность селектора (в упрощённой шкале), и что реально суммируется?',
    answers: [
      {
        id: 'a-2-8-1',
        text: 'inline-style = 1000, #id = 100, .class = 10, tag = 1. Суммируются все части селектора',
        isCorrect: true,
      },
      {
        id: 'a-2-8-3',
        text: 'Специфичность определяется порядком в CSS-файле',
        isCorrect: false,
      },
      {
        id: 'a-2-8-4',
        text: 'Специфичность всегда одинакова для всех селекторов',
        isCorrect: false,
      },
      {
        id: 'a-2-8-2',
        text: 'Специфичность зависит только от количества селекторов',
        isCorrect: false,
      },
    ],
    explanation:
      'Специфичность — это “вес” селектора: inline (1000), id (100), class/атрибут/псевдокласс (10), тег/псевдоэлемент (1). Вес — это сумма всех частей селектора; порядок в файле работает только как тайбрейкер при равном весе.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-9',
    type: 'multiple',
    question:
      'Внутри `<div>` лежит `<span>`, и вы не задавали никаких стилей для `<span>`. Какие из перечисленных свойств обычно наследуются потомками по умолчанию?',
    answers: [
      {
        id: 'a-2-9-6',
        text: 'border',
        isCorrect: false,
      },
      {
        id: 'a-2-9-3',
        text: 'line-height',
        isCorrect: true,
      },
      {
        id: 'a-2-9-1',
        text: 'font-size',
        isCorrect: true,
      },
      {
        id: 'a-2-9-2',
        text: 'color',
        isCorrect: true,
      },
      {
        id: 'a-2-9-5',
        text: 'margin',
        isCorrect: false,
      },
      {
        id: 'a-2-9-4',
        text: 'padding',
        isCorrect: false,
      },
    ],
    explanation:
      'Наследуются в основном “текстовые” свойства (font-*, color, line-height и т.п.). Геометрия и оформление коробки (margin/padding/border/background/width/height) обычно не наследуются.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-10',
    type: 'single',
    question:
      'Нужно, чтобы элемент стоял “в строке” рядом с текстом, но при этом принимал `width/height`. Какое значение `display` решает это, и чем в целом отличаются `block`, `inline`, `inline-block`?',
    answers: [
      {
        id: 'a-2-10-2',
        text: 'block — для блочных элементов, inline — для текста, inline-block — для изображений',
        isCorrect: false,
      },
      {
        id: 'a-2-10-3',
        text: 'block — старый способ, inline — новый, inline-block — устаревший',
        isCorrect: false,
      },
      {
        id: 'a-2-10-4',
        text: 'inline-block эквивалентен inline: width/height всё равно игнорируются, меняется только способ переноса строк',
        isCorrect: false,
      },
      {
        id: 'a-2-10-1',
        text: 'block — занимает всю строку, inline — в строке без размеров, inline-block — в строке с размерами',
        isCorrect: true,
      },
    ],
    explanation:
      '`block` переносится на новую строку и принимает размеры. `inline` живёт в строке и игнорирует `width/height` (в классическом смысле). `inline-block` тоже живёт в строке, но умеет `width/height`, поэтому его часто выбирают для “инлайн-элемента с размерами”.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-11',
    type: 'single',
    question:
      'Вёрстка “поплыла”: элемент с `position: absolute` неожиданно позиционируется не там, где вы ожидали. Какое утверждение точнее всего описывает `relative/absolute/fixed/sticky`?',
    answers: [
      {
        id: 'a-2-11-4',
        text: 'relative — для текста, absolute — для изображений, fixed — для видео, sticky — для анимаций',
        isCorrect: false,
      },
      {
        id: 'a-2-11-1',
        text: 'relative — относительно своего места, absolute — относительно ближайшего positioned родителя, fixed — относительно viewport, sticky — комбинация relative и fixed',
        isCorrect: true,
      },
      {
        id: 'a-2-11-3',
        text: 'sticky работает как absolute: вы задаёте top/left, и элемент выпадает из потока до конца страницы',
        isCorrect: false,
      },
      {
        id: 'a-2-11-2',
        text: 'absolute всегда позиционируется относительно viewport, а fixed — относительно ближайшего родителя в DOM',
        isCorrect: false,
      },
    ],
    explanation:
      'Коротко: `relative` сдвигает элемент относительно его обычного места; `absolute` позиционирует относительно ближайшего “positioned” предка (если его нет — относительно корневого containing block); `fixed` — относительно viewport; `sticky` ведёт себя как `relative`, пока не “прилипнет” при скролле (если задан, например, `top`).',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-12',
    type: 'single',
    question:
      'Вы делаете модальное окно, но оно оказывается “под” хедером, хотя у модалки `z-index: 9999`. Какое утверждение про `z-index` ближе всего к реальности?',
    answers: [
      {
        id: 'a-2-12-2',
        text: 'Свойство для изменения размера элементов',
        isCorrect: false,
      },
      {
        id: 'a-2-12-3',
        text: 'Свойство для анимации элементов',
        isCorrect: false,
      },
      {
        id: 'a-2-12-1',
        text: 'Это порядок наложения в пределах stacking context; работает для позиционированных элементов и “внутри контекстов”',
        isCorrect: true,
      },
      {
        id: 'a-2-12-4',
        text: 'Свойство работает для всех элементов без ограничений',
        isCorrect: false,
      },
    ],
    explanation:
      '`z-index` управляет порядком наложения, но не “глобально”: он работает в рамках stacking context. Поэтому огромный `z-index` не спасёт, если модалка находится в другом контексте наложения или если у предка создан stacking context (например, из-за transform).',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-13',
    type: 'multiple',
    question:
      'Вы делаете flex-контейнер и хотите выравнивать элементы по главной оси, по поперечной оси и (в многострочном случае) управлять распределением строк. Какие свойства Flexbox для этого используются?',
    answers: [
      {
        id: 'a-2-13-3',
        text: 'align-self — для отдельного элемента',
        isCorrect: true,
      },
      {
        id: 'a-2-13-2',
        text: 'align-items — для поперечной оси',
        isCorrect: true,
      },
      {
        id: 'a-2-13-1',
        text: 'justify-content — для главной оси',
        isCorrect: true,
      },
      {
        id: 'a-2-13-5',
        text: 'position — для позиционирования',
        isCorrect: false,
      },
      {
        id: 'a-2-13-4',
        text: 'align-content — для многострочных контейнеров',
        isCorrect: true,
      },
    ],
    explanation:
      'justify-content выравнивает по главной оси, align-items по поперечной оси, align-self для отдельного элемента, align-content для многострочных flex-контейнеров.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-14',
    type: 'single',
    question:
      'В Grid-разметке вы хотите описать макет “словами” (header/sidebar/content/footer), а не координатами строк/колонок. Какой инструмент Grid для этого предназначен?',
    answers: [
      {
        id: 'a-2-14-2',
        text: 'Способ создания анимаций в Grid',
        isCorrect: false,
      },
      {
        id: 'a-2-14-4',
        text: 'Способ оптимизации производительности Grid',
        isCorrect: false,
      },
      {
        id: 'a-2-14-3',
        text: 'Механизм кэширования Grid-элементов',
        isCorrect: false,
      },
      {
        id: 'a-2-14-1',
        text: 'Способ именования областей сетки для визуального размещения элементов',
        isCorrect: true,
      },
    ],
    explanation:
      'grid-template-areas позволяет именовать области сетки и размещать элементы визуально, что делает код более читаемым и понятным.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-15',
    type: 'single',
    question:
      'Дизайн должен адаптироваться под разные размеры экрана и ориентацию устройства. Какой механизм CSS позволяет условно применять стили по характеристикам viewport/устройства?',
    answers: [
      {
        id: 'a-2-15-3',
        text: 'Механизм для работы с видео и аудио',
        isCorrect: false,
      },
      {
        id: 'a-2-15-1',
        text: 'Механизм для применения стилей в зависимости от характеристик устройства (ширина экрана, ориентация и т.д.)',
        isCorrect: true,
      },
      {
        id: 'a-2-15-2',
        text: 'Способ импорта медиа-файлов в CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-15-4',
        text: 'Способ оптимизации изображений',
        isCorrect: false,
      },
    ],
    explanation:
      'Media Queries позволяют применять стили в зависимости от характеристик устройства: ширина экрана, высота, ориентация, разрешение. Основа responsive design.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-16',
    type: 'single',
    question:
      'Вы хотите стилизовать состояние элемента (например, `:hover`) и “виртуальную часть” элемента (например, `::before`). Как различаются pseudo-classes и pseudo-elements?',
    answers: [
      {
        id: 'a-2-16-1',
        text: 'Pseudo-classes — состояния элементов (:hover, :focus), Pseudo-elements — части элементов (::before, ::after)',
        isCorrect: true,
      },
      {
        id: 'a-2-16-4',
        text: 'Pseudo-elements описывают состояния (:hover), а pseudo-classes добавляют виртуальные элементы (::before)',
        isCorrect: false,
      },
      {
        id: 'a-2-16-2',
        text: 'Оба используются только для анимаций',
        isCorrect: false,
      },
      {
        id: 'a-2-16-3',
        text: 'Pseudo-classes — для классов, Pseudo-elements — для элементов',
        isCorrect: false,
      },
    ],
    explanation:
      'Pseudo-classes (:hover, :focus, :first-child) — состояния элементов. Pseudo-elements (::before, ::after, ::first-line) — части элементов, которые можно стилизовать отдельно.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-17',
    type: 'single',
    question:
      'Два CSS-правила применяются к одному элементу и конфликтуют. Что такое каскад (cascade) и в каком порядке обычно решается “кто победит”?',
    answers: [
      {
        id: 'a-2-17-2',
        text: 'Каскад — это правило “кто позже подключён, тот и победил”; специфичность селекторов не учитывается',
        isCorrect: false,
      },
      {
        id: 'a-2-17-4',
        text: 'Каскад — это то же самое, что наследование: побеждает значение, пришедшее от родителя',
        isCorrect: false,
      },
      {
        id: 'a-2-17-1',
        text: 'Каскад решает конфликт по важности/происхождению, затем по специфичности селектора и только потом по порядку объявления',
        isCorrect: true,
      },
      {
        id: 'a-2-17-3',
        text: 'Каскад — это только порядок загрузки CSS-файлов; внутри одного файла конфликты не разрешаются',
        isCorrect: false,
      },
    ],
    explanation:
      'Упрощённо: сначала учитывается важность (например, `!important`), затем специфичность селектора, затем порядок в источнике (последнее правило побеждает при равном весе). На практике ещё важны origin/слои каскада, но для базового понимания хватает этой модели.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-18',
    type: 'single',
    question:
      'В пайплайне сборки вы хотите автоматически добавлять префиксы, минифицировать CSS и применять плагины для трансформаций. Какой инструмент чаще всего используют для этого?',
    answers: [
      {
        id: 'a-2-18-1',
        text: 'Инструмент для трансформации CSS с помощью плагинов (автопрефиксер, минификация и т.д.)',
        isCorrect: true,
      },
      {
        id: 'a-2-18-2',
        text: 'CSS-препроцессор как Sass или Less',
        isCorrect: false,
      },
      {
        id: 'a-2-18-4',
        text: 'Способ импорта CSS в JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-2-18-3',
        text: 'Библиотека для работы с CSS-анимациями',
        isCorrect: false,
      },
    ],
    explanation:
      'PostCSS — это инструмент для трансформации CSS через плагины: автопрефиксер, минификация, поддержка новых стандартов, линтеры. Это не препроцессор, а постпроцессор.',
    chapterId: 'chapter-2-3',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-19',
    type: 'single',
    question:
      'В команде договорились о понятном и масштабируемом именовании классов, чтобы по одному имени было ясно “что это и где оно живёт”. Как называется методология Block–Element–Modifier?',
    answers: [
      {
        id: 'a-2-19-3',
        text: 'Способ минификации CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-19-2',
        text: 'Библиотека для работы с CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-19-4',
        text: 'Механизм для автоматической генерации CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-19-1',
        text: 'Методология именования CSS-классов для создания понятной и масштабируемой структуры',
        isCorrect: true,
      },
    ],
    explanation:
      'BEM — методология: Block (блок), Element (элемент), Modifier (модификатор). Пример: .button, .button__icon, .button--primary. Улучшает читаемость и поддерживаемость.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-20',
    type: 'multiple',
    question:
      'Нужно сделать анимации: простые переходы при смене состояния и более сложные сценарии с ключевыми кадрами. Какие CSS-инструменты для этого используются?',
    answers: [
      {
        id: 'a-2-20-1',
        text: 'transition — для плавных переходов',
        isCorrect: true,
      },
      {
        id: 'a-2-20-5',
        text: 'position — для позиционирования',
        isCorrect: false,
      },
      {
        id: 'a-2-20-3',
        text: '@keyframes — для определения ключевых кадров',
        isCorrect: true,
      },
      {
        id: 'a-2-20-4',
        text: 'transform — для трансформаций элементов',
        isCorrect: true,
      },
      {
        id: 'a-2-20-2',
        text: 'animation — для сложных анимаций',
        isCorrect: true,
      },
    ],
    explanation:
      'transition для простых переходов, animation + @keyframes для сложных анимаций, transform для трансформаций (translate, rotate, scale). transform работает на GPU и эффективен.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-21',
    type: 'single',
    question:
      'Почему `transform` и `opacity` обычно дают более “дешёвые” и плавные анимации, чем изменения `top/left`?',
    answers: [
      {
        id: 'a-2-21-4',
        text: 'Потому что transform/opacity полностью отключают пересчёт стилей (style recalculation) в браузере',
        isCorrect: false,
      },
      {
        id: 'a-2-21-2',
        text: 'Потому что transform и opacity увеличивают специфичность селекторов и браузер быстрее выбирает стили',
        isCorrect: false,
      },
      {
        id: 'a-2-21-1',
        text: 'transform и opacity обрабатываются на GPU в слое composite, не вызывая reflow/repaint',
        isCorrect: true,
      },
      {
        id: 'a-2-21-3',
        text: 'Потому что top/left всегда анимируются только через CPU и никогда не могут быть ускорены браузером',
        isCorrect: false,
      },
    ],
    explanation:
      'transform и opacity обрабатываются на GPU в слое composite, не вызывая reflow (layout) и repaint. Изменение top/left вызывает reflow, что намного медленнее.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-22',
    type: 'single',
    question:
      'В большом интерфейсе вы хотите ограничить область влияния изменений (layout/paint/style) внутри компонента, чтобы браузеру не приходилось пересчитывать всю страницу. Какое CSS-свойство для этого существует?',
    answers: [
      {
        id: 'a-2-22-2',
        text: 'Способ ограничения размера элементов',
        isCorrect: false,
      },
      {
        id: 'a-2-22-3',
        text: 'Механизм для кэширования CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-22-1',
        text: 'Механизм для изоляции изменений стилей внутри элемента, улучшающий производительность',
        isCorrect: true,
      },
      {
        id: 'a-2-22-4',
        text: 'Способ импорта CSS-модулей',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS Containment (contain property) изолирует изменения стилей внутри элемента, позволяя браузеру оптимизировать рендеринг и не пересчитывать весь layout при изменениях.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-23',
    type: 'single',
    question: 'Что такое CSS Container Queries?',
    answers: [
      {
        id: 'a-2-23-1',
        text: 'Механизм для применения стилей на основе размера контейнера, а не viewport',
        isCorrect: true,
      },
      {
        id: 'a-2-23-3',
        text: 'Механизм для работы с Docker-контейнерами',
        isCorrect: false,
      },
      {
        id: 'a-2-23-2',
        text: 'Способ запроса данных из контейнера',
        isCorrect: false,
      },
      {
        id: 'a-2-23-4',
        text: 'Способ оптимизации CSS-контейнеров',
        isCorrect: false,
      },
    ],
    explanation:
      'Container Queries позволяют применять стили на основе размера контейнера, а не viewport. Это решает проблемы компонентного дизайна, где компонент должен адаптироваться к своему контейнеру.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-24',
    type: 'single',
    question: 'Что такое margin collapsing в CSS?',
    answers: [
      {
        id: 'a-2-24-4',
        text: 'Механизм для оптимизации производительности',
        isCorrect: false,
      },
      {
        id: 'a-2-24-2',
        text: 'Механизм автоматического удаления margin у элементов',
        isCorrect: false,
      },
      {
        id: 'a-2-24-1',
        text: 'Явление, при котором вертикальные margin соседних элементов схлопываются в один больший margin',
        isCorrect: true,
      },
      {
        id: 'a-2-24-3',
        text: 'Способ объединения margin нескольких элементов в один',
        isCorrect: false,
      },
    ],
    explanation:
      'Margin collapsing — это поведение CSS, при котором вертикальные margin соседних элементов (или родителя и первого/последнего потомка) объединяются в один больший margin. Горизонтальные margin не схлопываются.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-25',
    type: 'single',
    question: 'Что означает единица измерения fr в CSS Grid?',
    answers: [
      {
        id: 'a-2-25-1',
        text: 'Фракция свободного пространства — единица для распределения доступного пространства',
        isCorrect: true,
      },
      {
        id: 'a-2-25-4',
        text: 'Единица для анимаций',
        isCorrect: false,
      },
      {
        id: 'a-2-25-2',
        text: 'Фиксированная единица, равная 1rem',
        isCorrect: false,
      },
      {
        id: 'a-2-25-3',
        text: 'Единица для размера шрифта',
        isCorrect: false,
      },
    ],
    explanation:
      'fr (fraction) — это единица CSS Grid, которая представляет долю свободного пространства. Например, grid-template-columns: 1fr 2fr создаст две колонки, где вторая будет в два раза шире первой.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-26',
    type: 'multiple',
    question: 'Какие свойства CSS Grid используются для размещения элементов?',
    answers: [
      {
        id: 'a-2-26-3',
        text: 'grid-area',
        isCorrect: true,
      },
      {
        id: 'a-2-26-1',
        text: 'grid-column-start / grid-column-end',
        isCorrect: true,
      },
      {
        id: 'a-2-26-5',
        text: 'position',
        isCorrect: false,
      },
      {
        id: 'a-2-26-4',
        text: 'grid-gap (или gap)',
        isCorrect: true,
      },
      {
        id: 'a-2-26-2',
        text: 'grid-row-start / grid-row-end',
        isCorrect: true,
      },
    ],
    explanation:
      'Для размещения элементов в Grid используются: grid-column-start/end, grid-row-start/end, grid-area (сокращение), grid-column/row (сокращения). gap задаёт расстояние между элементами.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-27',
    type: 'single',
    question: 'Что такое mobile-first подход в CSS?',
    answers: [
      {
        id: 'a-2-27-2',
        text: 'Базовые стили пишут под десктоп, а для мобильных добавляют правила через media queries с `max-width`',
        isCorrect: false,
      },
      {
        id: 'a-2-27-3',
        text: 'Стили пишут только для мобильных, а на больших экранах интерфейс “сам растянется” без дополнительных правил',
        isCorrect: false,
      },
      {
        id: 'a-2-27-1',
        text: 'Сначала пишут базовые стили для маленьких экранов, а затем добавляют улучшения для больших через `min-width`',
        isCorrect: true,
      },
      {
        id: 'a-2-27-4',
        text: 'Это только про оптимизацию ассетов на мобильных (картинки/JS), а порядок написания CSS не важен',
        isCorrect: false,
      },
    ],
    explanation:
      'Mobile-first — это стратегия, при которой базовые стили пишутся для мобильных устройств, а затем через media queries с min-width добавляются стили для больших экранов. Это эффективнее, чем desktop-first.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-28',
    type: 'single',
    question: 'Что делает функция clamp() в CSS?',
    answers: [
      {
        id: 'a-2-28-1',
        text: 'Ограничивает значение между минимальным и максимальным, с возможностью адаптивного масштабирования',
        isCorrect: true,
      },
      {
        id: 'a-2-28-4',
        text: 'Сжимает значение для экономии места',
        isCorrect: false,
      },
      {
        id: 'a-2-28-2',
        text: 'Округляет значение до ближайшего целого',
        isCorrect: false,
      },
      {
        id: 'a-2-28-3',
        text: 'Ограничивает значение только сверху',
        isCorrect: false,
      },
    ],
    explanation:
      'clamp(min, preferred, max) ограничивает значение между min и max, при этом preferred значение может быть адаптивным (например, 2vw). Пример: font-size: clamp(1rem, 2vw, 2rem) создаёт адаптивный размер шрифта.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-29',
    type: 'single',
    question:
      'В чём разница между grid-template-columns: repeat(3, 1fr) и repeat(auto-fit, minmax(200px, 1fr))?',
    answers: [
      {
        id: 'a-2-29-1',
        text: 'Первое создаёт 3 фиксированные колонки, второе автоматически создаёт столько колонок, сколько помещается, с минимальной шириной 200px',
        isCorrect: true,
      },
      {
        id: 'a-2-29-4',
        text: 'auto-fit/minmax — это просто более современная запись того же самого, что и repeat(3, 1fr); поведение одинаковое',
        isCorrect: false,
      },
      {
        id: 'a-2-29-2',
        text: 'repeat(auto-fit, minmax(200px, 1fr)) всегда создаёт ровно 3 колонки, но не уже 200px',
        isCorrect: false,
      },
      {
        id: 'a-2-29-3',
        text: 'auto-fit/minmax замедляет layout, потому что браузер пересчитывает количество колонок на каждом кадре (даже без анимаций)',
        isCorrect: false,
      },
    ],
    explanation:
      'repeat(3, 1fr) создаёт 3 равные колонки. repeat(auto-fit, minmax(200px, 1fr)) автоматически создаёт столько колонок, сколько помещается, каждая минимум 200px. Это мощный приём для адаптивных сеток без media queries.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-30',
    type: 'single',
    question: 'Что такое CSS Cascade Layers (@layer)?',
    answers: [
      {
        id: 'a-2-30-3',
        text: 'Механизм для работы с изображениями',
        isCorrect: false,
      },
      {
        id: 'a-2-30-4',
        text: 'Способ оптимизации CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-30-2',
        text: 'Способ создания слоёв для z-index',
        isCorrect: false,
      },
      {
        id: 'a-2-30-1',
        text: 'Механизм управления приоритетами стилей через уровни, независимо от порядка подключения файлов',
        isCorrect: true,
      },
    ],
    explanation:
      'Cascade Layers позволяют организовать стили в слои (reset, base, components, utilities) и управлять их приоритетом независимо от порядка объявления. Это решает проблемы конфликтов в больших проектах.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-31',
    type: 'single',
    question: 'Что такое селектор :has() в CSS?',
    answers: [
      {
        id: 'a-2-31-3',
        text: 'Селектор для работы с формами',
        isCorrect: false,
      },
      {
        id: 'a-2-31-4',
        text: 'Устаревший селектор, не рекомендуется к использованию',
        isCorrect: false,
      },
      {
        id: 'a-2-31-1',
        text: 'Родительский селектор, который позволяет стилизовать элемент в зависимости от наличия определённых потомков',
        isCorrect: true,
      },
      {
        id: 'a-2-31-2',
        text: 'Селектор для проверки наличия атрибутов',
        isCorrect: false,
      },
    ],
    explanation:
      ':has() — это родительский селектор, который позволяет стилизовать элемент на основе его содержимого. Пример: .card:has(.error) { border-color: red; } — выделит карточку, если внутри есть элемент с классом error.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-32',
    type: 'single',
    question:
      'Вы пишете “base/reset” стили и не хотите разгонять специфичность селекторов. В чём ключевая разница между `:is()` и `:where()`?',
    answers: [
      {
        id: 'a-2-32-3',
        text: '`:where()` отличается от `:is()` тем, что он всегда быстрее в разы, потому что браузер не считает специфичность',
        isCorrect: false,
      },
      {
        id: 'a-2-32-4',
        text: '` :where()` увеличивает специфичность селектора до 100, поэтому его используют, когда нужно “пробить” чужие стили',
        isCorrect: false,
      },
      {
        id: 'a-2-32-1',
        text: ':is() сохраняет специфичность селекторов, :where() имеет специфичность 0',
        isCorrect: true,
      },
      {
        id: 'a-2-32-2',
        text: ':is() для элементов, :where() для классов',
        isCorrect: false,
      },
    ],
    explanation:
      ':is() и :where() оба группируют селекторы, но :where() имеет специфичность 0, что делает его идеальным для сброса стилей. :is() сохраняет специфичность самого специфичного селектора в группе.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-33',
    type: 'single',
    question:
      'Вы делаете тему через `<html data-theme="dark">` и хотите переопределять цвета на уровне DOM без пересборки. Чем CSS Custom Properties принципиально отличаются от SCSS-переменных?',
    answers: [
      {
        id: 'a-2-33-3',
        text: 'SCSS-переменные можно менять из JavaScript через DOM, а CSS custom properties — нет, они “только в CSS”',
        isCorrect: false,
      },
      {
        id: 'a-2-33-4',
        text: 'CSS custom properties не наследуются, поэтому для темы их всегда нужно объявлять только в `:root`',
        isCorrect: false,
      },
      {
        id: 'a-2-33-2',
        text: 'CSS variables — это синтаксис препроцессора: без сборки `var()` в браузере не работает',
        isCorrect: false,
      },
      {
        id: 'a-2-33-1',
        text: 'CSS custom properties считаются в runtime, наследуются и участвуют в каскаде; SCSS‑переменные подставляются при сборке',
        isCorrect: true,
      },
    ],
    explanation:
      'CSS Custom Properties вычисляются во время выполнения, наследуются, могут изменяться через JavaScript и участвуют в каскаде. SCSS переменные подставляются при компиляции и исчезают в финальном CSS.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-34',
    type: 'single',
    question: 'Что такое Shadow DOM в контексте CSS?',
    answers: [
      {
        id: 'a-2-34-1',
        text: 'Механизм инкапсуляции DOM и CSS, который полностью изолирует стили компонента от внешних стилей',
        isCorrect: true,
      },
      {
        id: 'a-2-34-3',
        text: 'Механизм для работы с тёмной темой',
        isCorrect: false,
      },
      {
        id: 'a-2-34-2',
        text: 'Способ создания теней для элементов через box-shadow',
        isCorrect: false,
      },
      {
        id: 'a-2-34-4',
        text: 'Способ оптимизации CSS',
        isCorrect: false,
      },
    ],
    explanation:
      'Shadow DOM создаёт изолированное DOM-дерево внутри элемента, где стили не протекают наружу и наоборот. Используется в Web Components для полной изоляции компонентов.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-35',
    type: 'multiple',
    question: 'Какие преимущества даёт методология BEM?',
    answers: [
      {
        id: 'a-2-35-1',
        text: 'Предсказуемость селекторов',
        isCorrect: true,
      },
      {
        id: 'a-2-35-3',
        text: 'Упрощение поддержки в команде',
        isCorrect: true,
      },
      {
        id: 'a-2-35-2',
        text: 'Масштабируемость кода',
        isCorrect: true,
      },
      {
        id: 'a-2-35-4',
        text: 'Избежание конфликтов имён классов',
        isCorrect: true,
      },
      {
        id: 'a-2-35-5',
        text: 'Автоматическая оптимизация производительности',
        isCorrect: false,
      },
    ],
    explanation:
      'BEM даёт: предсказуемую структуру (block__element--modifier), масштабируемость, простоту поддержки, избежание конфликтов. Но не оптимизирует производительность автоматически.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-36',
    type: 'single',
    question: 'Что делает Autoprefixer в PostCSS?',
    answers: [
      {
        id: 'a-2-36-1',
        text: 'Автоматически добавляет вендорные префиксы (-webkit-, -moz-, -ms-) для поддержки старых браузеров',
        isCorrect: true,
      },
      {
        id: 'a-2-36-3',
        text: 'Оптимизирует селекторы',
        isCorrect: false,
      },
      {
        id: 'a-2-36-2',
        text: 'Удаляет префиксы из CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-36-4',
        text: 'Минифицирует CSS',
        isCorrect: false,
      },
    ],
    explanation:
      'Autoprefixer анализирует CSS и автоматически добавляет необходимые вендорные префиксы на основе данных о поддержке браузерами. Это избавляет от необходимости писать префиксы вручную.',
    chapterId: 'chapter-2-3',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-37',
    type: 'single',
    question: 'Что такое PurgeCSS и зачем он нужен?',
    answers: [
      {
        id: 'a-2-37-3',
        text: 'Механизм для удаления комментариев из CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-37-4',
        text: 'Способ оптимизации изображений',
        isCorrect: false,
      },
      {
        id: 'a-2-37-2',
        text: 'Инструмент для очистки кэша браузера',
        isCorrect: false,
      },
      {
        id: 'a-2-37-1',
        text: 'Инструмент для удаления неиспользуемого CSS из финального бандла, анализируя HTML/JSX файлы',
        isCorrect: true,
      },
    ],
    explanation:
      'PurgeCSS анализирует HTML/JSX файлы, находит используемые классы и удаляет неиспользуемые стили из CSS. Может уменьшить размер CSS на 70-90%, что критично для производительности.',
    chapterId: 'chapter-2-3',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-38',
    type: 'single',
    question: 'Что такое Critical CSS?',
    answers: [
      {
        id: 'a-2-38-1',
        text: 'Минимальный CSS, необходимый для рендера первого экрана (above-the-fold), который встраивается inline в HTML',
        isCorrect: true,
      },
      {
        id: 'a-2-38-3',
        text: 'CSS с высоким приоритетом через !important',
        isCorrect: false,
      },
      {
        id: 'a-2-38-2',
        text: 'CSS для критически важных элементов страницы',
        isCorrect: false,
      },
      {
        id: 'a-2-38-4',
        text: 'Способ минификации CSS',
        isCorrect: false,
      },
    ],
    explanation:
      'Critical CSS — это минимальный набор стилей для первого экрана, который встраивается прямо в <head> HTML. Остальной CSS загружается асинхронно. Это ускоряет First Contentful Paint (FCP).',
    chapterId: 'chapter-2-3',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-39',
    type: 'single',
    question: 'В чём разница между SCSS миксинами и функциями?',
    answers: [
      {
        id: 'a-2-39-1',
        text: 'Миксины возвращают CSS-код, функции возвращают значения для использования в свойствах',
        isCorrect: true,
      },
      {
        id: 'a-2-39-4',
        text: 'SCSS функции генерируют CSS-код, а миксины возвращают значения (числа/цвета) для подстановки в свойства',
        isCorrect: false,
      },
      {
        id: 'a-2-39-2',
        text: 'SCSS функции могут возвращать CSS-блоки, а миксины — только значения (цвет/число), поэтому функции более универсальны',
        isCorrect: false,
      },
      {
        id: 'a-2-39-3',
        text: 'Миксины для стилей, функции для JavaScript',
        isCorrect: false,
      },
    ],
    explanation:
      'Миксины (@mixin) генерируют CSS-код и включаются через @include. Функции (@function) возвращают значения и используются в свойствах. Пример функции: @function pxToRem($px) { @return $px / 16 * 1rem; }',
    chapterId: 'chapter-2-3',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-40',
    type: 'single',
    question: 'В чём разница между @use и @import в SCSS?',
    answers: [
      {
        id: 'a-2-40-4',
        text: '@import безопаснее, потому что изолирует namespace и предотвращает конфликты, а @use делает всё глобальным',
        isCorrect: false,
      },
      {
        id: 'a-2-40-3',
        text: '@use компилируется в отдельный CSS-файл на каждый модуль, поэтому итоговый CSS почти всегда дублируется',
        isCorrect: false,
      },
      {
        id: 'a-2-40-1',
        text: '@use изолирует пространство имён и предотвращает конфликты, @import создаёт глобальную область видимости',
        isCorrect: true,
      },
      {
        id: 'a-2-40-2',
        text: '@use для новых проектов, @import для старых',
        isCorrect: false,
      },
    ],
    explanation:
      '@use создаёт изолированное пространство имён для каждого модуля, предотвращая конфликты. @import создаёт глобальную область видимости, что может привести к конфликтам имён. @import считается устаревшим.',
    chapterId: 'chapter-2-3',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-41',
    type: 'single',
    question: 'Что такое flex-grow, flex-shrink и flex-basis?',
    answers: [
      {
        id: 'a-2-41-4',
        text: 'Параметры трансформаций: grow/shrink управляют `scale()`, а basis задаёт `transform-origin` перед анимацией',
        isCorrect: false,
      },
      {
        id: 'a-2-41-3',
        text: 'Это свойства Grid: они управляют ростом/сжатием треков, а `flex-basis` задаёт поведение `grid-template-areas`',
        isCorrect: false,
      },
      {
        id: 'a-2-41-1',
        text: 'flex-grow — доля свободного места, flex-shrink — сжатие при нехватке, flex-basis — базовый размер до распределения',
        isCorrect: true,
      },
      {
        id: 'a-2-41-2',
        text: 'Это свойства выравнивания: grow = `justify-content`, shrink = `align-items`, basis = `gap` (как “база” отступов)',
        isCorrect: false,
      },
    ],
    explanation:
      'flex-grow определяет, как элемент делит свободное пространство (0 = не растёт, 1+ = растёт). flex-shrink определяет сжатие (0 = не сжимается). flex-basis задаёт базовую ширину перед распределением пространства.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-42',
    type: 'single',
    question: 'Что такое display: none и visibility: hidden?',
    answers: [
      {
        id: 'a-2-42-1',
        text: 'display: none полностью удаляет элемент из потока и layout; visibility: hidden скрывает элемент, но он занимает место',
        isCorrect: true,
      },
      {
        id: 'a-2-42-4',
        text: 'Оба полностью одинаковы: элемент скрыт, место не занимает и события не обрабатывает',
        isCorrect: false,
      },
      {
        id: 'a-2-42-2',
        text: 'visibility: hidden убирает элемент из layout, а display: none оставляет место, но скрывает визуально',
        isCorrect: false,
      },
      {
        id: 'a-2-42-3',
        text: 'visibility: hidden безопаснее для доступности, потому что screen readers автоматически игнорируют элемент, а display: none — нет',
        isCorrect: false,
      },
    ],
    explanation:
      'display: none полностью исключает элемент из рендера, layout и событий. visibility: hidden скрывает элемент визуально, но он остаётся в layout и занимает место. opacity: 0 также скрывает, но элемент остаётся интерактивным.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-43',
    type: 'single',
    question: 'Что такое CSS-in-JS и какие библиотеки его реализуют?',
    answers: [
      {
        id: 'a-2-43-3',
        text: 'Механизм для работы с CSS-переменными',
        isCorrect: false,
      },
      {
        id: 'a-2-43-2',
        text: 'Способ импорта CSS в JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-2-43-4',
        text: 'Способ минификации CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-43-1',
        text: 'Подход, при котором стили описываются в JavaScript; библиотеки: styled-components, Emotion, JSS',
        isCorrect: true,
      },
    ],
    explanation:
      'CSS-in-JS — это подход, при котором стили пишутся в JavaScript. Популярные библиотеки: styled-components, Emotion, JSS, stitches. Плюсы: динамические стили, темизация. Минусы: runtime-нагрузка.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-44',
    type: 'single',
    question: 'Что такое rem и em в CSS?',
    answers: [
      {
        id: 'a-2-44-3',
        text: 'em всегда стабильнее rem, потому что не зависит от корневого размера и не “ломает” масштабирование',
        isCorrect: false,
      },
      {
        id: 'a-2-44-1',
        text: 'rem — относительно корневого элемента (html), em — относительно размера шрифта родителя',
        isCorrect: true,
      },
      {
        id: 'a-2-44-4',
        text: 'Разница только в поддержке браузеров: em устарел, rem — современный эквивалент с тем же поведением',
        isCorrect: false,
      },
      {
        id: 'a-2-44-2',
        text: 'em всегда считается от корневого размера (html), а rem — от размера шрифта текущего элемента',
        isCorrect: false,
      },
    ],
    explanation:
      'rem (root em) всегда относительно размера шрифта корневого элемента (html). em относительно размера шрифта родителя. rem предсказуемее, em может создавать каскадные эффекты. 1rem обычно = 16px по умолчанию.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-45',
    type: 'single',
    question: 'Что такое vw и vh единицы в CSS?',
    answers: [
      {
        id: 'a-2-45-4',
        text: 'vw и vh считаются от размеров родительского элемента, а не от окна браузера',
        isCorrect: false,
      },
      {
        id: 'a-2-45-1',
        text: 'vw — 1% ширины viewport, vh — 1% высоты viewport',
        isCorrect: true,
      },
      {
        id: 'a-2-45-3',
        text: 'vh рассчитывается как процент от ширины viewport, а vw — как процент от высоты viewport',
        isCorrect: false,
      },
      {
        id: 'a-2-45-2',
        text: 'vw для ширины элементов, vh для высоты',
        isCorrect: false,
      },
    ],
    explanation:
      'vw (viewport width) — 1% ширины окна браузера. vh (viewport height) — 1% высоты окна. 100vw = вся ширина, 100vh = вся высота. Полезны для адаптивных размеров, но могут вызывать горизонтальный скролл при использовании 100vw.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-46',
    type: 'single',
    question:
      'Почему глобальный reset вида * { box-sizing: border-box } считается хорошей практикой?',
    answers: [
      {
        id: 'a-2-46-2',
        text: 'Потому что border-box включает margin в итоговый размер элемента, и сетки перестают “расползаться”',
        isCorrect: false,
      },
      {
        id: 'a-2-46-1',
        text: 'Потому что заданные width/height включают padding и border, и расчёты размеров становятся предсказуемыми',
        isCorrect: true,
      },
      {
        id: 'a-2-46-3',
        text: 'Потому что border-box отключает коллапс margin между блоками и делает вертикальные отступы стабильными',
        isCorrect: false,
      },
      {
        id: 'a-2-46-4',
        text: 'Потому что без border-box flexbox и grid “ломаются”: проценты ширины считаются неверно и layout становится нестабильным',
        isCorrect: false,
      },
    ],
    explanation:
      'border-box делает ширину “как ожидают большинство”: заданная width включает padding и border. Это снижает количество багов в layout и упрощает поддержку.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-47',
    type: 'single',
    question:
      'Что сильнее влияет на победу правила в CSS, если правила из одного слоя и одинаковой важности: специфичность или порядок в файле?',
    answers: [
      {
        id: 'a-2-47-2',
        text: 'Всегда порядок в файле, специфичность не влияет',
        isCorrect: false,
      },
      {
        id: 'a-2-47-1',
        text: 'Специфичность; порядок важен только если специфичность одинаковая',
        isCorrect: true,
      },
      {
        id: 'a-2-47-3',
        text: '!important всегда проигрывает специфичности',
        isCorrect: false,
      },
      {
        id: 'a-2-47-4',
        text: 'Побеждает правило с более коротким селектором',
        isCorrect: false,
      },
    ],
    explanation:
      'Каскад: сначала важность (!important), затем специфичность, затем порядок. Порядок — только как тайбрейкер при равной специфичности.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-48',
    type: 'single',
    question: 'В чём практический смысл :where() по сравнению с :is()?',
    answers: [
      {
        id: 'a-2-48-1',
        text: ':where() имеет специфичность 0, поэтому удобно для reset/base правил без “гонки специфичности”',
        isCorrect: true,
      },
      {
        id: 'a-2-48-4',
        text: ':where() и :is() отличаются только поддержкой браузеров: в остальном специфичность и поведение у них одинаковые',
        isCorrect: false,
      },
      {
        id: 'a-2-48-2',
        text: ':where() работает только в Safari, а :is() — в Chrome',
        isCorrect: false,
      },
      {
        id: 'a-2-48-3',
        text: ':where() позволяет выбирать родителей как :has()',
        isCorrect: false,
      },
    ],
    explanation:
      ':is() сохраняет специфичность самой “тяжёлой” части. :where() всегда 0 — это часто спасает большие кодовые базы от бесконечных переопределений.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-49',
    type: 'single',
    question:
      'Почему :has() называют “родительским селектором”, и какой риск при его использовании в больших проектах?',
    answers: [
      {
        id: 'a-2-49-4',
        text: 'Он полностью заменяет JavaScript для интерактива, потому что реагирует на клики/скролл так же, как обработчики событий',
        isCorrect: false,
      },
      {
        id: 'a-2-49-2',
        text: 'Он выбирает родителей быстрее обычных селекторов, поэтому в больших проектах может даже улучшать производительность CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-49-3',
        text: 'Он “проставляет класс” на родителе в DOM, поэтому безопасен и не влияет на стоимость сопоставления селекторов',
        isCorrect: false,
      },
      {
        id: 'a-2-49-1',
        text: 'Он позволяет стилить элемент в зависимости от наличия/состояния потомков; риск — дорогие селекторы при массовом применении',
        isCorrect: true,
      },
    ],
    explanation:
      ':has() делает CSS “реактивнее”, но, как и любые сложные селекторы, может быть дорогим при массовом применении. Использовать точечно и профилировать, если есть сомнения.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-50',
    type: 'single',
    question:
      'Почему CSS custom properties (переменные) удобнее для темизации, чем SCSS-переменные?',
    answers: [
      {
        id: 'a-2-50-2',
        text: 'SCSS‑переменные можно менять в рантайме через JavaScript, а CSS‑переменные фиксируются после загрузки CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-50-3',
        text: 'CSS‑переменные автоматически минифицируют значения и поэтому почти всегда уменьшают размер бандла без дополнительных настроек',
        isCorrect: false,
      },
      {
        id: 'a-2-50-1',
        text: 'CSS‑переменные считаются в runtime и переопределяются по каскаду (например, через атрибут темы), а SCSS — только на этапе сборки',
        isCorrect: true,
      },
      {
        id: 'a-2-50-4',
        text: 'SCSS‑переменные участвуют в каскаде, а CSS‑переменные всегда глобальные и не могут быть переопределены локально',
        isCorrect: false,
      },
    ],
    explanation:
      'Runtime-наследование и переопределение в DOM позволяют делать темы без пересборки CSS. Это особенно полезно для design system и динамических режимов.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-51',
    type: 'single',
    question:
      'Что такое CSS Cascade Layers (@layer) и какую проблему больших проектов они решают?',
    answers: [
      {
        id: 'a-2-51-1',
        text: 'Это механизм управления приоритетом групп правил через слои; помогает избежать хаоса “порядок подключения файлов решает всё”',
        isCorrect: true,
      },
      {
        id: 'a-2-51-2',
        text: 'Это механизм GPU‑ускорения: слои композитинга задаются через `@layer`, и браузер меньше делает layout/paint',
        isCorrect: false,
      },
      {
        id: 'a-2-51-4',
        text: 'Это фича препроцессоров: `@layer` работает только в SCSS/LESS и не поддерживается нативно браузерами',
        isCorrect: false,
      },
      {
        id: 'a-2-51-3',
        text: 'Это замена media queries: порядок слоёв переключается автоматически в зависимости от ширины экрана',
        isCorrect: false,
      },
    ],
    explanation:
      '@layer добавляет “уровень” в каскад: вы можете заранее объявить порядок слоёв (reset/base/components/utilities) и сделать приоритеты предсказуемыми.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-52',
    type: 'single',
    question:
      'Почему 100vw иногда даёт горизонтальный скролл даже если “должно быть ровно по ширине экрана”?',
    answers: [
      {
        id: 'a-2-52-2',
        text: 'Потому что vw работает только в mobile Safari',
        isCorrect: false,
      },
      {
        id: 'a-2-52-3',
        text: 'Потому что vw всегда равен ширине body, а не viewport',
        isCorrect: false,
      },
      {
        id: 'a-2-52-4',
        text: 'Потому что vw запрещён с flexbox',
        isCorrect: false,
      },
      {
        id: 'a-2-52-1',
        text: 'Потому что vw может учитывать ширину полосы прокрутки, и элемент становится чуть шире видимой области',
        isCorrect: true,
      },
    ],
    explanation:
      'Частый собес-вопрос: 100vw ≠ 100% контейнера. Для полноэкранных блоков часто безопаснее использовать width: 100% или аккуратно работать с overflow.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-53',
    type: 'single',
    question:
      'Какое утверждение точнее про CSS Modules в плане изоляции стилей?',
    answers: [
      {
        id: 'a-2-53-2',
        text: 'CSS Modules изолируют стили на уровне браузера без сборщика (нативно)',
        isCorrect: false,
      },
      {
        id: 'a-2-53-1',
        text: 'CSS Modules обычно генерируют уникальные имена классов на этапе сборки, изолируя стили по компонентам',
        isCorrect: true,
      },
      {
        id: 'a-2-53-3',
        text: 'CSS Modules работают только если включить Shadow DOM',
        isCorrect: false,
      },
      {
        id: 'a-2-53-4',
        text: 'CSS Modules запрещают использовать глобальные стили вообще',
        isCorrect: false,
      },
    ],
    explanation:
      'Это фича сборщика: локальные классы становятся уникальными и не конфликтуют. Глобальные стили возможны через :global и соглашения.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'medium',
  },
]
