import axiosInstance from '@/config/axios';
import axios from 'axios';

export async function sendOTP(countryCode: string, mobileNumber: string): Promise<OTPResponse> {
  try {
    const response = await axiosInstance.post('/auth/otp/send', { countryCode, mobileNumber });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      throw new Error(data?.error || 'An error occurred while sending OTP.');
    } else {
      throw new Error('Network error. Please check your connection.');
    }
  }
}

export async function verifyOTP(otp: string) {
  try {
    const response = await axiosInstance.post('/partner/otp/verify', { otp });

    return {
      message: response.data.message,
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const { status, data } = err.response;

      if (status === 400) {
        return { error: data.error || 'Invalid request. Please check your input.' };
      } else if (status === 404) {
        return { error: 'User not found.' };
      } else if (status === 500) {
        return { error: 'Server error. Please try again later.' };
      } else {
        return { error: data.message || 'An unknown error occurred.' };
      }
    } else {
      return { error: 'Network error. Please check your connection.' };
    }
  }
}
