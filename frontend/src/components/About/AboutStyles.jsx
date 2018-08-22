// @flow

import {styles as appStyles} from "../../constants.js";
import type {Props} from "./AboutTypes.jsx";
import {getDelta} from "../Presentation/SidePanel/helpers.jsx";

import type {CSSStyleDeclaration, GetStyles} from "../../constantTypes.jsx";

type Styles = {
  wrapper: CSSStyleDeclaration,
  p: CSSStyleDeclaration,
  h1: CSSStyleDeclaration,
  sidePanel: CSSStyleDeclaration,
  title: CSSStyleDeclaration,
  content: CSSStyleDeclaration,
  h2: CSSStyleDeclaration,
};

const {unitWidth} = appStyles;
const {widthFactor} = appStyles.sidebar;

const getStyles: GetStyles<Props, Styles> = props => {
  const sidebarWidth = "calc(" + widthFactor + " * " + unitWidth + ")";

  let backgroundColor = "rgba(255, 255, 255, 0.5)";
  let wrapperOpacity = props.opacity;

  if (document.documentElement.clientWidth < appStyles.mediaQueries.phone) {
    backgroundColor = "rgba(0, 0, 0, 0)";

    wrapperOpacity = props.isSidebarOpened ? 0 : wrapperOpacity;
  }

  return {
    wrapper: {
      width: "calc(100vw - " + sidebarWidth + ")",
      position: "relative",
      color: "black",
      opacity: wrapperOpacity,
      transition: "opacity 0.5s linear",
      paddingLeft: sidebarWidth,
      height: "100%",
      backgroundImage: `url(${props.bgUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "bottom",
    },
    wrapper2: {
      position: "absolute",
      top: `calc(3.25 * ${appStyles.unitHeight} - ${getDelta()}px)`,
      right: 0,
      left: 0,
    },
    p: {
      padding: appStyles.unitHeight + " " + sidebarWidth,
    },
    h1: {
      padding: appStyles.unitHeight + " " + sidebarWidth,
    },
    sidePanel: {
      marginTop: "calc(2.5 * " + appStyles.unitHeight + ")",
    },
    content: {
      backgroundColor,
      padding: "2rem",
      height: `calc(13.5 * ${appStyles.unitHeight})`,
      overflowY: "auto",
      boxSizing: "border-box",
      position: "relative",
    },
    contentEnd: {
      backgroundColor,
      height: `calc(1.5 * ${appStyles.unitHeight})`,
    },
    title: {},
    h2: {
      height: `calc(2 * ${appStyles.unitHeight} )`,
      boxSizing: "border-box",
      fontSize: "2rem",
      margin: 0,
      textAlign: "center",
    },
    headerText: {
      backgroundColor: props.headerTextBgColor,
      transition: "background-color 0.1s linear",
      height: `calc(3.75 * ${appStyles.unitHeight})`,
      padding: "30px",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
    },
  };
};

export default getStyles;
