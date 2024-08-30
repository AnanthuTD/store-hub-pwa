import { Box, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import { useState } from 'react';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/AuthRepositoryImpl';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string>('');

  async function sendOTP() {
    try {
      const authRepo = new AuthRepositoryImpl();
      const response = await authRepo.sendOTP('+91', mobileNumber);

      if (response.status !== 'pending' && response.status !== 'approved') {
        setError('Failed to send OTP: ' + response.status);
      } else {
        navigate('/partner/signup/otp-verification?mobileNumber=' + mobileNumber);
      }
    } catch (error) {
      if (error instanceof Error) setError('Failed to send OTP: ' + error.message);
      else {
        setError('Failed to send OTP due to unknown reason ');
      }
    }
  }

  return (
    <Box
      flex={'1'}
      position={'relative'}
      display={'flex'}
      justifyContent={'space-between'}
      flexDirection={'column'}
      paddingBottom={'25%'}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Be a StoreHub Partner
        </Typography>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Get a stable monthly income
        </Typography>
      </Box>

      <Box>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <InputField
          label="Enter Mobile Number"
          placeholder="e.g. 9999988888"
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <FormControlLabel
          control={<Checkbox color="primary" />}
          label={
            <>
              By signing up I agree to the{' '}
              <Link href="#" underline="always">
                Terms of use
              </Link>{' '}
              and{' '}
              <Link href="#" underline="always">
                Privacy Policy
              </Link>
              .
            </>
          }
          sx={{ mb: 2 }}
        />

        <SubmitButton text="Send OTP" onClick={sendOTP} />
      </Box>
    </Box>
  );
};

export default AuthForm;
