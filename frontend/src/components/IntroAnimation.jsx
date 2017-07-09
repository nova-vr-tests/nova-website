import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import { push } from 'react-router-redux';
import './IntroAnimation.css';
import logo from '../logo.png';

const reduxStatePropTypes = {
    introKeyframe: PropTypes.number,
}

const mapStateToProps = function(state) {
	return {
        keyframe: state.appReducer.introKeyframe,
  }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}

const IntroAnimationDumb = props => (
    <div className="intro--wrapper">
        <img
            src={ logo }
            alt="logo"
            className={ "logo " + (props.keyframe === 1 ? " transparent " : "") }
        />
    </div>
)

IntroAnimationDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,

  keyframe: PropTypes.number,
}

IntroAnimationDumb.defaultProps = {
    keyframe: 0,
}

class IntroAnimation extends Component {
  componentDidMount() {
  }

  render() {
    return <IntroAnimationDumb
        keyframe={ this.props.keyframe } />
  }
}

IntroAnimation.propTypes = {
  ...IntroAnimationDumb.propTypes,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntroAnimation)