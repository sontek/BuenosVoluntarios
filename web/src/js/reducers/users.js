import {
    LOGIN_SUCCESS,
    LOGIN_START,
    LOGIN_FAILED,
} from "../actions/users";

const initialState = {
    user: {
        isAuthenticated: false,
        isFetching: false,
        errors: [],
    }
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                user: {
                    ...state.user,
                    isFetching: true,
                    errors: [],
                }
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload.user,
                    interests: action.payload.user.interests || {},
                    isAuthenticated: true,
                    isFetching: false,
                    errors: [],
                }
            };

        case LOGIN_FAILED:
            return {
                ...state,
                user: {
                    ...state.user,
                    isFetching: false,
                    errors: action.payload.errors
                }
            };
        default:
            return state;
    }
};

export default user;
