import { Container } from '@mui/material';
import GradientBackground from '@/presentation/pages/partner/signup/components/GradientBackground';
import AuthIllustration from '@/presentation/pages/partner/signup/components/AuthIllustration';
import AuthForm from '@/presentation/pages/partner/signup/components/AuthForm';

const PartnerSignup = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <GradientBackground />
      <AuthIllustration />
      <AuthForm />
    </Container>
  );
};

export default PartnerSignup;
