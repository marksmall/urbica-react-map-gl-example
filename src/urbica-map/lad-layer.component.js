import React from 'react';

import { Source, Layer } from '@urbica/react-map-gl';

const LadLayer = ({ before }) => (
  <>
    <Source id="lad-source" type="vector" url="mapbox://thermcert.lad" />
    <Layer
      id="lad"
      type="line"
      source="lad-source"
      source-layer="lad"
      paint={{
        'line-color': '#000',
        'line-width': 0.5
      }}
      before={before}
    />
  </>
);

export default LadLayer;
