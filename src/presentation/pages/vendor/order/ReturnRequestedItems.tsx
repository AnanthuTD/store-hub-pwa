import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import axiosInstance from '@/config/axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/infrastructure/redux/store';

const ReturnRequestedItemsTable: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const selectedStore = useSelector((state: RootState) => state.vendor.selectedStore);

  useEffect(() => {
    fetchReturnRequestedItems();
  }, []);

  const fetchReturnRequestedItems = async () => {
    try {
      const response = await axiosInstance.get('/vendor/return/return-requested-items', {
        params: {
          storeId: selectedStore?._id,
        },
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch return requested items');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptReturn = (item: any) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleConfirmRefund = async () => {
    try {
      // Call API to process the refund
      await axiosInstance.post('/vendor/return/accept-return', {
        orderId: selectedItem?._id,
        itemId: selectedItem?.items?._id,
        storeId: selectedStore?._id, // Assuming each item has a unique _id
      });

      message.success('Return accepted and refund processed.');
      fetchReturnRequestedItems(); // Refresh the table
    } catch (error) {
      message.error('Failed to process refund.');
    } finally {
      setIsModalVisible(false);
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
    {
      title: 'Action',
      key: 'action',
      render: (_: any, item: any) =>
        item.items.returnStatus === 'Requested' ? (
          <Button type="primary" onClick={() => handleAcceptReturn(item)}>
            Accept Return
          </Button>
        ) : null,
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record._id} // Assuming orders have a unique _id
        loading={loading}
        pagination={false}
      />

      <Modal
        title="Confirm Return"
        open={isModalVisible}
        onOk={handleConfirmRefund}
        onCancel={() => setIsModalVisible(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>
          You are about to accept the return. The refund amount will be deducted from the
          user&apos;s wallet. Are you sure you want to proceed?
        </p>
      </Modal>
    </div>
  );
};

export default ReturnRequestedItemsTable;
