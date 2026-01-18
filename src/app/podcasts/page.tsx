'use client'

import { PodcastsList } from '@/features/podcasts'
import { Button } from '@/shared/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PodcastsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return (
    <div className='relative'>
      <div className='absolute left-4 top-4 z-10'>
        <Button variant='glass-icon' onClick={handleBack} aria-label='Назад'>
          <ArrowLeft className='h-5 w-5' />
        </Button>
      </div>
      <PodcastsList />
    </div>
  )
}
