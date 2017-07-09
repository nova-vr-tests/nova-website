import React, { Component } from 'react';
import { connect }from 'react-redux';
import './App.css';
import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import About from './components/About.jsx'
import Home from './components/Home.jsx'

const apiTest = async () => {
  const r = await fetch("api/businessprops/")
  const json = await r.json()

  console.log(json)
}

const reduxStatePropTypes = {
}

const mapStateToProps = function(state) {
	return {
  }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}

const AppDumb = props => (
  <div id="router--wrapper">
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/about-us" component={ About } />
    </Switch>
  </div>
)

AppDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,
}

class App extends Component {
  componentDidMount() {

  }

  render() {
    apiTest()

    return <AppDumb />
  }
}

App.propTypes = {
  ...AppDumb.propTypes,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)