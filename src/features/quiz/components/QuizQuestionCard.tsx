'use client'

import type { QuizQuestion } from '@/shared/types'
import { CheckCircle2, Circle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { seededShuffle } from '../utils/seededShuffle'

const QuizMarkdown = dynamic(
  () => import('./QuizMarkdown').then((m) => m.QuizMarkdown),
  { ssr: false },
)

interface QuizQuestionCardProps {
  question: QuizQuestion
  userAnswer?: string[] | string
  onAnswer: (questionId: string, answer: string[] | string) => void
  shuffleSeed?: string
}

function hasMarkdown(content: string): boolean {
  return (
    content.includes('`') || content.includes('```') || content.includes('\n')
  )
}

export function QuizQuestionCard({
  question,
  userAnswer,
  onAnswer,
  shuffleSeed,
}: QuizQuestionCardProps) {
  const handleSingleSelect = (answerId: string) => {
    onAnswer(question.id, answerId)
  }

  const handleMultipleSelect = (answerId: string) => {
    const current = Array.isArray(userAnswer) ? userAnswer : []
    const newAnswer = current.includes(answerId)
      ? current.filter((id) => id !== answerId)
      : [...current, answerId]
    onAnswer(question.id, newAnswer)
  }

  const isSelected = (answerId: string) => {
    if (question.type === 'single') {
      return userAnswer === answerId
    }
    return Array.isArray(userAnswer) && userAnswer.includes(answerId)
  }

  const answersToRender = useMemo(() => {
    const seedKey = `${shuffleSeed ?? 'default'}:${question.id}`
    return seededShuffle(question.answers, seedKey)
  }, [question.answers, question.id, shuffleSeed])

  return (
    <div className='space-y-6'>
      {question.difficulty && (
        <div className='flex items-center gap-2'>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              question.difficulty === 'easy'
                ? 'bg-green-500/20 text-green-400'
                : question.difficulty === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
            }`}
          >
            {question.difficulty === 'easy'
              ? 'Легко'
              : question.difficulty === 'medium'
                ? 'Средне'
                : 'Сложно'}
          </span>
        </div>
      )}

      {hasMarkdown(question.question) ? (
        <QuizMarkdown
          content={question.question}
          className='text-foreground text-xl font-semibold'
        />
      ) : (
        <h3 className='text-foreground text-xl font-semibold'>
          {question.question}
        </h3>
      )}

      <div className='space-y-3'>
        {answersToRender.map((answer) => {
          const selected = isSelected(answer.id)
          const useMarkdown = hasMarkdown(answer.text)
          return (
            <button
              key={answer.id}
              onClick={() =>
                question.type === 'single'
                  ? handleSingleSelect(answer.id)
                  : handleMultipleSelect(answer.id)
              }
              className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all ${
                selected
                  ? 'border-primary bg-gray'
                  : 'border-gray bg-background hover:border-gray hover:bg-muted'
              }`}
            >
              <div className='mt-0.5 shrink-0'>
                {question.type === 'single' ? (
                  selected ? (
                    <Circle className='fill-primary text-primary h-5 w-5' />
                  ) : (
                    <Circle className='text-light-gray h-5 w-5' />
                  )
                ) : selected ? (
                  <CheckCircle2 className='text-primary h-5 w-5' />
                ) : (
                  <div className='border-light-gray h-5 w-5 rounded border-2' />
                )}
              </div>
              <span className='text-foreground flex-1'>
                {useMarkdown ? (
                  <QuizMarkdown content={answer.text} />
                ) : (
                  <span>{answer.text}</span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
