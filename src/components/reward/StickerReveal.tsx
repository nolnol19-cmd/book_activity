import { motion } from 'framer-motion'
import type { Sticker } from '../../types'

interface Props {
  sticker: Sticker
  isNew: boolean
}

export function StickerReveal({ sticker, isNew }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className="text-8xl filter drop-shadow-lg"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 12,
          delay: 0.2,
        }}
      >
        {sticker.emoji}
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <span className="text-xl font-extrabold text-gray-800">{sticker.label}</span>
        {isNew ? (
          <span className="bg-amber-400 text-white text-sm font-bold px-3 py-1 rounded-full">
            ✨ 새 스티커 획득!
          </span>
        ) : (
          <span className="bg-gray-200 text-gray-500 text-sm font-bold px-3 py-1 rounded-full">
            이미 갖고 있어요
          </span>
        )}
      </motion.div>
    </div>
  )
}
