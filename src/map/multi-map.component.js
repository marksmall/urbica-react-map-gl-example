import React, { Component } from 'react';
import PropTypes from 'prop-types';
import syncMove from '@mapbox/mapbox-gl-sync-move';

// import ReactMap from '../urbica-map/map.component';
// import ReactMap from '../react-mapbox-gl-map/map.component';
import ReactMap from '../mapbox-gl-js/map.component';

import { geocoder } from './map.utils.js';

import MapStyleSwitcher from '../mapstyle-switcher/mapstyle-switcher.component';

import styles from './multi-map.module.css';

class MultiMap extends Component {
  static propTypes = {
    viewport: PropTypes.object.isRequired,
    setViewport: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.mapA = React.createRef();
    this.mapB = React.createRef();
  }

  componentDidMount() {
    syncMove(this.mapA.current.map, this.mapB.current.map);
  }

  render() {
    const {
      viewport,
      setViewport,
      mapStyles,
      selectedMapStyle,
      selectMapStyle
    } = this.props;
    return (
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
          ref={this.mapA}
        />
        <ReactMap
          fillColour="green"
          viewport={viewport}
          setViewport={setViewport}
          selectedMapStyle={selectedMapStyle}
          ref={this.mapB}
        />
      </div>
    );
  }
}

export default MultiMap;
