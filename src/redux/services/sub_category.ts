import { API_KEY } from '@/secret';
import { CreateSubCategory, SubCategory, UpdateSubCategory } from '@/types/sub_category';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const subCategoryApi = createApi({
  reducerPath: 'subCategoryApi',
  tagTypes: ['SubCategories'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/sub_categories`,
    credentials: 'include'
  }),
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllSubCategory: builder.query<SubCategory[] | [], void>({
      query: () => ('/'),
      transformResponse: (response: { sub_categories: SubCategory[] | [] }) => response.sub_categories,
      providesTags: [{ type: "SubCategories", id: "LIST" }],
    }),
    createSubCategory: builder.mutation<SubCategory, CreateSubCategory>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: "SubCategories", id: "LIST" }],
      // transformResponse: (result: { data: { users: any } }) =>result.data.users)
    }),

    updateSubCategory: builder.mutation<string, { id: number, body: UpdateSubCategory }>({
      query: ({ id, body }) => ({
        url: `/${JSON.stringify(id)}`,
        method: 'PATCH',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: [{ type: "SubCategories", id: "LIST" }],
    }),

    deleteSubCategory: builder.mutation<string, number>({
      query: (user_id) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['SubCategories']
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSubCategoryQuery, useCreateSubCategoryMutation, useUpdateSubCategoryMutation ,useDeleteSubCategoryMutation} = subCategoryApi;