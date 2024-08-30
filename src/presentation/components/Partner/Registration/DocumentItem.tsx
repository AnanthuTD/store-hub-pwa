import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Card, CardActionArea, Typography } from '@mui/material';

interface DocumentItemProps {
  title: string;
  completed: boolean;
}

const DocumentItem = ({ title, completed }: DocumentItemProps) => (
  <Card variant="outlined" sx={{ borderRadius: 3 }}>
    <CardActionArea>
      <Box display="flex" alignItems="center" padding={2}>
        {completed && <CheckCircleIcon color="success" sx={{ marginRight: 1 }} />}
        <Typography variant="body1">{title}</Typography>
        <Box flexGrow={1} />
        <Typography variant="body1" color="primary" fontWeight="bold">
          &gt;
        </Typography>
      </Box>
    </CardActionArea>
  </Card>
);

export default DocumentItem;
