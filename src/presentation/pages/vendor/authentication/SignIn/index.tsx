import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Link,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import Input from '@/presentation/components/Input';
import useShopOwnerSignIn from '@/hooks/vendor/useLogin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/infrastructure/redux/store';
import { login } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import CheckShopOwnerLoggedIn from '../components/CheckShopOwnerLoggedIn';

function SignIn() {
  // const shopOwner = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading, error, success, clearFeedback } = useShopOwnerSignIn();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    const shopOwner = await signIn({ email, password });
    if (shopOwner) {
      dispatch(login(shopOwner));
    }
  };

  useEffect(() => {
    if (success) navigate('/vendor/dashboard');
  }, [success, navigate]);

  return (
    <CheckShopOwnerLoggedIn>
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* Left Side - Image */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("/admin-signin.png")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              background: 'rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
              p: 3,
            }}
          >
            INSPIRED BY THE FUTURE: <br /> THE VISION UI DASHBOARD
          </Box>
        </Grid>

        {/* Right Side - Form */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(0deg, #020515 100%, #090D2E 59%, #0F123B 0%)',
            px: 3,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 400,
              p: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: 'white', mb: 2, textAlign: 'center' }}
            >
              Sign In
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', mb: 3 }}>
              Welcome back! Please enter your details to sign in.
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Input
                label="Email"
                name="email"
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                autoComplete="email"
                autoFocus
              />
              <Input
                label="Password"
                name="password"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  backgroundColor: '#3B82F6',
                  color: '#ffffff',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#2A69F1',
                  },
                }}
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'SIGN IN'}
              </Button>
              <a href={`/api/vendor/auth/google`}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mb: 2,
                    color: 'white',
                    borderColor: '#3B82F6',
                  }}
                  // onClick={handleGoogleSignIn}
                >
                  Sign in with Google
                </Button>
              </a>
              <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <Link href="/vendor/signup" sx={{ color: '#3B82F6', textDecoration: 'none' }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Snackbar for feedback */}
        <Snackbar open={!!error || !!success} autoHideDuration={6000} onClose={clearFeedback}>
          <Alert onClose={clearFeedback} severity={error ? 'error' : 'success'}>
            {error || success}
          </Alert>
        </Snackbar>
      </Grid>
    </CheckShopOwnerLoggedIn>
  );
}

export default SignIn;
