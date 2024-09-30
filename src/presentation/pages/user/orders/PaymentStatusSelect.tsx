import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface PaymentStatusSelectProps {
  onChange: (value: string) => void;
}

const PaymentStatusSelect: React.FC<PaymentStatusSelectProps> = ({ onChange }) => (
  <Select
    style={{ marginBottom: '20px', width: '200px' }}
    placeholder="Select Payment Status"
    onChange={onChange}
  >
    <Option value="">All</Option>
    <Option value="Pending">Pending</Option>
    <Option value="Completed">Completed</Option>
    <Option value="Failed">Failed</Option>
  </Select>
);

export default PaymentStatusSelect;
