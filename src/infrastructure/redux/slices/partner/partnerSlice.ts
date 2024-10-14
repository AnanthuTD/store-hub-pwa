import { IDeliveryPartner } from '@/domain/entities/DeliveryPartner';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PartnerState {
  data: Partial<IDeliveryPartner> | null;
}

const initialState: PartnerState = {
  data: null,
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IDeliveryPartner | null>) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
    storePartner: (state, action: PayloadAction<Partial<IDeliveryPartner>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      } else {
        state.data = action.payload;
      }
    },
    setId(state, action: PayloadAction<{ id: string }>) {
      state = { data: { _id: action.payload.id } };
    },
    clearPartner: (state) => {
      state.data = null;
    },
    updatePartnerProfile: (state, action: PayloadAction<IDeliveryPartner | null>) => {
      console.log(action.payload);
      state.data = action.payload;
    },
  },
});

export const { storePartner, setId, clearPartner, login, logout, updatePartnerProfile } =
  partnerSlice.actions;

export default partnerSlice.reducer;
