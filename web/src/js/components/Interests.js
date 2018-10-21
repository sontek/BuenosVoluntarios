import React, { Fragment } from 'react';
import {
    FormControl,
    FormLabel,
    FormGroup,
    Paper,
    Card

} from '@material-ui/core';
import {withRouter} from "react-router";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {ValidatorForm} from "react-material-ui-form-validator";
import connect from "react-redux/es/connect/connect";
import {updateInterests} from "../actions/users";

const cardStyle = {
    display: 'block',
    maxWidth: '600px',
    margin: '0 auto',
    marginBottom: '10px',
    marginTop: '10px',
    padding: '10px',

};

class Interests extends React.Component {
    render() {
        const {classes} = this.props;
        return (
                <Fragment>
                <Card style={cardStyle}>
                <FormControl component="fieldset">
                <FormLabel component="legend">Cause Areas of Interest</FormLabel>
                <FormGroup row>
                <Grid container>
                {[
                    'children', 'animals', 'seniors',
                    'women', 'emergency', 'veterans',
                    'homelessness', 'medical', 'environment'
                                                        
                ].map( (interest, i) => {
                    return this.props.renderSwitch(interest, i)
                                                        
                })}
            </Grid>
                </FormGroup>
                </FormControl>
                </Card>
                <Card style={cardStyle}>
                <FormControl component="fieldset">
                <FormLabel component="legend">Skills and Contributions</FormLabel>
                <FormGroup row>
                {['labor', 'technology', 'funding'].map( (interest, i) => {
                    return this.props.renderSwitch(interest, i)
                                                
                })}
            </FormGroup>
                <FormGroup row>
                {['creative', 'legal', 'teaching'].map( (interest, i) => {
                    return this.props.renderSwitch(interest, i)
                                                
                })}
            </FormGroup>
                </FormControl>
                </Card>
        </Fragment>)
    }
}

export default Interests
