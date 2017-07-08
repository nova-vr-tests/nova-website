import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

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
      </div>
    )
  }
}

class App extends Component {
  render() {
    apiTest()

    return <AppDumb />
  }
}

export default App;
