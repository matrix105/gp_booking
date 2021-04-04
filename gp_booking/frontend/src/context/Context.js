
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const [jwt, setjwt] = useState(
        localStorage.getItem('token') || ''
    )
    const [userInformation, setUserInformation] = useState(null)
    const [bookingList, setbookingList] = useState([])
    const [isAuth, setisAuth] = useState(false)


    const handleLogin = () => {
        setisAuth(true);
    }
    const handleLogout = () => {
        localStorage.clear()
        setisAuth(false);
    }

    const setCookie = (jwt) => {
        localStorage.setItem('token', jwt);
    }

    const readCookie = () => {
        const token = localStorage.getItem("token")
        if (token) {
            setisAuth(true);
        } else {
            setisAuth(false);
        }
    }
    useEffect(() => {
        readCookie()
    }, [])

    return (
        <UserContext.Provider value={{ handleLogin, handleLogout, setCookie, readCookie, userInformation, setUserInformation, setisAuth, isAuth, setbookingList }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider