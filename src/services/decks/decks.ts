import { baseApi } from '../../services/base.api.ts'
import { RootState } from '../../services/store.ts'

import { CreateDeckArgs, Deck, DecksResponse, DeleteType, GetDecksArg } from './type'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArg>({
        query: args => {
          return {
            url: 'v1/decks',
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: ({ name }) => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: { name },
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<void, DeleteType>({
        query: ({ id }) => ({
          url: `/v1/decks/${id}`,
          method: 'DELETE',
        }),

        onQueryStarted: async ({ id }, { getState, dispatch, queryFulfilled }) => {
          const state = getState() as RootState
          const { searchByName, currentPage } = state.decksSlice

          try {
            const patchResult = dispatch(
              decksApi.util.updateQueryData('getDecks', { searchByName, name: currentPage }, draft)
            )
          } catch (e) {}
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation } = decksApi
