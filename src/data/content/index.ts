import type { NavigationPart, ReaderContent } from '@/shared/types'

import { loadContent } from './loader'

export const partsConfig = [
  {
    id: 'part-1',
    title: 'Часть I. Фундамент веба',
    folder: 'part-1',
    chapters: [
      {
        id: 'chapter-1-1',
        title: 'Глава 1. Как работает Интернет',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-1-2',
        title: 'Глава 2. Архитектура браузера',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-1-3',
        title: 'Глава 3. Рендеринг: путь от HTML до пикселей',
        file: 'chapter-3.md',
      },
      {
        id: 'chapter-1-4',
        title: 'Глава 4. Семантика HTML и доступность',
        file: 'chapter-4.md',
      },
    ],
  },
  {
    id: 'part-2',
    title: 'Часть II. CSS',
    folder: 'part-2',
    chapters: [
      {
        id: 'chapter-2-1',
        title: 'Глава 5. Основы CSS',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-2-2',
        title: 'Глава 6. Современная экосистема CSS',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-2-3',
        title: 'Глава 7. Препроцессоры и инструменты',
        file: 'chapter-3.md',
      },
    ],
  },
  {
    id: 'part-3',
    title: 'Часть III. JavaScript',
    folder: 'part-3',
    chapters: [
      {
        id: 'chapter-3-1',
        title: 'Глава 8. Фундамент JavaScript: как язык устроен под капотом',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-3-2',
        title: 'Глава 9. Функции, this, замыкания и прототипы',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-3-3',
        title: 'Глава 10. Работа с DOM без магии и тормозов',
        file: 'chapter-3.md',
      },
      {
        id: 'chapter-3-4',
        title: 'Глава 11. Асинхронность, Event Loop и промисы',
        file: 'chapter-4.md',
      },
      {
        id: 'chapter-3-5',
        title: 'Глава 12. Практикум по основам JavaScript, DOM и асинхронности',
        file: 'chapter-5.md',
      },
      {
        id: 'chapter-3-6',
        title: 'Разбор решений к практикуму',
        file: 'chapter-6.md',
      },
    ],
  },
  {
    id: 'part-4',
    title: 'Часть IV. Инфраструктура',
    folder: 'part-4',
    chapters: [
      {
        id: 'chapter-4-1',
        title: 'Глава 13. NPM, package.json и зависимости',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-4-2',
        title: 'Глава 14. Сборщики',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-4-3',
        title: 'Глава 15. Тестирование',
        file: 'chapter-3.md',
      },
    ],
  },
  {
    id: 'part-5',
    title: 'Часть V. TypeScript',
    folder: 'part-5',
    chapters: [
      {
        id: 'chapter-5-1',
        title: 'Глава 16. TypeScript: вступление и основы',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-5-2',
        title: 'Глава 17. Типы, интерфейсы и функции',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-5-3',
        title: 'Глава 18. Классы, продвинутые типы и паттерны',
        file: 'chapter-3.md',
      },
      {
        id: 'chapter-5-4',
        title: 'Глава 19. Практические аспекты TypeScript',
        file: 'chapter-4.md',
      },
    ],
  },
  {
    id: 'part-6',
    title: 'Часть VI. React и SPA',
    folder: 'part-6',
    chapters: [
      {
        id: 'chapter-6-1',
        title: 'Глава 20. Основы React',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-6-2',
        title: 'Глава 21. Хуки и управление состоянием',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-6-3',
        title: 'Глава 22. Архитектура больших приложений',
        file: 'chapter-3.md',
      },
      {
        id: 'chapter-6-4',
        title: 'Глава 23. SSR и современный React-стек',
        file: 'chapter-4.md',
      },
      {
        id: 'chapter-6-5',
        title: 'Глава 24. Практикум по React и архитектуре',
        file: 'chapter-5.md',
      },
      {
        id: 'chapter-6-6',
        title: 'Разбор решений к практикуму',
        file: 'chapter-6.md',
      },
    ],
  },
  {
    id: 'part-7',
    title: 'Часть VII. Архитектура и проектирование',
    folder: 'part-7',
    chapters: [
      {
        id: 'chapter-7-1',
        title: 'Глава 25. Паттерны проектирования',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-7-2',
        title: 'Глава 26. Архитектуры фронтенда',
        file: 'chapter-2.md',
      },
    ],
  },
  {
    id: 'part-8',
    title: 'Часть VIII. Производительность и безопасность',
    folder: 'part-8',
    chapters: [
      {
        id: 'chapter-8-1',
        title: 'Глава 27. Производительность',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-8-2',
        title: 'Глава 28. Безопасность во фронтенде',
        file: 'chapter-2.md',
      },
    ],
  },
  {
    id: 'part-9',
    title: 'Часть IX. Node.js',
    folder: 'part-9',
    chapters: [
      {
        id: 'chapter-9-1',
        title: 'Глава 29. Основы Node.js',
        file: 'chapter-1.md',
      },
    ],
  },
  {
    id: 'part-10',
    title: 'Часть X. Подготовка к собеседованию',
    folder: 'part-10',
    chapters: [
      {
        id: 'chapter-10-1',
        title: 'Глава 30. Алгоритмические задачи',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-10-2',
        title: 'Глава 31. Поведенческое собеседование',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-10-3',
        title: 'Глава 32. Итоговый чек-лист',
        file: 'chapter-3.md',
      },
    ],
  },
]

/**
 * Создает структуру навигации из конфигурации (без загрузки контента)
 */
function buildNavigationFromConfig(): NavigationPart[] {
  const navigation: NavigationPart[] = []
  let globalIndex = 0

  for (const partConfig of partsConfig) {
    const partStartIndex = globalIndex
    const chapters = partConfig.chapters.map((chapterConfig) => {
      const chapterGlobalIndex = globalIndex++
      return {
        id: chapterConfig.id,
        title: chapterConfig.title,
        globalIndex: chapterGlobalIndex,
      }
    })

    navigation.push({
      id: partConfig.id,
      title: partConfig.title,
      partStartIndex,
      chapters,
    })
  }

  return navigation
}

// Предвычисляем навигацию из конфигурации
const navigation = buildNavigationFromConfig()

// Загружаем контент из markdown файлов
const loadedContent = loadContent(partsConfig)

// Объединяем загруженный контент с предвычисленной навигацией
export const content: ReaderContent = {
  ...loadedContent,
  navigation,
}
