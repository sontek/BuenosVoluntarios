import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router, mount} from '../../tests/test_utils';

describe("test App", () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router>
                <App />
            </Router>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

});