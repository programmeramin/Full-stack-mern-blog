import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5050/api';

export const commentApi = createApi({
  reducerPath: 'commentApi',
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
  tagTypes: ['Comments'],
  endpoints: builder => ({
    addComment: builder.mutation({
      query: ({ postId, text }) => ({
        url: '/comments',
        method: 'POST',
        body: { postId, text },
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: 'Comments', id: postId },
      ],
    }),

    getComments: builder.query({
      query: postId => `/comments/${postId}`,
      providesTags: (result, _error, postId) =>
        result
          ? [
              { type: 'Comments', id: postId },
              ...result.map(({ _id }) => ({ type: 'Comments', id: _id })),
            ]
          : [{ type: 'Comments', id: postId }],
    }),

    deleteComment: builder.mutation({
      query: commentId => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: 'Comments', id: postId },
      ],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
} = commentApi;
