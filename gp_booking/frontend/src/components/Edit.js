import React, { useEffect, useState } from 'react';
import { makeStyles, TextField, InputLabel } from '@material-ui/core';
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
    }
}));

const fontsize = 15
const labelsize = 20



function Edit(props) {
    const classes = useStyles();

    var userDetailArray

    const [state, setstate] = useState(
        {
            fname: '',
            lname: '',
            dob: '',
            phone: '',
            address: '',
        })

    const [editable, seteditable] = useState(false)

    const initialState = () => {
        const userId = localStorage.getItem('username')
        var userDetail
        axios.get(`http://localhost:1337/patients?user=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((res) => {
            res.data.map(infos => {
                setstate({
                    fname: infos.fname,
                    lname: infos.lname,
                    dob: infos.dob,
                    phone: infos.phone,
                    address: infos.address,
                })
            })
        })
    }

    const onTextChange = (name) => e => {
        setstate({ ...state, [name]: e.target.value })
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

                            <TextField id="outlined-basic" label={input} variant="outlined" value={state.dob} key={input} type='date' className={classes.textField} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} />

                        )
                    case 'phone':
                        return (

                            <TextField id="outlined-basic" label={input} variant="outlined" value={state.phone} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} type='number' />

                        )
                    case 'fname':
                        return (

                            <TextField id="outlined-basic" name={input} label={input} variant="outlined" onChange={onTextChange(input)} value={state.fname} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} />

                        )
                    case 'lname':
                        return (

                            <TextField id="outlined-basic" label={input} variant="outlined" value={state.lname} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} />

                        )

                    case 'address':
                        return (

                            <TextField id="outlined-basic" label={input} variant="outlined" value={state.address} key={input} InputLabelProps={{ style: { fontSize: labelsize } }} inputProps={{ style: { fontSize: fontsize } }} />

                        )

                    default:
                        return
                }
            })
        )
    }

    useEffect(() => {
        initialState()
    }, [])

    return (
        <div className={classes.container}>
            <form className={classes.root} noValidate autoComplete="off">
                {createInput()}
            </form>
        </div>
    );
}

export default Edit;
//return