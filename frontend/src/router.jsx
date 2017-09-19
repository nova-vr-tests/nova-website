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
import './router.css'

import Pages from './components/pages/pages.js'

import { AnimatedSwitch } from 'react-router-transition/lib/react-router-transition'

const constants = { styles }


const reduxStatePropTypes = {
  routing: PropTypes.object,
}

const mapStateToProps = function(state) {
	return {
    routing: state.routing,
  }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}



const mapStyles = styles => {
  return {
    opacity: styles.opacity,
    transform: 'scale(${styles.scale})',
  };
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  atLeave: {
    opacity: 0,
    scale: 0.8,
  },
  atActive: {
    opacity: 1,
    scale: 1,
  },
}

const createRoutesForSection = i => (
    <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="animated-switch--wrapper"
    >
        <Route exact path={ Pages[i][0][0][1] } component={ Pages[i][0][0][0] } />
        <Route exact path={ Pages[i][0][1][1] } component={ Pages[i][0][1][0] } />
        <Route exact path={ Pages[i][0][2][1] } component={ Pages[i][0][2][0] } />

        <Route exact path={ Pages[i][1][0][1] } component={ Pages[i][1][0][0] } />
        <Route exact path={ Pages[i][1][1][1] } component={ Pages[i][1][1][0] } />
        <Route exact path={ Pages[i][1][2][1] } component={ Pages[i][1][2][0] } />

        <Route exact path={ Pages[i][2][0][1] } component={ Pages[i][2][0][0] } />
        <Route exact path={ Pages[i][2][1][1] } component={ Pages[i][2][1][0] } />
        <Route exact path={ Pages[i][2][2][1] } component={ Pages[i][2][2][0] } />
    </AnimatedSwitch>
)

const createRoutesForSubSection = i => (
    <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="animated-switch--wrapper"
    >
        <Route exact path={ Pages[i][0][1] } component={ Pages[i][0][0] } />
        <Route exact path={ Pages[i][1][1] } component={ Pages[i][1][0] } />
        <Route exact path={ Pages[i][2][1] } component={ Pages[i][2][0] } />
    </AnimatedSwitch>
)
const Router = props => {
    const Line1 = createRoutesForSection(0)
    const Line2 = createRoutesForSection(1)
    const Line3 = createRoutesForSubSection(2)

    return (
        <Line
            lines={ [Line1, Line2, Line3] }
        />
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router)
