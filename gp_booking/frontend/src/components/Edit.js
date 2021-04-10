import React, { useEffect, useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
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
    }
}));


function Edit(props) {
    const classes = useStyles();

    var userDetailArray

    const initialState = () => {
        const userId = localStorage.getItem('username')
        var userDetail
        axios.get(`http://localhost:1337/patients?user=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((res) => {
            res.data.map(infos => {
                userDetailArray = infos
                console.log(userDetailArray.fname);
            })
        })
    }

    const [state, setstate] = useState({
        fname: userDetailArray.fname,
        lname: userDetailArray.lname,
        dob: userDetailArray.dob,
        phone: userDetailArray.phone,
        address: userDetailArray.address,
    })


    const createInput = () => {
        const tempArray = []
        for (const input in state) {
            tempArray.push(input)
        }
        return (
            tempArray.map(input => {
                switch (input) {
                    case 'dob':
                        return <TextField id="outlined-basic" variant="outlined" value={state.dob} key={input} type='date' />
                    case 'phone':
                        return <TextField id="outlined-basic" label={input} variant="outlined" value={state.phone} key={input} type='number' />
                    default:
                        return <TextField id="outlined-basic" label={input} variant="outlined" value={state.input} key={input} />
                }
            })
        )

    }

    // useEffect(() => {
    //     initialState()
    // }, [])

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