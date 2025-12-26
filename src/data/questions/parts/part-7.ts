import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части VII. Архитектура и проектирование
 */
export const part7Questions: QuizQuestion[] = [
  {
    id: 'q-7-1',
    type: 'single',
    question: 'Что такое паттерн Singleton?',
    answers: [
      {
        id: 'a-7-1-1',
        text: 'Паттерн, который гарантирует существование только одного экземпляра класса',
        isCorrect: true,
      },
      {
        id: 'a-7-1-2',
        text: 'Паттерн для создания множества экземпляров одного класса',
        isCorrect: false,
      },
      {
        id: 'a-7-1-3',
        text: 'Паттерн для наследования классов',
        isCorrect: false,
      },
      {
        id: 'a-7-1-4',
        text: 'Паттерн для оптимизации производительности',
        isCorrect: false,
      },
    ],
    explanation:
      'Singleton — это паттерн, который гарантирует существование только одного экземпляра класса и предоставляет глобальную точку доступа к нему.',
    chapterId: 'chapter-7-1',
    partId: 'part-7',
    difficulty: 'medium',
  },
  {
    id: 'q-7-2',
    type: 'single',
    question: 'Что такое паттерн Observer?',
    answers: [
      {
        id: 'a-7-2-1',
        text: 'Паттерн, при котором объект уведомляет подписчиков об изменениях своего состояния',
        isCorrect: true,
      },
      {
        id: 'a-7-2-2',
        text: 'Паттерн для наблюдения за производительностью приложения',
        isCorrect: false,
      },
      {
        id: 'a-7-2-3',
        text: 'Паттерн для создания наблюдаемых объектов',
        isCorrect: false,
      },
      {
        id: 'a-7-2-4',
        text: 'Паттерн для оптимизации рендеринга',
        isCorrect: false,
      },
    ],
    explanation:
      'Observer — это паттерн, при котором объект (Subject) уведомляет список наблюдателей (Observers) об изменениях. React использует похожий паттерн для обновления компонентов.',
    chapterId: 'chapter-7-1',
    partId: 'part-7',
    difficulty: 'medium',
  },
  {
    id: 'q-7-3',
    type: 'multiple',
    question: 'Какие архитектурные подходы используются во фронтенде?',
    answers: [
      {
        id: 'a-7-3-1',
        text: 'MVC (Model-View-Controller)',
        isCorrect: true,
      },
      {
        id: 'a-7-3-2',
        text: 'MVVM (Model-View-ViewModel)',
        isCorrect: true,
      },
      {
        id: 'a-7-3-3',
        text: 'Feature-Sliced Design',
        isCorrect: true,
      },
      {
        id: 'a-7-3-4',
        text: 'Clean Architecture',
        isCorrect: true,
      },
      {
        id: 'a-7-3-5',
        text: 'Только один подход для всех проектов',
        isCorrect: false,
      },
    ],
    explanation:
      'Во фронтенде используются различные архитектурные подходы: MVC, MVVM, FSD, Clean Architecture. Выбор зависит от размера проекта и требований.',
    chapterId: 'chapter-7-2',
    partId: 'part-7',
    difficulty: 'medium',
  },
  {
    id: 'q-7-4',
    type: 'single',
    question: 'Что такое паттерн Factory?',
    answers: [
      {
        id: 'a-7-4-1',
        text: 'Паттерн, который создаёт объекты без указания конкретного класса',
        isCorrect: true,
      },
      {
        id: 'a-7-4-2',
        text: 'Паттерн для работы с базами данных',
        isCorrect: false,
      },
      {
        id: 'a-7-4-3',
        text: 'Паттерн для оптимизации производительности',
        isCorrect: false,
      },
      {
        id: 'a-7-4-4',
        text: 'Паттерн для работы с API',
        isCorrect: false,
      },
    ],
    explanation:
      'Factory — паттерн создания объектов через фабричную функцию/класс, скрывающую детали создания. Полезен когда нужно создавать объекты разных типов в зависимости от условий.',
    chapterId: 'chapter-7-1',
    partId: 'part-7',
    difficulty: 'medium',
  },
  {
    id: 'q-7-5',
    type: 'single',
    question: 'Что такое паттерн Strategy?',
    answers: [
      {
        id: 'a-7-5-1',
        text: 'Паттерн, который определяет семейство алгоритмов и делает их взаимозаменяемыми',
        isCorrect: true,
      },
      {
        id: 'a-7-5-2',
        text: 'Паттерн для работы с состояниями',
        isCorrect: false,
      },
      {
        id: 'a-7-5-3',
        text: 'Паттерн для оптимизации',
        isCorrect: false,
      },
      {
        id: 'a-7-5-4',
        text: 'Паттерн для работы с формами',
        isCorrect: false,
      },
    ],
    explanation:
      'Strategy позволяет выбирать алгоритм во время выполнения. Пример: разные стратегии валидации, оплаты, сортировки. Полезен когда есть несколько способов выполнить задачу.',
    chapterId: 'chapter-7-1',
    partId: 'part-7',
    difficulty: 'medium',
  },
  {
    id: 'q-7-6',
    type: 'single',
    question: 'Что такое паттерн Module в JavaScript?',
    answers: [
      {
        id: 'a-7-6-1',
        text: 'Паттерн для инкапсуляции кода и создания приватной области видимости',
        isCorrect: true,
      },
      {
        id: 'a-7-6-2',
        text: 'Паттерн для работы с модулями Node.js',
        isCorrect: false,
      },
      {
        id: 'a-7-6-3',
        text: 'Паттерн для оптимизации',
        isCorrect: false,
      },
      {
        id: 'a-7-6-4',
        text: 'Паттерн для работы с классами',
        isCorrect: false,
      },
    ],
    explanation:
      'Module pattern использует замыкания для создания приватной области видимости и публичного API. Пример: IIFE (Immediately Invoked Function Expression). Основа для ES modules.',
    chapterId: 'chapter-7-1',
    partId: 'part-7',
    difficulty: 'medium',
  },
]
