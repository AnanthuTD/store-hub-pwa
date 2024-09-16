import React from 'react';
import { Form, Input, Select } from 'antd';
import { validationRules } from '../utils/validationRules';

const categories = ['Electronics', 'Clothing', 'Groceries'];

const ShopFormFields = () => {
  return (
    <>
      <Form.Item label="Shop Name" name="name" rules={validationRules.name}>
        <Input placeholder="Enter shop name" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={validationRules.email}>
        <Input placeholder="Enter shop email" />
      </Form.Item>

      <Form.Item label="Phone" name="phone" rules={validationRules.phone}>
        <Input placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item label="Category" name="category" rules={validationRules.category}>
        <Select placeholder="Select a category">
          {categories.map((cat) => (
            <Select.Option key={cat} value={cat}>
              {cat}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default ShopFormFields;
