import React, { useEffect, useState } from 'react';
import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Divider,
  Card,
  Space,
  notification,
} from 'antd';
import useVendorSignUp from '@/hooks/vendor/useVendorSignUp';
import CheckShopOwnerLoggedIn from '../components/CheckShopOwnerLoggedIn';
import { passwordRules } from '@/presentation/components/passwordRules';

const { Content } = Layout;
const { Title, Text } = Typography;

const SignUpPage: React.FC = () => {
  const { signUp, loading, error, success, clearFeedback } = useVendorSignUp();
  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Check local storage for saved email
    const savedEmail = localStorage.getItem('vendorEmail');
    if (savedEmail) {
      form.setFieldValue('email', savedEmail);
      setRememberMe(true);
    }
  }, [form]);

  useEffect(() => {
    if (success) {
      notification.success({
        message: `Email send to ${form.getFieldValue('email')}`,
        description: 'Verify your email address to continue...',
        onClose: clearFeedback,
        duration: 0,
      });
      form.resetFields();
    }
    if (error) {
      notification.error({
        message: 'Sign-up in failed!',
        description: error,
        onClose: clearFeedback,
        duration: 5,
      });
    }
  }, [success, error, clearFeedback, form]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    clearFeedback();
    try {
      await signUp({ email: values.email, password: values.password });

      // Save email to local storage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem('vendorEmail', values.email);
      } else {
        localStorage.removeItem('vendorEmail');
      }
    } catch (err) {
      notification.error({
        message: 'Sign Up Failed',
        description: (err as Error).message || 'Failed to sign up. Please try again.',
        placement: 'topRight',
        duration: 5,
      });
    }
  };

  return (
    <CheckShopOwnerLoggedIn>
      <Layout
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f0f2f5 0%, #ffffff 100%)',
        }}
      >
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundImage: 'url("/vendor/banner.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              padding: '40px',
              borderRadius: '12px',
              marginRight: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              height: '85vh',
            }}
          >
            <Typography.Title level={2} style={{ color: '#fff' }}>
              Welcome to the Vendor Portal
            </Typography.Title>
            <Typography.Paragraph style={{ color: '#fff' }}>
              Sign up to manage your shop&apos;s inventory and track your orders.
            </Typography.Paragraph>
          </div>

          <Card
            style={{
              width: '450px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffffff',
              height: '85vh',
            }}
            bordered={false}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Title level={3} style={{ textAlign: 'center', marginBottom: 0, color: '#3B3B3B' }}>
                Create Your Account
              </Title>
              <Text
                type="secondary"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginBottom: '24px',
                  color: '#888',
                }}
              >
                Join us and start selling your products today!
              </Text>

              <Divider plain style={{ color: '#888' }}>
                or
              </Divider>

              <Form layout="vertical" onFinish={handleSubmit} form={form}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input
                    placeholder="Enter your email"
                    autoComplete="email"
                    autoFocus
                    size="large"
                  />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={passwordRules}>
                  <Input.Password
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ color: '#888' }}
                  >
                    Remember me
                  </Checkbox>
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{
                    width: '100%',
                    borderRadius: '6px',
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
                  }}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </Form>
            </Space>
          </Card>
        </Content>
      </Layout>
    </CheckShopOwnerLoggedIn>
  );
};

export default SignUpPage;
