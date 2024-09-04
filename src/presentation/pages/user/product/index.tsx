import ReactImageMagnify from 'react-image-magnify';
import React from 'react';
import './examples.css';

import watchImg687 from './wristwatch_687.jpg';
import watchImg1200 from './wristwatch_1200.jpg';

export default function index() {
  return (
    <div className="fluid__image-container">
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
        }}
      />
    </div>
  );
}
