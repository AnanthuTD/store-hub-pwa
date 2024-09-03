import React, { useState } from 'react';
import { Alert, Button, Grid } from '@mui/material';
import Header from '../../Header';
import AuthImage from '../../AuthImage';
import { Link } from 'react-router-dom';
import AuthThemeProvider from '../../AuthThemeProvider';
import TokenVerification from '@/presentation/components/SignUpWithEmail/TokenVerification';
import SignUpForm from '@/presentation/components/SignUpWithEmail/Form';

const SignUpWithEmail: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleTokenVerified = (email: string) => {
    setEmail(email);
    setErrorMessage('');
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <AuthThemeProvider>
      <Header variant="signin" />
      <TokenVerification onTokenVerified={handleTokenVerified} onError={handleError} />
      <Grid container spacing={5} marginInline={5} marginTop={1}>
        <Grid
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
          {errorMessage && (
            <Alert
              severity="error"
              action={
                <Link to={'/signup'}>
                  <Button variant="outlined">Sign Up</Button>
                </Link>
              }
            >
              {errorMessage}
            </Alert>
          )}
          {email && <SignUpForm email={email} />}
        </Grid>
        <Grid
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
        </Grid>
      </Grid>
    </AuthThemeProvider>
  );
};

export default SignUpWithEmail;
