import { MAP_STYLE_SELECTED } from "./mapstyle-switcher.actions";

const MAP_STYLE_DATA = [
  {
    id: "streets",
    uri: "mapbox://styles/astrosat/cjtrrv8be37ge1fqwl0ef8rb9",
    title: "Streets"
  },
  {
    id: "light",
    uri: "mapbox://styles/astrosat/cjtiotoam3tff1fruptp84ekd",
    title: "Light"
  },
  {
    id: "dark",
    uri: "mapbox://styles/astrosat/cjtrrxg8l1nxt1fpd6x7f0ln8",
    title: "Dark"
  },
  {
    id: "satellite",
    uri: "mapbox://styles/astrosat/cjtsgocbv57ok1fqqsjez3de6",
    title: "Satellite"
  }
];

const initialState = {
  mapStyles: MAP_STYLE_DATA,
  selectedMapStyle: MAP_STYLE_DATA[3]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_STYLE_SELECTED:
      return { ...state, selectedMapStyle: action.mapStyle };

    default:
      return state;
  }
};

export default reducer;
