import type { ReaderContent } from '@/shared/types/reader.types'
import { buildNavigationFromConfig, partsConfig } from './index'
import { loadContent } from './loader'

/**
 * Контент с главами (markdown загружается при сборке/SSR).
 * Импортировать только из Server Components — loader использует fs.
 */
const loadedContent = loadContent(partsConfig)
const navigation = buildNavigationFromConfig(partsConfig)

export const content: ReaderContent = {
  ...loadedContent,
  navigation,
}
