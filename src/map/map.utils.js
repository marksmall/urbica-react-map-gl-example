import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const DECIMAL_DEGREES = /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i;

/**
 * GeoCoder function to return Longitude/Latitude options the geocoder API
 * can understand.
 *
 * @param {*} query
 *
 * @returns
 */
const coordinatesGeocoder = query => {
  // match anything which looks like a decimal degrees coordinate pair
  const matches = query.match(DECIMAL_DEGREES);
  if (!matches) {
    return null;
  }

  function coordinateFeature(lng, lat) {
    return {
      center: [lng, lat],
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      },
      place_name: "Lat: " + lat + ", Lng: " + lng,
      place_type: ["coordinate"],
      properties: {},
      type: "Feature"
    };
  }

  const coord1 = Number(matches[1]);
  const coord2 = Number(matches[2]);
  const geocodes = [];

  if (coord1 < -90 || coord1 > 90) {
    // must be lng, lat
    geocodes.push(coordinateFeature(coord1, coord2));
  }

  if (coord2 < -90 || coord2 > 90) {
    // must be lat, lng
    geocodes.push(coordinateFeature(coord2, coord1));
  }

  if (geocodes.length === 0) {
    // else could be either lng, lat or lat, lng
    geocodes.push(coordinateFeature(coord1, coord2));
    geocodes.push(coordinateFeature(coord2, coord1));
  }

  return geocodes;
};

export const geocoder = new MapboxGeocoder({
  mapboxgl: mapboxgl,
  accessToken: MAPBOX_TOKEN,
  localGeocoder: coordinatesGeocoder,
  reverseGeocode: true,
  placeholder: "55.961667, -3.165556 or Edinburgh"
});
