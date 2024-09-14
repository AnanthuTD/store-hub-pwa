import React from 'react';
import { List, Divider } from 'antd';
import styled from '@emotion/styled';
import PartnerCard, { PartnerSummary } from './PartnerCard';

// Styled Divider for light theme
const StyledDivider = styled(Divider)`
  background-color: #e0e0e0; /* Light grey divider */
`;

interface PartnersListProps {
  partners: PartnerSummary[];
  onPartnerClick: (id: string) => void;
}

const PartnersList: React.FC<PartnersListProps> = ({ partners, onPartnerClick }) => (
  <>
    <List
      itemLayout="horizontal"
      dataSource={partners}
      renderItem={(partner) => (
        <React.Fragment key={partner._id}>
          <PartnerCard {...partner} onClick={onPartnerClick} />
          <StyledDivider />
        </React.Fragment>
      )}
    />
  </>
);

export default PartnersList;
