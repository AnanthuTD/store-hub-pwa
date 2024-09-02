import { User } from '@/domain/entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: User | null;
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User | null>) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.data = null;
    },
  },
});

export const { login, logout, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
