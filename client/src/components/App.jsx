import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import Home from './pages/Home';
import List from './pages/List';
import Map from './pages/Map';
import NewStreetArt from './pages/NewStreetArt';
import StreetArtDetail from './pages/StreetArtDetail';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streetarts: []
    }
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <MainNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/list" exact component={List} />
          <Route path="/map" component={Map} />
          <Route path="/new-street-art" component={NewStreetArt} />
          <Route path="/street-art-detail/:id" component={StreetArtDetail} /> 
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}