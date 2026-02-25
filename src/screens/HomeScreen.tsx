import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/common/PageContainer'
import { BookGrid } from '../components/home/BookGrid'
import { useQuizSession } from '../hooks/useQuizSession'
import { BOOKS } from '../data/books'
import { useAppStore } from '../store/useAppStore'
import { STICKERS } from '../data/stickerCatalog'

export function HomeScreen() {
  const { beginBook } = useQuizSession()
  const navigate = useNavigate()
  const collection = useAppStore((s) => s.collection)
  const totalStickers = STICKERS.length
  const unlockedStickers = Object.values(collection).filter(Boolean).length

  return (
    <PageContainer>
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          className="text-5xl mb-2"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          📖
        </motion.div>
        <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">
          독후활동
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          책을 읽고 스티커를 모아요!
        </p>
      </div>

      {/* Collection summary */}
      <motion.div
        className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-4 mb-6 flex items-center justify-between"
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/collection')}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">⭐</span>
          <div>
            <p className="font-extrabold text-gray-800">내 스티커 컬렉션</p>
            <p className="text-sm text-gray-500">{unlockedStickers} / {totalStickers} 수집 완료</p>
          </div>
        </div>
        <span className="text-gray-400 text-xl">›</span>
      </motion.div>

      {/* Books */}
      <h2 className="text-lg font-extrabold text-gray-700 mb-3">📚 책 고르기</h2>
      <BookGrid books={BOOKS} onSelect={beginBook} />
    </PageContainer>
  )
}
