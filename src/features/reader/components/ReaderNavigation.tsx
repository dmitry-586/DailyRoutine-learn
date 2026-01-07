'use client'

import type { Part } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  if (!currentPart) return null

  const handleBackToMenu = () => {
    router.push('/')
  }

  return (
    <>
      {/* Кнопка "Назад" слева внизу */}
      <div className='fixed bottom-4 left-4 z-50'>
        <Button
          variant='glass-icon'
          onClick={handleBackToMenu}
          title='Вернуться в меню'
          aria-label='Вернуться в меню'
        >
          <ArrowLeft className='text-foreground size-6' />
        </Button>
      </div>

      {/* Центральная навигация */}
      <div className='pointer-events-auto fixed right-4 bottom-4 z-50 flex items-center'>
        <nav className='pointer-events-auto rounded-full bg-white/10 shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)]'>
          <div className='flex items-center gap-2 px-2 py-1.5 sm:gap-3 sm:px-3 md:gap-4 md:px-4'>
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

      {/* <div className='fixed right-4 bottom-4 z-50'>
        <Button
          onClick={handleGenerateTest}
          title='Пройти тест'
          aria-label='Пройти тест'
        >
          <GraduationCap className='text-foreground size-6' />
        </Button>
      </div> */}
    </>
  )
}
