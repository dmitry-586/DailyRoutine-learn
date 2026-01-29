import type { NavigationPart } from '@/shared/types/reader.types'

export const partsConfig = [
  {
    id: 'part-1',
    title: 'Часть 1. Веб, сеть и HTTP',
    folder: 'part-1',
    chapters: [
      {
        id: 'chapter-1',
        title:
          '1. Как браузер загружает страницу: URL, DNS, соединение, первый байт',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-2',
        title: '2. Транспортный уровень: TCP, UDP, QUIC, RTT и задержки',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-3',
        title:
          '3. HTTP: протокол, методы, коды, редиректы, request/response, headers/body',
        file: 'chapter-3.md',
      },
      {
        id: 'chapter-4',
        title: '4. API: REST и GraphQL, контракты и версионирование',
        file: 'chapter-4.md',
      },
      {
        id: 'chapter-5',
        title: '5. Ограничения браузера: Same-Origin, CORS, cookies',
        file: 'chapter-5.md',
      },
      {
        id: 'chapter-6',
        title: '6. Realtime в вебе: WebSocket и SSE',
        file: 'chapter-6.md',
      },
    ],
  },
  {
    id: 'part-2',
    title: 'Часть 2. Браузер, рендеринг и производительность',
    folder: 'part-2',
    chapters: [
      {
        id: 'chapter-7',
        title: '7. Архитектура браузера: процессы, изоляция, IPC',
        file: 'chapter-7.md',
      },
      {
        id: 'chapter-8',
        title:
          '8. Оптимизация загрузки и Web Vitals: жизненный цикл страницы, TTFB, LCP, CLS, INP',
        file: 'chapter-8.md',
      },
      {
        id: 'chapter-9',
        title:
          '9. Рендеринг: DOM, CSSOM, layout, paint, composite, reflow и repaint',
        file: 'chapter-9.md',
      },
    ],
  },
  {
    id: 'part-3',
    title: 'Часть 3. HTML, доступность и формы',
    folder: 'part-3',
    chapters: [
      {
        id: 'chapter-10',
        title: '10. HTML: семантика, структура документа и SEO-минимум',
        file: 'chapter-10.md',
      },
      {
        id: 'chapter-11',
        title: '11. Доступность: фокус, клавиатура, роли, ARIA',
        file: 'chapter-11.md',
      },
      {
        id: 'chapter-12',
        title: '12. Формы: валидация и UX ошибок',
        file: 'chapter-12.md',
      },
    ],
  },
  {
    id: 'part-4',
    title: 'Часть 4. CSS',
    folder: 'part-4',
    chapters: [
      {
        id: 'chapter-13',
        title:
          '13. CSS основы: каскад, специфичность, наследование, слои, бокс-модель и поток документа',
        file: 'chapter-13.md',
      },
      {
        id: 'chapter-14',
        title: '14. Display, визуальное поведение элементов и позиционирование',
        file: 'chapter-14.md',
      },
      {
        id: 'chapter-15',
        title: '15. Современные раскладки: Flexbox и Grid',
        file: 'chapter-15.md',
      },
      {
        id: 'chapter-16',
        title:
          '16. Адаптивность и дизайн-токены: media queries, container queries, CSS variables',
        file: 'chapter-16.md',
      },
      {
        id: 'chapter-17',
        title:
          '17. Архитектура стилей: modules, BEM, CSS-in-JS, utility-first и Tailwind CSS',
        file: 'chapter-17.md',
      },
    ],
  },
  {
    id: 'part-5',
    title: 'Часть 5. JavaScript',
    folder: 'part-5',
    chapters: [
      {
        id: 'chapter-18',
        title: '18. Типы данных, значения, ссылки и приведение типов',
        file: 'chapter-18.md',
      },
      {
        id: 'chapter-19',
        title:
          '19. Scope, hoisting, TDZ и объявление переменных (var, let, const)',
        file: 'chapter-19.md',
      },
      {
        id: 'chapter-20',
        title: '20. Функции: виды и особенности',
        file: 'chapter-20.md',
      },
      {
        id: 'chapter-21',
        title: '21. Execution context, call stack и замыкания',
        file: 'chapter-21.md',
      },
      {
        id: 'chapter-22',
        title: '22. this и правила привязки',
        file: 'chapter-22.md',
      },
      {
        id: 'chapter-23',
        title: '23. Прототипы, наследование и классы',
        file: 'chapter-23.md',
      },
      {
        id: 'chapter-24',
        title: '24. Модули: ESM и CommonJS',
        file: 'chapter-24.md',
      },
      {
        id: 'chapter-25',
        title: '25. Методы массивов и иммутабельные паттерны',
        file: 'chapter-25.md',
      },
    ],
  },
  {
    id: 'part-6',
    title: 'Часть 6. Асинхронность',
    folder: 'part-6',
    chapters: [
      {
        id: 'chapter-26',
        title: '26. Event Loop: модель выполнения, microtasks и macrotasks',
        file: 'chapter-26.md',
      },
      {
        id: 'chapter-27',
        title: '27. Promise и async/await: состояния, цепочки, ошибки',
        file: 'chapter-27.md',
      },
      {
        id: 'chapter-28',
        title: '28. Комбинаторы промисов: all, allSettled, race, any',
        file: 'chapter-28.md',
      },
      {
        id: 'chapter-29',
        title: '29. Отмена задач, таймауты и race conditions: AbortController',
        file: 'chapter-29.md',
      },
    ],
  },
  {
    id: 'part-7',
    title: 'Часть 7. DOM и события',
    folder: 'part-7',
    chapters: [
      {
        id: 'chapter-30',
        title: '30. DOM операции и производительность',
        file: 'chapter-30.md',
      },
      {
        id: 'chapter-31',
        title:
          '31. События: capturing, bubbling, распространение и делегирование',
        file: 'chapter-31.md',
      },
      {
        id: 'chapter-32',
        title:
          '32. Observer APIs: IntersectionObserver, MutationObserver, ResizeObserver',
        file: 'chapter-32.md',
      },
    ],
  },
  {
    id: 'part-8',
    title: 'Часть 8. TypeScript',
    folder: 'part-8',
    chapters: [
      {
        id: 'chapter-33',
        title: '33. Зачем TypeScript и строгий режим',
        file: 'chapter-33.md',
      },
      {
        id: 'chapter-34',
        title:
          '34. Типы: any, unknown, never, Union, Intersection, literal types',
        file: 'chapter-34.md',
      },
      {
        id: 'chapter-35',
        title: '35. Interface и type',
        file: 'chapter-35.md',
      },
      {
        id: 'chapter-36',
        title: '36. Типизация функций и перегрузки',
        file: 'chapter-36.md',
      },
      {
        id: 'chapter-37',
        title: '37. Дженерики',
        file: 'chapter-37.md',
      },
      {
        id: 'chapter-38',
        title:
          '38. Продвинутые типы: Utility types, Discriminated unions, Type guards, Conditional/Mapped/Template literal types',
        file: 'chapter-38.md',
      },
      {
        id: 'chapter-39',
        title: '39. Branded types и безопасные идентификаторы',
        file: 'chapter-39.md',
      },
    ],
  },
  {
    id: 'part-9',
    title: 'Часть 9. Инструменты и сборка',
    folder: 'part-9',
    chapters: [
      {
        id: 'chapter-40',
        title:
          '40. Зависимости: package.json, semver, lockfiles и выбор менеджера',
        file: 'chapter-40.md',
      },
      {
        id: 'chapter-41',
        title: '41. Сборка: что это и зачем нужно',
        file: 'chapter-41.md',
      },
      {
        id: 'chapter-42',
        title: '42. Оптимизация бандла: логика и последовательность',
        file: 'chapter-42.md',
      },
    ],
  },
  {
    id: 'part-10',
    title: 'Часть 10. React',
    folder: 'part-10',
    chapters: [
      {
        id: 'chapter-43',
        title: '43. Рендеринг и reconciliation, keys',
        file: 'chapter-43.md',
      },
      {
        id: 'chapter-44',
        title: '44. Состояние: useState и useReducer',
        file: 'chapter-44.md',
      },
      {
        id: 'chapter-45',
        title: '45. useEffect: зависимости, cleanup, ловушки',
        file: 'chapter-45.md',
      },
      {
        id: 'chapter-46',
        title: '46. Оптимизация рендеров: useRef, useMemo и useCallback',
        file: 'chapter-46.md',
      },
      {
        id: 'chapter-47',
        title: '47. Context API и перерендеры',
        file: 'chapter-47.md',
      },
      {
        id: 'chapter-48',
        title: '48. Кастомные хуки',
        file: 'chapter-48.md',
      },
      {
        id: 'chapter-49',
        title: '49. Error boundaries и стратегия обработки ошибок',
        file: 'chapter-49.md',
      },
    ],
  },
  {
    id: 'part-11',
    title: 'Часть 11. Тестирование',
    folder: 'part-11',
    chapters: [
      {
        id: 'chapter-50',
        title: '50. Тестирование: зачем, где помогает и где мешает',
        file: 'chapter-50.md',
      },
      {
        id: 'chapter-51',
        title:
          '51. Инструменты тестирования: Unit/Integration/E2E и как их запускать',
        file: 'chapter-51.md',
      },
    ],
  },
  {
    id: 'part-12',
    title: 'Часть 12. Server state, формы и валидация',
    folder: 'part-12',
    chapters: [
      {
        id: 'chapter-52',
        title: '52. Server state и client state',
        file: 'chapter-52.md',
      },
      {
        id: 'chapter-53',
        title: '53. TanStack Query: useQuery, кэширование и query keys',
        file: 'chapter-53.md',
      },
      {
        id: 'chapter-54',
        title:
          '54. TanStack Query: мутации, invalidation, optimistic updates, prefetch и infinite queries',
        file: 'chapter-54.md',
      },
      {
        id: 'chapter-55',
        title: '55. Формы и контракты: React Hook Form и Zod',
        file: 'chapter-55.md',
      },
    ],
  },
  {
    id: 'part-13',
    title: 'Часть 13. Next.js',
    folder: 'part-13',
    chapters: [
      {
        id: 'chapter-56',
        title: '56. Рендер-стратегии: SPA, SSR, SSG, ISR',
        file: 'chapter-56.md',
      },
      {
        id: 'chapter-57',
        title:
          '57. Маршрутизация и компоновка: layout, template, loading, error',
        file: 'chapter-57.md',
      },
      {
        id: 'chapter-58',
        title: '58. Data fetching, кэширование и производительность в Next.js',
        file: 'chapter-58.md',
      },
      {
        id: 'chapter-59',
        title: '59. Server Components и границы ответственности',
        file: 'chapter-59.md',
      },
    ],
  },
  {
    id: 'part-14',
    title: 'Часть 14. Безопасность',
    folder: 'part-14',
    chapters: [
      {
        id: 'chapter-60',
        title:
          '60. Безопасность фронтенда: XSS, CSRF, cookies, токены и OWASP Top-10',
        file: 'chapter-60.md',
      },
      {
        id: 'chapter-61',
        title: '61. Безопасность на проекте: ввод, контент, секреты',
        file: 'chapter-61.md',
      },
    ],
  },
  {
    id: 'part-15',
    title: 'Часть 15. Архитектура фронтенда',
    folder: 'part-15',
    chapters: [
      {
        id: 'chapter-62',
        title:
          '62. Архитектура фронтенда: разделение ответственности, слои и Feature-Sliced Design',
        file: 'chapter-62.md',
      },
      {
        id: 'chapter-63',
        title: '63. Архитектурные договоренности: Evolution Design (ED)',
        file: 'chapter-63.md',
      },
    ],
  },
  {
    id: 'part-16',
    title: 'Часть 16. Заключение и карьера',
    folder: 'part-16',
    chapters: [
      {
        id: 'chapter-64',
        title:
          '64. Софт-скиллы и уверенность: как вести себя на собеседовании и определить свой грейд',
        file: 'chapter-64.md',
      },
      {
        id: 'chapter-65',
        title: '65. Грейды и ожидания: уровень ответственности, а не синтаксис',
        file: 'chapter-65.md',
      },
    ],
  },
]

/** Тип конфига части (для buildNavigationFromConfig) */
type PartConfigItem = (typeof partsConfig)[number]

/**
 * Создаёт структуру навигации из конфигурации (без загрузки контента).
 * Вызывается только на сервере при сборке content.
 */
export function buildNavigationFromConfig(
  config: PartConfigItem[],
): NavigationPart[] {
  const navigation: NavigationPart[] = []
  let globalIndex = 0

  for (const partConfig of config) {
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
