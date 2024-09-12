import React from 'react';
import { Avatar, List } from 'antd';
import styled from '@emotion/styled';

// Define type for a minimal version of Delivery Partner
interface PartnerCardProps {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  city: string;
  isVerified: boolean;
  onClick: (id: string) => void;
}

// Styled List Item
const StyledListItem = styled(List.Item)`
  &:hover {
    background-color: #f5f5f5; /* Light grey hover effect for light theme */
    transition: background-color 0.3s ease;
  }
`;

const PartnerCard: React.FC<PartnerCardProps> = ({
  _id,
  firstName,
  lastName,
  avatar,
  city,
  isVerified,
  onClick,
}) => (
  <StyledListItem onClick={() => onClick(_id)}>
    <List.Item.Meta
      avatar={
        <Avatar
          src={avatar}
          alt={`${firstName} Avatar`}
          style={{
            border: `2px solid ${isVerified ? '#4caf50' : '#f44336'}`,
          }} /* Green border if verified, red if not */
        />
      }
      title={`${firstName} ${lastName}`}
      description={`${city} - ${isVerified ? 'Verified' : 'Not Verified'}`}
    />
  </StyledListItem>
);

export default PartnerCard;
