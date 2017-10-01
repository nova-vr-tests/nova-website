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

import Presentation from './components/pages/pages.jsx'

import { AnimatedSwitch } from 'react-router-transition/lib/react-router-transition'

import slides from './components/pages/pages.jsx'
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

const Router = props => {

    return (
        <Line
            lines={ [<Presentation />, '', ''] }
        />
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router)

