import { Box, TextField, Button, Typography, Link } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import Header from '../../components/Header';
import AuthThemeProvider from '../../components/AuthThemeProvider';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/UserAuthRepository';
import PasswordField from '@/presentation/components/PasswordField';

const SignUpWithMobile = () => {
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [searchParams] = useSearchParams();
  const mobileNumber = searchParams.get('mobileNumber');
  const countryCode = searchParams.get('countryCode') || ''; // Assuming countryCode is also passed in query params
  const navigate = useNavigate();

  // State for OTP resend timer
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleSubmit = async () => {
    if (!otp || !firstName || !lastName || !password || !countryCode || !mobileNumber) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const authRepo = new AuthRepositoryImpl();

      const response = await authRepo.signupWithOTP({
        countryCode,
        mobileNumber,
        firstName,
        lastName,
        password,
        otp,
      });

      if (response.error) {
        console.error('Error signing up:', response.error);
        setError(response.error);
      } else {
        console.log('Sign up successful:', response.user);
        navigate('/signin');
      }
    } catch (error) {
      console.error('An error occurred during sign up:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handlePasswordChange = (newPassword: string, strength: number) => {
    setPassword(newPassword);
    setPasswordStrength(strength);
  };

  const handleResendOTP = async () => {
    try {
      if (!mobileNumber || !countryCode) {
        throw new Error('No country code or mobile number provided!');
      }

      const authRepo = new AuthRepositoryImpl();
      await authRepo.sendOTP(countryCode, mobileNumber); // Assuming this method exists

      setTimer(30); // Reset timer to 30 seconds
      setCanResend(false); // Disable button until timer runs out
      setError(null); // Clear any previous error
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setError('Failed to resend OTP. Please try again later.');
    }
  };

  return (
    <AuthThemeProvider>
      <Header variant="signin" />
      <Grid2 container spacing={5} marginInline={5} marginTop={1}>
        <Grid2
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          textAlign="left"
        >
          <Box maxWidth={530}>
            <Typography variant="h3" fontWeight={500} gutterBottom>
              Store Locator
            </Typography>
            <Typography
              variant="subtitle1"
              color={'#666666'}
              fontSize={28}
              gutterBottom
              marginBottom={'4rem'}
            >
              Complete Your SignUp
            </Typography>
            <Box gap={1} display={'flex'} flexDirection={'column'}>
              <Box display={'flex'} width={'100%'} gap={1}>
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  margin="none"
                  size="small"
                  value={mobileNumber}
                  disabled
                />
              </Box>
              <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                margin="none"
                size="small"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button variant="text" onClick={handleResendOTP} disabled={!canResend}>
                Resend OTP {timer > 0 && `(${timer}s)`}
              </Button>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="none"
                size="small"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="none"
                size="small"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              {/* password */}
              <PasswordField value={password} onChange={handlePasswordChange} />

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={passwordStrength < 2}
              >
                Sign up
              </Button>
            </Box>
            <Box marginTop="16px">
              <Typography variant="body2">
                By signing up, you agree to the{' '}
                <Link href="#" underline="hover">
                  Terms of use
                </Link>{' '}
                and{' '}
                <Link href="#" underline="hover">
                  Privacy Policy
                </Link>
                .
              </Typography>
            </Box>
          </Box>
        </Grid2>
        <Grid2 xs={12} sm={12} md={12} lg={6} xl={6}>
          <Box
            sx={{
              backgroundImage: `url(/signup-image.svg)`,
              backgroundRepeat: 'no-repeat',
              height: '100%',
            }}
          ></Box>
        </Grid2>
      </Grid2>
    </AuthThemeProvider>
  );
};

export default SignUpWithMobile;
