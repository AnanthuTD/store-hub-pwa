import { Dayjs } from 'dayjs';

export interface OperatingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface LocationData {
  lat: number;
  lng: number;
}

export interface ShopData {
  _id: string;
  name: string;
  averageRating: number;
  description: string;
  address: {
    city: string;
    country: string;
    postalCode: string;
    state: string;
    street: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
  operatingHours: OperatingHours;
  location: { latitude: number; longitude: number };
}

export interface FormData {
  name: string;
  averageRating: number;
  description: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
  email: string;
  phone: string;
  website: string;
  monday?: Dayjs | 'closed';
  tuesday?: Dayjs | 'closed';
  wednesday?: Dayjs | 'closed';
  thursday?: Dayjs | 'closed';
  friday?: Dayjs | 'closed';
  saturday?: Dayjs | 'closed';
  sunday?: Dayjs | 'closed';
  [key: string]: any;
  location: LocationData | null;
}
