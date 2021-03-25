import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { log } from 'three';
import { UserContext } from '../../context/Context'

function ProtectedBooking({ component: Component, ...rest }) {

    const { isAuth } = useContext(UserContext)
    console.log(isAuth);
    return <Route
        {...rest}
        render={(props) => {
            if (isAuth) {
                console.log(isAuth)
                return <Component />
            } else {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        }}
    />
}

export default ProtectedBooking;