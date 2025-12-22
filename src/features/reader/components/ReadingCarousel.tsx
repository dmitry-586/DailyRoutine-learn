'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

import type { ReaderContent } from '@/shared/types'

import { useChapterContent, useEmblaCarouselLogic } from '../hooks'
import {
  findChapterIndexById,
  getAllChapters,
  getChapterIndexInPart,
  getCurrentPart,
} from '../utils'
import { ChapterSlide } from './ChapterSlide'
import { GlobalTableOfContents } from './GlobalTableOfContents'
import { ReaderHeader } from './ReaderHeader'
import { ReaderNavigation } from './ReaderNavigation'

interface ReadingCarouselProps {
  content: ReaderContent
}

export function ReadingCarousel({ content }: ReadingCarouselProps) {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false)
  const allChapters = useMemo(() => getAllChapters(content), [content])
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Определяем начальный индекс только из URL для совместимости SSR
  // На сервере и клиенте должно быть одинаковое значение
  const initialIndexFromUrl = useMemo(() => {
    const urlChapterId = searchParams.get('chapter')
    const urlIndex = findChapterIndexById(content, urlChapterId)
    return urlIndex ?? 0
  }, [content, searchParams])

  const hasInitializedRef = useRef(false)

  const {
    emblaRef,
    currentIndex,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
    emblaApi,
  } = useEmblaCarouselLogic({ initialIndex: initialIndexFromUrl })

  // Обновляем позицию на клиенте из localStorage после монтирования
  useEffect(() => {
    if (hasInitializedRef.current) return
    hasInitializedRef.current = true

    // Если в URL нет главы, используем сохраненную из localStorage
    const urlChapterId = searchParams.get('chapter')
    if (!urlChapterId && typeof window !== 'undefined') {
      const saved = Number(localStorage.getItem('reader:lastChapter') ?? '0')
      if (
        !Number.isNaN(saved) &&
        saved >= 0 &&
        saved < allChapters.length &&
        saved !== initialIndexFromUrl
      ) {
        scrollTo(saved)
      }
    }
  }, [searchParams, allChapters.length, initialIndexFromUrl, scrollTo])

  const { cache, loadChapter } = useChapterContent({
    chapters: allChapters,
    currentIndex,
  })

  const currentPart = useMemo(
    () => getCurrentPart(content, currentIndex),
    [content, currentIndex],
  )

  const chapterIndexInPart = useMemo(
    () => getChapterIndexInPart(content, currentIndex),
    [content, currentIndex],
  )

  const currentChapter = useMemo(
    () => allChapters[currentIndex] ?? null,
    [allChapters, currentIndex],
  )

  const currentChapterContent = useMemo(() => {
    if (!currentChapter) return null
    const chapterState = cache[currentChapter.id]
    if (chapterState?.status === 'loaded' && chapterState.content) {
      return chapterState.content
    }
    return null
  }, [cache, currentChapter])

  // Persist current chapter - обновляем только после завершения анимации
  useEffect(() => {
    if (!emblaApi || typeof window === 'undefined') return

    const handleSettle = () => {
      const settledIndex = emblaApi.selectedScrollSnap()
      localStorage.setItem('reader:lastChapter', String(settledIndex))

      const chapter = allChapters[settledIndex]
      if (!chapter) return

      // Проверяем, нужно ли обновлять URL
      const currentChapterId = searchParams.get('chapter')
      if (currentChapterId === chapter.id) return

      const params = new URLSearchParams(searchParams.toString())
      params.set('chapter', chapter.id)
      params.set('part', chapter.partId)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    emblaApi.on('settle', handleSettle)

    return () => {
      emblaApi.off('settle', handleSettle)
    }
  }, [emblaApi, allChapters, searchParams, pathname, router])

  // Hotkeys
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (isTableOfContentsOpen) return

      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      if (isTyping) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isTableOfContentsOpen, scrollNext, scrollPrev])

  return (
    <div className='bg-background relative mx-auto flex h-screen max-w-5xl flex-col'>
      {currentPart && (
        <ReaderHeader
          part={currentPart}
          chapterIndex={chapterIndexInPart}
          currentChapter={currentChapter}
          chapterContent={currentChapterContent}
          onOpenTableOfContents={() => setIsTableOfContentsOpen(true)}
        />
      )}

      <div className='flex-1 touch-pan-x overflow-hidden' ref={emblaRef}>
        <div className='flex h-full will-change-transform'>
          {allChapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className='h-full min-w-0 flex-[0_0_100%] overflow-hidden'
            >
              <ChapterSlide
                chapter={chapter}
                currentIndex={currentIndex}
                chapterIndex={index}
                cache={cache}
                onEnsureLoad={loadChapter}
              />
            </div>
          ))}
        </div>
      </div>

      <ReaderNavigation
        chapterIndexInPart={chapterIndexInPart}
        currentPart={currentPart}
        parts={content.parts}
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
        onScrollPrev={scrollPrev}
        onScrollNext={scrollNext}
        onScrollTo={scrollTo}
      />

      <GlobalTableOfContents
        content={content}
        currentChapterIndex={currentIndex}
        onNavigateToChapter={scrollTo}
        isOpen={isTableOfContentsOpen}
        onClose={() => setIsTableOfContentsOpen(false)}
      />
    </div>
  )
}
