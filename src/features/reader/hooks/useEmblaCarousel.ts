'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

interface UseEmblaCarouselReturn {
  emblaRef: (node: HTMLElement | null) => void
  currentIndex: number
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  emblaApi: ReturnType<typeof useEmblaCarousel>[1]
}

interface UseEmblaCarouselOptions {
  initialIndex?: number
}

export function useEmblaCarouselLogic(
  options: UseEmblaCarouselOptions = {},
): UseEmblaCarouselReturn {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    duration: 30,
    containScroll: 'trimSnaps',
    dragThreshold: 10,
    inViewThreshold: 0.7,
    watchDrag: (_emblaApi, event) => {
      if (event instanceof MouseEvent) {
        return false
      }

      if (event instanceof TouchEvent) {
        const pre = (event.target as HTMLElement)?.closest('pre')
        if (pre) {
          return false
        }
      }

      return true
    },
    startIndex: options.initialIndex ?? 0,
  })

  const [currentIndex, setCurrentIndex] = useState(options.initialIndex ?? 0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateState = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) return

    updateState()
    emblaApi.on('select', updateState)
    emblaApi.on('reInit', updateState)

    return () => {
      emblaApi.off('select', updateState)
      emblaApi.off('reInit', updateState)
    }
  }, [emblaApi, updateState])

  return {
    emblaRef,
    currentIndex,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
    emblaApi,
  }
}
