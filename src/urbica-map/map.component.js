import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MapGL, { NavigationControl, ScaleControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import LadLayer from './lad-layer.component';
import LsoaLayer from './lsoa-layer.component';

import styles from './map.module.css';

class AbstractMap extends Component {
  onLoad = event => {
    if (event) {
      const map = event.target;
      const { geocoder } = this.props;
      if (geocoder) {
        map.addControl(geocoder);
      }

      // console.log("MAP STYLE: ", map.getStyle());
    }
  };

  onData = event => {
    const map = event.target;
    // Get Source features to store.
    if (
      event.sourceId === 'lsoa-source' &&
      map.getSource('lsoa-source') &&
      map.isSourceLoaded('lsoa-source')
    ) {
      console.log(
        'LSOA SOURCE & FEATURES: ',
        map.getSource('lsoa-source'),
        map.querySourceFeatures('lsoa-source', 'lsoa_1')
      );
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
    console.log('MAP PROPS: ', this.props);

    return (
      <div className={styles['multi-map']}>
        {selectedMapStyle && (
          <MapGL
            style={{ width: '50vw', height: '100vh' }}
            // mapStyle="mapbox://styles/mapbox/light-v9"
            mapStyle={selectedMapStyle.uri}
            accessToken="pk.eyJ1IjoiYXN0cm9zYXQiLCJhIjoiY2o3YWtjNnJzMGR6ajM3b2FidmNwaDNsaSJ9.lwWi7kOiejlT0RbD7RxtmA"
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            zoom={viewport.zoom}
            onViewportChange={viewport => setViewport(viewport)}
            onLoad={this.onLoad}
            onZoomend={this.onZoomend}
            onData={this.onData}
          >
            <LadLayer />
            <LsoaLayer fillColour={fillColour} />

            <ScaleControl unit="metric" position="bottom-left" />
            <NavigationControl showZoom position="bottom-right" />
          </MapGL>
        )}
      </div>
    );
  }
}

AbstractMap.propTypes = {
  fillColour: PropTypes.string.isRequired,
  viewport: PropTypes.object.isRequired,
  setViewport: PropTypes.func.isRequired
};

export default AbstractMap;
