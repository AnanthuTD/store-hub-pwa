import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Link, Switch } from '@mui/material';
import Input from '../components/Input';
import { message } from 'antd';

function SignUpWithOTP() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleReEnterPasswordChange = (event) => {
    setReEnterPassword(event.target.value);
  };

  const handleSendOtp = () => {
    // Logic to send OTP
    message.info('OTP Sent!');
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
            Use these awesome forms to login or create a new account for your project for free.
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Input
              label="Mobile Number"
              name="mobileNumber"
              id="mobileNumber"
              type="tel"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              required
            />
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 2, color: 'white', borderColor: '#3B82F6' }}
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
            <Input
              label="OTP"
              name="otp"
              id="otp"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              required
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
            <Input
              label="Re-enter Password"
              name="reEnterPassword"
              id="reEnterPassword"
              type="password"
              value={reEnterPassword}
              onChange={handleReEnterPasswordChange}
              required
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
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#3B82F6',
                color: '#ffffff',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#2A69F1',
                },
              }}
            >
              SIGN UP
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

export default SignUpWithOTP;
