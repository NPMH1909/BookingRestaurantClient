import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTE, RESTAURANT_API } from "../configs/ApiConfig";
export const restaurantTypeApi = createApi({
  reducerPath: "restaurantTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: RESTAURANT_API + API_ROUTE.RESTAURANT_TYPE }),
  tagTypes: ["restaurantType"],
  endpoints: (builder) => ({

    getRestaurantTypes: builder.query({
      query: () => '/get-all',
    }),
  }),
});
export const {
  useGetRestaurantTypesQuery,
} = restaurantTypeApi;
