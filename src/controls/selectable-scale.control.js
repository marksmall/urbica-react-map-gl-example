import './selectable-scale.control.css';

const UNITS = ['imperial', 'metric', 'nautical'];

const defaultOptions = {
  maxWidth: 100,
  unit: 'metric'
};

/**
 * A `ScaleControl` control displays the ratio of a distance on the map to the corresponding distance on the ground.
 *
 * @implements {IControl}
 * @param {Object} [options]
 * @param {number} [options.maxWidth='100'] The maximum length of the scale control in pixels.
 * @param {string} [options.unit='metric'] Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
 * @example
 * var scale = new mapboxgl.ScaleControl({
 *     maxWidth: 80,
 *     unit: 'imperial'
 * });
 * map.addControl(scale);
 *
 * scale.setUnit('metric');
 */
class SelectableScaleControl {
  map = null;
  container = null;
  options = null;

  constructor(options) {
    this.options = { ...defaultOptions, ...options };
    if (!options) {
      this.options.units = UNITS;
    }
  }

  getDefaultPosition() {
    return 'bottom-left';
  }

  _onMove = () => {
    updateScale(this.map, this.selectedItem, this.options);
  };

  toggleOptions = event => {
    this.selectItems.classList.toggle('select-hide');
  };

  onSelect = event => {
    this.setUnit(event.target.innerHTML);
  };

  onAdd(map) {
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl selectable-scale-control';

    this.selectContainer = document.createElement('div');
    this.selectContainer.className = 'selectable-scale';
    this.selectContainer.onclick = this.toggleOptions;

    this.selectedItem = document.createElement('div');
    this.selectedItem.className = 'selected-item scale-label';
    this.selectedItem.innerHTML = this.options.unit;
    this.selectContainer.appendChild(this.selectedItem);

    this.selectItems = document.createElement('div');
    this.selectItems.className = 'select-items select-hide';

    this.options.units.forEach(unit => {
      const option = document.createElement('div');
      option.innerHTML = unit;
      option.onclick = this.onSelect;
      this.selectItems.appendChild(option);
    });

    this.selectContainer.appendChild(this.selectItems);
    this.container.appendChild(this.selectContainer);

    this.map.on('move', this._onMove);
    this._onMove();

    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map.off('move', this._onMove);
    this.map = undefined;
  }

  /**
   * Set the scale's unit of the distance
   *
   * @param unit Unit of the distance (`'imperial'`, `'metric'` or `'nautical'`).
   */
  setUnit = unit => {
    this.options.unit = unit;
    updateScale(this.map, this.selectedItem, this.options);
  };
}

export default SelectableScaleControl;

function updateScale(map, container, options) {
  // A horizontal scale is imagined to be present at center of the map
  // container with maximum length (Default) as 100px.
  // Using spherical law of cosines approximation, the real distance is
  // found between the two coordinates.
  const maxWidth = (options && options.maxWidth) || 100;

  const y = map._container.clientHeight / 2;
  const maxMeters = getDistance(
    map.unproject([0, y]),
    map.unproject([maxWidth, y])
  );
  // The real distance corresponding to 100px scale length is rounded off to
  // near pretty number and the scale length for the same is found out.
  // Default unit of the scale is based on User's locale.
  if (options && options.unit === 'imperial') {
    const maxFeet = 3.2808 * maxMeters;
    if (maxFeet > 5280) {
      const maxMiles = maxFeet / 5280;
      setScale(container, maxWidth, maxMiles, 'mi');
    } else {
      setScale(container, maxWidth, maxFeet, 'ft');
    }
  } else if (options && options.unit === 'nautical') {
    const maxNauticals = maxMeters / 1852;
    setScale(container, maxWidth, maxNauticals, 'nm');
  } else {
    setScale(container, maxWidth, maxMeters, 'm');
  }
}

function setScale(container, maxWidth, maxDistance, unit) {
  let distance = getRoundNum(maxDistance);
  const ratio = distance / maxDistance;

  if (unit === 'm' && distance >= 1000) {
    distance = distance / 1000;
    unit = 'km';
  }

  container.style.width = `${maxWidth * ratio}px`;
  container.innerHTML = distance + unit;
}

function getDistance(latlng1, latlng2) {
  // Uses spherical law of cosines approximation.
  const R = 6371000;

  const rad = Math.PI / 180,
    lat1 = latlng1.lat * rad,
    lat2 = latlng2.lat * rad,
    a =
      Math.sin(lat1) * Math.sin(lat2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.cos((latlng2.lng - latlng1.lng) * rad);

  const maxMeters = R * Math.acos(Math.min(a, 1));
  return maxMeters;
}

function getDecimalRoundNum(d) {
  const multiplier = Math.pow(10, Math.ceil(-Math.log(d) / Math.LN10));
  return Math.round(d * multiplier) / multiplier;
}

function getRoundNum(num) {
  const pow10 = Math.pow(10, `${Math.floor(num)}`.length - 1);
  let d = num / pow10;

  d =
    d >= 10
      ? 10
      : d >= 5
      ? 5
      : d >= 3
      ? 3
      : d >= 2
      ? 2
      : d >= 1
      ? 1
      : getDecimalRoundNum(d);

  return pow10 * d;
}
