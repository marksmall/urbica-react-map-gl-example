import React from 'react';
import PropTypes from 'prop-types';

import { Layer, Source } from 'react-mapbox-gl';

const LadLayer = ({ before }) => (
  <>
    <Source id="lad-source" type="vector" url="mapbox://thermcert.lad" />
    <Layer
      id="lad"
      type="line"
      source="lad-source"
      source-layer="lad"
      paint={{ 'line-color': '#000', 'line-width': 0.5 }}
      before={before}
    />
  </>
);

LadLayer.propTypes = {
  before: PropTypes.string
};

export default LadLayer;
