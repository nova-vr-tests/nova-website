import React, { Component } from 'react';
import { connect }from 'react-redux';
import './App.css';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import IntroAnimation from './components/IntroAnimation.jsx'
import { INTRO_FINISHED } from './constants.js'
import Sidebar from './components/Sidebar.jsx'

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
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}

const AppDumb = props => (
  <div id="app--wrapper">
    <IntroAnimation />
    <div className={ "router--wrapper " + (props.introKeyframe < INTRO_FINISHED ? "transparent" : "") }>
      <Sidebar />
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
    apiTest()
  }

  render() {
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