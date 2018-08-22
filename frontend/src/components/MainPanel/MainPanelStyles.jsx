import {styles as appStyles} from "../../constants.js";

const getStyles = props => {
  const {clientWidth} = document.documentElement;
  const {unitHeight, unitWidth} = appStyles;

  let display = "block";
  if (clientWidth < appStyles.mediaQueries.tablet) {
    display = "none";
  }

  const right = `calc(${appStyles.sidePanel.openedWidthCoef} * ${unitWidth})`;
  //const left = `calc(2 * ${ appStyles.sidebar.widthFactor } * ${ unitWidth })`
  const top = 0;
  const paddingTop = `calc(3 * ${unitHeight})`;
  const pointerEvents = props.isOpened ? "inherit" : "none";

  return {
    wrapper: {
      opacity: props.isOpened ? 1 : 0,
      transition: "opacity 0.5s linear",
      position: "absolute",
      //left,
      width: `calc(${appStyles.sidePanel.openedWidthCoef} * ${unitWidth})`,
      right,
      top,
      paddingTop,
      bottom: 0,
      pointerEvents,
      display,
    },
  };
};

export default getStyles;
