'use client'

import { QuizStart } from '@/features/quiz'
import { useRouter } from 'next/navigation'

export default function QuizPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return <QuizStart onBack={handleBack} />
}
