'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import type { ChapterMeta, ReaderContent } from '@/shared/types'

type ChapterStatus = 'idle' | 'loading' | 'loaded' | 'error'

export interface ChapterCacheEntry {
  status: ChapterStatus
  content?: string
}

const STORAGE_KEY_PREFIX = 'reader:chapter:'
const CACHE_VERSION = 'v10'

const getStorageKey = (chapterId: string) =>
  `${STORAGE_KEY_PREFIX}${CACHE_VERSION}:${chapterId}`

function getChapterContentFromParts(
  content: ReaderContent,
  chapterId: string,
): string | undefined {
  for (const part of content.parts) {
    const chapter = part.chapters.find((c) => c.id === chapterId)
    if (chapter?.content) return chapter.content
  }
  return undefined
}

interface UseChapterContentParams {
  chapters: ChapterMeta[]
  currentIndex: number
  content: ReaderContent
}

interface UseChapterContentResult {
  cache: Record<string, ChapterCacheEntry>
  loadChapter: (chapter: ChapterMeta) => Promise<void>
}

const NEIGHBOR_PREFETCH_DELAY_MS = 150

export function useChapterContent({
  chapters,
  currentIndex,
  content,
}: UseChapterContentParams): UseChapterContentResult {
  const [cache, setCache] = useState<Record<string, ChapterCacheEntry>>({})
  const inFlightRef = useRef(new Set<string>())
  const cacheRef = useRef(cache)

  useEffect(() => {
    cacheRef.current = cache
  }, [cache])

  const loadChapter = useCallback(
    (chapter: ChapterMeta): Promise<void> => {
      const cached = cacheRef.current[chapter.id]
      if (cached?.status === 'loaded' || inFlightRef.current.has(chapter.id)) {
        return Promise.resolve()
      }

      if (typeof window !== 'undefined') {
        const stored = sessionStorage.getItem(getStorageKey(chapter.id))
        if (stored) {
          setCache((previous) => ({
            ...previous,
            [chapter.id]: { status: 'loaded', content: stored },
          }))
          return Promise.resolve()
        }
      }

      const bundled = getChapterContentFromParts(content, chapter.id)
      if (bundled !== undefined) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(getStorageKey(chapter.id), bundled)
        }
        setCache((previous) => ({
          ...previous,
          [chapter.id]: { status: 'loaded', content: bundled },
        }))
        return Promise.resolve()
      }

      inFlightRef.current.add(chapter.id)
      setCache((previous) => ({
        ...previous,
        [chapter.id]: { status: 'loading' },
      }))

      setCache((previous) => ({
        ...previous,
        [chapter.id]: {
          status: 'error',
          content: 'Контент главы недоступен',
        },
      }))
      inFlightRef.current.delete(chapter.id)
      return Promise.resolve()
    },
    [content],
  )

  // Загружаем текущую главу
  useEffect(() => {
    const current = chapters[currentIndex]
    if (current) loadChapter(current)
  }, [chapters, currentIndex, loadChapter])

  // Предзагрузка соседних глав (предыдущая и следующая)
  useEffect(() => {
    const neighbors = [currentIndex - 1, currentIndex + 1]
      .map((index) => chapters[index])
      .filter(Boolean) as ChapterMeta[]

    if (!neighbors.length) return

    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        ;(
          window as Window & { requestIdleCallback: typeof requestIdleCallback }
        ).requestIdleCallback(() => neighbors.forEach(loadChapter), {
          timeout: 2000,
        })
      } else {
        neighbors.forEach(loadChapter)
      }
    }, NEIGHBOR_PREFETCH_DELAY_MS)

    return () => clearTimeout(timer)
  }, [chapters, currentIndex, loadChapter])

  return { cache, loadChapter }
}
