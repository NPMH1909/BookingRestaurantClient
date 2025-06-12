import { API_ROUTE, RESTAURANT_API } from "../configs/ApiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: RESTAURANT_API + API_ROUTE.VIDEO,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({

    getAllVideosByResId: builder.query({
      query: (restaurantId) => `/restaurant/get-all/${restaurantId}`,
    }),
    getMostLikeVideosByResId: builder.query({
      query: (restaurantId) => `/get/most-like/${restaurantId}`,
    }),

    createVideo: builder.mutation({
      query: ({ formData, restaurantId }) => ({
        url: `/${restaurantId}`,
        method: 'POST',
        body: formData,
      }),
    }),
    checkVideoLiked: builder.query({
      query: (videoId) => ({
        url: `/check-user/${videoId}`,
      }),
    }),

    getVideosLikeStatus: builder.query({
      query: (videoIds) => ({
        url: '/check/like-status',
        method: 'POST',
        body: { videoIds },
      }),
      providesTags: ['Like'],
    }),
    //--------------------------------
    getVideos: builder.query({
      query: ({ searchTerm = "", page = 1, limit = 10, userId= null } = {}) => ({
        url: '/get-all',
        method: 'GET',
        params: { searchTerm, page, limit, userId },
      }),
    }),
    getSearchSuggestions: builder.query({
      query: () => ({
        url: '/get/top-search',
        method: 'GET',
      }),
    }),

    // getVideos: builder.query({
    //   query: ({ restaurantName }) => {
    //     const queryParam = restaurantName ? `?restaurantName=${restaurantName}` : '';
    //     return `/get-all/${queryParam}`;
    //   },
    // }),


    // API thêm video
    addVideo: builder.mutation({
      query: (formData) => ({
        url: '/add',
        method: 'POST',
        body: formData,
      }),
    }),
    likeVideo: builder.mutation({
      query: (videoId) => ({
        url: `/like/${videoId}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { restaurantId }) => [{ type: 'Video', id: restaurantId }],
    }),
    // API lấy danh sách video theo userId
    getVideosByUserId: builder.query({
      query: ({ page = 1, limit = 6 }) => `/user?page=${page}&limit=${limit}`,
    }),


    getMostLikedVideo: builder.query({
      query: ({ restaurantId }) => `/most-liked/${restaurantId}`,
    }),
    // API xóa video
    deleteVideo: builder.mutation({
      query: (videoId) => ({
        url: `/delete/${videoId}`, // Endpoint xóa video
        method: 'DELETE',
      }),
    }),

    // API cập nhật video
    updateVideo: builder.mutation({
      query: ({ videoId, updatedData }) => ({
        url: `/update/${videoId}`, // Endpoint cập nhật video
        method: 'PUT',
        body: updatedData,
      }),
    }),
  }),
});

// Xuất hooks sử dụng trong component
export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useGetVideosByUserIdQuery,
  useDeleteVideoMutation,
  useUpdateVideoMutation,
  useGetMostLikedVideoQuery,
  useLikeVideoMutation,
  useGetAllVideosByResIdQuery,
  useCreateVideoMutation,
  useCheckVideoLikedQuery,
  useGetVideosLikeStatusQuery,
  useGetSearchSuggestionsQuery,
  useGetMostLikeVideosByResIdQuery
} = videoApi;

