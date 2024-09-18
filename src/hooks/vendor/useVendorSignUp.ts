import { authService } from '@/infrastructure/services/vendor/AuthService';
import { useState } from 'react';

interface SignUpParams {
  email: string;
  password: string;
}

function useVendorSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const signUp = async ({ email, password }: SignUpParams) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await authService.signUp({ email, password }); // Assuming signUp method exists in authService

      if (response.success)
        // Handle success response
        setSuccess(response?.message || `A varification mail has been sent to ${email}`);
      else {
        setError(response?.message as string);
      }
      // Optionally, redirect the user to the login page
    } catch (err) {
      // Handle error response
      setError('Sign up failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearFeedback = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    signUp,
    loading,
    error,
    success,
    clearFeedback,
  };
}

export default useVendorSignUp;
