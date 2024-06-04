import { API_KEY } from '@/secret';
import { Brand, CreateBrand, UpdateBrand } from '@/types/brand';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const brandApi = createApi({
  reducerPath: 'brandApi',
  tagTypes: ['Brands'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/brands`,
    credentials: 'include'
  }),
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllBrand: builder.query<Brand[] | [], void>({
      query: () => ('/'),
      transformResponse: (response: { brands: Brand[] | [] }) => response.brands,
      providesTags: [{ type: "Brands", id: "LIST" }],
    }),
    createBrand: builder.mutation<Brand, CreateBrand>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: "Brands", id: "LIST" }],
      // transformResponse: (result: { data: { users: any } }) =>result.data.users)
    }),

    updateBrand: builder.mutation<string, { id: number, body: UpdateBrand }>({
      query: ({ id, body }) => ({
        url: `/${JSON.stringify(id)}`,
        method: 'PATCH',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: [{ type: "Brands", id: "LIST" }],
    }),

    deleteBrand: builder.mutation<string, number>({
      query: (user_id) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Brands']
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllBrandQuery, useCreateBrandMutation, useUpdateBrandMutation, useDeleteBrandMutation } = brandApi;