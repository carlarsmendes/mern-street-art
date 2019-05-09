import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';

import api from '../api';

export default class MainNavbar extends Component {
  render() {
    return (
      <div>
          <header className="App-header">
          <NavLink to="/" exact  className="App-title"><h4>MERN Street Art</h4></NavLink>
          <NavLink to="/list" exact>List</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/new-street-art/:id">New Street Art</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/secret">Secret</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header>
      </div>
    )
  }
}
