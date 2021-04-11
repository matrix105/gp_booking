import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../context/Context'

function ProtectedRoute({ component: Component, ...rest }) {
    return <Route
        {...rest}
        render={(props) => {
            if (localStorage.getItem('token') != null) {
                return <Component {...rest} {...props} />
            } else {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        }}
    />
}

export default ProtectedRoute;

//{{ pathname: '/', state: { from: props.location } }}