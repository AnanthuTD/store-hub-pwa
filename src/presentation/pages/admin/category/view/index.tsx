import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, notification, Upload } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import axiosInstance from '@/config/axios';
import type { RcFile } from 'antd/es/upload/interface';

const { Option } = Select;

const CategoriesList = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<RcFile | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/admin/categories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (category: any) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setImageFile(null); // Reset image file when closing modal
  };

  const handleSave = async (values: any) => {
    try {
      const formData = new FormData();

      // Append form data fields (category fields) to FormData
      formData.append('name', values.name);
      formData.append('status', values.status);
      formData.append('description', values.description);

      // Append the image file to FormData if a new image was selected
      if (imageFile) {
        formData.append('image', imageFile);
      }

      // Send FormData with category data and image file
      await axiosInstance.put(`/admin/categories/${editingCategory._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notification.success({ message: 'Category updated successfully' });
      setIsModalVisible(false);
      setEditingCategory(null);
      setImageFile(null);
      fetchCategories();
    } catch (error) {
      notification.error({ message: 'Error updating category' });
      console.error(error);
    }
  };

  const handleImageChange = (file: RcFile) => {
    setImageFile(file); // Store only one file
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string) => (
        <img src={imageUrl} alt="Category" style={{ width: '50px', height: '50px' }} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)} />
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={categories} columns={columns} rowKey="_id" />
      <Modal title="Edit Category" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form initialValues={editingCategory} onFinish={handleSave} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              beforeUpload={(file) => {
                handleImageChange(file); // Only store the single file selected
                return false; // Prevent auto-upload
              }}
              listType="picture"
              maxCount={1} // Ensure only one file can be selected
              defaultFileList={
                editingCategory?.imageUrl
                  ? [{ uid: '-1', name: 'image', status: 'done', url: editingCategory.imageUrl }]
                  : []
              }
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>Upload New Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesList;
