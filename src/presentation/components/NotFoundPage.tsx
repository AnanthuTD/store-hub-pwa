import React from 'react';
import { useLocation /* useNavigate */ } from 'react-router-dom';
import { Result /* , Button */ } from 'antd';

function NotFoundPage() {
  let location = useLocation();
  // let navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={`Sorry, no match for ${location.pathname}`}
      /* extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      } */
    />
  );
}

export default NotFoundPage;
