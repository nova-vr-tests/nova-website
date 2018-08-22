import {styles as appStyles} from "../../constants";

const getStyles = props => {
  const {unitHeightJs} = appStyles;

  const linkWrapperHeight = unitHeightJs * 3 + "px";
  const borderRadius = {
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
  };

  const pictoWidthCoef = props.isSquarePicto ? 1 : 1.5;
  const pictoTransform = props.isSquarePicto
    ? "inherit"
    : `translate(-20px, 20px)`;
  const pictoDisplay = props.pictoUrl === "" ? "none" : "inherit"; // dont' show pictos if url is empty
  const pictoBgDisplay = props.pictoBgUrl === "" ? "none" : "inherit"; // dont' show pictos if url is empty

  let titleFontSize = "1.6rem";

  if (document.documentElement.clientWidth < appStyles.mediaQueries.mobile) {
    titleFontSize = "1.8rem";
  }

  let borderColor = "rgba(255, 255, 255, 0.6)";
  let backgroundColor = "rgba(255, 255, 255, 0.2)";
  let color = "white";
  if (props.invertColors) {
    borderColor = "rgba(0, 0, 0, 0.6)";
    backgroundColor = "rgba(0, 0, 0, 0.2)";
    color = "rgb(54, 54, 67)";
  }

  const styles = {
    linkWrapper: {
      display: "flex",
      minHeight: linkWrapperHeight,
      fontSize: "2rem",
      justifyContent: "fle",
      border: "1px solid " + borderColor,
      margin: `calc(0.75 * ${appStyles.unitHeight})`,
      cursor: "pointer",
      ...borderRadius,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: `calc(0.5 * ${appStyles.unitWidth})`,
      justifySelf: "flex-end",
      borderRight: "none",
      backgroundColor,
      position: "relative",
      color,
      textDecoration: "none",
    },
    activeLink: {
      backgroundColor,
    },
    pictoBg: {
      height: `calc(${linkWrapperHeight} - 0px)`,
      width: `calc(${pictoWidthCoef} * ${linkWrapperHeight})`,
      ...borderRadius,
      display: pictoBgDisplay,
      position: "absolute",
      left: 0,
      top: 0,
    },
    picto: {
      height: `calc(${linkWrapperHeight} - 0px)`,
      width: `calc(${pictoWidthCoef} * ${linkWrapperHeight})`,
      transform: pictoTransform,
      display: pictoDisplay,
      ...borderRadius,
    },
    title: {
      fontSize: titleFontSize,
      fontWeight: "bold",
    },
    subtitle: {
      marginTop: "0.75rem",
      fontSize: "1.2rem",
    },
    textWrapper: {
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem 1.5rem",
      paddingLeft: `calc(0.75 * ${appStyles.unitWidth})`,
      flex: 1,
      justifyContent: "center",
    },
  };

  return styles;
};

export default getStyles;
