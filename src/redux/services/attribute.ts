import { API_KEY } from '@/secret';
import { Attribute, CreateAttribute, UpdateAttribute } from '@/types/attribute';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const attributeApi = createApi({
  reducerPath: 'attributeApi',
  tagTypes: ['Attributes'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/attributes`,
    credentials: 'include'
  }),
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllAttribute: builder.query<Attribute[] | [], void>({
      query: () => ('/'),
      transformResponse: (response: { attributes: Attribute[] | [] }) => response.attributes,
      providesTags: [{ type: "Attributes", id: "LIST" }],
    }),
    createAttribute: builder.mutation<Attribute, CreateAttribute>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: "Attributes", id: "LIST" }],
      // transformResponse: (result: { data: { users: any } }) =>result.data.users)
    }),

    updateAttribute: builder.mutation<string, { id: number, body: UpdateAttribute }>({
      query: ({ id, body }) => ({
        url: `/${JSON.stringify(id)}`,
        method: 'PATCH',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: [{ type: "Attributes", id: "LIST" }],
    }),

    deleteAttribute: builder.mutation<string, number>({
      query: (user_id) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Attributes']
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllAttributeQuery, useCreateAttributeMutation, useUpdateAttributeMutation, useDeleteAttributeMutation } = attributeApi;