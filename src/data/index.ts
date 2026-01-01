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
      {
        id: 'chapter-2-4',
        title: 'Глава 8. Tailwind CSS v4',
        file: 'chapter-4.md',
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
        title: 'Глава 9. Фундамент JavaScript',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-3-2',
        title: 'Глава 10. Функции, this, замыкания и прототипы',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-3-3',
        title: 'Глава 11. Работа с DOM',
        file: 'chapter-3.md',
      },
      {
        id: 'chapter-3-4',
        title: 'Глава 12. Асинхронность, Event Loop и промисы',
        file: 'chapter-4.md',
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
        title: 'Глава 13. NPM, сборщики и инструменты',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-4-2',
        title: 'Глава 14. Тестирование',
        file: 'chapter-2.md',
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
        title: 'Глава 15. TypeScript: вступление и основы',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-5-2',
        title: 'Глава 16. Типы, интерфейсы и функции',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-5-3',
        title: 'Глава 17. Классы, продвинутые типы и паттерны',
        file: 'chapter-3.md',
      },
      {
        id: 'chapter-5-4',
        title: 'Глава 18. Практические аспекты TypeScript',
        file: 'chapter-4.md',
      },
      {
        id: 'chapter-5-5',
        title: 'Глава 19. Продвинутые техники TypeScript',
        file: 'chapter-5.md',
      },
      {
        id: 'chapter-5-6',
        title: 'Глава 20. Zod: runtime валидация и типизация',
        file: 'chapter-6.md',
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
        title: 'Глава 21. Основы React',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-6-2',
        title: 'Глава 22. Хуки и управление состоянием',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-6-3',
        title: 'Глава 23. React Hook Form',
        file: 'chapter-3.md',
      },
      {
        id: 'chapter-6-4',
        title: 'Глава 24. Архитектура больших приложений',
        file: 'chapter-4.md',
      },
      {
        id: 'chapter-6-5',
        title: 'Глава 25. TanStack Query',
        file: 'chapter-5.md',
      },
      {
        id: 'chapter-6-6',
        title: 'Глава 26. Zustand',
        file: 'chapter-6.md',
      },
      {
        id: 'chapter-6-7',
        title: 'Глава 27. Axios и работа с HTTP',
        file: 'chapter-7.md',
      },
      {
        id: 'chapter-6-8',
        title: 'Глава 28. SSR и современный React-стек',
        file: 'chapter-8.md',
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
        title: 'Глава 29. Паттерны проектирования',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-7-2',
        title: 'Глава 30. Архитектуры фронтенда',
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
        title: 'Глава 31. Производительность',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-8-2',
        title: 'Глава 32. Безопасность во фронтенде',
        file: 'chapter-2.md',
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
        title: 'Глава 33. Алгоритмические задачи',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-10-2',
        title: 'Глава 34. Поведенческое собеседование',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-10-3',
        title: 'Глава 35. Итоговый чек-лист',
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
