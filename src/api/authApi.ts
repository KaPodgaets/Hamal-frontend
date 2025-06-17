import { apiSlice } from './apiSlice'
import { AuthResponse, LoginRequest } from '../types'
import { setCredentials } from '../features/auth/authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/Auth/login',
        method: 'POST',
        data: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ token: data.token }))
        } catch (error) {
          // Error is handled by RTK Query and axios interceptor
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authApi 