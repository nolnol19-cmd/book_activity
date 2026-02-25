import { motion } from 'framer-motion'

interface Props {
  choice: string
  index: number
  onSelect: (choice: string) => void
  disabled?: boolean
}

const bgColors = [
  'bg-rose-100 border-rose-300 text-rose-700 hover:bg-rose-200',
  'bg-violet-100 border-violet-300 text-violet-700 hover:bg-violet-200',
  'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200',
  'bg-teal-100 border-teal-300 text-teal-700 hover:bg-teal-200',
]

export function AnswerChoice({ choice, index, onSelect, disabled }: Props) {
  const colorClass = bgColors[index % bgColors.length]

  return (
    <motion.button
      className={`w-full rounded-2xl border-2 p-4 text-xl font-extrabold touch-min flex items-center justify-center
        transition-colors select-none cursor-pointer
        ${colorClass}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      whileTap={disabled ? {} : { scale: 0.92 }}
      whileHover={disabled ? {} : { scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={() => !disabled && onSelect(choice)}
      disabled={disabled}
    >
      {choice}
    </motion.button>
  )
}
