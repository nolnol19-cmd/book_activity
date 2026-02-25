import { motion } from 'framer-motion'

interface Props {
  correct: number
  total: number
  bookTitle: string
}

export function ScoreSummary({ correct, total, bookTitle }: Props) {
  const pct = Math.round((correct / total) * 100)
  const stars = correct >= total ? 3 : correct >= Math.ceil(total / 2) ? 2 : 1

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-lg p-6 text-center w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <p className="text-gray-500 text-sm font-bold mb-1">📚 {bookTitle}</p>
      <div className="flex justify-center gap-1 text-4xl mb-3">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 300 }}
          >
            {i < stars ? '⭐' : '☆'}
          </motion.span>
        ))}
      </div>
      <p className="text-3xl font-extrabold text-gray-800">
        {correct} / {total}
      </p>
      <p className="text-gray-500 text-sm mt-1">정답률 {pct}%</p>
    </motion.div>
  )
}
