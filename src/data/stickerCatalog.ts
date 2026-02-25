import type { Sticker } from '../types'

export const STICKERS: Sticker[] = [
  // 구름 친구들
  { id: 'cloud-s1', bookId: 'cloud-friends', emoji: '☁️', label: '뭉게구름', unlockQuestionId: 'cloud-q1' },
  { id: 'cloud-s2', bookId: 'cloud-friends', emoji: '🌧️', label: '비구름', unlockQuestionId: 'cloud-q2' },
  { id: 'cloud-s3', bookId: 'cloud-friends', emoji: '🌫️', label: '안개구름', unlockQuestionId: 'cloud-q3' },
  { id: 'cloud-s4', bookId: 'cloud-friends', emoji: '🌤️', label: '맑은 하늘', unlockQuestionId: 'cloud-q4' },
  // 곰돌이의 꿀 찾기
  { id: 'bear-s1', bookId: 'bear-honey', emoji: '🍯', label: '꿀단지', unlockQuestionId: 'bear-q1' },
  { id: 'bear-s2', bookId: 'bear-honey', emoji: '🐝', label: '꿀벌', unlockQuestionId: 'bear-q2' },
  { id: 'bear-s3', bookId: 'bear-honey', emoji: '🐻', label: '곰돌이', unlockQuestionId: 'bear-q3' },
  { id: 'bear-s4', bookId: 'bear-honey', emoji: '🌻', label: '해바라기', unlockQuestionId: 'bear-q4' },
  // 봄날의 동물 친구들
  { id: 'spring-s1', bookId: 'spring-animals', emoji: '🐰', label: '아기토끼', unlockQuestionId: 'spring-q1' },
  { id: 'spring-s2', bookId: 'spring-animals', emoji: '🐥', label: '아기병아리', unlockQuestionId: 'spring-q2' },
  { id: 'spring-s3', bookId: 'spring-animals', emoji: '🦋', label: '나비', unlockQuestionId: 'spring-q3' },
  { id: 'spring-s4', bookId: 'spring-animals', emoji: '🌸', label: '봄꽃', unlockQuestionId: 'spring-q4' },
  // 학교 가는 길
  { id: 'school-s1', bookId: 'school-way', emoji: '🏫', label: '학교', unlockQuestionId: 'school-q4' },
]

export function getStickerByQuestionId(questionId: string): Sticker | undefined {
  return STICKERS.find((s) => s.unlockQuestionId === questionId)
}

export function getStickersByBookId(bookId: string): Sticker[] {
  return STICKERS.filter((s) => s.bookId === bookId)
}
