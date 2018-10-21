import {combineReducers} from "redux";
import userReducers from '../reducers/users';

const appReducer = combineReducers({
    users: userReducers
});

export default appReducer;
