'use client'

import { PodcastPlayer } from './PodcastPlayer'

interface PartPodcastCardProps {
  title: string
  audioSrc: string | null
}

export function PartPodcastCard({
  title,
  audioSrc,
}: PartPodcastCardProps) {
  if (!audioSrc) {
    return (
      <div className='rounded-2xl bg-white/5 p-6 opacity-50 shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)]'>
        <h3 className='text-foreground text-xl font-semibold'>{title}</h3>
        <p className='text-light-gray mt-2 text-sm'>
          Аудиофайл не найден
        </p>
      </div>
    )
  }

  return (
    <div className='rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)]'>
      <h3 className='text-foreground mb-4 text-xl font-semibold'>
        {title}
      </h3>
      <PodcastPlayer audioSrc={audioSrc} />
    </div>
  )
}
