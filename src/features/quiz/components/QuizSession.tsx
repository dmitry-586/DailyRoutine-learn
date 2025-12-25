'use client'

import { getRandomQuestions } from '@/data/questions'
import type { QuizResult } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { useState } from 'react'
import { QuizQuestionCard } from './QuizQuestionCard'
import { QuizResults } from './QuizResults'

interface QuizSessionProps {
  questionCount?: number
  partIds?: string[]
  onFinish?: (result: QuizResult) => void
  onBack: () => void
}

export function QuizSession({
  questionCount = 10,
  partIds,
  onFinish,
  onBack,
}: QuizSessionProps) {
  const [questions, setQuestions] = useState(() =>
    getRandomQuestions(questionCount, { partIds }),
  )
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
    const newQuestions = getRandomQuestions(questionCount, { partIds })
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
    <div className='bg-background flex min-h-screen flex-col'>
      <div className='border-gray bg-background border-b px-4 py-4'>
        <div className='mx-auto flex max-w-4xl items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Button variant='secondary' onClick={onBack} size='sm'>
              Назад
            </Button>
            <div>
              <h2 className='text-foreground text-lg font-semibold'>
                Вопрос {currentIndex + 1} из {questions.length}
              </h2>
              <div className='bg-gray mt-1 h-2 w-64 overflow-hidden rounded-full'>
                <div
                  className='bg-primary h-full transition-all duration-300'
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          <div className='text-light-gray text-sm'>
            Прогресс: {Object.keys(answers).length} / {questions.length}
          </div>
        </div>
      </div>

      <div className='custom-scrollbar flex-1 overflow-y-auto px-4 py-8'>
        <div className='mx-auto max-w-3xl'>
          <QuizQuestionCard
            question={currentQuestion}
            userAnswer={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
          />
        </div>
      </div>

      <div className='border-gray bg-background border-t px-4 py-4'>
        <div className='mx-auto flex max-w-4xl justify-between'>
          <Button
            variant='secondary'
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Назад
          </Button>
          <Button onClick={handleNext} disabled={!hasAnswer} variant='default'>
            {currentIndex === questions.length - 1 ? 'Завершить' : 'Далее'}
          </Button>
        </div>
      </div>
    </div>
  )
}
