// @flow

import * as React from "react";
import {connect} from "react-redux";
import {compose, lifecycle, withHandlers} from "recompose";

import getStyles from "./HeaderPictoStyles.jsx";

import type {ReduxState} from "./HeaderPictoTypes.jsx";

import type {OwnProps, Props} from "./HeaderPictoTypes.jsx";

import type {MapStateToProps} from "../../storeTypes.jsx";

const mapStateToProps: MapStateToProps<ReduxState> = state => ({
  windowWidth: state.appReducer.windowWidth,
  windowHeight: state.appReducer.windowHeight,
});

const HeaderPictoDumb: React.StatelessFunctionalComponent<Props> = props => {
  const styles = getStyles(props);

  return (
    <div className="HeaderPicto--wrapper" style={styles.wrapper}>
      <img src={props.url} style={styles.img} alt="picto" />
    </div>
  );
};

const HeaderPictoSmart = compose(
  withHandlers(() => {
    let myCanvas: ?HTMLCanvasElement = null;

    return {
      onRef: () => ref => (myCanvas = ref),
      getRef: () => () => myCanvas,
    };
  }),
  lifecycle({
    componentDidMount() {
      //loadImg(this.props)
    },
    componentWillReceiveProps() {
      //loadImg(nextProps)
    },
  }),
)(HeaderPictoDumb);

const ConnectedHeaderPicto: React.ComponentType<OwnProps> = connect(
  mapStateToProps,
)(HeaderPictoSmart);

export default ConnectedHeaderPicto;
export {HeaderPictoDumb, HeaderPictoSmart};
