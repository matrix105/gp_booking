import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../context/Context'

function ProtectedBooking({ component: Component, ...rest }) {

    const { isAuth } = useContext(UserContext)
    console.log(isAuth);
    return <Route
        {...rest}
        render={(props) => {
            if (localStorage.getItem('token') != "") {
                console.log(isAuth)
                return <Component />
            } else {
                return <Redirect to="/login" />
            }
        }}
    />
}

export default ProtectedBooking;