import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Rate, message } from 'antd';
import axiosInstance from '@/config/axios';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(1);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.post('/user/reviews', {
        productId,
        rating,
        message: values.message,
      });
      message.success('Review submitted successfully!');
      setRating(1);
      form.setFieldValue('message', '');
    } catch (error) {
      console.error(error);
      message.error('Error submitting review');
    }
  };

  // fetch review
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axiosInstance.get(`/user/reviews/${productId}/user-review`);
        if (response.data) {
          setRating(response.data.rating);
          form.setFieldValue('message', response.data.message);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReview();
  }, [productId]);

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <h3>Leave a Review</h3>
      <Form.Item label="Rating">
        <Rate value={rating} onChange={(value) => setRating(value)} />
      </Form.Item>
      <Form.Item
        label="Message"
        name="message"
        rules={[{ required: true, message: 'Please input your review message!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
