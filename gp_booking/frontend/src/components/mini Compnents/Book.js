import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { UserContext } from '../../context/Context'
import StepLabel from '@material-ui/core/StepLabel';
import axios from 'axios'
import SnackBar from './SnackBar'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    time: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        maxHeight: '100%',
        overflow: 'auto'
    },


    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const times = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
]

function getSteps() {
    return ['Select a date', 'Select a time', 'Select Doctors', 'Confirm Booking'];
}



function Book(props) {
    const { handleClick } = useContext(UserContext)

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    // For the user selected time and date
    const [selectedTime, setselectedTime] = useState('')
    const [userSelectedDate, setuserSelectedDate] = useState(getCurrentDate())


    //For the date picker
    function handleChange(e) {
        setuserSelectedDate(e.target.value)
    }

    // For the time picker
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setselectedTime(times[index])
    };

    // For current Date
    function getCurrentDate() {
        var currentTime = new Date().toISOString().slice(0, 10);
        return currentTime
    }

    // get All doctors name in list
    const [doctors, setdoctors] = useState([])

    // user selected doctor
    const [doctor, setdoctor] = useState('')
    const [selectedDoctorIndex, setselectedDoctorIndex] = useState(1)
    // handle clicked doctor
    const handleDoctorListItemClick = (event, index) => {
        const doctor = doctors[index]
        setdoctor(doctor.fname)
        //setselectedDoctorIndex(index)
        //setdoctor(doctors[index])
    }


    // Get available doctors
    const getDoctor = (date) => {
        console.log(localStorage.getItem('token'))
        axios.get(`http://localhost:1337/doctors`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                let tempArray = []
                for (let index = 0; index < response.data.length; index++) {
                    tempArray.push(response.data[index])
                }
                setdoctors(tempArray)

            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // Check if doctor is available 
    const checkAvailability = () => {
        //loop through doctor detail array
        doctors.map((doctor) => {
            axios.get(`http://localhost:1337/bookings?Date=${userSelectedDate}`, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('token')}`,
                // },
            }).then(res => {
                console.log(res);
            }).catch(() => {
                setType('error')
                setmessage('The doctor is not available at that time at that date')
                handleClick()
            })
        })
        // check if doctor A is booked in date dd/mm/yyy at time mm:ss
        // if not booked then book
        // else recommend other days 
    }

    // For Snack Bar
    const [type, setType] = useState("")
    const [message, setmessage] = useState("")

    // for the stepper
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        getDoctor()
    }, [])


    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <form noValidate>
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            defaultValue={getCurrentDate()}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: getCurrentDate() } }}
                        />
                    </form>

                )
            case 1:
                return (
                    times.map(time => {
                        return (

                            <List component="nav" aria-label="secondary mailbox folder" className={classes.time} style={{ maxHeight: '50%', overflow: 'scroll' }}>
                                <ListItem
                                    button
                                    selected={selectedIndex === 0}
                                    onClick={(event) => handleListItemClick(event, times.indexOf(time))}
                                    key={time}
                                >
                                    <ListItemText primary={time} />
                                </ListItem>
                            </List>
                        )
                    })
                )
            case 2:
                return (
                    <form>
                        {doctors.map(doctor => {
                            return (
                                <List component="nav" aria-label="secondary mailbox folder" className={classes.time} style={{ maxHeight: '50%', overflow: 'scroll' }}>
                                    <ListItem
                                        button
                                        selected={selectedIndex === 0}
                                        onClick={(event) => handleDoctorListItemClick(event, doctors.indexOf(doctor))}
                                        key={doctor.id}
                                    >
                                        <ListItemText primary={doctor.fname} />
                                    </ListItem>
                                </List>
                            )
                        })}

                    </form>
                )
            default:
                { checkAvailability() }
                return 'Unknown stepIndex';
        }
    }





    return (
        <div className={classes.root}>
            <h1>{selectedTime}</h1>
            <h1>{userSelectedDate}</h1>
            <h1>{doctor}</h1>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
              </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <SnackBar
                type={type}
                message={message}
            />
        </div>
    );
}

export default Book;