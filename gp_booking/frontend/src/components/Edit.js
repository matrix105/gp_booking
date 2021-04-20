import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/Context'
import { makeStyles, TextField, InputLabel } from '@material-ui/core';
import Buttons from './mini Compnents/Buttons'
import axios from 'axios'
import SnackBar from './mini Compnents/SnackBar';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',

        },
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    textField: {
        fontSize: 100
    },
}));

const fontsize = 15
const labelsize = 20

function Edit(props) {
    const classes = useStyles();
    const [state, setstate] = useState(
        {
            fname: '',
            lname: '',
            dob: '',
            phone: '',
            address: '',
        })

    const [editable, seteditable] = useState(false)

    const { handleClick } = useContext(UserContext)

    const initialState = () => {
        axios.get(`http://139.59.188.122:1337/users/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((res) => {
            var startTime, endTime
            console.log(res.data);

            const data = res.data

            setstate({
                fname: data.fname,
                lname: data.lname,
                dob: data.dob,
                phone: data.phone,
                address: data.address,
            })

        }).catch(err => {
            console.log(err);
            handleClick()
        })
    }

    const onTextChange = (name) => e => {
        setstate({ ...state, [name]: e.target.value })
    }

    const createInput = () => {
        const tempArray = []
        console.log(state);
        for (const input in state) {
            tempArray.push(input)
        }
        return (
            tempArray.map(input => {
                switch (input) {
                    case 'dob':
                        return (
                            !editable ?
                                <TextField variant="outlined" label="Date" value={state.dob} key={input} type='date' className={classes.textField} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} disabled /> :
                                <TextField variant="outlined" label="Date" value={state.dob} onChange={onTextChange(input)} key={input} type='date' className={classes.textField} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} />

                        )
                    case 'phone':
                        return (
                            !editable ?
                                <TextField id="outlined-basic" label="Phone" variant="outlined" value={state.phone} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} type='number' disabled /> :
                                <TextField id="outlined-basic" label="Phone" variant="outlined" onChange={onTextChange(input)} value={state.phone} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} type='number' />

                        )
                    case 'fname':
                        return (
                            !editable ?
                                <TextField id="outlined-basic" label="First Name" name={input} variant="outlined" value={state.fname} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} disabled /> :
                                <TextField id="outlined-basic" label="First Name" name={input} variant="outlined" onChange={onTextChange(input)} value={state.fname} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} />

                        )
                    case 'lname':
                        return (
                            !editable ?
                                <TextField id="outlined-basic" label="Last Name" variant="outlined" value={state.lname} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} disabled /> :
                                <TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={onTextChange(input)} value={state.lname} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} />

                        )

                    case 'address':
                        return (
                            !editable ?
                                <TextField id="outlined-basic" label="Address" variant="outlined" value={state.address} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} disabled /> :
                                <TextField id="outlined-basic" label="Address" variant="outlined" onChange={onTextChange(input)} value={state.address} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} />

                        )

                    default:
                        return
                }
            })
        )
    }

    const handleEdit = (e) => {
        seteditable(!editable)
    }

    const [type, settype] = useState('')
    const [message, setmessage] = useState('')
    const setSnackBar = (type, message) => {
        settype(type)
        setmessage(message)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(localStorage.getItem('token'));
        const userId = localStorage.getItem('id')
        axios.put(`http://139.59.188.122:1337/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            fname: state.fname,
            lname: state.lname,
            phone: state.phone,
            dob: state.dob,
            address: state.address
        }).then(res => {
            setSnackBar('success', "Changes have been updated")
            console.log(res);
        }).catch(err => {
            setSnackBar('error', "Something wrong with the values")
            console.log(err);
        })
    }

    useEffect(() => {
        initialState()
    }, [])

    return (
        <div className={classes.container}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <h1>Edit Details</h1>
                {createInput()}
                <div style={{ display: 'flex', width: '75%', padding: 0, justifyContent: 'space-between' }}>
                    <div >
                        <Buttons
                            key='Edit Personal info'
                            name="Edit"
                            color="primary"
                            type="button"
                            onClick={handleEdit}
                        />
                    </div>
                    <div style={{ width: '45%' }}>
                        <Buttons
                            key='Save Personal Info'
                            name="Save"
                            color="secondary"
                            type="submit"
                            onClick
                        />
                    </div>
                </div>
            </form>
            <SnackBar
                type={type}
                message={message}
            />
        </div>
    );
}

export default Edit;
//return