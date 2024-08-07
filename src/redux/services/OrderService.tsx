import { IOrder, IResponse } from "@/components/type";
import { cartApi } from "./CartService";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth/baseQueryWithReauth";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["order"],
  endpoints: (builder) => ({
    addOrder: builder.mutation<IResponse, Partial<IOrder>>({
      query: (product) => ({
        url: "/order",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["order"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(cartApi.util.invalidateTags(["cart"]));
      },
    }),
    getOrderById: builder.query<IResponse, string>({
      query: (id) => `/order/${id}`,
      providesTags: ["order"],
    }),
    getOrders: builder.query<IResponse, void>({
      query: () => "/order",
      providesTags: ["order"],
    }),
    updateOrderStatus: builder.mutation<
      IResponse,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/order/update-Status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation<IResponse, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
