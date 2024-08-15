import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import useCountryCodes from '@/hooks/useCountryCodes';

export interface MobileNumberObject {
  countryCode: string;
  mobileNumber: string;
}

interface PhoneFormProps {
  onChange: (mobileNumber: MobileNumberObject) => void;
}

const PhoneForm: React.FC<PhoneFormProps> = ({ onChange: handleMobileNumberChange }) => {
  const { countryCodes } = useCountryCodes();

  const [countryCode, setCountryCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    handleMobileNumberChange({ countryCode, mobileNumber });
  }, [countryCode, mobileNumber, handleMobileNumberChange]);

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumber(e.target.value);
  };

  return (
    <Box display="flex" gap={1}>
      <TextField
        select
        name="countryCode"
        label="Country Code"
        value={countryCode}
        onChange={handleCountryCodeChange}
        fullWidth
        margin="none"
        size="small"
      >
        {countryCodes.map((code) => (
          <MenuItem key={code.code} value={code.code}>
            {code.country} ({code.code})
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        value={mobileNumber}
        fullWidth
        margin="none"
        size="small"
        onChange={handlePhoneNumberChange}
      />
    </Box>
  );
};

export default PhoneForm;
