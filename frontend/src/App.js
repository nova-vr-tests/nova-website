import React, { Component } from 'react';
import { connect }from 'react-redux';
import './App.css';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import About from './components/About/About.jsx'
import Home from './components/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import Line from './components/Line/Line.jsx'
import IntroAnimation from './components/IntroAnimation/IntroAnimation.jsx'
import { INTRO_FINISHED } from './constants.js'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import { styles } from './constants.js'
import NovaRouter from './router.jsx'

const constants = { styles }

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

const _styles = {
    routerWrapper: {
        opacity: 1,
        transition: 'opacity 1s linear',
        display: 'flex',
        flex: 1,
        // marginLeft: 'calc(3 * ' + constants.styles.unitWidth + ')', /* same as sidebar width */
    },
    transparent: {
        opacity: 0,
    },
}
const AppDumb = props => (
  <div id="app--wrapper">
      <div
          style={ _styles.routerWrapper }
          className={ "ruter--wrapper " + (props.introKeyframe > INTRO_FINISHED ? "transparent" : "") }>
      <Sidebar />
      <NovaRouter />
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
