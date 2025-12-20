import { File, FileType, Globe } from 'lucide-react'

import type { ExportFormat } from '../utils/exportChapter'

export interface ExportFormatConfig {
  format: ExportFormat
  label: string
  icon: typeof Globe
}

export const EXPORT_FORMATS: ExportFormatConfig[] = [
  { format: 'html', label: 'HTML', icon: Globe },
  { format: 'markdown', label: 'Markdown', icon: FileType },
  { format: 'txt', label: 'Текст', icon: File },
]
