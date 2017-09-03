import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import './IntroAnimation.css';
import frame1 from './img/intro-logo/frame1.svg';
import frame2 from './img/intro-logo/frame2.svg';
import frame3 from './img/intro-logo/frame3.svg';
import { LOGO_FRAME1, LOGO_FRAME2, LOGO_FRAME3, INTRO_FINISHED } from '../constants'
import { incrementIntroKeyframe } from '../reducer/actions/App'

const reduxStatePropTypes = {
    introKeyframe: PropTypes.number,
}

const mapStateToProps = function(state) {
	return {
        keyframe: state.appReducer.introKeyframe,
  }
}

const reduxDispatchPropTypes = {
  incrementIntroKeyframe: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
    incrementIntroKeyframe: () => dispatch(incrementIntroKeyframe()),
  }
}

const IntroAnimationDumb = props => (
    <div className={ "intro--wrapper " + (props.keyframe >= INTRO_FINISHED ? "transparent" : "") }>
        <img
            src={ frame1 }
            alt="logo"
            className={ "logo " + (props.keyframe !== LOGO_FRAME1 ? " transparent " : "") }
        />
        <img
            src={ frame2 }
            alt="logo"
            className={ "logo " + (props.keyframe !== LOGO_FRAME2 ? " transparent " : "") }
        />
        <img
            src={ frame3 }
            alt="logo"
            className={ "logo " + (props.keyframe !== LOGO_FRAME3 ? " transparent " : "") }
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
    let i = 0;
    const j = setInterval(() => {
      i = i + 1
      this.props.incrementIntroKeyframe()

      if(i >= INTRO_FINISHED) {
        clearInterval(j)
      }
    }, 4000)
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