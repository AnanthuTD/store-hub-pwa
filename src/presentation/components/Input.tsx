import React from 'react';
import { TextField } from '@mui/material';

interface InputProps {
  label: string;
  name: string;
  id: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  id,
  type = 'text',
  value,
  onChange,
  fullWidth = true,
  required = false,
  autoComplete,
  autoFocus = false,
}) => {
  return (
    <TextField
      margin="normal"
      required={required}
      fullWidth={fullWidth}
      id={id}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ffffff',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#ffffff',
        },
        '& .MuiInputBase-input': {
          color: '#ffffff',
        },
      }}
    />
  );
};

export default Input;
