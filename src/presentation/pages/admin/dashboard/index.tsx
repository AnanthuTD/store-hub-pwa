import styled from '@emotion/styled';

const GradientDiv = styled.div`
  background: linear-gradient(
    to bottom,
    ${(props) => props.startColor || '#060B28'} 74%,
    ${(props) => props.endColor || '#0A0E23'} 71%
  );
`;

function Index() {
  return <GradientDiv style={{ padding: '10px' }}>DashBoard</GradientDiv>;
}

export default Index;
