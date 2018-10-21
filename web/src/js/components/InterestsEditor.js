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


class InterestsEditor extends React.Component {
    state = {
        children: true,
        seniors: true,
        animals: true,
        emergency: true,
        homelessness: true,
        medical: true,
        women: true,
        veterans: true,
        environment: true,
        labor: true,
        technology: true,
        funding: true,
        legal: true,
        creative: true,
        teaching: true
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked }) ;   
    };

    renderSwitch(k, i) {
        let checked = this.state[k];
        return (
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
        )
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Card >
            <FormControl component="fieldset">
            <FormLabel component="legend">Cause Areas of Interest</FormLabel>    
                <FormGroup row>
                {['children', 'animals', 'seniors'].map( (interest, i) => {
                    return this.renderSwitch(interest, i)
                })}
            </FormGroup>
                <FormGroup row>
                {['women', 'emergency', 'veterans'].map( (interest, i) => {
                    return this.renderSwitch(interest, i)
                })}
            </FormGroup>
                <FormGroup row>
                {['homelessness', 'medical', 'environment'].map( (interest, i) => {
                    return this.renderSwitch(interest, i)
                })}
            </FormGroup>
                </FormControl>
                </Card>
                <Card>
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
</Fragment>
        )
    }
}

export default InterestsEditor;
