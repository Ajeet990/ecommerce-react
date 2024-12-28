import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';

export const otherApisSlice = createApi({
  reducerPath: 'otherApisSlice',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Product'], // Define the tag
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
        },
      }),
      invalidatesTags: ['Product'], // Invalidate the 'Product' tag after mutation
    }),
    getProducts: builder.query({
      query: ({ token, filters }) => ({
        url: '/getProducts',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: filters
      }),
      providesTags: ['Product'], // Provide the 'Product' tag to this query
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddProductMutation,
  useGetProductsQuery,
} = otherApisSlice;
