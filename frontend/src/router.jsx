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

import { DesignPresentation } from './components/pages/NovaXR/Design.jsx'
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

const routeUrls = [
    [
        ['/design', '/world', '/interface', '/story'],
        ['/technology', '/vr', '/ar', '/related-techs'],
        ['/business', '/influence', '/revolution', '/solution']
    ],
    [
        ['/lab-live', '/project-1', '/project-2', '/project-3'],
        ['/news', '/project-1', '/project-2', '/project-3'],
        ['/ed', '/project-1', '/project-2', '/project-3']
    ],
    [
        ['/innovate'],
        ['/improve'],
        ['/strengthen']
    ]
]

const mapUrlsToComp = (Comp, i, j) => {
    const urls = routeUrls[i][j]

    return props => <Comp routeUrls={ urls } />
}

const createRoutes = routes => (
    <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="animated-switch--wrapper"
    >
        <Route path={ routes[0][1] } component={ routes[0][0] } />
        <Route path={ routes[1][1] } component={ routes[1][0] } />
        <Route path={ routes[2][1] } component={ routes[2][0] } />
        <Route path={ routes[3][1] } component={ routes[3][0] } />
        <Route path={ routes[4][1] } component={ routes[4][0] } />
        <Route path={ routes[5][1] } component={ routes[5][0] } />
        <Route path={ routes[6][1] } component={ routes[6][0] } />
        <Route path={ routes[7][1] } component={ routes[7][0] } />
        <Route path={ routes[8][1] } component={ routes[8][0] } />
    </AnimatedSwitch>
)

const routes = [
    [mapUrlsToComp(DesignPresentation, 0, 0), routeUrls[0][0][0]],
    [mapUrlsToComp(DesignPresentation, 0, 1), routeUrls[0][1][0]],
    [mapUrlsToComp(DesignPresentation, 0, 2), routeUrls[0][2][0]],
    [mapUrlsToComp(DesignPresentation, 1, 0), routeUrls[1][0][0]],
    [mapUrlsToComp(DesignPresentation, 1, 1), routeUrls[1][1][0]],
    [mapUrlsToComp(DesignPresentation, 1, 2), routeUrls[1][2][0]],
    [mapUrlsToComp(DesignPresentation, 2, 0), routeUrls[2][0][0]],
    [mapUrlsToComp(DesignPresentation, 2, 1), routeUrls[2][1][0]],
    [mapUrlsToComp(DesignPresentation, 2, 2), routeUrls[2][2][0]],
]

const Router = props => {
    const Line1 = createRoutes(routes)

    return (
        <Line
            lines={ [Line1, '', ''] }
        />
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router)

export {
    routeUrls,
}
