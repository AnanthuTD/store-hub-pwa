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
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with required plugins
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(utc);
dayjs.extend(timezone);

// Set default time zone to IST (Asia/Kolkata)
dayjs.tz.setDefault('Asia/Kolkata');

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface DateSelectorProps {
  setDate: (date: dayjs.Dayjs | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ setDate }) => {
  // Set default to yesterday in IST
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    dayjs().tz('Asia/Kolkata').subtract(1, 'day'),
  );

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    // Ensure date is in IST
    const dateInIST = date ? date.tz('Asia/Kolkata') : null;
    setSelectedDate(dateInIST);
    setDate(dayjs(dateInIST).tz());
  };

  // Disable future dates
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current.isAfter(dayjs().tz('Asia/Kolkata').endOf('day'));
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
