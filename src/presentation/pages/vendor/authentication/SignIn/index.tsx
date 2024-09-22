import React, { useEffect } from 'react';
import { Layout, Form, Input, Button, Typography, Divider, Card, Space, notification } from 'antd';
import useShopOwnerSignIn from '@/hooks/vendor/useLogin';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/infrastructure/redux/store';
import { login } from '@/infrastructure/redux/slices/vendor/vendorSlice';
import CheckShopOwnerLoggedIn from '../components/CheckShopOwnerLoggedIn';
import { passwordRules } from '@/presentation/components/passwordRules';
import GoogleSignUpButton from '@/presentation/components/Auth/GoogleSignUpButton';

const { Content } = Layout;
const { Title, Text } = Typography;

function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const { signIn, loading, error, success, clearFeedback } = useShopOwnerSignIn();
  const navigate = useNavigate();

  const handleSignIn = async (values: { email: string; password: string }) => {
    clearFeedback();
    const shopOwner = await signIn(values);
    if (shopOwner) {
      dispatch(login(shopOwner));
    }
  };

  useEffect(() => {
    if (success) {
      notification.success({
        message: 'Sign in successful!',
        description: 'Redirecting to your dashboard...',
        onClose: clearFeedback,
        duration: 3,
      });
      navigate('/vendor/dashboard');
    }
    if (error) {
      notification.error({
        message: 'Sign in failed!',
        description: error,
        onClose: clearFeedback,
        duration: 3,
      });
    }
  }, [success, error, navigate, clearFeedback]);

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
            <Title level={2} style={{ color: '#fff' }}>
              Welcome Back to the Vendor Portal
            </Title>
            <Text style={{ color: '#fff' }}>
              Sign in to manage your shop&apos;s inventory and track your orders.
            </Text>
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
                Sign In
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
                Welcome back! Please sign in to your account.
              </Text>

              <GoogleSignUpButton api="vendor/auth/google" />

              <Divider plain style={{ color: '#888' }}>
                or
              </Divider>

              <Form layout="vertical" onFinish={handleSignIn}>
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
                    autoComplete="current-password"
                    size="large"
                  />
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
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form>

              <Text style={{ textAlign: 'center' }}>
                Don’t have an account?{' '}
                <Link to="/vendor/signup" style={{ color: '#3B82F6' }}>
                  Sign up
                </Link>
              </Text>
            </Space>
          </Card>
        </Content>
      </Layout>
    </CheckShopOwnerLoggedIn>
  );
}

export default SignIn;
