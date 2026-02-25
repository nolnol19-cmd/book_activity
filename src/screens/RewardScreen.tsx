import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageContainer } from '../components/common/PageContainer'
import { AnimatedButton } from '../components/common/AnimatedButton'
import { ConfettiBlast } from '../components/reward/ConfettiBlast'
import { StickerReveal } from '../components/reward/StickerReveal'
import { useQuizSession } from '../hooks/useQuizSession'
import { useSoundFeedback } from '../hooks/useSoundFeedback'
import { getStickerByQuestionId } from '../data/stickerCatalog'

interface LocationState {
  answer: string
  isCorrect: boolean
  questionId: string
  isNewSticker: boolean
}

export function RewardScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null
  const { book, goToNextQuestion, goHome, currentIndex, totalQuestions } = useQuizSession()
  const { playCorrect, playWrong, playStickerReveal } = useSoundFeedback()
  const soundPlayed = useRef(false)

  const isCorrect = state?.isCorrect ?? false
  const questionId = state?.questionId ?? ''
  const isNewSticker = state?.isNewSticker ?? false
  const sticker = questionId ? getStickerByQuestionId(questionId) : null

  useEffect(() => {
    if (soundPlayed.current) return
    soundPlayed.current = true

    if (isCorrect) {
      playCorrect()
      setTimeout(() => playStickerReveal(), 600)
    } else {
      playWrong()
    }
  }, [isCorrect, playCorrect, playWrong, playStickerReveal])

  useEffect(() => {
    if (!book || !state) navigate('/')
  }, [book, state, navigate])

  if (!book || !state) return null

  const isLastQuestion = currentIndex >= totalQuestions - 1

  return (
    <>
      {isCorrect && <ConfettiBlast />}

      {/* Flash overlay */}
      {isCorrect && (
        <motion.div
          className="fixed inset-0 bg-green-400/30 pointer-events-none z-40"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <PageContainer>
        {/* Result header */}
        <motion.div
          className={`rounded-3xl p-6 text-center mb-6 ${
            isCorrect
              ? 'bg-gradient-to-br from-green-400 to-emerald-500'
              : 'bg-gradient-to-br from-rose-400 to-red-500'
          }`}
          animate={isCorrect ? {} : {
            x: [0, -12, 12, -8, 8, -4, 4, 0],
            transition: { duration: 0.5 },
          }}
        >
          <motion.div
            className="text-6xl mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            {isCorrect ? '🎉' : '😢'}
          </motion.div>
          <h2 className="text-white text-2xl font-extrabold">
            {isCorrect ? '정답이에요!' : '아쉬워요!'}
          </h2>
          {!isCorrect && state.answer && (
            <p className="text-white/80 text-sm mt-1">
              정답은 <strong className="text-white">{
                // Find the correct answer from context
                book.questions.find(q => q.id === questionId)?.blankWord ?? ''
              }</strong> 이에요
            </p>
          )}
        </motion.div>

        {/* Sticker reveal (correct only) */}
        {isCorrect && sticker && (
          <div className="flex justify-center mb-6">
            <StickerReveal sticker={sticker} isNew={isNewSticker} />
          </div>
        )}

        {/* Progress info */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm font-bold">
            {isLastQuestion
              ? `🏁 ${book.title} 완료!`
              : `${currentIndex} / ${totalQuestions} 문제 완료`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-auto">
          {isLastQuestion ? (
            <>
              <AnimatedButton
                onClick={() => navigate('/collection')}
                className="bg-amber-400 text-white border-amber-300 text-xl"
              >
                ⭐ 스티커 컬렉션 보기
              </AnimatedButton>
              <AnimatedButton variant="secondary" onClick={goHome}>
                🏠 홈으로
              </AnimatedButton>
            </>
          ) : (
            <>
              <AnimatedButton
                onClick={goToNextQuestion}
                className={`${
                  isCorrect ? 'bg-green-400 text-white border-green-300' : 'bg-violet-400 text-white border-violet-300'
                } text-xl`}
              >
                다음 문제 →
              </AnimatedButton>
              <AnimatedButton variant="secondary" onClick={goHome}>
                🏠 홈으로
              </AnimatedButton>
            </>
          )}
        </div>
      </PageContainer>
    </>
  )
}
