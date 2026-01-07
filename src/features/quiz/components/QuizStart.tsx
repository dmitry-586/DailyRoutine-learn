'use client'

import { partsConfig } from '@/data-v2'
import { getPartsWithQuestionCount } from '@/data/questions'
import { Button } from '@/shared/ui/Button'
import { ArrowLeft, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PartsSelector } from './PartsSelector'
import { QuestionCountSlider } from './QuestionCountSlider'
import { QuizSession } from './QuizSession'

interface QuizStartProps {
  onBack: () => void
}

export function QuizStart({ onBack }: QuizStartProps) {
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  const [questionCount, setQuestionCount] = useState(10)
  const [isStarted, setIsStarted] = useState(false)

  const partsWithCounts = useMemo(() => {
    const counts = getPartsWithQuestionCount()
    return new Map(counts.map((c) => [c.partId, c.count]))
  }, [])

  const availableParts = useMemo(() => partsConfig, [])

  const totalAvailableQuestions = useMemo(() => {
    if (selectedParts.length === 0) {
      return Array.from(partsWithCounts.values()).reduce((a, b) => a + b, 0)
    }
    return selectedParts.reduce(
      (sum, partId) => sum + (partsWithCounts.get(partId) ?? 0),
      0,
    )
  }, [selectedParts, partsWithCounts])

  const togglePart = (partId: string) => {
    setSelectedParts((prev) =>
      prev.includes(partId)
        ? prev.filter((id) => id !== partId)
        : [...prev, partId],
    )
  }

  const handleStart = () => {
    setIsStarted(true)
  }

  if (isStarted) {
    const isAllQuestions = questionCount === 999
    return (
      <QuizSession
        questionCount={isAllQuestions ? totalAvailableQuestions : questionCount}
        partIds={selectedParts.length > 0 ? selectedParts : undefined}
        allQuestions={isAllQuestions}
        onBack={() => setIsStarted(false)}
      />
    )
  }

  return (
    <div className='bg-background relative mx-auto flex h-screen max-w-5xl flex-col'>
      {/* Header */}
      <div className='border-gray bg-background sticky top-0 z-10 border-b px-4 py-4 sm:px-6'>
        <h1 className='text-foreground text-center text-xl font-bold sm:text-2xl'>
          Настройка теста
        </h1>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl space-y-6'>
          <QuestionCountSlider
            value={questionCount}
            maxValue={totalAvailableQuestions}
            onChange={setQuestionCount}
          />
          <PartsSelector
            parts={availableParts}
            selectedParts={selectedParts}
            partsWithCounts={partsWithCounts}
            onTogglePart={togglePart}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className='fixed bottom-4 left-4 z-50'>
        <Button
          variant='glass-icon'
          onClick={onBack}
          title='Вернуться в меню'
          aria-label='Вернуться в меню'
        >
          <ArrowLeft className='text-foreground size-6' />
        </Button>
      </div>

      <div className='fixed right-4 bottom-4 z-50'>
        <Button
          variant='glass-icon'
          onClick={handleStart}
          title='Начать тест'
          aria-label='Начать тест'
        >
          <Play className='text-foreground size-6' />
        </Button>
      </div>
    </div>
  )
}
