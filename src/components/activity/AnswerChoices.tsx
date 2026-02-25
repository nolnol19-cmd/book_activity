import { motion } from 'framer-motion'
import { AnswerChoice } from './AnswerChoice'

interface Props {
  choices: string[]
  onSelect: (choice: string) => void
  disabled?: boolean
}

export function AnswerChoices({ choices, onSelect, disabled }: Props) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      {choices.map((choice, i) => (
        <AnswerChoice
          key={choice}
          choice={choice}
          index={i}
          onSelect={onSelect}
          disabled={disabled}
        />
      ))}
    </motion.div>
  )
}
