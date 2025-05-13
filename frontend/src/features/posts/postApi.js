import { BASE_URL } from '@/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // 🔁 Update this to your real backend
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // ⬅️ Optional: if using JWT
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getAllPosts: builder.query({
      query: ({ cat, sort }) => {
        let url = '/blog/getAllPosts';
        const params = new URLSearchParams();

        if (cat) params.append('cat', cat);
        if (sort) params.append('sort', sort);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return url;
      },
      providesTags: ['Posts'],
    }),

    getPostById: builder.query({
      query: id => `/blog/getSingleBlog/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    createPost: builder.mutation({
      query: newPost => ({
        url: '/blog/create',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/blog/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),

    deletePost: builder.mutation({
      query: id => ({
        url: `/blog/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    likePost: builder.mutation({
      query: postId => ({
        url: `/posts/${postId}/like`,
        method: 'PUT',
      }),
      invalidatesTags: ['Posts'], // or specific post if you set up fine-grained tags
    }),

    dislikePost: builder.mutation({
      query: postId => ({
        url: `/posts/${postId}/dislike`,
        method: 'PUT',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} = postApi;
