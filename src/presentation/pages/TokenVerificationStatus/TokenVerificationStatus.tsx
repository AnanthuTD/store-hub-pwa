import React from 'react';
import { Link } from 'react-router-dom';

interface TokenVerificationProps {
  title: string;
  message: string;
  nextSteps: string;
  requestNewTokenUrl: string;
  supportUrl: string;
}

const TokenVerificationStatus: React.FC<TokenVerificationProps> = ({
  title,
  message,
  nextSteps,
  requestNewTokenUrl,
  supportUrl,
}) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>{title}</h1>
      <p>{message}</p>
      <p>{nextSteps}</p>
      <div style={{ marginTop: '20px' }}>
        <Link to={requestNewTokenUrl} style={{ marginRight: '20px', color: 'blue' }}>
          Request New Token
        </Link>
        <Link to={supportUrl} style={{ color: 'blue' }}>
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default TokenVerificationStatus;
