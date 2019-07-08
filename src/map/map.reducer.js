import { SET_VIEWPORT, SET_HOVERED_LSOA } from './map.actions';

const initialState = {
  viewport: {
    latitude: 55.961667,
    longitude: -3.165556,
    zoom: 6
  },
  hoveredLsoaFeature: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEWPORT:
      return { ...state, viewport: action.viewport };

    case SET_HOVERED_LSOA:
      return { ...state, hoveredLsoaFeature: action.feature };

    default:
      return state;
  }
};

export default reducer;
