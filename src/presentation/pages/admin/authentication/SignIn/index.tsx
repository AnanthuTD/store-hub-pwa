import React, { useState } from 'react';
import { Box, Button, Checkbox, Grid, Typography, Alert } from '@mui/material';
import Input from '@/presentation/components/Input';
import { useLogin } from '@/hooks/Admin/useLogin';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useLogin(); // Custom hook for login logic

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email, password });
      // Redirect or show success message here
    } catch (err) {
      setError((err as Error).message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
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
          }}
        >
          INSPIRED BY THE FUTURE: <br /> THE VISION UI DASHBOARD
        </Box>
      </Grid>

      {/* Right Side - Form */}
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(0deg, #020515 100%, #090D2E 59%, #0F123B 0%)',
            px: 4,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: 'white', mb: 2 }}>
            Nice to see you!
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: '#ffffff',
              color: '#000000',
              borderRadius: 50,
            }}
            startIcon={<i className="fab fa-google" />} // Assuming FontAwesome is available
            onClick={() => {
              /* Handle Google Sign-In */
            }}
          >
            Sign in with Google
          </Button>
          <Typography variant="body2" color="textSecondary" sx={{ color: 'white' }}>
            or
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
            <Input
              label="Email or Mobile"
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

            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <Checkbox value="remember" color="primary" />
              <Typography variant="body2">Remember me</Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#3B82F6', color: '#ffffff' }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
