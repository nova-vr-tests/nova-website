import React from "react";
import {connect} from "react-redux";

import {
  updateImgViewerUrl,
  updateImgViewerIsOpened,
} from "../reducer/actions/App.js";

const mapStateToProps = function(state) {
  return {
    url: state.appReducer.imgViewer.url,
    isOpened: state.appReducer.imgViewer.isOpened,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    updateImgViewerUrl: url => dispatch(updateImgViewerUrl(url)),
    updateImgViewerisOpened: isOpened =>
      dispatch(updateImgViewerIsOpened(isOpened)),
  };
};

const ImgViewerDumb = props => {
  const styles = {
    wrapper: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 1000000,
      pointerEvents: props.isOpened ? "inherit" : "none",
      opacity: props.isOpened ? 1 : 0,
      transition: "opacity 0.3s ease-in",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    closeWrapper: {
      fontSize: "1.5rem",
      marginTop: "5rem",
      cursor: "pointer",
    },
    img: {
      width: "80vw",
      pointerEvent: "none",
    },
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: -1,
      cursor: "pointer",
    },
  };
  return (
    <div style={styles.wrapper} className="img-viewer">
      <div
        onClick={() => props.updateImgViewerisOpened(false)}
        style={styles.overlay}
      />
      <img src={props.url} style={styles.img} alt="img" />
      <div
        onClick={() => props.updateImgViewerisOpened(false)}
        style={styles.closeWrapper}>
        Close
      </div>
    </div>
  );
};

const ConnectedImgViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImgViewerDumb);

export default ConnectedImgViewer;
