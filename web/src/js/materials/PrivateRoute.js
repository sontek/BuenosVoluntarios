import React from 'react';
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({ user, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            user.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
