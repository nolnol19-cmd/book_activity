import type { Book } from '../../types'
import { getStickersByBookId } from '../../data/stickerCatalog'
import { useAppStore } from '../../store/useAppStore'
import { StickerSlot } from './StickerSlot'

interface Props {
  book: Book
}

export function StickerGrid({ book }: Props) {
  const collection = useAppStore((s) => s.collection)
  const stickers = getStickersByBookId(book.id)
  const unlockedCount = stickers.filter((s) => collection[s.id]).length

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      <div className={`bg-gradient-to-r ${book.color.primary} p-4 flex items-center gap-3`}>
        <span className="text-3xl">{book.coverEmoji}</span>
        <div>
          <h3 className="text-white font-extrabold text-lg">{book.title}</h3>
          <p className="text-white/80 text-xs">{unlockedCount}/{stickers.length} 스티커 수집</p>
        </div>
      </div>
      <div className="p-4 grid grid-cols-4 gap-4">
        {stickers.map((sticker) => (
          <StickerSlot
            key={sticker.id}
            sticker={sticker}
            unlocked={!!collection[sticker.id]}
          />
        ))}
      </div>
    </div>
  )
}
