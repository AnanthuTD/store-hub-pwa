import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import partnerReducer from './slices/partner/partnerSlice';
import vendorReducer from './slices/vendor/vendorSlice';
import adminReducer from './slices/admin/adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    partner: partnerReducer,
    vendor: vendorReducer,
    admin: adminReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
