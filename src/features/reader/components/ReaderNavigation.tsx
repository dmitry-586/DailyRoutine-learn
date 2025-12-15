import type { Part } from '@/shared/types'

import { ChapterIndicators } from './ChapterIndicators'
import { NavigationButton } from './NavigationButton'

interface ReaderNavigationProps {
  chapterIndexInPart: number
  currentPart: Part | null
  parts: Part[]
  canScrollPrev: boolean
  canScrollNext: boolean
  onScrollPrev: () => void
  onScrollNext: () => void
  onScrollTo: (index: number) => void
}

export function ReaderNavigation({
  chapterIndexInPart,
  currentPart,
  parts,
  canScrollPrev,
  canScrollNext,
  onScrollPrev,
  onScrollNext,
  onScrollTo,
}: ReaderNavigationProps) {
  if (!currentPart) return null

  return (
    <div className='fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center'>
      <nav className='rounded-full bg-white/10 shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)]'>
        <div className='flex items-center gap-4 px-4 py-2'>
          <NavigationButton
            direction='prev'
            disabled={!canScrollPrev}
            onClick={onScrollPrev}
            label='Предыдущая глава'
          />

          <ChapterIndicators
            chapters={currentPart.chapters}
            currentIndex={chapterIndexInPart}
            parts={parts}
            currentPart={currentPart}
            onScrollTo={onScrollTo}
          />

          <NavigationButton
            direction='next'
            disabled={!canScrollNext}
            onClick={onScrollNext}
            label='Следующая глава'
          />
        </div>
      </nav>
    </div>
  )
}
