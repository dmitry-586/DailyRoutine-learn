import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части IV. Инфраструктура
 */
export const part4Questions: QuizQuestion[] = [
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
  {
    id: 'q-4-4',
    type: 'single',
    question: 'В чём разница между unit-тестами и integration-тестами?',
    answers: [
      {
        id: 'a-4-4-1',
        text: 'Unit-тесты проверяют изолированные функции/компоненты, integration-тесты проверяют взаимодействие нескольких частей системы',
        isCorrect: true,
      },
      {
        id: 'a-4-4-2',
        text: 'Unit-тесты быстрее, integration-тесты медленнее',
        isCorrect: false,
      },
      {
        id: 'a-4-4-3',
        text: 'Unit-тесты для фронтенда, integration-тесты для бэкенда',
        isCorrect: false,
      },
      {
        id: 'a-4-4-4',
        text: 'Нет разницы, это синонимы',
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
      'Какие инструменты используются для тестирования фронтенд-приложений?',
    answers: [
      {
        id: 'a-4-5-1',
        text: 'Jest',
        isCorrect: true,
      },
      {
        id: 'a-4-5-2',
        text: 'Vitest',
        isCorrect: true,
      },
      {
        id: 'a-4-5-3',
        text: 'React Testing Library',
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
    question: 'Что такое моки (mocks) в тестировании?',
    answers: [
      {
        id: 'a-4-6-1',
        text: 'Имитации зависимостей, которые заменяют реальные объекты для изоляции тестируемого кода',
        isCorrect: true,
      },
      {
        id: 'a-4-6-2',
        text: 'Способ ускорения выполнения тестов',
        isCorrect: false,
      },
      {
        id: 'a-4-6-3',
        text: 'Механизм кэширования результатов тестов',
        isCorrect: false,
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
        id: 'a-4-7-1',
        text: 'dependencies нужны в runtime, devDependencies только для разработки (сборка, тесты, линтеры)',
        isCorrect: true,
      },
      {
        id: 'a-4-7-2',
        text: 'dependencies для продакшна, devDependencies для разработки',
        isCorrect: false,
      },
      {
        id: 'a-4-7-3',
        text: 'dependencies быстрее, devDependencies медленнее',
        isCorrect: false,
      },
      {
        id: 'a-4-7-4',
        text: 'Нет разницы, это синонимы',
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
    question: 'Что такое Semantic Versioning (SemVer)?',
    answers: [
      {
        id: 'a-4-8-1',
        text: 'Система версионирования MAJOR.MINOR.PATCH, где MAJOR — breaking changes, MINOR — новые фичи, PATCH — багфиксы',
        isCorrect: true,
      },
      {
        id: 'a-4-8-2',
        text: 'Способ автоматического обновления версий',
        isCorrect: false,
      },
      {
        id: 'a-4-8-3',
        text: 'Механизм для кэширования версий',
        isCorrect: false,
      },
      {
        id: 'a-4-8-4',
        text: 'Способ нумерации релизов',
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
        id: 'a-4-9-1',
        text: 'Файлы, которые фиксируют точные версии всех зависимостей для гарантии одинаковой сборки на всех машинах',
        isCorrect: true,
      },
      {
        id: 'a-4-9-2',
        text: 'Файлы для кэширования пакетов',
        isCorrect: false,
      },
      {
        id: 'a-4-9-3',
        text: 'Файлы для оптимизации установки',
        isCorrect: false,
      },
      {
        id: 'a-4-9-4',
        text: 'Файлы для резервного копирования',
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
    question: 'В чём разница между npm, yarn и pnpm?',
    answers: [
      {
        id: 'a-4-10-1',
        text: 'npm — стандарт, yarn — быстрее исторически, pnpm — использует symlinks и экономит место на диске',
        isCorrect: true,
      },
      {
        id: 'a-4-10-2',
        text: 'npm для Node.js, yarn для React, pnpm для Vue',
        isCorrect: false,
      },
      {
        id: 'a-4-10-3',
        text: 'npm быстрее, yarn и pnpm медленнее',
        isCorrect: false,
      },
      {
        id: 'a-4-10-4',
        text: 'Нет разницы, это синонимы',
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
    question: 'Что такое Vite и чем он отличается от Webpack?',
    answers: [
      {
        id: 'a-4-11-1',
        text: 'Vite — современный сборщик, использующий ES modules и нативный ESM в dev-режиме для быстрой перезагрузки; Webpack — традиционный бандлер',
        isCorrect: true,
      },
      {
        id: 'a-4-11-2',
        text: 'Vite для Vue, Webpack для React',
        isCorrect: false,
      },
      {
        id: 'a-4-11-3',
        text: 'Vite быстрее только в продакшене',
        isCorrect: false,
      },
      {
        id: 'a-4-11-4',
        text: 'Нет разницы, это синонимы',
        isCorrect: false,
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
    question: 'Что такое code splitting?',
    answers: [
      {
        id: 'a-4-12-1',
        text: 'Техника разделения кода на несколько бандлов, которые загружаются по требованию',
        isCorrect: true,
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
        id: 'a-4-12-4',
        text: 'Способ оптимизации CSS',
        isCorrect: false,
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
    question: 'Что такое hot module replacement (HMR)?',
    answers: [
      {
        id: 'a-4-13-1',
        text: 'Технология, которая обновляет модули в браузере без полной перезагрузки страницы',
        isCorrect: true,
      },
      {
        id: 'a-4-13-2',
        text: 'Механизм для замены модулей в продакшене',
        isCorrect: false,
      },
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
    question: 'Что такое e2e-тесты (end-to-end)?',
    answers: [
      {
        id: 'a-4-14-1',
        text: 'Тесты, которые проверяют работу всего приложения от начала до конца, как это делает пользователь',
        isCorrect: true,
      },
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
    question: 'Что такое snapshot-тесты?',
    answers: [
      {
        id: 'a-4-15-1',
        text: 'Тесты, которые сохраняют "снимок" вывода компонента/функции и сравнивают с ним при следующих запусках',
        isCorrect: true,
      },
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
    question: 'Что такое peerDependencies в package.json?',
    answers: [
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
      {
        id: 'a-4-16-4',
        text: 'Зависимости для тестирования',
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
    question: 'Что такое минификация (minification) кода?',
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
        id: 'a-4-17-3',
        text: 'Процесс оптимизации производительности',
        isCorrect: false,
      },
      {
        id: 'a-4-17-4',
        text: 'Процесс разделения кода на модули',
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
    question: 'Что такое source maps?',
    answers: [
      {
        id: 'a-4-18-1',
        text: 'Файлы, которые связывают минифицированный/транспилированный код с исходным кодом для отладки',
        isCorrect: true,
      },
      {
        id: 'a-4-18-2',
        text: 'Карты зависимостей между модулями',
        isCorrect: false,
      },
      {
        id: 'a-4-18-3',
        text: 'Файлы для оптимизации бандла',
        isCorrect: false,
      },
      {
        id: 'a-4-18-4',
        text: 'Файлы для кэширования',
        isCorrect: false,
      },
    ],
    explanation:
      'Source maps (.map файлы) позволяют отлаживать минифицированный/транспилированный код, видя исходный код в DevTools. Включаются в dev, опциональны в production (увеличивают размер, но помогают отладке).',
    chapterId: 'chapter-4-2',
    partId: 'part-4',
    difficulty: 'medium',
  },
]
