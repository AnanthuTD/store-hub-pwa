import { IVendor } from '@/domain/entities/IVendor';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: IVendor | null;
}

const initialState: UserState = {
  data: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IVendor | null>) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
    updateShopOwner: (state, action: PayloadAction<Partial<IVendor>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    clearShopOwner: (state) => {
      state.data = null;
    },
  },
});

export const { login, logout, clearShopOwner, updateShopOwner } = vendorSlice.actions;

export default vendorSlice.reducer;
