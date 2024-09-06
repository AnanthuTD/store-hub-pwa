import axiosInstance from '@/config/axios';
import { IDeliveryPartner } from '@/domain/entities/DeliveryPartner';
import { OTPResponse } from '@/domain/models/AuthModels';
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

export async function verifyOTP(otp: string, phone: string) {
  try {
    const response = await axiosInstance.post('/partner/auth/otp/verify', {
      otp,
      countryCode: '+91',
      phone,
    });

    return {
      message: response.data.message,
      partner: response.data.partner || null,
      documentStatus: response.data.documentStatus || null,
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

export async function fetchProfile(): Promise<IDeliveryPartner | null> {
  try {
    const response = await axiosInstance.get('/partner/profile');

    return response.data;
  } catch (err) {
    return null;
  }
}
