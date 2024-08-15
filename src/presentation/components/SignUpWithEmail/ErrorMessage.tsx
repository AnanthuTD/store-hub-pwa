import React from 'react';
import { Typography } from '@mui/material';

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Typography color="error" gutterBottom>
      {message}
    </Typography>
  );
};

export default ErrorMessage;
