import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

import '../../css/App.css';
import {Route, Link, Switch} from "react-router-dom";
import { Menu as MenuIcon, AccountCircle, Add as AddIcon } from '@material-ui/icons';
import {
    CssBaseline,
    withStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core';
import PrivateRoute from '../materials/PrivateRoute';
import { withRouter } from 'react-router';

import Login from './Login';
import Home from './Home';
import Register from './Register';
import InterestsEditor from './InterestsEditor';
import EventEditor from './EventEditor';
import EventList from './EventList';

const logoStyle = {
    maxWidth: "150px",
};

class App extends Component {
  render() {
      return (
          <Fragment>
              <CssBaseline />
              <div className="App">
                <TopNav user={this.props.user} />
                <Switch>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
                  <Route exact path="/" component={Home}/>
                  <PrivateRoute path="/interests" component={InterestsEditor} user={this.props.user} />
                  <Route path="/events" component={EventEditor} user={this.props.user} />
                  <Route path="/listevents" component={EventList} user={this.props.user} />
                </Switch>
              </div>
          </Fragment>
    );
  }
}

const TopNav = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
            <IconButton color="inherit" aria-label="Menu" component={Link} to={"/listevents"}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit">
            <img src="/img/cropped_logo.png" style={logoStyle}/>
                </Typography>
                <div className="flex" />
            {props.user.isAuthenticated ? (
                    <Fragment>
                    <IconButton component={Link} to={"/interests"}><AccountCircle /></IconButton>
                    <IconButton component={Link} to={"/events"}><AddIcon /></IconButton>
                    </Fragment>
            ) : (
                    <Fragment>
                        <Button color="inherit" component={Link} to={"/login"}>Login</Button>
                        <Button color="inherit" component={Link} to={"/register"}>Register</Button>
                    </Fragment>
                )}
            </Toolbar>
        </AppBar>
    );
};

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
