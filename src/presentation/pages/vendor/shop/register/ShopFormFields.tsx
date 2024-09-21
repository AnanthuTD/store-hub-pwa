import React, { useState } from 'react';
import { Form, Input, Select, TimePicker } from 'antd';
import { validationRules } from '../utils/validationRules';
import TextArea from 'antd/es/input/TextArea';
import { FormData } from './types';

const { Option } = Select;
const timeFormat = 'HH:mm';

interface ShopFormFieldsProps {
  data: FormData | null;
}

interface ClosedDaysState {
  [key: string]: boolean;
}

interface TimePickerOrClosedProps {
  day: string;
  isClosed: boolean;
  onStatusChange: (day: string, isClosed: boolean) => void;
}

const RenderTimePickerOrClosed: React.FC<TimePickerOrClosedProps> = ({
  day,
  isClosed,
  onStatusChange,
}) => {
  return (
    <Form.Item label={day.charAt(0).toUpperCase() + day.slice(1)}>
      <Form.Item name={day} initialValue={isClosed ? 'closed' : 'open'}>
        <Select
          placeholder="Select status"
          style={{ width: 150 }}
          onSelect={(value) => onStatusChange(day, value === 'open' ? false : true)}
        >
          <Option value="closed">Closed</Option>
          <Option value="open">Open</Option>
        </Select>
      </Form.Item>
      <Form.Item name={`${day}_start`} noStyle>
        <TimePicker
          format={timeFormat}
          placeholder="Start"
          style={{ margin: '0 8px' }}
          disabled={isClosed}
        />
      </Form.Item>
      <Form.Item name={`${day}_end`} noStyle>
        <TimePicker
          format={timeFormat}
          placeholder="End"
          style={{ margin: '0 8px' }}
          disabled={isClosed}
        />
      </Form.Item>
    </Form.Item>
  );
};

const ShopFormFields: React.FC<ShopFormFieldsProps> = ({ data }) => {
  const [closedDays, setClosedDays] = useState<ClosedDaysState>({
    monday: data?.monday === 'closed',
    tuesday: data?.tuesday === 'closed',
    wednesday: data?.wednesday === 'closed',
    thursday: data?.thursday === 'closed',
    friday: data?.friday === 'closed',
    saturday: data?.saturday === 'closed',
    sunday: data?.sunday === 'closed',
  });

  const handleStatusChange = (day: string, isClosed: boolean) => {
    setClosedDays((prev) => ({ ...prev, [day]: isClosed }));
  };

  return (
    <>
      <Form.Item label="Shop Name" name="name" rules={validationRules.name}>
        <Input placeholder="Enter shop name" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={validationRules.email}>
        <Input placeholder="Enter shop email" />
      </Form.Item>

      <Form.Item label="Phone" name="phone" rules={validationRules.phone}>
        <Input placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item label="Website" name="website">
        <Input placeholder="Enter shop website (optional)" />
      </Form.Item>

      <Form.Item label="Address" name="street">
        <Input placeholder="Street" />
      </Form.Item>

      <Form.Item label="City" name="city">
        <Input placeholder="City" />
      </Form.Item>

      <Form.Item label="State" name="state">
        <Input placeholder="State" />
      </Form.Item>

      <Form.Item label="Country" name="country">
        <Input placeholder="Country" />
      </Form.Item>

      <Form.Item label="Postal Code" name="postalCode">
        <Input placeholder="Postal Code" />
      </Form.Item>

      {/* Rendering time picker for each day */}
      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
        <RenderTimePickerOrClosed
          key={day}
          day={day}
          isClosed={closedDays[day]}
          onStatusChange={handleStatusChange}
        />
      ))}

      <Form.Item label="Description" name="description">
        <TextArea placeholder="Enter shop description" rows={4} />
      </Form.Item>
    </>
  );
};

export default ShopFormFields;
