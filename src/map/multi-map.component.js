import React from "react";
import PropTypes from "prop-types";

import ReactMap from "./map.component";

import { geocoder } from "../map/map.utils.js";

import styles from "./multi-map.module.css";

const MultiMap = ({ viewport, setViewport }) => (
  <div className={styles["multi-map"]}>
    <ReactMap
      geocoder={geocoder}
      fillColour="rgb(0,0,0)"
      viewport={viewport}
      setViewport={setViewport}
    />
    <ReactMap
      fillColour="green"
      viewport={viewport}
      setViewport={setViewport}
    />
  </div>
);

MultiMap.propTypes = {
  viewport: PropTypes.object.isRequired,
  setViewport: PropTypes.func.isRequired
};

export default MultiMap;
