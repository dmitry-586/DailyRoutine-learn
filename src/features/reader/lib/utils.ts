import type { Chapter, Part, ReaderContent } from '@/shared/types'

/**
 * Получить все главы из всех частей
 */
export function getAllChapters(content: ReaderContent): Chapter[] {
  return content.parts.flatMap((part) => part.chapters)
}

/**
 * Получить текущую часть по индексу главы
 */
export function getCurrentPart(
  content: ReaderContent,
  chapterIndex: number,
): Part | null {
  let currentIndex = 0
  for (const part of content.parts) {
    if (
      chapterIndex >= currentIndex &&
      chapterIndex < currentIndex + part.chapters.length
    ) {
      return part
    }
    currentIndex += part.chapters.length
  }
  return null
}

/**
 * Получить общее количество глав
 */
export function getTotalChapters(content: ReaderContent): number {
  return content.parts.reduce((sum, part) => sum + part.chapters.length, 0)
}

/**
 * Получить индекс главы внутри текущей части
 */
export function getChapterIndexInPart(
  content: ReaderContent,
  globalChapterIndex: number,
): number {
  let currentIndex = 0
  for (const part of content.parts) {
    if (
      globalChapterIndex >= currentIndex &&
      globalChapterIndex < currentIndex + part.chapters.length
    ) {
      return globalChapterIndex - currentIndex
    }
    currentIndex += part.chapters.length
  }
  return 0
}
