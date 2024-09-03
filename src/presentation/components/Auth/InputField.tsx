import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

/* interface SignUpInputFieldProps {
  label: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
} */

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
    />
  );
};

export default SignUpInputField;
