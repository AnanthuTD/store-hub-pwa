import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import OTPInput from '@/presentation/components/Auth/OTP';
import SubmitButton from '@/presentation/components/Partner/Registration/SubmitButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { verifyOTP } from '@/infrastructure/repositories/PartnerAuthRepository';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/infrastructure/redux/store';
import { storePartner } from '@/infrastructure/redux/slices/partner/partnerSlice';

const OtpVerification = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const mobileNumber = searchParams.get('mobileNumber');

  const handleChange = (otp: string) => {
    setOtp(otp);
  };

  const handleSubmit = async () => {
    // Handle OTP verification logic
    alert(`Verifying OTP: ${otp}`);

    setError(null);

    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    const response = await verifyOTP(otp, mobileNumber as string);

    if (response.error) {
      console.error('Error logging in:', response.error);
      setError(response.error);
    } else {
      console.log(response);
      // Store the delivery partner's contact information in the Redux store
      dispatch(storePartner({ _id: response._id }));

      console.log('OTP verfication successfull');

      navigate('/partner/signup/profile');
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2, textAlign: 'center', mt: 3 }}>
      <Box display={'flex'} marginBottom={3}>
        <ArrowBackIosIcon />
      </Box>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Enter OTP to verify
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        A 6 digit OTP has been sent to your phone number <strong>+91 {mobileNumber}</strong>{' '}
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
