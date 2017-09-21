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
import { getLinePosition } from './components/pages/pages.js'
import Bg from './components/Bg/Bg.jsx'
import { updateLinePosition } from './reducer/actions/App.js'
import Header from './components/Header/Header.jsx'

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
    pathname: state.routing.location.pathname,
  }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
    updateLinePosition: linePosition => dispatch(updateLinePosition(linePosition)),
  }
}

const _styles = {
    routerWrapper: {
        opacity: 1,
        transition: 'opacity 1s linear',
        display: 'flex',
        flex: 1,
    },
    transparent: {
        opacity: 0,
    },
}
const AppDumb = props => (
  <div id="app--wrapper">
      <div
          style={ _styles.routerWrapper }
          className={ "router--wrapper " + (props.introKeyframe > INTRO_FINISHED ? "transparent" : "") }>

            <Header />
            <Bg />
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
    componentWillMount() {
        this.props.updateLinePosition(getLinePosition(this.props.pathname))
    }

    componentDidMount() {
        apiTest()
    }

    componentWillReceiveProps(newProps, newState) {
        this.props.updateLinePosition(getLinePosition(newProps.pathname))
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
