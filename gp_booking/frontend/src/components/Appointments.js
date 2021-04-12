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
    const { handleClick } = useContext(UserContext)
    const classes = useStyles();
    const size = useMediaQuery('(max-width:425px)');

    const getBookings = () => {
        var userId = localStorage.getItem('username')
        var path, doctorOrPatient
        if (localStorage.getItem('role') === 'doctor') {
            path = "doctors"
            doctorOrPatient = 'doctor'
        } else {
            path = "patients"
            doctorOrPatient = 'patient'
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
                    handleClick()
                    return
                }
                const datas = res.data
                setstate(datas)
            }).catch(err => {
                console.log(err);
                handleClick()
            })
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
        if (localStorage.getItem('role') === 'doctor' || 'Patient') {
            getBookings()

        } else {
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
                type="warning"
                message="Not verified or no appointments "
            />

        </div>
    );
}

export default Appointments;