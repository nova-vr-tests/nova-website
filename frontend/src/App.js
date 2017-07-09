import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import PropTypes from 'prop-types';

const apiTest = async () => {
  const r = await fetch("api/businessprops/")
  const json = await r.json()

  console.log(json)
}

class AppDumb extends Component {
  render() {
    return (
      <div className="wrapper">
        <img src={ logo } alt="logo" className="logo" />
        <div className="footer-background init-position">
        </div>
      </div>
    )
  }
}

AppDumb.propTypes = {
  footerBgPos: 0,
  logoPos: 0,
}

class App extends Component {
  componentDidMount() {

  }

  render() {
    apiTest()

    return <AppDumb />
  }
}

export default App;
