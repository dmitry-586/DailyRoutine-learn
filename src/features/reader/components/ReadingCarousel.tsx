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

  const initialIndexRef = useRef<number | null>(null)
  if (initialIndexRef.current === null) {
    const urlChapterId = searchParams.get('chapter')
    const urlIndex = findChapterIndexById(content, urlChapterId)

    if (urlIndex !== null) {
      initialIndexRef.current = urlIndex
    } else if (typeof window !== 'undefined') {
      const saved = Number(localStorage.getItem('reader:lastChapter') ?? '0')
      initialIndexRef.current = !Number.isNaN(saved) && saved >= 0 ? saved : 0
    } else {
      initialIndexRef.current = 0
    }
  }

  const {
    emblaRef,
    currentIndex,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useEmblaCarouselLogic({ initialIndex: initialIndexRef.current ?? 0 })

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

  // Persist current chapter
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('reader:lastChapter', String(currentIndex))

    const chapter = allChapters[currentIndex]
    if (!chapter) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('chapter', chapter.id)
    params.set('part', chapter.partId)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [currentIndex])

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
    <div className='bg-background relative flex h-screen flex-col pb-12'>
      {currentPart && (
        <ReaderHeader
          part={currentPart}
          chapterIndex={chapterIndexInPart}
          onOpenTableOfContents={() => setIsTableOfContentsOpen(true)}
        />
      )}

      <div className='flex-1 overflow-hidden' ref={emblaRef}>
        <div className='flex h-full'>
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
