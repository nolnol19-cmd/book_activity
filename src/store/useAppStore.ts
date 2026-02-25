import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StickerCollection } from '../types'

interface QuizSession {
  bookId: string | null
  currentQuestionIndex: number
  answers: Record<string, string>   // questionId -> chosen answer
  isComplete: boolean
}

interface AppState {
  // Persisted: sticker collection
  collection: StickerCollection

  // Session: quiz progress (not persisted)
  session: QuizSession

  // Actions
  unlockSticker: (stickerId: string) => void
  hasSticker: (stickerId: string) => boolean
  startSession: (bookId: string) => void
  recordAnswer: (questionId: string, answer: string) => void
  nextQuestion: (totalQuestions: number) => void
  resetSession: () => void
  getCorrectCount: () => number
}

const defaultSession: QuizSession = {
  bookId: null,
  currentQuestionIndex: 0,
  answers: {},
  isComplete: false,
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      collection: {},
      session: defaultSession,

      unlockSticker: (stickerId) =>
        set((state) => ({
          collection: { ...state.collection, [stickerId]: true },
        })),

      hasSticker: (stickerId) => !!get().collection[stickerId],

      startSession: (bookId) =>
        set({
          session: {
            bookId,
            currentQuestionIndex: 0,
            answers: {},
            isComplete: false,
          },
        }),

      recordAnswer: (questionId, answer) =>
        set((state) => ({
          session: {
            ...state.session,
            answers: { ...state.session.answers, [questionId]: answer },
          },
        })),

      nextQuestion: (totalQuestions) =>
        set((state) => {
          const next = state.session.currentQuestionIndex + 1
          return {
            session: {
              ...state.session,
              currentQuestionIndex: next,
              isComplete: next >= totalQuestions,
            },
          }
        }),

      resetSession: () => set({ session: defaultSession }),

      getCorrectCount: () => {
        // Calculated at reward screen by cross-referencing with book data
        return 0
      },
    }),
    {
      name: 'korean-reading-app',
      partialize: (state) => ({ collection: state.collection }),
    }
  )
)
