import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { List, makeStyles, useMediaQuery, Button } from '@material-ui/core';
import { UserContext } from '../context/Context'
import SnackBar from './mini Compnents/SnackBar';
import TableComponent from './mini Compnents/TableComponent';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
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

const tableHeading = [
    "Doctor", "Patient", "Date", "Time"
]

function Appointments(props) {
    const [state, setstate] = useState([])
    const [type, settype] = useState('')
    const [message, setmessage] = useState('')
    const { handleClick } = useContext(UserContext)
    const classes = useStyles();
    const size = useMediaQuery('(max-width:425px)');
    let history = useHistory();

    const setSnackBarMessage = (type, message) => {
        settype(type)
        setmessage(message)
    }

    const getBookings = () => {
        var patientOrDoctor
        if (localStorage.getItem('role') === "4") {
            patientOrDoctor = "patient"
        } else {
            patientOrDoctor = "doctor"
        }
        console.log(patientOrDoctor);
        axios.get(`http://139.59.188.122:1337/bookings/?${patientOrDoctor}=${localStorage.getItem('id')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res => {
            console.log(res.data);
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
    }

    const createList = () => {
        return (<TableComponent
            datas={state}
            headings={tableHeading}
        />)
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
            {localStorage.getItem('role') === '4' ?
                <Button onClick={e => { history.push('/booking') }} variant="contained" color="secondary" className="btn btn-primary mt-5 mb-5">Book Appointment</Button>
                : null}
            <h3>Booking History</h3>
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