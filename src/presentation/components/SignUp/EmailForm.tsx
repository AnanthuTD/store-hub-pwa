import React from 'react';
import { TextField } from '@mui/material';

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  emailError: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ email, setEmail, emailError }) => (
  <TextField
    label="Email address"
    variant="outlined"
    fullWidth
    margin="none"
    size="small"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={emailError}
    helperText={emailError ? 'Incorrect entry.' : ''}
  />
);

export default EmailForm;
