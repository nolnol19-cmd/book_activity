import { motion } from 'framer-motion'
import { useMemo } from 'react'

const COLORS = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3']

interface Particle {
  id: number
  x: number
  color: string
  size: number
  rotation: number
  duration: number
  delay: number
}

export function ConfettiBlast() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 6,
      rotation: Math.random() * 360,
      duration: Math.random() * 1.5 + 1,
      delay: Math.random() * 0.5,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: p.rotation }}
          animate={{
            y: '110vh',
            opacity: [1, 1, 0],
            rotate: p.rotation + 360 * (Math.random() > 0.5 ? 2 : -2),
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}
