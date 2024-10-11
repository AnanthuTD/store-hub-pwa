import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import axiosInstance from '@/config/axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';

const ReturnedItemsTable: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedStore = useSelector((state: RootState) => state.vendor.selectedStore);

  useEffect(() => {
    fetchReturnRequestedItems();
  }, []);

  const fetchReturnRequestedItems = async () => {
    try {
      const response = await axiosInstance.get('/vendor/return/returned', {
        params: { storeId: selectedStore._id },
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch return requested items');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: ['items', 'productName'],
      key: 'productName',
    },
    {
      title: 'Variant',
      dataIndex: ['items', 'variantId'],
      key: 'variantName',
    },
    {
      title: 'Quantity',
      dataIndex: ['items', 'quantity'],
      key: 'quantity',
    },
    {
      title: 'Return Status',
      dataIndex: ['items', 'returnStatus'],
      key: 'returnStatus',
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default ReturnedItemsTable;
