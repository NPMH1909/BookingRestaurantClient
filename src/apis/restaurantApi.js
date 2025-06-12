import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTE, RESTAURANT_API } from "../configs/ApiConfig";
export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({ baseUrl: RESTAURANT_API + API_ROUTE.RESTAURANT }),
  tagTypes: ["Restaurant"],
  endpoints: (builder) => ({

    createRestaurant: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Restaurant"],
    }),
    getRestaurantsByUserId: builder.query({
      query: () => {
        const token = localStorage.getItem("token");
        return {
          url: "/owner/get-all",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    getAllRestaurants: builder.query({
      query: ({ sort, page = 1, size = 8, field , searchTerm, priceRange = "all", provinceCode = "", districtCode = '', type = '', isReputable }) => ({
        url: "/get-all",
        params: { sort, page, size, field, searchTerm, priceRange, provinceCode, districtCode, type, isReputable },
      }),
    }),


    getRestaurantById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        providesTags: [{ type: "Restaurant", id: "ALL" }],
      })
    }),

    updateRestaurant: builder.mutation({
      query: ({ id, restaurantData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: restaurantData,
      }),
      invalidatesTags: ["Restaurant"],
    }),

    deleteRestaurant: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Restaurant"],
    }),
    toggleFavorite: builder.mutation({
      query: (restaurantId) => ({
        url: '/toggle',
        method: 'POST',
        body: { restaurantId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    checkFavorite: builder.query({
      query: ({ restaurantId }) => ({
        url: `/favorite/check?restaurantId=${restaurantId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    }),
    getUserFavorites: builder.query({
      query: () => ({
        url: `/favorite/user`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    // ----------------------------------------
    // ----------------------------------------

    getProvinces: builder.query({
      query: () => '/provinces',
    }),
    getDistrictsByProvince: builder.query({
      query: (provinceCode) => `/districts/${provinceCode}`,
    }),
    getAllType: builder.query({
      query: () => '/types',
    }),
    getAllRestaurantByUserId: builder.query({
      query: (page) => ({
        url: `own/?page=${page}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Restaurant"],
    }),
    getAllRestaurantPromotion: builder.query({
      query: ({ page = 1, size = 8 }) => ({
        url: "/promotion/get-all",
        params: { page, size },
      }),
    }),
    getTopTrustRestaurant: builder.query({
      query: () => ({
        url: "/get/top-trust",
      }),
    }),
    getAllRestaurantPromotionExpiredSoon: builder.query({
      query: () => ({
        url: "/promotion/expirisoon",
      }),
    }),
    getAllRestaurantsByUserId: builder.query({
      query: () => ({
        url: `/owner`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Restaurant"],
    }),

    getRestaurantForUser: builder.query({

      query: ({ provinceCode = "", districtCode = '' }) => ({
        url: `suggested-restaurants`,
        params: { provinceCode, districtCode },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    }),
    getRencentlyRestaurantForUser: builder.query({
      query: () => ({
        url: `rencently-restaurants`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    }),



    getNearbyRestaurants: builder.query({
      query: ({ lat, lng }) => `/nearby?lat=${lat}&lng=${lng}`,
    }),
  }),
});
export const {
  useGetAllRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
  useGetAllRestaurantsByUserIdQuery,
  useGetAllRestaurantByUserIdQuery,
  useGetAllRestaurantPromotionQuery,
  useGetDistrictsByProvinceQuery,
  useGetProvincesQuery,
  useGetRestaurantForUserQuery,
  useGetNearbyRestaurantsQuery,
  useGetRencentlyRestaurantForUserQuery,
  useGetAllTypeQuery,
  useGetRestaurantsByUserIdQuery,
  useToggleFavoriteMutation,
  useGetUserFavoritesQuery,
  useCheckFavoriteQuery,
  useGetAllRestaurantPromotionExpiredSoonQuery,
  useGetTopTrustRestaurantQuery
} = restaurantApi;
