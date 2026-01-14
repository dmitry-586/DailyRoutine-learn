import type { QuizQuestion } from '@/shared/types/quiz.types'

export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function shuffleQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  return shuffle(questions)
}

export function shuffleAnswersInQuestion(question: QuizQuestion): QuizQuestion {
  return {
    ...question,
    answers: shuffle(question.answers),
  }
}

export function shuffleQuestionsAndAnswers(
  questions: QuizQuestion[],
): QuizQuestion[] {
  return shuffle(questions).map(shuffleAnswersInQuestion)
}
