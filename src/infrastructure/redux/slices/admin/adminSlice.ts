import { AdminSignInResponseDTO } from '@/infrastructure/services/Admin/AuthService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  data: AdminSignInResponseDTO | null;
}

const initialState: AdminState = {
  data: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AdminSignInResponseDTO | null>) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
    updateAdmin: (state, action: PayloadAction<Partial<AdminSignInResponseDTO>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    clearAdmin: (state) => {
      state.data = null;
    },
  },
});

export const { login, logout, clearAdmin: clearShopOwner, updateAdmin } = adminSlice.actions;

export default adminSlice.reducer;
