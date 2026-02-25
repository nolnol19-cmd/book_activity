import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/common/PageContainer'
import { AnimatedButton } from '../components/common/AnimatedButton'
import { StickerGrid } from '../components/collection/StickerGrid'
import { BOOKS } from '../data/books'
import { STICKERS } from '../data/stickerCatalog'
import { useAppStore } from '../store/useAppStore'

export function CollectionScreen() {
  const navigate = useNavigate()
  const collection = useAppStore((s) => s.collection)
  const unlockedCount = Object.values(collection).filter(Boolean).length
  const totalCount = STICKERS.length
  const allUnlocked = unlockedCount === totalCount

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <AnimatedButton variant="ghost" onClick={() => navigate('/')} className="text-sm px-2 py-2">
          ← 홈
        </AnimatedButton>
        <h1 className="text-xl font-extrabold text-gray-800">스티커 컬렉션</h1>
        <div className="w-16" />
      </div>

      {/* Summary banner */}
      <motion.div
        className={`rounded-3xl p-5 text-center mb-6 ${
          allUnlocked
            ? 'bg-gradient-to-br from-amber-300 to-yellow-400'
            : 'bg-gradient-to-br from-sky-300 to-blue-400'
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="text-5xl mb-1"
          animate={allUnlocked ? { rotate: [0, 20, -20, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        >
          {allUnlocked ? '🏆' : '⭐'}
        </motion.div>
        <p className="text-white text-xl font-extrabold">
          {unlockedCount} / {totalCount} 수집
        </p>
        <p className="text-white/80 text-sm mt-1">
          {allUnlocked ? '모든 스티커를 모았어요!' : '책을 읽고 더 모아봐요!'}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
          {STICKERS.map((s) => (
            <div
              key={s.id}
              className={`w-3 h-3 rounded-full transition-colors ${
                collection[s.id] ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Sticker grids per book */}
      <div className="flex flex-col gap-4">
        {BOOKS.map((book) => (
          <StickerGrid key={book.id} book={book} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6">
        <AnimatedButton
          onClick={() => navigate('/')}
          className="w-full bg-violet-400 text-white border-violet-300 text-lg"
        >
          📚 책 읽으러 가기
        </AnimatedButton>
      </div>
    </PageContainer>
  )
}
