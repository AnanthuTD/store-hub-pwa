import CircularProgress from '@mui/material/CircularProgress';

import { FullSizeCenteredFlexBox } from '@/presentation/components/styled';

function Loading() {
  return (
    <FullSizeCenteredFlexBox>
      <CircularProgress />
    </FullSizeCenteredFlexBox>
  );
}

export default Loading;
