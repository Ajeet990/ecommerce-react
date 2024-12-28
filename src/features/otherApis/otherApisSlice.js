import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';


export const otherApisSlice = createApi({
  reducerPath: 'otherApisSlice',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: '/getCategories',
        method: 'GET',
      }),
    }),
    addProduct: builder.mutation({
      query: ({ formdata, token }) => ({
        url: '/addProduct',
        body: formdata,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'application/json', // Ensures JSON payloads
        },
      }),
    })
  }),
});

export const { useGetCategoriesQuery, useAddProductMutation } = otherApisSlice;
