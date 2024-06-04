import { API_KEY } from '@/secret';
import { CreateSupplier, Supplier, UpdateSupplier } from '@/types/supplier';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const supplierApi = createApi({
  reducerPath: 'supplierApi',
  tagTypes: ['Suppliers'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/suppliers`,
    credentials: 'include'
  }),
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllSuppliers: builder.query<Supplier[] | [], void>({
      query: () => ('/'),
      transformResponse: (response: { suppliers: Supplier[] | [] }) => response.suppliers,
      providesTags: [{ type: "Suppliers", id: "LIST" }],
    }),
    createSupplier: builder.mutation<Supplier, CreateSupplier>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: "Suppliers", id: "LIST" }],
      // transformResponse: (result: { data: { users: any } }) =>result.data.users)
    }),

    updateSupplier: builder.mutation<string, { id: number, body: UpdateSupplier }>({
      query: ({ id, body }) => ({
        url: `/${JSON.stringify(id)}`,
        method: 'PATCH',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: [{ type: "Suppliers", id: "LIST" }],
    }),

    deleteSupplier: builder.mutation<string, number>({
      query: (user_id) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Suppliers']
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSuppliersQuery, useCreateSupplierMutation, useUpdateSupplierMutation, useDeleteSupplierMutation } = supplierApi;