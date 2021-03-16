import React, { useState } from 'react';

function Auth(props) {
    const [auth, setauth] = useState(false)
    function login(cb) {
        setauth(true)
        cb()
    }
    function logout(cb) {
        setauth(false)
        cb()
    }
    return auth
}

export default Auth();
