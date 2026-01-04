import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части IV. Инфраструктура
 */
export const part4Questions: QuizQuestion[] = [
  {
    id: 'q-4-1',
    type: 'single',
    question:
      'Вы собираете фронтенд и замечаете, что в бандл попали функции, которые нигде не используются. Как называется оптимизация, которая пытается удалить “мёртвый” код из итогового бандла?',
    answers: [
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
      {
        id: 'a-4-1-2',
        text: 'Процесс оптимизации DOM-дерева',
        isCorrect: false,
      },
      {
        id: 'a-4-1-1',
        text: 'Процесс удаления неиспользуемого кода из финального бандла',
        isCorrect: true,
      },
    ],
    explanation:
      'Tree shaking — это процесс удаления неиспользуемого кода (мёртвого кода) из финального бандла, что уменьшает размер приложения.',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-2',
    type: 'single',
    question:
      'У проекта десятки модулей, ассеты и разные форматы файлов, а в браузер нужно отдать несколько оптимизированных бандлов. Какую задачу решает Webpack (или аналогичный сборщик) и в чём его роль?',
    answers: [
      {
        id: 'a-4-2-1',
        text: 'Модульный сборщик, который объединяет модули и их зависимости в один или несколько бандлов',
        isCorrect: true,
      },
      {
        id: 'a-4-2-4',
        text: 'Инструмент для тестирования кода и покрытия тестами',
        isCorrect: false,
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
    question:
      'Вы подключаете зависимости, запускаете скрипты и хотите, чтобы проект воспроизводимо собирался на CI. За что отвечает `npm`, и какую роль играет `package.json`?',
    answers: [
      {
        id: 'a-4-3-2',
        text: 'npm — система сборки проектов, package.json — конфигурация для компиляции',
        isCorrect: false,
      },
      {
        id: 'a-4-3-1',
        text: 'npm — менеджер пакетов для Node.js, package.json — файл с метаданными проекта и зависимостями',
        isCorrect: true,
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
  {
    id: 'q-4-4',
    type: 'single',
    question:
      'Команда спорит о покрытии: что считать “юнитами”, а что — интеграцией. В чём практическая разница между unit-тестами и integration-тестами?',
    answers: [
      {
        id: 'a-4-4-4',
        text: 'Разница только в среде: unit-тесты запускаются в Node.js, а integration-тесты возможны только в браузере “как у пользователя”',
        isCorrect: false,
      },
      {
        id: 'a-4-4-3',
        text: 'Unit-тесты относятся к фронтенду, а integration-тесты — к бэкенду: это просто “разделение по слоям”',
        isCorrect: false,
      },
      {
        id: 'a-4-4-1',
        text: 'Unit проверяет изолированную единицу (часто с моками), integration — взаимодействие нескольких модулей/слоёв и их контракты',
        isCorrect: true,
      },
      {
        id: 'a-4-4-2',
        text: 'Integration-тесты обычно быстрее: они ближе к реальности, поэтому моков меньше и “всё выполняется проще”',
        isCorrect: false,
      },
    ],
    explanation:
      'Unit-тесты проверяют изолированные единицы кода (функции, компоненты) в изоляции. Integration-тесты проверяют взаимодействие нескольких модулей или систем.',
    chapterId: 'chapter-4-3',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-5',
    type: 'multiple',
    question:
      'Вы выбираете инструменты под разные уровни тестирования: unit, component, e2e. Какие из перечисленных действительно относятся к тестовым инструментам/раннерам?',
    answers: [
      {
        id: 'a-4-5-1',
        text: 'Jest',
        isCorrect: true,
      },
      {
        id: 'a-4-5-4',
        text: 'Playwright',
        isCorrect: true,
      },
      {
        id: 'a-4-5-5',
        text: 'Cypress',
        isCorrect: true,
      },
      {
        id: 'a-4-5-6',
        text: 'Webpack',
        isCorrect: false,
      },
      {
        id: 'a-4-5-3',
        text: 'React Testing Library',
        isCorrect: true,
      },
      {
        id: 'a-4-5-2',
        text: 'Vitest',
        isCorrect: true,
      },
    ],
    explanation:
      'Для тестирования используются: Jest/Vitest (unit-тесты), React Testing Library (компоненты), Playwright/Cypress (e2e-тесты). Webpack — это сборщик, не инструмент тестирования.',
    chapterId: 'chapter-4-3',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-4-6',
    type: 'single',
    question:
      'В тесте вы хотите изолировать код от внешней зависимости (сеть, база, модуль) и контролировать ответы этой зависимости. Как называется такой приём в тестировании?',
    answers: [
      {
        id: 'a-4-6-3',
        text: 'Механизм кэширования результатов тестов',
        isCorrect: false,
      },
      {
        id: 'a-4-6-2',
        text: 'Способ ускорения выполнения тестов',
        isCorrect: false,
      },
      {
        id: 'a-4-6-1',
        text: 'Имитации зависимостей, которые заменяют реальные объекты для изоляции тестируемого кода',
        isCorrect: true,
      },
      {
        id: 'a-4-6-4',
        text: 'Способ автоматической генерации тестовых данных',
        isCorrect: false,
      },
    ],
    explanation:
      'Моки — это имитации зависимостей (функций, модулей, API), которые позволяют изолировать тестируемый код и контролировать поведение зависимостей.',
    chapterId: 'chapter-4-3',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-7',
    type: 'single',
    question:
      'В чём разница между dependencies и devDependencies в package.json?',
    answers: [
      {
        id: 'a-4-7-2',
        text: 'dependencies всегда попадают в production-бандл, а devDependencies никогда не устанавливаются ни на CI, ни в Docker',
        isCorrect: false,
      },
      {
        id: 'a-4-7-4',
        text: 'devDependencies — это зависимости, которые обязательно идут в production, а dependencies нужны только локально “для разработки”',
        isCorrect: false,
      },
      {
        id: 'a-4-7-1',
        text: 'dependencies нужны в runtime, devDependencies только для разработки (сборка, тесты, линтеры)',
        isCorrect: true,
      },
      {
        id: 'a-4-7-3',
        text: 'devDependencies ставятся в production в первую очередь, иначе приложение не сможет стартовать без инструментов сборки',
        isCorrect: false,
      },
    ],
    explanation:
      'dependencies устанавливаются в production и нужны для работы приложения. devDependencies устанавливаются только в development (webpack, jest, eslint) и не нужны в runtime.',
    chapterId: 'chapter-4-1',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-4-8',
    type: 'single',
    question:
      'Вы видите версию пакета вида `2.3.1` и хотите понять, что означают изменения каждой цифры. Что такое SemVer (Semantic Versioning) и что обычно означают MAJOR/MINOR/PATCH?',
    answers: [
      {
        id: 'a-4-8-1',
        text: 'Система версионирования MAJOR.MINOR.PATCH, где MAJOR — breaking changes, MINOR — новые фичи, PATCH — багфиксы',
        isCorrect: true,
      },
      {
        id: 'a-4-8-3',
        text: 'Механизм кэширования: MAJOR/MINOR/PATCH — уровни кэша, которые ускоряют установку зависимостей',
        isCorrect: false,
      },
      {
        id: 'a-4-8-4',
        text: 'Просто способ нумерации релизов: цифры не несут смысла о совместимости и зависят только от количества коммитов',
        isCorrect: false,
      },
      {
        id: 'a-4-8-2',
        text: 'Способ автообновления: npm сам повышает MAJOR/MINOR/PATCH при установке, чтобы всегда ставилась “самая новая” версия',
        isCorrect: false,
      },
    ],
    explanation:
      'SemVer: MAJOR (несовместимые изменения), MINOR (обратно совместимые фичи), PATCH (багфиксы). Символы: ^ (обновление MINOR/PATCH), ~ (только PATCH), без символа (строгая версия).',
    chapterId: 'chapter-4-1',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-4-9',
    type: 'single',
    question:
      'Что такое lock-файлы (package-lock.json, yarn.lock, pnpm-lock.yaml)?',
    answers: [
      {
        id: 'a-4-9-4',
        text: 'Файлы для резервного копирования',
        isCorrect: false,
      },
      {
        id: 'a-4-9-3',
        text: 'Файлы для оптимизации установки',
        isCorrect: false,
      },
      {
        id: 'a-4-9-1',
        text: 'Файлы, которые фиксируют точные версии всех зависимостей для гарантии одинаковой сборки на всех машинах',
        isCorrect: true,
      },
      {
        id: 'a-4-9-2',
        text: 'Файлы для кэширования пакетов',
        isCorrect: false,
      },
    ],
    explanation:
      'Lock-файлы фиксируют дерево зависимостей с точными версиями. Обязательны для коммита в репозиторий. Гарантируют одинаковую сборку на всех машинах и предотвращают проблемы с "работает на моей машине".',
    chapterId: 'chapter-4-1',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-4-10',
    type: 'single',
    question:
      'Команда выбирает менеджер пакетов и обсуждает скорость установки, экономию места и “странные” зависимости. В чём практическая разница между npm, Yarn и pnpm?',
    answers: [
      {
        id: 'a-4-10-3',
        text: 'pnpm отличается только названием lock-файла; по модели node_modules и разрешению зависимостей он идентичен npm',
        isCorrect: false,
      },
      {
        id: 'a-4-10-2',
        text: 'npm для Node.js, yarn для React, pnpm для Vue',
        isCorrect: false,
      },
      {
        id: 'a-4-10-1',
        text: 'npm — стандарт, Yarn исторически оптимизировал установку, pnpm экономит место за счёт общего хранилища и ссылок',
        isCorrect: true,
      },
      {
        id: 'a-4-10-4',
        text: 'npm/yarn/pnpm отличаются только названием: lockfile и алгоритм установки у них одинаковые',
        isCorrect: false,
      },
    ],
    explanation:
      'npm — стандартный менеджер, идёт с Node.js. yarn — быстрее, deterministic installs. pnpm — использует content-addressable storage и symlinks, экономит место, предотвращает phantom dependencies.',
    chapterId: 'chapter-4-1',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-11',
    type: 'single',
    question:
      'На большом проекте dev-сервер на Webpack стартует долго, и HMR ощутимо тормозит. Почему многие переходят на Vite, и в чём ключевое отличие Vite от Webpack (особенно в dev-режиме)?',
    answers: [
      {
        id: 'a-4-11-2',
        text: 'Vite работает только с Vue, а Webpack — только с React; в других сочетаниях они “не поддерживаются”',
        isCorrect: false,
      },
      {
        id: 'a-4-11-4',
        text: 'Vite и Webpack обязаны бандлить весь проект перед стартом dev-сервера, поэтому скорость старта и HMR почти одинаковые',
        isCorrect: false,
      },
      {
        id: 'a-4-11-3',
        text: 'Vite быстрее только в TypeScript-проектах: в чистом JavaScript Webpack обычно выигрывает за счёт оптимизаций бандлинга',
        isCorrect: false,
      },
      {
        id: 'a-4-11-1',
        text: 'Vite в dev отдаёт модули через нативный ESM (быстрее старт/HMR), а Webpack в dev часто бандлит и пересобирает больше',
        isCorrect: true,
      },
    ],
    explanation:
      'Vite использует ES modules в dev (быстрая HMR), Rollup для продакшена. Webpack бандлит всё в dev и продакшене. Vite быстрее в dev благодаря нативным ESM браузера.',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-12',
    type: 'single',
    question:
      'Первая загрузка приложения слишком тяжёлая, но большая часть кода нужна только на отдельных страницах. Как называется техника разделения кода на чанки, которые грузятся по требованию?',
    answers: [
      {
        id: 'a-4-12-4',
        text: 'Способ оптимизации CSS',
        isCorrect: false,
      },
      {
        id: 'a-4-12-2',
        text: 'Процесс разделения кода на отдельные файлы',
        isCorrect: false,
      },
      {
        id: 'a-4-12-3',
        text: 'Механизм для удаления неиспользуемого кода',
        isCorrect: false,
      },
      {
        id: 'a-4-12-1',
        text: 'Техника разделения кода на несколько бандлов, которые загружаются по требованию',
        isCorrect: true,
      },
    ],
    explanation:
      'Code splitting разделяет код на чанки, которые загружаются по требованию (lazy loading). Уменьшает первоначальный размер бандла. В React: React.lazy(), динамические импорты.',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-13',
    type: 'single',
    question:
      'В dev-режиме вы меняете файл компонента, и страница обновляется без полного refresh и без потери состояния. Как называется этот механизм и что он делает?',
    answers: [
      {
        id: 'a-4-13-3',
        text: 'Способ кэширования модулей',
        isCorrect: false,
      },
      {
        id: 'a-4-13-4',
        text: 'Механизм для оптимизации бандла',
        isCorrect: false,
      },
      {
        id: 'a-4-13-2',
        text: 'Механизм для замены модулей в продакшене',
        isCorrect: false,
      },
      {
        id: 'a-4-13-1',
        text: 'Технология, которая обновляет модули в браузере без полной перезагрузки страницы',
        isCorrect: true,
      },
    ],
    explanation:
      'HMR обновляет изменённые модули в браузере без перезагрузки страницы, сохраняя состояние приложения. Ускоряет разработку. Поддерживается Webpack, Vite и другими сборщиками.',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-14',
    type: 'single',
    question:
      'Нужно проверить полный пользовательский сценарий “как в браузере”: открыть страницу, нажать кнопки, увидеть результат. Как называются такие тесты и чем они отличаются от unit/component?',
    answers: [
      {
        id: 'a-4-14-2',
        text: 'Тесты для проверки только UI',
        isCorrect: false,
      },
      {
        id: 'a-4-14-3',
        text: 'Тесты для проверки только API',
        isCorrect: false,
      },
      {
        id: 'a-4-14-1',
        text: 'Тесты, которые проверяют работу всего приложения от начала до конца, как это делает пользователь',
        isCorrect: true,
      },
      {
        id: 'a-4-14-4',
        text: 'Тесты для проверки производительности',
        isCorrect: false,
      },
    ],
    explanation:
      'E2E-тесты проверяют полный пользовательский сценарий: открытие страницы, взаимодействие, проверка результата. Инструменты: Playwright, Cypress, Selenium. Медленнее unit-тестов, но проверяют реальное поведение.',
    chapterId: 'chapter-4-3',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-4-15',
    type: 'single',
    question:
      'Вы хотите зафиксировать “снимок” UI-вывода компонента и ловить непреднамеренные изменения разметки при следующих прогонах. Как называются такие тесты?',
    answers: [
      {
        id: 'a-4-15-2',
        text: 'Тесты для проверки производительности',
        isCorrect: false,
      },
      {
        id: 'a-4-15-3',
        text: 'Тесты для проверки безопасности',
        isCorrect: false,
      },
      {
        id: 'a-4-15-1',
        text: 'Тесты, которые сохраняют "снимок" вывода компонента/функции и сравнивают с ним при следующих запусках',
        isCorrect: true,
      },
      {
        id: 'a-4-15-4',
        text: 'Тесты для проверки API',
        isCorrect: false,
      },
    ],
    explanation:
      'Snapshot-тесты сохраняют структурированный вывод (HTML, JSON) и сравнивают при следующих запусках. Полезны для UI-компонентов. Проблема: могут ломаться при легитимных изменениях. Jest поддерживает snapshot-тесты.',
    chapterId: 'chapter-4-3',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-16',
    type: 'single',
    question:
      'Вы пишете библиотеку компонентов для React и не хотите тащить второй React внутрь своей библиотеки. Какую категорию зависимостей используют, чтобы потребитель проекта “предоставил” зависимость сам?',
    answers: [
      {
        id: 'a-4-16-4',
        text: 'Зависимости для тестирования',
        isCorrect: false,
      },
      {
        id: 'a-4-16-1',
        text: 'Зависимости, которые должны быть предоставлены приложением, использующим библиотеку',
        isCorrect: true,
      },
      {
        id: 'a-4-16-2',
        text: 'Зависимости для разработки библиотеки',
        isCorrect: false,
      },
      {
        id: 'a-4-16-3',
        text: 'Опциональные зависимости',
        isCorrect: false,
      },
    ],
    explanation:
      'peerDependencies указывают, что библиотека ожидает, что приложение предоставит эти зависимости. Это предотвращает дублирование зависимостей. Пример: библиотека React-компонентов указывает react как peerDependency.',
    chapterId: 'chapter-4-1',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-17',
    type: 'single',
    question:
      'В production-сборке размер JS должен быть меньше: убрать пробелы/комментарии, сократить идентификаторы. Как называется этот процесс?',
    answers: [
      {
        id: 'a-4-17-1',
        text: 'Процесс удаления пробелов, комментариев и сокращения имён переменных для уменьшения размера файла',
        isCorrect: true,
      },
      {
        id: 'a-4-17-2',
        text: 'Процесс удаления неиспользуемого кода',
        isCorrect: false,
      },
      {
        id: 'a-4-17-4',
        text: 'Процесс разделения кода на модули',
        isCorrect: false,
      },
      {
        id: 'a-4-17-3',
        text: 'Процесс оптимизации производительности',
        isCorrect: false,
      },
    ],
    explanation:
      'Минификация удаляет пробелы, комментарии, сокращает имена переменных/функций. Уменьшает размер файла на 30-70%. Инструменты: terser, uglify-js. Обычно применяется в production-сборке.',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'easy',
  },
  {
    id: 'q-4-18',
    type: 'single',
    question:
      'В проде код минифицирован, но вы хотите видеть в DevTools оригинальные файлы/строки при отладке и ошибках. Какие файлы для этого используются?',
    answers: [
      {
        id: 'a-4-18-4',
        text: 'Файлы для кэширования',
        isCorrect: false,
      },
      {
        id: 'a-4-18-2',
        text: 'Карты зависимостей между модулями',
        isCorrect: false,
      },
      {
        id: 'a-4-18-1',
        text: 'Файлы, которые связывают минифицированный/транспилированный код с исходным кодом для отладки',
        isCorrect: true,
      },
      {
        id: 'a-4-18-3',
        text: 'Файлы для оптимизации бандла',
        isCorrect: false,
      },
    ],
    explanation:
      'Source maps (.map файлы) позволяют отлаживать минифицированный/транспилированный код, видя исходный код в DevTools. Включаются в dev, опциональны в production (увеличивают размер, но помогают отладке).',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-19',
    type: 'single',
    question:
      'CI “краснеет” не из-за багов, а из‑за случайных падений (тайминги, сеть, анимации), и команда перестаёт доверять тестам. Почему flaky E2E-тесты особенно вредны?',
    answers: [
      {
        id: 'a-4-19-1',
        text: 'Они подрывают доверие к тестам: команда перестаёт реагировать на падения, и CI теряет смысл как “сигнал”',
        isCorrect: true,
      },
      {
        id: 'a-4-19-2',
        text: 'Потому что flaky тесты делают bundle больше',
        isCorrect: false,
      },
      {
        id: 'a-4-19-3',
        text: 'Потому что flaky тесты нельзя запускать локально',
        isCorrect: false,
      },
      {
        id: 'a-4-19-4',
        text: 'Flaky тесты — это нормально: их лучше лечить `sleep(5000)`, чтобы “успевало прогрузиться”',
        isCorrect: false,
      },
    ],
    explanation:
      'Флейки повышают стоимость разработки: ретраи, ручные проверки, игнорирование CI. На собесе важно уметь назвать причины (тайминги, сеть, анимации) и методы стабилизации.',
    chapterId: 'chapter-4-3',
    partId: 'part-4',
    difficulty: 'hard',
  },
  {
    id: 'q-4-20',
    type: 'multiple',
    question:
      'Какие практики чаще всего уменьшают флейки в E2E (Playwright/Cypress)?',
    answers: [
      {
        id: 'a-4-20-2',
        text: 'Стабилизировать селекторы: role/label/testid вместо глубоких CSS-селекторов',
        isCorrect: true,
      },
      {
        id: 'a-4-20-3',
        text: 'Изолировать данные теста: чистая база/фикстуры, предсказуемая среда',
        isCorrect: true,
      },
      {
        id: 'a-4-20-1',
        text: 'Ожидать состояния UI, а не “sleep”: использовать ожидания видимости/доступности элементов',
        isCorrect: true,
      },
      {
        id: 'a-4-20-4',
        text: 'Всегда добавлять setTimeout(5000) перед каждым действием',
        isCorrect: false,
      },
    ],
    explanation:
      'Флейки обычно из таймингов и нестабильных селекторов. “sleep” маскирует проблему и делает тесты медленнее.',
    chapterId: 'chapter-4-3',
    partId: 'part-4',
    difficulty: 'hard',
  },
  {
    id: 'q-4-21',
    type: 'single',
    question:
      'Почему snapshot-тесты часто превращаются в “шум”, если ими злоупотреблять?',
    answers: [
      {
        id: 'a-4-21-4',
        text: 'Snapshot сам по себе проверяет поведение пользователя, поэтому может заменить e2e: достаточно “зафиксировать разметку”',
        isCorrect: false,
      },
      {
        id: 'a-4-21-3',
        text: 'Потому что snapshot тесты не работают с TypeScript: сериализация JSX “ломается”, и в TS-проектах они неизбежно флейкнут',
        isCorrect: false,
      },
      {
        id: 'a-4-21-2',
        text: 'Потому что снапшоты делают SSR невозможным: разметка на сервере и клиенте всегда будет отличаться из‑за “сохранённых” снимков',
        isCorrect: false,
      },
      {
        id: 'a-4-21-1',
        text: 'Они ломаются при легитимных изменениях разметки и провоцируют “обновить снапшот не глядя”, что снижает ценность теста',
        isCorrect: true,
      },
    ],
    explanation:
      'Снапшоты полезны точечно (например, стабильные компоненты/серилизация). Но в больших количествах они часто не проверяют смысл, а только “дифф разметки”.',
    chapterId: 'chapter-4-3',
    partId: 'part-4',
    difficulty: 'hard',
  },
  {
    id: 'q-4-22',
    type: 'single',
    question:
      'Какой селектор в Testing Library считается предпочтительным и почему?',
    answers: [
      {
        id: 'a-4-22-2',
        text: 'getByTestId, потому что он самый “стабильный” и не зависит от доступности/семантики, значит тесты будут надёжнее',
        isCorrect: false,
      },
      {
        id: 'a-4-22-4',
        text: 'querySelector, потому что он максимально универсален: это же CSS‑селектор, значит он лучше отражает “как видит пользователь”',
        isCorrect: false,
      },
      {
        id: 'a-4-22-3',
        text: 'getByClassName, потому что классы — часть публичного API UI, они редко меняются и хорошо отражают поведение пользователя',
        isCorrect: false,
      },
      {
        id: 'a-4-22-1',
        text: 'getByRole (с name), потому что он ближе к тому, как пользователи и ассистивные технологии “видят” интерфейс',
        isCorrect: true,
      },
    ],
    explanation:
      'Testing Library поощряет тестирование поведения, а не реализации. role/name завязаны на доступность и смысл элемента, а не на внутреннюю структуру.',
    chapterId: 'chapter-4-3',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-23',
    type: 'single',
    question:
      'Зачем нужны source maps и почему их иногда отключают в production?',
    answers: [
      {
        id: 'a-4-23-1',
        text: 'Они связывают минифицированный код с исходниками для дебага, но могут увеличивать размер артефактов и раскрывать исходный код (риск утечки)',
        isCorrect: true,
      },
      {
        id: 'a-4-23-2',
        text: 'Source maps ускоряют выполнение JavaScript в production, поэтому их иногда отключают только из‑за “лишнего веса” в репозитории',
        isCorrect: false,
      },
      {
        id: 'a-4-23-3',
        text: 'Source maps нужны только для CSS: для JavaScript сопоставить минифицированный код с исходниками технически невозможно',
        isCorrect: false,
      },
      {
        id: 'a-4-23-4',
        text: 'Source maps автоматически исправляют ошибки: браузер “патчит” проблемные места, потому что знает исходные строки и колонки',
        isCorrect: false,
      },
    ],
    explanation:
      'Частый компромисс: хранить sourcemaps отдельно (например, в Sentry), а не раздавать публично всем пользователям.',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'medium',
  },
  {
    id: 'q-4-24',
    type: 'single',
    question:
      'Почему peerDependencies важны для библиотек компонентов (например, React UI kit)?',
    answers: [
      {
        id: 'a-4-24-1',
        text: 'Чтобы не тащить дубликаты React/DOM в бандл и не получить конфликт версий/две копии React в приложении',
        isCorrect: true,
      },
      {
        id: 'a-4-24-3',
        text: 'Чтобы включить tree-shaking для CSS',
        isCorrect: false,
      },
      {
        id: 'a-4-24-4',
        text: 'Чтобы запретить пользователю обновлять зависимости',
        isCorrect: false,
      },
      {
        id: 'a-4-24-2',
        text: 'Чтобы ускорить установку npm в 10 раз',
        isCorrect: false,
      },
    ],
    explanation:
      'Две копии React в одном приложении — классическая боль (hooks/context начинают “ломаться”). peerDependencies помогает заставить приложение предоставить одну совместимую версию.',
    chapterId: 'chapter-4-1',
    partId: 'part-4',
    difficulty: 'hard',
  },
]
