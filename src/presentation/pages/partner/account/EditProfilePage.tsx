import axiosInstance from '@/config/axios';
import { updatePartnerProfile } from '@/infrastructure/redux/slices/partner/partnerSlice';
import { RootState } from '@/infrastructure/redux/store';
import AvatarUpload from '@/presentation/components/AvatarUpload'; // Assuming typo fixed in import
import { LeftOutlined } from '@ant-design/icons';
import { Divider, Form, Input, Button, message } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function EditProfilePage() {
  const partner = useSelector((state: RootState) => state.partner.data);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  // Update avatar function
  const updateAvatar = (avatar: string) => {
    const updatedPartner = {
      ...partner,
      profile: {
        ...partner.profile,
        avatar: avatar,
      },
    };
    dispatch(updatePartnerProfile(updatedPartner));
  };

  // Handle form submission to update profile details
  const onFinish = (values: any) => {
    axiosInstance
      .post('/partner/update-profile', values)
      .then(() => {
        message.success('Profile updated successfully!');
      })
      .catch(() => {
        message.error('Error updating profile');
      });

    const updatedPartner = {
      ...partner,
      profile: {
        ...partner.profile,
        firstName: values.firstName,
        lastName: values.lastName,
      },
    };

    dispatch(updatePartnerProfile(updatedPartner));
  };

  return (
    <div>
      {/* Back button */}
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Link to={'/partner/account'}>
          <LeftOutlined style={{ fontSize: '20px' }} />
        </Link>
      </div>

      <Divider />

      {/* Avatar Upload */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AvatarUpload
          avatar={partner?.profile?.avatar}
          updateAvatar={updateAvatar}
          url={'/partner/profile/update/avatar'}
        />
      </div>

      {/* Form for editing profile details */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          firstName: partner?.profile?.firstName || '',
          lastName: partner?.profile?.lastName || '',
          // email: partner?.profile?.email || '',
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        {/*   <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Please input your email address!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditProfilePage;
