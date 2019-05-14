import React, { Component } from "react";
import PropTypes from "prop-types";

import MapGL from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import LadLayer from "./lad-layer.component";
import LsoaLayer from "./lsoa-layer.component";

import styles from "./map.module.css";

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

  onStyledata = event => {
    // console.log("ONSTYLEDATA FUNCTION CALLED: ", event);
  };

  onData = event => {
    const map = event.target;
    // console.log("ONSOURCEDATA FUNCTION CALLED: ", event, map);
    if (event.sourceId === "lsoa-source" && map.isSourceLoaded("lsoa-source")) {
      console.log(
        "LSOA SOURCE & FEATURES: ",
        map.getSource("lsoa-source"),
        map.querySourceFeatures("lsoa-source", "lsoa_1")
      );
    }
  };

  onZoomend = event => {
    const map = event.target;
    // console.log("ONZOOMEND FUNCTION CALLED: ", event, map.getZoom());
    const { lng, lat } = map.getCenter();
    this.props.setViewport({
      longitude: lng,
      latitude: lat,
      zoom: map.getZoom()
    });
  };

  render() {
    const { fillColour, viewport, setViewport } = this.props;

    return (
      <div className={styles["multi-map"]}>
        <MapGL
          style={{ width: "50vw", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/light-v9"
          accessToken="pk.eyJ1IjoiYXN0cm9zYXQiLCJhIjoiY2o3YWtjNnJzMGR6ajM3b2FidmNwaDNsaSJ9.lwWi7kOiejlT0RbD7RxtmA"
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          onViewportChange={viewport => setViewport(viewport)}
          onLoad={this.onLoad}
          onStyledata={this.onStyledata}
          onZoomend={this.onZoomend}
          onData={this.onData}
        >
          <LadLayer />
          <LsoaLayer fillColour={fillColour} />
        </MapGL>
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
