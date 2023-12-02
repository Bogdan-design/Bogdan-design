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
      learnCards: builder.query<Card, { id: string; previousCardId: string }>({
        query: ({ id, previousCardId }) => ({
          url: `/v1/decks/${id}/learn`,
          previousCardId,
        }),
      }),
      gradeUpdate: builder.mutation<void, { cardId: string; deckId: string; grade: number }>({
        query: ({ deckId, cardId, grade }) => ({
          url: `/v1/decks/${deckId}/learn`,
          method: 'POST',
          body: { cardId, grade },
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGradeUpdateMutation,
  useLearnCardsQuery,
  useGetCardQuery,
  useGetCardsQuery,
  useUpdateCardMutation,
  useCreateCardMutation,
  useDeleteCardMutation,
} = cardsService
