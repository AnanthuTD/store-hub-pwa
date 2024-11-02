import axiosInstance from '@/config/axios';
import { Button, Form, Input, message, Modal, DatePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

interface BannerCreationModalProps {
  onAdd?: () => void;
}

const BannerCreationModal: React.FC<BannerCreationModalProps> = ({ onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const BannerCreationForm = () => {
    const onFinish = async (values: any) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('subtitle', values.subtitle);
        formData.append('link', values.link);
        formData.append('buttonText', values.buttonText);
        formData.append('startDate', values.startDate.format('YYYY-MM-DD'));
        formData.append('endDate', values.endDate.format('YYYY-MM-DD'));

        if (fileList.length > 0) {
          formData.append('image', fileList[0].originFileObj);
        }

        await axiosInstance.post('/admin/banners/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        message.success('Banner added successfully');
        onAdd?.();
        handleClose();
      } catch (e) {
        console.error('Error during Axios request:', e);
        message.error(
          e.response?.data?.message || 'Failed to add banner! Please try again after some time.',
        );
      }
    };

    return (
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Subtitle"
          name="subtitle"
          rules={[{ required: true, message: 'Please enter the subtitle' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image" valuePropName="fileList">
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Link" name="link">
          <Input />
        </Form.Item>
        <Form.Item
          label="Button Text"
          name="buttonText"
          rules={[{ required: true, message: 'Please enter the button text' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: 'Please select a start date' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: 'Please select an end date' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
    setFileList([]);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add new Banner</Button>
      <Modal title="Create Banner" open={visible} onCancel={handleClose} footer={null}>
        <BannerCreationForm />
      </Modal>
    </div>
  );
};

export default BannerCreationModal;
