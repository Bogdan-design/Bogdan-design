import { baseApi } from '../../services/base.api'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<any, void>({
        query: () => `v1/decks`,
      }),
    }
  },
})

export const { useGetDecksQuery, useLazyGetDecksQuery } = decksApi

export interface Pagination {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export interface Author {
  id: string
  name: string
}

export interface Items {
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

export interface DecksResponse {
  maxCardsCount: number
  pagination: Pagination
  items: Items[]
}
