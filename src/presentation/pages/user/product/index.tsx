import { SideBySideMagnifier } from 'react-image-magnifiers';
import React from 'react';

function Index() {
  const state = {
    alwaysInPlace: false,
    overlayOpacity: 0.6,
    switchSides: false,
    fillAvailableSpace: false,
    fillAlignTop: false,
    fillGapLeft: 0,
    fillGapRight: 10,
    fillGapTop: 10,
    fillGapBottom: 10,
  };
  return (
    <div style={{ display: 'flex' }}>
      <SideBySideMagnifier
        imageSrc="/product/image.jpg"
        imageAlt="Example"
        largeImageSrc="/product/large-image.jpg"
        style={{ order: state.switchSides ? '1' : '0', width: '30%', position: 'relative' }}
        alwaysInPlace={state.alwaysInPlace}
        fillAvailableSpace={state.fillAvailableSpace}
        fillAlignTop={state.fillAlignTop}
        fillGapTop={state.fillGapTop}
        fillGapRight={state.fillGapRight}
        fillGapBottom={state.fillGapBottom}
        fillGapLeft={state.fillGapLeft}
        zoomContainerBorder="1px solid #ccc"
        zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
      />
    </div>
  );
}

export default Index;
