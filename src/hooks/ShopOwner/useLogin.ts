import { useState } from 'react';
import { authService } from '@/infrastructure/services/ShopOwner/AuthService';

interface SignInParams {
  email: string;
  password: string;
}

function useShopOwnerSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const signIn = async ({ email, password }: SignInParams) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { shopOwner } = await authService.login({ email, password });

      // Handle success response
      setSuccess('Sign in successful!');

      return shopOwner;
      // Optionally, you could redirect the user or trigger any other side effects here
    } catch (err) {
      // Handle error response
      setError(
        ((err as Error).message as string) ||
          'Sign in failed. Please check your credentials and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const clearFeedback = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    signIn,
    loading,
    error,
    success,
    clearFeedback,
  };
}

export default useShopOwnerSignIn;
