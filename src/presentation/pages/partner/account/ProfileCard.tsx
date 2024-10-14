import { RootState } from '@/infrastructure/redux/store';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';

const { Text } = Typography;
const iconStyle = { color: '#FF5963' };

function ProfileCard() {
  const partner = useSelector((state: RootState) => state.partner.data);

  return (
    <Card>
      <Space size={'middle'} style={{ display: 'flex' }}>
        <Avatar
          src={partner?.profile?.avatar}
          size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Space>
            <UserOutlined style={iconStyle} />
            <Text strong>{partner?.profile?.firstName + partner?.profile?.lastName}</Text>
          </Space>
          <Space>
            <PhoneOutlined style={iconStyle} />
            <Text strong>{partner?.profile?.phone}</Text>
          </Space>
          <Space>
            <MailOutlined style={iconStyle} />
            <Text strong>{partner?.profile?.email}</Text>
          </Space>
        </div>
      </Space>
    </Card>
  );
}

export default ProfileCard;
