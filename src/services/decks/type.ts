import { PaginatedEntity, Pagination } from 'app/types'

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
  cover: File
  isPrivate: boolean
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
export type ServerError = {
  statusCode: number
  message: string
  timestamp: string
  path: string
}

export type DeleteDeckMutationResult = {
  data: void
}

export type DecksResponse = PaginatedEntity<Deck> & {
  maxCardsCount: number
}
