import React from 'react';
import PropTypes from 'prop-types';

import { Layer, Source } from 'react-mapbox-gl';

const LsoaLayer = ({ fillColour, onLsoaHovered, before }) => (
  <>
    <Source
      id="lsoa-source"
      tileJsonSource={{
        type: 'vector',
        url: 'mapbox://thermcert.lsoa_1'
      }}
    />
    <Layer
      id="lsoa"
      type="fill"
      sourceId="lsoa-source"
      sourceLayer="lsoa_1"
      paint={{ 'fill-color': fillColour, 'fill-opacity': 0.5 }}
      onMouseOver={onLsoaHovered}
      before={before}
    />
  </>
);

LsoaLayer.propTypes = {
  before: PropTypes.string
};

export default LsoaLayer;
