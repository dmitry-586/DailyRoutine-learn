import type { ChapterMeta, Part, ReaderContent } from '@/shared/types'

export function getAllChapters(content: ReaderContent): ChapterMeta[] {
  return content.parts.flatMap((part) => part.chapters)
}

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

export function getGlobalChapterIndex(
  parts: Part[],
  partId: string,
  localIndex: number,
): number {
  const partIndex = parts.findIndex((item) => item.id === partId)
  return (
    parts
      .slice(0, partIndex)
      .reduce((sum, part) => sum + part.chapters.length, 0) + localIndex
  )
}

export function findChapterIndexById(
  content: ReaderContent,
  chapterId: string | null,
): number | null {
  if (!chapterId) return null
  const all = getAllChapters(content)
  const index = all.findIndex((chapter) => chapter.id === chapterId)
  return index >= 0 ? index : null
}
