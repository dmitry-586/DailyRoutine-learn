import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Банк вопросов для тестирования знаний по всем главам
 * Вопросы структурированы по главам и частям
 */
export const questionsBank: QuizQuestion[] = [
  // Часть I. Фундамент веба
  {
    id: 'q-1-1',
    type: 'single',
    question: 'Что такое DNS и зачем он нужен?',
    answers: [
      {
        id: 'a-1-1-1',
        text: 'Система доменных имён, которая преобразует доменные имена в IP-адреса',
        isCorrect: true,
      },
      {
        id: 'a-1-1-2',
        text: 'Протокол для передачи данных в интернете между серверами и клиентами',
        isCorrect: false,
      },
      {
        id: 'a-1-1-3',
        text: 'Система кэширования веб-страниц для ускорения загрузки сайтов',
        isCorrect: false,
      },
      {
        id: 'a-1-1-4',
        text: 'Протокол для безопасного соединения с использованием шифрования данных',
        isCorrect: false,
      },
    ],
    explanation:
      'DNS (Domain Name System) — это система доменных имён, которая преобразует человекочитаемые доменные имена (например, google.com) в IP-адреса, которые используются для установления соединения.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-2',
    type: 'single',
    question: 'Что такое трёхстороннее рукопожатие (3-way handshake) в TCP?',
    answers: [
      {
        id: 'a-1-2-1',
        text: 'Процесс установления соединения между клиентом и сервером через обмен SYN, SYN-ACK и ACK пакетами',
        isCorrect: true,
      },
      {
        id: 'a-1-2-2',
        text: 'Процесс разрыва соединения между клиентом и сервером через обмен FIN и ACK пакетами',
        isCorrect: false,
      },
      {
        id: 'a-1-2-3',
        text: 'Процесс передачи данных между клиентом и сервером после установления соединения',
        isCorrect: false,
      },
      {
        id: 'a-1-2-4',
        text: 'Процесс кэширования запросов для оптимизации сетевого взаимодействия',
        isCorrect: false,
      },
    ],
    explanation:
      'Трёхстороннее рукопожатие — это процесс установления TCP-соединения, при котором клиент отправляет SYN, сервер отвечает SYN-ACK, а клиент подтверждает ACK. Только после этого начинается передача данных.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-3',
    type: 'multiple',
    question: 'Какие процессы выделяют современные браузеры?',
    answers: [
      {
        id: 'a-1-3-1',
        text: 'Browser Process (главный процесс)',
        isCorrect: true,
      },
      {
        id: 'a-1-3-2',
        text: 'Renderer Processes (процессы рендеринга)',
        isCorrect: true,
      },
      {
        id: 'a-1-3-3',
        text: 'GPU Process',
        isCorrect: true,
      },
      {
        id: 'a-1-3-4',
        text: 'Network Service Process',
        isCorrect: true,
      },
      {
        id: 'a-1-3-5',
        text: 'Database Process',
        isCorrect: false,
      },
    ],
    explanation:
      'Современные браузеры используют многопроцессную архитектуру: Browser Process управляет окнами и вкладками, Renderer Processes выполняют JavaScript и рендерят страницы, GPU Process обрабатывает графику, Network Service Process управляет сетевыми запросами.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-4',
    type: 'single',
    question: 'Почему рендеринг изолирован в отдельном процессе?',
    answers: [
      {
        id: 'a-1-4-1',
        text: 'Для безопасности: чтобы вредный скрипт из одной вкладки не мог получить доступ к данным другой вкладки',
        isCorrect: true,
      },
      {
        id: 'a-1-4-2',
        text: 'Для увеличения скорости загрузки страниц и оптимизации производительности',
        isCorrect: false,
      },
      {
        id: 'a-1-4-3',
        text: 'Для уменьшения потребления памяти и более эффективного управления ресурсами',
        isCorrect: false,
      },
      {
        id: 'a-1-4-4',
        text: 'Для поддержки старых браузеров и обеспечения обратной совместимости',
        isCorrect: false,
      },
    ],
    explanation:
      'Изоляция рендеринга в отдельном процессе обеспечивает безопасность: вредный скрипт из одной вкладки не может прочитать память другой вкладки, получить доступ к файлам или уронить весь браузер.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'easy',
  },
  // Часть III. JavaScript
  {
    id: 'q-3-1',
    type: 'single',
    question: 'Сколько примитивных типов данных в JavaScript?',
    answers: [
      {
        id: 'a-3-1-1',
        text: '7: number, string, boolean, null, undefined, symbol, bigint',
        isCorrect: true,
      },
      {
        id: 'a-3-1-2',
        text: '6: number, string, boolean, null, undefined, symbol',
        isCorrect: false,
      },
      {
        id: 'a-3-1-3',
        text: '5: number, string, boolean, null, undefined',
        isCorrect: false,
      },
      {
        id: 'a-3-1-4',
        text: '8: включая object',
        isCorrect: false,
      },
    ],
    explanation:
      'В JavaScript 7 примитивных типов: number, string, boolean, null, undefined, symbol, bigint. Object — это ссылочный тип, а не примитив.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-2',
    type: 'multiple',
    question: 'Какие значения являются falsy в JavaScript?',
    answers: [
      {
        id: 'a-3-2-1',
        text: 'false',
        isCorrect: true,
      },
      {
        id: 'a-3-2-2',
        text: '0',
        isCorrect: true,
      },
      {
        id: 'a-3-2-3',
        text: "'' (пустая строка)",
        isCorrect: true,
      },
      {
        id: 'a-3-2-4',
        text: 'null',
        isCorrect: true,
      },
      {
        id: 'a-3-2-5',
        text: 'undefined',
        isCorrect: true,
      },
      {
        id: 'a-3-2-6',
        text: 'NaN',
        isCorrect: true,
      },
      {
        id: 'a-3-2-7',
        text: '[] (пустой массив)',
        isCorrect: false,
      },
      {
        id: 'a-3-2-8',
        text: '{} (пустой объект)',
        isCorrect: false,
      },
    ],
    explanation:
      'Falsy значений всего 8: false, 0, -0, 0n (BigInt), "" (пустая строка), null, undefined, NaN. Пустые массивы и объекты являются truthy.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-3',
    type: 'single',
    question: 'Когда определяется значение this в JavaScript?',
    answers: [
      {
        id: 'a-3-3-1',
        text: 'В момент вызова функции, а не в момент её объявления',
        isCorrect: true,
      },
      {
        id: 'a-3-3-2',
        text: 'В момент объявления функции и остается неизменным',
        isCorrect: false,
      },
      {
        id: 'a-3-3-3',
        text: 'При компиляции кода и определяется статически',
        isCorrect: false,
      },
      {
        id: 'a-3-3-4',
        text: 'Всегда равен window в браузерном окружении',
        isCorrect: false,
      },
    ],
    explanation:
      'this в JavaScript определяется в момент вызова функции, а не в момент её объявления. Это ключевое правило для понимания работы this.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-4',
    type: 'single',
    question: 'Что такое замыкание (closure) в JavaScript?',
    answers: [
      {
        id: 'a-3-4-1',
        text: 'Способность функции запоминать и иметь доступ к переменным из внешней области видимости даже после того, как внешняя функция завершила выполнение',
        isCorrect: true,
      },
      {
        id: 'a-3-4-2',
        text: 'Способность функции изменять глобальные переменные и получать к ним доступ из любого места',
        isCorrect: false,
      },
      {
        id: 'a-3-4-3',
        text: 'Механизм наследования в JavaScript через прототипы и цепочку прототипов',
        isCorrect: false,
      },
      {
        id: 'a-3-4-4',
        text: 'Способ создания приватных методов и свойств для инкапсуляции данных в объектах',
        isCorrect: false,
      },
    ],
    explanation:
      'Замыкание — это способность функции запоминать и иметь доступ к переменным из внешней области видимости (лексического окружения) даже после того, как внешняя функция завершила выполнение.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-5',
    type: 'single',
    question: 'Что такое Event Loop в JavaScript?',
    answers: [
      {
        id: 'a-3-5-1',
        text: 'Механизм, который управляет выполнением кода, обрабатывает события и обратные вызовы, обеспечивая асинхронное выполнение',
        isCorrect: true,
      },
      {
        id: 'a-3-5-2',
        text: 'Цикл обработки DOM-событий для управления взаимодействием пользователя с интерфейсом',
        isCorrect: false,
      },
      {
        id: 'a-3-5-3',
        text: 'Механизм многопоточности в JavaScript для параллельного выполнения нескольких задач',
        isCorrect: false,
      },
      {
        id: 'a-3-5-4',
        text: 'Способ обработки ошибок и исключений в асинхронном коде через try-catch блоки',
        isCorrect: false,
      },
    ],
    explanation:
      'Event Loop — это механизм JavaScript, который управляет выполнением кода, обрабатывает события и обратные вызовы. Он обеспечивает асинхронное выполнение, используя очередь задач и очередь микрозадач.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'hard',
  },
  // Часть VI. React и SPA
  {
    id: 'q-6-1',
    type: 'single',
    question: 'Что такое Virtual DOM в React?',
    answers: [
      {
        id: 'a-6-1-1',
        text: 'Объектное представление реального DOM в памяти JavaScript, которое используется для эффективного обновления интерфейса',
        isCorrect: true,
      },
      {
        id: 'a-6-1-2',
        text: 'Виртуальная машина для выполнения React-кода и оптимизации производительности приложения',
        isCorrect: false,
      },
      {
        id: 'a-6-1-3',
        text: 'Способ рендеринга на сервере для улучшения SEO и первоначальной загрузки страницы',
        isCorrect: false,
      },
      {
        id: 'a-6-1-4',
        text: 'Механизм кэширования компонентов для предотвращения лишних перерисовок интерфейса',
        isCorrect: false,
      },
    ],
    explanation:
      'Virtual DOM — это объектное представление реального DOM в памяти JavaScript. React использует его для сравнения состояний и эффективного обновления только изменённых частей интерфейса.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-2',
    type: 'multiple',
    question: 'Что даёт Fiber Architecture в React?',
    answers: [
      {
        id: 'a-6-2-1',
        text: 'Приоритеты обновлений',
        isCorrect: true,
      },
      {
        id: 'a-6-2-2',
        text: 'Прерываемый рендеринг',
        isCorrect: true,
      },
      {
        id: 'a-6-2-3',
        text: 'Основа для concurrent features (Suspense, startTransition)',
        isCorrect: true,
      },
      {
        id: 'a-6-2-4',
        text: 'Автоматическая оптимизация бандла',
        isCorrect: false,
      },
    ],
    explanation:
      'Fiber Architecture даёт React возможность управлять приоритетами обновлений, прерывать рендеринг для обработки более важных задач и является основой для concurrent features.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-3',
    type: 'single',
    question: 'В чём разница между useState и useReducer?',
    answers: [
      {
        id: 'a-6-3-1',
        text: 'useState подходит для простого состояния, useReducer для сложной логики с множественными подсостояниями',
        isCorrect: true,
      },
      {
        id: 'a-6-3-2',
        text: 'useState работает только с примитивными типами данных, useReducer только с объектами и массивами',
        isCorrect: false,
      },
      {
        id: 'a-6-3-3',
        text: 'useState обновляет состояние асинхронно, useReducer выполняет обновления синхронно',
        isCorrect: false,
      },
      {
        id: 'a-6-3-4',
        text: 'Нет разницы, это синонимы с одинаковым функционалом и поведением',
        isCorrect: false,
      },
    ],
    explanation:
      'useState подходит для простого локального состояния, а useReducer лучше использовать для сложной логики с множественными подсостояниями и предсказуемыми обновлениями через actions.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  // Часть V. TypeScript
  {
    id: 'q-5-1',
    type: 'single',
    question: 'В чём основное отличие interface от type в TypeScript?',
    answers: [
      {
        id: 'a-5-1-1',
        text: 'interface можно расширять и объединять через extends, type более гибкий для создания утилитарных типов',
        isCorrect: true,
      },
      {
        id: 'a-5-1-2',
        text: 'interface используется только для описания объектов, type может описывать любые типы данных',
        isCorrect: false,
      },
      {
        id: 'a-5-1-3',
        text: 'interface компилируется в runtime код, type полностью удаляется при компиляции',
        isCorrect: false,
      },
      {
        id: 'a-5-1-4',
        text: 'Нет разницы, это синонимы с полностью идентичным функционалом и поведением',
        isCorrect: false,
      },
    ],
    explanation:
      'interface можно расширять и объединять через extends, что делает его удобным для описания объектов. type более гибкий и может использоваться для создания утилитарных типов, union types и т.д.',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'medium',
  },
  // Часть IV. Инфраструктура
  {
    id: 'q-4-1',
    type: 'single',
    question: 'Что такое tree shaking?',
    answers: [
      {
        id: 'a-4-1-1',
        text: 'Процесс удаления неиспользуемого кода из финального бандла',
        isCorrect: true,
      },
      {
        id: 'a-4-1-2',
        text: 'Процесс оптимизации DOM-дерева',
        isCorrect: false,
      },
      {
        id: 'a-4-1-3',
        text: 'Процесс кэширования зависимостей',
        isCorrect: false,
      },
      {
        id: 'a-4-1-4',
        text: 'Процесс минификации кода',
        isCorrect: false,
      },
    ],
    explanation:
      'Tree shaking — это процесс удаления неиспользуемого кода (мёртвого кода) из финального бандла, что уменьшает размер приложения.',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'medium',
  },
  // Часть VIII. Производительность и безопасность
  {
    id: 'q-8-1',
    type: 'multiple',
    question:
      'Какие техники помогают улучшить производительность фронтенд-приложения?',
    answers: [
      {
        id: 'a-8-1-1',
        text: 'Code splitting и lazy loading',
        isCorrect: true,
      },
      {
        id: 'a-8-1-2',
        text: 'Мемоизация компонентов (React.memo, useMemo)',
        isCorrect: true,
      },
      {
        id: 'a-8-1-3',
        text: 'Оптимизация изображений и использование WebP',
        isCorrect: true,
      },
      {
        id: 'a-8-1-4',
        text: 'Использование CDN',
        isCorrect: true,
      },
      {
        id: 'a-8-1-5',
        text: 'Увеличение размера бандла',
        isCorrect: false,
      },
    ],
    explanation:
      'Улучшению производительности способствуют: code splitting, lazy loading, мемоизация, оптимизация изображений, использование CDN, минификация и сжатие кода.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-2',
    type: 'single',
    question: 'Что такое XSS (Cross-Site Scripting)?',
    answers: [
      {
        id: 'a-8-2-1',
        text: 'Уязвимость, при которой злоумышленник внедряет вредоносный JavaScript-код на страницу',
        isCorrect: true,
      },
      {
        id: 'a-8-2-2',
        text: 'Уязвимость, при которой злоумышленник перехватывает сессию пользователя через подмену cookies',
        isCorrect: false,
      },
      {
        id: 'a-8-2-3',
        text: 'Уязвимость, при которой злоумышленник получает доступ к базе данных через SQL-инъекции',
        isCorrect: false,
      },
      {
        id: 'a-8-2-4',
        text: 'Уязвимость, при которой злоумышленник получает доступ к файловой системе сервера',
        isCorrect: false,
      },
    ],
    explanation:
      'XSS (Cross-Site Scripting) — это уязвимость, при которой злоумышленник внедряет вредоносный JavaScript-код на страницу, который выполняется в браузере жертвы.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'medium',
  },
  // Дополнительные вопросы по Части I
  {
    id: 'q-1-5',
    type: 'single',
    question: 'Что такое HTTP и HTTPS?',
    answers: [
      {
        id: 'a-1-5-1',
        text: 'HTTP — протокол передачи данных, HTTPS — его защищённая версия с шифрованием через TLS/SSL',
        isCorrect: true,
      },
      {
        id: 'a-1-5-2',
        text: 'HTTP и HTTPS — это разные версии одного протокола без существенных различий',
        isCorrect: false,
      },
      {
        id: 'a-1-5-3',
        text: 'HTTP — для статических сайтов, HTTPS — для динамических приложений',
        isCorrect: false,
      },
      {
        id: 'a-1-5-4',
        text: 'HTTP — протокол для серверов, HTTPS — для клиентских приложений',
        isCorrect: false,
      },
    ],
    explanation:
      'HTTP (HyperText Transfer Protocol) — протокол для передачи данных. HTTPS — это HTTP с добавлением шифрования TLS/SSL для защиты данных от перехвата.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-6',
    type: 'single',
    question: 'Что такое CORS и зачем он нужен?',
    answers: [
      {
        id: 'a-1-6-1',
        text: 'Механизм безопасности браузера, который ограничивает запросы между разными доменами для защиты пользователей',
        isCorrect: true,
      },
      {
        id: 'a-1-6-2',
        text: 'Протокол для ускорения загрузки ресурсов с разных серверов',
        isCorrect: false,
      },
      {
        id: 'a-1-6-3',
        text: 'Механизм кэширования данных между различными доменами',
        isCorrect: false,
      },
      {
        id: 'a-1-6-4',
        text: 'Способ синхронизации данных между клиентом и сервером',
        isCorrect: false,
      },
    ],
    explanation:
      'CORS (Cross-Origin Resource Sharing) — механизм безопасности браузера, который контролирует, какие запросы между разными доменами разрешены, защищая пользователей от вредоносных сайтов.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  // Часть II. CSS
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
  // Дополнительные вопросы по JavaScript
  {
    id: 'q-3-6',
    type: 'single',
    question: 'Что такое Promise в JavaScript?',
    answers: [
      {
        id: 'a-3-6-1',
        text: 'Объект, представляющий результат асинхронной операции, который может быть выполнен успешно или с ошибкой',
        isCorrect: true,
      },
      {
        id: 'a-3-6-2',
        text: 'Функция для синхронного выполнения кода с задержкой',
        isCorrect: false,
      },
      {
        id: 'a-3-6-3',
        text: 'Механизм для создания многопоточности в JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-3-6-4',
        text: 'Способ кэширования результатов вычислений',
        isCorrect: false,
      },
    ],
    explanation:
      'Promise — это объект, представляющий результат асинхронной операции. Promise может находиться в состоянии pending, fulfilled (успешно) или rejected (с ошибкой).',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-7',
    type: 'single',
    question: 'В чём разница между async/await и Promise.then()?',
    answers: [
      {
        id: 'a-3-7-1',
        text: 'async/await — синтаксический сахар над промисами, который делает асинхронный код похожим на синхронный',
        isCorrect: true,
      },
      {
        id: 'a-3-7-2',
        text: 'async/await работает быстрее, чем Promise.then()',
        isCorrect: false,
      },
      {
        id: 'a-3-7-3',
        text: 'async/await для браузера, Promise.then() для Node.js',
        isCorrect: false,
      },
      {
        id: 'a-3-7-4',
        text: 'Нет разницы, это полностью идентичные способы работы с промисами',
        isCorrect: false,
      },
    ],
    explanation:
      'async/await — это синтаксический сахар над промисами, который позволяет писать асинхронный код в более читаемом синхронном стиле, но под капотом всё равно используются промисы.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-8',
    type: 'single',
    question: 'Что такое прототип в JavaScript?',
    answers: [
      {
        id: 'a-3-8-1',
        text: 'Механизм наследования, при котором объекты могут наследовать свойства и методы от других объектов через цепочку прототипов',
        isCorrect: true,
      },
      {
        id: 'a-3-8-2',
        text: 'Способ создания копий объектов для предотвращения мутаций',
        isCorrect: false,
      },
      {
        id: 'a-3-8-3',
        text: 'Механизм для создания приватных свойств в объектах',
        isCorrect: false,
      },
      {
        id: 'a-3-8-4',
        text: 'Способ оптимизации памяти при работе с большими объектами',
        isCorrect: false,
      },
    ],
    explanation:
      'Прототип — это механизм наследования в JavaScript, где каждый объект имеет ссылку на другой объект (прототип), от которого он наследует свойства и методы через цепочку прототипов.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-9',
    type: 'single',
    question: 'Что такое hoisting в JavaScript?',
    answers: [
      {
        id: 'a-3-9-1',
        text: 'Механизм, при котором объявления переменных и функций поднимаются в начало области видимости до выполнения кода',
        isCorrect: true,
      },
      {
        id: 'a-3-9-2',
        text: 'Способ оптимизации кода при компиляции для ускорения выполнения',
        isCorrect: false,
      },
      {
        id: 'a-3-9-3',
        text: 'Механизм для автоматического создания глобальных переменных',
        isCorrect: false,
      },
      {
        id: 'a-3-9-4',
        text: 'Способ кэширования результатов функций',
        isCorrect: false,
      },
    ],
    explanation:
      'Hoisting — это механизм JavaScript, при котором объявления переменных (var) и функций поднимаются в начало их области видимости, но инициализация остаётся на месте.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'medium',
  },
  // Дополнительные вопросы по React
  {
    id: 'q-6-4',
    type: 'single',
    question: 'Что такое useEffect и когда его использовать?',
    answers: [
      {
        id: 'a-6-4-1',
        text: 'Хук для выполнения побочных эффектов (запросы, подписки) после рендера компонента',
        isCorrect: true,
      },
      {
        id: 'a-6-4-2',
        text: 'Хук для создания локального состояния компонента',
        isCorrect: false,
      },
      {
        id: 'a-6-4-3',
        text: 'Хук для оптимизации производительности рендеринга',
        isCorrect: false,
      },
      {
        id: 'a-6-4-4',
        text: 'Хук для управления формой и её валидацией',
        isCorrect: false,
      },
    ],
    explanation:
      'useEffect — это хук для выполнения побочных эффектов (запросы к API, подписки, работа с DOM) после рендера компонента. Может иметь зависимости для контроля частоты выполнения.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-5',
    type: 'single',
    question: 'В чём разница между useEffect и useLayoutEffect?',
    answers: [
      {
        id: 'a-6-5-1',
        text: 'useEffect выполняется асинхронно после рендера, useLayoutEffect синхронно перед отрисовкой в браузере',
        isCorrect: true,
      },
      {
        id: 'a-6-5-2',
        text: 'useEffect для функциональных компонентов, useLayoutEffect для классовых',
        isCorrect: false,
      },
      {
        id: 'a-6-5-3',
        text: 'useEffect работает быстрее, useLayoutEffect медленнее',
        isCorrect: false,
      },
      {
        id: 'a-6-5-4',
        text: 'Нет разницы, это синонимы с одинаковым поведением',
        isCorrect: false,
      },
    ],
    explanation:
      'useEffect выполняется асинхронно после того, как браузер отрисовал изменения. useLayoutEffect выполняется синхронно перед отрисовкой, что полезно для измерений DOM и предотвращения мерцания.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-6',
    type: 'multiple',
    question:
      'Какие хуки React используются для оптимизации производительности?',
    answers: [
      {
        id: 'a-6-6-1',
        text: 'useMemo',
        isCorrect: true,
      },
      {
        id: 'a-6-6-2',
        text: 'useCallback',
        isCorrect: true,
      },
      {
        id: 'a-6-6-3',
        text: 'React.memo',
        isCorrect: true,
      },
      {
        id: 'a-6-6-4',
        text: 'useState',
        isCorrect: false,
      },
    ],
    explanation:
      'useMemo мемоизирует вычисления, useCallback мемоизирует функции, React.memo предотвращает ререндер компонента. useState не предназначен для оптимизации.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-7',
    type: 'single',
    question: 'Что такое Server-Side Rendering (SSR) в React?',
    answers: [
      {
        id: 'a-6-7-1',
        text: 'Техника рендеринга React-компонентов на сервере для отправки готового HTML клиенту',
        isCorrect: true,
      },
      {
        id: 'a-6-7-2',
        text: 'Способ кэширования компонентов на сервере для ускорения загрузки',
        isCorrect: false,
      },
      {
        id: 'a-6-7-3',
        text: 'Механизм синхронизации состояния между сервером и клиентом',
        isCorrect: false,
      },
      {
        id: 'a-6-7-4',
        text: 'Способ оптимизации бандла при сборке приложения',
        isCorrect: false,
      },
    ],
    explanation:
      'SSR — это техника, при которой React-компоненты рендерятся на сервере в HTML, который отправляется клиенту. Это улучшает SEO и первоначальную загрузку страницы.',
    chapterId: 'chapter-6-4',
    partId: 'part-6',
    difficulty: 'medium',
  },
  // Дополнительные вопросы по TypeScript
  {
    id: 'q-5-2',
    type: 'single',
    question: 'Что такое дженерики (generics) в TypeScript?',
    answers: [
      {
        id: 'a-5-2-1',
        text: 'Механизм создания переиспользуемых компонентов, которые работают с разными типами данных',
        isCorrect: true,
      },
      {
        id: 'a-5-2-2',
        text: 'Способ создания новых типов данных из существующих',
        isCorrect: false,
      },
      {
        id: 'a-5-2-3',
        text: 'Механизм для автоматического вывода типов без явного указания',
        isCorrect: false,
      },
      {
        id: 'a-5-2-4',
        text: 'Способ оптимизации компиляции TypeScript кода',
        isCorrect: false,
      },
    ],
    explanation:
      'Дженерики позволяют создавать переиспользуемые компоненты, функции и классы, которые работают с разными типами данных, сохраняя при этом типобезопасность.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-3',
    type: 'single',
    question: 'Что такое утилитарные типы (utility types) в TypeScript?',
    answers: [
      {
        id: 'a-5-3-1',
        text: 'Встроенные типы для трансформации существующих типов (Pick, Omit, Partial и др.)',
        isCorrect: true,
      },
      {
        id: 'a-5-3-2',
        text: 'Типы для работы с асинхронными операциями и промисами',
        isCorrect: false,
      },
      {
        id: 'a-5-3-3',
        text: 'Типы для валидации данных во время выполнения программы',
        isCorrect: false,
      },
      {
        id: 'a-5-3-4',
        text: 'Типы для оптимизации производительности компиляции',
        isCorrect: false,
      },
    ],
    explanation:
      'Утилитарные типы (Pick, Omit, Partial, Required, Readonly и др.) — это встроенные типы TypeScript для трансформации существующих типов без создания новых с нуля.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'medium',
  },
  // Дополнительные вопросы по инфраструктуре
  {
    id: 'q-4-2',
    type: 'single',
    question: 'Что такое Webpack и зачем он нужен?',
    answers: [
      {
        id: 'a-4-2-1',
        text: 'Модульный сборщик, который объединяет модули и их зависимости в один или несколько бандлов',
        isCorrect: true,
      },
      {
        id: 'a-4-2-2',
        text: 'Фреймворк для создания веб-приложений с готовой архитектурой',
        isCorrect: false,
      },
      {
        id: 'a-4-2-3',
        text: 'Библиотека для управления состоянием приложения',
        isCorrect: false,
      },
      {
        id: 'a-4-2-4',
        text: 'Инструмент для тестирования кода и покрытия тестами',
        isCorrect: false,
      },
    ],
    explanation:
      'Webpack — это модульный сборщик, который анализирует зависимости между модулями и объединяет их в оптимизированные бандлы для браузера.',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-3',
    type: 'single',
    question: 'Что такое npm и package.json?',
    answers: [
      {
        id: 'a-4-3-1',
        text: 'npm — менеджер пакетов для Node.js, package.json — файл с метаданными проекта и зависимостями',
        isCorrect: true,
      },
      {
        id: 'a-4-3-2',
        text: 'npm — система сборки проектов, package.json — конфигурация для компиляции',
        isCorrect: false,
      },
      {
        id: 'a-4-3-3',
        text: 'npm — фреймворк для тестирования, package.json — настройки тестов',
        isCorrect: false,
      },
      {
        id: 'a-4-3-4',
        text: 'npm — инструмент для деплоя, package.json — конфигурация сервера',
        isCorrect: false,
      },
    ],
    explanation:
      'npm (Node Package Manager) — менеджер пакетов для установки и управления зависимостями. package.json содержит метаданные проекта, список зависимостей и скрипты.',
    chapterId: 'chapter-4-1',
    partId: 'part-4',
    difficulty: 'easy',
  },
  // Дополнительные вопросы по производительности
  {
    id: 'q-8-3',
    type: 'single',
    question: 'Что такое code splitting?',
    answers: [
      {
        id: 'a-8-3-1',
        text: 'Техника разделения кода на несколько бандлов, которые загружаются по требованию',
        isCorrect: true,
      },
      {
        id: 'a-8-3-2',
        text: 'Процесс разделения кода на отдельные файлы для лучшей читаемости',
        isCorrect: false,
      },
      {
        id: 'a-8-3-3',
        text: 'Механизм для автоматического удаления неиспользуемого кода',
        isCorrect: false,
      },
      {
        id: 'a-8-3-4',
        text: 'Способ оптимизации CSS для уменьшения размера стилей',
        isCorrect: false,
      },
    ],
    explanation:
      'Code splitting — это техника разделения кода на несколько бандлов, которые загружаются по требованию (lazy loading), что уменьшает первоначальный размер бандла.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-4',
    type: 'single',
    question: 'Что такое CSRF (Cross-Site Request Forgery)?',
    answers: [
      {
        id: 'a-8-4-1',
        text: 'Атака, при которой злоумышленник заставляет пользователя выполнить нежелательные действия на сайте, где он аутентифицирован',
        isCorrect: true,
      },
      {
        id: 'a-8-4-2',
        text: 'Атака, при которой злоумышленник внедряет вредоносный код на страницу',
        isCorrect: false,
      },
      {
        id: 'a-8-4-3',
        text: 'Атака, при которой злоумышленник перехватывает пароли пользователей',
        isCorrect: false,
      },
      {
        id: 'a-8-4-4',
        text: 'Атака, при которой злоумышленник получает доступ к серверу',
        isCorrect: false,
      },
    ],
    explanation:
      'CSRF — это атака, при которой злоумышленник использует аутентификацию жертвы на другом сайте для выполнения нежелательных действий от её имени.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'medium',
  },
]

/**
 * Получить вопросы по конкретной главе
 */
export function getQuestionsByChapter(chapterId: string): QuizQuestion[] {
  return questionsBank.filter((q) => q.chapterId === chapterId)
}

/**
 * Получить вопросы по конкретной части
 */
export function getQuestionsByPart(partId: string): QuizQuestion[] {
  return questionsBank.filter((q) => q.partId === partId)
}

/**
 * Получить случайные вопросы для теста
 */
export function getRandomQuestions(
  count: number,
  options?: {
    partIds?: string[]
    chapterIds?: string[]
    difficulty?: 'easy' | 'medium' | 'hard'
    excludePartIds?: string[]
  },
): QuizQuestion[] {
  let filtered = questionsBank

  // По умолчанию исключаем часть 10 (подготовка к собеседованию)
  const excludeParts = options?.excludePartIds ?? ['part-10']
  filtered = filtered.filter((q) => !excludeParts.includes(q.partId))

  if (options?.partIds) {
    filtered = filtered.filter((q) => options.partIds!.includes(q.partId))
  }

  if (options?.chapterIds) {
    filtered = filtered.filter((q) => options.chapterIds!.includes(q.chapterId))
  }

  if (options?.difficulty) {
    filtered = filtered.filter((q) => q.difficulty === options.difficulty)
  }

  // Перемешиваем и берём нужное количество
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

/**
 * Получить все доступные главы с вопросами
 */
export function getChaptersWithQuestions() {
  const chaptersMap = new Map<string, { chapterId: string; count: number }>()

  for (const question of questionsBank) {
    const existing = chaptersMap.get(question.chapterId)
    if (existing) {
      existing.count++
    } else {
      chaptersMap.set(question.chapterId, {
        chapterId: question.chapterId,
        count: 1,
      })
    }
  }

  return Array.from(chaptersMap.values())
}
