import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../context/Context'

function ProtectedRoute({ component: Component, ...rest }) {
    const { isAuth } = useContext(UserContext)
    return <Route
        {...rest}
        render={(props) => {
            console.log(isAuth)
            if (isAuth) {
                return <Component {...rest} {...props} />
            } else {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        }}
    />
}

export default ProtectedRoute;

//{{ pathname: '/', state: { from: props.location } }}