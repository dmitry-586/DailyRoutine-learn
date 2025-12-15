'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import type { ChapterMeta } from '@/shared/types'

import { getChapterContent } from '../api/getChapter'

type ChapterStatus = 'idle' | 'loading' | 'loaded' | 'error'

export interface ChapterCacheEntry {
  status: ChapterStatus
  content?: string
}

const NEIGHBOR_PREFETCH_DELAY_MS = 220
const STORAGE_KEY_PREFIX = 'reader:chapter:'

const getStorageKey = (chapterId: string) => `${STORAGE_KEY_PREFIX}${chapterId}`

interface UseChapterContentParams {
  chapters: ChapterMeta[]
  currentIndex: number
}

interface UseChapterContentResult {
  cache: Record<string, ChapterCacheEntry>
  loadChapter: (chapter: ChapterMeta) => Promise<void>
}

export function useChapterContent({
  chapters,
  currentIndex,
}: UseChapterContentParams): UseChapterContentResult {
  const [cache, setCache] = useState<Record<string, ChapterCacheEntry>>({})
  const inFlightRef = useRef(new Set<string>())
  const cacheRef = useRef(cache)

  useEffect(() => {
    cacheRef.current = cache
  }, [cache])

  const loadChapter = useCallback(async (chapter: ChapterMeta) => {
    const cached = cacheRef.current[chapter.id]
    if (cached?.status === 'loaded' || inFlightRef.current.has(chapter.id)) {
      return
    }

    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(getStorageKey(chapter.id))
      if (stored) {
        setCache((previous) => ({
          ...previous,
          [chapter.id]: { status: 'loaded', content: stored },
        }))
        return
      }
    }

    inFlightRef.current.add(chapter.id)
    setCache((previous) => ({
      ...previous,
      [chapter.id]: { status: 'loading' },
    }))

    try {
      const data = await getChapterContent(chapter)

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(getStorageKey(chapter.id), data.content)
      }

      setCache((previous) => ({
        ...previous,
        [chapter.id]: { status: 'loaded', content: data.content },
      }))
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ошибка загрузки главы'

      setCache((previous) => ({
        ...previous,
        [chapter.id]: { status: 'error', content: message },
      }))
    } finally {
      inFlightRef.current.delete(chapter.id)
    }
  }, [])

  useEffect(() => {
    const current = chapters[currentIndex]
    if (current) {
      void loadChapter(current)
    }
  }, [chapters, currentIndex, loadChapter])

  useEffect(() => {
    const neighbors = [currentIndex - 1, currentIndex + 1]
      .map((index) => chapters[index])
      .filter(Boolean) as ChapterMeta[]

    if (!neighbors.length) return

    const timer = setTimeout(() => {
      neighbors.forEach((chapter) => {
        void loadChapter(chapter)
      })
    }, NEIGHBOR_PREFETCH_DELAY_MS)

    return () => clearTimeout(timer)
  }, [chapters, currentIndex, loadChapter])

  return { cache, loadChapter }
}
