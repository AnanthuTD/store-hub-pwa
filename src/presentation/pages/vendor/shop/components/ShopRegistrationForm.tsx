import React, { useEffect, useState } from 'react';
import { Form, Button, message } from 'antd';
import ShopFormFields from './ShopFormFields';
import dayjs, { Dayjs } from 'dayjs';
import axiosInstance from '@/config/axios';

// Define the interface for operating hours
interface OperatingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

// Define the interface for the shop data from the backend
interface ShopData {
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

// Define the form data interface for the fields
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
  [key: string]: any; // To allow for dynamic form fields (like time pickers)
}

// Helper to convert time string to Dayjs object
const convertTimeToDayjs = (timeStr: string): Dayjs => {
  const [hour, minute] = timeStr.split(':').map((t) => parseInt(t, 10));
  return dayjs().set('hour', hour).set('minute', minute);
};

// Formatting the operating hours from backend data
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

// Formatting the operating hours for displaying in the form
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

// Formatting the data to send to the backend
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

  useEffect(() => {
    axiosInstance
      .get<{ shopData: ShopData[] }>('/vendor/shop')
      .then(({ data: { shopData } }) => {
        if (shopData && shopData.length > 0) {
          const shop = shopData[0]; // Assuming the first shop data is what we need

          // Destructure all nested objects (like address, contactInfo, operatingHours)
          const {
            name,
            averageRating,
            description,
            address: { city, country, postalCode, state, street },
            contactInfo: { email, phone, website },
            operatingHours,
          } = shop;

          // Format the operating hours from the backend data
          const formattedOperatingHours = formatBack(operatingHours);

          // Construct the final object with destructured values
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

          form.setFieldsValue(formattedData); // Set the form fields with the fetched data
          setData(formattedData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [form]);

  const handleFinish = (values: FormData) => {
    const formData = formatData(values);
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
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={data || {}}>
      <ShopFormFields data={data} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register Shop
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ShopRegistrationForm;
