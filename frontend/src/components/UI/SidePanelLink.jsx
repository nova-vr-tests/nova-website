import React from "react";

import getStyles from "./SidePanelLinkStyles.jsx";

import {Link} from "react-router-dom";

const SidePanelLink = props => {
  const styles = getStyles(props);

  const wrapperStyle = {
    ...styles.linkWrapper,
    ...(props.isActive ? styles.activeLink : {}),
  };

  let Wrapper = props => <div {...props}>{props.children}</div>;

  if (props.to.pathname != "") {
    console.log(props.to);
    Wrapper = props => (
      <Link {...props} to={props.to} onClick={() => {}}>
        {props.children}
      </Link>
    );
  }

  return (
    <Wrapper
      style={wrapperStyle}
      onClick={props.onClickCallback}
      to={props.to}
      className="product-link--wrapper">
      <img src={props.pictoBgUrl} alt="pictoBg" style={styles.pictoBg} />
      <img src={props.pictoUrl} alt="picto" style={styles.picto} />
      <div style={styles.textWrapper}>
        <div style={styles.title}>{props.title}</div>
        {props.subtitle !== "" ? (
          <div style={styles.subtitle}>{props.subtitle}</div>
        ) : (
          ""
        )}
      </div>
    </Wrapper>
  );
};

SidePanelLink.defaultProps = {
  to: {
    pathname: "",
    search: "",
  },
  onClickCallback: () => {},
  pictoUrl: "",
  pictoBgUrl: "",
  title: "",
  subtitle: "",
  isActive: false,
  isSquarePicto: false,
  invertColors: false,
};

export default SidePanelLink;
