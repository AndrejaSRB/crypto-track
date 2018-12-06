import React, { Component } from 'react';
import './App.sass';
import Currency from './components/currency/Currency';
import SinglePage from './components/single-page/SinglePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
              <Route path="/" component={Currency} exact/>
              <Route path="/:currency_name" component={SinglePage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
