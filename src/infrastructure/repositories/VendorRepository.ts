import { IVendor } from '@/domain/entities/IVendor';
import axios from 'axios';

export async function fetchProfile(): Promise<IVendor | null> {
  try {
    const response = await axios.get('/api/vendor/auth/profile');

    return response.data;
  } catch (err) {
    return null;
  }
}
