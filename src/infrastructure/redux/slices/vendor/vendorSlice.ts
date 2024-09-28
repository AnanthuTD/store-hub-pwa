import { IVendor } from '@/domain/entities/IVendor';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedStore {
  _id: string;
  name: string;
}

interface UserState {
  data: IVendor | null;
  selectedStore?: SelectedStore;
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
    setSelectedStore: (state, action: PayloadAction<SelectedStore>) => {
      state.selectedStore = action.payload;
    },
  },
});

export const { login, logout, clearShopOwner, updateShopOwner, setSelectedStore } =
  vendorSlice.actions;

export default vendorSlice.reducer;
