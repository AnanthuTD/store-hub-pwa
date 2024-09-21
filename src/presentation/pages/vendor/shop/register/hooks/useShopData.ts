import { useState } from 'react';
import axiosInstance from '@/config/axios';
import { ShopData, FormData, OperatingHours, LocationData } from '../types'; // Define types in a separate file
import { FormInstance } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const useShopData = (form: FormInstance) => {
  const [data, setData] = useState<FormData | null>(null);
  const [shopId, setShopId] = useState<string | null>(null);

  const fetchShopData = async () => {
    try {
      const {
        data: { shopData },
      } = await axiosInstance.get<{ shopData: ShopData[] }>('/vendor/shop');
      if (shopData && shopData.length > 0) {
        const shop = shopData[0];
        setShopId(shop._id);
        const formattedData = formatShopData(shop);
        form.setFieldsValue(formattedData);
        setData(formattedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatShopData = (shop: ShopData): FormData => {
    // Map the shop data to your form data structure
    return {
      name: shop.name,
      averageRating: shop.averageRating,
      description: shop.description,
      city: shop.address.city,
      country: shop.address.country,
      postalCode: shop.address.postalCode,
      state: shop.address.state,
      street: shop.address.street,
      email: shop.contactInfo.email,
      phone: shop.contactInfo.phone,
      website: shop.contactInfo.website,
      location: formatLocation(shop.location),
      ...formatBack(shop.operatingHours),
    };
  };

  const formatLocation = (location: { latitude: number; longitude: number }): LocationData => {
    return { lat: location.latitude, lng: location.longitude };
  };

  const convertTimeToDayjs = (timeStr: string): Dayjs => {
    const [hour, minute] = timeStr.split(':').map((t) => parseInt(t, 10));
    return dayjs().set('hour', hour).set('minute', minute);
  };

  const formatBack = (operatingHours: OperatingHours): Record<string, any> => {
    const formatDay = (day: keyof OperatingHours) => {
      if (operatingHours[day].toLowerCase() === 'closed') {
        return { [day]: 'closed' };
      } else {
        const [startTime, endTime] = operatingHours[day].split('-');
        return {
          [`${day}_start`]: convertTimeToDayjs(startTime),
          [`${day}_end`]: convertTimeToDayjs(endTime),
          [day]: 'open',
        };
      }
    };

    return {
      ...formatDay('monday'),
      ...formatDay('tuesday'),
      ...formatDay('wednesday'),
      ...formatDay('thursday'),
      ...formatDay('friday'),
      ...formatDay('saturday'),
      ...formatDay('sunday'),
    };
  };

  return { data, shopId, fetchShopData };
};

export default useShopData;
