import { Suspense } from 'react'

import { MainMenu } from '@/features/menu'

export default function Home() {
  return (
    <Suspense fallback={null}>
      <MainMenu />
    </Suspense>
  )
}
