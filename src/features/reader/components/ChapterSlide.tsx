'use client'

import type { ChapterMeta } from '@/shared/types'
import { MarkdownContent } from '@/shared/ui/MarkdownContent'
import { memo, useEffect, useMemo } from 'react'

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

/**
 * Мемоизированный спиннер загрузки
 */
const LoadingSpinner = memo(() => (
  <div className='flex h-full items-center justify-center px-4'>
    <div className='border-primary size-8 animate-spin rounded-full border-4 border-t-transparent' />
  </div>
))

LoadingSpinner.displayName = 'LoadingSpinner'

/**
 * Мемоизированный плейсхолдер для невидимых глав
 */
const ChapterPlaceholder = memo(() => (
  <div className='text-foreground/70 flex h-full items-center justify-center px-4 text-sm'>
    Глава будет загружена при открытии
  </div>
))

ChapterPlaceholder.displayName = 'ChapterPlaceholder'

/**
 * Мемоизированное сообщение об ошибке
 */
const ErrorMessage = memo(({ message }: { message: string }) => (
  <div className='text-destructive flex h-full items-center justify-center px-4 text-sm'>
    {message}
  </div>
))

ErrorMessage.displayName = 'ErrorMessage'

/**
 * Основной компонент слайда главы с оптимизацией рендеринга
 */
export const ChapterSlide = memo(
  function ChapterSlide({
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
      return <ChapterPlaceholder />
    }

    if (chapterState?.status === 'loaded' && chapterState.content) {
      return <MarkdownContent content={chapterState.content} />
    }

    if (chapterState?.status === 'error') {
      return (
        <ErrorMessage message={chapterState.content ?? 'Ошибка загрузки'} />
      )
    }

    return <LoadingSpinner />
  },
  (prevProps, nextProps) => {
    return (
      prevProps.chapter.id === nextProps.chapter.id &&
      prevProps.currentIndex === nextProps.currentIndex &&
      prevProps.cache[prevProps.chapter.id]?.status ===
        nextProps.cache[nextProps.chapter.id]?.status &&
      prevProps.cache[prevProps.chapter.id]?.content ===
        nextProps.cache[nextProps.chapter.id]?.content
    )
  },
)
