import React from 'react';

import { Layer, Source } from 'react-mapbox-gl';

const LsoaLayer = ({ fillColour, onLsoaHovered }) => (
  <>
    <Source id="lsoa-source" type="vector" url="mapbox://thermcert.lsoa_1" />
    <Layer
      id="lsoa"
      type="fill"
      source="lsoa-source"
      source-layer="lsoa_1"
      paint={{ 'fill-color': fillColour, 'fill-opacity': 0.5 }}
      onHover={onLsoaHovered}
    />
  </>
);

export default LsoaLayer;
