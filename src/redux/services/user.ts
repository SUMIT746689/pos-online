import { API_KEY } from '@/secret';
import { CreateUser, UpdateUser, User } from '@/types/users'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import axios from "axios"

// const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axios({ url: baseUrl + url, method, data, params, withCredentials:true })
//       console.log({result})
//       return { data: result.data }
//     } catch (axiosError) {
//       let err = axiosError
//       console.error({err})
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       }
//     }
//   }

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/users`,
    credentials: 'include'
  }),
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[] | [], void>({
      query: () => ("/"),
      transformResponse: (response: { users: User[] | [] }) => response.users,
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    createUser: builder.mutation<User, CreateUser>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
        // headers: { "Content-Type": "text/plain" }
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      // transformResponse: (result: { data: { users: any } }) =>result.data.users)
    }),

    updateUser: builder.mutation<User, UpdateUser>({
      query: ({ user_id, body }) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'PATCH',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteUser: builder.mutation<string, number>({
      query: (user_id) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Users']
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;