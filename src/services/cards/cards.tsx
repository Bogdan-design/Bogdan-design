import { baseApi } from '../../app/base.api'
import { PaginatedEntity } from '../../app/types'
import { Card } from '../../services/cards/cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<PaginatedEntity<Card>, { id: string }>({
        query: ({ id, ...params }) => ({
          url: `/v1/decks/${id}/cards`,
          params: params ? undefined : params,
        }),
        providesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<any, any>({
        query: id => ({
          url: `/v1/cards/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useGetCardsQuery, useDeleteCardMutation } = cardsService
