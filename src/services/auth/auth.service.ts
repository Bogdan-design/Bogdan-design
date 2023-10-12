import { LoginArg } from '../../services/auth/auth.types.ts'
import { baseApi } from '../../services/base.api.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<any, void>({
      query: () => '/v1/auth/me',
    }),
    login: builder.mutation<any, LoginArg>({
      query: body => ({
        url: '/v1/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = authService
