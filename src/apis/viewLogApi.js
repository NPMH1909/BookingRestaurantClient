import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const viewLogApi = createApi({
  reducerPath: 'viewLogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // thay URL theo backend
  endpoints: (builder) => ({
    logRestaurantView: builder.mutation({
      query: ({ restaurantId }) => ({
        url: '/logs',
        method: 'POST',
        body: {restaurantId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const { useLogRestaurantViewMutation } = viewLogApi;
