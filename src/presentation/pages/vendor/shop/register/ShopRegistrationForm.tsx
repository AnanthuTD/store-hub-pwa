import React, { useEffect, useState } from 'react';
import { Form, Button, message, Modal, Card } from 'antd';
import ShopFormFields from './ShopFormFields';
import dayjs, { Dayjs } from 'dayjs';
import axiosInstance from '@/config/axios';
import LocationMap from './LocationMap';

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
  location: {
    latitude: number;
    longitude: number;
  };
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
    location: data.location
      ? { latitude: data.location?.lat, longitude: data.location?.lng }
      : null,
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

interface LocationData {
  lat: number;
  lng: number;
}

const ShopRegistrationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<FormData | null>(null);
  const [shopId, setShopId] = useState<string | null>(null); // Track shop ID for updates
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

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
            location,
          } = shop;

          setSelectedLocation({ lat: location.latitude, lng: location.longitude });

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
    console.log(selectedLocation);

    const formData = formatData({ ...values, location: selectedLocation });

    console.log(formData);

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // When a location is selected in the map modal
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // setIsModalVisible(false);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={data || {}}>
      <ShopFormFields data={data} />

      {/* Location Preview Section */}
      <Form.Item label="Shop Location">
        {selectedLocation ? (
          <Card
            hoverable
            cover={
              <div style={{ width: '100%', height: '200px' }}>
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  title="Selected Location Preview"
                  src={`https://www.google.com/maps/embed/v1/place?key=${
                    import.meta.env.VITE_MAP_API_KEY
                  }&q=${selectedLocation.lat},${selectedLocation.lng}&center=${
                    selectedLocation.lat
                  },${selectedLocation.lng}&zoom=14`}
                />
              </div>
            }
            onClick={handleOpenModal} // Open the modal on click
          >
            <p>
              <strong>Selected Coordinates:</strong> Latitude: {selectedLocation.lat}, Longitude:{' '}
              {selectedLocation.lng}
            </p>
          </Card>
        ) : (
          <Button onClick={handleOpenModal}>Select Location</Button>
        )}
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {data ? 'Update Shop Info' : 'Register Shop'}
        </Button>
      </Form.Item>

      {/* Modal for Map Selection */}
      <Modal
        title="Select Shop Location"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <LocationMap onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
      </Modal>
    </Form>
  );
};

export default ShopRegistrationForm;
