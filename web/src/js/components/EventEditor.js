import React, { Fragment } from 'react';
import {
    FormControl,
    FieldSet,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Switch,
    Paper,
    Card

} from '@material-ui/core';
import {withRouter} from "react-router";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import { requiredMessage, isEmailMessage} from "../form_utils";
import connect from "react-redux/es/connect/connect";
//import {updateInterests} from "../actions/events";

import Interests from './Interests';
import {addEvent} from "../actions/events";


class EventEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                name: '',
                description: '',
                date: '',
                owner: props.user.id,
                interests: {
                    children: false,
                    seniors: false,
                    animals: false,
                    emergency: false,
                    homelessness: false,
                    medical: false,
                    women: false,
                    veterans: false,
                    environment: false,
                    labor: false,
                    technology: false,
                    funding: false,
                    creative: false,
                    teaching: false,
                    legal: false
                }
            }
        }
    }

    handleChangeInterest = name => event => {
        const interests = {
            ...this.state.event.interests,
        };
        interests[name] = event.target.checked;

        this.setState({
            event: {
                ...this.state.event,
                interests: interests
            }
        });
    };

    renderSwitch = (k, i) => {
        let checked = this.state.event.interests[k] || false;

        return (
            <Grid item key={i}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={this.handleChangeInterest(k)}
                            value={k}
                        />
                    }
                    label={k.toUpperCase()}
                />
            </Grid>
        );
            
    };

    onSubmit = () => {
        this.props.onSaveEvent(this.state.event).then((result) => {
            if (result.data.success) {
                console.log("==== EVENT UPDATES SUCCESS");
                this.props.history.push("/listevents");
            }
            else {
                console.log("FAILED TO SAVE EVENT");
                this.setState({
                    errors: [
                        "Failed to save event"
                    ]
                });
            }
        });
    };

    render() {
        const {classes} = this.props;
        console.log("==== STATE EVENT", this.state.event)

        return (
                <Fragment>
                    <ValidatorForm onSubmit={this.onSubmit}>
                        <div>
                            <TextValidator
                                name={"name"}
                                label={"Event Name"}
                                onChange={(e) => {
                                    console.log("CHANGE", e.target.value);
                                    const newEvent = {
                                        ...this.state.event,
                                    };
                                    newEvent[e.target.name] = e.target.value;

                                    this.setState({
                                        event: newEvent
                                    });
                                }}
                                value={this.state.name}
                                validators={["required"]}
                                errorMessages={[requiredMessage]}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextValidator
                                name={"date"}
                                label={"Event Date"}
                                onChange={(e) => {
                                    console.log("CHANGE", e.target.value);
                                    const newEvent = {
                                        ...this.state.event,
                                    };
                                    newEvent[e.target.name] = e.target.value;

                                    this.setState({
                                        event: newEvent
                                    });
                                }}
                                value={this.state.date}
                                validators={["required"]}
                                errorMessages={[requiredMessage]}
                                margin="normal"
                            />
                        </div>
                        <h2>Wanted Skills and Interests</h2>
                        <Interests renderSwitch={this.renderSwitch} />
                    </ValidatorForm>
                    <Button type="submit" variant="contained" color="primary" onClick={this.onSubmit}>
                        Save
                    </Button>
                </Fragment>
        )
    }
}

const EventsContainer = connect(
    (state, ownProps) => {
        return {
            user: state.users.user
        };
            
    },
    (dispatch, ownProps) => {
        return {
            onSaveEvent: (event) => {
                return dispatch(addEvent(event));
            },
        }
            
    },
)(EventEditor);

export default withRouter(EventsContainer);