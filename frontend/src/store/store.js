import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';
import { postApi } from '@/features/posts/postApi';
import { userApi } from '@/features/users/userApi';
import { commentApi } from '@/features/comments/commentApi';

const apiMiddlewares = [authApi.middleware, postApi.middleware, userApi.middleware, commentApi.middleware];


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(...apiMiddlewares),
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;
