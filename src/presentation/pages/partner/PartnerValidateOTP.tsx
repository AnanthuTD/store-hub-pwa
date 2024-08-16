import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import OTPInput from '@/presentation/components/Auth/OTP';
import SubmitButton from '@/presentation/components/Partner/Registration/SubmitButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (otp: string) => {
    setOtp(otp);
  };

  const handleSubmit = () => {
    // Handle OTP verification logic
    alert(`Verifying OTP: ${otp}`);
  };

  return (
    <Box sx={{ width: '100%', p: 2, textAlign: 'center', mt: 3 }}>
      <Box display={'flex'} marginBottom={3}>
        <ArrowBackIosIcon />
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Enter OTP to verify
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        A 6 digit OTP has been sent to your phone number <strong>+91 9999988888</strong>{' '}
        <Typography component="span" sx={{ color: 'red', cursor: 'pointer' }}>
          Change
        </Typography>
      </Typography>
      <Box display={'flex'} justifyContent={'center'}>
        <OTPInput onChange={handleChange} key={'otp-input-field'} />
      </Box>
      <Box marginTop={5}>
        <SubmitButton text="Verify OTP" key={'verify-otp'} onClick={handleSubmit} />
      </Box>
    </Box>
  );
};

export default OtpVerification;
