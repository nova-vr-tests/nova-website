// @flow

import type {Props, LayerProps, LayerAssemblyProps} from "./BgTypes.jsx";

import type {CSSStyleDeclaration, GetStyles} from "../../constantTypes.jsx";

type Styles = {
  wrapper: CSSStyleDeclaration,
  frontBg: CSSStyleDeclaration,
  backBg: CSSStyleDeclaration,
  overlay: CSSStyleDeclaration,
};

const getStyles: GetStyles<Props, Styles> = props => {
  return {
    wrapper: {
      position: "absolute",
      zIndex: -1,
      height: "100vh",
      width: "100vw",
    },
    frontBg: {
      height: "100vh",
      width: "100vw",
      position: "absolute",
      opacity: props.isFrontLayerShown ? 1 : 0,
      transition: "opacity 0.5s linear",
    },
    backBg: {
      height: "100vh",
      width: "100vw",
      position: "absolute",
      opacity: props.isFrontLayerShown ? 0 : 1,
      transition: "opacity 0.5s linear",
    },
    overlay: {
      height: "100vh",
      width: "100vw",
      zIndex: 3,
      position: "absolute",
      transition: "background-color 0.5s linear",
      background:
        "linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%,rgba(0, 0, 0, 0.15) 30%, rgba(0, 0, 0, 0))",
    },
  };
};

type LayerStyles = {
  layer: CSSStyleDeclaration,
};

const getLayerStyles: GetStyles<LayerProps, LayerStyles> = props => {
  return {
    layer: {
      backgroundImage: "url(" + props.imgUrl + ")",
      backgroundSize: "cover",
      height: "100vh",
      width: "100vw",
      position: "absolute",
      backgroundPosition: props.layerParalax,
      opacity: props.layerOpacity,
    },
  };
};

type LayerAssemblyStyles = {
  wrapper: CSSStyleDeclaration,
};

const getLayerAssemblyStyles: GetStyles<
  LayerAssemblyProps,
  LayerAssemblyStyles,
> = () => {
  return {
    wrapper: {
      zIndex: -1,
      height: "100vh",
      width: "100vw",
      position: "absolute",
    },
  };
};

export default getStyles;

export {getLayerStyles, getLayerAssemblyStyles};
