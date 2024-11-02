import React, { useEffect, useState } from 'react';
import { Table, Button, message, Image } from 'antd';
import axios from 'axios';
import axiosInstance from '@/config/axios';

interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  link?: string;
  startDate: string;
  endDate: string;
  priority: number;
}

const BannerTable: React.FC<{ triggerRefetch: any }> = ({ triggerRefetch }) => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetchBanners();
  }, [triggerRefetch]);

  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get<Banner[]>('/admin/banners');
      setBanners(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(
          e.response?.data?.message || 'Failed to fetch banner! Please try again after some time.',
        );
      } else message.error('Failed to fetch banners');
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      await axiosInstance.delete(`/admin/banners/${id}`);
      message.success('Banner deleted successfully');
      fetchBanners();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(
          e.response?.data?.message || 'Failed to delete banner! Please try again after some time.',
        );
      } else message.error('Failed to delete banner');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Image URL',
      key: 'imageUrl',
      render: (_: any, record: Banner) => {
        return <Image src={record.imageUrl} />;
      },
    },
    { title: 'Link', dataIndex: 'link', key: 'link' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Banner) => (
        <Button danger onClick={() => deleteBanner(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={banners} rowKey="_id" pagination={{ pageSize: 5 }} />;
};

export default BannerTable;
