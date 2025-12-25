export type QuestionType = 'single' | 'multiple' | 'text'

export interface QuizAnswer {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  type: QuestionType
  question: string
  answers: QuizAnswer[]
  explanation?: string
  chapterId: string
  partId: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface QuizSession {
  id: string
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: Record<string, string[] | string>
  startTime: number
  endTime?: number
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  score: number
  timeSpent: number
  answers: Record<
    string,
    {
      question: QuizQuestion
      userAnswer: string[] | string
      isCorrect: boolean
    }
  >
}
