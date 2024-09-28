import React from 'react';
import { DatePicker, Select, Input } from 'antd';
import { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface OrderFilterProps {
  status: string | undefined;
  paymentMethod: string | undefined;
  searchId: string;
  dateRange: [Dayjs, Dayjs];
  setDateRange: (dates: [string, string] | null) => void;
  setStatus: (value: string) => void;
  setPaymentMethod: (value: string) => void;
  setSearchId: (value: string) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({
  status,
  paymentMethod,
  searchId,
  dateRange,

  setDateRange,
  setStatus,
  setPaymentMethod,
  setSearchId,
}) => {
  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {/* Date Range Picker */}
      <RangePicker
        onChange={handleDateRangeChange}
        placeholder={['Start date', 'End date']}
        style={{ width: 200 }}
        value={dateRange}
      />

      {/* Status Select */}
      <Select
        value={status}
        onChange={handleStatusChange}
        placeholder="Status"
        style={{ width: 150 }}
      >
        <Option value="Pending">Pending</Option>
        <Option value="Completed">Completed</Option>
        <Option value="Failed">Failed</Option>
      </Select>

      {/* Payment Method Select */}
      <Select
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
        placeholder="P. Method"
        style={{ width: 150 }}
      >
        <Option value="Razorpay">Razorpay</Option>
        <Option value="PayPal">PayPal</Option>
      </Select>

      {/* Search Input */}
      <Input
        value={searchId}
        onChange={handleSearchChange}
        placeholder="Search by amount, payment method..."
        style={{ width: 300 }}
      />
    </div>
  );
};

export default OrderFilter;
