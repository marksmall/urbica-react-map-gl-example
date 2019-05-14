import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getViewport } from "../map/map.selector";
import { setViewport } from "../map/map.actions";

import {
  getMapStyles,
  getSelectedMapStyle
} from "../mapstyle-switcher/mapstyle-switcher.selector";
import { selectMapStyle } from "../mapstyle-switcher/mapstyle-switcher.actions";

import MultiMap from "./multi-map.component";

const mapStateToProps = state => ({
  viewport: getViewport(state),
  mapStyles: getMapStyles(state),
  selectedMapStyle: getSelectedMapStyle(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setViewport,
      selectMapStyle
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiMap);
