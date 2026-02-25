export interface BookColor {
  primary: string
  secondary: string
  accent: string
  text: string
}

export interface Question {
  id: string
  sentence: string   // 빈칸은 "_____" 로 표시
  blankWord: string
  choices?: string[]
  hint?: string
  example?: string   // 책 속 예시 문장
}

export interface Sticker {
  id: string
  bookId: string
  emoji: string
  label: string
  unlockQuestionId: string
}

export interface Book {
  id: string
  title: string
  coverEmoji: string
  color: BookColor
  description: string
  questions: Question[]
  distractorPool?: string[]
}

export interface StickerCollection {
  [stickerId: string]: boolean
}

export type AnswerResult = 'correct' | 'wrong' | null
