import React, { useEffect, useState } from 'react';
import { Form, Button, message } from 'antd';
import ShopFormFields from './ShopFormFields';
import dayjs, { Dayjs } from 'dayjs';
import axiosInstance from '@/config/axios';

interface OperatingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

interface ShopData {
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
}

interface FormData {
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
  monday?: Dayjs;
  tuesday?: Dayjs;
  wednesday?: Dayjs;
  thursday?: Dayjs;
  friday?: Dayjs;
  saturday?: Dayjs;
  sunday?: Dayjs;
  [key: string]: any;
}

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

const formatOperatingHours = (data: FormData): OperatingHours => {
  const formatTimeRange = (start?: Dayjs, end?: Dayjs) => {
    if (!start || !end) return 'Closed';
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

const formatData = (data: FormData) => {
  return {
    name: data.name,
    location: {
      coordinates: null,
      type: null,
    },
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

const ShopRegistrationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<FormData | null>(null);
  const [shopId, setShopId] = useState<string | null>(null); // Track shop ID for updates

  useEffect(() => {
    axiosInstance
      .get<{ shopData: ShopData[] }>('/vendor/shop')
      .then(({ data: { shopData } }) => {
        if (shopData && shopData.length > 0) {
          const shop = shopData[0]; // Assuming the first shop data is what we need

          const {
            _id,
            name,
            averageRating,
            description,
            address: { city, country, postalCode, state, street },
            contactInfo: { email, phone, website },
            operatingHours,
          } = shop;

          const formattedOperatingHours = formatBack(operatingHours);

          const formattedData = {
            name,
            averageRating,
            description,
            city,
            country,
            postalCode,
            state,
            street,
            email,
            phone,
            website,
            ...formattedOperatingHours,
          };

          form.setFieldsValue(formattedData);
          setData(formattedData);
          setShopId(_id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [form]);

  const handleFinish = (values: FormData) => {
    console.log(values);
    const formData = formatData(values);

    if (shopId) {
      // Use PUT for updates if shop data exists
      axiosInstance
        .put(`/vendor/shop/${shopId}`, formData)
        .then(() => {
          message.success('Shop Updated Successfully!');
        })
        .catch((error) => {
          message.error('Failed to update shop.');
          console.error(error);
        });
    } else {
      // Use POST for new shop registration
      axiosInstance
        .post('/vendor/shop/register', formData)
        .then(() => {
          message.success('Shop Registered Successfully!');
          form.resetFields();
        })
        .catch((error) => {
          message.error('Failed to register shop.');
          console.error(error);
        });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={data || {}}>
      <ShopFormFields data={data} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {data ? 'Update Shop Info' : 'Register Shop'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ShopRegistrationForm;
