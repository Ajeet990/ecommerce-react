import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/apiSlice';
import { otherApisSlice } from '../features/otherApis/otherApisSlice';

export const store = configureStore({
  reducer: {
    // Add reducers from different APIs
    [authApi.reducerPath]: authApi.reducer,
    [otherApisSlice.reducerPath]: otherApisSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(otherApisSlice.middleware)
});

export default store;
