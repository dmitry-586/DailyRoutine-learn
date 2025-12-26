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
        text: 'Controlled: быстрее, Uncontrolled: медленнее',
        isCorrect: false,
      },
      {
        id: 'a-6-10-4',
        text: 'Нет разницы, это синонимы',
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
        text: 'SSR быстрее, SSG медленнее, ISR среднее',
        isCorrect: false,
      },
      {
        id: 'a-6-11-4',
        text: 'Нет разницы, это синонимы',
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
        text: 'useMemo быстрее, useCallback медленнее',
        isCorrect: false,
      },
      {
        id: 'a-6-14-4',
        text: 'Нет разницы, это синонимы',
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
        text: 'React.lazy() быстрее, Suspense медленнее',
        isCorrect: false,
      },
      {
        id: 'a-6-16-4',
        text: 'Нет разницы, это синонимы',
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
        text: 'Next.js быстрее React',
        isCorrect: false,
      },
      {
        id: 'a-6-20-3',
        text: 'Next.js для бэкенда, React для фронтенда',
        isCorrect: false,
      },
      {
        id: 'a-6-20-4',
        text: 'Нет разницы, это синонимы',
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
        text: 'useReducer быстрее, useState медленнее',
        isCorrect: false,
      },
      {
        id: 'a-6-23-4',
        text: 'Нет разницы, это синонимы',
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
        text: 'useLayoutEffect быстрее, useEffect медленнее',
        isCorrect: false,
      },
      {
        id: 'a-6-25-4',
        text: 'Нет разницы, это синонимы',
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
        text: 'Redux Toolkit быстрее Redux',
        isCorrect: false,
      },
      {
        id: 'a-6-32-3',
        text: 'Redux Toolkit для новых проектов, Redux для старых',
        isCorrect: false,
      },
      {
        id: 'a-6-32-4',
        text: 'Нет разницы, это синонимы',
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
        text: 'Zustand быстрее Redux',
        isCorrect: false,
      },
      {
        id: 'a-6-34-3',
        text: 'Zustand для малых проектов, Redux для больших',
        isCorrect: false,
      },
      {
        id: 'a-6-34-4',
        text: 'Нет разницы, это синонимы',
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
]
