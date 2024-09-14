import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Select, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from '@/config/axios';

const { Option } = Select;

const AddCategory = () => {
  const [form] = Form.useForm();
  const [parentCategories, setParentCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch parent categories from API
    const fetchParentCategories = async () => {
      try {
        const response = await axiosInstance.get('/admin/categories');
        setParentCategories(response.data);
      } catch (error) {
        message.error('Failed to load parent categories');
      }
    };
    fetchParentCategories();
  }, []);

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('parentCategory', values.parentCategory || '');
      formData.append('status', 'active'); // Set default status

      // Append the image file
      if (file) {
        formData.append('image', file);
      }

      await axiosInstance.post('/admin/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('Category added successfully');
      form.resetFields();
      setImageUrl('');
      setFile(null);
    } catch (error) {
      message.error('Failed to add category');
    }
  };

  const handleImageChange = ({ file }) => {
    setFile(file.originFileObj);

    // Generate image URL for preview
    const url = URL.createObjectURL(file.originFileObj);
    setImageUrl(url);
  };

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <Typography.Title level={2}>Add New Category</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ parentCategory: null }}
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please enter the category name' }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Enter category description" />
        </Form.Item>

        <Form.Item name="parentCategory" label="Parent Category">
          <Select
            showSearch
            placeholder="Select parent category"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {parentCategories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Category Image">
          <Upload
            name="image"
            listType="picture"
            className="upload-list-inline"
            showUploadList={false}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="category"
              style={{ marginTop: 16, width: '100px', height: '100px', objectFit: 'cover' }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategory;
