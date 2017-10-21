// @flow

import * as React from 'react'
import { connect }from 'react-redux'
import './styles/IntroAnimation.css'
import frame1 from '../img/intro-logo/frame1.svg'
import frame2 from '../img/intro-logo/frame2.svg'
import frame3 from '../img/intro-logo/frame3.svg'
import { LOGO_FRAME1, LOGO_FRAME2, LOGO_FRAME3, INTRO_FINISHED } from '../../constants'
import { incrementIntroKeyframe } from '../../reducer/actions/App'

import type {
    ReduxState,
    ReduxDispatch,
    OwnProps,
    Props,
} from './IntroAnimationTypes.jsx'

import type {
    MapStateToProps,
    MapDispatchToProps,
} from '../../storeTypes.jsx'


// const mapStateToProps = function(state: State): ReduxState {
const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
    return {
        keyframe: state.appReducer.introKeyframe,
    }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch){
    return {
        incrementIntroKeyframe: () => dispatch(incrementIntroKeyframe()),
    }
}


const IntroAnimationDumb: React.StatelessFunctionalComponent<Props> = (props) => (
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

class IntroAnimation extends React.Component<Props> {
  componentDidMount() {
    let i = 0
    const j = setInterval(() => {
      i = i + 1
      this.props.incrementIntroKeyframe()

      if(i >= INTRO_FINISHED) {
        clearInterval(j)
      }
    }, 1000)
  }

  render(): React.Element<typeof IntroAnimationDumb>{
    return <IntroAnimationDumb { ...this.props } />
  }
}

const ConnectedIntroAnimation: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps,
)(IntroAnimation)

export default ConnectedIntroAnimation
