import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части VI. React и SPA
 */
export const part6Questions: QuizQuestion[] = [
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
        text: 'useReducer стоит выбирать всегда, когда состояние — объект: так легче гарантировать иммутабельность и избежать лишних ререндеров',
        isCorrect: false,
      },
      {
        id: 'a-6-3-3',
        text: 'useReducer нужен, когда важно “сразу” получить актуальный state после dispatch, а useState даёт stale state внутри того же обработчика',
        isCorrect: false,
      },
      {
        id: 'a-6-3-4',
        text: 'useReducer полезен, когда обновления зависят от предыдущего состояния и могут приходить “пачкой”: reducer снижает риск ошибок из‑за stale closures',
        isCorrect: false,
      },
    ],
    explanation:
      'useState подходит для простого локального состояния, а useReducer лучше использовать для сложной логики с множественными подсостояниями и предсказуемыми обновлениями через actions.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
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
        text: 'useLayoutEffect полезнее для визуальной стабильности, потому что выполняется до paint; useEffect может вызывать “мигание” — но это не значит, что useLayoutEffect безопасно ставить везде',
        isCorrect: false,
      },
      {
        id: 'a-6-5-4',
        text: 'useLayoutEffect стоит выбирать для эффектов, которые должны синхронно изменить layout (например, измерение и запись стилей), иначе возможен layout shift',
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
  {
    id: 'q-6-8',
    type: 'single',
    question: 'Что такое Feature-Sliced Design (FSD)?',
    answers: [
      {
        id: 'a-6-8-1',
        text: 'Архитектурная методология для организации кода фронтенд-приложений по слоям и фичам',
        isCorrect: true,
      },
      {
        id: 'a-6-8-2',
        text: 'Библиотека для управления состоянием в React',
        isCorrect: false,
      },
      {
        id: 'a-6-8-3',
        text: 'Способ оптимизации бандла приложения',
        isCorrect: false,
      },
      {
        id: 'a-6-8-4',
        text: 'Методология тестирования React-компонентов',
        isCorrect: false,
      },
    ],
    explanation:
      'FSD — это архитектурная методология, которая организует код по слоям (app, pages, widgets, features, entities, shared) и слайсам (фичам), обеспечивая масштабируемость.',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-9',
    type: 'multiple',
    question:
      'Какие паттерны используются для управления состоянием в больших React-приложениях?',
    answers: [
      {
        id: 'a-6-9-1',
        text: 'Context API для глобального состояния',
        isCorrect: true,
      },
      {
        id: 'a-6-9-2',
        text: 'Redux / Redux Toolkit',
        isCorrect: true,
      },
      {
        id: 'a-6-9-3',
        text: 'TanStack Query (React Query) для серверного состояния',
        isCorrect: true,
      },
      {
        id: 'a-6-9-4',
        text: 'Zustand',
        isCorrect: true,
      },
      {
        id: 'a-6-9-5',
        text: 'Только useState для всего состояния',
        isCorrect: false,
      },
    ],
    explanation:
      'Для управления состоянием используются: Context API (простое глобальное состояние), Redux (сложное состояние), TanStack Query (серверное состояние), Zustand (легковесная альтернатива).',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-10',
    type: 'single',
    question: 'В чём разница между Controlled и Uncontrolled компонентами?',
    answers: [
      {
        id: 'a-6-10-1',
        text: 'Controlled: состояние управляется React через props; Uncontrolled: состояние управляется DOM через refs',
        isCorrect: true,
      },
      {
        id: 'a-6-10-2',
        text: 'Controlled: для форм, Uncontrolled: для обычных компонентов',
        isCorrect: false,
      },
      {
        id: 'a-6-10-3',
        text: 'Uncontrolled‑inputs удобнее, когда нужно минимизировать ререндеры на каждый ввод, но это усложняет синхронную валидацию “на лету”',
        isCorrect: false,
      },
      {
        id: 'a-6-10-4',
        text: 'В controlled‑формах проще делать валидацию/маски и зависимые поля, но uncontrolled часто легче интегрировать с нативными API формы',
        isCorrect: false,
      },
    ],
    explanation:
      'Controlled компоненты управляются React через props (value + onChange). Uncontrolled компоненты управляются DOM через refs. Controlled даёт больше контроля, Uncontrolled проще для простых случаев.',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-11',
    type: 'single',
    question: 'В чём разница между SSR, SSG и ISR?',
    answers: [
      {
        id: 'a-6-11-1',
        text: 'SSR — рендеринг на сервере при каждом запросе; SSG — статическая генерация на этапе сборки; ISR — инкрементальная регенерация статических страниц',
        isCorrect: true,
      },
      {
        id: 'a-6-11-2',
        text: 'SSR для статики, SSG для динамики, ISR для гибрида',
        isCorrect: false,
      },
      {
        id: 'a-6-11-3',
        text: 'SSG хорошо работает, когда данные меняются редко: можно использовать CDN‑кэш и получить быстрый TTFB, но цена — сложнее актуализировать контент без ISR/ревалидации',
        isCorrect: false,
      },
      {
        id: 'a-6-11-4',
        text: 'SSR/SSG/ISR отличаются в первую очередь “когда формируется HTML”; кэширование возможно в любом подходе, но стратегия (и инвалидация) будет разной',
        isCorrect: false,
      },
    ],
    explanation:
      'SSR рендерит на сервере при каждом запросе. SSG генерирует статические HTML на этапе сборки. ISR периодически регенерирует статические страницы в фоне.',
    chapterId: 'chapter-6-4',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-12',
    type: 'single',
    question: 'Что такое hydration в контексте SSR?',
    answers: [
      {
        id: 'a-6-12-1',
        text: 'Процесс "оживления" статического HTML на клиенте, когда React подключается к уже отрендеренному HTML',
        isCorrect: true,
      },
      {
        id: 'a-6-12-2',
        text: 'Процесс загрузки JavaScript-бандла на клиенте',
        isCorrect: false,
      },
      {
        id: 'a-6-12-3',
        text: 'Процесс кэширования HTML на сервере',
        isCorrect: false,
      },
      {
        id: 'a-6-12-4',
        text: 'Процесс оптимизации размера бандла',
        isCorrect: false,
      },
    ],
    explanation:
      'Hydration — это процесс, когда React на клиенте "оживляет" статический HTML, добавляя обработчики событий и делая интерфейс интерактивным. HTML должен совпадать между сервером и клиентом.',
    chapterId: 'chapter-6-4',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-13',
    type: 'single',
    question: 'Что такое React.memo()?',
    answers: [
      {
        id: 'a-6-13-1',
        text: 'HOC, который предотвращает ререндер компонента, если пропсы не изменились',
        isCorrect: true,
      },
      {
        id: 'a-6-13-2',
        text: 'Хук для мемоизации значений',
        isCorrect: false,
      },
      {
        id: 'a-6-13-3',
        text: 'Способ создания компонентов',
        isCorrect: false,
      },
      {
        id: 'a-6-13-4',
        text: 'Механизм для кэширования компонентов',
        isCorrect: false,
      },
    ],
    explanation:
      'React.memo() — это HOC, который мемоизирует компонент и предотвращает ререндер, если пропсы не изменились (поверхностное сравнение). Полезен для оптимизации дорогих компонентов.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-14',
    type: 'single',
    question: 'В чём разница между useMemo и useCallback?',
    answers: [
      {
        id: 'a-6-14-1',
        text: 'useMemo мемоизирует результат вычисления, useCallback мемоизирует функцию',
        isCorrect: true,
      },
      {
        id: 'a-6-14-2',
        text: 'useMemo для значений, useCallback для компонентов',
        isCorrect: false,
      },
      {
        id: 'a-6-14-3',
        text: 'useMemo предотвращает ререндеры дочерних компонентов, а useCallback предотвращает “дорогие вычисления” в JSX',
        isCorrect: false,
      },
      {
        id: 'a-6-14-4',
        text: 'useCallback мемоизирует результат вычисления, а useMemo мемоизирует функцию-коллбек',
        isCorrect: false,
      },
    ],
    explanation:
      'useMemo мемоизирует результат вычисления (const value = useMemo(() => expensive(), [deps])). useCallback мемоизирует функцию (const fn = useCallback(() => {}, [deps])). Оба принимают массив зависимостей.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-15',
    type: 'single',
    question: 'Что такое Context API в React?',
    answers: [
      {
        id: 'a-6-15-1',
        text: 'Механизм для передачи данных через дерево компонентов без пропсов на каждом уровне',
        isCorrect: true,
      },
      {
        id: 'a-6-15-2',
        text: 'API для работы с внешними сервисами',
        isCorrect: false,
      },
      {
        id: 'a-6-15-3',
        text: 'Механизм для кэширования данных',
        isCorrect: false,
      },
      {
        id: 'a-6-15-4',
        text: 'Способ оптимизации производительности',
        isCorrect: false,
      },
    ],
    explanation:
      'Context API позволяет передавать данные через дерево компонентов без пропсов. Создаётся через createContext(), используется через Provider и useContext(). Полезен для темы, языка, аутентификации.',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-16',
    type: 'single',
    question: 'Что такое React.lazy() и Suspense?',
    answers: [
      {
        id: 'a-6-16-1',
        text: 'React.lazy() для ленивой загрузки компонентов, Suspense для отображения fallback во время загрузки',
        isCorrect: true,
      },
      {
        id: 'a-6-16-2',
        text: 'React.lazy() для оптимизации, Suspense для анимаций',
        isCorrect: false,
      },
      {
        id: 'a-6-16-3',
        text: 'Suspense нужен именно для того, чтобы показать fallback при ленивой загрузке; без него lazy‑компонент не сможет корректно “подвесить” рендер',
        isCorrect: false,
      },
      {
        id: 'a-6-16-4',
        text: 'Suspense исторически применялся для lazy‑компонентов; data fetching через Suspense — отдельный режим и зависит от конкретных решений/фреймворка',
        isCorrect: false,
      },
    ],
    explanation:
      'React.lazy() позволяет лениво загружать компоненты (code splitting). Suspense отображает fallback во время загрузки. Пример: const Lazy = React.lazy(() => import("./Component")); <Suspense fallback={<Spinner />}><Lazy /></Suspense>',
    chapterId: 'chapter-6-4',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-17',
    type: 'single',
    question: 'Что такое key в React и зачем он нужен?',
    answers: [
      {
        id: 'a-6-17-1',
        text: 'Уникальный идентификатор для элементов списка, помогает React отслеживать изменения и оптимизировать обновления',
        isCorrect: true,
      },
      {
        id: 'a-6-17-2',
        text: 'Способ стилизации элементов',
        isCorrect: false,
      },
      {
        id: 'a-6-17-3',
        text: 'Механизм для работы с формами',
        isCorrect: false,
      },
      {
        id: 'a-6-17-4',
        text: 'Способ оптимизации бандла',
        isCorrect: false,
      },
    ],
    explanation:
      'key помогает React идентифицировать элементы списка и эффективно обновлять DOM. Должен быть уникальным и стабильным. Использование index как key может вызвать проблемы при изменении порядка элементов.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'easy',
  },
  {
    id: 'q-6-18',
    type: 'single',
    question: 'Что такое ref в React?',
    answers: [
      {
        id: 'a-6-18-1',
        text: 'Механизм для получения прямого доступа к DOM-элементу или экземпляру компонента',
        isCorrect: true,
      },
      {
        id: 'a-6-18-2',
        text: 'Способ передачи данных между компонентами',
        isCorrect: false,
      },
      {
        id: 'a-6-18-3',
        text: 'Механизм для кэширования',
        isCorrect: false,
      },
      {
        id: 'a-6-18-4',
        text: 'Способ оптимизации производительности',
        isCorrect: false,
      },
    ],
    explanation:
      'ref позволяет получить прямой доступ к DOM-элементу или экземпляру классового компонента. Создаётся через useRef() или createRef(). Используется для фокуса, измерений, интеграции с библиотеками.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-19',
    type: 'single',
    question: 'Что такое custom hooks в React?',
    answers: [
      {
        id: 'a-6-19-1',
        text: 'Функции, которые начинаются с use и могут использовать другие хуки для переиспользования логики',
        isCorrect: true,
      },
      {
        id: 'a-6-19-2',
        text: 'Специальные хуки для работы с API',
        isCorrect: false,
      },
      {
        id: 'a-6-19-3',
        text: 'Хуки для оптимизации производительности',
        isCorrect: false,
      },
      {
        id: 'a-6-19-4',
        text: 'Встроенные хуки React',
        isCorrect: false,
      },
    ],
    explanation:
      'Custom hooks — функции, начинающиеся с use, которые инкапсулируют логику с использованием других хуков. Позволяют переиспользовать логику между компонентами. Пример: useFetch, useLocalStorage.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-20',
    type: 'single',
    question: 'Что такое Next.js и чем он отличается от обычного React?',
    answers: [
      {
        id: 'a-6-20-1',
        text: 'Next.js — фреймворк на основе React с SSR, SSG, роутингом и оптимизацией из коробки',
        isCorrect: true,
      },
      {
        id: 'a-6-20-2',
        text: 'Next.js ускоряет приложение, потому что отключает reconciliation в React и обновляет DOM напрямую',
        isCorrect: false,
      },
      {
        id: 'a-6-20-3',
        text: 'Next.js для бэкенда, React для фронтенда',
        isCorrect: false,
      },
      {
        id: 'a-6-20-4',
        text: 'React — это фреймворк с роутингом и SSR из коробки, а Next.js — библиотека только для UI-компонентов',
        isCorrect: false,
      },
    ],
    explanation:
      'Next.js — фреймворк на React с SSR/SSG, файловым роутингом, оптимизацией изображений, API routes. React — библиотека для UI. Next.js добавляет серверный рендеринг и инструменты для продакшена.',
    chapterId: 'chapter-6-4',
    partId: 'part-6',
    difficulty: 'easy',
  },
  {
    id: 'q-6-21',
    type: 'single',
    question: 'Что такое правила хуков (Rules of Hooks) в React?',
    answers: [
      {
        id: 'a-6-21-1',
        text: 'Хуки можно вызывать только на верхнем уровне компонента, не в условиях, циклах или вложенных функциях',
        isCorrect: true,
      },
      {
        id: 'a-6-21-2',
        text: 'Хуки можно вызывать только в функциональных компонентах',
        isCorrect: false,
      },
      {
        id: 'a-6-21-3',
        text: 'Хуки можно вызывать только один раз',
        isCorrect: false,
      },
      {
        id: 'a-6-21-4',
        text: 'Хуки можно вызывать где угодно',
        isCorrect: false,
      },
    ],
    explanation:
      'Правила хуков: 1) вызывать только на верхнем уровне (не в условиях/циклах), 2) вызывать только из React-функций (компоненты или кастомные хуки). Это нужно для сохранения порядка хуков между рендерами.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-22',
    type: 'single',
    question: 'Что такое useRef и когда его использовать?',
    answers: [
      {
        id: 'a-6-22-1',
        text: 'Хук для создания мутабельной ссылки, которая сохраняется между рендерами и не вызывает ререндер при изменении',
        isCorrect: true,
      },
      {
        id: 'a-6-22-2',
        text: 'Хук для создания ссылок на DOM-элементы',
        isCorrect: false,
      },
      {
        id: 'a-6-22-3',
        text: 'Хук для работы с формами',
        isCorrect: false,
      },
      {
        id: 'a-6-22-4',
        text: 'Хук для кэширования значений',
        isCorrect: false,
      },
    ],
    explanation:
      'useRef создаёт мутабельную ссылку. Используется для: 1) доступа к DOM (const inputRef = useRef(null)), 2) хранения значений между рендерами без ререндера (const prevValue = useRef()). Изменение .current не вызывает ререндер.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-23',
    type: 'single',
    question: 'Что такое useReducer и когда его использовать вместо useState?',
    answers: [
      {
        id: 'a-6-23-1',
        text: 'useReducer для сложного состояния с множественными подсостояниями и предсказуемыми обновлениями через actions; useState для простого состояния',
        isCorrect: true,
      },
      {
        id: 'a-6-23-2',
        text: 'useReducer для объектов, useState для примитивов',
        isCorrect: false,
      },
      {
        id: 'a-6-23-3',
        text: 'useReducer нужен, чтобы React мог “склеивать” (batch) обновления; с useState батчинга нет',
        isCorrect: false,
      },
      {
        id: 'a-6-23-4',
        text: 'useReducer гарантирует, что компонент будет ререндериться реже, чем при useState, независимо от логики обновлений',
        isCorrect: false,
      },
    ],
    explanation:
      'useReducer подходит для сложного состояния (множественные подсостояния, связанные обновления). Паттерн: state + action → новый state. useState для простого локального состояния. useReducer ближе к Redux-паттерну.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-24',
    type: 'single',
    question: 'Что такое useImperativeHandle?',
    answers: [
      {
        id: 'a-6-24-1',
        text: 'Хук, который позволяет настроить значение ref, которое передаётся родительскому компоненту через forwardRef',
        isCorrect: true,
      },
      {
        id: 'a-6-24-2',
        text: 'Хук для работы с событиями',
        isCorrect: false,
      },
      {
        id: 'a-6-24-3',
        text: 'Механизм для кэширования',
        isCorrect: false,
      },
      {
        id: 'a-6-24-4',
        text: 'Способ оптимизации',
        isCorrect: false,
      },
    ],
    explanation:
      'useImperativeHandle настраивает, какие методы/свойства доступны родителю через ref. Используется с forwardRef. Позволяет скрыть внутреннюю реализацию и предоставить только нужный API. Редко используется.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-25',
    type: 'single',
    question:
      'Что такое useLayoutEffect и когда его использовать вместо useEffect?',
    answers: [
      {
        id: 'a-6-25-1',
        text: 'useLayoutEffect выполняется синхронно перед отрисовкой браузера; useEffect асинхронно после. Используй useLayoutEffect для измерений DOM и предотвращения мерцания',
        isCorrect: true,
      },
      {
        id: 'a-6-25-2',
        text: 'useLayoutEffect для функциональных компонентов, useEffect для классовых',
        isCorrect: false,
      },
      {
        id: 'a-6-25-3',
        text: 'useLayoutEffect нужен только для подписок (events), а useEffect — только для измерений DOM (getBoundingClientRect)',
        isCorrect: false,
      },
      {
        id: 'a-6-25-4',
        text: 'useLayoutEffect выполняется после отрисовки (paint), но до выполнения microtasks, поэтому он “не блокирует” UI',
        isCorrect: false,
      },
    ],
    explanation:
      'useLayoutEffect выполняется синхронно перед отрисовкой, блокируя браузер. useEffect асинхронно после отрисовки. useLayoutEffect для: измерений DOM, предотвращения мерцания, синхронных обновлений перед отрисовкой.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-26',
    type: 'single',
    question: 'Что такое useCallback и когда его использовать?',
    answers: [
      {
        id: 'a-6-26-1',
        text: 'Хук для мемоизации функции, предотвращает создание новой функции при каждом рендере, полезен для оптимизации дочерних компонентов',
        isCorrect: true,
      },
      {
        id: 'a-6-26-2',
        text: 'Хук для кэширования значений',
        isCorrect: false,
      },
      {
        id: 'a-6-26-3',
        text: 'Хук для работы с колбэками',
        isCorrect: false,
      },
      {
        id: 'a-6-26-4',
        text: 'Хук для оптимизации производительности',
        isCorrect: false,
      },
    ],
    explanation:
      'useCallback мемоизирует функцию. const fn = useCallback(() => {}, [deps]). Полезен когда функция передаётся в memo-компонент или используется в зависимостях других хуков. Не нужен, если функция не передаётся дальше.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-27',
    type: 'single',
    question: 'Что такое useMemo и когда его использовать?',
    answers: [
      {
        id: 'a-6-27-1',
        text: 'Хук для мемоизации результата вычисления, пересчитывает только при изменении зависимостей, полезен для дорогих вычислений',
        isCorrect: true,
      },
      {
        id: 'a-6-27-2',
        text: 'Хук для мемоизации функций',
        isCorrect: false,
      },
      {
        id: 'a-6-27-3',
        text: 'Хук для кэширования компонентов',
        isCorrect: false,
      },
      {
        id: 'a-6-27-4',
        text: 'Хук для оптимизации всех вычислений',
        isCorrect: false,
      },
    ],
    explanation:
      'useMemo мемоизирует результат: const value = useMemo(() => expensive(), [deps]). Пересчитывается только при изменении deps. Используй для дорогих вычислений, стабильных ссылок на объекты/массивы. Не нужен для простых вычислений.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-28',
    type: 'single',
    question: 'Что такое forwardRef в React?',
    answers: [
      {
        id: 'a-6-28-1',
        text: 'HOC, который позволяет компоненту получать ref и передавать его дочернему элементу',
        isCorrect: true,
      },
      {
        id: 'a-6-28-2',
        text: 'Хук для работы с refs',
        isCorrect: false,
      },
      {
        id: 'a-6-28-3',
        text: 'Механизм для кэширования refs',
        isCorrect: false,
      },
      {
        id: 'a-6-28-4',
        text: 'Способ оптимизации',
        isCorrect: false,
      },
    ],
    explanation:
      'forwardRef позволяет компоненту получать ref от родителя и передавать его дочернему элементу. const Input = forwardRef((props, ref) => <input ref={ref} />). Полезен для библиотечных компонентов, где нужен доступ к DOM.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-29',
    type: 'single',
    question: 'Что такое React.memo и как он работает?',
    answers: [
      {
        id: 'a-6-29-1',
        text: 'HOC, который мемоизирует компонент и предотвращает ререндер, если пропсы не изменились (поверхностное сравнение)',
        isCorrect: true,
      },
      {
        id: 'a-6-29-2',
        text: 'Хук для мемоизации компонентов',
        isCorrect: false,
      },
      {
        id: 'a-6-29-3',
        text: 'Механизм для кэширования компонентов',
        isCorrect: false,
      },
      {
        id: 'a-6-29-4',
        text: 'Способ оптимизации всех компонентов',
        isCorrect: false,
      },
    ],
    explanation:
      'React.memo мемоизирует компонент: const MemoComponent = React.memo(Component). Предотвращает ререндер, если пропсы не изменились (поверхностное сравнение). Можно передать кастомную функцию сравнения вторым аргументом.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-30',
    type: 'single',
    question: 'Что такое проп-дриллинг (prop drilling) и как его решить?',
    answers: [
      {
        id: 'a-6-30-1',
        text: 'Проблема передачи пропсов через множество промежуточных компонентов; решается через Context API, композицию компонентов или state management',
        isCorrect: true,
      },
      {
        id: 'a-6-30-2',
        text: 'Проблема с производительностью пропсов',
        isCorrect: false,
      },
      {
        id: 'a-6-30-3',
        text: 'Механизм для оптимизации пропсов',
        isCorrect: false,
      },
      {
        id: 'a-6-30-4',
        text: 'Способ передачи данных',
        isCorrect: false,
      },
    ],
    explanation:
      'Prop drilling — передача пропсов через компоненты, которым они не нужны. Решения: Context API (для глобального состояния), композиция компонентов (children, render props), state management (Redux, Zustand).',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-31',
    type: 'single',
    question: 'Что такое Redux и зачем он нужен?',
    answers: [
      {
        id: 'a-6-31-1',
        text: 'Библиотека для управления глобальным состоянием приложения через единое хранилище, actions и reducers',
        isCorrect: true,
      },
      {
        id: 'a-6-31-2',
        text: 'Библиотека для работы с API',
        isCorrect: false,
      },
      {
        id: 'a-6-31-3',
        text: 'Механизм для кэширования данных',
        isCorrect: false,
      },
      {
        id: 'a-6-31-4',
        text: 'Способ оптимизации React',
        isCorrect: false,
      },
    ],
    explanation:
      'Redux — предсказуемый state container. Принципы: единое хранилище, иммутабельные обновления, однонаправленный поток данных (Action → Reducer → Store → View). Полезен для сложного глобального состояния.',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-32',
    type: 'single',
    question: 'Что такое Redux Toolkit и чем он отличается от обычного Redux?',
    answers: [
      {
        id: 'a-6-32-1',
        text: 'Redux Toolkit — современный способ работы с Redux, уменьшает boilerplate, использует Immer для иммутабельности, включает лучшие практики из коробки',
        isCorrect: true,
      },
      {
        id: 'a-6-32-2',
        text: 'Redux Toolkit быстрее Redux, потому что “встроенно” делает селекторы мемоизированными и React не ререндерится при изменении store',
        isCorrect: false,
      },
      {
        id: 'a-6-32-3',
        text: 'Redux Toolkit для новых проектов, Redux для старых',
        isCorrect: false,
      },
      {
        id: 'a-6-32-4',
        text: 'Redux Toolkit — отдельный state manager, несовместимый с Redux (нельзя использовать существующие reducers/actions)',
        isCorrect: false,
      },
    ],
    explanation:
      'Redux Toolkit (RTK) — официальный способ работы с Redux. createSlice объединяет actions и reducers, Immer позволяет мутабельный код, configureStore настраивает всё автоматически. Меньше boilerplate, больше удобства.',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-33',
    type: 'single',
    question: 'Что такое TanStack Query (React Query) и зачем он нужен?',
    answers: [
      {
        id: 'a-6-33-1',
        text: 'Библиотека для управления server state: кэширование, синхронизация, инвалидация, автоматические запросы при фокусе/реконнекте',
        isCorrect: true,
      },
      {
        id: 'a-6-33-2',
        text: 'Библиотека для работы с базами данных',
        isCorrect: false,
      },
      {
        id: 'a-6-33-3',
        text: 'Механизм для кэширования компонентов',
        isCorrect: false,
      },
      {
        id: 'a-6-33-4',
        text: 'Способ оптимизации запросов',
        isCorrect: false,
      },
    ],
    explanation:
      'TanStack Query управляет server state: кэширование, автоматические запросы, синхронизация, инвалидация, оптимистичные обновления. Решает проблемы дублирования запросов, устаревших данных, сложной логики загрузки.',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-34',
    type: 'single',
    question: 'Что такое Zustand и чем он отличается от Redux?',
    answers: [
      {
        id: 'a-6-34-1',
        text: 'Zustand — минималистичный state manager без boilerplate, проще Redux, но менее структурированный',
        isCorrect: true,
      },
      {
        id: 'a-6-34-2',
        text: 'Zustand быстрее Redux, потому что подписчики всегда получают только изменённые поля (partial updates) без участия React',
        isCorrect: false,
      },
      {
        id: 'a-6-34-3',
        text: 'Zustand для малых проектов, Redux для больших',
        isCorrect: false,
      },
      {
        id: 'a-6-34-4',
        text: 'Zustand требует строго reducers/actions как в Redux, иначе обновления не будут работать корректно',
        isCorrect: false,
      },
    ],
    explanation:
      'Zustand — простой state manager: create((set) => ({ count: 0, increment: () => set((s) => ({ count: s.count + 1 })) })). Меньше boilerplate, проще API, но менее структурирован, чем Redux. Хорош для средних проектов.',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-35',
    type: 'single',
    question: 'Что такое render props паттерн в React?',
    answers: [
      {
        id: 'a-6-35-1',
        text: 'Паттерн, при котором компонент принимает функцию как проп и вызывает её для рендера содержимого',
        isCorrect: true,
      },
      {
        id: 'a-6-35-2',
        text: 'Паттерн для работы с пропсами',
        isCorrect: false,
      },
      {
        id: 'a-6-35-3',
        text: 'Механизм для оптимизации рендеринга',
        isCorrect: false,
      },
      {
        id: 'a-6-35-4',
        text: 'Способ создания компонентов',
        isCorrect: false,
      },
    ],
    explanation:
      'Render props: компонент принимает функцию как проп и вызывает её с данными. <DataProvider render={(data) => <Display data={data} />} />. Позволяет переиспользовать логику. Часто заменяется кастомными хуками.',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-36',
    type: 'single',
    question: 'Что такое Higher-Order Component (HOC) в React?',
    answers: [
      {
        id: 'a-6-36-1',
        text: 'Функция, которая принимает компонент и возвращает новый компонент с дополнительной функциональностью',
        isCorrect: true,
      },
      {
        id: 'a-6-36-2',
        text: 'Компонент высшего порядка для работы с данными',
        isCorrect: false,
      },
      {
        id: 'a-6-36-3',
        text: 'Механизм для оптимизации компонентов',
        isCorrect: false,
      },
      {
        id: 'a-6-36-4',
        text: 'Способ создания компонентов',
        isCorrect: false,
      },
    ],
    explanation:
      'HOC — функция компонента → компонент. Пример: const withAuth = (Component) => (props) => isAuth ? <Component {...props} /> : <Login />. Позволяет переиспользовать логику. Часто заменяется кастомными хуками.',
    chapterId: 'chapter-6-3',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-37',
    type: 'single',
    question: 'Что такое React Portal?',
    answers: [
      {
        id: 'a-6-37-1',
        text: 'Механизм для рендеринга дочерних элементов в DOM-узел вне иерархии родительского компонента',
        isCorrect: true,
      },
      {
        id: 'a-6-37-2',
        text: 'Механизм для работы с портами',
        isCorrect: false,
      },
      {
        id: 'a-6-37-3',
        text: 'Способ оптимизации рендеринга',
        isCorrect: false,
      },
      {
        id: 'a-6-37-4',
        text: 'Механизм для работы с модалками',
        isCorrect: false,
      },
    ],
    explanation:
      'Portal рендерит элемент вне иерархии: createPortal(children, domNode). Полезен для модалок, тултипов, которые должны быть вне z-index контекста родителя. События всё ещё всплывают по React-дереву.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-38',
    type: 'single',
    question: 'Что такое Error Boundaries в React?',
    answers: [
      {
        id: 'a-6-38-1',
        text: 'Компоненты, которые перехватывают ошибки JavaScript в дочерних компонентах и отображают fallback UI вместо краша всего приложения',
        isCorrect: true,
      },
      {
        id: 'a-6-38-2',
        text: 'Компоненты для обработки ошибок в формах',
        isCorrect: false,
      },
      {
        id: 'a-6-38-3',
        text: 'Механизм для работы с исключениями',
        isCorrect: false,
      },
      {
        id: 'a-6-38-4',
        text: 'Способ оптимизации обработки ошибок',
        isCorrect: false,
      },
    ],
    explanation:
      'Error Boundaries — классовые компоненты с componentDidCatch или getDerivedStateFromError. Перехватывают ошибки в дочерних компонентах, отображают fallback UI. Не перехватывают ошибки в обработчиках событий, асинхронном коде, SSR.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-39',
    type: 'single',
    question: 'Что такое React.StrictMode?',
    answers: [
      {
        id: 'a-6-39-1',
        text: 'Компонент для выявления проблем в приложении: двойной вызов эффектов, устаревшие API, небезопасные практики',
        isCorrect: true,
      },
      {
        id: 'a-6-39-2',
        text: 'Режим для строгой проверки типов',
        isCorrect: false,
      },
      {
        id: 'a-6-39-3',
        text: 'Механизм для оптимизации',
        isCorrect: false,
      },
      {
        id: 'a-6-39-4',
        text: 'Способ работы с ошибками',
        isCorrect: false,
      },
    ],
    explanation:
      'StrictMode в development режиме: двойной вызов эффектов (для проверки cleanup), предупреждения об устаревших API, проверка на небезопасные практики. Не влияет на production. Помогает найти проблемы заранее.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'easy',
  },
  {
    id: 'q-6-40',
    type: 'single',
    question:
      'Что такое React Concurrent Features (Suspense, startTransition)?',
    answers: [
      {
        id: 'a-6-40-1',
        text: 'Функции для управления приоритетами обновлений: Suspense для асинхронных компонентов, startTransition для некритичных обновлений',
        isCorrect: true,
      },
      {
        id: 'a-6-40-2',
        text: 'Функции для работы с асинхронными запросами',
        isCorrect: false,
      },
      {
        id: 'a-6-40-3',
        text: 'Механизм для оптимизации производительности',
        isCorrect: false,
      },
      {
        id: 'a-6-40-4',
        text: 'Способ работы с состоянием',
        isCorrect: false,
      },
    ],
    explanation:
      'Concurrent features: Suspense отображает fallback во время загрузки. startTransition помечает обновления как некритичные (можно прервать). useDeferredValue откладывает обновление значения. Основаны на Fiber Architecture.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-41',
    type: 'single',
    question: 'Что такое useTransition в React?',
    answers: [
      {
        id: 'a-6-41-1',
        text: 'Хук для пометки обновлений состояния как некритичных (transition), которые можно прервать для более важных обновлений',
        isCorrect: true,
      },
      {
        id: 'a-6-41-2',
        text: 'Хук для работы с анимациями',
        isCorrect: false,
      },
      {
        id: 'a-6-41-3',
        text: 'Механизм для кэширования переходов',
        isCorrect: false,
      },
      {
        id: 'a-6-41-4',
        text: 'Способ оптимизации навигации',
        isCorrect: false,
      },
    ],
    explanation:
      'useTransition возвращает [isPending, startTransition]. startTransition помечает обновления как некритичные (можно прервать для более важных). isPending показывает, идёт ли переход. Полезен для некритичных UI-обновлений.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-42',
    type: 'single',
    question: 'Что такое useDeferredValue в React?',
    answers: [
      {
        id: 'a-6-42-1',
        text: 'Хук, который откладывает обновление значения, показывая старое значение во время обновления',
        isCorrect: true,
      },
      {
        id: 'a-6-42-2',
        text: 'Хук для работы с отложенными значениями',
        isCorrect: false,
      },
      {
        id: 'a-6-42-3',
        text: 'Механизм для кэширования значений',
        isCorrect: false,
      },
      {
        id: 'a-6-42-4',
        text: 'Способ оптимизации значений',
        isCorrect: false,
      },
    ],
    explanation:
      'useDeferredValue откладывает обновление значения. const deferredValue = useDeferredValue(value). Показывает старое значение, пока обновляется новое. Полезен для поиска, фильтрации — UI остаётся отзывчивым.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-43',
    type: 'single',
    question: 'Что такое React Server Components?',
    answers: [
      {
        id: 'a-6-43-1',
        text: 'Компоненты, которые рендерятся на сервере и отправляются клиенту как сериализованные данные, уменьшая размер бандла',
        isCorrect: true,
      },
      {
        id: 'a-6-43-2',
        text: 'Компоненты для работы с сервером',
        isCorrect: false,
      },
      {
        id: 'a-6-43-3',
        text: 'Механизм для SSR',
        isCorrect: false,
      },
      {
        id: 'a-6-43-4',
        text: 'Способ оптимизации компонентов',
        isCorrect: false,
      },
    ],
    explanation:
      'Server Components рендерятся на сервере, не отправляют JS на клиент. Могут напрямую работать с БД, файловой системой. Client Components (use client) для интерактивности. Уменьшают размер бандла, улучшают производительность.',
    chapterId: 'chapter-6-4',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-44',
    type: 'single',
    question: 'Что такое React Server Actions?',
    answers: [
      {
        id: 'a-6-44-1',
        text: 'Асинхронные функции, которые выполняются на сервере, могут вызываться из клиентских компонентов без создания API endpoints',
        isCorrect: true,
      },
      {
        id: 'a-6-44-2',
        text: 'Действия для работы с сервером',
        isCorrect: false,
      },
      {
        id: 'a-6-44-3',
        text: 'Механизм для SSR',
        isCorrect: false,
      },
      {
        id: 'a-6-44-4',
        text: 'Способ оптимизации действий',
        isCorrect: false,
      },
    ],
    explanation:
      'Server Actions — async функции с "use server", выполняются на сервере. Можно вызывать из форм, обработчиков событий. Не требуют API routes. TypeScript-типизированы, безопасны. Часть React Server Components.',
    chapterId: 'chapter-6-4',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-45',
    type: 'single',
    question: 'Что такое React Compiler?',
    answers: [
      {
        id: 'a-6-45-1',
        text: 'Компилятор, который автоматически оптимизирует React-компоненты, мемоизируя значения и компоненты без ручного использования useMemo/useCallback',
        isCorrect: true,
      },
      {
        id: 'a-6-45-2',
        text: 'Компилятор для преобразования JSX в JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-6-45-3',
        text: 'Механизм для оптимизации бандла',
        isCorrect: false,
      },
      {
        id: 'a-6-45-4',
        text: 'Способ компиляции TypeScript',
        isCorrect: false,
      },
    ],
    explanation:
      'React Compiler автоматически мемоизирует компоненты и значения, определяя, что нужно мемоизировать. Уменьшает необходимость в useMemo/useCallback. Пока в экспериментальной стадии, планируется в будущих версиях React.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-46',
    type: 'single',
    question:
      'Почему в React StrictMode в dev-режиме эффекты (useEffect) могут выполняться дважды?',
    answers: [
      {
        id: 'a-6-46-1',
        text: 'Это проверка на корректность cleanup и идемпотентность эффектов: React “монтирует/размонтирует” компонент, чтобы выявить побочные эффекты',
        isCorrect: true,
      },
      {
        id: 'a-6-46-2',
        text: 'Потому что StrictMode включает два потока JavaScript для параллельного рендера',
        isCorrect: false,
      },
      {
        id: 'a-6-46-3',
        text: 'Потому что useEffect всегда выполняется дважды в React 18+ (и в продакшене тоже)',
        isCorrect: false,
      },
      {
        id: 'a-6-46-4',
        text: 'Потому что StrictMode автоматически делает retries сетевых запросов внутри эффектов',
        isCorrect: false,
      },
    ],
    explanation:
      'StrictMode в dev помогает находить эффекты без корректного cleanup и неидемпотентные сайд-эффекты. В продакшене такое двойное выполнение обычно не происходит.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-47',
    type: 'single',
    question:
      'Что означает “батчинг” (batching) обновлений состояния в React 18, и какой практический эффект он даёт?',
    answers: [
      {
        id: 'a-6-47-1',
        text: 'React группирует несколько setState в один ререндер, уменьшая количество перерисовок и повышая производительность',
        isCorrect: true,
      },
      {
        id: 'a-6-47-2',
        text: 'React всегда выполняет setState синхронно и сразу перерисовывает компонент после каждого вызова',
        isCorrect: false,
      },
      {
        id: 'a-6-47-3',
        text: 'React переносит все обновления в Web Worker, чтобы не блокировать UI',
        isCorrect: false,
      },
      {
        id: 'a-6-47-4',
        text: 'React “батчит” только запросы к серверу, но не обновления UI',
        isCorrect: false,
      },
    ],
    explanation:
      'Батчинг снижает количество ререндеров. Практический нюанс: если новое значение зависит от предыдущего, лучше использовать функциональный апдейтер, чтобы не попасть на “устаревшее” значение.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-48',
    type: 'single',
    question:
      'Почему использование индекса массива как key в списке может привести к визуальным багам?',
    answers: [
      {
        id: 'a-6-48-1',
        text: 'При вставке/удалении элементов меняются ключи, и React может “переиспользовать” DOM/состояние не для того элемента, что ломает соответствие UI ↔ данные',
        isCorrect: true,
      },
      {
        id: 'a-6-48-2',
        text: 'Потому что key влияет на CSS-специфичность и может менять стили',
        isCorrect: false,
      },
      {
        id: 'a-6-48-3',
        text: 'Потому что key должен быть числом, а index — всегда строка',
        isCorrect: false,
      },
      {
        id: 'a-6-48-4',
        text: 'Потому что index-key запрещён в React и вызывает runtime ошибку',
        isCorrect: false,
      },
    ],
    explanation:
      'Key нужен для стабильной идентификации элементов при reconciliation. Индекс ок только для статичных списков без перестановок/вставок/удалений.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-49',
    type: 'single',
    question: 'В каком случае useLayoutEffect предпочтительнее useEffect?',
    answers: [
      {
        id: 'a-6-49-1',
        text: 'Когда нужно синхронно измерить DOM и применить изменения до отрисовки (чтобы избежать “мерцания”/layout shift)',
        isCorrect: true,
      },
      {
        id: 'a-6-49-2',
        text: 'Когда нужно выполнить сетевой запрос, чтобы он начался до рендера',
        isCorrect: false,
      },
      {
        id: 'a-6-49-3',
        text: 'Когда нужно оптимизировать бандл и уменьшить размер JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-6-49-4',
        text: 'useLayoutEffect — инструмент для случаев, когда важно выполнить синхронные чтения/записи в DOM до paint; “по умолчанию” он может ухудшать отзывчивость, поэтому выбор должен быть осознанным',
        isCorrect: false,
      },
    ],
    explanation:
      'useLayoutEffect выполняется синхронно после мутаций DOM, но до paint. Его нельзя злоупотреблять: он может блокировать отрисовку и ухудшать отзывчивость.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-50',
    type: 'multiple',
    question:
      'Какие подходы помогают избежать stale closure в useEffect/setInterval сценариях?',
    answers: [
      {
        id: 'a-6-50-1',
        text: 'Использовать функциональные обновления состояния (setState(prev => ...))',
        isCorrect: true,
      },
      {
        id: 'a-6-50-2',
        text: 'Хранить актуальное значение в useRef и читать из ref внутри коллбека',
        isCorrect: true,
      },
      {
        id: 'a-6-50-3',
        text: 'Корректно указывать зависимости эффекта, чтобы коллбек пересоздавался при изменении значений',
        isCorrect: true,
      },
      {
        id: 'a-6-50-4',
        text: 'Отключить StrictMode — stale closure исчезнет',
        isCorrect: false,
      },
    ],
    explanation:
      'Stale closure — это не “баг React”, а результат замыкания на старые значения. Лечатся: зависимости, функциональные апдейты и ref для актуальных значений.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-51',
    type: 'single',
    question: 'Что в первую очередь означает “controlled component” в React?',
    answers: [
      {
        id: 'a-6-51-1',
        text: 'Значение элемента формы хранится в state и обновляется через onChange, поэтому источник правды — React',
        isCorrect: true,
      },
      {
        id: 'a-6-51-2',
        text: 'Controlled — это когда значение “контролируется” React (state), но DOM всё равно участвует: uncontrolled — просто переносит источник правды в DOM',
        isCorrect: false,
      },
      {
        id: 'a-6-51-3',
        text: 'Компонент не может вызывать useEffect и useState',
        isCorrect: false,
      },
      {
        id: 'a-6-51-4',
        text: 'Controlled никак не гарантирует оптимизацию: controlled‑инпуты часто ререндерятся чаще, если не продумать архитектуру формы',
        isCorrect: false,
      },
    ],
    explanation:
      'Controlled — про управление значением через state. Uncontrolled — про чтение значения из DOM (ref) и defaultValue.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-52',
    type: 'single',
    question:
      'Какая самая частая проблема “derived state” (производного состояния) в React?',
    answers: [
      {
        id: 'a-6-52-1',
        text: 'Дублирование источника правды: состояние начинает рассинхронизироваться с props/данными, что приводит к багам',
        isCorrect: true,
      },
      {
        id: 'a-6-52-2',
        text: 'Derived state иногда оправдан (например, если нужно “зафиксировать” снимок пропса при событии), но чаще приводит к рассинхронизации и усложняет обновления',
        isCorrect: false,
      },
      {
        id: 'a-6-52-3',
        text: 'Derived state запрещён в React 19 и вызывает ошибку компиляции',
        isCorrect: false,
      },
      {
        id: 'a-6-52-4',
        text: 'Derived state можно использовать только внутри useReducer',
        isCorrect: false,
      },
    ],
    explanation:
      'Если значение можно вычислить из текущих props/state — чаще безопаснее вычислять его на лету (в рендере или через memo), чем хранить отдельным state.',
    chapterId: 'chapter-6-1',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-53',
    type: 'single',
    question:
      'Почему React.memo не предотвращает ререндер компонента, который читает часто меняющийся Context?',
    answers: [
      {
        id: 'a-6-53-1',
        text: 'Потому что memo сравнивает только props, а изменения Context — отдельный триггер ререндера',
        isCorrect: true,
      },
      {
        id: 'a-6-53-2',
        text: 'Потому что memo работает только для компонентов без children',
        isCorrect: false,
      },
      {
        id: 'a-6-53-3',
        text: 'Потому что Context обновляется только асинхронно и memo не успевает сравнить props',
        isCorrect: false,
      },
      {
        id: 'a-6-53-4',
        text: 'Потому что memo отключает reconciliation',
        isCorrect: false,
      },
    ],
    explanation:
      'Если контекст большой и часто меняется, помогают: разделение контекстов, селекторы (в сторонних решениях), вынос динамичного состояния ниже по дереву.',
    chapterId: 'chapter-6-2',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-54',
    type: 'single',
    question: 'Что чаще всего вызывает hydration mismatch при SSR?',
    answers: [
      {
        id: 'a-6-54-1',
        text: 'Разный HTML на сервере и на клиенте из-за использования недетерминированных значений (Date.now, Math.random) или клиент-специфичных условий при рендере',
        isCorrect: true,
      },
      {
        id: 'a-6-54-2',
        text: 'Наличие useEffect в компоненте — это всегда приводит к mismatch',
        isCorrect: false,
      },
      {
        id: 'a-6-54-3',
        text: 'Использование TypeScript вместо JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-6-54-4',
        text: 'Переход на HTTP/2 вместо HTTP/1.1',
        isCorrect: false,
      },
    ],
    explanation:
      'Hydration требует совпадения разметки. Всё, что меняет HTML между SSR и первым клиентским рендером, потенциально приводит к mismatch.',
    chapterId: 'chapter-6-8',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-55',
    type: 'multiple',
    question:
      'Какие ограничения типичны для React Server Components (в сравнении с Client Components)?',
    answers: [
      {
        id: 'a-6-55-1',
        text: 'Нельзя использовать интерактивные хуки вроде useState/useEffect (они требуют клиента)',
        isCorrect: true,
      },
      {
        id: 'a-6-55-2',
        text: 'Нельзя обращаться к browser-only API (window, document)',
        isCorrect: true,
      },
      {
        id: 'a-6-55-3',
        text: 'Можно напрямую читать из базы данных/файловой системы (это серверный контекст)',
        isCorrect: true,
      },
      {
        id: 'a-6-55-4',
        text: 'Нельзя использовать props и children — они доступны только на клиенте',
        isCorrect: false,
      },
    ],
    explanation:
      'RSC выполняются на сервере и не отдают JS на клиент. Отсюда ограничения на интерактивность и доступ к browser API.',
    chapterId: 'chapter-6-8',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-56',
    type: 'single',
    question:
      'Что делает опция enabled в useQuery (TanStack Query) и какой типичный кейс её использования?',
    answers: [
      {
        id: 'a-6-56-1',
        text: 'Отключает автозапуск запроса, пока условие не станет истинным (например, пока нет id или токена)',
        isCorrect: true,
      },
      {
        id: 'a-6-56-2',
        text: 'Включает запрос только на сервере (SSR), а на клиенте отключает',
        isCorrect: false,
      },
      {
        id: 'a-6-56-3',
        text: 'Заставляет запрос выполняться строго синхронно',
        isCorrect: false,
      },
      {
        id: 'a-6-56-4',
        text: 'Автоматически делает запрос “optimistic”',
        isCorrect: false,
      },
    ],
    explanation:
      'enabled полезен для “зависимых” запросов: не делаем запрос, пока не готовы входные данные (id, фильтры, выбранная сущность).',
    chapterId: 'chapter-6-5',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-57',
    type: 'single',
    question: 'В чём практическая разница staleTime и gcTime в TanStack Query?',
    answers: [
      {
        id: 'a-6-57-1',
        text: 'staleTime — сколько данные считаются “свежими” (не требуют refetch), gcTime — когда неиспользуемые данные могут быть удалены из кэша',
        isCorrect: true,
      },
      {
        id: 'a-6-57-2',
        text: 'staleTime управляет временем ответа сервера, gcTime управляет таймаутом HTTP-запроса',
        isCorrect: false,
      },
      {
        id: 'a-6-57-3',
        text: 'staleTime работает только для mutations, gcTime — только для queries',
        isCorrect: false,
      },
      {
        id: 'a-6-57-4',
        text: 'staleTime отвечает за “удаление” данных из кэша, а gcTime — за момент, когда данные становятся stale и требуют refetch',
        isCorrect: false,
      },
    ],
    explanation:
      'staleTime влияет на “устаревание” и поведение refetch, gcTime — на “сборку мусора” и размер кэша.',
    chapterId: 'chapter-6-5',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-58',
    type: 'multiple',
    question:
      'Какие пункты входят в “хороший” паттерн оптимистичных обновлений в TanStack Query?',
    answers: [
      {
        id: 'a-6-58-1',
        text: 'onMutate: отменить активные запросы по ключу (cancelQueries), чтобы не затереть оптимистичное состояние',
        isCorrect: true,
      },
      {
        id: 'a-6-58-2',
        text: 'onMutate: сохранить предыдущее состояние из кэша (getQueryData) для возможного rollback',
        isCorrect: true,
      },
      {
        id: 'a-6-58-3',
        text: 'onError: откатить кэш через setQueryData на сохранённое значение',
        isCorrect: true,
      },
      {
        id: 'a-6-58-4',
        text: 'Всегда инвалидировать абсолютно все запросы приложения после мутации (invalidateQueries без фильтра)',
        isCorrect: false,
      },
    ],
    explanation:
      'Оптимистичный UI — это скорость, но без rollback будет ломаться состояние при ошибках. Инвалидация должна быть точечной (по нужным ключам/предикату).',
    chapterId: 'chapter-6-5',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-59',
    type: 'single',
    question:
      'Зачем нужен параметр select в useQuery (TanStack Query) и какой эффект он даёт?',
    answers: [
      {
        id: 'a-6-59-1',
        text: 'Позволяет трансформировать данные и подписаться только на нужную часть результата, снижая лишние ререндеры',
        isCorrect: true,
      },
      {
        id: 'a-6-59-2',
        text: 'Управляет тем, какие поля сервер вернёт (как GraphQL selection set)',
        isCorrect: false,
      },
      {
        id: 'a-6-59-3',
        text: 'Заменяет queryKey и делает кэш автоматически уникальным',
        isCorrect: false,
      },
      {
        id: 'a-6-59-4',
        text: 'Включает optimistic updates автоматически',
        isCorrect: false,
      },
    ],
    explanation:
      'select удобен для derived data и оптимизации подписок: компонент реагирует на изменение выбранного среза, а не всей структуры ответа.',
    chapterId: 'chapter-6-5',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-60',
    type: 'single',
    question:
      'Почему рекомендуется централизовать queryKey через фабрику ключей (queryKeys) вместо “строк по месту”?',
    answers: [
      {
        id: 'a-6-60-1',
        text: 'Чтобы инвалидация и группировка запросов были предсказуемыми и типобезопасными, а ключи — единообразными',
        isCorrect: true,
      },
      {
        id: 'a-6-60-2',
        text: 'Потому что TanStack Query иначе не работает и выдает runtime ошибку',
        isCorrect: false,
      },
      {
        id: 'a-6-60-3',
        text: 'Чтобы уменьшить размер бандла — фабрика ключей автоматически минифицирует строки',
        isCorrect: false,
      },
      {
        id: 'a-6-60-4',
        text: 'Чтобы queries выполнялись синхронно',
        isCorrect: false,
      },
    ],
    explanation:
      'Фабрика ключей даёт иерархию (entity → operation → params) и защищает от “плавающих” ключей, когда invalidateQueries не попадает в нужные записи.',
    chapterId: 'chapter-6-5',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-61',
    type: 'multiple',
    question:
      'Какие стратегии относятся к “точечной” инвалидации в TanStack Query?',
    answers: [
      {
        id: 'a-6-61-1',
        text: 'Инвалидировать только списки конкретной сущности (например, queryKeys.users.lists())',
        isCorrect: true,
      },
      {
        id: 'a-6-61-2',
        text: 'Инвалидировать детальную запись конкретного id (queryKeys.users.detail(id))',
        isCorrect: true,
      },
      {
        id: 'a-6-61-3',
        text: 'Использовать predicate, чтобы инвалидировать только часть ключей по условию',
        isCorrect: true,
      },
      {
        id: 'a-6-61-4',
        text: 'Всегда делать invalidateQueries({ queryKey: ["*"] }) после любой мутации',
        isCorrect: false,
      },
    ],
    explanation:
      'Точечная инвалидация уменьшает количество лишних запросов и сохраняет актуальный кэш для неизменённых данных.',
    chapterId: 'chapter-6-5',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-62',
    type: 'single',
    question: 'Какой основной смысл useInfiniteQuery в TanStack Query?',
    answers: [
      {
        id: 'a-6-62-1',
        text: 'Управлять пагинацией через страницы/курсор, аккумулировать данные и управлять загрузкой следующей страницы',
        isCorrect: true,
      },
      {
        id: 'a-6-62-2',
        text: 'Выполнять бесконечный цикл запросов без остановки для live-обновлений',
        isCorrect: false,
      },
      {
        id: 'a-6-62-3',
        text: 'Заменять Service Worker для офлайн-кэша',
        isCorrect: false,
      },
      {
        id: 'a-6-62-4',
        text: 'Автоматически преобразовывать REST API в GraphQL',
        isCorrect: false,
      },
    ],
    explanation:
      'useInfiniteQuery — стандартный инструмент для пагинации/ленивой подгрузки: он хранит pages/pageParams и даёт fetchNextPage/hasNextPage.',
    chapterId: 'chapter-6-5',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-63',
    type: 'single',
    question:
      'В Zustand почему “селекторы” считаются ключом к производительности?',
    answers: [
      {
        id: 'a-6-63-1',
        text: 'Потому что компонент подписывается на конкретный срез состояния и ререндерится только при изменении этого среза',
        isCorrect: true,
      },
      {
        id: 'a-6-63-2',
        text: 'Потому что селекторы автоматически сериализуют store в localStorage',
        isCorrect: false,
      },
      {
        id: 'a-6-63-3',
        text: 'Потому что Zustand переносит вычисления на сервер',
        isCorrect: false,
      },
      {
        id: 'a-6-63-4',
        text: 'Потому что без селекторов Zustand не компилируется в production',
        isCorrect: false,
      },
    ],
    explanation:
      'Если подписываться на весь store, ререндер будет при любом изменении. Селектор сужает подписку и уменьшает лишние обновления.',
    chapterId: 'chapter-6-6',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-64',
    type: 'single',
    question:
      'Какой типичный баг появляется, если в Zustand вы делаете const store = useStore() без селектора?',
    answers: [
      {
        id: 'a-6-64-1',
        text: 'Компонент будет ререндериться при изменении любого поля стора, даже если UI использует только одно поле',
        isCorrect: true,
      },
      {
        id: 'a-6-64-2',
        text: 'Store перестанет обновляться и “замрёт”',
        isCorrect: false,
      },
      {
        id: 'a-6-64-3',
        text: 'Произойдёт hydration mismatch в SSR из-за селектора',
        isCorrect: false,
      },
      {
        id: 'a-6-64-4',
        text: 'Zustand начнёт автоматически делать optimistic updates',
        isCorrect: false,
      },
    ],
    explanation:
      'Это не “логический баг”, но часто причина деградации производительности. Решение — селекторы и (при необходимости) shallow сравнение для объектов.',
    chapterId: 'chapter-6-6',
    partId: 'part-6',
    difficulty: 'hard',
  },
  {
    id: 'q-6-65',
    type: 'single',
    question: 'Чем Axios удобнее fetch в плане обработки ошибок HTTP 4xx/5xx?',
    answers: [
      {
        id: 'a-6-65-1',
        text: 'Axios по умолчанию отклоняет промис на 4xx/5xx, а fetch считает запрос “успешным” на уровне промиса и требует ручной проверки response.ok',
        isCorrect: true,
      },
      {
        id: 'a-6-65-2',
        text: 'fetch не умеет делать GET-запросы, а Axios умеет',
        isCorrect: false,
      },
      {
        id: 'a-6-65-3',
        text: 'Axios автоматически ускоряет сеть и уменьшает RTT',
        isCorrect: false,
      },
      {
        id: 'a-6-65-4',
        text: 'fetch не поддерживает JSON, поэтому его нельзя использовать для API',
        isCorrect: false,
      },
    ],
    explanation:
      'У fetch важно помнить: network error → reject, а HTTP error → resolve, но response.ok=false. Axios упрощает это поведение, но тоже требует продуманной обработки.',
    chapterId: 'chapter-6-7',
    partId: 'part-6',
    difficulty: 'medium',
  },
  {
    id: 'q-6-66',
    type: 'multiple',
    question:
      'Какие риски и нюансы есть у “глобального” refresh-token механизма через Axios интерсептор (401 → refresh → retry)?',
    answers: [
      {
        id: 'a-6-66-1',
        text: 'Нужно избежать гонок: несколько параллельных 401 могут вызвать несколько refresh-запросов, поэтому часто нужен lock/очередь',
        isCorrect: true,
      },
      {
        id: 'a-6-66-2',
        text: 'Нужно аккуратно не уйти в бесконечный retry-цикл (маркер _retry / лимит)',
        isCorrect: true,
      },
      {
        id: 'a-6-66-3',
        text: 'Нужно продумать поведение при падении refresh (logout, очистка состояния, редирект)',
        isCorrect: true,
      },
      {
        id: 'a-6-66-4',
        text: 'Интерсепторы автоматически решают CSRF, поэтому дополнительные меры не нужны',
        isCorrect: false,
      },
    ],
    explanation:
      'Интерсепторы удобны, но в продакшене важны гонки, дедлоки, лимиты повторов и согласованность состояния приложения при разлогине.',
    chapterId: 'chapter-6-7',
    partId: 'part-6',
    difficulty: 'hard',
  },
]
