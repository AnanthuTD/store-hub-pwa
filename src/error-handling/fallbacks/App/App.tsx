import { useEffect } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import RestartIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { FullSizeCenteredFlexBox } from '@/presentation/components/styled';
import { email, messages } from '@/config';
import resetApp from '@/utils/reset-app';
import { FallbackProps } from 'react-error-boundary';

const AppErrorBoundaryFallback: React.FC<FallbackProps> = ({ error }) => {
  useEffect(() => {
    if (error) {
      console.error('App crashed with message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }, [error]);

  return (
    <Box height={500}>
      <FullSizeCenteredFlexBox>
        <Paper sx={{ p: 5, backgroundColor: 'background.default' }}>
          <Typography variant="h5" component="h3">
            {messages.app.crash.title}
          </Typography>
          <Typography variant="body1" color="error">
            {error?.message || 'An unexpected error occurred.'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            {error?.stack || 'No stack trace available.'}
          </Typography>
          <Button
            startIcon={<EmailIcon />}
            variant="outlined"
            target="_blank"
            rel="noreferrer"
            href={`mailto:${email}?subject=App%20Crash%20Report&body=${encodeURIComponent(
              error?.stack || '',
            )}`}
            sx={{ my: 3 }}
          >
            {messages.app.crash.options.email}
          </Button>
          <Typography component="h6">or</Typography>
          <Button startIcon={<RestartIcon />} sx={{ mt: 3 }} variant="outlined" onClick={resetApp}>
            {messages.app.crash.options.reset}
          </Button>
        </Paper>
      </FullSizeCenteredFlexBox>
    </Box>
  );
};

export default AppErrorBoundaryFallback;
