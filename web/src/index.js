import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/components/App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {configureStore} from './js/redux_utils';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();
const store = configureStore(history);


const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <App />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
