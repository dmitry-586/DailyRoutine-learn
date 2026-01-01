'use client'

import type { QuizResult } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { CheckCircle2, Clock, Home, RotateCcw, XCircle } from 'lucide-react'

interface QuizResultsProps {
  result: QuizResult
  onBack: () => void
  onRestart: () => void
}

export function QuizResults({ result, onBack, onRestart }: QuizResultsProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Отлично! 🎉'
    if (score >= 80) return 'Хорошо! 👍'
    if (score >= 60) return 'Неплохо! 💪'
    return 'Продолжайте учиться! 📚'
  }

  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className='bg-background relative mx-auto flex h-screen max-w-5xl flex-col'>
      {/* Header */}
      <div className='border-gray bg-background sticky top-0 z-10 border-b px-4 py-3 sm:px-6'>
        <div className='flex items-center justify-between'>
          <div className='min-w-0 flex-1'>
            <h1 className='text-foreground truncate text-lg font-bold sm:text-xl'>
              Результаты теста
            </h1>
            <div className='text-light-gray mt-1 text-xs sm:text-sm'>
              {getScoreMessage(result.score)}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl space-y-6'>
          <div className='text-center'>
            <div
              className={`text-5xl font-bold ${getScoreColorClass(result.score)}`}
            >
              {result.score}%
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            <div className='bg-background border-gray rounded-lg border-2 p-4 text-center'>
              <div className='flex items-center justify-center gap-2 text-green-400'>
                <CheckCircle2 className='h-5 w-5' />
                <span className='text-2xl font-bold'>
                  {result.correctAnswers}
                </span>
              </div>
              <p className='text-light-gray mt-1 text-sm'>Правильных</p>
            </div>

            <div className='bg-background border-gray rounded-lg border-2 p-4 text-center'>
              <div className='flex items-center justify-center gap-2 text-red-400'>
                <XCircle className='h-5 w-5' />
                <span className='text-2xl font-bold'>
                  {result.incorrectAnswers}
                </span>
              </div>
              <p className='text-light-gray mt-1 text-sm'>Неправильных</p>
            </div>

            <div className='bg-background border-gray rounded-lg border-2 p-4 text-center'>
              <div className='text-primary flex items-center justify-center gap-2'>
                <Clock className='h-5 w-5' />
                <span className='text-2xl font-bold'>
                  {formatTime(result.timeSpent)}
                </span>
              </div>
              <p className='text-light-gray mt-1 text-sm'>Время</p>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-foreground text-lg font-semibold'>
              Детали по вопросам:
            </h3>
            <div className='custom-scrollbar max-h-96 space-y-2 overflow-y-auto'>
              {Object.values(result.answers).map((answer, index) => (
                <div
                  key={answer.question.id}
                  className={`rounded-lg border-2 p-4 ${
                    answer.isCorrect
                      ? 'border-green-500/30 bg-green-500/10'
                      : 'border-red-500/30 bg-red-500/10'
                  }`}
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='mb-1 flex items-center gap-2'>
                        {answer.isCorrect ? (
                          <CheckCircle2 className='h-4 w-4 text-green-400' />
                        ) : (
                          <XCircle className='h-4 w-4 text-red-400' />
                        )}
                        <span className='text-foreground text-sm font-medium'>
                          Вопрос {index + 1}
                        </span>
                      </div>
                      <p className='text-foreground text-sm'>
                        {answer.question.question}
                      </p>
                      {answer.question.explanation && (
                        <p className='text-light-gray mt-2 text-xs'>
                          {answer.question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          <Home className='text-foreground size-6' />
        </Button>
      </div>

      <div className='fixed right-4 bottom-4 z-50'>
        <Button
          variant='glass-icon'
          onClick={onRestart}
          title='Пройти ещё раз'
          aria-label='Пройти ещё раз'
        >
          <RotateCcw className='text-foreground size-6' />
        </Button>
      </div>
    </div>
  )
}
