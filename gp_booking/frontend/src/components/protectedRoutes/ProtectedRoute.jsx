import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
    console.log(`is auth from ${isAuth}`);
    return <Route
        {...rest}
        render={(props) => {
            if (isAuth) {
                return <Component />
            } else {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        }}
    />
}

export default ProtectedRoute;