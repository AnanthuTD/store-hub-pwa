import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SignUpInputField from '@/presentation/components/Auth/InputField';
import SubmitButton from '@/presentation/components/Auth/Button';
import ErrorMessage from '@/presentation/components/SignUpWithEmail/ErrorMessage';
import checkPasswordStrength from '@/infrastructure/utils/checkPasswordStrength';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/UserAuthRepository';
import { RegisterUserError } from '@/application/errors';
import { Box, Typography } from '@mui/material';

const SignUpForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);

    if (!checkPasswordStrength(password)) {
      setError('Password does not meet the required strength criteria.');
      return;
    }

    try {
      const response = await new AuthRepositoryImpl().registerUser({
        firstName,
        lastName,
        password,
        token: token!,
      });
      if (response.status === 201) {
        navigate('/signin');
      }
    } catch (err) {
      if (err instanceof RegisterUserError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  // Update password strength status
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    console.log(newPassword, checkPasswordStrength(newPassword));
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  return (
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
        <ErrorMessage message={error} />

        <SignUpInputField label="Email address" value={email} disabled />

        <SignUpInputField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <SignUpInputField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <SignUpInputField
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          type="password"
          helperText={
            passwordStrength === false
              ? 'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character.'
              : ''
          }
          error={passwordStrength === false}
        />
        <SubmitButton onClick={handleSubmit} label="Sign up" />
      </Box>
      <Box marginTop="16px">
        <Typography variant="body2">
          By signing up, you agree to the <Link to="#">Terms of use</Link> and{' '}
          <Link to="#">Privacy Policy</Link>.
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
