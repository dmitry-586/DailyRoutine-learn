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
        text: 'В реальных реализациях (lodash и др.) у debounce/throttle есть настройки leading/trailing. Ошибка — думать, что “по умолчанию” trailing всегда гарантирован и одинаков у всех библиотек',
        isCorrect: false,
      },
      {
        id: 'a-8-7-3',
        text: 'Debounce для событий, throttle для анимаций',
        isCorrect: false,
      },
      {
        id: 'a-8-7-4',
        text: 'Оба “про контроль частоты”, но поведение разное: throttle ограничивает частоту, debounce ждёт паузу. На собесе часто ловят на “ровно раз в интервал” — это не так',
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
  {
    id: 'q-8-12',
    type: 'multiple',
    question:
      'Какие изменения чаще всего дают заметное улучшение LCP на первом экране?',
    answers: [
      {
        id: 'a-8-12-1',
        text: 'Оптимизация “hero”-изображения (размеры, современный формат, правильный приоритет загрузки)',
        isCorrect: true,
      },
      {
        id: 'a-8-12-2',
        text: 'Снижение TTFB (кэш, CDN, оптимизация ответа сервера)',
        isCorrect: true,
      },
      {
        id: 'a-8-12-3',
        text: 'Устранение render‑blocking ресурсов (критический CSS, отложенная загрузка некритичного)',
        isCorrect: true,
      },
      {
        id: 'a-8-12-4',
        text: 'Перенос всех вычислений в Web Worker, потому что LCP измеряет CPU‑нагрузку',
        isCorrect: false,
      },
    ],
    explanation:
      'LCP зависит от скорости появления самого крупного видимого элемента. Чаще всего это изображение/блок контента + время ответа + блокирующие ресурсы. Web Worker помогает отзывчивости (INP), но не является “универсальным” решением для LCP.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-13',
    type: 'single',
    question:
      'В чём ключевая разница между <link rel="preload"> и <link rel="prefetch">?',
    answers: [
      {
        id: 'a-8-13-1',
        text: 'preload — ресурс нужен “прямо сейчас” (в текущей навигации), prefetch — вероятно понадобится позже (низкий приоритет)',
        isCorrect: true,
      },
      {
        id: 'a-8-13-2',
        text: 'preload/prefetch — это подсказки браузеру и могут применяться к разным типам ресурсов; но важно правильно указать as/crossorigin, иначе можно получить лишнюю загрузку или промах по кэшу',
        isCorrect: false,
      },
      {
        id: 'a-8-13-3',
        text: 'И preload, и prefetch в итоге зависят от обычного HTTP‑кэширования. Разница — приоритет/контекст, а не “вечно/никогда”',
        isCorrect: false,
      },
      {
        id: 'a-8-13-4',
        text: 'preload используется только в HTTP/2, prefetch — только в HTTP/3',
        isCorrect: false,
      },
    ],
    explanation:
      'preload повышает приоритет загрузки критичного ресурса для текущей страницы. prefetch “подгружает наперёд” потенциально нужный ресурс с низким приоритетом, чтобы ускорить будущую навигацию.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-14',
    type: 'single',
    question:
      'Что измеряет INP (Interaction to Next Paint) и почему он важнее старого FID?',
    answers: [
      {
        id: 'a-8-14-1',
        text: 'INP оценивает задержку реакции интерфейса на взаимодействия (до следующей отрисовки) по всему жизненному циклу страницы, а FID смотрел только на первое взаимодействие',
        isCorrect: true,
      },
      {
        id: 'a-8-14-2',
        text: 'INP измеряет скорость сети и заменил TTFB',
        isCorrect: false,
      },
      {
        id: 'a-8-14-3',
        text: 'INP особенно важен как раз для SPA, потому что измеряет отзывчивость в течение жизни страницы (а не только “первый ввод”)',
        isCorrect: false,
      },
      {
        id: 'a-8-14-4',
        text: 'INP измеряет только время выполнения JavaScript, игнорируя рендеринг',
        isCorrect: false,
      },
    ],
    explanation:
      'INP отражает “отзывчивость” интерфейса: насколько быстро после клика/ввода пользователь видит обновление. Он учитывает больше реальных сценариев, чем FID, который фиксировал лишь первый input delay.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-15',
    type: 'multiple',
    question: 'Какие типичные причины приводят к плохому CLS?',
    answers: [
      {
        id: 'a-8-15-1',
        text: 'Изображения/видео без заранее заданных размеров (браузер не резервирует место)',
        isCorrect: true,
      },
      {
        id: 'a-8-15-2',
        text: 'Динамическая вставка баннеров/блоков выше контента без резерва места',
        isCorrect: true,
      },
      {
        id: 'a-8-15-3',
        text: 'Поздняя загрузка шрифтов, меняющая метрики текста (FOIT/FOUT), если нет компенсирующих настроек',
        isCorrect: true,
      },
      {
        id: 'a-8-15-4',
        text: 'Использование WebP/AVIF вместо PNG',
        isCorrect: false,
      },
    ],
    explanation:
      'CLS — про “прыжки” интерфейса. Чаще всего виноваты не зарезервированные размеры медиа/виджетов и поздние изменения layout (в т.ч. из‑за шрифтов). Формат картинки сам по себе CLS не ухудшает.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-16',
    type: 'single',
    question:
      'Для чего на практике чаще всего используют WebPageTest, когда Lighthouse уже “показывает проблемы”?',
    answers: [
      {
        id: 'a-8-16-1',
        text: 'Чтобы увидеть реальный waterfall (порядок/приоритеты загрузки ресурсов) на конкретных устройствах и сетях и найти узкие места',
        isCorrect: true,
      },
      {
        id: 'a-8-16-2',
        text: 'Чтобы заменить unit‑тесты производительности и убрать необходимость профилирования',
        isCorrect: false,
      },
      {
        id: 'a-8-16-3',
        text: 'Чтобы автоматически переписать код и оптимизировать бандл без участия разработчика',
        isCorrect: false,
      },
      {
        id: 'a-8-16-4',
        text: 'Чтобы включить HTTP/3 на клиенте без изменения сервера',
        isCorrect: false,
      },
    ],
    explanation:
      'Lighthouse — быстрый аудит и рекомендации. WebPageTest полезен, когда нужно глубже: реальные профили устройств/сетей и детальная картинка загрузки (waterfall) с приоритетами.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-17',
    type: 'single',
    question:
      'Почему виртуализация списка (react-window/react-virtual) часто даёт больший эффект, чем “мемоизация всего”?',
    answers: [
      {
        id: 'a-8-17-1',
        text: 'Потому что она уменьшает количество реально созданных DOM‑узлов и работы по layout/paint, а не только количество ререндеров React',
        isCorrect: true,
      },
      {
        id: 'a-8-17-2',
        text: 'Потому что она автоматически переносит рендеринг на GPU',
        isCorrect: false,
      },
      {
        id: 'a-8-17-3',
        text: 'Потому что она отключает diffing Virtual DOM',
        isCorrect: false,
      },
      {
        id: 'a-8-17-4',
        text: 'Потому что она гарантирует отсутствие CLS',
        isCorrect: false,
      },
    ],
    explanation:
      'В больших списках “бутылочное горлышко” часто не в сравнении props, а в количестве элементов и DOM‑работе. Виртуализация уменьшает объём работы браузера, а не только React.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-18',
    type: 'multiple',
    question: 'Какие практики реально помогают уменьшать JS‑бандл?',
    answers: [
      {
        id: 'a-8-18-1',
        text: 'Code splitting (в т.ч. по роутам) и динамические импорты тяжёлых частей',
        isCorrect: true,
      },
      {
        id: 'a-8-18-2',
        text: 'Tree‑shaking и отказ от “баррельных” импортов всего пакета, если библиотека не дружит с tree‑shaking',
        isCorrect: true,
      },
      {
        id: 'a-8-18-3',
        text: 'Удаление неиспользуемого кода/зависимостей и анализ бандла (bundle analyzer)',
        isCorrect: true,
      },
      {
        id: 'a-8-18-4',
        text: 'Замена async/await на .then() для уменьшения размера JavaScript',
        isCorrect: false,
      },
    ],
    explanation:
      'Размер бандла обычно снижают архитектурными и сборочными техниками: разделение чанков, tree‑shaking, удаление зависимостей, оптимизация импортов. Переписывание async/await редко даёт системный эффект.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-19',
    type: 'single',
    question:
      'Почему React.memo не “спасёт” от ререндеров, если компонент читает значение из Context, которое часто меняется?',
    answers: [
      {
        id: 'a-8-19-1',
        text: 'Потому что обновление Context считается причиной ререндера независимо от равенства props, и memo сравнивает только props',
        isCorrect: true,
      },
      {
        id: 'a-8-19-2',
        text: 'Потому что React.memo работает только в Class Components',
        isCorrect: false,
      },
      {
        id: 'a-8-19-3',
        text: 'Потому что Context обновляется только на сервере, а memo — только на клиенте',
        isCorrect: false,
      },
      {
        id: 'a-8-19-4',
        text: 'Потому что memo отключает Virtual DOM и ломает reconciliation',
        isCorrect: false,
      },
    ],
    explanation:
      'memo — оптимизация по props. Если компонент подписан на context и значение меняется, React обязан обновить компонент. Чтобы уменьшить “радиус” обновлений, часто помогают селекторы/разделение контекстов.',
    chapterId: 'chapter-8-1',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-20',
    type: 'single',
    question:
      'Какой тип XSS описывает ситуацию “вредоносный код сохранили в БД и он исполняется у всех пользователей”?',
    answers: [
      {
        id: 'a-8-20-1',
        text: 'Stored XSS (хранимая)',
        isCorrect: true,
      },
      {
        id: 'a-8-20-2',
        text: 'Reflected XSS (отражённая)',
        isCorrect: false,
      },
      {
        id: 'a-8-20-3',
        text: 'DOM‑based XSS',
        isCorrect: false,
      },
      {
        id: 'a-8-20-4',
        text: 'CSRF',
        isCorrect: false,
      },
    ],
    explanation:
      'Stored XSS опаснее тем, что “живёт” в данных и бьёт по всем, кто просмотрит заражённый контент. Reflected обычно приходит через URL/ответ, DOM‑based — через клиентскую логику без участия сервера.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-21',
    type: 'single',
    question:
      'Почему хранение access‑токена в localStorage часто считают плохой практикой?',
    answers: [
      {
        id: 'a-8-21-1',
        text: 'При XSS злоумышленник может прочитать localStorage и украсть токен, после чего выполнять запросы от имени пользователя',
        isCorrect: true,
      },
      {
        id: 'a-8-21-2',
        text: 'localStorage автоматически отправляется на сервер как cookie и вызывает CSRF',
        isCorrect: false,
      },
      {
        id: 'a-8-21-3',
        text: 'localStorage работает только по HTTP, а не по HTTPS',
        isCorrect: false,
      },
      {
        id: 'a-8-21-4',
        text: 'Риск localStorage — XSS (JS может прочитать). В cookie риск другой: cookie отправляется автоматически и требует CSRF‑защиты. Неверно смешивать это как “localStorage уходит как cookie”',
        isCorrect: false,
      },
    ],
    explanation:
      'Основной риск — XSS. Если атакующий исполнил JS в вашем origin, он может утащить токен из localStorage. Поэтому часто предпочитают HttpOnly cookies + корректную стратегию CSRF.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-22',
    type: 'multiple',
    question: 'Какие меры реально снижают риск CSRF при cookie‑авторизации?',
    answers: [
      {
        id: 'a-8-22-1',
        text: 'CSRF‑токены (synchronizer token / double submit cookie — в зависимости от схемы)',
        isCorrect: true,
      },
      {
        id: 'a-8-22-2',
        text: 'SameSite cookies (Lax/Strict) и корректные настройки домена/пути',
        isCorrect: true,
      },
      {
        id: 'a-8-22-3',
        text: 'Проверка Origin/Referer на сервере для state‑changing запросов',
        isCorrect: true,
      },
      {
        id: 'a-8-22-4',
        text: 'HttpOnly cookie как основная защита от CSRF',
        isCorrect: false,
      },
    ],
    explanation:
      'HttpOnly защищает от чтения cookie через JS (то есть помогает против XSS‑кражи), но не решает CSRF, потому что браузер и так отправит cookie автоматически. CSRF решают токены, SameSite и проверки Origin/Referer.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-23',
    type: 'single',
    question:
      'Почему CORS не является “защитой API от чужих запросов” в общем смысле?',
    answers: [
      {
        id: 'a-8-23-1',
        text: 'Потому что CORS ограничивает доступ только в браузере (SOP), а запросы с сервера (curl/backend) CORS не блокирует',
        isCorrect: true,
      },
      {
        id: 'a-8-23-2',
        text: 'Потому что CORS работает только для GET‑запросов, а POST не затрагивает',
        isCorrect: false,
      },
      {
        id: 'a-8-23-3',
        text: 'Потому что CORS включается только при HTTPS',
        isCorrect: false,
      },
      {
        id: 'a-8-23-4',
        text: 'Потому что CORS всегда отключён в современных браузерах',
        isCorrect: false,
      },
    ],
    explanation:
      'CORS — механизм браузера, а не firewall. Он мешает странице с другого origin читать ответы, но не предотвращает сам факт отправки запросов извне и не защищает API от сервер‑сайд клиентов.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-24',
    type: 'single',
    question:
      'Что произойдёт в браузере, если сервер ответит CORS‑заголовками Access-Control-Allow-Origin: * и одновременно Access-Control-Allow-Credentials: true?',
    answers: [
      {
        id: 'a-8-24-1',
        text: 'Браузер заблокирует доступ к ответу: при credentials нельзя использовать * — нужен конкретный origin',
        isCorrect: true,
      },
      {
        id: 'a-8-24-2',
        text: 'Это “самая безопасная” конфигурация: разрешает только доверенные сайты',
        isCorrect: false,
      },
      {
        id: 'a-8-24-3',
        text: 'Ничего особенного: браузер примет ответ и отправит cookies на любой origin',
        isCorrect: false,
      },
      {
        id: 'a-8-24-4',
        text: 'Сработает только в HTTP/2, а в HTTP/1.1 будет ошибка',
        isCorrect: false,
      },
    ],
    explanation:
      'При credentialed‑запросах спецификация требует явного origin в `Access-Control-Allow-Origin`. Комбинация `*` + `Allow-Credentials: true` приводит к блокировке браузером.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-25',
    type: 'multiple',
    question:
      'Какие cookie‑атрибуты и от чего они защищают (в первую очередь)?',
    answers: [
      {
        id: 'a-8-25-1',
        text: 'HttpOnly — снижает риск кражи cookie через XSS (JS не может прочитать cookie)',
        isCorrect: true,
      },
      {
        id: 'a-8-25-2',
        text: 'Secure — запрещает передачу cookie по HTTP (только HTTPS)',
        isCorrect: true,
      },
      {
        id: 'a-8-25-3',
        text: 'SameSite — снижает риск CSRF, ограничивая отправку cookie в кросс‑сайт контексте',
        isCorrect: true,
      },
      {
        id: 'a-8-25-4',
        text: 'HttpOnly — основная защита от CSRF',
        isCorrect: false,
      },
    ],
    explanation:
      'Важно разделять модели угроз: HttpOnly — про XSS‑доступ к cookie, SameSite/CSRF‑токены — про CSRF, Secure — про транспорт (HTTPS).',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-26',
    type: 'multiple',
    question:
      'Какие практики уменьшают риск XSS при рендеринге пользовательского контента в React?',
    answers: [
      {
        id: 'a-8-26-1',
        text: 'Избегать dangerouslySetInnerHTML для непроверенного ввода; предпочитать безопасные форматы (например, Markdown → контролируемый HTML)',
        isCorrect: true,
      },
      {
        id: 'a-8-26-2',
        text: 'Санитизировать HTML (например, на сервере) и хранить уже очищенную версию',
        isCorrect: true,
      },
      {
        id: 'a-8-26-3',
        text: 'Настроить CSP так, чтобы ограничить источники скриптов и запретить inline‑скрипты там, где возможно',
        isCorrect: true,
      },
      {
        id: 'a-8-26-4',
        text: 'Положиться только на то, что “React экранирует всё”, даже если вы вставляете HTML строкой',
        isCorrect: false,
      },
    ],
    explanation:
      'React экранирует значения при обычном рендеринге, но `dangerouslySetInnerHTML` вставляет HTML напрямую. Поэтому нужны санитизация и защита на уровне политики (CSP), а также осторожность с источниками данных.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'hard',
  },
  {
    id: 'q-8-27',
    type: 'single',
    question: 'Что означает SameSite=Lax в контексте cookies?',
    answers: [
      {
        id: 'a-8-27-1',
        text: 'Cookie обычно не отправляется в кросс‑сайт контексте, но может отправляться при “безопасной” навигации верхнего уровня (например, переход по ссылке)',
        isCorrect: true,
      },
      {
        id: 'a-8-27-2',
        text: 'Cookie всегда отправляется на любые домены, если запрос GET',
        isCorrect: false,
      },
      {
        id: 'a-8-27-3',
        text: 'Cookie никогда не отправляется даже на ваш домен, если вкладка была открыта из другой вкладки',
        isCorrect: false,
      },
      {
        id: 'a-8-27-4',
        text: 'Cookie отправляется только из Service Worker',
        isCorrect: false,
      },
    ],
    explanation:
      'SameSite=Lax — компромисс между UX и защитой от CSRF: cookie не “льётся” на большинство кросс‑сайт запросов, но остаётся совместимым с обычной навигацией пользователя.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-28',
    type: 'single',
    question:
      'Какой практический недостаток JWT чаще всего называют в контексте “stateless авторизации”?',
    answers: [
      {
        id: 'a-8-28-1',
        text: 'Сложнее “отозвать” токен до истечения срока (revocation), если он утёк, без дополнительной серверной инфраструктуры',
        isCorrect: true,
      },
      {
        id: 'a-8-28-2',
        text: 'JWT нельзя использовать по HTTPS — только по HTTP',
        isCorrect: false,
      },
      {
        id: 'a-8-28-3',
        text: 'JWT — это формат токена, а не механизм хранения. Безопасность зависит от того, где и как вы его храните/передаёте; сам по себе JWT не “защищает” от XSS/CSRF',
        isCorrect: false,
      },
      {
        id: 'a-8-28-4',
        text: 'JWT всегда меньше по размеру, чем session id',
        isCorrect: false,
      },
    ],
    explanation:
      'JWT удобен (stateless), но у него есть цена: отзыв/инвалидация сложнее, токен может быть крупнее, а при утечке он часто валиден до expiry. Поэтому часто используют короткий access + refresh‑механику.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'medium',
  },
  {
    id: 'q-8-29',
    type: 'single',
    question:
      'Почему связка “короткий access‑токен + refresh‑токен” часто считается более безопасной, чем один долгоживущий токен?',
    answers: [
      {
        id: 'a-8-29-1',
        text: 'Потому что окно для злоупотребления украденным access‑токеном меньше, а refresh можно ротировать/ограничивать и хранить безопаснее (например, HttpOnly)',
        isCorrect: true,
      },
      {
        id: 'a-8-29-2',
        text: 'Refresh‑токен можно украсть (особенно при XSS/компрометации устройства). Идея схемы — сузить окно атаки и дать механизмы ротации/отзыва, а не “невозможность кражи”',
        isCorrect: false,
      },
      {
        id: 'a-8-29-3',
        text: 'Потому что access‑токен не нужен в API‑запросах — он только для UI',
        isCorrect: false,
      },
      {
        id: 'a-8-29-4',
        text: 'Потому что два токена автоматически отключают CORS',
        isCorrect: false,
      },
    ],
    explanation:
      'Короткий access снижает ущерб от утечки. Refresh позволяет обновлять сессию, при этом его можно хранить и защищать строже (HttpOnly, Secure, SameSite) и применять ротацию/инвалидацию.',
    chapterId: 'chapter-8-2',
    partId: 'part-8',
    difficulty: 'hard',
  },
]
