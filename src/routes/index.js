import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Login from './login';
import Signup from './signup';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={Login} title="Login" hideNavBar/>
          <Scene key="signup" component={Signup} title="Sign Up" initial={true} hideNavBar/>
        </Scene>
      </Router>
    )
  }
}
