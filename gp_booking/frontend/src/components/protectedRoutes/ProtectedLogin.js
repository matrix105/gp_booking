import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../context/Context'

function ProtectedLogin({ component: Component, ...rest }) {
    const { isAuth, readCookie } = useContext(UserContext)
    return (
        <Route
            {...rest}
            render={(props) => localStorage.getItem('token') === null ? (
                <Component />
            ) :
                (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
            }
        />
    );
}

export default ProtectedLogin;