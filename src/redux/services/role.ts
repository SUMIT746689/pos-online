import { API_KEY } from '@/secret'
import { Role } from '@/types/role'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const roleApi = createApi({
  reducerPath: 'roleApi',
  tagTypes: ['Role'],
  baseQuery: fetchBaseQuery({ baseUrl: API_KEY, credentials: "include" }),
  endpoints: (builder) => ({
    createUserPermitRole: builder.query<Role[], void>({
      query: () => ({
        url: 'roles'
      }),
      transformResponse: (response: Role[]) => response,
      providesTags: ['Role']
    }),

    // loginUser: builder.mutation<Role[], {username:string,password:string}>({
    //   query: (body) => ({
    //     url: 'login',
    //     method: 'POST',
    //     body
    //   }),
    //   transformErrorResponse:(baseQueryReturnValue)=>baseQueryReturnValue.data || 'Failed to Login',
    //   // invalidatesTags:["Auth"]
    // }),

  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateUserPermitRoleQuery } = roleApi