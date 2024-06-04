import { API_KEY } from '@/secret';
import { CreateMeasurementUnit, MeasurementUnit, UpdateMeasurementUnit } from '@/types/measurement_unit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const measurementUnitApi = createApi({
  reducerPath: 'measurementUnitApi',
  tagTypes: ['MeasurementUnits'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/measurement_units`,
    credentials: 'include'
  }),
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllMeasurementUnit: builder.query<MeasurementUnit[] | [], void>({
      query: () => ('/'),
      transformResponse: (response: { measurement_units: MeasurementUnit[] | [] }) => response.measurement_units,
      providesTags: [{ type: "MeasurementUnits", id: "LIST" }],
    }),
    createMeasurementUnit: builder.mutation<MeasurementUnit, CreateMeasurementUnit>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: "MeasurementUnits", id: "LIST" }],
      // transformResponse: (result: { data: { users: any } }) =>result.data.users)
    }),

    updateMeasurementUnit: builder.mutation<string, { id: number, body: UpdateMeasurementUnit }>({
      query: ({ id, body }) => ({
        url: `/${JSON.stringify(id)}`,
        method: 'PATCH',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: [{ type: "MeasurementUnits", id: "LIST" }],
    }),

    deleteMeasurementUnit: builder.mutation<string, number>({
      query: (user_id) => ({
        url: `/${JSON.stringify(user_id)}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['MeasurementUnits']
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMeasurementUnitQuery, useCreateMeasurementUnitMutation, useUpdateMeasurementUnitMutation, useDeleteMeasurementUnitMutation } = measurementUnitApi;