export interface Chapter {
  id: string
  title: string
  content: string
}

export interface Part {
  id: string
  title: string
  chapters: Chapter[]
}

export interface ReaderContent {
  title: string
  parts: Part[]
}

// Устаревшие типы для обратной совместимости (можно удалить позже)
export interface Page {
  id: string
  title?: string
  content: string
}
