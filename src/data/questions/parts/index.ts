import { part1Questions } from './part-1'
import { part2Questions } from './part-2'
import { part3Questions } from './part-3'
import { part4Questions } from './part-4'
import { part5Questions } from './part-5'
import { part6Questions } from './part-6'
import { part7Questions } from './part-7'
import { part8Questions } from './part-8'

import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Объединение всех вопросов из всех частей
 */
export const allQuestions: QuizQuestion[] = [
  ...part1Questions,
  ...part2Questions,
  ...part3Questions,
  ...part4Questions,
  ...part5Questions,
  ...part6Questions,
  ...part7Questions,
  ...part8Questions,
]
