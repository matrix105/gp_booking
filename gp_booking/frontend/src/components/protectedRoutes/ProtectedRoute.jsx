import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../context/Context'

function ProtectedRoute({ component: Component, ...rest }) {

    const { isAuth } = useContext(UserContext)
    console.log(isAuth);
    return <Route
        {...rest}
        render={(props) => {
            if (isAuth) {
                return <Component />
            } else {
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
        }}
    />
}

export default ProtectedRoute;