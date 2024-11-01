import { Dayjs } from 'dayjs';
import { FormData, OperatingHours } from '../types';

const formatData = (data: FormData) => {
  return {
    name: data.name,
    location: data.location ? { coordinates: [data.location.lng, data.location.lat] } : null,
    products: [],
    ownerId: null,
    averageRating: data.averageRating,
    isVerified: null,
    address: {
      city: data.city,
      country: data.country,
      postalCode: data.postalCode,
      state: data.state,
      street: data.street,
    },
    description: data.description,
    contactInfo: {
      email: data.email,
      phone: data.phone,
      website: data.website,
    },
    operatingHours: formatOperatingHours(data),
    images: [],
  };
};

const formatOperatingHours = (data: FormData): OperatingHours => {
  const formatTimeRange = (start?: Dayjs, end?: Dayjs) => {
    if (!start || !end) return 'closed';
    return `${start.format('HH:mm')}-${end.format('HH:mm')}`;
  };

  return {
    monday: formatTimeRange(data.monday_start, data.monday_end),
    tuesday: formatTimeRange(data.tuesday_start, data.tuesday_end),
    wednesday: formatTimeRange(data.wednesday_start, data.wednesday_end),
    thursday: formatTimeRange(data.thursday_start, data.thursday_end),
    friday: formatTimeRange(data.friday_start, data.friday_end),
    saturday: formatTimeRange(data.saturday_start, data.saturday_end),
    sunday: formatTimeRange(data.sunday_start, data.sunday_end),
  };
};

export default formatData;
