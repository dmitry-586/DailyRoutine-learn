'use client'

import type { ReaderContent } from '@/shared/types'
import { MarkdownContent } from '@/shared/ui/MarkdownContent'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { getAllChapters, getChapterIndexInPart, getCurrentPart } from '../lib'
import { ReaderNavigation } from './ReaderNavigation'

interface ReadingCarouselProps {
  content: ReaderContent
}

export function ReadingCarousel({ content }: ReadingCarouselProps) {
  const allChapters = useMemo(() => getAllChapters(content), [content])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    duration: 20,
  })

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const currentPart = useMemo(
    () => getCurrentPart(content, currentChapterIndex),
    [content, currentChapterIndex],
  )

  const chapterIndexInPart = useMemo(
    () => getChapterIndexInPart(content, currentChapterIndex),
    [content, currentChapterIndex],
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentChapterIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className='bg-background relative flex h-screen flex-col pb-12'>
      {/* Header с частью и информацией о главах */}
      {currentPart && (
        <div className='border-gray bg-background sticky top-0 z-10 border-b px-4 py-3 sm:px-6'>
          <h1 className='text-foreground truncate text-lg font-bold sm:text-xl'>
            {currentPart.title}
          </h1>
          <div className='text-light-gray mt-1 text-xs sm:text-sm'>
            Глава {chapterIndexInPart + 1} из {currentPart.chapters.length}
          </div>
        </div>
      )}

      {/* Carousel с главами */}
      <div className='flex-1 overflow-hidden' ref={emblaRef}>
        <div className='flex h-full'>
          {allChapters.map((chapter) => (
            <div
              key={chapter.id}
              className='custom-scrollbar h-full min-w-0 flex-[0_0_100%] overflow-y-auto'
            >
              <div className='h-full'>
                {chapter.title && (
                  <div className='border-gray bg-background sticky top-0 z-10 border-b px-4 py-2.5 sm:px-6'>
                    <h2 className='text-foreground text-base font-semibold sm:text-lg'>
                      {chapter.title}
                    </h2>
                  </div>
                )}
                <MarkdownContent content={chapter.content} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <ReaderNavigation
        currentChapterIndex={currentChapterIndex}
        currentPart={currentPart}
        parts={content.parts}
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
        onScrollPrev={scrollPrev}
        onScrollNext={scrollNext}
        onScrollTo={scrollTo}
      />
    </div>
  )
}
