import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse, UserData } from "@/components/type";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    processRegister: build.mutation<IResponse, Omit<UserData, "id">>({
      query: (body) => ({
        url: "/api/users/process-register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useProcessRegisterMutation } = userApi;