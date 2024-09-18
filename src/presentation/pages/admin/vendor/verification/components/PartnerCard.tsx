import React from 'react';
import { Avatar, List } from 'antd';
import styled from '@emotion/styled';

// Define type for a minimal version of Delivery Partner
export interface PartnerSummary {
  _id: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    isVerified: boolean;
    address: {
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

// Define type for a minimal version of Delivery Partner
interface PartnerCardProps extends PartnerSummary {
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
  profile: {
    firstName,
    lastName,
    avatar,
    isVerified,
    address: { city },
  },
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
