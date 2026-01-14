import type { QuizQuestion } from '@/shared/types/quiz.types'
import { part1Questions } from './part-1'
import { part2Questions } from './part-2'
import { part3Questions } from './part-3'
import { part4Questions } from './part-4'

export const allQuestionsV2: QuizQuestion[] = [
  ...part1Questions,
  ...part2Questions,
  ...part3Questions,
  ...part4Questions,
]
