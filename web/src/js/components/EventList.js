import React, { Component, Fragment } from 'react';
import {
    withStyles,
    Typography,
    Button,
    IconButton,
    Paper,
    Card,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,

} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import {makeRequest} from "../api";

const cardStyle = {
    display: 'block',
    maxWidth: '600px',
    margin: '0 auto',
    marginBottom: '10px',
    marginTop: '10px',
    padding: '10px',

};

class EventList extends Component {
    state = {
        loading: true,
        events: [],
    };

    componentWillMount() {
        makeRequest("/listEvents").then((result) => {
            this.setState({
                events: result.data,
            });
        });
    }

    async deleteEvent(event) {
        makeRequest("/deleteEvent", {id: event.id}).then((result) => {
            this.setState({
                events: result.data.events,
            });
        });
    }

    render() {
        const { classes } = this.props;

        return (
                <Card style={cardStyle}>
                {!this.state.events.length ? <h2>No Events Scheduled</h2> : (
                        <List>
                        {this.state.events.map((event) => (
                                <ListItem key={event.id}>
                                    <ListItemText primary={event.name} secondary={event.date} />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => this.deleteEvent(event)} color="inherit">
                                        <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                        ))}
                    </List>
                ) }
                </Card>
        )
    }
}


export default EventList;
