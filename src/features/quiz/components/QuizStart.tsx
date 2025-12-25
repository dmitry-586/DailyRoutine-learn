'use client'

import { partsConfig } from '@/data'
import { Button } from '@/shared/ui/Button'
import { useState } from 'react'
import { QuizSession } from './QuizSession'

interface QuizStartProps {
  onBack: () => void
}

export function QuizStart({ onBack }: QuizStartProps) {
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  const [questionCount, setQuestionCount] = useState(10)
  const [isStarted, setIsStarted] = useState(false)

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
    return (
      <QuizSession
        questionCount={questionCount}
        partIds={selectedParts.length > 0 ? selectedParts : undefined}
        onBack={() => setIsStarted(false)}
      />
    )
  }

  return (
    <div className='bg-background flex min-h-screen items-center justify-center p-4'>
      <div className='bg-muted border-gray w-full max-w-2xl space-y-6 rounded-2xl border-2 p-8'>
        <div>
          <h2 className='text-foreground text-2xl font-bold'>
            Настройка теста
          </h2>
          <p className='text-light-gray mt-2'>
            Выберите части и количество вопросов
          </p>
        </div>

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
          <div className='custom-scrollbar border-gray max-h-64 space-y-2 overflow-y-auto rounded-lg border-2 p-4'>
            {partsConfig
              .filter((part) => part.id !== 'part-10')
              .map((part) => {
                const isSelected = selectedParts.includes(part.id)
                return (
                  <button
                    key={part.id}
                    onClick={() => togglePart(part.id)}
                    className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-gray'
                        : 'border-gray bg-background hover:border-gray hover:bg-muted'
                    }`}
                  >
                    <div className='flex items-center justify-between'>
                      <span className='text-foreground font-medium'>
                        {part.title}
                      </span>
                      {isSelected && <span className='text-primary'>✓</span>}
                    </div>
                    <p className='text-light-gray mt-1 text-xs'>
                      {part.chapters.length} глав
                    </p>
                  </button>
                )
              })}
          </div>
        </div>

        <div className='flex gap-4'>
          <Button variant='secondary' onClick={onBack} className='flex-1'>
            Назад
          </Button>
          <Button onClick={handleStart} className='flex-1' variant='default'>
            Начать тест
          </Button>
        </div>
      </div>
    </div>
  )
}
