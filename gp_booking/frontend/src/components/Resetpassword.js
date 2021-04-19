import React, { useState, useContext } from 'react';
import { TextField, makeStyles, Button } from '@material-ui/core'
import axios from 'axios';
import { UserContext } from '../context/Context'
import SnackBar from './mini Compnents/SnackBar';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: 'flex',
        flexDirection: 'column',
    },
    multilineText: {
        '& > *': {
            margin: 0,
        },
    }
}));

function Resetpassword(props) {
    const classes = useStyles();

    const [email, setemail] = useState('')
    const { handleClick } = useContext(UserContext)
    const [snackbar, setsnackbar] = useState({
        type: '',
        message: ''
    })

    const createSnackbar = (type, message) => {
        setsnackbar({
            type: { type },
            message: { message }
        })
        handleClick()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
  .post('http://139.59.188.122/auth/forgot-password', {
    email: 'matrix105.mt@gmail.com',
    url:
      'http:/139.59.188.122/admin/plugins/users-permissions/auth/reset-password',
  })
  .then(response => {
    // Handle success.
    console.log('Your user received an email');
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
    }

    return (
        <div className={classes.container}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <h2>My Account Settings</h2>
                <div className={classes.multilineText}>
                    <p>Lost your password? Please enter your email address.</p>
                    <p>You will recieve a link to create a new password via email.</p>
                </div>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    value={email}
                    name='email'
                    onChange={e => setemail(e.target.value)}
                    variant="outlined" />
                <Button variant="contained" type="submit" color="secondary">Reset Password</Button>
            </form>
            <SnackBar
                type={snackbar.type}
                message={snackbar.message}
            />
        </div>
    );
}

export default Resetpassword;