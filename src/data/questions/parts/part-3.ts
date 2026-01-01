import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части III. JavaScript
 */
export const part3Questions: QuizQuestion[] = [
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
        text: 'await не меняет природу microtasks: под капотом это промисы. Но он меняет “форму” кода: легко получить последовательное ожидание там, где в .then() вы бы запускали параллельно',
        isCorrect: false,
      },
      {
        id: 'a-3-7-3',
        text: 'async/await для браузера, Promise.then() для Node.js',
        isCorrect: false,
      },
      {
        id: 'a-3-7-4',
        text: 'async/await автоматически делает промисы “отменяемыми”, а Promise.then() — нет, поэтому await всегда безопаснее',
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
  {
    id: 'q-3-10',
    type: 'single',
    question: 'Что такое Event Delegation?',
    answers: [
      {
        id: 'a-3-10-1',
        text: 'Техника обработки событий, при которой один обработчик ставится на родительский элемент для обработки событий от дочерних элементов',
        isCorrect: true,
      },
      {
        id: 'a-3-10-2',
        text: 'Механизм передачи событий между разными компонентами',
        isCorrect: false,
      },
      {
        id: 'a-3-10-3',
        text: 'Способ делегирования прав доступа к DOM-элементам',
        isCorrect: false,
      },
      {
        id: 'a-3-10-4',
        text: 'Процесс оптимизации обработчиков событий',
        isCorrect: false,
      },
    ],
    explanation:
      'Event Delegation — это техника, при которой обработчик ставится на родительский элемент и обрабатывает события от дочерних через всплытие (bubbling). Это эффективно для динамических списков.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-11',
    type: 'single',
    question: 'В чём разница между event.target и event.currentTarget?',
    answers: [
      {
        id: 'a-3-11-1',
        text: 'target — элемент, на котором произошло событие; currentTarget — элемент, на котором установлен обработчик',
        isCorrect: true,
      },
      {
        id: 'a-3-11-2',
        text: 'target — элемент, на котором установлен обработчик; currentTarget — элемент, на котором произошло событие',
        isCorrect: false,
      },
      {
        id: 'a-3-11-3',
        text: 'event.target и event.currentTarget совпадают, если клик был по самому элементу-обработчику; но при клике по вложенным они отличаются даже при addEventListener',
        isCorrect: false,
      },
      {
        id: 'a-3-11-4',
        text: 'target используется для всплытия, currentTarget для погружения',
        isCorrect: false,
      },
    ],
    explanation:
      'event.target — это элемент, на котором изначально произошло событие (может быть дочерним). event.currentTarget — это элемент, на котором установлен обработчик (остаётся неизменным при всплытии).',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-12',
    type: 'multiple',
    question: 'Какие методы есть у массива для работы с DOM-коллекциями?',
    answers: [
      {
        id: 'a-3-12-1',
        text: 'Array.from() для преобразования NodeList в массив',
        isCorrect: true,
      },
      {
        id: 'a-3-12-2',
        text: 'Array.prototype.slice.call() для преобразования',
        isCorrect: true,
      },
      {
        id: 'a-3-12-3',
        text: 'Spread оператор [...nodeList]',
        isCorrect: true,
      },
      {
        id: 'a-3-12-4',
        text: 'Прямое использование методов массива на NodeList',
        isCorrect: false,
      },
    ],
    explanation:
      'NodeList и HTMLCollection не являются массивами, поэтому для использования методов массивов их нужно преобразовать через Array.from(), slice.call() или spread оператор.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-13',
    type: 'single',
    question: 'Что такое микрозадачи (microtasks) в Event Loop?',
    answers: [
      {
        id: 'a-3-13-1',
        text: 'Задачи с высоким приоритетом, которые выполняются после текущего стека, но до следующей макрозадачи',
        isCorrect: true,
      },
      {
        id: 'a-3-13-2',
        text: 'Задачи с низким приоритетом, которые выполняются в последнюю очередь',
        isCorrect: false,
      },
      {
        id: 'a-3-13-3',
        text: 'Задачи, которые выполняются в отдельном потоке',
        isCorrect: false,
      },
      {
        id: 'a-3-13-4',
        text: 'Задачи, связанные с обработкой пользовательских событий',
        isCorrect: false,
      },
    ],
    explanation:
      'Микрозадачи (Promise.then, queueMicrotask) выполняются после текущего стека, но до следующей макрозадачи. Это обеспечивает предсказуемый порядок выполнения асинхронного кода.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-14',
    type: 'single',
    question: 'Что произойдёт, если в Promise не вызвать resolve или reject?',
    answers: [
      {
        id: 'a-3-14-1',
        text: 'Promise останется в состоянии pending навсегда',
        isCorrect: true,
      },
      {
        id: 'a-3-14-2',
        text: 'Promise автоматически выполнится через 5 секунд',
        isCorrect: false,
      },
      {
        id: 'a-3-14-3',
        text: 'Promise автоматически отклонится с ошибкой timeout',
        isCorrect: false,
      },
      {
        id: 'a-3-14-4',
        text: 'Promise автоматически выполнится со значением undefined',
        isCorrect: false,
      },
    ],
    explanation:
      'Если в Promise не вызвать resolve или reject, он останется в состоянии pending навсегда, и обработчики then/catch не выполнятся.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-15',
    type: 'single',
    question: 'В чём разница между Promise.all() и Promise.allSettled()?',
    answers: [
      {
        id: 'a-3-15-1',
        text: 'all() отклоняется при первой ошибке, allSettled() ждёт завершения всех промисов независимо от результата',
        isCorrect: true,
      },
      {
        id: 'a-3-15-2',
        text: 'Promise.all “дожидается” каждого промиса по очереди, а allSettled запускает их параллельно',
        isCorrect: false,
      },
      {
        id: 'a-3-15-3',
        text: 'all() для последовательного выполнения, allSettled() для параллельного',
        isCorrect: false,
      },
      {
        id: 'a-3-15-4',
        text: 'Promise.allSettled отклоняется при первой ошибке так же, как Promise.all, просто формат результата другой',
        isCorrect: false,
      },
    ],
    explanation:
      'Promise.all() отклоняется при первой ошибке и возвращает массив результатов. Promise.allSettled() ждёт завершения всех промисов и возвращает массив объектов со статусом и результатом/ошибкой.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-16',
    type: 'single',
    question: 'В чём разница между var, let и const?',
    answers: [
      {
        id: 'a-3-16-1',
        text: 'var — function scope, hoisting с undefined; let/const — block scope, hoisting с TDZ; const нельзя переназначить',
        isCorrect: true,
      },
      {
        id: 'a-3-16-2',
        text: 'var для старых браузеров, let/const для новых',
        isCorrect: false,
      },
      {
        id: 'a-3-16-3',
        text: 'let/const хранятся в heap и поэтому “тяжелее”, а var — на стеке, поэтому предпочтительнее в горячем коде',
        isCorrect: false,
      },
      {
        id: 'a-3-16-4',
        text: 'let и const поднимаются так же, как var: к ним можно обращаться до объявления (будет undefined)',
        isCorrect: false,
      },
    ],
    explanation:
      'var имеет function scope и hoisting с undefined. let/const имеют block scope и hoisting с Temporal Dead Zone. const нельзя переназначить, но можно изменять внутреннее состояние объектов/массивов.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-17',
    type: 'single',
    question: 'Что такое Temporal Dead Zone (TDZ)?',
    answers: [
      {
        id: 'a-3-17-1',
        text: 'Участок кода от начала области видимости до строки объявления, где переменная let/const недоступна',
        isCorrect: true,
      },
      {
        id: 'a-3-17-2',
        text: 'Зона, где переменные автоматически удаляются',
        isCorrect: false,
      },
      {
        id: 'a-3-17-3',
        text: 'Механизм для оптимизации памяти',
        isCorrect: false,
      },
      {
        id: 'a-3-17-4',
        text: 'Способ обработки ошибок',
        isCorrect: false,
      },
    ],
    explanation:
      'TDZ — это участок кода от начала области видимости до строки объявления let/const, где попытка обращения к переменной вызовет ReferenceError. var не имеет TDZ (возвращает undefined).',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-18',
    type: 'single',
    question: 'В чём разница между == и ===?',
    answers: [
      {
        id: 'a-3-18-1',
        text: '=== строгое сравнение (тип + значение), == нестрогое с приведением типов',
        isCorrect: true,
      },
      {
        id: 'a-3-18-2',
        text: '== иногда используют осознанно для `value == null` (проверить и null, и undefined), но “в целом безопаснее” — нет: приведение типов часто даёт неожиданные результаты',
        isCorrect: false,
      },
      {
        id: 'a-3-18-3',
        text: '=== для примитивов, == для объектов',
        isCorrect: false,
      },
      {
        id: 'a-3-18-4',
        text: '== всегда сравнивает по ссылке, а === всегда сравнивает по значению',
        isCorrect: false,
      },
    ],
    explanation:
      '=== проверяет тип и значение без приведения. == приводит типы перед сравнением. Практика: почти всегда использовать ===. Исключение: == null проверяет и null, и undefined.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-19',
    type: 'single',
    question: 'Что такое приведение типов (type coercion) в JavaScript?',
    answers: [
      {
        id: 'a-3-19-1',
        text: 'Автоматическое преобразование значения из одного типа в другой при операциях',
        isCorrect: true,
      },
      {
        id: 'a-3-19-2',
        text: 'Способ явного преобразования типов через Number(), String()',
        isCorrect: false,
      },
      {
        id: 'a-3-19-3',
        text: 'Механизм для оптимизации производительности',
        isCorrect: false,
      },
      {
        id: 'a-3-19-4',
        text: 'Способ проверки типов',
        isCorrect: false,
      },
    ],
    explanation:
      'Type coercion — автоматическое преобразование типов. Примеры: "5" + 2 = "52" (строка), "5" - 2 = 3 (число). Явное приведение: Number("5"), String(5).',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-20',
    type: 'single',
    question: 'В чём разница между примитивами и объектами в JavaScript?',
    answers: [
      {
        id: 'a-3-20-1',
        text: 'Примитивы передаются по значению (копия), объекты по ссылке',
        isCorrect: true,
      },
      {
        id: 'a-3-20-2',
        text: 'Примитивы “immutable”, поэтому сравниваются по ссылке, а объекты — по значению',
        isCorrect: false,
      },
      {
        id: 'a-3-20-3',
        text: 'Примитивы для простых данных, объекты для сложных',
        isCorrect: false,
      },
      {
        id: 'a-3-20-4',
        text: 'Объекты передаются по значению, если переменная объявлена через const',
        isCorrect: false,
      },
    ],
    explanation:
      'Примитивы (number, string, boolean и т.д.) передаются по значению — создаётся копия. Объекты передаются по ссылке — несколько переменных могут указывать на один объект.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-21',
    type: 'single',
    question:
      'Что такое стрелочные функции (arrow functions) и чем они отличаются от обычных?',
    answers: [
      {
        id: 'a-3-21-1',
        text: 'Стрелочные функции не имеют своего this, arguments, не могут быть конструкторами, не поднимаются',
        isCorrect: true,
      },
      {
        id: 'a-3-21-2',
        text: 'Стрелочные функции захватывают this из внешней области (лексически). Это удобно в колбэках, но в качестве методов объекта часто неожиданно “ломает” this',
        isCorrect: false,
      },
      {
        id: 'a-3-21-3',
        text: 'Стрелочные функции только для однострочных выражений',
        isCorrect: false,
      },
      {
        id: 'a-3-21-4',
        text: 'Стрелочные функции отличаются только коротким синтаксисом: this/arguments и возможность new у них такие же, как у обычных',
        isCorrect: false,
      },
    ],
    explanation:
      'Стрелочные функции: не имеют своего this (берут из внешней области), не имеют arguments, не могут быть конструкторами (new), не поднимаются (hoisting). Удобны для колбэков.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-22',
    type: 'single',
    question: 'Что такое деструктуризация (destructuring) в JavaScript?',
    answers: [
      {
        id: 'a-3-22-1',
        text: 'Синтаксис для извлечения значений из массивов и объектов в отдельные переменные',
        isCorrect: true,
      },
      {
        id: 'a-3-22-2',
        text: 'Способ удаления элементов из массивов',
        isCorrect: false,
      },
      {
        id: 'a-3-22-3',
        text: 'Механизм для оптимизации памяти',
        isCorrect: false,
      },
      {
        id: 'a-3-22-4',
        text: 'Способ создания новых объектов',
        isCorrect: false,
      },
    ],
    explanation:
      'Деструктуризация позволяет извлекать значения: const [a, b] = [1, 2]; const {name, age} = user;. Можно использовать значения по умолчанию, rest-оператор, вложенную деструктуризацию.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-23',
    type: 'single',
    question: 'Что такое spread оператор (...) в JavaScript?',
    answers: [
      {
        id: 'a-3-23-1',
        text: 'Оператор для распаковки элементов массива/объекта или сбора оставшихся элементов',
        isCorrect: true,
      },
      {
        id: 'a-3-23-2',
        text: 'Оператор для умножения массивов',
        isCorrect: false,
      },
      {
        id: 'a-3-23-3',
        text: 'Оператор для копирования объектов',
        isCorrect: false,
      },
      {
        id: 'a-3-23-4',
        text: 'Оператор для удаления элементов',
        isCorrect: false,
      },
    ],
    explanation:
      'Spread оператор: распаковывает элементы (const arr = [...arr1, ...arr2]), копирует объекты (const copy = {...obj}), передаёт аргументы (func(...args)). Rest собирает оставшиеся элементы.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-24',
    type: 'single',
    question: 'Что такое методы map(), filter(), reduce()?',
    answers: [
      {
        id: 'a-3-24-1',
        text: 'map() — преобразует каждый элемент, filter() — фильтрует по условию, reduce() — сводит к одному значению',
        isCorrect: true,
      },
      {
        id: 'a-3-24-2',
        text: 'map/filter возвращают новый массив, а reduce возвращает аккумулятор (может быть чем угодно). Это важное отличие: reduce не “про массив на выходе”',
        isCorrect: false,
      },
      {
        id: 'a-3-24-3',
        text: 'map() для объектов, filter() для массивов, reduce() для строк',
        isCorrect: false,
      },
      {
        id: 'a-3-24-4',
        text: 'Все три изменяют исходный массив',
        isCorrect: false,
      },
    ],
    explanation:
      'map() создаёт новый массив с преобразованными элементами. filter() создаёт новый массив с элементами, прошедшими проверку. reduce() сводит массив к одному значению. Все не мутируют исходный массив.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-25',
    type: 'single',
    question: 'Что такое try-catch-finally в JavaScript?',
    answers: [
      {
        id: 'a-3-25-1',
        text: 'try — код для выполнения, catch — обработка ошибок, finally — код, который выполнится всегда',
        isCorrect: true,
      },
      {
        id: 'a-3-25-2',
        text: 'try для синхронного кода, catch для асинхронного',
        isCorrect: false,
      },
      {
        id: 'a-3-25-3',
        text: 'try/catch делает любой код “асинхронным”: ошибки превращаются в rejected Promise даже без async',
        isCorrect: false,
      },
      {
        id: 'a-3-25-4',
        text: 'finally получает ошибку/результат как аргумент (как then/catch) и может “заменить” значение промиса, вернув другое',
        isCorrect: false,
      },
    ],
    explanation:
      'try-catch-finally: try содержит код, который может выбросить ошибку. catch перехватывает ошибку. finally выполняется всегда, даже если был return или throw. catch не перехватывает ошибки из асинхронного кода без await.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-26',
    type: 'single',
    question: 'Что такое Promise.race()?',
    answers: [
      {
        id: 'a-3-26-1',
        text: 'Метод, который возвращает результат первого выполнившегося (или отклонившегося) промиса',
        isCorrect: true,
      },
      {
        id: 'a-3-26-2',
        text: 'Метод для гонки промисов на скорость',
        isCorrect: false,
      },
      {
        id: 'a-3-26-3',
        text: 'Метод для последовательного выполнения промисов',
        isCorrect: false,
      },
      {
        id: 'a-3-26-4',
        text: 'Метод для отмены всех промисов',
        isCorrect: false,
      },
    ],
    explanation:
      'Promise.race() возвращает промис, который выполняется или отклоняется с результатом первого завершившегося промиса из массива. Полезен для таймаутов: Promise.race([fetch(), timeout(5000)]).',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-27',
    type: 'single',
    question: 'Что такое callback функция?',
    answers: [
      {
        id: 'a-3-27-1',
        text: 'Функция, которая передаётся как аргумент и вызывается позже, обычно после завершения асинхронной операции',
        isCorrect: true,
      },
      {
        id: 'a-3-27-2',
        text: 'Функция для обратного вызова из другого языка',
        isCorrect: false,
      },
      {
        id: 'a-3-27-3',
        text: 'Функция для отмены операций',
        isCorrect: false,
      },
      {
        id: 'a-3-27-4',
        text: 'Функция для кэширования результатов',
        isCorrect: false,
      },
    ],
    explanation:
      'Callback — функция, передаваемая как аргумент и вызываемая позже. Пример: setTimeout(() => {}, 1000). Проблема: callback hell (вложенные колбэки). Решение: промисы и async/await.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-28',
    type: 'single',
    question: 'Что такое Object.freeze() и Object.seal()?',
    answers: [
      {
        id: 'a-3-28-1',
        text: 'freeze() — полностью замораживает объект, seal() — запрещает добавлять/удалять свойства, но можно изменять существующие',
        isCorrect: true,
      },
      {
        id: 'a-3-28-2',
        text: 'freeze() для объектов, seal() для массивов',
        isCorrect: false,
      },
      {
        id: 'a-3-28-3',
        text: 'freeze/seal поверхностные. Частая ловушка: “freeze делает deep freeze” — нет, вложенные объекты остаются мутабельны, если их отдельно не заморозить',
        isCorrect: false,
      },
      {
        id: 'a-3-28-4',
        text: 'Object.seal полностью запрещает изменения, а Object.freeze запрещает только добавление новых свойств',
        isCorrect: false,
      },
    ],
    explanation:
      'Object.freeze() делает объект полностью неизменяемым (нельзя добавлять, удалять, изменять свойства). Object.seal() запрещает добавлять/удалять свойства, но можно изменять существующие.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-29',
    type: 'single',
    question: 'Что такое JSON.stringify() и JSON.parse()?',
    answers: [
      {
        id: 'a-3-29-1',
        text: 'stringify() — преобразует объект в JSON-строку, parse() — преобразует JSON-строку в объект',
        isCorrect: true,
      },
      {
        id: 'a-3-29-2',
        text: 'stringify() для сериализации, parse() для десериализации',
        isCorrect: true,
      },
      {
        id: 'a-3-29-3',
        text: 'JSON.stringify сохраняет методы/undefined/Symbol, поэтому это хороший способ “глубокого клонирования” любых объектов',
        isCorrect: false,
      },
      {
        id: 'a-3-29-4',
        text: 'JSON.parse сериализует объект в строку, а JSON.stringify парсит строку в объект',
        isCorrect: false,
      },
    ],
    explanation:
      'JSON.stringify() сериализует объект в JSON-строку (для отправки на сервер, хранения). JSON.parse() десериализует JSON-строку обратно в объект. Не сохраняют функции, undefined, Symbol.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-30',
    type: 'single',
    question: 'Что такое Set и Map в JavaScript?',
    answers: [
      {
        id: 'a-3-30-1',
        text: 'Set — коллекция уникальных значений, Map — коллекция пар ключ-значение с любыми типами ключей',
        isCorrect: true,
      },
      {
        id: 'a-3-30-2',
        text: 'Set для массивов, Map для объектов',
        isCorrect: false,
      },
      {
        id: 'a-3-30-3',
        text: 'Map как раз умеет ключи-объекты, в отличие от обычного объекта. Ловушка — думать, что ключи “только строки как в object”',
        isCorrect: false,
      },
      {
        id: 'a-3-30-4',
        text: 'Set и Map — это просто другие названия для Array и Object в современном JavaScript',
        isCorrect: false,
      },
    ],
    explanation:
      'Set хранит уникальные значения (удобно для удаления дубликатов). Map — структура ключ-значение, где ключи могут быть любого типа (в отличие от объектов, где ключи только строки).',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-31',
    type: 'single',
    question: 'Как работает this в разных контекстах вызова функции?',
    answers: [
      {
        id: 'a-3-31-1',
        text: 'this определяется в момент вызова: obj.method() → this = obj; fn() → this = window/undefined; new Fn() → this = новый объект',
        isCorrect: true,
      },
      {
        id: 'a-3-31-2',
        text: 'this всегда равен объекту, в котором определена функция',
        isCorrect: false,
      },
      {
        id: 'a-3-31-3',
        text: 'this всегда равен window в браузере',
        isCorrect: false,
      },
      {
        id: 'a-3-31-4',
        text: 'this определяется при объявлении функции',
        isCorrect: false,
      },
    ],
    explanation:
      'this определяется в момент вызова: obj.method() → this = obj; обычный вызов fn() → this = window (нестрогий) или undefined (строгий); new Fn() → this = новый объект; call/apply/bind → явная привязка.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-32',
    type: 'single',
    question: 'В чём разница между call, apply и bind?',
    answers: [
      {
        id: 'a-3-32-1',
        text: 'call и apply вызывают функцию сразу с привязкой this; bind создаёт новую функцию с привязанным this. call принимает аргументы через запятую, apply — массивом',
        isCorrect: true,
      },
      {
        id: 'a-3-32-2',
        text: 'call для объектов, apply для массивов, bind для функций',
        isCorrect: false,
      },
      {
        id: 'a-3-32-3',
        text: 'bind меняет this только на один вызов, а дальше this снова становится прежним (в отличие от call/apply)',
        isCorrect: false,
      },
      {
        id: 'a-3-32-4',
        text: 'bind вызывает функцию сразу (как call/apply), просто возвращает её результат',
        isCorrect: false,
      },
    ],
    explanation:
      'call(context, arg1, arg2) и apply(context, [arg1, arg2]) вызывают функцию сразу с привязкой this. bind(context) создаёт новую функцию с привязанным this, которую можно вызвать позже.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-33',
    type: 'single',
    question: 'Что такое каррирование (currying) в JavaScript?',
    answers: [
      {
        id: 'a-3-33-1',
        text: 'Техника преобразования функции с несколькими аргументами в последовательность функций с одним аргументом',
        isCorrect: true,
      },
      {
        id: 'a-3-33-2',
        text: 'Способ оптимизации производительности функций',
        isCorrect: false,
      },
      {
        id: 'a-3-33-3',
        text: 'Механизм для работы с массивами',
        isCorrect: false,
      },
      {
        id: 'a-3-33-4',
        text: 'Способ создания новых функций',
        isCorrect: false,
      },
    ],
    explanation:
      'Каррирование: f(a, b, c) → f(a)(b)(c). Позволяет создавать специализированные функции. Пример: const add = (a) => (b) => a + b; const add5 = add(5); add5(3) // 8',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-34',
    type: 'single',
    question: 'Что такое функции высшего порядка (Higher-Order Functions)?',
    answers: [
      {
        id: 'a-3-34-1',
        text: 'Функции, которые принимают другие функции как аргументы или возвращают функции',
        isCorrect: true,
      },
      {
        id: 'a-3-34-2',
        text: 'Функции, которые JavaScript-движок автоматически мемоизирует (кэширует результаты вызовов)',
        isCorrect: false,
      },
      {
        id: 'a-3-34-3',
        text: 'Функции для работы с массивами',
        isCorrect: false,
      },
      {
        id: 'a-3-34-4',
        text: 'Функции для работы с классами',
        isCorrect: false,
      },
    ],
    explanation:
      'HOF — функции, которые работают с другими функциями. Примеры: map, filter, reduce (принимают функции), функции-обёртки (возвращают функции). Основа функционального программирования.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-35',
    type: 'single',
    question: 'Что такое прототипное наследование в JavaScript?',
    answers: [
      {
        id: 'a-3-35-1',
        text: 'Механизм, при котором объекты наследуют свойства и методы через цепочку прототипов (__proto__ или Object.getPrototypeOf)',
        isCorrect: true,
      },
      {
        id: 'a-3-35-2',
        text: 'Механизм для копирования объектов',
        isCorrect: false,
      },
      {
        id: 'a-3-35-3',
        text: 'Способ создания приватных свойств',
        isCorrect: false,
      },
      {
        id: 'a-3-35-4',
        text: 'Механизм для оптимизации памяти',
        isCorrect: false,
      },
    ],
    explanation:
      'Прототипное наследование: каждый объект имеет ссылку на прототип. При обращении к свойству JS ищет его в объекте, затем в прототипе, затем в прототипе прототипа и т.д. (цепочка прототипов).',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-36',
    type: 'single',
    question: 'В чём разница между __proto__ и prototype?',
    answers: [
      {
        id: 'a-3-36-1',
        text: '__proto__ — свойство экземпляра, указывающее на прототип; prototype — свойство функции-конструктора, используемое при создании объектов через new',
        isCorrect: true,
      },
      {
        id: 'a-3-36-2',
        text: '__proto__ для объектов, prototype для функций',
        isCorrect: false,
      },
      {
        id: 'a-3-36-3',
        text: '__proto__ устаревший, prototype современный',
        isCorrect: false,
      },
      {
        id: 'a-3-36-4',
        text: '__proto__ — это свойство функции-конструктора, а prototype — свойство экземпляра объекта',
        isCorrect: false,
      },
    ],
    explanation:
      '__proto__ — свойство объекта, указывающее на его прототип. prototype — свойство функции-конструктора, которое становится __proto__ объектов, созданных через new. Используй Object.getPrototypeOf() вместо __proto__.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-37',
    type: 'single',
    question: 'Что такое классы в JavaScript и как они связаны с прототипами?',
    answers: [
      {
        id: 'a-3-37-1',
        text: 'Классы — синтаксический сахар над функциями-конструкторами и прототипами; под капотом используют прототипное наследование',
        isCorrect: true,
      },
      {
        id: 'a-3-37-2',
        text: 'Классы — отдельный механизм наследования, не связанный с прототипами',
        isCorrect: false,
      },
      {
        id: 'a-3-37-3',
        text: 'Классы создают “настоящие приватные поля” автоматически для всех свойств, поэтому их обычно выбирают из-за безопасности',
        isCorrect: false,
      },
      {
        id: 'a-3-37-4',
        text: 'Классы работают только в строгом режиме',
        isCorrect: false,
      },
    ],
    explanation:
      'Классы ES6 — синтаксический сахар. class User {} под капотом создаёт функцию-конструктор и методы на prototype. Наследование через extends использует прототипную цепочку.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-38',
    type: 'single',
    question: 'Что такое статические методы в классах JavaScript?',
    answers: [
      {
        id: 'a-3-38-1',
        text: 'Методы, которые принадлежат классу, а не экземпляру, вызываются через имя класса, а не через экземпляр',
        isCorrect: true,
      },
      {
        id: 'a-3-38-2',
        text: 'Методы, которые нельзя переопределить',
        isCorrect: false,
      },
      {
        id: 'a-3-38-3',
        text: 'Методы для работы со статическими данными',
        isCorrect: false,
      },
      {
        id: 'a-3-38-4',
        text: 'Методы, которые вызываются автоматически при создании экземпляра (как конструктор), поэтому не требуют явного вызова',
        isCorrect: false,
      },
    ],
    explanation:
      'Статические методы (static method) принадлежат классу, а не экземпляру. Вызываются через ClassName.method(), а не через instance.method(). Полезны для утилитарных функций, фабрик.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-39',
    type: 'single',
    question: 'Что такое приватные поля (#private) в классах JavaScript?',
    answers: [
      {
        id: 'a-3-39-1',
        text: 'Поля класса, которые доступны только внутри класса, недоступны извне и не наследуются',
        isCorrect: true,
      },
      {
        id: 'a-3-39-2',
        text: 'Поля, которые нельзя изменять',
        isCorrect: false,
      },
      {
        id: 'a-3-39-3',
        text: 'Поля для статических данных',
        isCorrect: false,
      },
      {
        id: 'a-3-39-4',
        text: 'Поля, которые работают только в строгом режиме',
        isCorrect: false,
      },
    ],
    explanation:
      'Приватные поля (#field) доступны только внутри класса. Синтаксис: class User { #name = "John"; getName() { return this.#name; } }. Нельзя обратиться извне: user.#name // SyntaxError.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-40',
    type: 'single',
    question: 'Что такое querySelector и querySelectorAll?',
    answers: [
      {
        id: 'a-3-40-1',
        text: 'Методы для поиска элементов по CSS-селектору: querySelector возвращает первый элемент, querySelectorAll — NodeList всех элементов',
        isCorrect: true,
      },
      {
        id: 'a-3-40-2',
        text: 'Методы для работы с запросами к серверу',
        isCorrect: false,
      },
      {
        id: 'a-3-40-3',
        text: 'Методы для работы с массивами',
        isCorrect: false,
      },
      {
        id: 'a-3-40-4',
        text: 'Методы для работы с промисами',
        isCorrect: false,
      },
    ],
    explanation:
      'querySelector(selector) возвращает первый элемент, соответствующий селектору. querySelectorAll(selector) возвращает NodeList всех элементов. Современная замена getElementById/getElementsByClassName.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-41',
    type: 'single',
    question: 'В чём разница между innerHTML и textContent?',
    answers: [
      {
        id: 'a-3-41-1',
        text: 'innerHTML парсит строку как HTML (опасно при пользовательских данных), textContent вставляет как текст (безопасно)',
        isCorrect: true,
      },
      {
        id: 'a-3-41-2',
        text: 'textContent безопаснее, потому что НЕ парсит HTML вообще. Он не “санитизирует”, а просто вставляет текст как текст',
        isCorrect: false,
      },
      {
        id: 'a-3-41-3',
        text: 'innerHTML для элементов, textContent для текста',
        isCorrect: false,
      },
      {
        id: 'a-3-41-4',
        text: 'textContent тоже вставляет HTML, но автоматически удаляет <script>, поэтому безопасен как innerHTML',
        isCorrect: false,
      },
    ],
    explanation:
      'innerHTML парсит HTML и может выполнить скрипты (XSS-уязвимость). textContent вставляет текст как есть, экранируя HTML. Для пользовательских данных всегда используй textContent.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-42',
    type: 'single',
    question: 'Что такое фазы событий (capturing и bubbling) в DOM?',
    answers: [
      {
        id: 'a-3-42-1',
        text: 'Capturing — событие идёт сверху вниз к целевому элементу; bubbling — событие всплывает от целевого элемента вверх к document',
        isCorrect: true,
      },
      {
        id: 'a-3-42-2',
        text: 'Capturing для кликов, bubbling для клавиатуры',
        isCorrect: false,
      },
      {
        id: 'a-3-42-3',
        text: 'capturing — просто другая фаза. Она не “выключает” bubbling автоматически и не является универсальным приёмом для производительности',
        isCorrect: false,
      },
      {
        id: 'a-3-42-4',
        text: 'Фаза capturing используется только для inline-обработчиков (onclick="..."), а addEventListener всегда работает на bubbling',
        isCorrect: false,
      },
    ],
    explanation:
      'Capturing (погружение): событие идёт от document к целевому элементу. Bubbling (всплытие): событие идёт от целевого элемента к document. По умолчанию обработчики на фазе bubbling. addEventListener(el, fn, true) — capturing.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-43',
    type: 'single',
    question: 'Что такое preventDefault() и stopPropagation()?',
    answers: [
      {
        id: 'a-3-43-1',
        text: 'preventDefault() отменяет стандартное поведение элемента; stopPropagation() останавливает всплытие события',
        isCorrect: true,
      },
      {
        id: 'a-3-43-2',
        text: 'preventDefault() останавливает всплытие, stopPropagation() отменяет поведение',
        isCorrect: false,
      },
      {
        id: 'a-3-43-3',
        text: 'preventDefault отменяет действие по умолчанию, но не влияет на всплытие. Для всплытия нужен stopPropagation/stopImmediatePropagation',
        isCorrect: false,
      },
      {
        id: 'a-3-43-4',
        text: 'preventDefault() для кликов, stopPropagation() для клавиатуры',
        isCorrect: false,
      },
    ],
    explanation:
      'preventDefault() отменяет стандартное поведение (например, переход по ссылке, отправку формы). stopPropagation() останавливает всплытие события. stopImmediatePropagation() останавливает и всплытие, и другие обработчики на том же элементе.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-44',
    type: 'single',
    question: 'Что такое DocumentFragment и зачем он нужен?',
    answers: [
      {
        id: 'a-3-44-1',
        text: 'Легковесный контейнер для DOM-узлов, который позволяет вставлять множество элементов одной операцией, уменьшая количество перерисовок',
        isCorrect: true,
      },
      {
        id: 'a-3-44-2',
        text: 'Фрагмент документа для работы с шаблонами',
        isCorrect: false,
      },
      {
        id: 'a-3-44-3',
        text: 'Механизм для кэширования DOM',
        isCorrect: false,
      },
      {
        id: 'a-3-44-4',
        text: 'Способ оптимизации CSS',
        isCorrect: false,
      },
    ],
    explanation:
      'DocumentFragment — контейнер без родителя. Позволяет собрать множество элементов в памяти и вставить одной операцией, что уменьшает количество reflow/repaint. Полезен для массовых вставок.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-45',
    type: 'single',
    question: 'Что такое IntersectionObserver?',
    answers: [
      {
        id: 'a-3-45-1',
        text: 'API для отслеживания видимости элементов в viewport, используется для lazy loading, бесконечной прокрутки, анимаций при появлении',
        isCorrect: true,
      },
      {
        id: 'a-3-45-2',
        text: 'API для работы с пересечениями массивов',
        isCorrect: false,
      },
      {
        id: 'a-3-45-3',
        text: 'Механизм для кэширования элементов',
        isCorrect: false,
      },
      {
        id: 'a-3-45-4',
        text: 'Способ оптимизации производительности',
        isCorrect: false,
      },
    ],
    explanation:
      'IntersectionObserver отслеживает, когда элемент входит/выходит из viewport. Эффективнее, чем постоянные проверки через getBoundingClientRect. Используется для lazy loading изображений, бесконечной прокрутки, аналитики.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-46',
    type: 'single',
    question: 'Что такое MutationObserver?',
    answers: [
      {
        id: 'a-3-46-1',
        text: 'API для отслеживания изменений в DOM (добавление, удаление, изменение атрибутов элементов)',
        isCorrect: true,
      },
      {
        id: 'a-3-46-2',
        text: 'API для работы с мутациями объектов',
        isCorrect: false,
      },
      {
        id: 'a-3-46-3',
        text: 'Механизм для кэширования изменений',
        isCorrect: false,
      },
      {
        id: 'a-3-46-4',
        text: 'Способ оптимизации DOM',
        isCorrect: false,
      },
    ],
    explanation:
      'MutationObserver отслеживает изменения в DOM: добавление/удаление узлов, изменение атрибутов, текста. Более эффективен, чем Mutation Events (устаревшие). Используется для отслеживания динамических изменений.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-47',
    type: 'single',
    question: 'В чём разница между setTimeout и setInterval?',
    answers: [
      {
        id: 'a-3-47-1',
        text: 'setTimeout выполняет функцию один раз через указанную задержку; setInterval повторяет выполнение через указанный интервал',
        isCorrect: true,
      },
      {
        id: 'a-3-47-2',
        text: 'setTimeout для браузера, setInterval для Node.js',
        isCorrect: false,
      },
      {
        id: 'a-3-47-3',
        text: 'и setTimeout, и setInterval зависят от event loop и могут “дрейфовать” под нагрузкой. interval не гарантирует точность и может накапливать задержки',
        isCorrect: false,
      },
      {
        id: 'a-3-47-4',
        text: 'setInterval гарантирует точное выполнение “каждые N мс” независимо от нагрузки, а setTimeout нет',
        isCorrect: false,
      },
    ],
    explanation:
      'setTimeout(fn, delay) выполняет функцию один раз через delay мс. setInterval(fn, interval) повторяет выполнение каждые interval мс. Оба возвращают ID для отмены через clearTimeout/clearInterval.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-48',
    type: 'single',
    question: 'Что такое Promise.resolve() и Promise.reject()?',
    answers: [
      {
        id: 'a-3-48-1',
        text: 'Promise.resolve() создаёт выполненный промис с указанным значением; Promise.reject() создаёт отклонённый промис с указанной ошибкой',
        isCorrect: true,
      },
      {
        id: 'a-3-48-2',
        text: 'Promise.resolve() для успешных операций, Promise.reject() для ошибок',
        isCorrect: false,
      },
      {
        id: 'a-3-48-3',
        text: 'rejected промис можно обработать catch и продолжить цепочку. “Остановки навсегда” нет — цепочка зависит от обработчиков',
        isCorrect: false,
      },
      {
        id: 'a-3-48-4',
        text: 'Promise.reject создаёт выполненный промис, но с “пустым” значением, чтобы сработал finally',
        isCorrect: false,
      },
    ],
    explanation:
      'Promise.resolve(value) создаёт промис в состоянии fulfilled с value. Promise.reject(reason) создаёт промис в состоянии rejected с reason. Полезны для преобразования значений в промисы, тестирования.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-49',
    type: 'single',
    question: 'Что произойдёт, если в async функции не использовать await?',
    answers: [
      {
        id: 'a-3-49-1',
        text: 'Функция всё равно вернёт Promise, который будет выполнен сразу со значением',
        isCorrect: true,
      },
      {
        id: 'a-3-49-2',
        text: 'Функция вернёт undefined',
        isCorrect: false,
      },
      {
        id: 'a-3-49-3',
        text: 'Функция выполнится синхронно',
        isCorrect: false,
      },
      {
        id: 'a-3-49-4',
        text: 'Будет ошибка компиляции',
        isCorrect: false,
      },
    ],
    explanation:
      'async функция всегда возвращает Promise, даже без await. async function fn() { return 42; } вернёт Promise.resolve(42). await нужен только для ожидания результата другого промиса внутри функции.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-50',
    type: 'single',
    question: 'Что такое Promise.finally()?',
    answers: [
      {
        id: 'a-3-50-1',
        text: 'Метод, который выполняется независимо от того, выполнен промис успешно или с ошибкой',
        isCorrect: true,
      },
      {
        id: 'a-3-50-2',
        text: 'Метод, который выполняется только при успехе',
        isCorrect: false,
      },
      {
        id: 'a-3-50-3',
        text: 'Метод, который выполняется только при ошибке',
        isCorrect: false,
      },
      {
        id: 'a-3-50-4',
        text: 'Метод для отмены промиса',
        isCorrect: false,
      },
    ],
    explanation:
      'finally() выполняется всегда: и при успехе (then), и при ошибке (catch). Полезен для cleanup-кода (закрытие соединений, сброс флагов). Не получает аргументов и не изменяет возвращаемое значение промиса.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-51',
    type: 'single',
    question: 'Что такое fetch API и чем он отличается от XMLHttpRequest?',
    answers: [
      {
        id: 'a-3-51-1',
        text: 'fetch — современный API для HTTP-запросов на основе промисов; XMLHttpRequest — старый API на основе событий и колбэков',
        isCorrect: true,
      },
      {
        id: 'a-3-51-2',
        text: 'fetch для GET, XMLHttpRequest для POST',
        isCorrect: false,
      },
      {
        id: 'a-3-51-3',
        text: 'fetch сам по себе не знает про React. Для отмены обычно используют AbortController, а не “автоматическую” отмену при размонтировании',
        isCorrect: false,
      },
      {
        id: 'a-3-51-4',
        text: 'fetch автоматически отклоняет промис на HTTP 4xx/5xx, поэтому response.ok проверять не нужно',
        isCorrect: false,
      },
    ],
    explanation:
      'fetch возвращает Promise, имеет более простой API, основан на промисах. XMLHttpRequest использует события и колбэки, более сложный API. fetch не отправляет cookies автоматически, нужно указывать credentials.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-52',
    type: 'single',
    question: 'Что такое WeakMap и WeakSet?',
    answers: [
      {
        id: 'a-3-52-1',
        text: 'Структуры данных с слабыми ссылками: ключи могут быть удалены сборщиком мусора, если на них нет других ссылок',
        isCorrect: true,
      },
      {
        id: 'a-3-52-2',
        text: 'Слабые версии Map и Set для оптимизации памяти',
        isCorrect: false,
      },
      {
        id: 'a-3-52-3',
        text: 'Map и Set для работы с объектами',
        isCorrect: false,
      },
      {
        id: 'a-3-52-4',
        text: 'WeakMap/WeakSet “слабые” по ссылкам: ключи могут быть GC’нуты, если на них нет сильных ссылок. Это не TTL и не “автоочистка по времени”',
        isCorrect: false,
      },
    ],
    explanation:
      'WeakMap/WeakSet используют слабые ссылки на ключи. Если на объект-ключ нет других ссылок, он может быть удалён сборщиком мусора. Не итерируемы, ключи только объекты. Полезны для метаданных, приватных данных.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-53',
    type: 'single',
    question: 'Что такое Symbol в JavaScript?',
    answers: [
      {
        id: 'a-3-53-1',
        text: 'Примитивный тип для создания уникальных идентификаторов, часто используется как ключи объектов для избежания конфликтов',
        isCorrect: true,
      },
      {
        id: 'a-3-53-2',
        text: 'Тип для работы с символами и строками',
        isCorrect: false,
      },
      {
        id: 'a-3-53-3',
        text: 'Механизм для оптимизации',
        isCorrect: false,
      },
      {
        id: 'a-3-53-4',
        text: 'Способ создания констант',
        isCorrect: false,
      },
    ],
    explanation:
      'Symbol создаёт уникальное значение. Symbol("key") !== Symbol("key"). Используется как ключи объектов для приватных свойств, метаданных. Symbol.iterator, Symbol.toPrimitive — встроенные символы для протоколов.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-54',
    type: 'single',
    question: 'Что такое BigInt в JavaScript?',
    answers: [
      {
        id: 'a-3-54-1',
        text: 'Примитивный тип для работы с целыми числами произвольной точности, создаётся через BigInt() или суффикс n',
        isCorrect: true,
      },
      {
        id: 'a-3-54-2',
        text: 'Тип для больших массивов',
        isCorrect: false,
      },
      {
        id: 'a-3-54-3',
        text: 'Механизм для оптимизации чисел',
        isCorrect: false,
      },
      {
        id: 'a-3-54-4',
        text: 'Способ создания констант',
        isCorrect: false,
      },
    ],
    explanation:
      'BigInt для целых чисел произвольной точности. Создание: BigInt(123) или 123n. Нельзя смешивать с number в операциях без явного преобразования. Полезен для больших чисел, криптографии, точных вычислений.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-55',
    type: 'single',
    question: 'Что такое rest и spread операторы?',
    answers: [
      {
        id: 'a-3-55-1',
        text: 'rest (...) собирает оставшиеся элементы в массив/объект; spread (...) распаковывает элементы массива/объекта',
        isCorrect: true,
      },
      {
        id: 'a-3-55-2',
        text: 'rest для массивов, spread для объектов',
        isCorrect: false,
      },
      {
        id: 'a-3-55-3',
        text: 'rest/spread — один синтаксис, но разные контексты. И в массивах, и в объектах есть и rest, и spread',
        isCorrect: false,
      },
      {
        id: 'a-3-55-4',
        text: 'rest распаковывает массив/объект, а spread собирает “остаток” в массив',
        isCorrect: false,
      },
    ],
    explanation:
      'rest: function(...args) собирает аргументы в массив. spread: [...arr1, ...arr2] распаковывает элементы. В объектах: { ...obj1, ...obj2 } объединяет свойства. Оба используют один оператор, но в разных контекстах.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-56',
    type: 'single',
    question: 'Что такое деструктуризация с значениями по умолчанию?',
    answers: [
      {
        id: 'a-3-56-1',
        text: 'Синтаксис для извлечения значений с указанием значений по умолчанию, если свойство отсутствует или undefined',
        isCorrect: true,
      },
      {
        id: 'a-3-56-2',
        text: 'Способ создания новых объектов',
        isCorrect: false,
      },
      {
        id: 'a-3-56-3',
        text: 'Механизм для оптимизации',
        isCorrect: false,
      },
      {
        id: 'a-3-56-4',
        text: 'Способ работы с массивами',
        isCorrect: false,
      },
    ],
    explanation:
      'Деструктуризация с default: const { name = "Guest", age = 0 } = user;. Если свойство отсутствует или undefined, используется значение по умолчанию. Работает и для массивов: const [a = 1, b = 2] = arr;',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-57',
    type: 'single',
    question: 'Что такое template literals (шаблонные строки) в JavaScript?',
    answers: [
      {
        id: 'a-3-57-1',
        text: 'Строки с обратными кавычками, которые позволяют вставлять выражения через ${} и использовать многострочный текст',
        isCorrect: true,
      },
      {
        id: 'a-3-57-2',
        text: 'Способ создания шаблонов для HTML',
        isCorrect: false,
      },
      {
        id: 'a-3-57-3',
        text: 'Механизм для работы с форматами',
        isCorrect: false,
      },
      {
        id: 'a-3-57-4',
        text: 'Способ оптимизации строк',
        isCorrect: false,
      },
    ],
    explanation:
      'Template literals: `Hello, ${name}!`. Позволяют вставлять выражения через ${}, использовать многострочный текст, tagged templates (функции для обработки шаблонов). Более удобны, чем конкатенация строк.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-58',
    type: 'single',
    question: 'Что такое optional chaining (?.) в JavaScript?',
    answers: [
      {
        id: 'a-3-58-1',
        text: 'Оператор для безопасного доступа к свойствам вложенных объектов, возвращает undefined вместо ошибки, если свойство отсутствует',
        isCorrect: true,
      },
      {
        id: 'a-3-58-2',
        text: 'Оператор для опциональных параметров функций',
        isCorrect: false,
      },
      {
        id: 'a-3-58-3',
        text: 'Механизм для работы с массивами',
        isCorrect: false,
      },
      {
        id: 'a-3-58-4',
        text: 'Способ оптимизации доступа',
        isCorrect: false,
      },
    ],
    explanation:
      'Optional chaining: user?.profile?.email. Если user или profile null/undefined, вернёт undefined вместо ошибки. Работает с методами: obj?.method?.(), массивами: arr?.[0]. Упрощает проверки на null/undefined.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-59',
    type: 'single',
    question: 'Что такое nullish coalescing (??) в JavaScript?',
    answers: [
      {
        id: 'a-3-59-1',
        text: 'Оператор, который возвращает правый операнд, если левый равен null или undefined, иначе возвращает левый',
        isCorrect: true,
      },
      {
        id: 'a-3-59-2',
        text: 'Оператор для объединения значений',
        isCorrect: false,
      },
      {
        id: 'a-3-59-3',
        text: 'Механизм для работы с массивами',
        isCorrect: false,
      },
      {
        id: 'a-3-59-4',
        text: 'Способ оптимизации',
        isCorrect: false,
      },
    ],
    explanation:
      'Nullish coalescing: value ?? defaultValue. Возвращает defaultValue только если value === null || value === undefined. В отличие от ||, не заменяет falsy значения (0, "", false). Полезен для значений по умолчанию.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-60',
    type: 'single',
    question: 'Что такое Array.from() и зачем он нужен?',
    answers: [
      {
        id: 'a-3-60-1',
        text: 'Метод для создания массива из итерируемых объектов (NodeList, строки, arguments) или массивоподобных объектов',
        isCorrect: true,
      },
      {
        id: 'a-3-60-2',
        text: 'Метод для преобразования массивов в строки',
        isCorrect: false,
      },
      {
        id: 'a-3-60-3',
        text: 'Механизм для копирования массивов',
        isCorrect: false,
      },
      {
        id: 'a-3-60-4',
        text: 'Способ оптимизации массивов',
        isCorrect: false,
      },
    ],
    explanation:
      'Array.from() создаёт массив из итерируемых объектов. Примеры: Array.from("hello"), Array.from(nodeList), Array.from({length: 5}, (_, i) => i). Полезен для преобразования NodeList/HTMLCollection в массив.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-61',
    type: 'single',
    question:
      'Что выведет код и почему? function f(){ "use strict"; return this } console.log(f())',
    answers: [
      {
        id: 'a-3-61-1',
        text: 'undefined, потому что в strict mode this в обычном вызове функции равен undefined',
        isCorrect: true,
      },
      {
        id: 'a-3-61-2',
        text: 'window, потому что this всегда указывает на глобальный объект',
        isCorrect: false,
      },
      {
        id: 'a-3-61-3',
        text: 'ReferenceError, потому что this запрещён в strict mode',
        isCorrect: false,
      },
      {
        id: 'a-3-61-4',
        text: 'null, потому что this по умолчанию null',
        isCorrect: false,
      },
    ],
    explanation:
      'this определяется в момент вызова. Обычный вызов fn() в strict mode даёт this = undefined (в нестрогом режиме это обычно globalThis/window).',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-62',
    type: 'single',
    question:
      'Почему setTimeout(obj.method, 0) часто “теряет” this, и какой самый надёжный фикс?',
    answers: [
      {
        id: 'a-3-62-1',
        text: 'Передаётся ссылка на функцию без объекта слева, поэтому вызов становится fn(); фикс: bind(obj) или обёртка () => obj.method()',
        isCorrect: true,
      },
      {
        id: 'a-3-62-2',
        text: 'setTimeout выполняет код в другом потоке и обнуляет контекст; фикс: добавить "use strict"',
        isCorrect: false,
      },
      {
        id: 'a-3-62-3',
        text: 'Проблема в очереди microtasks; фикс: заменить setTimeout на Promise.then',
        isCorrect: false,
      },
      {
        id: 'a-3-62-4',
        text: 'Проблема в стрелочных функциях; фикс: переписать метод на arrow',
        isCorrect: false,
      },
    ],
    explanation:
      'Когда метод отрывают от объекта, он вызывается как обычная функция. bind фиксирует this навсегда, стрелочная обёртка сохраняет вызов как метод.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-63',
    type: 'single',
    question:
      'Что выведет код и почему? const obj = { a: 1, f: () => this.a }; console.log(obj.f())',
    answers: [
      {
        id: 'a-3-63-1',
        text: 'undefined (или значение из внешнего this), потому что стрелка не имеет собственного this и не привязывается к obj',
        isCorrect: true,
      },
      {
        id: 'a-3-63-2',
        text: '1, потому что this всегда указывает на объект слева от точки',
        isCorrect: false,
      },
      {
        id: 'a-3-63-3',
        text: 'TypeError, потому что стрелочные функции нельзя вызывать',
        isCorrect: false,
      },
      {
        id: 'a-3-63-4',
        text: '0, потому что this в стрелке равен 0 по умолчанию',
        isCorrect: false,
      },
    ],
    explanation:
      'Стрелочные функции “захватывают” this лексически и не получают this от способа вызова. Поэтому f не станет методом в смысле this.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-64',
    type: 'single',
    question: 'Почему замыкание может привести к утечке памяти в браузере?',
    answers: [
      {
        id: 'a-3-64-1',
        text: 'Потому что функция удерживает ссылки на переменные из внешнего окружения, и они не могут быть собраны GC, пока живо замыкание',
        isCorrect: true,
      },
      {
        id: 'a-3-64-2',
        text: 'Потому что замыкания запрещают сборку мусора полностью',
        isCorrect: false,
      },
      {
        id: 'a-3-64-3',
        text: 'Потому что замыкания автоматически создают глобальные переменные',
        isCorrect: false,
      },
      {
        id: 'a-3-64-4',
        text: 'Потому что замыкания работают только в strict mode и ломают GC',
        isCorrect: false,
      },
    ],
    explanation:
      'Проблема не в замыкании как таковом, а в удержании больших объектов/DOM-ссылок через живую функцию-обработчик/таймер/кеш.',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-65',
    type: 'multiple',
    question: 'Какие утверждения про прототипную цепочку верны?',
    answers: [
      {
        id: 'a-3-65-1',
        text: 'Если свойство не найдено на объекте, JS ищет его по цепочке __proto__ (prototype chain)',
        isCorrect: true,
      },
      {
        id: 'a-3-65-2',
        text: 'Object.create(proto) создаёт объект, у которого [[Prototype]] указывает на proto',
        isCorrect: true,
      },
      {
        id: 'a-3-65-3',
        text: 'Стрелочные функции имеют собственное свойство prototype и подходят для new',
        isCorrect: false,
      },
      {
        id: 'a-3-65-4',
        text: 'Методы, определённые в class, физически копируются в каждый инстанс',
        isCorrect: false,
      },
    ],
    explanation:
      'В class методы попадают в prototype, а не копируются в каждый объект. new работает с функциями-конструкторами (не со стрелками).',
    chapterId: 'chapter-3-2',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-66',
    type: 'single',
    question: 'Что выведет код и почему? console.log(typeof null)',
    answers: [
      {
        id: 'a-3-66-1',
        text: '"object" — это исторический баг JavaScript',
        isCorrect: true,
      },
      {
        id: 'a-3-66-2',
        text: '"null" — отдельный тип в JS',
        isCorrect: false,
      },
      {
        id: 'a-3-66-3',
        text: '"undefined" — потому что null означает отсутствие значения',
        isCorrect: false,
      },
      {
        id: 'a-3-66-4',
        text: '"boolean" — потому что null ложное значение',
        isCorrect: false,
      },
    ],
    explanation:
      'typeof null === "object" — известный баг с первых версий языка. Для проверки null обычно используют value === null.',
    chapterId: 'chapter-3-1',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-67',
    type: 'single',
    question:
      'Что выведет код? Promise.resolve().then(() => console.log(1)); setTimeout(() => console.log(2), 0); console.log(3)',
    answers: [
      {
        id: 'a-3-67-1',
        text: '3, 1, 2 (сначала синхронный код, потом microtasks, потом macrotasks)',
        isCorrect: true,
      },
      {
        id: 'a-3-67-2',
        text: '1, 3, 2',
        isCorrect: false,
      },
      {
        id: 'a-3-67-3',
        text: '3, 2, 1',
        isCorrect: false,
      },
      {
        id: 'a-3-67-4',
        text: '2, 1, 3',
        isCorrect: false,
      },
    ],
    explanation:
      'Синхронный код выполняется сразу. Promise.then — microtask и выполняется перед следующей macrotask (setTimeout).',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-68',
    type: 'single',
    question:
      'Что произойдёт, если внутри then вы забыли return промиса/значения, но рассчитываете использовать результат дальше по цепочке?',
    answers: [
      {
        id: 'a-3-68-1',
        text: 'Следующий then получит undefined, потому что вы не вернули значение/промис из предыдущего then',
        isCorrect: true,
      },
      {
        id: 'a-3-68-2',
        text: 'Promise автоматически “додумает” return и вернёт результат последнего выражения',
        isCorrect: false,
      },
      {
        id: 'a-3-68-3',
        text: 'Это приведёт к синтаксической ошибке',
        isCorrect: false,
      },
      {
        id: 'a-3-68-4',
        text: 'JavaScript выбросит TypeError только в strict mode',
        isCorrect: false,
      },
    ],
    explanation:
      'Каждый then возвращает новый промис. Если callback ничего не вернул, в цепочку пойдёт undefined.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-69',
    type: 'single',
    question:
      'Чем Promise.all отличается от Promise.allSettled в контексте отказоустойчивости?',
    answers: [
      {
        id: 'a-3-69-1',
        text: 'Promise.all “падает” на первой ошибке, allSettled всегда ждёт завершения всех промисов и возвращает статусы',
        isCorrect: true,
      },
      {
        id: 'a-3-69-2',
        text: 'Promise.all выполняет промисы последовательно, allSettled — параллельно',
        isCorrect: false,
      },
      {
        id: 'a-3-69-3',
        text: 'allSettled существует только в Node.js, а в браузере нет',
        isCorrect: false,
      },
      {
        id: 'a-3-69-4',
        text: 'Promise.allSettled завершится “раньше”, чем Promise.all, потому что не ждёт успешные промисы после первой ошибки',
        isCorrect: false,
      },
    ],
    explanation:
      'all подходит, когда “все обязательны”. allSettled — когда нужно собрать результаты даже при частичных ошибках (например, метрики/несколько независимых источников).',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-70',
    type: 'multiple',
    question:
      'Какие проблемы чаще всего возникают при смешивании async/await и .then() в одном и том же участке кода?',
    answers: [
      {
        id: 'a-3-70-1',
        text: 'Потеря контроля над цепочкой: ошибки и return становятся менее очевидными, легко “забыть” await или return',
        isCorrect: true,
      },
      {
        id: 'a-3-70-2',
        text: 'Гарантированный memory leak в любом браузере',
        isCorrect: false,
      },
      {
        id: 'a-3-70-3',
        text: 'Двойное выполнение промиса из-за microtasks',
        isCorrect: false,
      },
      {
        id: 'a-3-70-4',
        text: 'Сложнее читать и дебажить, особенно при нескольких then и вложенных await',
        isCorrect: true,
      },
    ],
    explanation:
      'Это не “запрещено”, но часто ухудшает читаемость и повышает шанс пропустить return/await и сломать обработку ошибок.',
    chapterId: 'chapter-3-4',
    partId: 'part-3',
    difficulty: 'hard',
  },
  {
    id: 'q-3-71',
    type: 'single',
    question:
      'Почему event delegation обычно лучше, чем навесить обработчик на каждый элемент списка?',
    answers: [
      {
        id: 'a-3-71-1',
        text: 'Меньше обработчиков → меньше памяти/нагрузки, и работает для динамически добавленных элементов из-за всплытия',
        isCorrect: true,
      },
      {
        id: 'a-3-71-2',
        text: 'Потому что делегирование переводит события в microtasks',
        isCorrect: false,
      },
      {
        id: 'a-3-71-3',
        text: 'делегирование использует bubbling: событие всё равно всплывает, просто вы ставите один обработчик выше и фильтруете target. Выигрыш — меньше обработчиков и проще динамические списки',
        isCorrect: false,
      },
      {
        id: 'a-3-71-4',
        text: 'Потому что addEventListener запрещён на элементах',
        isCorrect: false,
      },
    ],
    explanation:
      'События всплывают вверх. Один обработчик на контейнере может обслуживать много дочерних элементов и новые элементы, добавленные позже.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-72',
    type: 'single',
    question:
      'Почему removeEventListener часто “не работает”, если обработчик был добавлен как анонимная функция?',
    answers: [
      {
        id: 'a-3-72-1',
        text: 'Потому что removeEventListener требует ту же самую ссылку на функцию, а анонимную функцию вы не можете передать повторно',
        isCorrect: true,
      },
      {
        id: 'a-3-72-2',
        text: 'Потому что removeEventListener работает только в capturing phase',
        isCorrect: false,
      },
      {
        id: 'a-3-72-3',
        text: 'Потому что обработчики событий нельзя удалять в JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-3-72-4',
        text: 'Потому что события хранятся в DOM и не связаны с функциями',
        isCorrect: false,
      },
    ],
    explanation:
      'Нужно сохранять ссылку: const handler = () => {...}; el.addEventListener(..., handler); el.removeEventListener(..., handler).',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'easy',
  },
  {
    id: 'q-3-73',
    type: 'single',
    question:
      'В чём практическая опасность innerHTML при вставке пользовательского ввода?',
    answers: [
      {
        id: 'a-3-73-1',
        text: 'XSS: пользователь может вставить HTML/скрипт/inline-обработчики и выполнить произвольный JS в вашем origin',
        isCorrect: true,
      },
      {
        id: 'a-3-73-2',
        text: 'innerHTML делает DOM “read-only” и ломает события',
        isCorrect: false,
      },
      {
        id: 'a-3-73-3',
        text: 'innerHTML запрещён спецификацией HTML5',
        isCorrect: false,
      },
      {
        id: 'a-3-73-4',
        text: 'innerHTML не работает в современных браузерах без polyfill',
        isCorrect: false,
      },
    ],
    explanation:
      'innerHTML интерпретирует строку как HTML. Без санитизации это прямой путь к XSS. Для текста используйте textContent.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'medium',
  },
  {
    id: 'q-3-74',
    type: 'single',
    question:
      'В чём ключевая разница между HTMLCollection и NodeList в плане “живости” коллекции?',
    answers: [
      {
        id: 'a-3-74-1',
        text: 'HTMLCollection обычно “живая” (обновляется при изменениях DOM), NodeList чаще статичная (например, querySelectorAll)',
        isCorrect: true,
      },
      {
        id: 'a-3-74-2',
        text: 'NodeList всегда живой, HTMLCollection всегда статичный',
        isCorrect: false,
      },
      {
        id: 'a-3-74-3',
        text: 'Ключевое отличие — “живость”: HTMLCollection часто live, NodeList от querySelectorAll обычно snapshot. Методы — вторично',
        isCorrect: false,
      },
      {
        id: 'a-3-74-4',
        text: 'HTMLCollection может содержать только текстовые узлы',
        isCorrect: false,
      },
    ],
    explanation:
      'Важно на собесе: querySelectorAll даёт NodeList (обычно snapshot), а getElementsBy* часто возвращает live HTMLCollection. “Живость” может быть источником неожиданных багов.',
    chapterId: 'chapter-3-3',
    partId: 'part-3',
    difficulty: 'hard',
  },
]
