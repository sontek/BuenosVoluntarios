import axios from 'axios';

export const OK = 200;

export const makeRequest = (
    url,
    body,
    token = undefined,
    method = "POST",
    headers = {},
    content_type = "application/json"
) => {
    let defaultHeaders = {
        Accept: "application/json",
        "Content-Type": content_type,
    };

    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const finalHeaders = {
        ...defaultHeaders,
        ...headers,
    };

    const requestConfig = {
        url: url,
        method: method,
        headers: finalHeaders,
        withCredentials: true,
        data: body
    };

    return axios.request(requestConfig);

};