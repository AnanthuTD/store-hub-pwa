import { Box, Typography, Link, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import AuthThemeProvider from '../components/AuthThemeProvider';
import Header from '../components/Header';
// import GoogleSignUpButton from '@/presentation/components/Auth/GoogleSignUpButton';
import SignInForm from '@/presentation/components/SignIn/SignInForm';
import ReactAuthGoogle from '@/presentation/components/Auth/ReactAuthGoogle';

const SignIn = () => {
  return (
    <AuthThemeProvider>
      <Header variant="signup" />
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
          textAlign="center"
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
              Discover the Best Local Deals and Stores Near You
            </Typography>

            {/* Google sign in button */}
            {/* <GoogleSignUpButton api="user/auth/google" /> */}

            <ReactAuthGoogle api="user/auth/v2/google" role="user" />

            <Box my={2} width="100%">
              <Divider>OR</Divider>
            </Box>

            {/* Sign in form */}
            <SignInForm />

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

export default SignIn;
