import React, { useEffect, useState } from 'react';
import { Table, Modal, Avatar, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { User } from '@/domain/entities/User';
import axiosInstance from '@/config/axios';

const UsersListPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axiosInstance.get('/admin/users').then(({ data }) => {
      setUsers(data.users);
    });
  }, []);

  // Open Modal with user details
  const showUserDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  // Define table columns
  const columns: ColumnsType<User> = [
    {
      title: 'Avatar',
      dataIndex: 'profile',
      key: 'avatar',
      render: (profile) => (
        <Avatar src={profile?.avatar} size="large">
          {profile?.firstName[0]}
        </Avatar>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'profile',
      key: 'name',
      render: (profile) => `${profile?.firstName} ${profile?.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => showUserDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          pageSize: 2, // Adjust this number to control how many users to display per page
        }}
      />

      {/* Modal for User Details */}
      <Modal
        title={`User Details - ${selectedUser?.profile?.firstName} ${selectedUser?.profile?.lastName}`}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedUser && (
          <div>
            <Avatar src={selectedUser.profile?.avatar} size={100} style={{ marginBottom: 16 }} />
            <p>
              <strong>Name:</strong> {selectedUser.profile?.firstName}{' '}
              {selectedUser.profile?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Mobile Number:</strong> {selectedUser.mobileNumber}
            </p>
            <p>
              <strong>Wallet Balance:</strong> ${selectedUser.walletBalance}
            </p>
            {/* <p>
              <strong>Status:</strong> {selectedUser.status}
            </p>
            <p>
              <strong>Last Login:</strong> {selectedUser.lastLogin?.toLocaleString()}
            </p> */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UsersListPage;
