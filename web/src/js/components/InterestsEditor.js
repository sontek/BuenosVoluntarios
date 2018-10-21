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

class InterestsEditor extends React.Component {
    state = {
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
        legal: false,
        creative: false,
        teaching: false
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked }) ;   
    };

    renderSwitch(k, i) {
        let checked = this.state[k];
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

    onSubmit = () => {
        this.props.onSaveInterests(this.user.id, {...this.state}).then((result) => {
            if (result.data.success) {
                console.log("==== USER UPDATES SUCCESS");
            }
            else {
                console.log("FAILED TO SAVE INTERESTS");
                this.setState({
                    errors: [
                        "Failed to save interests"
                    ]
                });
            }
        });
    };

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
                                        return this.renderSwitch(interest, i)
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
                                return this.renderSwitch(interest, i)
                            })}
                        </FormGroup>
                        <FormGroup row>
                            {['creative', 'legal', 'teaching'].map( (interest, i) => {
                                return this.renderSwitch(interest, i)
                            })}
                        </FormGroup>
                    </FormControl>
                </Card>
                <Button type="submit" variant="contained" color="primary" onClick={this.onSubmit}>
                    Save
                </Button>
            </Fragment>
        )
    }
};

const InterestsContainer = connect(
    (state, ownProps) => {
        return {
            user: state.users.user
        };
    },
    (dispatch, ownProps) => {
        return {
            onSaveInterests: (user_id, interests) => {
                return dispatch(updateInterests(user_id, interests));
            },
        }
    },
)(InterestsEditor);

export default withRouter(InterestsContainer);
