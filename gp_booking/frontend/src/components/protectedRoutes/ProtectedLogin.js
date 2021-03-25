import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../context/Context'

function ProtectedLogin({ component: Component, ...rest }) {
    const { isAuth } = useContext(UserContext)
    return (
        <Route
            {...rest}
            render={() => {
                if (!isAuth) {
                    return <Component />
                } else {
                    return <Redirect to='/booking' />
                }
            }}
        />
    );
}

export default ProtectedLogin;