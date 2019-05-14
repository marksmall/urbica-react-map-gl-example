import React from "react";
import PropTypes from "prop-types";

import { Source, Layer } from "@urbica/react-map-gl";

const LsoaLayer = ({ fillColour, onLsoaHovered }) => (
  <>
    <Source id="lsoa-source" type="vector" url="mapbox://thermcert.lsoa_1" />
    <Layer
      id="lsoa"
      type="fill"
      source="lsoa-source"
      source-layer="lsoa_1"
      before="waterway-label"
      paint={{
        "fill-color": fillColour,
        "fill-opacity": 0.5
      }}
      onHover={onLsoaHovered}
    />
  </>
);

LsoaLayer.propTypes = {
  fillColour: PropTypes.string.isRequired
};

export default LsoaLayer;
