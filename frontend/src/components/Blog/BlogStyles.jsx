import {styles as appStyles} from "../../constants.js";

const getStyles = props => {
  const {clientWidth} = document.documentElement;
  const {unitHeight} = appStyles;

  const headerDisplay = props.showHeader ? "inherit" : "none";

  let height = `calc(100vh - 11 * ${unitHeight})`;
  let backgroundColor = "rgba(255, 255, 255, 0.5)";
  let color = "black";

  if (clientWidth < appStyles.mediaQueries.phone || props.sidePanelMode) {
    height = "100%";
  } else if (clientWidth < appStyles.mediaQueries.tablet) {
    // backgroundColor = 'rgba(0, 0, 0, 0)'
    // color = 'white'
  }

  if (props.sidePanelMode) {
    backgroundColor = "rgba(0, 0, 0, 0)";
    color = "white";
  }

  return {
    wrapper: {},
    headerWrapper: {
      display: headerDisplay,
    },
    articleWrapper: {
      backgroundColor,
      height,
      boxSizing: "border-box",
      color,
      display: "flex",
      flexDirection: "column",
      borderTopLeftRadius: "30px",
      overflow: "hidden",
    },
  };
};

export default getStyles;
