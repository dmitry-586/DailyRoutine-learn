import type { QuizQuestion } from '@/shared/types/quiz.types'
import { allQuestionsV2 } from '../parts'

export const questionsBankV2: QuizQuestion[] = allQuestionsV2

export function getAllQuestionsV2(): QuizQuestion[] {
  return questionsBankV2
}

export function getQuestionByIdV2(id: string): QuizQuestion | undefined {
  return questionsBankV2.find((q) => q.id === id)
}

export function getTotalQuestionsCountV2(): number {
  return questionsBankV2.length
}
