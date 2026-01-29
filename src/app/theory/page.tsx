import { Suspense } from 'react'

import { content } from '@/data-v2/content-server'
import { ReadingCarousel } from '@/features/reader'

export default function TheoryPage() {
  return (
    <Suspense fallback={null}>
      <ReadingCarousel content={content} />
    </Suspense>
  )
}
