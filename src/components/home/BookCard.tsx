import { motion } from 'framer-motion'
import type { Book } from '../../types'
import { getStickersByBookId } from '../../data/stickerCatalog'
import { useAppStore } from '../../store/useAppStore'

interface Props {
  book: Book
  onSelect: (bookId: string) => void
}

export function BookCard({ book, onSelect }: Props) {
  const collection = useAppStore((s) => s.collection)
  const stickers = getStickersByBookId(book.id)
  const unlockedCount = stickers.filter((s) => collection[s.id]).length

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden shadow-lg cursor-pointer select-none bg-gradient-to-br ${book.color.primary}`}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      onClick={() => onSelect(book.id)}
    >
      <div className="p-6 flex flex-col items-center gap-3 min-h-[180px] justify-between">
        {/* Cover emoji */}
        <motion.div
          className="text-7xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {book.coverEmoji}
        </motion.div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-white text-xl font-extrabold drop-shadow-sm leading-tight">
            {book.title}
          </h2>
          <p className="text-white/80 text-sm mt-1">{book.description}</p>
        </div>

        {/* Sticker progress */}
        <div className="flex items-center gap-1 bg-white/30 rounded-full px-3 py-1">
          <span className="text-white text-xs font-bold">
            스티커 {unlockedCount}/{stickers.length}
          </span>
          <span className="text-sm">⭐</span>
        </div>
      </div>
    </motion.div>
  )
}
