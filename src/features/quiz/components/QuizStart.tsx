'use client'

import { partsConfig } from '@/data'
import { getPartsWithQuestionCount } from '@/data/questions'
import { Button } from '@/shared/ui/Button'
import { ArrowLeft, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import { QuizSession } from './QuizSession'

interface QuizStartProps {
  onBack: () => void
}

export function QuizStart({ onBack }: QuizStartProps) {
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  const [questionCount, setQuestionCount] = useState(10)
  const [isStarted, setIsStarted] = useState(false)
  const [allQuestionsMode, setAllQuestionsMode] = useState<string | null>(null)

  const partsWithCounts = useMemo(() => {
    const counts = getPartsWithQuestionCount()
    const countsMap = new Map(counts.map((c) => [c.partId, c.count]))
    return countsMap
  }, [])

  const togglePart = (partId: string) => {
    setSelectedParts((prev) =>
      prev.includes(partId)
        ? prev.filter((id) => id !== partId)
        : [...prev, partId],
    )
    setAllQuestionsMode(null)
  }

  const handleStartAllQuestions = (partId: string) => {
    setSelectedParts([partId])
    setAllQuestionsMode(partId)
    setIsStarted(true)
  }

  const handleStart = () => {
    setAllQuestionsMode(null)
    setIsStarted(true)
  }

  if (isStarted) {
    return (
      <QuizSession
        questionCount={questionCount}
        partIds={selectedParts.length > 0 ? selectedParts : undefined}
        allQuestions={allQuestionsMode !== null}
        onBack={() => {
          setIsStarted(false)
          setAllQuestionsMode(null)
        }}
      />
    )
  }

  return (
    <div className='bg-background relative mx-auto flex h-screen max-w-5xl flex-col'>
      {/* Header */}
      <div className='border-gray bg-background sticky top-0 z-10 border-b px-4 py-3 sm:px-6'>
        <div className='flex items-center justify-between'>
          <div className='min-w-0 flex-1'>
            <h1 className='text-foreground truncate text-lg font-bold sm:text-xl'>
              Настройка теста
            </h1>
            <div className='text-light-gray mt-1 text-xs sm:text-sm'>
              Выберите части и количество вопросов
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl space-y-6'>
          <div>
            <label className='text-foreground mb-2 block text-sm font-medium'>
              Количество вопросов
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className='bg-background text-foreground border-gray focus:border-primary w-full rounded-lg border-2 px-4 py-2 focus:outline-none'
            >
              <option value={5}>5 вопросов</option>
              <option value={10}>10 вопросов</option>
              <option value={15}>15 вопросов</option>
              <option value={20}>20 вопросов</option>
              <option value={30}>30 вопросов</option>
            </select>
          </div>

          <div>
            <label className='text-foreground mb-3 block text-sm font-medium'>
              Выберите части (оставьте пустым для всех)
            </label>
            <div className='custom-scrollbar border-gray max-h-96 space-y-2 overflow-y-auto rounded-lg border-2 p-4'>
              {partsConfig
                .filter((part) => part.id !== 'part-10')
                .map((part) => {
                  const isSelected = selectedParts.includes(part.id)
                  const questionCount = partsWithCounts.get(part.id) ?? 0
                  return (
                    <div
                      key={part.id}
                      className={`rounded-lg border-2 p-3 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-gray bg-background'
                      }`}
                    >
                      <button
                        onClick={() => togglePart(part.id)}
                        className='w-full text-left'
                      >
                        <div className='flex items-center justify-between'>
                          <span className='text-foreground font-medium'>
                            {part.title}
                          </span>
                          {isSelected && (
                            <span className='text-primary text-lg'>✓</span>
                          )}
                        </div>
                        <p className='text-light-gray mt-1 text-xs'>
                          {part.chapters.length} глав • {questionCount} вопросов
                        </p>
                      </button>
                      {questionCount > 0 && (
                        <div className='mt-2 flex gap-2'>
                          <Button
                            variant='glass'
                            size='sm'
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStartAllQuestions(part.id)
                            }}
                            className='flex-1 text-xs'
                          >
                            Решить все ({questionCount})
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className='fixed bottom-5 left-5 z-50'>
        <Button
          variant='glass-icon'
          onClick={onBack}
          title='Вернуться в меню'
          aria-label='Вернуться в меню'
        >
          <ArrowLeft className='text-foreground size-6' />
        </Button>
      </div>

      <div className='fixed right-5 bottom-5 z-50'>
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
