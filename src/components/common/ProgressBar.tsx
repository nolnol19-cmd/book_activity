import { motion } from 'framer-motion'

interface Props {
  current: number   // 0-based index
  total: number
  bookColor: string
}

export function ProgressBar({ current, total, bookColor }: Props) {
  const pct = total > 0 ? ((current) / total) * 100 : 0

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-500 mb-1 font-nanum">
        <span>{current} / {total} 문제</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${bookColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
