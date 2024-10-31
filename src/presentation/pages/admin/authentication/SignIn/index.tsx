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
import { useLogin } from '@/hooks/Admin/useLogin';
// import GoogleSignUpButton from '@/presentation/components/Auth/GoogleSignUpButton';
import { passwordRules } from '@/presentation/components/passwordRules';
import ReactAuthGoogle from '@/presentation/components/Auth/ReactAuthGoogle';

const { Content } = Layout;
const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const { login } = useLogin(); // Custom hook for login logic
  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Check local storage for saved email
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedEmail) {
      form.setFieldValue('email', savedEmail);
      setRememberMe(true); // Check the checkbox if an email is found
    }
  }, [form]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values);

      // Save email to local storage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem('adminEmail', values.email);
      } else {
        localStorage.removeItem('adminEmail'); // Clear if unchecked
      }

      // Redirect or show success message here
    } catch (err) {
      notification.error({
        message: 'Login Failed',
        description: (err as Error).message || 'Failed to sign in. Please try again.',
        placement: 'topRight', // Position of the notification
      });
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
            backgroundImage: 'url("/admin/banner.png")',
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
          {/* You can add content here if needed */}
        </div>

        {/* Right Side - Login Form */}
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
              style={{ display: 'block', textAlign: 'center', marginBottom: '24px', color: '#888' }}
            >
              Welcome back! Please sign in to access the dashboard.
            </Text>

            {/* <GoogleSignUpButton api="admin/auth/google" /> */}
            <ReactAuthGoogle api="admin/auth/v2/google" role="admin" />

            <Divider plain style={{ color: '#888' }}>
              or
            </Divider>

            <Form layout="vertical" onFinish={handleSubmit} form={form}>
              <Form.Item
                label="Email or Mobile"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email or mobile!' },
                  { type: 'email', message: 'The input is not a valid email!' },
                ]}
              >
                <Input
                  placeholder="Enter your email or mobile"
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
                style={{
                  width: '100%',
                  borderRadius: '6px',
                  backgroundColor: '#1890ff',
                  borderColor: '#1890ff',
                  boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
                }}
              >
                Sign In
              </Button>
            </Form>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
