import { PaginatedEntity, Pagination } from '../types.ts'

export type GetDecksArg = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: Author['id']
  orderBy?: string
  currentPage?: Pagination['currentPage']
  itemsPerPage?: Pagination['itemsPerPage']
}

export type CreateDeckArgs = {
  name: string
}

export interface Author {
  id: string
  name: string
}

export interface Deck {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  isDeleted: boolean | null
  isBlocked: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type DeleteType = Pick<Deck, 'id'>

export type DecksResponse = PaginatedEntity<Deck> & {
  maxCardsCount: number
}
