'use client'

import type { ChapterMeta } from '@/shared/types'
import { MarkdownContent } from '@/shared/ui/MarkdownContent'
import { useEffect, useMemo } from 'react'

import type { ChapterCacheEntry } from '../hooks/useChapterContent'

interface ChapterSlideProps {
  chapter: ChapterMeta
  chapterIndex: number
  currentIndex: number
  cache: Record<string, ChapterCacheEntry>
  virtualWindow?: number
  onEnsureLoad: (chapter: ChapterMeta) => Promise<void>
}

const DEFAULT_VIRTUAL_WINDOW = 1

export function ChapterSlide({
  chapter,
  chapterIndex,
  currentIndex,
  cache,
  virtualWindow = DEFAULT_VIRTUAL_WINDOW,
  onEnsureLoad,
}: ChapterSlideProps) {
  const chapterState = cache[chapter.id]
  const isVisible = useMemo(
    () => Math.abs(chapterIndex - currentIndex) <= virtualWindow,
    [chapterIndex, currentIndex, virtualWindow],
  )

  useEffect(() => {
    if (!isVisible) return
    void onEnsureLoad(chapter)
  }, [chapter, isVisible, onEnsureLoad])

  if (!isVisible) {
    return (
      <div className='text-foreground/70 flex h-full items-center justify-center px-4 text-sm'>
        Глава будет загружена при открытии
      </div>
    )
  }

  if (chapterState?.status === 'loaded' && chapterState.content) {
    return <MarkdownContent content={chapterState.content} />
  }

  if (chapterState?.status === 'error') {
    return (
      <div className='text-destructive flex h-full items-center justify-center px-4 text-sm'>
        {chapterState.content}
      </div>
    )
  }

  return (
    <div className='flex h-full items-center justify-center px-4'>
      <div className='border-primary size-8 animate-spin rounded-full border-4 border-t-transparent' />
    </div>
  )
}
