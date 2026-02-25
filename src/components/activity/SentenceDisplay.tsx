import { motion } from 'framer-motion'

interface Props {
  sentence: string
  accentColor: string
}

export function SentenceDisplay({ sentence, accentColor }: Props) {
  const parts = sentence.split('_____')

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 text-center">
      <p className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-relaxed break-keep">
        {parts[0]}
        <motion.span
          className={`inline-block mx-1 px-3 py-1 rounded-xl text-white ${accentColor} min-w-[80px]`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          ?
        </motion.span>
        {parts[1]}
      </p>
    </div>
  )
}
