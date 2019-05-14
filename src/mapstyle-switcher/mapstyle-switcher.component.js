import React from 'react';
import PropTypes from 'prop-types';

import dark from './dark.png';
import light from './light.png';
import streets from './streets.png';
import satellite from './satellite.png';

import style from './mapstyle-switcher.module.css';

const MapStyleSwitcher = ({ mapStyles, selectedMapStyle, selectMapStyle }) => (
  <ul className={style['mapstyle-switcher-container']}>
    {mapStyles.map((mapStyle, index) => (
      <li key={index}>
        <label>
          <input
            id={mapStyle.id}
            name="mapStyle"
            type="radio"
            onChange={() => selectMapStyle(mapStyle)}
            value={mapStyle.uri}
            checked={mapStyle.id === selectedMapStyle.id}
          />
          {mapStyle.id === 'dark' && <img src={dark} alt="Preview" />}
          {mapStyle.id === 'light' && <img src={light} alt="Preview" />}
          {mapStyle.id === 'streets' && <img src={streets} alt="Preview" />}
          {mapStyle.id === 'satellite' && <img src={satellite} alt="Preview" />}
          <span>{mapStyle.title}</span>
        </label>
      </li>
    ))}
  </ul>
);

MapStyleSwitcher.propTypes = {
  mapStyles: PropTypes.array.isRequired,
  selectedMapStyle: PropTypes.object.isRequired,
  selectMapStyle: PropTypes.func.isRequired
};

export default MapStyleSwitcher;
