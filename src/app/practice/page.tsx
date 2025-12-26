'use client'

import { practiceConfig } from '@/data/practice'
import { Button } from '@/shared/ui/Button'
import { MarkdownContent } from '@/shared/ui/MarkdownContent'
import { ArrowLeft, Code, Eye, EyeOff, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface PracticeItem {
  id: string
  title: string
  content?: string
  solutions?: string
}

export default function PracticePage() {
  const router = useRouter()
  const [selectedPractice, setSelectedPractice] = useState<PracticeItem | null>(
    null,
  )
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showSolutions, setShowSolutions] = useState(false)

  const handleSelectPractice = async (practiceId: string) => {
    setLoadingId(practiceId)
    setError(null)
    setShowSolutions(false)

    try {
      const response = await fetch(`/api/practice/${practiceId}`)
      if (!response.ok) {
        throw new Error('Не удалось загрузить практику')
      }

      const data = await response.json()
      setSelectedPractice(data)
    } catch (error) {
      console.error('Error loading practice:', error)
      setError('Не удалось загрузить практику. Попробуйте позже.')
    } finally {
      setLoadingId(null)
    }
  }

  if (selectedPractice) {
    return (
      <div className='bg-background relative mx-auto flex h-screen max-w-5xl flex-col'>
        {/* Header */}
        <div className='border-gray bg-background sticky top-0 z-10 border-b px-4 py-3 sm:px-6'>
          <div className='flex items-center justify-between'>
            <div className='min-w-0 flex-1'>
              <h1 className='text-foreground truncate text-lg font-bold sm:text-xl'>
                {selectedPractice.title}
              </h1>
              <div className='text-light-gray mt-1 text-xs sm:text-sm'>
                {!showSolutions ? 'Практическое задание' : 'Разбор решений'}
              </div>
            </div>
            {selectedPractice.solutions && (
              <Button
                onClick={() => setShowSolutions(!showSolutions)}
                variant='glass'
                size='sm'
                title={showSolutions ? 'Скрыть решения' : 'Показать решения'}
                aria-label={
                  showSolutions ? 'Скрыть решения' : 'Показать решения'
                }
              >
                {showSolutions ? (
                  <EyeOff className='size-4' />
                ) : (
                  <Eye className='size-4' />
                )}
                <span className='hidden sm:inline'>
                  {showSolutions ? 'Скрыть решения' : 'Показать решения'}
                </span>
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto'>
          {!showSolutions ? (
            <MarkdownContent content={selectedPractice.content || ''} />
          ) : (
            <MarkdownContent content={selectedPractice.solutions || ''} />
          )}
        </div>

        {/* Navigation */}
        <div className='absolute bottom-5 left-5 z-50'>
          <Button
            onClick={() => {
              setSelectedPractice(null)
              setShowSolutions(false)
            }}
            variant='glass-icon'
            title='Назад к списку'
            aria-label='Назад к списку'
          >
            <ArrowLeft className='text-foreground size-6' />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-background relative mx-auto flex h-screen max-w-5xl flex-col'>
      {/* Header */}
      <div className='border-gray bg-background sticky top-0 z-10 border-b px-4 py-3 sm:px-6'>
        <div className='flex items-center justify-between'>
          <div className='min-w-0 flex-1'>
            <h1 className='text-foreground truncate text-lg font-bold sm:text-xl'>
              Практические задания
            </h1>
            <div className='text-light-gray mt-1 text-xs sm:text-sm'>
              Выберите практикум для изучения
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl'>
          {error && (
            <div className='mb-6 rounded-lg border-2 border-red-500/50 bg-red-500/10 p-4 text-center'>
              <p className='text-sm font-medium text-red-500'>{error}</p>
            </div>
          )}

          <div className='grid gap-4 sm:grid-cols-2'>
            {practiceConfig.map((practice) => {
              const isLoading = loadingId === practice.id
              const isDisabled = loadingId !== null

              return (
                <button
                  key={practice.id}
                  onClick={() => handleSelectPractice(practice.id)}
                  disabled={isDisabled}
                  className='group relative flex flex-col items-center gap-4 rounded-2xl bg-white/10 p-8 text-center shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)] transition-all hover:bg-white/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white/10'
                >
                  <div className='text-primary transition-transform group-hover:scale-110'>
                    <Code className='h-10 w-10' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-foreground mb-2 text-lg font-semibold'>
                      {practice.title}
                    </h3>
                    <p className='text-light-gray text-sm leading-relaxed'>
                      {practice.id === 'javascript-practice'
                        ? 'Основы JavaScript, DOM и асинхронность'
                        : 'React и архитектура приложений'}
                    </p>
                  </div>

                  {isLoading && (
                    <div className='text-primary bg-background/80 absolute inset-0 flex items-center justify-center gap-2 rounded-2xl backdrop-blur-sm'>
                      <div className='border-primary size-5 animate-spin rounded-full border-2 border-t-transparent' />
                      <span className='text-sm'>Загрузка...</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className='absolute right-5 bottom-5 z-50'>
        <Button
          onClick={() => router.push('/')}
          variant='glass-icon'
          title='Вернуться в меню'
          aria-label='Вернуться в меню'
        >
          <Home className='text-foreground size-6' />
        </Button>
      </div>
    </div>
  )
}
