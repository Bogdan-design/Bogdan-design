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
      getCard: builder.query<Card, string>({
        query: cardId => `/v1/cards/${cardId}`,
      }),
      deleteCard: builder.mutation<void, string>({
        query: id => ({
          url: `/v1/cards/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<
        void,
        {
          cardId: string
          question: string
          answer: string
        }
      >({
        query: ({ cardId, ...body }) => ({
          url: `/v1/cards/${cardId}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Cards'],
      }),
      createCard: builder.mutation<
        void,
        {
          id: string | undefined
          question: string
          answer: string
        }
      >({
        query: ({ id, ...body }) => ({
          url: `/v1/decks/${id}/cards`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Cards'],
      }),
      learnCards: builder.query<Card, string>({
        query: id => `/v1/decks/${id}/learn`,
      }),
    }
  },
})

export const {
  useLearnCardsQuery,
  useGetCardQuery,
  useGetCardsQuery,
  useUpdateCardMutation,
  useCreateCardMutation,
  useDeleteCardMutation,
} = cardsService
