import {styles as appStyles} from "../../constants.js";

const getStyles = props => {
  const {clientWidth} = document.documentElement;
  const {unitWidthJs, unitHeight} = appStyles;
  const {comps} = props;
  const isTablet = clientWidth < appStyles.mediaQueries.tablet;

  const sidePanelWidth = `${
    appStyles.sidePanel.openedWidthCoef
  } * ${unitWidthJs}px`;

  const transition = "transform 0.2s ease-out";
  let position = props.position;

  let height = "inherit";
  height = `calc(14 * ${unitHeight})`;
  let overflowY = "inherit";
  let wrapperWidth = `calc(${comps.length} * ${sidePanelWidth})`;

  if (
    props.desktopLockPosition &&
    props.desktopLockPosition === position &&
    !isTablet
  ) {
    position = props.position - 1;
  }

  let wrapperTransform = `translate(calc(-${position} * ${sidePanelWidth}))`;
  let centerWrapperWidth = `calc(${sidePanelWidth})`;
  if (clientWidth < appStyles.mediaQueries.phone) {
    position = props.position;
    height = `calc(13 * ${unitHeight})`;
    wrapperWidth = `calc(${comps.length * 100}vw)`;
    centerWrapperWidth = "100vw";
    wrapperTransform = `translate(calc(-${props.position} * 100vw))`;
  } else if (isTablet) {
    height = `calc(13 * ${unitHeight})`;
  } else if (
    props.desktopLockDrawer &&
    props.position !== props.unlockPosition
  ) {
    wrapperTransform = "inherit";
  }

  const rightWrapperTranslate = (1 - position) * 100;
  const leftWrapperTranslate = -position * 100;
  const mainWrapperWidth = centerWrapperWidth;

  return {
    mainWrapper: {
      width: mainWrapperWidth,
      overflow: "hidden",
    },
    wrapper: {
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      overflowY: "auto",
      minWidth: wrapperWidth,
      position: "relative",
      transition: "transform 0.3s ease-out",
      height,
      transform: wrapperTransform,
    },
    leftWrapper: {
      transform: `translate(${leftWrapperTranslate}%)`,
      transition,
      overflowY,
      height,
    },
    centerWrapper: {
      transition,
      width: centerWrapperWidth,
      minWidth: centerWrapperWidth,
      overflowY,
      height,
      position: "relative",
    },
    rightWrapper: {
      position: "absolute",
      right: 0,
      left: 0,
      transform: `translate(${rightWrapperTranslate}%)`,
      transition,
      overflowY,
      height,
    },
  };
};

export default getStyles;
