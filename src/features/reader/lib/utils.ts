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

/**
 * Получить глобальный индекс главы по локальному индексу в части
 */
export function getGlobalChapterIndex(
  parts: Part[],
  partId: string,
  localIndex: number,
): number {
  const partIndex = parts.findIndex((p) => p.id === partId)
  return (
    parts
      .slice(0, partIndex)
      .reduce((sum, part) => sum + part.chapters.length, 0) + localIndex
  )
}
