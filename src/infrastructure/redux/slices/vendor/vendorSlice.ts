import { IVendor } from '@/domain/entities/IVendor';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedStore {
  _id: string;
  name: string;
}

interface UserState {
  data: IVendor | null;
  selectedStore?: SelectedStore | null;
}

const initialState: UserState = {
  data: null,
  selectedStore: null,
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
      state.selectedStore = null;
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
    updateVendorProfile: (state, action: PayloadAction<IVendor | null>) => {
      console.log(action.payload);
      state.data = action.payload;
    },
  },
});

export const {
  login,
  logout,
  clearShopOwner,
  updateShopOwner,
  setSelectedStore,
  updateVendorProfile,
} = vendorSlice.actions;

export default vendorSlice.reducer;
