import React, { Component } from 'react';
import { connect } from 'react-redux'

import '../../css/App.css';
import {Route, Link, Switch} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Dashboard from './Dashboard';
import PrivateRoute from '../materials/PrivateRoute';
import { withRouter } from 'react-router'

class App extends Component {
  render() {
      return (
          <div className="App">
              <AppBar position="static">
                  <Toolbar>
                      <IconButton color="inherit" aria-label="Menu">
                          <MenuIcon />
                      </IconButton>
                      <Typography variant="title" color="inherit">
                          Brigaid
                      </Typography>
                      <Button color="inherit" component={Link} to={"/login"}>Login</Button>
                      <Button color="inherit" component={Link} to={"/register"}>Register</Button>
                  </Toolbar>
              </AppBar>
              <div>
                  <div>
                      <Switch>
                          <PrivateRoute path="/dashboard" component={Dashboard} user={this.props.user} />
                          <Route path="/login" component={Login}/>
                          <Route path="/register" component={Register}/>
                          <Route path="/" component={Home}/>
                      </Switch>
                  </div>
              </div>
          </div>
    );
  }
}

const AppContainer = connect(
    (state, ownProps) => {
        return {
            user: state.users.user
        };
    },
    (dispatch, ownProps) => {
        return {
        }
    },
)(App);


export default withRouter(AppContainer);
