import React from 'react';
import PropTypes from 'prop-types';

import ReactMap from './map.component';

import { geocoder } from '../map/map.utils.js';

import MapStyleSwitcher from '../mapstyle-switcher/mapstyle-switcher.component';

import styles from './multi-map.module.css';

const MultiMap = ({
  viewport,
  setViewport,
  mapStyles,
  selectedMapStyle,
  selectMapStyle
}) => (
  <div className={styles['multi-map']}>
    {mapStyles && selectedMapStyle && (
      <MapStyleSwitcher
        mapStyles={mapStyles}
        selectedMapStyle={selectedMapStyle}
        selectMapStyle={selectMapStyle}
      />
    )}
    <ReactMap
      geocoder={geocoder}
      fillColour="rgb(0,0,0)"
      viewport={viewport}
      setViewport={setViewport}
      selectedMapStyle={selectedMapStyle}
    />
    <ReactMap
      fillColour="green"
      viewport={viewport}
      setViewport={setViewport}
      selectedMapStyle={selectedMapStyle}
    />
  </div>
);

MultiMap.propTypes = {
  viewport: PropTypes.object.isRequired,
  setViewport: PropTypes.func.isRequired
};

export default MultiMap;
