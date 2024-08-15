import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Link,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import Header from '../Header';
import AuthImage from '../AuthImage';
import useEmailVerification from '@/hooks/useEmailVerification';
import PhoneForm, { MobileNumberObject } from '@/presentation/components/SignUp/PhoneForm';
import EmailForm from '@/presentation/components/SignUp/EmailForm';
import AuthThemeProvider from '../AuthThemeProvider';
// import EmailForm from '../../../components/SignUp/EmailForm';
// import PhoneForm, { MobileNumberObject } from '../../../components/SignUp/PhoneForm';

const SignUp = () => {
  const [inputType, setInputType] = useState('email');
  const [email, setEmail] = useState('');

  const { sending, emailSent, emailError, sentError, verify } = useEmailVerification();

  const [mobileNumber, setMobileNumber] = useState<MobileNumberObject>({
    countryCode: '',
    mobileNumber: '',
  });

  const handleInputTypeChange = (e: SelectChangeEvent) => {
    setInputType(e.target.value);
  };

  const handleSubmit = () => {
    if (inputType === 'email') {
      verify(email);
    } else {
      console.log('Not implemented yet ', mobileNumber);
    }
  };

  function handleMobileNumberChange({ countryCode, mobileNumber }: MobileNumberObject) {
    setMobileNumber({ countryCode, mobileNumber });
  }

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

            <Select
              value={inputType}
              onChange={handleInputTypeChange}
              fullWidth
              displayEmpty
              variant="outlined"
              size="small"
              sx={{ marginBottom: '1rem' }}
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phone">Phone Number</MenuItem>
            </Select>

            {inputType === 'email' ? (
              <EmailForm email={email} setEmail={setEmail} emailError={emailError} />
            ) : (
              <PhoneForm onChange={handleMobileNumberChange} />
            )}

            <Box marginTop={'16px'}>
              <Button
                variant="contained"
                color="slateBlue"
                fullWidth
                onClick={handleSubmit}
                disabled={sending}
              >
                {sending ? 'Sending...' : emailSent ? 'Sign In' : 'Sign Up'}
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
          height="100vh"
          textAlign="left"
        >
          <AuthImage />
        </Grid2>
      </Grid2>

      <Snackbar open={!!sentError || emailSent} autoHideDuration={6000}>
        <Alert severity={emailError ? 'error' : 'success'} sx={{ width: '100%' }}>
          {sentError || `Verification Code sent to ${email || mobileNumber.mobileNumber}`}
        </Alert>
      </Snackbar>
    </AuthThemeProvider>
  );
};

export default SignUp;
