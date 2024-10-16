import React from 'react';
import { Button, message } from 'antd';
import axiosInstance from '@/config/axios';

interface DownloadInvoiceButtonProps {
  orderId: string;
}

const DownloadInvoiceButton: React.FC<DownloadInvoiceButtonProps> = ({ orderId }) => {
  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(`/user/order/${orderId}/invoice`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      message.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Error downloading invoice:', error);
      message.error('Failed to download the invoice.');
    }
  };

  return (
    <Button type="primary" onClick={handleDownload}>
      Download Invoice
    </Button>
  );
};

export default DownloadInvoiceButton;
