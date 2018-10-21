import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { requiredMessage, isEmailMessage, minStringLengthMessage } from "../form_utils";
import Paper from '@material-ui/core/Paper';
import { withStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { connect } from 'react-redux'
import {attemptRegister, loginSuccess} from '../actions/users';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '../materials/Snackbar';
import {withRouter} from "react-router";

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


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_number: '',
            is_ngo: false,
            email: '',
            password: '',
            errors: [],
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value })
    }
    handleRadioChange = event => {
        this.setState({ is_ngo: event.target.value });
    };

    onSubmit = () => {
        this.props.onRegister(
            this.state.email,
            this.state.password,
            this.state.phone_number,
            this.state.is_ngo,
        ).then((result) => {
            if (result.data.success) {
                this.props.loginSuccess({
                    user: result.data.user,
                    interests: {}
                });

                this.props.history.push("/listevents");
                this.setState({
                    errors: []
                });
            }
            else {
                this.setState({
                    errors: [
                        "Failed to register"
                    ]
                });
            }
        });
    };

    renderErrors = () => {
        return this.state.errors.map((error, index) => {
            return (
                <Snackbar
                    key={`error-${index}`}
                    variant="error"
                    className={this.props.classes.margin}
                    message={error}
                />
            );
        });
    };

    render() {
        const {classes, user} = this.props;

        return (
            <div className={classes.wrapper}>
                <Paper elevation={4} className={classes.paper}>
                    <div>
                        {this.renderErrors()}
                        <ValidatorForm onSubmit={this.onSubmit}>
                            <div>
                                <TextValidator
                                    name={"email"}
                                    label={"Email"}
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.email}
                                    validators={["required", "isEmail"]}
                                    errorMessages={[requiredMessage, isEmailMessage]}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextValidator
                                    name={"password"}
                                    label={"Password"}
                                    type={"password"}
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.password}
                                    validators={["required", "minStringLength:6"]}
                                    errorMessages={[requiredMessage, minStringLengthMessage(6)]}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextValidator
                                    name={"phone_number"}
                                    label={"Phone Number"}
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.phone_number}
                                    validators={["required"]}
                                    errorMessages={[requiredMessage]}
                                    margin={"normal"}
                                />
                            </div>
                <div>
                <FormControl component="fieldset">
                <FormLabel component="legend">Register As</FormLabel>
                <RadioGroup
            aria-label="Register As"
            name="is_ngo"
            value={this.state.is_ngo}
            onChange={this.handleRadioChange}
                >
                <FormControlLabel value="true" control={<Radio />} label="Organization" />
                <FormControlLabel value="false" control={<Radio />} label="Individual" />
                </RadioGroup>
                </FormControl>
                </div>

                            <Button type="submit" variant="contained" color="primary"
                                    disabled={user.isFetching}
                            >
                                Register {
                                user.isFetching ?
                                    <CircularProgress size={25} className={classes.progress} /> :
                                    undefined
                            }
                            </Button>
                        </ValidatorForm>
                    </div>
                </Paper>
            </div>
        );
    }
}

const RegisterContainer = connect(
    (state, ownProps) => {
        return {
            user: state.users.user
        };
    },
    (dispatch, ownProps) => {
        return {
            onRegister: (email, password, phone_number, is_ngo) => {
                return dispatch(attemptRegister({email, password, phone_number, is_ngo}));
            },
            loginSuccess: (user) => {
                return dispatch(loginSuccess(user));
            }
        }
    },
)(Register);

export default withStyles(styles)(withRouter(RegisterContainer));
