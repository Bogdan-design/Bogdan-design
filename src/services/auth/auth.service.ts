import { LoginArg } from '../../services/auth/auth.types.ts'
import { baseApi } from '../../services/base.api.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<any, void>({
      query: () => '/v1/auth/me',
      providesTags: ['Me'],
    }),
    login: builder.mutation<any, LoginArg>({
      query: body => ({
        url: '/v1/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/v1/auth/logout',
        method: 'POST',
      }),
      // onQueryStarted: async (_, { getState, dispatch, queryFulfilled }) => {
      //   try {
      //     await queryFulfilled
      //     dispatch(
      //       authService.util.updateQueryData('me', undefined, () => {
      //         return null
      //       })
      //     )
      //   } catch (e) {
      //     console.error(e)
      //   }
      // },
      invalidatesTags: ['Me'],
    }),
  }),
})

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authService
