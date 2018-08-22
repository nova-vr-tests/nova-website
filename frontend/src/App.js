import "babel-polyfill";

import React, {Component} from "react";
import {connect} from "react-redux";
import "./App.css";
import PropTypes from "prop-types";
import Footer from "./components/Footer/Footer.jsx";
import {INTRO_FINISHED} from "./constants.js";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import NovaRouter from "./router.jsx";
import Bg from "./components/Bg/Bg.jsx";
import {
  updateLinePosition,
  updateWindowWidth,
  updateWindowHeight,
} from "./reducer/actions/App.js";
import Header from "./components/Header/Header.jsx";
import {toggleSidebar} from "./reducer/actions/Sidebar.js";
import {styles as appStyles} from "./constants.js";
import IntroAnimation from "./components/IntroAnimation/IntroAnimation.jsx";
import ImgViewer from "./components/ImgViewer.jsx";

const apiTest = async () => {
  const r = await fetch("/api/blogposts/");
  const json = await r.json();

  return json;
};

const reduxStatePropTypes = {
  routing: PropTypes.object,
  introKeyframe: PropTypes.number,
};

const mapStateToProps = function(state) {
  return {
    routing: state.routing,
    introKeyframe: state.appReducer.introKeyframe,
    pathname: state.routing.location.pathname,
    windowWidth: state.appReducer.windowWidth,
    isSidebarOpened: state.sidebarReducer.isSidebarOpened,
  };
};

const reduxDispatchPropTypes = {};

const mapDispatchToProps = function(dispatch) {
  return {
    updateLinePosition: linePosition =>
      dispatch(updateLinePosition(linePosition)),
    updateWindowWidth: windowWidth => dispatch(updateWindowWidth(windowWidth)),
    updateWindowHeight: windowHeight =>
      dispatch(updateWindowHeight(windowHeight)),
    toggleSidebar: () => dispatch(toggleSidebar()),
  };
};

const _styles = {
  routerWrapper: {
    opacity: 1,
    transition: "opacity 1s linear",
    display: "flex",
    flex: 1,
  },
  transparent: {
    opacity: 0,
  },
};

const AppDumb = props => (
  <div id="app--wrapper">
    <div
      style={_styles.routerWrapper}
      className={
        "router--wrapper " +
        (props.introKeyframe > INTRO_FINISHED ? "transparent" : "")
      }>
      <Header />
      <Bg />
      <Sidebar />
      <NovaRouter />
      <IntroAnimation />
    </div>
    <Footer />
    <ImgViewer />
  </div>
);

AppDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentWillMount() {
    window.addEventListener("resize", this.updateWindowWidth);
  }

  componentDidMount() {
    apiTest();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  }

  // update redux on viewport change
  updateWindowWidth() {
    const windowWidth = window.innerWidth;

    // Close sidebar if going from desktop => mobile and open it if going from mobile => desktop
    if (
      (this.props.windowWidth >= appStyles.mediaQueries.phone &&
        windowWidth <= appStyles.mediaQueries.phone &&
        this.props.isSidebarOpened) ||
      (this.props.windowWidth <= appStyles.mediaQueries.phone &&
        windowWidth >= appStyles.mediaQueries.phone &&
        !this.props.isSidebarOpened)
    ) {
      this.props.toggleSidebar();
    }

    this.props.updateWindowWidth(windowWidth);
    this.props.updateWindowHeight(document.documentElement.clientHeight);
  }

  render() {
    return <AppDumb introKeyframe={this.props.introKeyframe} />;
  }
}

App.propTypes = {
  ...AppDumb.propTypes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export {App, AppDumb};
