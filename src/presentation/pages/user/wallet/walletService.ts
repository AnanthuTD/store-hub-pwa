import axiosInstance from '@/config/axios';
import axios from 'axios';

export interface VerifyTransactionProps {
  razorpayOrderId: string;
  razorpaySignature: string;
  razorpayPaymentId: string;
  transactionId: string;
}

interface VerifyTransactionResponse {
  message: string;
  transaction: any; // You can type this as your Transaction model
}

export class WalletService {
  async getBalance(): Promise<number> {
    const response = await axiosInstance.get('/user/wallet/balance');
    return response.data.balance;
  }

  async creditWallet(amount: number): Promise<void> {
    await axiosInstance.post('/user/wallet/credit', { amount });
  }

  async debitWallet(amount: number): Promise<void> {
    await axiosInstance.post('/user/wallet/debit', { amount });
  }

  async getTransactionHistory(): Promise<any[]> {
    const response = await axiosInstance.get('/user/wallet/transactions');
    return response.data.transactions;
  }

  async createTransaction(transactionAmount: number) {
    if (transactionAmount <= 0) {
      return { message: 'Invalid amount. Please enter a positive number.' };
    }

    try {
      const response = await axiosInstance.post('/user/wallet/transaction/create', {
        amount: transactionAmount,
      });

      const { razorpayOrderId, transactionId, amount, key } = response.data;

      return { razorpayOrderId, transactionId, amount, key, currency: 'INR' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { message: error.response?.data?.message || 'Failed to create transaction' };
      } else {
        return { message: 'Something went wrong while creating the transaction' };
      }
    }
  }
  /**
   * Verifies the Razorpay payment by calling the backend API.
   *
   * @param {VerifyTransactionProps} paymentDetails - The details required for payment verification.
   * @returns {Promise<VerifyTransactionResponse>} - A promise resolving to the verification response.
   */
  async verifyTransaction(
    paymentDetails: VerifyTransactionProps,
  ): Promise<VerifyTransactionResponse> {
    try {
      const response = await axiosInstance.post<VerifyTransactionResponse>(
        '/user/wallet/transaction/verify',
        paymentDetails,
      );
      return response.data;
    } catch (error: any) {
      console.error('Failed to verify transaction:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Failed to verify transaction');
    }
  }

  async cancelTransaction(transactionId: string): Promise<string> {
    try {
      const { data } = await axiosInstance.post<{ message: string }>(
        '/user/wallet/transaction/cancel',
        { transactionId },
      );

      return data.message;
    } catch (error) {
      console.error('Failed to cancel transaction:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.message || 'Failed to cancel transaction');
    }
  }
}
