import { Suspense } from 'react'

import { content } from '@/data/content'
import { ReadingCarousel } from '@/features/reader'

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ReadingCarousel content={content} />
    </Suspense>
  )
}
