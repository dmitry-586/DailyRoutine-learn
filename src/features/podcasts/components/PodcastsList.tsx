'use client'

import { partsConfig } from '@/data-v2'
import { Headphones } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PartPodcastCard } from './PartPodcastCard'

export function PodcastsList() {
  const [audioFiles, setAudioFiles] = useState<Record<string, string | null>>(
    {},
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAudioFiles = async () => {
      const files: Record<string, string | null> = {}

      await Promise.all(
        partsConfig.map(async (part) => {
          try {
            const response = await fetch(`/api/audio/${part.id}`)
            if (response.ok) {
              const data = await response.json()
              files[part.id] = data.path || null
            } else {
              files[part.id] = null
            }
          } catch {
            files[part.id] = null
          }
        }),
      )

      setAudioFiles(files)
      setLoading(false)
    }

    checkAudioFiles()
  }, [])

  return (
    <div className='bg-background min-h-screen p-4 sm:p-6'>
      <div className='mx-auto max-w-4xl space-y-6'>
        <div className='text-center'>
          <div className='mb-4 flex justify-center'>
            <div className='rounded-full bg-primary/20 p-4'>
              <Headphones className='text-primary h-8 w-8 sm:h-10 sm:w-10' />
            </div>
          </div>
          <h1 className='text-foreground text-3xl font-bold sm:text-4xl'>
            Аудиоподкасты
          </h1>
          <p className='text-light-gray mt-2 text-base sm:text-lg'>
            Слушайте теорию в аудиоформате
          </p>
        </div>

        {loading ? (
          <div className='rounded-2xl bg-white/10 p-8 text-center shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)]'>
            <p className='text-light-gray'>Загрузка списка аудиофайлов...</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {partsConfig.map((part) => (
              <PartPodcastCard
                key={part.id}
                title={part.title}
                audioSrc={audioFiles[part.id] || null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
