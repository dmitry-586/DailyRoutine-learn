'use client'

import type { Part } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { ArrowLeft, GraduationCap } from 'lucide-react'
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

  const handleGenerateTest = () => {
    router.push('/quiz')
  }

  return (
    <>
      {/* Кнопка "Назад" слева внизу */}
      <div className='fixed bottom-4 left-4 z-50'>
        <Button
          onClick={handleBackToMenu}
          variant='glass-icon'
          title='Вернуться в меню'
          aria-label='Вернуться в меню'
        >
          <ArrowLeft className='text-foreground size-6' />
        </Button>
      </div>

      {/* Центральная навигация */}
      <div className='fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center'>
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

      {/* Кнопка "Тесты" справа внизу */}
      <div className='fixed right-4 bottom-4 z-50'>
        <Button
          onClick={handleGenerateTest}
          variant='glass-icon'
          title='Пройти тест'
          aria-label='Пройти тест'
        >
          <GraduationCap className='text-foreground size-6' />
        </Button>
      </div>
    </>
  )
}
