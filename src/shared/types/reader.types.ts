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

export interface NavigationChapter {
  id: string
  title: string
  globalIndex: number
}

export interface NavigationPart {
  id: string
  title: string
  partStartIndex: number
  chapters: NavigationChapter[]
}

export interface ReaderContent {
  title: string
  parts: Part[]
  navigation: NavigationPart[]
}
