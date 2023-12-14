import { baseApi } from '@/app/base.api'
import { LoginArg, SignUpResponseType, User } from '@/services/auth/auth.types'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<User, void>({
      query: () => '/v1/auth/me',
      providesTags: ['Me'],
    }),
    updateProfile: builder.mutation<any, any>({
      query: body => ({
        url: '/v1/auth/me',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    singUp: builder.mutation<SignUpResponseType, { email: string; password: string }>({
      query: body => ({
        url: '/v1/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<void, LoginArg>({
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
    recovery: builder.mutation<void, { email: string }>({
      query: body => ({
        url: '/v1/auth/recover-password',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useRecoveryMutation,
  useLoginMutation,
  useSingUpMutation,
  useMeQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
} = authService
