import React from 'react';
import { Button, Col, Row, Typography, Card, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  StarOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

const LandingPage: React.FC = () => (
  <Layout style={{ backgroundColor: '#fff', fontFamily: 'Poppins, sans-serif' }}>
    <Header
      style={{
        background: '#fff',
        padding: '0 20px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Title level={3} style={{ color: 'rgb(35, 166, 240)' }}>
        StoreHub
      </Title>
    </Header>

    <Content>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgb(35, 166, 240), rgb(65, 199, 249))',
          color: '#fff',
          padding: '140px 0',
          textAlign: 'center',
          position: 'relative',
          borderBottomLeftRadius: '60px',
          borderBottomRightRadius: '60px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Title
            style={{
              fontSize: '4.5rem',
              marginBottom: '25px',
              fontWeight: '800',
              letterSpacing: '1.2px',
            }}
          >
            Welcome to StoreHub
          </Title>
          <Text
            style={{
              fontSize: '1.5rem',
              marginBottom: '60px',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.8',
            }}
          >
            Join thousands of users who trust StoreHub for their shopping and business needs. Enjoy
            a seamless experience with top-tier tools and a growing community.
          </Text>
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '50px' }}
          >
            <Link to="/signin">
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: 'rgb(35, 166, 240)',
                  color: '#fff',
                  borderRadius: '50px',
                  padding: '15px 40px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Get Started as a User
              </Button>
            </Link>
            <Link to="/vendor/signup">
              <Button
                type="default"
                size="large"
                style={{
                  borderRadius: '50px',
                  padding: '15px 40px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Become a Vendor
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Card Section */}
      <div style={{ margin: '80px 0', padding: '0 20px' }}>
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                borderRadius: '15px',
                textAlign: 'center',
                marginBottom: '40px',
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)',
              }}
            >
              <StarOutlined style={{ fontSize: '3rem', color: 'rgb(35, 166, 240)' }} />
              <Title level={4}>Top Rated Platform</Title>
              <Text>
                StoreHub is trusted by thousands of users and businesses alike. Experience
                excellence with us.
              </Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                borderRadius: '15px',
                textAlign: 'center',
                marginBottom: '40px',
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)',
              }}
            >
              <ShoppingCartOutlined style={{ fontSize: '3rem', color: 'rgb(35, 166, 240)' }} />
              <Title level={4}>Comprehensive Tools</Title>
              <Text>
                Access all the tools you need to manage your shopping or business efficiently.
              </Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                borderRadius: '15px',
                textAlign: 'center',
                marginBottom: '40px',
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)',
              }}
            >
              <TeamOutlined style={{ fontSize: '3rem', color: 'rgb(35, 166, 240)' }} />
              <Title level={4}>Engaging Community</Title>
              <Text>
                Join a vibrant and supportive community, where users and vendors connect and grow.
              </Text>
            </Card>
          </Col>
        </Row>
      </div>
    </Content>

    {/* Footer */}
    <Footer
      style={{
        background: '#222',
        color: '#fff',
        padding: '60px 20px',
        borderTopLeftRadius: '60px',
        borderTopRightRadius: '60px',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <div style={{ margin: '30px 0' }}>
        <FacebookOutlined style={{ fontSize: '2rem', color: '#fff', marginRight: '20px' }} />
        <TwitterOutlined style={{ fontSize: '2rem', color: '#fff', marginRight: '20px' }} />
        <InstagramOutlined style={{ fontSize: '2rem', color: '#fff' }} />
      </div>
      <Text style={{ marginTop: '20px', color: '#ccc' }}>
        © 2024 StoreHub. Empowering users and businesses with innovation.
      </Text>
    </Footer>
  </Layout>
);

export default LandingPage;
