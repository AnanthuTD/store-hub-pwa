import React from 'react';
import { Card, Typography, Button } from 'antd';
import './WelcomeCard.css'; // Import custom CSS for additional styles

const { Title, Text } = Typography;

interface WelcomeCardProp {
  name: string;
  welcomeText: string;
  buttonText: string;
  onButtonClick: () => void; // Function to be called when button is clicked.
}

const WelcomeCard: React.FC<WelcomeCardProp> = ({
  name,
  welcomeText,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Card className="custom-card">
      <div className="card-content">
        <Text className="welcome-text">Welcome back,</Text>
        <Title level={2} className="name-text">
          {name}
        </Title>
        <Text className="description-text">{welcomeText}</Text>
        <Button type="link" className="record-button" onClick={onButtonClick}>
          {buttonText} →
        </Button>
      </div>
    </Card>
  );
};

export default WelcomeCard;
