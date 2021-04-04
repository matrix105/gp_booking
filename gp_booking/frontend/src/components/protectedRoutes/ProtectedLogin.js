import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../context/Context'

function ProtectedLogin({ component: Component, ...rest }) {
    const { isAuth, readCookie } = useContext(UserContext)
    return (
        <Route
            {...rest}
            render={(props) => !isAuth ? (
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