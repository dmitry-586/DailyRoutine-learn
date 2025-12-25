import { Suspense } from 'react'

import { content } from '@/data'
import { ReadingCarousel } from '@/features/reader'

export default function TheoryPage() {
  return (
    <Suspense fallback={null}>
      <ReadingCarousel content={content} />
    </Suspense>
  )
}
