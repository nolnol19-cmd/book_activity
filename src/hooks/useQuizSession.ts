import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { getBookById } from '../data/books'
import { getStickerByQuestionId } from '../data/stickerCatalog'
import type { Sticker } from '../types'

export function useQuizSession() {
  const navigate = useNavigate()
  const store = useAppStore()
  const { session, startSession, recordAnswer, nextQuestion, resetSession, unlockSticker } = store

  const book = session.bookId ? getBookById(session.bookId) : null
  const currentQuestion = book?.questions[session.currentQuestionIndex] ?? null

  const beginBook = useCallback(
    (bookId: string) => {
      startSession(bookId)
      navigate('/activity')
    },
    [startSession, navigate]
  )

  const processAnswer = useCallback(
    (answer: string): { isCorrect: boolean; isNewSticker: boolean; sticker: Sticker | null } => {
      if (!currentQuestion) return { isCorrect: false, isNewSticker: false, sticker: null }

      const isCorrect = answer === currentQuestion.blankWord
      recordAnswer(currentQuestion.id, answer)

      let isNewSticker = false
      const sticker = getStickerByQuestionId(currentQuestion.id) ?? null
      if (isCorrect && sticker) {
        isNewSticker = !store.collection[sticker.id]
        unlockSticker(sticker.id)
      }

      return { isCorrect, isNewSticker, sticker: isCorrect ? sticker : null }
    },
    [currentQuestion, recordAnswer, unlockSticker, store.collection]
  )

  const submitAnswer = useCallback(
    (answer: string) => {
      if (!currentQuestion) return

      const isCorrect = answer === currentQuestion.blankWord
      recordAnswer(currentQuestion.id, answer)

      // Check if sticker is new before unlocking
      let isNewSticker = false
      if (isCorrect) {
        const sticker = getStickerByQuestionId(currentQuestion.id)
        if (sticker) {
          isNewSticker = !store.collection[sticker.id]
          unlockSticker(sticker.id)
        }
      }

      navigate('/reward', { state: { answer, isCorrect, questionId: currentQuestion.id, isNewSticker } })
    },
    [currentQuestion, recordAnswer, unlockSticker, store.collection, navigate]
  )

  const goToNextQuestion = useCallback(() => {
    if (!book) return
    nextQuestion(book.questions.length)
    if (session.currentQuestionIndex + 1 >= book.questions.length) {
      navigate('/collection')
    } else {
      navigate('/activity')
    }
  }, [book, nextQuestion, session.currentQuestionIndex, navigate])

  const restartBook = useCallback(() => {
    if (session.bookId) {
      startSession(session.bookId)
      navigate('/activity')
    } else {
      navigate('/')
    }
  }, [session.bookId, startSession, navigate])

  const goHome = useCallback(() => {
    resetSession()
    navigate('/')
  }, [resetSession, navigate])

  const totalQuestions = book?.questions.length ?? 0
  const currentIndex = session.currentQuestionIndex
  const progress = totalQuestions > 0 ? (currentIndex / totalQuestions) * 100 : 0

  return {
    book,
    session,
    currentQuestion,
    currentIndex,
    totalQuestions,
    progress,
    beginBook,
    processAnswer,
    submitAnswer,
    goToNextQuestion,
    restartBook,
    goHome,
  }
}
