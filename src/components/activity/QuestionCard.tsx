import type { Question, Book } from '../../types'
import { SentenceDisplay } from './SentenceDisplay'
import { AnswerChoices } from './AnswerChoices'

interface Props {
  question: Question
  book: Book
  onAnswer: (choice: string) => void
  disabled?: boolean
}

export function QuestionCard({ question, book, onAnswer, disabled }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {question.hint && (
        <div className={`${book.color.secondary} rounded-2xl px-4 py-3 flex items-center gap-2`}>
          <span className="text-xl">💡</span>
          <p className={`text-sm font-bold ${book.color.text}`}>{question.hint}</p>
        </div>
      )}

      <SentenceDisplay
        sentence={question.sentence}
        accentColor={book.color.accent}
      />

      <AnswerChoices
        choices={question.choices ?? []}
        onSelect={onAnswer}
        disabled={disabled}
      />
    </div>
  )
}
