import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';

interface PasswordFieldProps {
  onChange: (value: string, strength: number) => void; // Pass both value and strength to parent
  value: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ onChange, value }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevent default behavior for mouse events
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Check password strength
  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1; // Minimum length
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase
    if (/[0-9]/.test(password)) strength += 1; // Number
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special character
    return strength;
  };

  // Calculate strength whenever value changes
  const strength = passwordStrength(value);

  const strengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Moderate';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return '';
    }
  };

  const strengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'green';
      case 4:
        return 'darkgreen';
      default:
        return 'inherit';
    }
  };

  // Call the parent onChange with both value and strength
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newStrength = passwordStrength(newValue);
    onChange(newValue, newStrength); // Pass value and strength to parent
  };

  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          value={value}
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      {/* Password strength indicator */}
      <Box mt={1}>
        <Typography variant="body2" color={strengthColor(strength)}>
          Strength: {strengthLabel(strength)}
        </Typography>
      </Box>
    </>
  );
};

export default PasswordField;
