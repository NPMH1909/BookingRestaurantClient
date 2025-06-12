import { API_ROUTE, RESTAURANT_API } from '../configs/ApiConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recommendationApi = createApi({
  reducerPath: 'Recommendation',
  baseQuery: fetchBaseQuery({
    baseUrl: RESTAURANT_API + API_ROUTE.RECOMMENDATION,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Recommendation'],
  endpoints: (builder) => ({
    getRecommendations: builder.query({
      query: () => ({
        url: `/`,
      }),
      invalidatesTags: (result, error, { videoId }) => [{ type: 'Comment', id: videoId }],
    }),
  }),
});

// Export hooks
export const { useGetRecommendationsQuery } = recommendationApi;
