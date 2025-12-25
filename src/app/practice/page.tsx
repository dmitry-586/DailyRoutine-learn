'use client'

import { Button } from '@/shared/ui/Button'
import { Code } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PracticePage() {
  const router = useRouter()

  return (
    <div className='bg-background flex min-h-screen items-center justify-center p-4'>
      <div className='bg-muted border-gray w-full max-w-2xl space-y-6 rounded-2xl border-2 p-8 text-center'>
        <div className='flex justify-center'>
          <Code className='text-primary h-16 w-16' />
        </div>
        <div>
          <h2 className='text-foreground text-3xl font-bold'>
            Практические задания
          </h2>
          <p className='text-light-gray mt-4 text-lg'>
            Раздел с практическими заданиями находится в разработке
          </p>
        </div>
        <Button onClick={() => router.push('/')} variant='default'>
          Вернуться в меню
        </Button>
      </div>
    </div>
  )
}
