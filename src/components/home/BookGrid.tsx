import type { Book } from '../../types'
import { BookCard } from './BookCard'

interface Props {
  books: Book[]
  onSelect: (bookId: string) => void
}

export function BookGrid({ books, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onSelect={onSelect} />
      ))}
    </div>
  )
}
