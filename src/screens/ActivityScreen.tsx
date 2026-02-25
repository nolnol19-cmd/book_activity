import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Sticker } from '../types'
import { SentenceDisplay } from '../components/activity/SentenceDisplay'
import { AnswerChoices } from '../components/activity/AnswerChoices'
import { ConfettiBlast } from '../components/reward/ConfettiBlast'
import { StickerReveal } from '../components/reward/StickerReveal'
import { useQuizSession } from '../hooks/useQuizSession'
import { useSoundFeedback } from '../hooks/useSoundFeedback'

type Feedback = {
  isCorrect: boolean
  isNewSticker: boolean
  sticker: Sticker | null
  correctAnswer: string
} | null

export function ActivityScreen() {
  const { book, currentQuestion, currentIndex, totalQuestions, processAnswer, goToNextQuestion } = useQuizSession()
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [choices, setChoices] = useState<string[]>([])
  const [showExample, setShowExample] = useState(false)
  const { playCorrect, playWrong, playStickerReveal } = useSoundFeedback()
  const navigate = useNavigate()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  useEffect(() => {
    if (!book || !currentQuestion) navigate('/')
  }, [book, currentQuestion, navigate])

  useEffect(() => {
    setFeedback(null)
    setShowExample(false)
  }, [currentIndex])

  useEffect(() => {
    if (!book || !currentQuestion) return
    if (currentQuestion.choices?.length) {
      setChoices([...currentQuestion.choices].sort(() => Math.random() - 0.5))
      return
    }
    const pool = (book.distractorPool ?? book.questions.map(q => q.blankWord))
      .filter(w => w !== currentQuestion.blankWord)
    const distractors = [...pool].sort(() => Math.random() - 0.5).slice(0, 3)
    setChoices([...distractors, currentQuestion.blankWord].sort(() => Math.random() - 0.5))
  }, [currentQuestion, book])

  if (!book || !currentQuestion) return null

  const handleAnswer = (choice: string) => {
    if (feedback) return

    const result = processAnswer(choice)
    const completed = currentQuestion.sentence.replace('_____', choice)
    const utterance = new SpeechSynthesisUtterance(completed)
    utterance.lang = 'ko-KR'

    const showFeedback = () => {
      if (result.isCorrect) {
        playCorrect()
        setTimeout(() => playStickerReveal(), 600)
      } else {
        playWrong()
      }
      setFeedback({ ...result, correctAnswer: currentQuestion.blankWord })
      timerRef.current = setTimeout(() => goToNextQuestion(), 2000)
    }

    utterance.onend = showFeedback
    utterance.onerror = showFeedback
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex flex-col w-full max-w-md min-h-screen">
      {feedback?.isCorrect && <ConfettiBlast />}

      {feedback && (
        <motion.div
          key={feedback.isCorrect ? 'correct-flash' : 'wrong-flash'}
          className={`fixed inset-0 pointer-events-none z-40 ${
            feedback.isCorrect ? 'bg-green-400/30' : 'bg-red-400/30'
          }`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Book Hero Panel */}
      <div
        className={`bg-gradient-to-br ${book.color.primary} flex flex-col items-center justify-center gap-3 px-6 py-8`}
        style={{ height: '42vh' }}
      >
        <motion.div
          className="text-7xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {book.coverEmoji}
        </motion.div>
        <h1 className="text-3xl font-extrabold text-white">{book.title}</h1>
        <p className="text-sm text-white/70 text-center">{book.description}</p>
      </div>

      {/* Quiz / Feedback Panel */}
      <div className="flex-1 bg-white flex flex-col gap-5 px-5 py-6">
        {!feedback ? (
          <>
            {currentQuestion.example && (
              <div>
                <button
                  onClick={() => setShowExample(v => !v)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border-2 border-dashed transition-colors ${
                    showExample ? 'border-transparent bg-gray-50' : `border-gray-300 bg-white ${book.color.text}`
                  }`}
                >
                  {!showExample && (
                    <span className="text-sm font-bold">📖 책 속 문장 보기</span>
                  )}
                  {showExample && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-sm text-gray-500 font-bold mb-1">📖 책 속 문장</p>
                      <p className="text-sm text-gray-700 leading-relaxed break-keep">
                        {currentQuestion.example.split(currentQuestion.blankWord).map((part, i, arr) => (
                          i < arr.length - 1 ? (
                            <span key={i}>
                              {part}
                              <span className={`font-extrabold ${book.color.text}`}>{currentQuestion.blankWord}</span>
                            </span>
                          ) : part
                        ))}
                      </p>
                    </motion.div>
                  )}
                </button>
              </div>
            )}
            <SentenceDisplay sentence={currentQuestion.sentence} accentColor={book.color.accent} />
            <AnswerChoices choices={choices} onSelect={handleAnswer} />
            <div className="flex justify-center gap-2 pt-2">
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === currentIndex ? book.color.accent : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <motion.div
              className={`rounded-3xl p-6 text-center ${
                feedback.isCorrect
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                  : 'bg-gradient-to-br from-rose-400 to-red-500'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                feedback.isCorrect
                  ? { scale: 1, opacity: 1 }
                  : { scale: 1, opacity: 1, x: [0, -12, 12, -8, 8, -4, 4, 0] }
              }
              transition={{ duration: 0.4 }}
            >
              <div className="text-5xl mb-2">{feedback.isCorrect ? '🎉' : '😢'}</div>
              <h2 className="text-white text-2xl font-extrabold">
                {feedback.isCorrect ? '정답이에요!' : '아쉬워요!'}
              </h2>
              {!feedback.isCorrect && (
                <p className="text-white/80 text-sm mt-1">
                  정답은 <strong className="text-white">{feedback.correctAnswer}</strong> 이에요
                </p>
              )}
            </motion.div>

            {feedback.isCorrect && feedback.sticker && (
              <div className="flex justify-center">
                <StickerReveal sticker={feedback.sticker} isNew={feedback.isNewSticker} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
