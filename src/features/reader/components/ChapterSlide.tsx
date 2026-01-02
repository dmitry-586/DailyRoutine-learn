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
  onEnsureLoad: (chapter: ChapterMeta) => Promise<void>
}

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
 * Мемоизированное сообщение об ошибке
 */
const ErrorMessage = memo(({ message }: { message: string }) => (
  <div className='text-destructive flex h-full items-center justify-center px-4 text-sm'>
    {message}
  </div>
))

ErrorMessage.displayName = 'ErrorMessage'

/**
 * Основной компонент слайда главы с виртуализацией соседних глав
 */
export const ChapterSlide = memo(
  function ChapterSlide({
    chapter,
    chapterIndex,
    currentIndex,
    cache,
    onEnsureLoad,
  }: ChapterSlideProps) {
    const chapterState = cache[chapter.id]

    // Виртуализация: загружаем только текущую главу и соседние (±1)
    const virtualWindow = 1
    const isVisible = useMemo(
      () => Math.abs(chapterIndex - currentIndex) <= virtualWindow,
      [chapterIndex, currentIndex],
    )

    // Загружаем только видимые главы
    useEffect(() => {
      if (isVisible) {
        void onEnsureLoad(chapter)
      }
    }, [chapter, isVisible, onEnsureLoad])

    // Если глава не видима, не рендерим контент
    if (!isVisible) {
      return null
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
    const prevVisible =
      Math.abs(prevProps.chapterIndex - prevProps.currentIndex) <= 1
    const nextVisible =
      Math.abs(nextProps.chapterIndex - nextProps.currentIndex) <= 1

    return (
      prevProps.chapter.id === nextProps.chapter.id &&
      prevVisible === nextVisible &&
      prevProps.currentIndex === nextProps.currentIndex &&
      prevProps.cache[prevProps.chapter.id]?.status ===
        nextProps.cache[nextProps.chapter.id]?.status &&
      prevProps.cache[prevProps.chapter.id]?.content ===
        nextProps.cache[nextProps.chapter.id]?.content
    )
  },
)
