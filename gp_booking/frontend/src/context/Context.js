import React, { useReducer } from 'react'
import axios from 'axios'

const Context = React.createContext()

const initialState = {
    nhs_num: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    address: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'handle_input':
            return {
                ...state,
                [action.field]: action.payload
            }

        case 'handle_form':
            console.log(state.firstname);
            axios.post('http://localhost:1337/auth/local/register', {
                username: state.username,
                email: state.email,
                password: state.password,
                /* nhsNumber: state.nhs_num,
                fname: state.firstname,
                lname: state.lastname,
                dob: state.dob,
                phone: state.phone,
                address: state.location */

            })
                .then((response) => {
                    return {
                        // redirect to Home
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        default:
            {
                return state
            }
    }
}


export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleInputs = (e) => {
        dispatch({
            type: 'handle_input',
            field: e.target.name,
            payload: e.target.value
        })
    };

    const handleForms = (e) => {
        e.preventDefault()
        dispatch({
            type: 'handle_form'
        })
    }

    return <Context.Provider value={{ data: state, handleInputs, handleForms }}>
        {children}
    </Context.Provider>
}

export default Context