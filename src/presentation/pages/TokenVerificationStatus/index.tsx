import React from 'react';
import { useSearchParams } from 'react-router-dom';
import TokenVerificationStatus from './TokenVerificationStatus';

const TokenVerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const message = searchParams.get('message') || 'The token is invalid or has expired.';
  const email = searchParams.get('email');

  // Default props for the component
  const props = {
    title: 'Token Verification Failed',
    message: message as string,
    nextSteps: 'Please request a new verification email or contact support.',
    requestNewTokenUrl: `${
      import.meta.env.VITE_API_BASE_URL
    }/shopOwner/resend-token?email=${email}`,
    supportUrl: '/contact-support',
  };

  return (
    <div>
      <TokenVerificationStatus {...props} />
    </div>
  );
};

export default TokenVerificationPage;
