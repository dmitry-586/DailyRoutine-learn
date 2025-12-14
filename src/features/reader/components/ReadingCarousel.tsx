'use client'

import type { ReaderContent } from '@/shared/types'
import { MarkdownContent } from '@/shared/ui/MarkdownContent'
import { useMemo, useState } from 'react'

import {
  getAllChapters,
  getChapterIndexInPart,
  getCurrentPart,
  useEmblaCarouselLogic,
} from '../lib'
import { GlobalTableOfContents } from './GlobalTableOfContents'
import { ReaderHeader } from './ReaderHeader'
import { ReaderNavigation } from './ReaderNavigation'

interface ReadingCarouselProps {
  content: ReaderContent
}

export function ReadingCarousel({ content }: ReadingCarouselProps) {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false)
  const allChapters = useMemo(() => getAllChapters(content), [content])

  const {
    emblaRef,
    currentIndex,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useEmblaCarouselLogic()

  const currentPart = useMemo(
    () => getCurrentPart(content, currentIndex),
    [content, currentIndex],
  )

  const chapterIndexInPart = useMemo(
    () => getChapterIndexInPart(content, currentIndex),
    [content, currentIndex],
  )

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
          {allChapters.map((chapter) => (
            <div
              key={chapter.id}
              className='custom-scrollbar h-full min-w-0 flex-[0_0_100%] overflow-y-auto'
            >
              <MarkdownContent content={chapter.content} />
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
