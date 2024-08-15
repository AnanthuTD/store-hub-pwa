import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '@/presentation/components/Loading';
import { AuthRepositoryImpl } from '@/infrastructure/repositories/AuthRepositoryImpl';

interface TokenVerificationProps {
  onTokenVerified: (email: string) => void;
  onError: (message: string) => void;
}

const TokenVerification: React.FC<TokenVerificationProps> = ({ onTokenVerified, onError }) => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const [loading, setLoading] = useState<boolean>(false);

  const verifyTokenHandler = useCallback(
    async (token: string) => {
      setLoading(true);
      try {
        const response = await new AuthRepositoryImpl().verifyToken(token);
        if (response.email) {
          onTokenVerified(response.email);
        } else {
          onError(
            response.message || 'Token verification failed. Please check your token and try again.',
          );
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        onError('An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    },
    [onTokenVerified, onError],
  );

  useEffect(() => {
    if (token) {
      verifyTokenHandler(token);
    }
  }, [token, verifyTokenHandler]);

  if (loading) {
    return <Loading />;
  }

  return null;
};

export default TokenVerification;
