import { motion } from 'framer-motion'
import type { Sticker } from '../../types'

interface Props {
  sticker: Sticker
  unlocked: boolean
}

export function StickerSlot({ sticker, unlocked }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      {unlocked ? (
        <motion.div
          className="w-16 h-16 flex items-center justify-center text-4xl filter drop-shadow-md"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
        >
          {sticker.emoji}
        </motion.div>
      ) : (
        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-2xl text-2xl text-gray-400">
          ?
        </div>
      )}
      <span className={`text-xs font-bold text-center ${unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
        {unlocked ? sticker.label : '???'}
      </span>
    </div>
  )
}
