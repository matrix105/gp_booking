import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { List, ListItem, ListItemText, Divider, makeStyles, useMediaQuery } from '@material-ui/core';
import { UserContext } from '../context/Context'
import SnackBar from './mini Compnents/SnackBar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    rootMobile: {
        width: '55%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

function Appointments(props) {
    const [state, setstate] = useState([])
    const [type, settype] = useState('')
    const [message, setmessage] = useState('')
    const { handleClick } = useContext(UserContext)
    const classes = useStyles();
    const size = useMediaQuery('(max-width:425px)');

    const setSnackBarMessage = (type, message) => {
        settype(type)
        setmessage(message)
    }

    const getBookings = () => {
        var userId = localStorage.getItem('username')
        var path, doctorOrPatient
        if (localStorage.getItem('role') === 'Patient') {
            path = "patients"
            doctorOrPatient = 'patient'
        } else if (localStorage.getItem('role') === 'Doctor') {
            path = "doctors"
            doctorOrPatient = 'doctor'
        } else {
            setSnackBarMessage('warning', 'Account not verified yet, please wait')
            handleClick()
            return null
        }
        axios.get(`http://localhost:1337/${path}?user=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res => {
            console.log(localStorage.getItem('username'));

            axios.get(`http://localhost:1337/bookings?${doctorOrPatient}=${res.data[0].id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res => {
                console.log(res);
                if (res.data.length === 0) {
                    setSnackBarMessage('warning', 'No bookings yet')
                    handleClick()
                    return
                }
                const datas = res.data
                setstate(datas)
            }).catch(err => {
                console.log(err);
                setSnackBarMessage('error', 'No Bookings yet')
                handleClick()
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const createList = () => {
        return state.map(data => {

            return (
                <ListItem button>
                    <p>{data.id}</p>
                    <p>{data.doctor.fname}</p>
                    <p>{data.patient.fname}</p>
                    <p>{data.Time}</p>
                    <p>{data.Date}</p>
                </ListItem>
            )
        })
    }

    useEffect(() => {
        if (localStorage.getItem('role') === 'Doctor' || 'Patient') {
            getBookings()

        } else {
            setSnackBarMessage('warning', 'Not verified yet')
            handleClick()
        }

    }, [])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h1>Appointments</h1>
            <div className={size ? classes.root : classes.rootMobile}>
                <List component="nav" aria-label="secondary mailbox folders">
                    {createList()}
                </List>
            </div>

            <SnackBar
                type={type}
                message={message}
            />
        </div>
    );
}

export default Appointments;