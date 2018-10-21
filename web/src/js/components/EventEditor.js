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


class EventEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            date: '',
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
    handleChange = name => e => {
        this.setState({[e.target.name]: e.target.value })
    }
    renderSwitch = (k, i) => {
        let checked = this.state[k] || false;
        return (
                <Grid item key={i}>
                <FormControlLabel
            control={
                    <Switch
                checked={checked}
                onChange={this.handleChange(k)}
                value={k}
                    />
                                        
            }
            label={k.toUpperCase()}
                />
                </Grid>
        )
            
    };
    render() {
        const {classes} = this.props;
        return (
                <Fragment>
                <ValidatorForm onSubmit={this.onSubmit}>
                <div>
                <TextValidator
            name={"name"}
            label={"Event Name"}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            value={this.state.date}
            validators={["required"]}
            errorMessages={[requiredMessage]}
            margin="normal"
                />
                </div>               <div>
                <TextValidator
            name={"description"}
            label={"Short Description"}
            onChange={this.handleChange}
            value={this.state.name}
            validators={[]}
            errorMessages={[]}
            margin="normal"
                />
                </div>
                <h2>Wanted Skills and Interests</h2>
                <Interests renderSwitch={this.renderSwitch} />
                </ValidatorForm>
                </Fragment>
        )
    }
}
/*
const EventsContainer = connect(
    (state, ownProps) => {
        return {
            event: state.events.event
                    
        };
            
    },
    (dispatch, ownProps) => {
        return {
            onSaveInterests: (event_id, interests) => {
                return dispatch(updateInterests(event_id, interests));
                            
            },
                    
        }
            
    },
)(EventEditor);

export default withRouter(EventsContainer);
*/
export default EventEditor;
