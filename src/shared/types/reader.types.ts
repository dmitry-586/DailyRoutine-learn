export interface ChapterMeta {
  id: string
  title: string
  file: string
  partId: string
}

export interface Part {
  id: string
  title: string
  folder: string
  chapters: ChapterMeta[]
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
