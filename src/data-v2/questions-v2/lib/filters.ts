import type { QuizQuestion } from '@/shared/types/quiz.types'
import { questionsBankV2 } from './questions-bank'

export function filterByDifficultyV2(
  questions: QuizQuestion[],
  difficulty: 'easy' | 'medium' | 'hard',
): QuizQuestion[] {
  return questions.filter((q) => q.difficulty === difficulty)
}

export function filterByTypeV2(
  questions: QuizQuestion[],
  type: 'single' | 'multiple' | 'text',
): QuizQuestion[] {
  return questions.filter((q) => q.type === type)
}

export function getQuestionsByPartsV2(partIds: string[]): QuizQuestion[] {
  return questionsBankV2.filter((q) => partIds.includes(q.partId))
}

export function getQuestionsByChaptersV2(chapterIds: string[]): QuizQuestion[] {
  return questionsBankV2.filter((q) => chapterIds.includes(q.chapterId))
}

export function getFilteredQuestionsV2(filters: {
  partIds?: string[]
  chapterIds?: string[]
  difficulty?: ('easy' | 'medium' | 'hard')[]
  type?: ('single' | 'multiple' | 'text')[]
}): QuizQuestion[] {
  let questions = [...questionsBankV2]

  if (filters.partIds && filters.partIds.length > 0) {
    questions = questions.filter((q) => filters.partIds!.includes(q.partId))
  }

  if (filters.chapterIds && filters.chapterIds.length > 0) {
    questions = questions.filter((q) =>
      filters.chapterIds!.includes(q.chapterId),
    )
  }

  if (filters.difficulty && filters.difficulty.length > 0) {
    questions = questions.filter(
      (q) => q.difficulty && filters.difficulty!.includes(q.difficulty),
    )
  }

  if (filters.type && filters.type.length > 0) {
    questions = questions.filter((q) => filters.type!.includes(q.type))
  }

  return questions
}
