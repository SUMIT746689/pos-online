import { API_KEY } from '@/secret';
import { Company, CreateCompany, UpdateCompany } from '@/types/company';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const companyApi = createApi({
  reducerPath: 'companyApi',
  tagTypes: ['Companies'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/companies`,
    credentials: 'include'
  }),
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllCompanies: builder.query<Company[] | [], void>({
      query: () => ('/'),
      transformResponse: (response: { companies: Company[] | [] }) => response.companies,
      providesTags: [{ type: "Companies", id: "LIST" }],
    }),
    createCompany: builder.mutation<Company, CreateCompany>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: "Companies", id: "LIST" }],
      // transformResponse: (result: { data: { users: any } }) =>result.data.users)
    }),

    updateCompany: builder.mutation<string, {id:number,body: UpdateCompany}>({
      query: ({ id, body }) => ({
        url: `/${JSON.stringify(id)}`,
        method: 'PATCH',
        body,
        responseHandler:(response)=> response.text(),
      }),
      invalidatesTags: [{ type: "Companies", id: "LIST" }],
    }),
    
    deleteCompany: builder.mutation<string, number>({
      query: (user_id) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'DELETE',
        responseHandler: (response) =>  response.text(),
      }),
      invalidatesTags: ['Companies']
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCompaniesQuery,useCreateCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation } = companyApi;