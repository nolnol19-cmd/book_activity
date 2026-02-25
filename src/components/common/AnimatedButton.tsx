import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  children: ReactNode
  className?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function AnimatedButton({ onClick, children, className = '', disabled, variant = 'primary' }: Props) {
  const base = 'rounded-2xl font-nanum font-extrabold text-lg px-6 py-4 touch-min flex items-center justify-center gap-2 select-none cursor-pointer'
  const variants: Record<string, string> = {
    primary: 'bg-white text-gray-800 shadow-lg border-2 border-gray-200',
    secondary: 'bg-gray-100 text-gray-600 shadow border border-gray-200',
    ghost: 'text-gray-500 underline',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileTap={disabled ? {} : { scale: 0.93 }}
      whileHover={disabled ? {} : { scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.button>
  )
}
