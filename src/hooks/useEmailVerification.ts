import { useState } from 'react';
import { verifyEmailUseCase } from '@/infrastructure/di';
import { VerifyEmailError } from '@/application/errors';

const useEmailVerification = () => {
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [sentError, setSentError] = useState<string>('');

  const verify = async (email: string) => {
    setSending(true);
    try {
      await verifyEmailUseCase.execute(email);
      setEmailSent(true);
      setEmailError(false);
      setSentError('');
    } catch (error) {
      setEmailError(true);
      setSentError(error instanceof VerifyEmailError ? error.message : 'An unknown error occurred');
    } finally {
      setSending(false);
    }
  };

  return { sending, emailSent, emailError, sentError, verify };
};

export default useEmailVerification;
