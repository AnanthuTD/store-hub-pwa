import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface DynamicFormFieldsProps {
  name: string;
  label: string;
}

const DynamicFormFields: React.FC<DynamicFormFieldsProps> = ({ name, label }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          <div className="form-list-header">
            <strong>{label}</strong>
          </div>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'key']}
                fieldKey={[fieldKey, 'key']}
                rules={[{ required: true, message: 'Missing key' }]}
              >
                <Input placeholder="Key" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'value']}
                fieldKey={[fieldKey, 'value']}
                rules={[{ required: true, message: 'Missing value' }]}
              >
                <Input placeholder="Value" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Add {label}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default DynamicFormFields;
