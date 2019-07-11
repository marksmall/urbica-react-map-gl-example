import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactMapboxGl, {
  RotationControl,
  ZoomControl,
  ScaleControl
} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import LadLayer from './lad-layer.component';
import LsoaLayer from './lsoa-layer.component';

import { MAPBOX_TOKEN } from '../map/map.utils';

import styles from './map.module.css';

const MapGL = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});

class AbstractMap extends Component {
  static propTypes = {
    fillColour: PropTypes.string.isRequired,
    viewport: PropTypes.object.isRequired,
    setViewport: PropTypes.func.isRequired,
    geocoder: PropTypes.object
  };

  onStyleLoad = (map, event) => {
    if (event) {
      // const map = event.target;
      const { geocoder } = this.props;
      if (geocoder) {
        map.addControl(geocoder);
      }

      // console.log("MAP STYLE: ", map.getStyle());
    }
  };

  setViewport = (map, event) => {
    // Ensure other map(s) update themselves when using geocoder.
    const { lng, lat } = map.getCenter();
    this.props.setViewport({
      longitude: lng,
      latitude: lat,
      zoom: [map.getZoom()]
    });
  };

  render() {
    const {
      viewport: { longitude, latitude, zoom },
      fillColour,
      selectedMapStyle
    } = this.props;
    const beforeId = 'waterway-label';

    return (
      <div className={styles['multi-map']}>
        {selectedMapStyle && (
          <MapGL
            style={selectedMapStyle.uri}
            containerStyle={{ width: '50vw', height: '100vh' }}
            zoom={[zoom]}
            center={[longitude, latitude]}
            onStyleLoad={this.onStyleLoad}
            onZoom={this.setViewport}
            onDrag={this.setViewport}
          >
            <LadLayer before={beforeId} />
            <LsoaLayer before={beforeId} fillColour={fillColour} />

            <ScaleControl
              className={styles['mapbox-controls']}
              position="bottom-left"
            />
            <ZoomControl
              className={styles['mapbox-controls']}
              position="bottom-right"
            />
            <RotationControl
              className={styles['mapbox-controls']}
              position="bottom-right"
            />
          </MapGL>
        )}
      </div>
    );
  }
}

export default AbstractMap;
