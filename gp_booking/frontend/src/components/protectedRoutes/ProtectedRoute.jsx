import React from 'react';
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ component: Component, isAuth, ...rest }) {
    return <Route
        {...rest} render={
            props => {
                if (isAuth) {
                    <Component {...rest} {...props} />
                } else {
                    return (
                        <>
                            { alert('unauthorised')}
                            <Redirect to={
                                {
                                    pathname: '/login',
                                    state: {
                                        from: props.location
                                    }
                                }
                            } />
                        </>

                    )
                }

            }
        }

    />
}

export default ProtectedRoute;