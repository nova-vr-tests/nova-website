// @flow

import {styles as appStyles} from "../../constants.js";

import type {SidebarDumbProps, SidebarSectionProps} from "./SidebarTypes.jsx";

import type {CSSStyleDeclaration, GetStyles} from "../../constantTypes.jsx";

const constants = {styles: appStyles};

type Styles = {
  wrapper: CSSStyleDeclaration,
  logo: CSSStyleDeclaration,
  sectionsWrapper: CSSStyleDeclaration,
  opened: CSSStyleDeclaration,
  large: CSSStyleDeclaration,
  borderDiv: CSSStyleDeclaration,
  bottomLine: CSSStyleDeclaration,
};

const getStyles: GetStyles<SidebarDumbProps, Styles> = props => {
  const sidebarWidth =
    constants.styles.sidebar.widthFactor + " * " + constants.styles.unitWidth;
  const borderTransition =
    "border " +
    constants.styles.slideTransitionTime / 1000 +
    "s " +
    constants.styles.slideTransitionFunc;

  return {
    wrapper: {
      position: "absolute",
      top: "0",
      left: "0",
      height: "100vh",
      display: "flex",
      flex: 1,
      width: "calc(" + sidebarWidth + " * 2)", // * 2 b/c of space needed for sub sub sections to appear on the side of sub sections (see SidebarSection styles.opened)
      maxWidth: "calc(" + sidebarWidth + " + 1px)", // 1px is for borderDiv border
      transition:
        "all " +
        constants.styles.sidebar.transition.length +
        " " +
        constants.styles.sidebar.transition.type,
      overflow: "hidden",
      transform: "translateX(calc(-" + sidebarWidth + "))",
      opacity: 0,
      color: props.themeStyles.menuFontColor,
      zIndex: 1,
      pointerEvents: "none", // to let click through sidebar and on toggle sidebar button
    },
    logo: {
      height: "10rem",
      position: "absolute",
      width: "calc(" + sidebarWidth + ")",
      top: 0,
    },
    sectionsWrapper: {
      display: "flex",
      flexDirection: "column",
      marginTop: "calc(" + ((9 + 0 * props.linePosition) * 100) / 24 + "vh)",
    },
    opened: {
      transform: "translateX(0)",
      opacity: 1,
    },
    large: {
      maxWidth: "calc(" + sidebarWidth + " * 2)", // see wrapper width
    },
    borderDiv: {
      position: "absolute",
      top: props.headerIntersection + "px",
      left: 0,
      height: "100vh",
      minWidth: "calc(" + sidebarWidth + ")",
      borderRight: props.themeStyles.fatMenuBorder,
      pointerEvents: "none",
      transition:
        "border " +
        constants.styles.slideTransitionTime / 1000 +
        "s " +
        constants.styles.slideTransitionFunc,
    },
    bottomLine: {
      borderBottom: props.themeStyles.menuBorder,
      maxWidth: "calc(" + sidebarWidth + ")",
      transition: borderTransition,
    },
  };
};

type SidebarSectionStyles = {
  viewWrapper: CSSStyleDeclaration,
  viewWrapperOpened: CSSStyleDeclaration,
  section: {
    wrapper: CSSStyleDeclaration,
    titleWrapper: CSSStyleDeclaration,
    title: CSSStyleDeclaration,
    titleActive: CSSStyleDeclaration,
    opened: CSSStyleDeclaration,
  },
  subSections: {
    wrapper: CSSStyleDeclaration,
  },
};

const getSidebarSectionStyles: GetStyles<
  SidebarSectionProps,
  SidebarSectionStyles,
> = props => {
  const getSectionPosition = (linkStates, linePosition, section) => {
    let marginTop = "-";
    let m0 = marginTop;

    // if section is above line position
    if (section < linePosition && linePosition <= 2) {
      if (section === 0) {
        // line height menu is opened ? => subtract section height from top margin
        if (linkStates[linePosition].isOpened) {
          marginTop =
            marginTop +
            constants.styles.sidebar.sectionHeightFactor +
            " * " +
            constants.styles.unitHeight;
        }

        if (linkStates[section].isOpened) {
          marginTop =
            marginTop +
            3 * constants.styles.sidebar.subSectionHeightFactor +
            " * " +
            constants.styles.unitHeight;
        }
      }

      // is there section after between current section and line ?
      // is this section opened ?
      if (section === 0 && linePosition === 2) {
        if (linkStates[1].isOpened) {
          marginTop = marginTop === m0 ? "" : " - " + marginTop;
          marginTop =
            -3 * constants.styles.sidebar.subSectionHeightFactor +
            " * " +
            constants.styles.unitHeight +
            marginTop;
        }
      }
    } else if (section === linePosition) {
      // line height menu is opened ? => subtract section height from top margin
      if (linkStates[linePosition].isOpened && section === 0) {
        marginTop =
          marginTop +
          constants.styles.sidebar.sectionHeightFactor +
          " * " +
          constants.styles.unitHeight;
      }
    }

    if (marginTop !== "-") {
      return "calc(" + marginTop + ")";
    } else {
      return 0;
    }
  };

  const unitHeight = constants.styles.unitHeight;
  const unitWidth = constants.styles.unitWidth;

  return {
    viewWrapper: {
      overflow: "hidden",
      width:
        "calc(" +
        constants.styles.sidebar.widthFactor +
        " * " +
        unitWidth +
        ")",
      transition:
        "width, margin-top " +
        constants.styles.sidebar.transition.length +
        " " +
        constants.styles.sidebar.transition.type,
      marginTop: getSectionPosition(
        props.linkStates,
        props.linePosition,
        props.id.section,
      ),
    },
    viewWrapperOpened: {
      width:
        "calc(2 * " +
        constants.styles.sidebar.widthFactor +
        " * " +
        unitWidth +
        ")",
      //marginTop: '-2rem',
    },
    section: {
      wrapper: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height:
          "calc(" +
          constants.styles.sidebar.sectionHeightFactor +
          " * " +
          unitHeight +
          " + 3 * " +
          constants.styles.sidebar.subSectionHeightFactor +
          " * " +
          unitHeight +
          ")",
        maxHeight:
          "calc(" +
          constants.styles.sidebar.sectionHeightFactor +
          " * " +
          unitHeight +
          ")",
        overflow: "visible",
        transition:
          "max-height" +
          constants.styles.sidebar.transition.length +
          " " +
          constants.styles.sidebar.transition.type,
        minHeight:
          "calc(" +
          (props.linePosition === props.id.section &&
          window.location.pathname !== "/"
            ? ""
            : "") +
          +constants.styles.sidebar.sectionHeightFactor +
          " * " +
          unitHeight +
          ")",
        pointerEvents: "auto", // reactivate pointer events on links which don't block toggle sidebar button (see SidebarDumb.styles.wrapper.pointerEvents)
      },
      titleWrapper: {
        transition:
          "border " +
          constants.styles.slideTransitionTime / 1000 +
          "s " +
          constants.styles.slideTransitionFunc,
        borderTop: props.themeStyles.menuBorder,
        display: "flex",
        width:
          "calc(" +
          constants.styles.sidebar.widthFactor +
          " * " +
          unitWidth +
          ")",
        minHeight:
          "calc(" +
          constants.styles.sidebar.sectionHeightFactor +
          " * " +
          unitHeight +
          ")",
      },
      title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:
          "calc(" +
          constants.styles.sidebar.widthFactor +
          " * " +
          unitWidth +
          ")",
        height:
          "calc(" +
          constants.styles.sidebar.sectionHeightFactor +
          " * " +
          unitHeight +
          ")",
        minHeight:
          "calc(" +
          constants.styles.sidebar.sectionHeightFactor +
          " * " +
          unitHeight +
          ")",
        transition:
          "background-color " +
          constants.styles.sidebar.hoverTransition.length +
          constants.styles.sidebar.hoverTransition.type,
        fontSize: "1.2rem",
        textTransform: "uppercase",
      },
      titleActive: {
        backgroundColor: props.themeStyles.menuTitleActive,
      },
      opened: {
        maxHeight:
          "calc(" +
          constants.styles.sidebar.sectionHeightFactor +
          " * " +
          unitHeight +
          " + 3 * " +
          constants.styles.sidebar.subSectionHeightFactor +
          " * " +
          unitHeight +
          ")",
      },
    },
    subSections: {
      wrapper: {
        transition:
          "opacity" +
          constants.styles.sidebar.transition.length +
          " " +
          constants.styles.sidebar.transition.type,
        opacity:
          props.linePosition === props.id.section && !props.isOpened ? 0 : 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width:
          "calc(" +
          constants.styles.sidebar.widthFactor +
          " * " +
          unitWidth +
          ")",
      },
    },
  };
};

type SidebarSubSectionStyles = {
  subSection: {
    wrapper: CSSStyleDeclaration,
    opened: CSSStyleDeclaration,
    title: CSSStyleDeclaration,
    link: CSSStyleDeclaration,
  },
  subSubSection: {
    wrapper: CSSStyleDeclaration,
    opened: CSSStyleDeclaration,
    link: CSSStyleDeclaration,
  },
};

const getSidebarSubSectionStyles: GetStyles<
  void,
  SidebarSubSectionStyles,
> = () => {
  const unitHeight = constants.styles.unitHeight;
  const sidebarWidth =
    constants.styles.sidebar.widthFactor + " * " + constants.styles.unitWidth;

  return {
    subSection: {
      wrapper: {
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        minHeight:
          "calc(" +
          constants.styles.sidebar.subSectionHeightFactor +
          " * " +
          unitHeight +
          ")",
      },
      opened: {},
      title: {
        minWidth: "calc(" + sidebarWidth + ")",
        minHeight:
          "calc(" +
          constants.styles.sidebar.subSectionHeightFactor +
          " * " +
          unitHeight +
          ")",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        transition:
          "background-color " +
          constants.styles.sidebar.hoverTransition.length +
          constants.styles.sidebar.hoverTransition.type,
        color: "inherit",
        textDecoration: "none",
      },
      link: {
        minHeight:
          "calc(" +
          constants.styles.sidebar.subSectionHeightFactor +
          " * " +
          unitHeight +
          ")",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition:
          "background-color " +
          constants.styles.sidebar.hoverTransition.length +
          constants.styles.sidebar.hoverTransition.type,
        cursor: "pointer",
        color: "inherit",
        textDecoration: "none",
      },
    },
    subSubSection: {
      wrapper: {
        cursor: "pointer",
        display: "none",
        flexDirection: "column",
        left: "100%",
        right: "-100%",
        top: 0,
        opacity: 0,
        pointerEvents: "none",
        transition: "opacity 0.2s linear",
        position: "absolute",
      },
      opened: {
        opacity: 1,
        pointerEvents: "inherit",
      },
      link: {
        minHeight:
          "calc(" +
          constants.styles.sidebar.subSectionHeightFactor +
          " * " +
          unitHeight +
          ")",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "calc(" + sidebarWidth + ")",
        transition:
          "background-color " +
          constants.styles.sidebar.hoverTransition.length +
          constants.styles.sidebar.hoverTransition.type,
      },
    },
  };
};

export default getStyles;

export {getSidebarSectionStyles, getSidebarSubSectionStyles};
