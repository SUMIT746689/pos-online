import { API_KEY } from '@/secret';
import { CreateVendor, UpdateVendor, Vendor } from '@/types/vendor';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  tagTypes: ['Vendors'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/vendors`,
    credentials: 'include'
  }),
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllVendors: builder.query<Vendor[] | [], void>({
      query: () => ('/'),
      transformResponse: (response: { vendors: Vendor[] | [] }) => response.vendors,
      providesTags: [{ type: "Vendors", id: "LIST" }],
    }),
    createVendor: builder.mutation<Vendor, CreateVendor>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: "Vendors", id: "LIST" }],
      // transformResponse: (result: { data: { users: any } }) =>result.data.users)
    }),

    updateVendor: builder.mutation<string, { id: number, body: UpdateVendor }>({
      query: ({ id, body }) => ({
        url: `/${JSON.stringify(id)}`,
        method: 'PATCH',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: [{ type: "Vendors", id: "LIST" }],
    }),

    deleteVendor: builder.mutation<string, number>({
      query: (user_id) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Vendors']
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useGetAllVendorsQuery, useCreateVendorMutation, useUpdateVendorMutation, useDeleteVendorMutation } = vendorApi;