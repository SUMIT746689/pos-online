import { API_KEY } from '@/secret';
import { CreateSubSubCategory, SubSubCategory, UpdateSubSubCategory } from '@/types/sub__sub_category';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const subSubCategoryApi = createApi({
  reducerPath: 'subSubCategoryApi',
  tagTypes: ['SubSubCategories'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/sub_sub_categories`,
    credentials: 'include'
  }),
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllSubSubCategory: builder.query<SubSubCategory[] | [], void>({
      query: () => ('/'),
      transformResponse: (response: { sub_sub_categories: SubSubCategory[] | [] }) => response.sub_sub_categories,
      providesTags: [{ type: "SubSubCategories", id: "LIST" }],
    }),
    createSubSubCategory: builder.mutation<SubSubCategory, CreateSubSubCategory>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: "SubSubCategories", id: "LIST" }],
      // transformResponse: (result: { data: { users: any } }) =>result.data.users)
    }),

    updateSubSubCategory: builder.mutation<string, { id: number, body: UpdateSubSubCategory }>({
      query: ({ id, body }) => ({
        url: `/${JSON.stringify(id)}`,
        method: 'PATCH',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: [{ type: "SubSubCategories", id: "LIST" }],
    }),

    deleteSubSubCategory: builder.mutation<string, number>({
      query: (user_id) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['SubSubCategories']
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSubSubCategoryQuery, useCreateSubSubCategoryMutation, useUpdateSubSubCategoryMutation ,useDeleteSubSubCategoryMutation} = subSubCategoryApi;