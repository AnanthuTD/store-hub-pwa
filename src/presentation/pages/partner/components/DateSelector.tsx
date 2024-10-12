import React, { useState } from 'react';
import { DatePicker, GetProps } from 'antd';
import dayjs from 'dayjs';
import './DateSelector.css';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const DateSelector: React.FC = ({ setDate }) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs().subtract(1, 'day')); // Default to yesterday

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    setDate(date);
  };

  // Disable future dates
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current.isAfter(dayjs().endOf('day'));
  };

  return (
    <div className="date-selector">
      <DatePicker
        format="YYYY-MM-DD"
        value={selectedDate}
        onChange={handleDateChange}
        disabledDate={disabledDate}
        style={{ fontFamily: 'Poppins-Regular', fontSize: '14px', color: '#2b2e35' }}
        placeholder="Select a date"
      />
    </div>
  );
};

export default DateSelector;
