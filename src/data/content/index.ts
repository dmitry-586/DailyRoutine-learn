import type { ReaderContent } from '@/shared/types'

import { loadContent } from './loader'

// Конфигурация частей и глав
const partsConfig = [
  {
    id: 'part-1',
    title: 'Часть 1: Основы',
    folder: 'part-1',
    chapters: [
      {
        id: 'chapter-1-1',
        title: 'Что такое TypeScript?',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-1-2',
        title: 'Базовые типы',
        file: 'chapter-2.md',
      },
      {
        id: 'chapter-1-3',
        title: 'Интерфейсы и типы',
        file: 'chapter-3.md',
      },
    ],
  },
  {
    id: 'part-2',
    title: 'Часть 2: Продвинутые темы',
    folder: 'part-2',
    chapters: [
      {
        id: 'chapter-2-1',
        title: 'Дженерики (Generics)',
        file: 'chapter-1.md',
      },
      {
        id: 'chapter-2-2',
        title: 'Полезные утилиты',
        file: 'chapter-2.md',
      },
    ],
  },
]

// Загружаем контент из markdown файлов
export const exampleContent: ReaderContent = loadContent(partsConfig)
