'use client'

import { BookOpen, Code, GraduationCap } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function MainMenu() {
  const router = useRouter()

  return (
    <div className='bg-background flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-2xl space-y-8'>
        <div className='text-center'>
          <h1 className='text-foreground text-4xl font-bold'>
            Daily Routine Learn
          </h1>
          <p className='text-light-gray mt-2 text-lg'>
            Выберите режим обучения
          </p>
        </div>

        <div className='grid gap-4 md:grid-cols-3'>
          <MenuCard
            icon={<BookOpen className='h-8 w-8' />}
            title='Учебник'
            description='Изучайте теорию по всем главам курса'
            onClick={() => router.push('/theory')}
          />

          <MenuCard
            icon={<Code className='h-8 w-8' />}
            title='Практика'
            description='Практические задания и упражнения'
            onClick={() => router.push('/practice')}
            disabled
          />

          <MenuCard
            icon={<GraduationCap className='h-8 w-8' />}
            title='Тесты'
            description='Проверьте знания теоретическими вопросами'
            onClick={() => router.push('/quiz')}
          />
        </div>
      </div>
    </div>
  )
}

interface MenuCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  disabled?: boolean
}

function MenuCard({
  icon,
  title,
  description,
  onClick,
  disabled = false,
}: MenuCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='group border-gray bg-muted hover:border-primary hover:bg-gray disabled:hover:border-gray disabled:hover:bg-muted relative flex flex-col items-center gap-4 rounded-2xl border-2 p-6 text-center transition-all disabled:cursor-not-allowed disabled:opacity-50'
    >
      <div className='text-primary transition-transform group-hover:scale-110'>
        {icon}
      </div>
      <div>
        <h3 className='text-foreground text-xl font-semibold'>{title}</h3>
        <p className='text-light-gray mt-2 text-sm'>{description}</p>
      </div>
      {disabled && (
        <span className='bg-gray text-light-gray absolute top-2 right-2 rounded px-2 py-1 text-xs'>
          Скоро
        </span>
      )}
    </button>
  )
}
