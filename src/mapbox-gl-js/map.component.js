import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mapboxgl, { NavigationControl, ScaleControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MAPBOX_TOKEN } from '../map/map.utils';

import styles from './map.module.css';

mapboxgl.accessToken = MAPBOX_TOKEN;

class AbstractMap extends Component {
  static propTypes = {
    fillColour: PropTypes.string.isRequired,
    viewport: PropTypes.object.isRequired,
    setViewport: PropTypes.func.isRequired
  };

  mapContainer = null;
  map = null;

  addLayers(fillColour) {
    const beforeId = 'waterways-label';

    if (!this.map.getSource('lad-source')) {
      this.map.addSource('lad-source', {
        type: 'vector',
        url: 'mapbox://thermcert.lad'
      });

      this.map.addLayer({
        id: 'lad',
        type: 'line',
        source: 'lad-source',
        'source-layer': 'lad',
        paint: {
          'line-color': '#000',
          'line-width': 0.5
        } //,
        // beforeId
      });
    }

    if (!this.map.getSource('lsoa-source')) {
      this.map.addSource('lsoa-source', {
        type: 'vector',
        url: 'mapbox://thermcert.lsoa_1'
      });

      this.map.addLayer({
        id: 'lsoa',
        type: 'fill',
        source: 'lsoa-source',
        'source-layer': 'lsoa_1',
        paint: {
          'fill-color': fillColour,
          'fill-opacity': 0.5
        } //,
        // beforeId
      });
    }
  }

  setViewport() {
    const { lng, lat } = this.map.getCenter();
    this.props.setViewport({
      longitude: lng,
      latitude: lat,
      zoom: this.map.getZoom()
    });
  }

  componentDidMount() {
    const {
      viewport: { longitude, latitude, zoom },
      fillColour,
      selectedMapStyle,
      geocoder
    } = this.props;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: selectedMapStyle.uri,
      center: [longitude, latitude],
      zoom: zoom
    });

    // Add controls to map.
    //
    // Add Search geocoder.
    if (geocoder) {
      this.map.addControl(geocoder);
    }

    this.map.addControl(new NavigationControl(), 'bottom-right');
    this.map.addControl(new ScaleControl(), 'bottom-right');

    // Setup map events.
    //
    // Load data layers after map style loaded.
    this.map.on('styledata', () => {
      this.addLayers(fillColour);
    });
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    // Move map to lng/lat and zoom in props.
    const { selectedMapStyle } = this.props;

    // Set map's style to that set in props.
    if (selectedMapStyle.uri !== prevProps.selectedMapStyle.uri) {
      this.map.setStyle(selectedMapStyle.uri);
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)}
        style={{ width: '50vw', height: '100vh' }}
      />
    );
  }
}

function wrapMap(WrappedComponent) {
  class WrappedMap extends Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return <WrappedMap {...props} forwardedRef={ref} />;
  });
}

export default wrapMap(AbstractMap);
