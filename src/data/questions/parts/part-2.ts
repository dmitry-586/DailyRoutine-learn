import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части II. CSS
 */
export const part2Questions: QuizQuestion[] = [
  {
    id: 'q-2-1',
    type: 'single',
    question: 'Что такое CSS Grid и в чём его преимущества?',
    answers: [
      {
        id: 'a-2-1-1',
        text: 'Двумерная система раскладки, которая позволяет создавать сложные сетки с точным контролем строк и столбцов',
        isCorrect: true,
      },
      {
        id: 'a-2-1-2',
        text: 'Одномерная система раскладки для выравнивания элементов в одном направлении',
        isCorrect: false,
      },
      {
        id: 'a-2-1-3',
        text: 'Система анимаций для создания плавных переходов между состояниями',
        isCorrect: false,
      },
      {
        id: 'a-2-1-4',
        text: 'Механизм кэширования стилей для оптимизации производительности',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS Grid — это двумерная система раскладки, которая позволяет создавать сложные сетки с точным контролем позиционирования элементов по строкам и столбцам одновременно.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-2',
    type: 'single',
    question: 'В чём разница между Flexbox и CSS Grid?',
    answers: [
      {
        id: 'a-2-2-1',
        text: 'Flexbox — одномерная раскладка (строка или столбец), Grid — двумерная (строки и столбцы одновременно)',
        isCorrect: true,
      },
      {
        id: 'a-2-2-2',
        text: 'Flexbox работает только в старых браузерах, Grid — только в новых',
        isCorrect: false,
      },
      {
        id: 'a-2-2-3',
        text: 'Flexbox для мобильных устройств, Grid для десктопов',
        isCorrect: false,
      },
      {
        id: 'a-2-2-4',
        text: 'Нет разницы, это синонимы с одинаковым функционалом',
        isCorrect: false,
      },
    ],
    explanation:
      'Flexbox предназначен для одномерной раскладки (либо по строке, либо по столбцу), а CSS Grid — для двумерной раскладки, где можно одновременно контролировать строки и столбцы.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-3',
    type: 'multiple',
    question: 'Какие CSS-препроцессоры вы знаете?',
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
        id: 'a-2-3-3',
        text: 'Stylus',
        isCorrect: true,
      },
      {
        id: 'a-2-3-4',
        text: 'PostCSS',
        isCorrect: false,
      },
    ],
    explanation:
      'Основные CSS-препроцессоры: Sass/SCSS, Less, Stylus. PostCSS — это не препроцессор, а инструмент для трансформации CSS с помощью плагинов.',
    chapterId: 'chapter-2-3',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-4',
    type: 'single',
    question: 'Что такое CSS Custom Properties (CSS Variables)?',
    answers: [
      {
        id: 'a-2-4-1',
        text: 'Механизм для создания переиспользуемых значений, которые можно изменять динамически',
        isCorrect: true,
      },
      {
        id: 'a-2-4-2',
        text: 'Способ создания новых CSS-свойств для специфических задач',
        isCorrect: false,
      },
      {
        id: 'a-2-4-3',
        text: 'Механизм для импорта переменных из JavaScript в CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-4-4',
        text: 'Способ оптимизации CSS для уменьшения размера файла',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS Custom Properties (переменные) позволяют создавать переиспользуемые значения, которые можно изменять динамически через JavaScript и использовать в каскаде.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-5',
    type: 'single',
    question: 'Что такое CSS Modules?',
    answers: [
      {
        id: 'a-2-5-1',
        text: 'Подход к организации CSS, где стили изолированы на уровне модуля и классы генерируются уникальными именами',
        isCorrect: true,
      },
      {
        id: 'a-2-5-2',
        text: 'Библиотека для создания CSS-анимаций',
        isCorrect: false,
      },
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
    ],
    explanation:
      'CSS Modules — это подход, где каждый CSS-файл рассматривается как отдельный модуль с изолированными классами, что предотвращает конфликты имен.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-6',
    type: 'multiple',
    question: 'Какие преимущества дают CSS-in-JS решения?',
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
        id: 'a-2-6-3',
        text: 'Использование переменных JavaScript в стилях',
        isCorrect: true,
      },
      {
        id: 'a-2-6-4',
        text: 'Автоматическая минификация и оптимизация',
        isCorrect: true,
      },
      {
        id: 'a-2-6-5',
        text: 'Улучшение производительности рендеринга',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS-in-JS позволяет использовать динамические стили, изоляцию, переменные JavaScript, но может влиять на производительность из-за runtime-стоимости.',
    chapterId: 'chapter-2-2',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-2-7',
    type: 'single',
    question:
      'Что такое box-sizing и в чём разница между content-box и border-box?',
    answers: [
      {
        id: 'a-2-7-1',
        text: 'content-box — width задаёт только content, padding/border добавляются; border-box — width включает padding и border',
        isCorrect: true,
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
      {
        id: 'a-2-7-4',
        text: 'Нет разницы, это синонимы',
        isCorrect: false,
      },
    ],
    explanation:
      'content-box: width = только content, padding/border добавляются. border-box: width = content + padding + border. border-box делает верстку предсказуемой и является современной практикой.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-8',
    type: 'single',
    question: 'Как вычисляется специфичность CSS-селектора?',
    answers: [
      {
        id: 'a-2-8-1',
        text: 'inline-style = 1000, #id = 100, .class = 10, tag = 1. Суммируются все части селектора',
        isCorrect: true,
      },
      {
        id: 'a-2-8-2',
        text: 'Специфичность зависит только от количества селекторов',
        isCorrect: false,
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
    ],
    explanation:
      'Специфичность: inline-style (1000), #id (100), .class/pseudo-class (10), tag (1). Селектор #header .menu li имеет специфичность 100 + 10 + 1 = 111.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-9',
    type: 'multiple',
    question: 'Какие CSS-свойства наследуются от родителя к потомкам?',
    answers: [
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
        id: 'a-2-9-3',
        text: 'line-height',
        isCorrect: true,
      },
      {
        id: 'a-2-9-4',
        text: 'padding',
        isCorrect: false,
      },
      {
        id: 'a-2-9-5',
        text: 'margin',
        isCorrect: false,
      },
      {
        id: 'a-2-9-6',
        text: 'border',
        isCorrect: false,
      },
    ],
    explanation:
      'Наследуются: font-size, color, line-height, font-family, text-align и другие текстовые свойства. НЕ наследуются: padding, margin, border, background, width, height.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-10',
    type: 'single',
    question: 'В чём разница между display: block, inline и inline-block?',
    answers: [
      {
        id: 'a-2-10-1',
        text: 'block — занимает всю строку, inline — в строке без размеров, inline-block — в строке с размерами',
        isCorrect: true,
      },
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
        text: 'Нет разницы, все работают одинаково',
        isCorrect: false,
      },
    ],
    explanation:
      'block: занимает всю строку, можно задавать width/height. inline: в строке, игнорирует width/height. inline-block: в строке, но можно задавать размеры.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-11',
    type: 'single',
    question: 'Что такое position: relative, absolute, fixed и sticky?',
    answers: [
      {
        id: 'a-2-11-1',
        text: 'relative — относительно своего места, absolute — относительно ближайшего positioned родителя, fixed — относительно viewport, sticky — комбинация relative и fixed',
        isCorrect: true,
      },
      {
        id: 'a-2-11-2',
        text: 'relative — для мобильных, absolute — для десктопов, fixed — для планшетов, sticky — устаревший',
        isCorrect: false,
      },
      {
        id: 'a-2-11-3',
        text: 'Все работают одинаково, разница только в названии',
        isCorrect: false,
      },
      {
        id: 'a-2-11-4',
        text: 'relative — для текста, absolute — для изображений, fixed — для видео, sticky — для анимаций',
        isCorrect: false,
      },
    ],
    explanation:
      'relative: позиционируется относительно своего исходного места. absolute: относительно ближайшего positioned родителя. fixed: относительно viewport. sticky: переключается между relative и fixed при прокрутке.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-12',
    type: 'single',
    question: 'Что такое z-index и как он работает?',
    answers: [
      {
        id: 'a-2-12-1',
        text: 'Свойство для управления порядком наложения элементов по оси Z, работает только для positioned элементов',
        isCorrect: true,
      },
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
        id: 'a-2-12-4',
        text: 'Свойство работает для всех элементов без ограничений',
        isCorrect: false,
      },
    ],
    explanation:
      'z-index контролирует порядок наложения элементов. Работает только для элементов с position: relative/absolute/fixed/sticky. Большее значение = выше в стеке.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-2-13',
    type: 'multiple',
    question: 'Какие свойства Flexbox используются для выравнивания элементов?',
    answers: [
      {
        id: 'a-2-13-1',
        text: 'justify-content — для главной оси',
        isCorrect: true,
      },
      {
        id: 'a-2-13-2',
        text: 'align-items — для поперечной оси',
        isCorrect: true,
      },
      {
        id: 'a-2-13-3',
        text: 'align-self — для отдельного элемента',
        isCorrect: true,
      },
      {
        id: 'a-2-13-4',
        text: 'align-content — для многострочных контейнеров',
        isCorrect: true,
      },
      {
        id: 'a-2-13-5',
        text: 'position — для позиционирования',
        isCorrect: false,
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
    question: 'Что такое CSS Grid области (grid-template-areas)?',
    answers: [
      {
        id: 'a-2-14-1',
        text: 'Способ именования областей сетки для визуального размещения элементов',
        isCorrect: true,
      },
      {
        id: 'a-2-14-2',
        text: 'Способ создания анимаций в Grid',
        isCorrect: false,
      },
      {
        id: 'a-2-14-3',
        text: 'Механизм кэширования Grid-элементов',
        isCorrect: false,
      },
      {
        id: 'a-2-14-4',
        text: 'Способ оптимизации производительности Grid',
        isCorrect: false,
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
    question: 'Что такое CSS Media Queries?',
    answers: [
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
        id: 'a-2-15-3',
        text: 'Механизм для работы с видео и аудио',
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
    question: 'Что такое CSS Pseudo-classes и Pseudo-elements?',
    answers: [
      {
        id: 'a-2-16-1',
        text: 'Pseudo-classes — состояния элементов (:hover, :focus), Pseudo-elements — части элементов (::before, ::after)',
        isCorrect: true,
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
      {
        id: 'a-2-16-4',
        text: 'Нет разницы, это синонимы',
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
    question: 'Что такое CSS Cascade и как определяется приоритет стилей?',
    answers: [
      {
        id: 'a-2-17-1',
        text: 'Каскад определяет порядок применения стилей: сначала по специфичности, затем по порядку, затем !important',
        isCorrect: true,
      },
      {
        id: 'a-2-17-2',
        text: 'Каскад — это способ объединения CSS-файлов',
        isCorrect: false,
      },
      {
        id: 'a-2-17-3',
        text: 'Каскад определяет только порядок загрузки стилей',
        isCorrect: false,
      },
      {
        id: 'a-2-17-4',
        text: 'Каскад работает только для анимаций',
        isCorrect: false,
      },
    ],
    explanation:
      'Каскад определяет приоритет: 1) специфичность селектора, 2) порядок в файле (последний побеждает), 3) !important (побеждает всё, но использовать осторожно).',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-2-18',
    type: 'single',
    question: 'Что такое PostCSS?',
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
        id: 'a-2-18-3',
        text: 'Библиотека для работы с CSS-анимациями',
        isCorrect: false,
      },
      {
        id: 'a-2-18-4',
        text: 'Способ импорта CSS в JavaScript',
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
    question: 'Что такое BEM (Block Element Modifier)?',
    answers: [
      {
        id: 'a-2-19-1',
        text: 'Методология именования CSS-классов для создания понятной и масштабируемой структуры',
        isCorrect: true,
      },
      {
        id: 'a-2-19-2',
        text: 'Библиотека для работы с CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-19-3',
        text: 'Способ минификации CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-19-4',
        text: 'Механизм для автоматической генерации CSS',
        isCorrect: false,
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
    question: 'Какие CSS-свойства используются для создания анимаций?',
    answers: [
      {
        id: 'a-2-20-1',
        text: 'transition — для плавных переходов',
        isCorrect: true,
      },
      {
        id: 'a-2-20-2',
        text: 'animation — для сложных анимаций',
        isCorrect: true,
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
        id: 'a-2-20-5',
        text: 'position — для позиционирования',
        isCorrect: false,
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
      'Почему transform и opacity эффективнее для анимаций, чем изменение top/left?',
    answers: [
      {
        id: 'a-2-21-1',
        text: 'transform и opacity обрабатываются на GPU в слое composite, не вызывая reflow/repaint',
        isCorrect: true,
      },
      {
        id: 'a-2-21-2',
        text: 'transform и opacity быстрее компилируются',
        isCorrect: false,
      },
      {
        id: 'a-2-21-3',
        text: 'top/left работают только в старых браузерах',
        isCorrect: false,
      },
      {
        id: 'a-2-21-4',
        text: 'Нет разницы, все работают одинаково',
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
    question: 'Что такое CSS Containment?',
    answers: [
      {
        id: 'a-2-22-1',
        text: 'Механизм для изоляции изменений стилей внутри элемента, улучшающий производительность',
        isCorrect: true,
      },
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
        id: 'a-2-23-2',
        text: 'Способ запроса данных из контейнера',
        isCorrect: false,
      },
      {
        id: 'a-2-23-3',
        text: 'Механизм для работы с Docker-контейнерами',
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
        id: 'a-2-24-1',
        text: 'Явление, при котором вертикальные margin соседних элементов схлопываются в один больший margin',
        isCorrect: true,
      },
      {
        id: 'a-2-24-2',
        text: 'Механизм автоматического удаления margin у элементов',
        isCorrect: false,
      },
      {
        id: 'a-2-24-3',
        text: 'Способ объединения margin нескольких элементов в один',
        isCorrect: false,
      },
      {
        id: 'a-2-24-4',
        text: 'Механизм для оптимизации производительности',
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
        id: 'a-2-25-2',
        text: 'Фиксированная единица, равная 1rem',
        isCorrect: false,
      },
      {
        id: 'a-2-25-3',
        text: 'Единица для размера шрифта',
        isCorrect: false,
      },
      {
        id: 'a-2-25-4',
        text: 'Единица для анимаций',
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
        id: 'a-2-26-1',
        text: 'grid-column-start / grid-column-end',
        isCorrect: true,
      },
      {
        id: 'a-2-26-2',
        text: 'grid-row-start / grid-row-end',
        isCorrect: true,
      },
      {
        id: 'a-2-26-3',
        text: 'grid-area',
        isCorrect: true,
      },
      {
        id: 'a-2-26-4',
        text: 'grid-gap (или gap)',
        isCorrect: true,
      },
      {
        id: 'a-2-26-5',
        text: 'position',
        isCorrect: false,
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
        id: 'a-2-27-1',
        text: 'Стратегия разработки, при которой сначала пишутся стили для мобильных устройств, затем добавляются стили для больших экранов через min-width',
        isCorrect: true,
      },
      {
        id: 'a-2-27-2',
        text: 'Подход, при котором мобильная версия имеет приоритет над десктопной',
        isCorrect: false,
      },
      {
        id: 'a-2-27-3',
        text: 'Стратегия, при которой используются только мобильные стили',
        isCorrect: false,
      },
      {
        id: 'a-2-27-4',
        text: 'Подход для оптимизации производительности на мобильных',
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
        id: 'a-2-28-2',
        text: 'Округляет значение до ближайшего целого',
        isCorrect: false,
      },
      {
        id: 'a-2-28-3',
        text: 'Ограничивает значение только сверху',
        isCorrect: false,
      },
      {
        id: 'a-2-28-4',
        text: 'Сжимает значение для экономии места',
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
        id: 'a-2-29-2',
        text: 'Первое для мобильных, второе для десктопов',
        isCorrect: false,
      },
      {
        id: 'a-2-29-3',
        text: 'Первое быстрее, второе медленнее',
        isCorrect: false,
      },
      {
        id: 'a-2-29-4',
        text: 'Нет разницы, это синонимы',
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
        id: 'a-2-30-1',
        text: 'Механизм управления приоритетами стилей через уровни, независимо от порядка подключения файлов',
        isCorrect: true,
      },
      {
        id: 'a-2-30-2',
        text: 'Способ создания слоёв для z-index',
        isCorrect: false,
      },
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
        id: 'a-2-31-1',
        text: 'Родительский селектор, который позволяет стилизовать элемент в зависимости от наличия определённых потомков',
        isCorrect: true,
      },
      {
        id: 'a-2-31-2',
        text: 'Селектор для проверки наличия атрибутов',
        isCorrect: false,
      },
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
    question: 'В чём разница между :is() и :where()?',
    answers: [
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
      {
        id: 'a-2-32-3',
        text: ':is() быстрее, :where() медленнее',
        isCorrect: false,
      },
      {
        id: 'a-2-32-4',
        text: 'Нет разницы, это синонимы',
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
    question: 'В чём главное отличие CSS Custom Properties от SCSS переменных?',
    answers: [
      {
        id: 'a-2-33-1',
        text: 'CSS Variables работают в runtime, наследуются и участвуют в каскаде; SCSS переменные подставляются при сборке и статичны',
        isCorrect: true,
      },
      {
        id: 'a-2-33-2',
        text: 'CSS Variables только для цветов, SCSS для всех значений',
        isCorrect: false,
      },
      {
        id: 'a-2-33-3',
        text: 'CSS Variables медленнее, SCSS быстрее',
        isCorrect: false,
      },
      {
        id: 'a-2-33-4',
        text: 'Нет разницы, это синонимы',
        isCorrect: false,
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
        id: 'a-2-34-2',
        text: 'Способ создания теней для элементов через box-shadow',
        isCorrect: false,
      },
      {
        id: 'a-2-34-3',
        text: 'Механизм для работы с тёмной темой',
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
        id: 'a-2-35-2',
        text: 'Масштабируемость кода',
        isCorrect: true,
      },
      {
        id: 'a-2-35-3',
        text: 'Упрощение поддержки в команде',
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
        id: 'a-2-36-2',
        text: 'Удаляет префиксы из CSS',
        isCorrect: false,
      },
      {
        id: 'a-2-36-3',
        text: 'Оптимизирует селекторы',
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
        id: 'a-2-37-1',
        text: 'Инструмент для удаления неиспользуемого CSS из финального бандла, анализируя HTML/JSX файлы',
        isCorrect: true,
      },
      {
        id: 'a-2-37-2',
        text: 'Инструмент для очистки кэша браузера',
        isCorrect: false,
      },
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
        id: 'a-2-38-2',
        text: 'CSS для критически важных элементов страницы',
        isCorrect: false,
      },
      {
        id: 'a-2-38-3',
        text: 'CSS с высоким приоритетом через !important',
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
        id: 'a-2-39-2',
        text: 'Миксины быстрее, функции медленнее',
        isCorrect: false,
      },
      {
        id: 'a-2-39-3',
        text: 'Миксины для стилей, функции для JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-2-39-4',
        text: 'Нет разницы, это синонимы',
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
        id: 'a-2-40-1',
        text: '@use изолирует пространство имён и предотвращает конфликты, @import создаёт глобальную область видимости',
        isCorrect: true,
      },
      {
        id: 'a-2-40-2',
        text: '@use для новых проектов, @import для старых',
        isCorrect: false,
      },
      {
        id: 'a-2-40-3',
        text: '@use быстрее, @import медленнее',
        isCorrect: false,
      },
      {
        id: 'a-2-40-4',
        text: 'Нет разницы, это синонимы',
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
        id: 'a-2-41-1',
        text: 'flex-grow — как элемент растёт, flex-shrink — как сжимается, flex-basis — базовая ширина перед распределением пространства',
        isCorrect: true,
      },
      {
        id: 'a-2-41-2',
        text: 'Свойства для изменения размера шрифта',
        isCorrect: false,
      },
      {
        id: 'a-2-41-3',
        text: 'Свойства для работы с Grid',
        isCorrect: false,
      },
      {
        id: 'a-2-41-4',
        text: 'Свойства для анимаций',
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
        id: 'a-2-42-2',
        text: 'display: none для мобильных, visibility: hidden для десктопов',
        isCorrect: false,
      },
      {
        id: 'a-2-42-3',
        text: 'display: none быстрее, visibility: hidden медленнее',
        isCorrect: false,
      },
      {
        id: 'a-2-42-4',
        text: 'Нет разницы, это синонимы',
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
        id: 'a-2-43-1',
        text: 'Подход, при котором стили описываются в JavaScript; библиотеки: styled-components, Emotion, JSS',
        isCorrect: true,
      },
      {
        id: 'a-2-43-2',
        text: 'Способ импорта CSS в JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-2-43-3',
        text: 'Механизм для работы с CSS-переменными',
        isCorrect: false,
      },
      {
        id: 'a-2-43-4',
        text: 'Способ минификации CSS',
        isCorrect: false,
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
        id: 'a-2-44-1',
        text: 'rem — относительно корневого элемента (html), em — относительно размера шрифта родителя',
        isCorrect: true,
      },
      {
        id: 'a-2-44-2',
        text: 'rem для мобильных, em для десктопов',
        isCorrect: false,
      },
      {
        id: 'a-2-44-3',
        text: 'rem быстрее, em медленнее',
        isCorrect: false,
      },
      {
        id: 'a-2-44-4',
        text: 'Нет разницы, это синонимы',
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
        id: 'a-2-45-1',
        text: 'vw — 1% ширины viewport, vh — 1% высоты viewport',
        isCorrect: true,
      },
      {
        id: 'a-2-45-2',
        text: 'vw для ширины элементов, vh для высоты',
        isCorrect: false,
      },
      {
        id: 'a-2-45-3',
        text: 'vw для мобильных, vh для десктопов',
        isCorrect: false,
      },
      {
        id: 'a-2-45-4',
        text: 'Нет разницы, это синонимы',
        isCorrect: false,
      },
    ],
    explanation:
      'vw (viewport width) — 1% ширины окна браузера. vh (viewport height) — 1% высоты окна. 100vw = вся ширина, 100vh = вся высота. Полезны для адаптивных размеров, но могут вызывать горизонтальный скролл при использовании 100vw.',
    chapterId: 'chapter-2-1',
    partId: 'part-2',
    difficulty: 'easy',
  },
]
