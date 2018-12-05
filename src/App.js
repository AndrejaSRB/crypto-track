import React, { Component } from 'react';
import './App.css';
import Currency from './components/currency/Currency.js'

class App extends Component {
  render() {
    return (
      <div className="container">
          <Currency />
      </div>
    );
  }
}

export default App;
