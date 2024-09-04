// src/components/BasicExample.tsx
import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { Box } from '@mui/material';
// import SpacedSpan from '../components/SpacedSpan';

import './examples.css';

import watchImg687 from './wristwatch_687.jpg';
import watchImg1200 from './wristwatch_1200.jpg';

const BasicExample: React.FC = () => {
  return (
    <Box className="fluid" sx={{ mb: 4 }}>
      <Box className="fluid__image-container" sx={{ position: 'relative' }}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: watchImg687,
            },
            largeImage: {
              src: watchImg1200,
              width: 1200,
              height: 1800,
            },
            lensStyle: { backgroundColor: 'rgba(0,0,0,0.6)' },
            enlargedImagePosition: 'right', // Position the enlarged image on the right
            enlargedImageContainerDimensions: { width: '100%', height: '100%' },
          }}
        />
      </Box>

      <Box sx={{ height: '500px' }} />
    </Box>
  );
};

export default BasicExample;
