import {
  ILogin,
  IResponse,
  IVerify,
  SocialLogin,
  UserData,
} from "@/components/type";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth/baseQueryWithReauth";

type Post = {
  gender?: string;
  birthday?: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
};

interface PartialType {
  id: string | undefined;
  body: Post;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (build) => ({
    processRegister: build.mutation<IResponse, Omit<UserData, "id">>({
      query: (body) => ({
        url: "/users/process-register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    verifyUser: build.mutation<IResponse, Omit<IVerify, "id">>({
      query: (body) => ({
        url: "/users/vefity",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: build.mutation<IResponse, Omit<ILogin, "id">>({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updateUserInfo: build.mutation<
      IResponse,
      Partial<PartialType> & Pick<PartialType, "id">
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    logOut: build.mutation<IResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: build.query<IResponse, any>({
      query: ({ page, limit, search }) =>
        `/users?search=${search}&page=${page}&limit=${limit}`,
      providesTags: ["User"],
    }),

    getUser: build.query<IResponse, string | undefined>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),

    deleteUser: build.mutation<IResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    socialLogin: build.mutation<IResponse, SocialLogin>({
      query: (body) => ({
        url: "/auth/social-login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useProcessRegisterMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useUpdateUserInfoMutation,
  useLogOutMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useSocialLoginMutation,
} = userApi;
