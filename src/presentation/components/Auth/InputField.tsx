import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const SignUpInputField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  disabled = false,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="none"
      size="small"
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      autoComplete="new-password" // Set to a unique value
      name={Math.random().toString(36).substring(2, 15)} // Use a unique or meaningless name
    />
  );
};

export default SignUpInputField;
