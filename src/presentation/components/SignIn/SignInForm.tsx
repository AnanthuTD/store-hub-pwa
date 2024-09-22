import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Tabs, Tab, FormControl } from '@mui/material';
import OTPInput from '../Auth/OTP';
import PhoneForm, { MobileNumberObject } from '../SignUp/PhoneForm';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/UserAuthRepository';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/infrastructure/redux/store';
import { login } from '@/infrastructure/redux/slices/user/userSlice';
import PasswordField from '../PasswordField';

const SignInForm = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [mobileNumber, setMobileNumber] = useState<MobileNumberObject>({
    countryCode: '',
    mobileNumber: '',
  });
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [signInMethod, setSignInMethod] = useState<'credentials' | 'otp'>('credentials');
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // New states for OTP timer and button disabling
  const [otpTimer, setOtpTimer] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlePasswordChange = (newPassword: string, strength: number) => {
    setPassword(newPassword);
    setPasswordStrength(strength);
  };

  const handleSignIn = async () => {
    const authRepo = new AuthRepositoryImpl();
    setError(null);

    if (signInMethod === 'credentials') {
      if (!emailOrMobile || !password) {
        setError('Please fill in all fields.');
        return;
      }

      const response = await authRepo.signIn({ emailOrMobile, password });

      if (response.error) {
        setError(response.error);
      } else {
        dispatch(login(response.data!));
        console.log('Sign-in successful:', response.data);
        navigate('/home');
      }
    } else if (signInMethod === 'otp') {
      if (!otp) {
        setError('Please enter the OTP.');
        return;
      }

      const response = await authRepo.loginWithOtp({
        countryCode: mobileNumber.countryCode,
        mobileNumber: mobileNumber.mobileNumber,
        otp,
      });

      if (response.error) {
        console.error('Error logging in:', response.error);
        setError(response.error);
      } else {
        dispatch(login(response.user!));
        console.log('Login successful:', response.user);
        navigate('/home');
      }
    }
  };

  async function sendOTP() {
    try {
      const authRepo = new AuthRepositoryImpl();
      const response = await authRepo.sendOTP(mobileNumber.countryCode, mobileNumber.mobileNumber);

      if (response.status !== 'pending' && response.status !== 'approved') {
        setError('Failed to send OTP: ' + response.status);
      } else {
        // Start OTP timer and disable button
        setIsButtonDisabled(true);
        setOtpTimer(30); // Reset the timer to 30 seconds
      }
    } catch (error) {
      if (error instanceof Error) setError('Failed to send OTP: ' + error.message);
      else {
        setError('Failed to send OTP due to unknown reason ');
      }
    }
  }

  // Timer logic
  useEffect(() => {
    let interval: number;
    if (isButtonDisabled && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsButtonDisabled(false);
    }

    return () => clearInterval(interval);
  }, [isButtonDisabled, otpTimer]);

  if (user?.id) {
    return <Navigate to={'/home'} />;
  }

  return (
    <Box display="flex" flexDirection="column" rowGap={2} maxWidth={400} margin="auto">
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <FormControl component="fieldset">
        <Tabs
          value={signInMethod}
          onChange={(e, newMethod) => setSignInMethod(newMethod as 'credentials' | 'otp')}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="credentials" label="Sign In with Credentials" />
          <Tab value="otp" label="Sign In with OTP" />
        </Tabs>
      </FormControl>

      {signInMethod === 'credentials' && (
        <Box mt={2} display="flex" flexDirection="column" rowGap={2}>
          <TextField
            label="Email address / Mobile Number"
            variant="outlined"
            fullWidth
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            size="small"
          />

          {/* Password */}
          <PasswordField value={password} onChange={handlePasswordChange} />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignIn}
            disabled={passwordStrength < 2}
          >
            Sign In with Credentials
          </Button>
        </Box>
      )}

      {signInMethod === 'otp' && (
        <Box mt={2} display="flex" flexDirection="column" rowGap={2}>
          <PhoneForm onChange={(mobileNumber) => setMobileNumber(mobileNumber)} />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={sendOTP}
            size="small"
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? `Resend OTP in ${otpTimer}s` : 'Send OTP'}
          </Button>
          <OTPInput onChange={setOtp} />
          <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
            Verify OTP
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SignInForm;
