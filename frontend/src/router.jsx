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

import Pages from './components/pages/pages.js'

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

const createRoutesForSection = i => (
    <Switch>
        <Route exact path={ Pages[i][0][0][1] } component={ Pages[i][0][0][0] } />
        <Route exact path={ Pages[i][0][1][1] } component={ Pages[i][0][1][0] } />
        <Route exact path={ Pages[i][0][2][1] } component={ Pages[i][0][2][0] } />

        <Route exact path={ Pages[i][1][0][1] } component={ Pages[i][1][0][0] } />
        <Route exact path={ Pages[i][1][1][1] } component={ Pages[i][1][1][0] } />
        <Route exact path={ Pages[i][1][2][1] } component={ Pages[i][1][2][0] } />

        <Route exact path={ Pages[i][2][0][1] } component={ Pages[i][2][0][0] } />
        <Route exact path={ Pages[i][2][1][1] } component={ Pages[i][2][1][0] } />
        <Route exact path={ Pages[i][2][2][1] } component={ Pages[i][2][2][0] } />
    </Switch>
)

const Router = props => {
    const Line1 = createRoutesForSection(0)
    const Line2 = createRoutesForSection(1)
    const Line3 = <div></div>

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
