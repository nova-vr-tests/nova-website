import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const apiTest = async () => {
  const r = await fetch("api/businessprops/")
  const json = await r.json()

  console.log(json)
}

class App extends Component {
  render() {

    apiTest()

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Nova XR Media</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
