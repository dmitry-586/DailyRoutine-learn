'use client'

import { Button } from '@/shared/ui/Button'
import { Download, Pause, Play, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface PodcastPlayerProps {
  audioSrc: string
}

export function PodcastPlayer({ audioSrc }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      setError('Не удалось загрузить аудиофайл')
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [audioSrc])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setError('Не удалось воспроизвести аудио')
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = parseFloat(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = audioSrc
    link.download = audioSrc.split('/').pop() || 'audio.m4a'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (error) {
    return (
      <div className='w-full rounded-lg border-2 border-red-500/50 bg-red-500/10 p-4 text-center'>
        <p className='text-sm font-medium text-red-500'>{error}</p>
      </div>
    )
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  return (
    <div className='w-full space-y-4'>
      <audio ref={audioRef} src={audioSrc} preload='metadata' />

      {/* Progress Bar */}
      <div className='space-y-2'>
        <div
          className='relative h-2.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/10'
          onClick={handleProgressClick}
        >
          <div
            className='absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-300 ease-out'
            style={{ width: `${progressPercentage}%` }}
          >
            {isPlaying && (
              <div className='absolute right-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse' />
            )}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <span className={`text-xs font-medium tabular-nums transition-colors ${isPlaying ? 'text-primary' : 'text-light-gray'}`}>
            {formatTime(currentTime)}
          </span>
          <span className='text-light-gray text-xs tabular-nums'>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Main Controls */}
      <div className='flex items-center gap-3'>
        <Button
          variant='glass-icon'
          onClick={togglePlay}
          aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
          className={`relative ${isPlaying ? 'bg-primary/20 border-primary/50 border-2' : ''}`}
        >
          {isPlaying ? (
            <Pause className='h-5 w-5 text-primary' />
          ) : (
            <Play className='h-5 w-5' />
          )}
        </Button>

        {/* Audio Visualization */}
        {isPlaying && (
          <div className='flex items-end gap-1 h-8'>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className='w-1 rounded-full bg-primary/60 animate-[wave_1s_ease-in-out_infinite]'
                style={{
                  height: `${20 + i * 8}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        <Button
          variant='glass-icon'
          onClick={handleDownload}
          aria-label='Скачать аудиофайл'
        >
          <Download className='h-5 w-5' />
        </Button>

        <div className='flex-1' />

        {/* Volume Control */}
        <div className='flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2'>
          <Volume2 className={`h-4 w-4 shrink-0 transition-colors ${volume > 0 ? 'text-primary' : 'text-light-gray'}`} />
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={volume}
            onChange={handleVolumeChange}
            className='h-1.5 w-24 cursor-pointer appearance-none rounded-lg bg-white/20 accent-primary'
          />
        </div>
      </div>
    </div>
  )
}
