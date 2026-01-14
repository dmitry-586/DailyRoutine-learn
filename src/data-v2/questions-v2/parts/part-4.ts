import type { QuizQuestion } from '@/shared/types/quiz.types'

export const part4Questions: QuizQuestion[] = [
  {
    id: 'q-v2-4-1',
    type: 'single',
    question: 'Что такое бокс-модель в CSS?',
    answers: [
      {
        id: 'a-v2-4-1-1',
        text: 'Модель, в которой любой элемент рассматривается как коробка: content, padding, border и margin',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-1-2',
        text: 'Механизм, который определяет порядок применения правил только по специфичности селекторов',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-1-3',
        text: 'Алгоритм, который рассчитывает, как элементы перекрывают друг друга с помощью z-index',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-1-4',
        text: 'Набор правил, который управляет тем, как браузер строит DOM и CSSOM перед рендером',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-13',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-2',
    type: 'single',
    question: 'Что делает `box-sizing: border-box`?',
    answers: [
      {
        id: 'a-v2-4-2-1',
        text: 'Делает так, что `width`/`height` включают padding и border, упрощая расчёты размеров',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-2-2',
        text: 'Автоматически переносит строчные элементы на новую строку, если они не помещаются',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-2-3',
        text: 'Запрещает схлопывание вертикальных margin у соседних блочных элементов',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-2-4',
        text: 'Делает размеры элемента “резиновыми”, чтобы они зависели только от размера viewport',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-13',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-3',
    type: 'single',
    question: 'Как работает специфичность CSS-селекторов?',
    answers: [
      {
        id: 'a-v2-4-3-1',
        text: 'Inline-стили обычно приоритетнее, затем идут селекторы с `#id`, потом классы/атрибуты/псевдоклассы и затем теги/псевдоэлементы',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-3-2',
        text: 'Всегда побеждает правило, которое объявлено ниже в файле, независимо от селектора и контекста',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-3-3',
        text: 'Селекторы суммируются по длине: чем больше символов в селекторе, тем выше приоритет',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-3-4',
        text: 'На приоритет влияет только порядок подключения CSS-файлов, а конкретные селекторы не важны',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-13',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-4',
    type: 'single',
    question: 'Что такое каскадные слои (CSS Cascade Layers)?',
    answers: [
      {
        id: 'a-v2-4-4-1',
        text: 'Механизм управления приоритетами правил через слои (`@layer`), независимый от порядка самих правил внутри файлов',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-4-2',
        text: 'Способ хранить стили в отдельных файловых “слоях”, которые браузер подгружает по мере прокрутки',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-4-3',
        text: 'Синтаксис для описания уровней z-index, где каждый слой соответствует новому stacking context',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-4-4',
        text: 'Режим работы CSS, при котором все правила автоматически становятся `!important` внутри слоя',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-13',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-5',
    type: 'single',
    question: 'Какие свойства в CSS обычно наследуются?',
    answers: [
      {
        id: 'a-v2-4-5-1',
        text: 'В основном текстовые свойства: `color`, `font-size`, `font-family`, `line-height`, `text-align`',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-5-2',
        text: 'Почти все свойства layout: `margin`, `padding`, `border`, `width` и `height`',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-5-3',
        text: 'Только свойства позиционирования: `position`, `top/left`, `z-index`',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-5-4',
        text: 'Только свойства фона: `background`, `background-image`, `background-color`',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-13',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-6',
    type: 'single',
    question: 'Что такое margin collapsing?',
    answers: [
      {
        id: 'a-v2-4-6-1',
        text: 'Схлопывание вертикальных margin у соседних элементов (или у родителя и первого/последнего ребёнка) до большего значения',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-6-2',
        text: 'Уменьшение margin при нехватке места в flex-контейнере из-за `flex-shrink`',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-6-3',
        text: 'Автоматическое объединение соседних margin в один при `box-sizing: border-box`',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-6-4',
        text: 'Эффект, при котором горизонтальные margin строчных элементов полностью игнорируются',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-13',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-7',
    type: 'single',
    question: 'Когда уместно использовать `!important`?',
    answers: [
      {
        id: 'a-v2-4-7-1',
        text: 'В крайних случаях (например, переопределить стороннюю библиотеку или критический стиль), но не как обычную практику',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-7-2',
        text: 'Всегда для базовых стилей, чтобы избежать конфликтов при росте проекта',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-7-3',
        text: 'Только для `:hover`/`:focus`, потому что псевдоклассы иначе “проигрывают” обычным селекторам',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-7-4',
        text: 'Только внутри CSS Modules, иначе уникальные классы не будут применяться',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-13',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-8',
    type: 'single',
    question:
      'В чём разница между `static`, `relative`, `absolute`, `fixed` и `sticky`?',
    answers: [
      {
        id: 'a-v2-4-8-1',
        text: '`static` — поток; `relative` — смещение; `absolute` — вне потока (от positioned предка); `fixed` — вне потока (от viewport); `sticky` — “липкий” внутри контейнера',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-8-2',
        text: '`static` и `relative` выводят элемент из потока, а `absolute` и `fixed` сохраняют место в layout как обычно',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-8-3',
        text: '`sticky` всегда работает как `fixed`, поэтому “липкость” не зависит от родителя и границ скролл-контейнера',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-8-4',
        text: '`absolute` всегда позиционируется относительно viewport, а `fixed` — относительно ближайшего positioned предка',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-14',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-9',
    type: 'single',
    question: 'Чем `display: none` отличается от `visibility: hidden`?',
    answers: [
      {
        id: 'a-v2-4-9-1',
        text: '`display: none` убирает элемент из layout и потока, а `visibility: hidden` скрывает его, но место в layout остаётся',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-9-2',
        text: '`display: none` скрывает элемент визуально, но он продолжает участвовать в расчёте layout',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-9-3',
        text: '`visibility: hidden` скрывает элемент и удаляет его из DOM, поэтому обработчики событий перестают существовать',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-9-4',
        text: 'Они различаются только для SVG; в обычной вёрстке дают одинаковый эффект',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-14',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-10',
    type: 'single',
    question: 'Что такое контекст позиционирования для `position: absolute`?',
    answers: [
      {
        id: 'a-v2-4-10-1',
        text: 'Ближайший предок, у которого `position` не `static`; относительно него и вычисляются `top/right/bottom/left`',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-10-2',
        text: 'Всегда viewport: `absolute` никогда не позиционируется относительно родителя',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-10-3',
        text: 'Первый предок с `display: block`, потому что блочные элементы создают контекст позиционирования',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-10-4',
        text: 'Элемент, который имеет самый большой `z-index` среди соседей, так как он считается “контекстом”',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-14',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-11',
    type: 'single',
    question: 'Как работает `z-index`?',
    answers: [
      {
        id: 'a-v2-4-11-1',
        text: 'Он задаёт порядок наложения positioned-элементов и сравнивается в рамках одного stacking context (контекста наложения)',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-11-2',
        text: 'Он влияет на порядок элементов в DOM: чем выше `z-index`, тем ниже элемент окажется в HTML',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-11-3',
        text: 'Он работает для любых элементов всегда; `position` на работу `z-index` не влияет',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-11-4',
        text: 'Он нужен только для Flexbox и Grid, чтобы элементы правильно выстраивались в слоях',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-14',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-12',
    type: 'single',
    question: 'Чем `display: inline` отличается от `display: inline-block`?',
    answers: [
      {
        id: 'a-v2-4-12-1',
        text: '`inline` игнорирует `width/height` и вертикальные margin; `inline-block` остаётся в строке, но принимает размеры как блок',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-12-2',
        text: '`inline` всегда начинает новую строку, а `inline-block` не переносится даже при переполнении контейнера',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-12-3',
        text: '`inline-block` автоматически становится flex-контейнером, если у него есть дочерние элементы',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-12-4',
        text: '`inline` умеет принимать размеры, но только в `px`, а `inline-block` — только в `%`',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-14',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-13',
    type: 'single',
    question: 'Когда уместно использовать `position: sticky`?',
    answers: [
      {
        id: 'a-v2-4-13-1',
        text: 'Когда элемент должен “прилипать” при прокрутке внутри контейнера (например, заголовки таблиц, навигация, сайдбар)',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-13-2',
        text: 'Когда нужно полностью исключить элемент из потока документа и позиционировать его относительно viewport',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-13-3',
        text: 'Когда нужно гарантировать отсутствие stacking context, чтобы `z-index` детей работал глобально',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-13-4',
        text: 'Когда нужно, чтобы элемент занимал место как `display: none`, но оставался кликабельным',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-14',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-14',
    type: 'single',
    question: 'Как работает Flexbox?',
    answers: [
      {
        id: 'a-v2-4-14-1',
        text: 'Это одномерная система: распределяет пространство по главной оси, затем выравнивает по поперечной оси',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-14-2',
        text: 'Это двумерная система: одновременно управляет строками и колонками как таблица',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-14-3',
        text: 'Это механизм, который позиционирует элементы только через `top/left` и создаёт новый stacking context',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-14-4',
        text: 'Это свойство, которое меняет только визуальный порядок элементов, но не влияет на распределение пространства',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-15',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-15',
    type: 'single',
    question: 'Как работает CSS Grid?',
    answers: [
      {
        id: 'a-v2-4-15-1',
        text: 'Это двумерная система раскладки: управляет строками и колонками и позволяет строить сетки',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-15-2',
        text: 'Это одномерная система выравнивания элементов по главной оси, как Flexbox',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-15-3',
        text: 'Это способ переопределить специфичность через `grid-layer`, чтобы правила применялись предсказуемо',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-15-4',
        text: 'Это режим, в котором браузер размещает элементы только в исходном порядке DOM без возможности задавать области',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-15',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-16',
    type: 'single',
    question:
      'В чём разница между `justify-content` и `align-items` во Flexbox?',
    answers: [
      {
        id: 'a-v2-4-16-1',
        text: '`justify-content` выравнивает по главной оси, а `align-items` — по поперечной оси',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-16-2',
        text: '`justify-content` работает только для колонок, а `align-items` — только для строк',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-16-3',
        text: '`align-items` задаёт расстояние между элементами, а `justify-content` управляет переносом строк',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-16-4',
        text: '`justify-content` меняет порядок элементов, а `align-items` меняет их размеры',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-15',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-17',
    type: 'single',
    question: 'Чем Grid отличается от Flexbox?',
    answers: [
      {
        id: 'a-v2-4-17-1',
        text: 'Flexbox — одномерная раскладка (одна ось), Grid — двумерная (строки и колонки)',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-17-2',
        text: 'Grid работает только в современных браузерах, а Flexbox поддерживается только в старых',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-17-3',
        text: 'Flexbox может задавать колонки и строки, а Grid — только выравнивать элементы в одной строке',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-17-4',
        text: 'Grid предназначен для типографики, а Flexbox — только для позиционирования иконок',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-15',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-18',
    type: 'single',
    question: 'Что означает единица `fr` в CSS Grid?',
    answers: [
      {
        id: 'a-v2-4-18-1',
        text: 'Фракция свободного пространства: `1fr` — одна доля доступного пространства в контейнере',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-18-2',
        text: 'Фиксированная ширина колонки в пикселях, зависящая от DPI экрана',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-18-3',
        text: 'Единица, равная размеру шрифта родителя (аналог `em`), но только внутри grid',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-18-4',
        text: 'Единица для задания расстояния между колонками (аналог `gap`), но в одной оси',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-15',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-19',
    type: 'single',
    question: 'Когда `grid-template-columns: 1fr 1fr 1fr` имеет смысл?',
    answers: [
      {
        id: 'a-v2-4-19-1',
        text: 'Когда нужно равномерно разделить доступную ширину на три колонки',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-19-2',
        text: 'Когда нужно сделать ровно три строки одинаковой высоты без дополнительных свойств',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-19-3',
        text: 'Когда нужно создать сетку, которая автоматически перестраивается без ограничения на минимальную ширину',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-19-4',
        text: 'Когда нужно включить автоматическое схлопывание margin у элементов сетки',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-15',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-20',
    type: 'single',
    question:
      'Как сделать карточки, которые автоматически перестраиваются в зависимости от ширины контейнера (без множества брейкпоинтов)?',
    answers: [
      {
        id: 'a-v2-4-20-1',
        text: 'Использовать Grid с `repeat(auto-fit/auto-fill, minmax(...))`, чтобы количество колонок подстраивалось автоматически',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-20-2',
        text: 'Использовать `position: absolute` для всех карточек и рассчитывать координаты через JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-20-3',
        text: 'Использовать `display: inline` и задавать фиксированную ширину каждой карточке',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-20-4',
        text: 'Использовать `z-index` и stacking context, чтобы элементы выстраивались плотнее без пустот',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-15',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-21',
    type: 'single',
    question: 'Что делает `flex: 1`?',
    answers: [
      {
        id: 'a-v2-4-21-1',
        text: '`flex: 1` — сокращение для `flex-grow: 1; flex-shrink: 1; flex-basis: 0%` (занимает доступное место)',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-21-2',
        text: '`flex: 1` фиксирует базовый размер элемента на 1px и запрещает ему растягиваться и сжиматься',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-21-3',
        text: '`flex: 1` делает элемент первым, как `order: 1`, и автоматически выравнивает его по центру контейнера',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-21-4',
        text: '`flex: 1` включает `flex-wrap: wrap` и задаёт равномерные отступы между элементами как у `gap`',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-15',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-22',
    type: 'single',
    question: 'Что такое `gap` и где он используется?',
    answers: [
      {
        id: 'a-v2-4-22-1',
        text: 'Свойство для отступов между элементами в Grid и Flexbox; часто заменяет “маргины между соседями”',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-22-2',
        text: 'Свойство, которое задаёт расстояние между слоями в `@layer` и влияет на приоритет стилей',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-22-3',
        text: 'Свойство для вертикального выравнивания inline-элементов по базовой линии текста',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-22-4',
        text: 'Свойство, которое управляет расстоянием между DOM и CSSOM на этапе построения render tree',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-15',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-23',
    type: 'single',
    question: 'Что такое media queries?',
    answers: [
      {
        id: 'a-v2-4-23-1',
        text: 'Условные правила CSS в `@media (...)`, которые применяются, когда условие истинно (ширина/ориентация/prefers-*)',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-23-2',
        text: 'Способ менять стили только на основе структуры DOM (селекторов), без учёта размеров экрана и условий',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-23-3',
        text: 'Механизм ленивой загрузки CSS: браузер импортирует стили по сети только после first paint',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-23-4',
        text: 'Функция CSS, которая автоматически подбирает размер шрифта по ширине контейнера без явных условий',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-16',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-24',
    type: 'single',
    question: 'Что такое mobile-first?',
    answers: [
      {
        id: 'a-v2-4-24-1',
        text: 'Стратегия: сначала стили для мобильных, затем усложнение для больших экранов через `@media (min-width: ...)`',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-24-2',
        text: 'Подход, при котором на мобильных отключают CSS, а стили подгружаются только на десктопе',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-24-3',
        text: 'Правило, по которому UI должен работать только в портретной ориентации',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-24-4',
        text: 'Техника, при которой адаптивность достигается исключительно через `vw/vh`, без media queries',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-16',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-25',
    type: 'single',
    question: 'Что такое Container Queries?',
    answers: [
      {
        id: 'a-v2-4-25-1',
        text: 'Условия, позволяющие применять стили на основе размера контейнера компонента, а не размера viewport',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-25-2',
        text: 'Механизм, который ограничивает CSS-селекторы пределами компонента, как CSS Modules',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-25-3',
        text: 'Способ выполнять запросы к серверу из CSS и подгружать стили в зависимости от ответа',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-25-4',
        text: 'Система grid-контейнеров, которая автоматически превращает flex в grid при малой ширине',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-16',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-26',
    type: 'single',
    question: 'Чем CSS-переменные отличаются от SCSS-переменных?',
    answers: [
      {
        id: 'a-v2-4-26-1',
        text: 'CSS Custom Properties вычисляются в runtime, наследуются и участвуют в каскаде; SCSS-переменные подставляются на этапе сборки и статичны',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-26-2',
        text: 'SCSS-переменные вычисляются в runtime и видны в DevTools, а CSS-переменные доступны только во время сборки',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-26-3',
        text: 'CSS-переменные работают только внутри Grid/Flex, а SCSS-переменные — только в обычном потоке',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-26-4',
        text: 'CSS-переменные всегда типизированы (цвет/размер), а SCSS-переменные не могут хранить числа',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-16',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-27',
    type: 'single',
    question: 'Что делает функция `clamp()` в CSS?',
    answers: [
      {
        id: 'a-v2-4-27-1',
        text: 'Задаёт значение с границами: `clamp(min, preferred, max)` — адаптивно, но не меньше min и не больше max',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-27-2',
        text: 'Обрезает содержимое элемента по границам padding, как `overflow: hidden`, но для текста',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-27-3',
        text: 'Фиксирует значение свойства и запрещает его переопределять в media queries',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-27-4',
        text: 'Автоматически вычисляет брейкпоинты и генерирует `@media` правила на основе min/max',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-16',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-28',
    type: 'single',
    question: 'Как сделать адаптивную сетку без media queries?',
    answers: [
      {
        id: 'a-v2-4-28-1',
        text: 'Использовать Grid с `repeat(auto-fit/auto-fill, minmax(...))`, чтобы сетка сама подстраивалась',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-28-2',
        text: 'Использовать `display: table` и задавать всем ячейкам `width: 33%`, чтобы таблица “сама” адаптировалась',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-28-3',
        text: 'Использовать `position: fixed` для колонок и пересчитывать их ширину на событии scroll',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-28-4',
        text: 'Использовать `@layer` и менять порядок слоёв в зависимости от ширины экрана',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-16',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-29',
    type: 'single',
    question: 'Что такое дизайн-токены (design tokens)?',
    answers: [
      {
        id: 'a-v2-4-29-1',
        text: 'Атомарные значения дизайна (цвета, отступы, типографика и т.п.), которые удобно централизовать, например, через CSS-переменные',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-29-2',
        text: 'CSS-правила, которые токенизируют HTML в DOM и ускоряют построение render tree',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-29-3',
        text: 'Способ хранить изображения в CSS как бинарные токены, чтобы не делать сетевые запросы',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-29-4',
        text: 'Функция Tailwind, которая превращает utility-классы в компоненты автоматически',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-16',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-30',
    type: 'single',
    question:
      'Почему CSS Custom Properties считают runtime-переменными по сравнению с SCSS?',
    answers: [
      {
        id: 'a-v2-4-30-1',
        text: 'Потому что они вычисляются браузером во время работы, наследуются, участвуют в каскаде и могут динамически переопределяться',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-30-2',
        text: 'Потому что они всегда вычисляются на сервере и передаются в HTML как готовые значения',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-30-3',
        text: 'Потому что они доступны только в JavaScript и не могут использоваться напрямую в CSS',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-30-4',
        text: 'Потому что они делают CSS типизированным (цвет/размер/число) без необходимости в build step',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-17',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-31',
    type: 'single',
    question: 'Что такое CSS Modules и зачем они нужны?',
    answers: [
      {
        id: 'a-v2-4-31-1',
        text: 'Подход (через сборщик), который делает классы локальными/уникальными и решает проблему глобальной области видимости CSS',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-31-2',
        text: 'Часть стандарта CSS, которая позволяет объявлять модули внутри `@layer` без сборки',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-31-3',
        text: 'Механизм браузера, который оптимизирует загрузку CSS, кэшируя каждое правило как отдельный модуль',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-31-4',
        text: 'Способ описывать стили только через утилиты (utility-first), чтобы не писать собственный CSS',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-17',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-32',
    type: 'single',
    question: 'В чём плюсы и минусы CSS-in-JS?',
    answers: [
      {
        id: 'a-v2-4-32-1',
        text: 'Плюсы: динамика и темизация, стили рядом с компонентом. Минусы: runtime-нагрузка, рост бандла и сложнее отладка',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-32-2',
        text: 'Плюсы: всегда меньше бандл и лучше производительность; минусы: типизация и автодополнение обычно недоступны',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-32-3',
        text: 'Плюсы: работает без JavaScript; минусы: нельзя описывать hover/focus и другие псевдоклассы',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-32-4',
        text: 'Плюсы: полностью устраняет каскад и специфичность; минусы: принципиально несовместим с React и SSR',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-17',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-33',
    type: 'single',
    question: 'Как БЭМ помогает масштабировать CSS?',
    answers: [
      {
        id: 'a-v2-4-33-1',
        text: 'Даёт предсказуемую структуру именования (блок/элемент/модификатор), снижает конфликты и упрощает поддержку в команде',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-33-2',
        text: 'Автоматически изолирует стили на уровне сборщика, создавая уникальные хэши классов',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-33-3',
        text: 'Заменяет необходимость в каскаде: при БЭМ порядок правил и специфичность больше не важны',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-33-4',
        text: 'Позволяет писать стили внутри JS без дополнительных библиотек, потому что БЭМ — это CSS-in-JS',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-17',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-34',
    type: 'single',
    question: 'Что такое utility-first подход?',
    answers: [
      {
        id: 'a-v2-4-34-1',
        text: 'Подход, где стили задаются через небольшие утилитарные классы вместо “семантических” классов; пример — Tailwind CSS',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-34-2',
        text: 'Подход, где все стили описываются только в одном глобальном файле, чтобы упростить кэширование',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-34-3',
        text: 'Подход, где CSS пишется только через `@layer`, а отдельные классы запрещены',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-34-4',
        text: 'Подход, где используемые свойства автоматически полифиллятся для старых браузеров',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-17',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-35',
    type: 'single',
    question: 'Почему глобальный CSS становится проблемой в больших проектах?',
    answers: [
      {
        id: 'a-v2-4-35-1',
        text: 'Из-за конфликтов имён, роста специфичности и непредсказуемых переопределений при масштабировании',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-35-2',
        text: 'Потому что браузер не умеет кэшировать глобальные стили и перезагружает их на каждой странице',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-35-3',
        text: 'Потому что глобальный CSS отключает наследование и ломает текстовые стили по умолчанию',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-35-4',
        text: 'Потому что глобальный CSS не поддерживает flex/grid и требует только float-раскладки',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-17',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-4-36',
    type: 'single',
    question: 'Когда лучше использовать Tailwind, а когда CSS Modules?',
    answers: [
      {
        id: 'a-v2-4-36-1',
        text: 'Tailwind — когда удобно utility-first и быстро собирать UI; CSS Modules — когда нужна изоляция классов и “обычный” CSS в компонентах',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-36-2',
        text: 'Tailwind — только для SSR, а CSS Modules — только для CSR; вместе их использовать нельзя',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-36-3',
        text: 'Tailwind — когда нужен строгий БЭМ, а CSS Modules — когда нужен utility-first',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-36-4',
        text: 'Tailwind — для старых браузеров, а CSS Modules — только для современных, потому что это нативная часть CSS',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-17',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-4-37',
    type: 'single',
    question: 'Что нового в Tailwind CSS v4 (в общих чертах)?',
    answers: [
      {
        id: 'a-v2-4-37-1',
        text: 'Новый быстрый движок (Oxide), акцент на CSS-конфигурацию вместо JS, улучшения в пайплайне сборки и более “из коробки” настройка',
        isCorrect: true,
      },
      {
        id: 'a-v2-4-37-2',
        text: 'Полный отказ от утилит: теперь Tailwind требует писать только BEM-классы и семантические компоненты',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-37-3',
        text: 'Переезд на WebAssembly в браузере: Tailwind генерирует CSS на клиенте при первом рендере',
        isCorrect: false,
      },
      {
        id: 'a-v2-4-37-4',
        text: 'Отказ от dark mode и responsive-утилит: теперь это делается только через media queries вручную',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-17',
    partId: 'part-4',
    difficulty: 'hard',
  },
]
