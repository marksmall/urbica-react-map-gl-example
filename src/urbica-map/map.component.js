import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MapGL, { NavigationControl, ScaleControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import LadLayer from './lad-layer.component';
import LsoaLayer from './lsoa-layer.component';

import { MAPBOX_TOKEN } from '../map/map.utils';

import styles from './map.module.css';

class AbstractMap extends Component {
  static propTypes = {
    fillColour: PropTypes.string.isRequired,
    viewport: PropTypes.object.isRequired,
    setViewport: PropTypes.func.isRequired,
    geocoder: PropTypes.object
  };

  onLoad = event => {
    if (event) {
      const map = event.target;
      const { geocoder } = this.props;
      if (geocoder) {
        map.addControl(geocoder);
      }
    }
  };

  onZoomend = event => {
    // Ensure other map(s) update themselves when using geocoder.
    const map = event.target;
    const { lng, lat } = map.getCenter();
    this.props.setViewport({
      longitude: lng,
      latitude: lat,
      zoom: map.getZoom()
    });
  };

  render() {
    const { fillColour, viewport, setViewport, selectedMapStyle } = this.props;
    const beforeId = 'waterway-label';

    return (
      <div className={styles['multi-map']}>
        {selectedMapStyle && (
          <MapGL
            style={{ width: '50vw', height: '100vh' }}
            mapStyle={selectedMapStyle.uri}
            accessToken={MAPBOX_TOKEN}
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            zoom={viewport.zoom}
            onViewportChange={viewport => setViewport(viewport)}
            onLoad={this.onLoad}
            // onZoomend={this.onZoomend}
          >
            <LadLayer before={beforeId} />
            <LsoaLayer fillColour={fillColour} before={beforeId} />

            <ScaleControl unit="metric" position="bottom-left" />
            <NavigationControl showZoom position="bottom-right" />
          </MapGL>
        )}
      </div>
    );
  }
}

export default AbstractMap;
