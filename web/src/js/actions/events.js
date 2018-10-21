import {makeRequest} from "../api";

export const addEvent = (event) => (
    dispatch,
    getState
) => {
    return makeRequest("/createEvent", {...event});
};
