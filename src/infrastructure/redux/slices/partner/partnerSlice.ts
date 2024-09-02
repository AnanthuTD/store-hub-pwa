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
  },
});

export const { storePartner, setId } = partnerSlice.actions;

export default partnerSlice.reducer;
