import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateVendorProfile } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import { RootState } from '@/infrastructure/redux/store';
import AvatarUpload from '@/presentation/components/AvatarUpload';
import axiosInstance from '@/config/axios';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Descriptions, Form, Input, message, Modal, Tag } from 'antd';
import axios from 'axios';

interface VendorProfileType {
  _id: string;
  email: string;
  phone?: string;
  isVerified: boolean;
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

const EditProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const vendor = useSelector((state: RootState) => state.vendor.data) as VendorProfileType;

  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Update avatar handler
  const updateAvatar = useCallback(
    (avatar: string) => {
      const updatedVendor = {
        ...vendor,
        profile: {
          ...vendor.profile,
          avatar,
        },
      };
      dispatch(updateVendorProfile(updatedVendor));
    },
    [dispatch, vendor],
  );

  // Handle password change
  const handlePasswordChange = async (values: { currentPassword: string; newPassword: string }) => {
    try {
      await axiosInstance.post('/vendor/profile/update-password', values);
      message.success('Password updated successfully!');
      setPasswordModalVisible(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.message);
      } else message.error('Error updating password');
    }
  };

  if (!vendor?.profile) {
    return null;
  }

  return (
    <div>
      {/* Back Button */}
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Link to="/partner/account">
          <LeftOutlined style={{ fontSize: '20px' }} />
        </Link>
      </div>

      <Divider />

      {/* Avatar Upload */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AvatarUpload
          avatar={vendor?.profile?.avatar || ''}
          updateAvatar={updateAvatar}
          url="/vendor/profile/update/avatar"
        />
      </div>

      {/* Vendor Information */}
      <Descriptions title="Profile Information" bordered column={1} style={{ marginTop: 20 }}>
        <Descriptions.Item label="First Name">{vendor.profile?.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{vendor.profile?.lastName}</Descriptions.Item>
        <Descriptions.Item label="Email">{vendor.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{vendor.phone}</Descriptions.Item>
        <Descriptions.Item label="Verification Status">
          <Tag color={vendor.isVerified ? 'green' : 'red'}>
            {vendor.isVerified ? 'Verified' : 'Not Verified'}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Change Password Button */}
      <Button type="primary" onClick={() => setPasswordModalVisible(true)}>
        Change Password
      </Button>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        open={isPasswordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handlePasswordChange}>
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter a new password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Update Password
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default React.memo(EditProfilePage);
