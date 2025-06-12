import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTE, RESTAURANT_API } from "../configs/ApiConfig";
export const statisticApi = createApi({
    reducerPath: "statisticApi",
    baseQuery: fetchBaseQuery({ baseUrl: RESTAURANT_API + API_ROUTE.STATISTIC}),
    tagTypes: ["statisticApi"],
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (restaurantId) => `/summary/${restaurantId}`,
        }),
        getRevenueChart: builder.query({
            query: ({restaurantId,range = 'daily'}) => `/revenue/${restaurantId}?range=${range}`,
        }),
        getMenuItemPrepareItems: builder.query({
            query: ({restaurantId,days=7}) => `/menu-items-prepare/${restaurantId}?range=${days}`,
        }),
    }),
});
export const {
    useGetRevenueChartQuery,
    useGetSummaryQuery,
    useGetMenuItemPrepareItemsQuery
} = statisticApi;

