import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactMapboxGl, {
  RotationControl,
  ZoomControl,
  ScaleControl
} from 'react-mapbox-gl';
// import { Scalecontrol } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import LadLayer from './lad-layer.component';
import LsoaLayer from './lsoa-layer.component';

import { MAPBOX_TOKEN } from '../map/map.utils';

import styles from './map.module.css';

const MapGL = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});

class AbstractMap extends Component {
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
            style={selectedMapStyle.uri}
            containerStyle={{ width: '50vw', height: '100vh' }}
            zoom={viewport.zoom}
            // onViewportChange={viewport => setViewport(viewport)}
            onStyleLoad={this.onStyleLoad}
            // onZoomend={this.onZoomend}
            // onData={this.onData}
          >
            <LadLayer />
            <LsoaLayer fillColour={fillColour} />

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

AbstractMap.propTypes = {
  fillColour: PropTypes.string.isRequired,
  viewport: PropTypes.object.isRequired,
  setViewport: PropTypes.func.isRequired
};

export default AbstractMap;
