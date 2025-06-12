import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RESTAURANT_API } from "../configs/ApiConfig";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: RESTAURANT_API }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: ({ page, restaurantId, limit = 8 }) => ({
        url: `/users/${restaurantId}?page=${page}&limit=${limit}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Employee"],
    }),
    getEmployeeById: builder.query({
      query: () => {
        return {
          url: `/staff/`,
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,  // Lấy token từ localStorage
          },
        };
      },
      providesTags: ["Employee"],
    }),
    // apis/employeeApi.js
    createEmployee: builder.mutation({
      query: ({ name, email, phone, password, restaurantId }) => ({
        url: `/staff/register/${restaurantId}`,
        method: "POST",
        body: { name, email, phone, password },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Employee"],
    })
    ,
    updateEmployee: builder.mutation({
      query: ({ id, restaurant_id, name }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: { name: name, restaurant_id: restaurant_id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useLazyGetEmployeeByIdQuery
} = employeeApi;
