import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { attemptLogin } from '../actions/users';

const styles = theme => ({
    wrapper: {
        marginTop: 15,
        maxWidth: 400,
        margin: "0 auto"
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
});


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, user} = this.props;

        return (
            <div className={classes.wrapper}>
                <Paper elevation={4} className={classes.paper}>
                    <div>
                       Dashboard
                    </div>
                </Paper>
            </div>
        );
    }
}

const DashboardContainer = connect(
    (state, ownProps) => {
        return {
            user: state.users.user
        };
    },
    (dispatch, ownProps) => {
        return {
            onLogin: (email_address, password) => {
                dispatch(attemptLogin({email_address, password}));
            }
        }
    },
)(Dashboard);

export default withStyles(styles)(DashboardContainer);
