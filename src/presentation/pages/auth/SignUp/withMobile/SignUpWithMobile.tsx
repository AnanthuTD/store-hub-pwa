import { Box, TextField, Button, Typography, Link } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import Header from '../../Header';
import AuthThemeProvider from '../../AuthThemeProvider';

const SignUpWithMobile = () => {
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
                />
                <Button variant="contained" color="slateBlue" fullWidth size="small">
                  Sign up
                </Button>
              </Box>
              <TextField label="OTP" variant="outlined" fullWidth margin="none" size="small" />
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="none"
                size="small"
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="none"
                size="small"
              />
              <TextField label="Password" variant="outlined" fullWidth margin="none" size="small" />
              <Button variant="contained" color="primary" fullWidth>
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
