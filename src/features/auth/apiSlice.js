import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (lognCredentials) => ({
        url: '/login',
        method: 'POST',
        body: lognCredentials,
      }),
    }),
    register:builder.mutation({
      query:(registerCredentials) => ({
        url: '/register',
        method: 'POST',
        body: registerCredentials,
        prepareHeaders: (headers) => {
          headers.set('Content-Type', 'application/json'); // Ensures JSON payloads
          return headers;
        },
      })
    })
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
