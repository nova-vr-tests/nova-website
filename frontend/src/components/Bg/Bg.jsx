// @flow

import * as React from "react";
import {connect} from "react-redux";
import {compose, lifecycle, pure, withState} from "recompose";

import {updateCacheLayers, resetCacheLayers} from "../../reducer/actions/Bg.js";

import intro from "../img/home.png";

import type {
  ReduxState,
  ReduxDispatch,
  OwnProps,
  Props,
  LayerProps,
  LayerAssemblyProps,
} from "./BgTypes.jsx";

import getStyles, {
  getLayerStyles,
  getLayerAssemblyStyles,
} from "./BgStyles.jsx";

import type {MapStateToProps, MapDispatchToProps} from "../../storeTypes.jsx";

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
  return {
    currentPage: state.appReducer.currentPage,
    pages: state.appReducer.pages,
    cacheLayers: state.bgReducer.cacheLayers,
    routing: state.routing,
  };
};

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(
  dispatch,
) {
  // eslint-disable-line no-unused-vars
  return {
    updateCacheLayers: l => dispatch(updateCacheLayers(l)),
    resetCacheLayers: () => dispatch(resetCacheLayers()),
  };
};

const Layer: React.StatelessFunctionalComponent<LayerProps> = props => {
  const styles = getLayerStyles(props);

  return <div style={styles.layer} />;
};

const LayerAssembly = (props: LayerAssemblyProps) => {
  type GetLayers = (
    layers: typeof props.layers,
  ) => Array<React.Element<typeof Layer>>;

  const styles = getLayerAssemblyStyles(props);

  const getLayers: GetLayers = layers => {
    return layers.map((e, i) => (
      <Layer
        imgUrl={e.imgUrl}
        layerParalax={e.paralax}
        translateY={props.translateY}
        layerOpacity={e.opacity}
        key={i}
      />
    ));
  };

  return <div style={styles.wrapper}>{getLayers(props.layers)}</div>;
};

LayerAssembly.defaultProps = {
  display: 1,
};

const BgDumb: React.StatelessFunctionalComponent<Props> = props => {
  const styles = getStyles(props);

  let {frontLayers, backLayers} = props;

  return (
    <div style={styles.wrapper} className="barr">
      <div
        className="front-bgg"
        style={{
          ...styles.frontBg,
        }}>
        <LayerAssembly layers={frontLayers} translateY={"0"} />
      </div>

      <div
        className="back-bgg"
        style={{
          ...styles.backBg,
        }}>
        <LayerAssembly layers={backLayers} translateY={"0"} />
      </div>

      <div style={styles.overlay} />
    </div>
  );
};

const HOC = compose(
  withState("frontLayers", "setFrontLayers", [
    {imgUrl: intro, paralax: 0, opacity: 1},
  ]),
  withState("backLayers", "setBackLayers", [
    {imgUrl: intro, paralax: 0, opacity: 1},
  ]),
  withState("isFrontLayerShown", "setIsFrontLayerShown", false),
  lifecycle({
    componentWillUpdate(nextProps) {
      // presentation page change backgrounds
      if (
        nextProps.currentPage !== this.props.currentPage ||
        (nextProps.routing.location.search === "" &&
          this.props.routing.location.search !== "") ||
        (nextProps.routing.location.search !== "" &&
          this.props.routing.location.search === "")
      ) {
        const {layers} = nextProps.pages[nextProps.currentPage];

        if (this.props.isFrontLayerShown) {
          this.props.setBackLayers(layers);
          this.props.setIsFrontLayerShown(false);
        } else {
          this.props.setFrontLayers(layers);
          this.props.setIsFrontLayerShown(true);
        }
      }

      // products bakgrounds
      if (
        nextProps.cacheLayers.length &&
        nextProps.routing.location.search !== ""
      ) {
        const layers = this.props.cacheLayers;

        if (this.props.isFrontLayerShown) {
          this.props.setBackLayers(layers);
          this.props.setIsFrontLayerShown(false);
        } else {
          this.props.setFrontLayers(layers);
          this.props.setIsFrontLayerShown(true);
        }

        this.props.resetCacheLayers();
      }

      if (!this.props.pages.length && nextProps.pages.length) {
        const {layers} = nextProps.pages[nextProps.currentPage];

        if (this.props.isFrontLayerShown) {
          this.props.setBackLayers(layers);
          this.props.setIsFrontLayerShown(false);
        } else {
          this.props.setFrontLayers(layers);
          this.props.setIsFrontLayerShown(true);
        }
      }
    },
  }),
  pure,
)(BgDumb);

const ConnectedBg: React.ComponentType<OwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HOC);

export default ConnectedBg;
