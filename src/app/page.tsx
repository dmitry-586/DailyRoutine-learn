import { content } from '@/data/content'
import { ReadingCarousel } from '@/features/reader'

export default function Home() {
  return <ReadingCarousel content={content} />
}
