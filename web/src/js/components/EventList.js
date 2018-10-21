import React, { Component, Fragment } from 'react';
import {
    withStyles,
    Typography,
    Button,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,

} from '@material-ui/core';

class EventList extends Component {
    state = {
        loading: true,
        events: [],
    }
    render() {
        const { classes } = this.props;

        return (
                <Fragment>
                {!this.state.events.length ? <h2>No Events Scheduled</h2> : (
                        <List>
                        {this.state.events.map(event => (
                                <ListItem>
                                <ListItemText primary={event.name} secondary={event.date} />
                                </ListItem>
                        )
                                              )}
                    </List>
                ) }
                </Fragment>
        )
    }
}


export default EventList;
