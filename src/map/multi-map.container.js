import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getViewport } from "../map/map.selector";
import { setViewport } from "../map/map.actions";

import MultiMap from "./multi-map.component";

const mapStateToProps = state => ({
  viewport: getViewport(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setViewport
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiMap);
