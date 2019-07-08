import React from 'react';
import PropTypes from 'prop-types';

import { Source, Layer } from '@urbica/react-map-gl';

const LsoaLayer = ({ fillColour, before }) => (
  <>
    <Source id="lsoa-source" type="vector" url="mapbox://thermcert.lsoa_1" />
    <Layer
      id="lsoa"
      type="fill"
      source="lsoa-source"
      source-layer="lsoa_1"
      before={before}
      paint={{
        'fill-color': fillColour,
        'fill-opacity': 0.5
      }}
    />
  </>
);

LsoaLayer.propTypes = {
  fillColour: PropTypes.string.isRequired,
  before: PropTypes.string
};

export default LsoaLayer;
