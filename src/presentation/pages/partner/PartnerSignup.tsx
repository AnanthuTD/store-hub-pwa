import { Container } from '@mui/material';
import GradientBackground from '@/presentation/components/Partner/Registration/GradientBackground';
import AuthIllustration from '@/presentation/components/Partner/Registration/AuthIllustration';
import AuthForm from '@/presentation/components/Partner/Registration/AuthForm';

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
