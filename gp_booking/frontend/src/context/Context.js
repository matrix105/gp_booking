
import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const [userInformation, setUserInformation] = useState(null)
    const [bookingList, setbookingList] = useState([])
    //const [isAuth, setisAuth] = useState(false)

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    // For snackbar
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const [path, setpath] = useState('')

    const handleLogout = () => {
        localStorage.clear()
        //setisAuth(false);
    }

    const setCookie = (jwt) => {
        localStorage.setItem('token', jwt);

    }

    return (
        <UserContext.Provider value={{ handleLogout, setCookie, setpath, path, userInformation, setUserInformation, setbookingList, bookingList, handleClick, setOpen, open, setemail, email, setpassword, password }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider