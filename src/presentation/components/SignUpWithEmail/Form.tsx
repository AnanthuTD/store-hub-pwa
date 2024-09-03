import React, { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorMessage from '@/presentation/components/SignUpWithEmail/ErrorMessage';
import SignUpInputField from '@/presentation/components/Auth/InputField';
import SubmitButton from '@/presentation/components/Auth/Button';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/UserAuthRepository';
import { RegisterUserError } from '@/application/errors';

interface SignUpFormProps {
  email: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ email }) => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(null);

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
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <SubmitButton onClick={handleSubmit} label="Sign up" />
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
  );
};

export default SignUpForm;
