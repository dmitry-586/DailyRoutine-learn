import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части IX. Node.js
 */
export const part9Questions: QuizQuestion[] = [
  {
    id: 'q-9-1',
    type: 'single',
    question: 'Что такое Event Loop в Node.js?',
    answers: [
      {
        id: 'a-9-1-1',
        text: 'Механизм, который управляет выполнением асинхронных операций в однопоточном окружении Node.js',
        isCorrect: true,
      },
      {
        id: 'a-9-1-2',
        text: 'Цикл обработки HTTP-запросов на сервере',
        isCorrect: false,
      },
      {
        id: 'a-9-1-3',
        text: 'Механизм многопоточности в Node.js',
        isCorrect: false,
      },
      {
        id: 'a-9-1-4',
        text: 'Способ обработки ошибок в асинхронном коде',
        isCorrect: false,
      },
    ],
    explanation:
      'Event Loop в Node.js — это механизм, который управляет выполнением асинхронных операций в однопоточном окружении, используя очередь событий и обратных вызовов.',
    chapterId: 'chapter-9-1',
    partId: 'part-9',
    difficulty: 'hard',
  },
  {
    id: 'q-9-2',
    type: 'single',
    question: 'В чём разница между require() и import в Node.js?',
    answers: [
      {
        id: 'a-9-2-1',
        text: 'require() — CommonJS (синхронный, runtime), import — ES Modules (асинхронный, статический)',
        isCorrect: true,
      },
      {
        id: 'a-9-2-2',
        text: 'require() для Node.js, import для браузера',
        isCorrect: false,
      },
      {
        id: 'a-9-2-3',
        text: 'require() быстрее, import медленнее',
        isCorrect: false,
      },
      {
        id: 'a-9-2-4',
        text: 'Нет разницы, это синонимы',
        isCorrect: false,
      },
    ],
    explanation:
      'require() — это CommonJS (синхронная загрузка во время выполнения). import — это ES Modules (статический анализ, асинхронная загрузка, поддержка tree shaking).',
    chapterId: 'chapter-9-1',
    partId: 'part-9',
    difficulty: 'medium',
  },
  {
    id: 'q-9-3',
    type: 'multiple',
    question: 'Какие преимущества даёт Node.js для фронтенд-разработчика?',
    answers: [
      {
        id: 'a-9-3-1',
        text: 'Единый язык (JavaScript) для фронтенда и бэкенда',
        isCorrect: true,
      },
      {
        id: 'a-9-3-2',
        text: 'Возможность использовать инструменты сборки (Webpack, Vite)',
        isCorrect: true,
      },
      {
        id: 'a-9-3-3',
        text: 'Возможность создавать SSR-приложения',
        isCorrect: true,
      },
      {
        id: 'a-9-3-4',
        text: 'Доступ к файловой системе и серверным API',
        isCorrect: true,
      },
      {
        id: 'a-9-3-5',
        text: 'Улучшение производительности браузера',
        isCorrect: false,
      },
    ],
    explanation:
      'Node.js позволяет использовать JavaScript на сервере, использовать инструменты сборки, создавать SSR, работать с файловой системой и серверным API.',
    chapterId: 'chapter-9-1',
    partId: 'part-9',
    difficulty: 'easy',
  },
  {
    id: 'q-9-4',
    type: 'single',
    question: 'Что такое process.env в Node.js?',
    answers: [
      {
        id: 'a-9-4-1',
        text: 'Объект, содержащий переменные окружения системы',
        isCorrect: true,
      },
      {
        id: 'a-9-4-2',
        text: 'Объект для работы с процессами',
        isCorrect: false,
      },
      {
        id: 'a-9-4-3',
        text: 'Механизм для кэширования',
        isCorrect: false,
      },
      {
        id: 'a-9-4-4',
        text: 'Способ оптимизации',
        isCorrect: false,
      },
    ],
    explanation:
      'process.env содержит переменные окружения. Используется для конфигурации (API ключи, порты, режимы). В продакшене устанавливаются через систему или .env файлы (dotenv).',
    chapterId: 'chapter-9-1',
    partId: 'part-9',
    difficulty: 'easy',
  },
  {
    id: 'q-9-5',
    type: 'single',
    question: 'Что такое модульная система в Node.js?',
    answers: [
      {
        id: 'a-9-5-1',
        text: 'Система для организации и импорта кода: CommonJS (require/module.exports) и ES Modules (import/export)',
        isCorrect: true,
      },
      {
        id: 'a-9-5-2',
        text: 'Система для работы с базами данных',
        isCorrect: false,
      },
      {
        id: 'a-9-5-3',
        text: 'Механизм для кэширования',
        isCorrect: false,
      },
      {
        id: 'a-9-5-4',
        text: 'Способ оптимизации',
        isCorrect: false,
      },
    ],
    explanation:
      'Node.js поддерживает CommonJS (require/module.exports) и ES Modules (import/export). CommonJS — синхронный, ES Modules — асинхронный с поддержкой tree shaking. В новых проектах предпочтительны ES Modules.',
    chapterId: 'chapter-9-1',
    partId: 'part-9',
    difficulty: 'medium',
  },
]
