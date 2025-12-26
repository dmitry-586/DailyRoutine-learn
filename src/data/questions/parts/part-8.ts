import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части VIII. Производительность и безопасность
 */
export const part8Questions: QuizQuestion[] = [
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
  {
    id: 'q-8-5',
    type: 'single',
    question: 'Что такое lazy loading?',
    answers: [
      {
        id: 'a-8-5-1',
        text: 'Техника отложенной загрузки ресурсов (изображений, компонентов, модулей) до момента, когда они действительно нужны',
        isCorrect: true,
      },
      {
        id: 'a-8-5-2',
        text: 'Способ замедления загрузки для экономии трафика',
        isCorrect: false,
      },
      {
        id: 'a-8-5-3',
        text: 'Механизм кэширования ресурсов',
        isCorrect: false,
      },
      {
        id: 'a-8-5-4',
        text: 'Способ оптимизации CSS',
        isCorrect: false,
      },
    ],
    explanation:
      'Lazy loading — это техника отложенной загрузки ресурсов (изображений через loading="lazy", компонентов через React.lazy, модулей через динамические импорты) до момента, когда они нужны.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-6',
    type: 'multiple',
    question:
      'Какие метрики используются для измерения производительности веб-приложений?',
    answers: [
      {
        id: 'a-8-6-1',
        text: 'FCP (First Contentful Paint)',
        isCorrect: true,
      },
      {
        id: 'a-8-6-2',
        text: 'LCP (Largest Contentful Paint)',
        isCorrect: true,
      },
      {
        id: 'a-8-6-3',
        text: 'TTI (Time to Interactive)',
        isCorrect: true,
      },
      {
        id: 'a-8-6-4',
        text: 'CLS (Cumulative Layout Shift)',
        isCorrect: true,
      },
      {
        id: 'a-8-6-5',
        text: 'FID (First Input Delay)',
        isCorrect: true,
      },
      {
        id: 'a-8-6-6',
        text: 'Размер бандла в мегабайтах',
        isCorrect: false,
      },
    ],
    explanation:
      'Core Web Vitals включают: FCP (первая отрисовка), LCP (самый большой контент), TTI (время до интерактивности), CLS (сдвиг макета), FID (задержка первого ввода).',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-7',
    type: 'single',
    question: 'Что такое debounce и throttle?',
    answers: [
      {
        id: 'a-8-7-1',
        text: 'Debounce откладывает выполнение до паузы в событиях; throttle ограничивает частоту выполнения',
        isCorrect: true,
      },
      {
        id: 'a-8-7-2',
        text: 'Debounce быстрее, throttle медленнее',
        isCorrect: false,
      },
      {
        id: 'a-8-7-3',
        text: 'Debounce для событий, throttle для анимаций',
        isCorrect: false,
      },
      {
        id: 'a-8-7-4',
        text: 'Нет разницы, это синонимы',
        isCorrect: false,
      },
    ],
    explanation:
      'Debounce откладывает выполнение функции до паузы в событиях (например, поиск после остановки ввода). Throttle ограничивает частоту выполнения (например, скролл не чаще раза в 100мс).',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-8',
    type: 'single',
    question: 'Как защититься от XSS-атак?',
    answers: [
      {
        id: 'a-8-8-1',
        text: 'Экранирование пользовательского ввода, использование Content Security Policy, санитизация данных',
        isCorrect: true,
      },
      {
        id: 'a-8-8-2',
        text: 'Использование HTTPS для всех запросов',
        isCorrect: false,
      },
      {
        id: 'a-8-8-3',
        text: 'Отключение JavaScript на странице',
        isCorrect: false,
      },
      {
        id: 'a-8-8-4',
        text: 'Использование только POST-запросов',
        isCorrect: false,
      },
    ],
    explanation:
      'Защита от XSS: экранирование HTML (DOMPurify), использование CSP заголовков, санитизация пользовательского ввода, использование textContent вместо innerHTML, валидация данных.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-9',
    type: 'single',
    question: 'Что такое Content Security Policy (CSP)?',
    answers: [
      {
        id: 'a-8-9-1',
        text: 'Механизм безопасности, который позволяет контролировать, какие ресурсы может загружать страница',
        isCorrect: true,
      },
      {
        id: 'a-8-9-2',
        text: 'Политика кэширования контента на сервере',
        isCorrect: false,
      },
      {
        id: 'a-8-9-3',
        text: 'Способ оптимизации загрузки ресурсов',
        isCorrect: false,
      },
      {
        id: 'a-8-9-4',
        text: 'Механизм сжатия контента',
        isCorrect: false,
      },
    ],
    explanation:
      'CSP — это механизм безопасности, который позволяет указать, откуда браузер может загружать скрипты, стили, изображения и другие ресурсы, что помогает предотвратить XSS-атаки.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-10',
    type: 'single',
    question: 'Что такое Web Workers?',
    answers: [
      {
        id: 'a-8-10-1',
        text: 'Механизм для выполнения JavaScript в фоновом потоке, не блокируя главный поток',
        isCorrect: true,
      },
      {
        id: 'a-8-10-2',
        text: 'Механизм для работы с сервером',
        isCorrect: false,
      },
      {
        id: 'a-8-10-3',
        text: 'Способ оптимизации CSS',
        isCorrect: false,
      },
      {
        id: 'a-8-10-4',
        text: 'Механизм для кэширования',
        isCorrect: false,
      },
    ],
    explanation:
      'Web Workers позволяют выполнять код в отдельном потоке, не блокируя UI. Не имеют доступа к DOM, общаются через postMessage. Полезны для тяжёлых вычислений, обработки данных.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-11',
    type: 'single',
    question: 'Что такое Service Workers?',
    answers: [
      {
        id: 'a-8-11-1',
        text: 'Скрипт, который работает между браузером и сетью, позволяя кэшировать ресурсы и работать офлайн',
        isCorrect: true,
      },
      {
        id: 'a-8-11-2',
        text: 'Механизм для работы с сервером',
        isCorrect: false,
      },
      {
        id: 'a-8-11-3',
        text: 'Способ оптимизации CSS',
        isCorrect: false,
      },
      {
        id: 'a-8-11-4',
        text: 'Механизм для работы с формами',
        isCorrect: false,
      },
    ],
    explanation:
      'Service Workers — основа PWA. Работают как прокси между браузером и сетью, позволяют кэшировать ресурсы, работать офлайн, отправлять push-уведомления. Работают в фоне даже после закрытия страницы.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'hard',
  },
]
