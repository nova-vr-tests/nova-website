// @flow
import * as React from "react";

import Slide from "../Slide/Slide.jsx";

import {styles as appStyles} from "../../../constants.js";

import type {Props} from "./SlideTransitionTypes.jsx";

import type {State} from "./SlideTransitionTypes.jsx";

import SlideHeader from "../SlideHeader/SlideHeader.jsx";

/**
   Takes slides as props and stores them in state to handle slide transition.
*/
class SlideTransition extends React.Component<Props, State> {
  state = {
    frontPage: this.props.currentPage,
    backPage: this.props.currentPage,
    transitionProgress: 0,
    transitionDirection: 0,
    isFrontSlideVisible: true,
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // if(this.state.isFrontSlideVisible) {
    //     this.setState({ frontPage: this.props.currentPage })
    // } else {
    //     this.setState({ backPage: this.props.currentPage })
    // }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.currentPage !== this.props.currentPage) {
      if (this.state.isFrontSlideVisible) {
        this.setState({backPage: nextProps.currentPage});
      } else {
        this.setState({frontPage: nextProps.currentPage});
      }

      this.setState({isFrontSlideVisible: !this.state.isFrontSlideVisible});
      console.log(nextProps.currentPage);
    }
  }

  render() {
    const theme = appStyles.themes[this.props.appTheme];

    const fontColorTransition =
      "color " +
      appStyles.slideTransitionTime / 1000 +
      "s " +
      appStyles.slideTransitionFunc;

    const styles = {
      wrapper: {
        color: theme.fontColor,
        position: "relative",
        width: "100%",
        transition: fontColorTransition,
        overflow: "hidden",
        height: "100%",
        backgroundColor:
          window.location.pathname !== "/" &&
          this.props.isMainPanelOpened &&
          appStyles.mediaQueries.tablet > this.props.windowWidth
            ? "rgba(0, 0, 0, 0)"
            : "rgba(0, 0, 0, 0.4)",
      },
      frontSlide: {
        height: "100vh",
        width: "100%",
        opacity: this.state.isFrontSlideVisible ? 1 : 0,
        pointerEvents: this.state.isFrontSlideVisible ? "inherit" : "none",
        transition: "opacity 0.5s linear",
        position: "absolute",
        top: 0,
      },
      backSlide: {
        height: "100vh",
        width: "100%",
        opacity: this.state.isFrontSlideVisible ? 0 : 1,
        pointerEvents: this.state.isFrontSlideVisible ? "none" : "inherit",
        transition: "opacity 0.5s linear",
        position: "absolute",
        top: 0,
      },
    };

    const _slideTitle = this.props.pages[this.props.currentPage].h1;
    const slideTitle = _slideTitle === "Introduction" ? "" : _slideTitle;

    const BackSlide = (
      <Slide
        {...this.props}
        currentPage={this.state.backPage}
        id="target-slide"
        isTarget={this.state.isFrontSlideVisible}
        scrollEvent={this.props.scrollEvent}
        transitionProgress={this.state.transitionProgress}
      />
    );

    return [
      <SlideHeader
        currentPage={this.props.currentPage}
        title={slideTitle}
        windowWidth={this.props.windowWidth}
        key={1}
      />,
      <div className="slide-transition--wrapper" style={styles.wrapper} key={2}>
        <div className="current-slide--wrapper" style={styles.frontSlide}>
          <Slide
            {...this.props}
            currentPage={this.state.frontPage}
            id="current-slide"
            isTarget={!this.state.isFrontSlideVisible}
            scrollEvent={this.props.scrollEvent}
            transitionProgress={this.state.transitionProgress}
          />
        </div>
        <div className="target-slide--wrapper" style={styles.backSlide}>
          {BackSlide}
        </div>
      </div>,
    ];
  }
}

export default SlideTransition;
