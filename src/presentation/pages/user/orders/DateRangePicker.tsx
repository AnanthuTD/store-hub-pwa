import React from 'react';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

interface DateRangePickerProps {
  onChange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => (
  <RangePicker style={{ marginBottom: '20px', width: '300px' }} onChange={onChange} />
);

export default DateRangePicker;
