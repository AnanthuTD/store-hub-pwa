import React, { useState } from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const DateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('24/08/2023');

  const handleDateChange = (event: SelectChangeEvent) => {
    setSelectedDate(event.target.value as string);
  };

  return (
    <FormControl sx={{ position: 'relative', top: 100, left: 200, width: 130 }}>
      <Select
        value={selectedDate}
        onChange={handleDateChange}
        displayEmpty
        sx={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#2b2e35' }}
      >
        <MenuItem value="24/08/2023">24/08/2023</MenuItem>
        <MenuItem value="25/08/2023">25/08/2023</MenuItem>
        {/* Add more date options here if necessary */}
      </Select>
    </FormControl>
  );
};

export default DateSelector;
