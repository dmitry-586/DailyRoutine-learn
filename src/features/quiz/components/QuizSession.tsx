'use client'

import { getAllQuestionsByPart, getRandomQuestions } from '@/data/questions'
import type { QuizResult } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { QuizQuestionCard } from './QuizQuestionCard'
import { QuizResults } from './QuizResults'

interface QuizSessionProps {
  questionCount?: number
  partIds?: string[]
  allQuestions?: boolean
  onFinish?: (result: QuizResult) => void
  onBack: () => void
}

export function QuizSession({
  questionCount = 10,
  partIds,
  allQuestions = false,
  onFinish,
  onBack,
}: QuizSessionProps) {
  const [questions, setQuestions] = useState(() => {
    if (allQuestions && partIds && partIds.length === 1) {
      // Режим "все вопросы раздела"
      return getAllQuestionsByPart(partIds[0], {
        shuffle: true,
        distributeByChapter: true,
      })
    }
    return getRandomQuestions(questionCount, { partIds })
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[] | string>>({})
  const [startTime, setStartTime] = useState(() => Date.now())
  const [isFinished, setIsFinished] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)

  const currentQuestion = questions[currentIndex] ?? null

  const handleAnswer = (questionId: string, answer: string[] | string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      finishQuiz()
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const finishQuiz = () => {
    const endTime = Date.now()
    const timeSpent = endTime - startTime

    const quizResult: QuizResult = {
      totalQuestions: questions.length,
      correctAnswers: 0,
      incorrectAnswers: 0,
      score: 0,
      timeSpent,
      answers: {},
    }

    for (const question of questions) {
      const userAnswer = answers[question.id]
      const correctAnswers = question.answers
        .filter((a) => a.isCorrect)
        .map((a) => a.id)

      let isCorrect = false

      if (question.type === 'single') {
        isCorrect = userAnswer === correctAnswers[0]
      } else if (question.type === 'multiple') {
        const userAnswerArray = Array.isArray(userAnswer)
          ? userAnswer
          : [userAnswer]
        isCorrect =
          userAnswerArray.length === correctAnswers.length &&
          userAnswerArray.every((id) => correctAnswers.includes(id))
      }

      if (isCorrect) {
        quizResult.correctAnswers++
      } else {
        quizResult.incorrectAnswers++
      }

      quizResult.answers[question.id] = {
        question,
        userAnswer: userAnswer ?? (question.type === 'single' ? '' : []),
        isCorrect,
      }
    }

    quizResult.score = Math.round(
      (quizResult.correctAnswers / quizResult.totalQuestions) * 100,
    )

    setResult(quizResult)
    setIsFinished(true)
    onFinish?.(quizResult)
  }

  const progress = ((currentIndex + 1) / questions.length) * 100
  const hasAnswer = currentQuestion
    ? answers[currentQuestion.id] !== undefined
    : false

  const handleRestart = () => {
    setIsFinished(false)
    setResult(null)
    setCurrentIndex(0)
    setAnswers({})
    setStartTime(Date.now())
    // Пересоздаём вопросы для нового теста
    const newQuestions =
      allQuestions && partIds && partIds.length === 1
        ? getAllQuestionsByPart(partIds[0], {
            shuffle: true,
            distributeByChapter: true,
          })
        : getRandomQuestions(questionCount, { partIds })
    setQuestions(newQuestions)
  }

  if (isFinished && result) {
    return (
      <QuizResults result={result} onBack={onBack} onRestart={handleRestart} />
    )
  }

  if (!currentQuestion) {
    return (
      <div className='bg-background flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <p className='text-light-gray'>Вопросы не найдены</p>
          <Button onClick={onBack} className='mt-4'>
            Назад
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-background relative mx-auto flex h-screen max-w-5xl flex-col'>
      {/* Header */}
      <div className='border-gray bg-background sticky top-0 z-10 border-b px-4 py-3 sm:px-6'>
        <div className='flex items-center justify-between'>
          <div className='min-w-0 flex-1'>
            <h1 className='text-foreground truncate text-lg font-bold sm:text-xl'>
              Вопрос {currentIndex + 1} из {questions.length}
            </h1>
            <div className='mt-2'>
              <div className='bg-gray h-2 w-full overflow-hidden rounded-full'>
                <div
                  className='bg-primary h-full transition-all duration-300'
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          <div className='text-light-gray ml-4 text-right text-xs sm:text-sm'>
            <div>Отвечено: {Object.keys(answers).length}</div>
            <div>Всего: {questions.length}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto'>
        <div className='mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8'>
          <QuizQuestionCard
            question={currentQuestion}
            userAnswer={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className='fixed bottom-4 left-4 z-50'>
        <Button
          variant='glass-icon'
          onClick={onBack}
          title='Назад к настройкам'
          aria-label='Назад к настройкам'
        >
          <ArrowLeft className='text-foreground size-6' />
        </Button>
      </div>

      <div className='fixed right-4 bottom-4 z-50 flex items-center gap-3'>
        {currentIndex > 0 && (
          <Button
            onClick={handlePrev}
            title='Предыдущий вопрос'
            aria-label='Предыдущий вопрос'
          >
            Назад
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!hasAnswer}
          title={
            currentIndex === questions.length - 1
              ? 'Завершить тест'
              : 'Следующий вопрос'
          }
          aria-label={
            currentIndex === questions.length - 1
              ? 'Завершить тест'
              : 'Следующий вопрос'
          }
        >
          {currentIndex === questions.length - 1 ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  )
}
