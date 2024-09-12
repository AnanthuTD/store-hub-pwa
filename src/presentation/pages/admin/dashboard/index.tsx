import { theme } from 'antd';

function Index() {
  const {
    token: { colorTextHeading },
  } = theme.useToken();

  console.log(colorTextHeading);

  return <div style={{ padding: '10px' }}>DashBoard</div>;
}

export default Index;
