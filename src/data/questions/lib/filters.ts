import { questionsBank } from './questions-bank'

import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Получить вопросы по конкретной главе
 */
export function getQuestionsByChapter(chapterId: string): QuizQuestion[] {
  return questionsBank.filter((q) => q.chapterId === chapterId)
}

/**
 * Получить вопросы по конкретной части
 */
export function getQuestionsByPart(partId: string): QuizQuestion[] {
  return questionsBank.filter((q) => q.partId === partId)
}
