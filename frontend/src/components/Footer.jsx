import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import './Footer.css';
import { FOOTER_FINAL } from '../constants.js'

const reduxStatePropTypes = {
  introKeyframe: PropTypes.number,
}

const mapStateToProps = function(state) {
	return {
        introKeyframe: state.appReducer.introKeyframe,
  }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}

const FooterDumb = props => (
    <div className="footer--wrapper">
        <div className={
          "footer-background "
          + (props.introKeyframe >= FOOTER_FINAL ? " final-position " : "init-position")
          }>
        </div>
    </div>
)

FooterDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,
}

FooterDumb.defaultProps = {
}

class Footer extends Component {
  componentDidMount() {

  }

  render() {
    return <FooterDumb
      introKeyframe={ this.props.introKeyframe }/>
  }
}

Footer.propTypes = {
  ...FooterDumb.propTypes,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)