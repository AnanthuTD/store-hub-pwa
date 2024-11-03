import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVendorProfile } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import { RootState } from '@/infrastructure/redux/store';
import AvatarUpload from '@/presentation/components/AvatarUpload';
import axiosInstance from '@/config/axios';
import { Button, Divider, Descriptions, Form, Input, message, Modal, Result } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface userProfileType {
  _id: string;
  email?: string;
  mobileNumber?: string;
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

const EditProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data) as unknown as userProfileType;

  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [profileForm] = Form.useForm();
  const navigate = useNavigate();

  // Update avatar handler
  const updateAvatar = useCallback(
    (avatar: string) => {
      profileForm.setFieldsValue({ avatar });
      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          avatar,
        },
      };
      dispatch(updateVendorProfile(updatedUser));
    },
    [dispatch, user, profileForm],
  );

  // Handle profile update
  const handleProfileUpdate = async (values: userProfileType) => {
    try {
      await axiosInstance.post('/user/profile/update-profile', values);
      message.success('Password updated successfully!');
      setPasswordModalVisible(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.message);
      } else message.error('Error updating password');
    }

    const updatedUser = {
      ...user,
      ...values,
      profile: {
        ...user.profile,
        ...values.profile,
      },
    };
    dispatch(updateVendorProfile(updatedUser));
  };

  // Handle password change
  const handlePasswordChange = async (values: { currentPassword: string; newPassword: string }) => {
    try {
      await axiosInstance.post('/user/profile/update-password', values);
      message.success('Password updated successfully!');
      setPasswordModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.message);
      } else message.error('Error updating password');
    }
  };

  if (!user?.profile) {
    return (
      <Result
        status="403"
        title="Not Signed In"
        subTitle="You need to be signed in to view this page."
        extra={
          <Button type="primary" onClick={() => navigate('/signin')}>
            Go to Sign In
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Form
        layout="vertical"
        form={profileForm}
        initialValues={{
          ...user,
          profile: {
            ...user.profile,
          },
        }}
        onFinish={handleProfileUpdate}
      >
        {/* Avatar Upload */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AvatarUpload
            avatar={`${user.profile.avatar}`}
            updateAvatar={updateAvatar}
            url="/user/profile/update/avatar"
          />
        </div>

        {/* Editable Profile Information */}
        <Descriptions title="Profile Information" bordered column={1} style={{ marginTop: 20 }}>
          <Descriptions.Item label="First Name">
            <Form.Item name={['profile', 'firstName']}>
              <Input placeholder="First Name" />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Last Name">
            <Form.Item name={['profile', 'lastName']}>
              <Input placeholder="Last Name" />
            </Form.Item>
          </Descriptions.Item>

          {/*  <Descriptions.Item label="Email">
            <Form.Item name="email" rules={[{ type: 'email', message: 'Invalid email' }]}>
              <Input placeholder="Email" />
            </Form.Item>
          </Descriptions.Item> */}
        </Descriptions>

        <Divider />

        <Button type="primary" htmlType="submit">
          Save Profile
        </Button>
      </Form>

      {/* Change Password Button */}
      <Button
        type="primary"
        style={{ marginTop: 20 }}
        onClick={() => setPasswordModalVisible(true)}
      >
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
