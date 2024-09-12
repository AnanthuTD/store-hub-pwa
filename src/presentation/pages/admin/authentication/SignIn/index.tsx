import React, { useState } from 'react';
import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Alert,
  Divider,
  Card,
  Space,
} from 'antd';
import { useLogin } from '@/hooks/Admin/useLogin';
import GoogleSignUpButton from '@/presentation/components/Auth/GoogleSignUpButton';
import { passwordRules } from '@/presentation/components/passwordRules';

const { Content } = Layout;
const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useLogin(); // Custom hook for login logic

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await login({ email, password });
      // Redirect or show success message here
    } catch (err) {
      setError((err as Error).message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
        {/* Left Side - SVG and Welcome Message */}
        <div
          style={{
            flex: 1,
            backgroundImage: 'url("/admin-signin.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
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
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: '#ffffff', marginBottom: '16px' }}>
              Welcome to Admin Portal
            </Title>
            <Text style={{ fontSize: '16px', color: '#ffffff' }}>
              Manage and oversee everything from here.
            </Text>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card
          style={{
            width: '400px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
          }}
          bordered={false}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 0, color: '#3B3B3B' }}>
              Sign In
            </Title>
            <Text
              type="secondary"
              style={{ display: 'block', textAlign: 'center', marginBottom: '24px', color: '#888' }}
            >
              Welcome back! Please sign in to access the dashboard.
            </Text>
            {error && (
              <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />
            )}

            <GoogleSignUpButton
            /*  onClick={() => {
              }} */
            />

            <Divider plain style={{ color: '#888' }}>
              or
            </Divider>

            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Email or Mobile"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email or mobile!' },
                  { type: 'email', message: 'The input is not a valid email!' },
                ]}
              >
                <Input
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email or mobile"
                  autoComplete="email"
                  autoFocus
                  size="large"
                />
              </Form.Item>

              <Form.Item label="Password" name="password" rules={passwordRules}>
                <Input.Password
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Checkbox style={{ color: '#888' }}>Remember me</Checkbox>
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
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
