import React, { Component } from 'react';
import { connect }from 'react-redux';
import './App.css';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import IntroAnimation from './components/IntroAnimation.jsx'
import { incrementIntroKeyframe } from './reducer/actions/App'
import { INTRO_FINISHED } from './constants.js'

const apiTest = async () => {
  const r = await fetch("api/businessprops/")
  const json = await r.json()

  console.log(json)
}

const reduxStatePropTypes = {
  routing: PropTypes.object,
  introKeyframe: PropTypes.number,
}

const mapStateToProps = function(state) {
	return {
    routing: state.routing,
    introKeyframe: state.appReducer.introKeyframe,
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

const AppDumb = props => (
  <div id="app--wrapper">
    <IntroAnimation />
    <div className={ "router--wrapper " + (props.introKeyframe < INTRO_FINISHED ? "transparent" : "") }>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/about-us" component={ About } />
      </Switch>
    </div>
    <Footer />
  </div>
)

AppDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,
}

class App extends Component {
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
    apiTest()

    return <AppDumb
      introKeyframe={ this.props.introKeyframe }
      />
  }
}

App.propTypes = {
  ...AppDumb.propTypes,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)