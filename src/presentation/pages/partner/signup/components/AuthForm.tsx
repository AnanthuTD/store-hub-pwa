import { Box, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/UserAuthRepository'; // Import response type

const AuthForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false); // State for checkbox
  const authRepo = new AuthRepositoryImpl(); // AuthRepo instance

  const handleMobileNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMobileNumber(e.target.value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const sendOTP = async () => {
    if (!isChecked) {
      setError('You must agree to the Terms of Use and Privacy Policy to proceed.');
      return;
    }

    setError(null); // Clear previous errors
    try {
      const response = await authRepo.sendOTP('+91', mobileNumber);

      if (response.status !== 'pending' && response.status !== 'approved') {
        setError('Failed to send OTP: ' + response.status);
      } else {
        navigate(`/partner/signup/otp-verification?mobileNumber=${mobileNumber}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError('Failed to send OTP: ' + error.message);
      } else {
        setError('Failed to send OTP due to unknown reason');
      }
    }
  };

  return (
    <Box flex={1} position="relative" display="flex" flexDirection="column" paddingBottom="25%">
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
          onChange={handleMobileNumberChange}
        />

        <FormControlLabel
          control={<Checkbox color="primary" checked={isChecked} onChange={handleCheckboxChange} />}
          label={
            <>
              By signing up, I agree to the{' '}
              <Link href="#" underline="always">
                Terms of Use
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
