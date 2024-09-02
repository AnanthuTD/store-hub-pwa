import { IShopOwner } from '@/domain/entities/IShopOwner';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: IShopOwner | null;
}

const initialState: UserState = {
  data: null,
};

const shopOwnerSlice = createSlice({
  name: 'shopOwner',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IShopOwner | null>) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
    updateShopOwner: (state, action: PayloadAction<Partial<IShopOwner>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    clearShopOwner: (state) => {
      state.data = null;
    },
  },
});

export const { login, logout, clearShopOwner, updateShopOwner } = shopOwnerSlice.actions;

export default shopOwnerSlice.reducer;
