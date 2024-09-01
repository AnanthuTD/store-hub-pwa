import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Link, Switch, Alert } from '@mui/material';
import useShopOwnerSignUp from '@/hooks/ShopOwner/useShopOwnerSignUp';
import Input from '@/presentation/components/Input';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, loading, error, success, clearFeedback } = useShopOwnerSignUp();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    clearFeedback();
    await signUp({ email, password });
  };

  return (
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
            Welcome!
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', mb: 3 }}>
            Use these awesome forms to create your account for free.
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSignUp}>
            <Input
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <Input
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Input
              required
              fullWidth
              name="re-enter-password"
              label="Re-enter Password"
              type="password"
              id="re-enter-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
                my: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Switch color="primary" />
                <Typography variant="body2">Remember me</Typography>
              </Box>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={submitButtonStyles}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'SIGN UP'}
            </Button>
            <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
              Already have an account?{' '}
              <Link href="#" sx={{ color: '#3B82F6', textDecoration: 'none' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const submitButtonStyles = {
  mt: 3,
  mb: 2,
  backgroundColor: '#3B82F6',
  color: '#ffffff',
  borderRadius: 2,
  '&:hover': {
    backgroundColor: '#2A69F1',
  },
};

export default SignUpPage;
