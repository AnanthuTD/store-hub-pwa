// FormTextField.tsx
import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FormTextFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    color: 'white', // Text color
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Label color
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3B82F6', // Default border color
    },
    '&:hover fieldset': {
      borderColor: '#60A5FA', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3B82F6', // Border color when focused
    },
  },
}));

const FormTextField: React.FC<FormTextFieldProps> = ({ label, value, onChange, ...props }) => {
  return (
    <CustomTextField
      label={label}
      fullWidth
      required
      value={value}
      onChange={onChange}
      variant="outlined"
      {...props}
    />
  );
};

export default FormTextField;
