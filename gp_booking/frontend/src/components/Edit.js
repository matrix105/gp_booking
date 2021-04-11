import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/Context'
import { makeStyles, TextField, InputLabel } from '@material-ui/core';
import Buttons from './mini Compnents/Buttons'
import axios from 'axios'

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
            startTime: '',
            endTime: ''
        })

    const [editable, seteditable] = useState(false)

    const initialState = () => {
        var path
        const role = localStorage.getItem('role')
        if (role === 'Patient') {
            path = 'patients'
        } else {
            path = 'doctors'
        }
        const userId = localStorage.getItem('username')
        axios.get(`http://localhost:1337/${path}?user=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((res) => {
            var startTime, endTime

            if (localStorage.getItem('role') === 'doctor') {
                startTime = res.data[0].shift[0].start;
                endTime = res.data[0].shift[0].end;
            }
            res.data.map(infos => {
                setstate({
                    fname: infos.fname,
                    lname: infos.lname,
                    dob: infos.dob,
                    phone: infos.phone,
                    address: infos.address,
                    startTime: startTime,
                    endTime: endTime
                })
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const onTextChange = (name) => e => {
        setstate({ ...state, [name]: e.target.value })
    }

    const shiftTime = (value, input, onchange, label) => {
        return (!editable ?
            <TextField
                id="outlined-basic"
                label={label} variant="outlined"
                value={value} key={input}
                InputLabelProps={{ style: { fontSize: labelsize } }}
                inputProps={{ style: { fontSize: fontsize } }} disabled
                type="time"
            />
            :
            <TextField
                id="outlined-basic"
                label={label} variant="outlined"
                value={value} key={input} onchange={onchange}
                InputLabelProps={{ style: { fontSize: labelsize } }}
                inputProps={{ style: { fontSize: fontsize } }}
                type="time"
            />
        )

    }

    const createInput = () => {
        const tempArray = []
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
                    case 'startTime':
                        return localStorage.getItem('role') === 'doctor' ? shiftTime(state.startTime, input, onTextChange(input), "Start Time") : null

                    case 'endTime':
                        return localStorage.getItem('role') === 'doctor' ? shiftTime(state.endTime, input, onTextChange(input), "End Time") : null

                    default:
                        return
                }
            })
        )
    }

    const handleClick = (e) => {
        seteditable(!editable)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        var path
        const role = localStorage.getItem('role')
        if (role === 'Patient') {
            path = 'patients'
        } else {
            path = 'doctors'
        }
        const userId = localStorage.getItem('username')
        axios.put(`http://localhost:1337/${path}?user=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            fname: state.fname,
            lname: state.lname,
            phone: state.phone,
            dob: state.dob,
            address: state.address
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err.message);
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
                            onClick={handleClick}
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
        </div>
    );
}

export default Edit;
//return