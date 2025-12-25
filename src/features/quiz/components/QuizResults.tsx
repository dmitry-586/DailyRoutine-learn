'use client'

import type { QuizResult } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'

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
    <div className='bg-background flex min-h-screen items-center justify-center p-4'>
      <div className='bg-muted border-gray w-full max-w-3xl space-y-6 rounded-2xl border-2 p-8'>
        <div className='text-center'>
          <h2 className='text-foreground text-3xl font-bold'>
            Результаты теста
          </h2>
          <div className='mt-4'>
            <div
              className={`text-5xl font-bold ${getScoreColorClass(result.score)}`}
            >
              {result.score}%
            </div>
            <p className='text-light-gray mt-2 text-lg'>
              {getScoreMessage(result.score)}
            </p>
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

        <div className='flex gap-4'>
          <Button variant='secondary' onClick={onBack} className='flex-1'>
            Назад в меню
          </Button>
          <Button onClick={onRestart} className='flex-1'>
            Пройти ещё раз
          </Button>
        </div>
      </div>
    </div>
  )
}
