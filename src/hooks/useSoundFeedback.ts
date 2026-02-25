import { useCallback, useRef } from 'react'

export function useSoundFeedback() {
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    return ctxRef.current
  }, [])

  const playCorrect = useCallback(() => {
    try {
      const ctx = getCtx()
      const now = ctx.currentTime

      // Happy ascending tones
      const notes = [523.25, 659.25, 783.99, 1046.5] // C5 E5 G5 C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + i * 0.12)
        gain.gain.setValueAtTime(0.3, now + i * 0.12)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3)
        osc.start(now + i * 0.12)
        osc.stop(now + i * 0.12 + 0.35)
      })
    } catch {
      // ignore audio errors
    }
  }, [getCtx])

  const playWrong = useCallback(() => {
    try {
      const ctx = getCtx()
      const now = ctx.currentTime

      // Descending bwoop
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(300, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.4)
      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)
      osc.start(now)
      osc.stop(now + 0.5)
    } catch {
      // ignore audio errors
    }
  }, [getCtx])

  const playStickerReveal = useCallback(() => {
    try {
      const ctx = getCtx()
      const now = ctx.currentTime

      // Sparkle sound
      const sparkleFreqs = [800, 1200, 1600, 2000]
      sparkleFreqs.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + i * 0.08)
        gain.gain.setValueAtTime(0.2, now + i * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25)
        osc.start(now + i * 0.08)
        osc.stop(now + i * 0.08 + 0.3)
      })
    } catch {
      // ignore
    }
  }, [getCtx])

  return { playCorrect, playWrong, playStickerReveal }
}
