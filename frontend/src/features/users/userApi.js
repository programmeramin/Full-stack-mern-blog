import { BASE_URL } from '@/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getUserById: builder.query({
      query: userId => `/users/${userId}`,
    }),
    getMe: builder.query({
      query: () => '/users/me',
    }),
    updateUser: builder.mutation({
      query: data => ({
        url: '/users/update-profile',
        method: 'PATCH',
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: data => ({
        url: '/users/update-password',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} = userApi;
