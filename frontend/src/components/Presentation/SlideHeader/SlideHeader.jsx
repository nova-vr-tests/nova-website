import React from "react";
import {connect} from "react-redux";
import {compose, lifecycle, withState} from "recompose";
import {push} from "react-router-redux";

import getStyles from "./SlideHeaderStyles.jsx";
import Social from "../Social/Social.jsx";
import TOC from "../TOC/TOC.jsx";

const mapStateToProps = state => ({
  pages: state.appReducer.pages,
  header: state.appReducer.sidePanel.header,
  overrideHeader: state.appReducer.sidePanel.overrideHeader,
  isMainPanelOpened: state.appReducer.mainPanel.isOpened,
});

const mapDispatchToProps = dispatch => ({
  goTo: url => dispatch(push(url)),
});

const SlideHeader = props => {
  const styles = getStyles(props, "2rem");

  const title0Styles = {
    ...styles.title,
    opacity: !props.currentPage ? 1 : 0,
  };

  const title1Styles = {
    ...styles.title,
    opacity: props.opacity1 ? 1 : 0,
  };

  const title2Styles = {
    ...styles.title,
    opacity: props.opacity2 ? 1 : 0,
  };

  const Header = props.header;

  return (
    <div style={styles.wrapper}>
      <div style={styles.titleWrapper}>
        <h2 className="above" style={title0Styles}>
          Nova Media
        </h2>
        <h2 className="above" style={title1Styles}>
          {props.title1}
        </h2>
        <h2 className="above" style={title2Styles}>
          {props.title2}
        </h2>
      </div>
      {props.pages[props.currentPage] ? (
        <div style={styles.tocWrapper}>
          <TOC
            goTo={props.goTo}
            pages={props.pages}
            currentPage={props.currentPage}
          />
        </div>
      ) : (
        ""
      )}
      {props.overrideHeader ? (
        <div style={styles.customHeaderWrapper}>
          <Header />
        </div>
      ) : (
        ""
      )}
      {props.overrideHeader ? (
        ""
      ) : (
        <div style={styles.socialWrapper}>
          <Social shareUrl={props.currentUrl} />
        </div>
      )}
    </div>
  );
};

SlideHeader.defaultProps = {
  fontColor: "rgba(255, 255, 255, 1)",
};

function componentWillUpdate(nextProps) {
  // title changed
  if (nextProps.title !== this.props.title) {
    // if title1 is currently shown
    if (this.props.opacity1) {
      // update title2
      this.props.setTitle2(nextProps.title);

      // update opacities
      this.props.setOpacity1(false);
      this.props.setOpacity2(true);
    } else {
      // update title1
      this.props.setTitle1(nextProps.title);

      // update opacities
      this.props.setOpacity1(true);
      this.props.setOpacity2(false);
    }
  }
}

const SlideHeaderSmart = compose(
  withState("title1", "setTitle1", ""),
  withState("title2", "setTitle2", ""),
  withState("opacity1", "setOpacity1", false),
  withState("opacity2", "setOpacity2", false),
  lifecycle({
    componentWillUpdate(nextProps, nextState) {
      componentWillUpdate.bind(this)(nextProps, nextState);
    },
  }),
)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SlideHeader),
);

export default SlideHeaderSmart;
