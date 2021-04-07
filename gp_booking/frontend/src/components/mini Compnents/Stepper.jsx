import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import ListView from './ListView'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useMediaQuery } from '@material-ui/core';
import { UserContext } from '../../context/Context'
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    list: {
        width: '25%'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    textField: {
        /*  marginLeft: theme.spacing(65),
         marginRight: theme.spacing(50),
         width: 200, */

    },

    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
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

const timeList = (time) => {
    return (
        <li>{time}</li>
    )
}

function getCurrentDate() {
    var currentTime = new Date().toISOString().slice(0, 10);
    return currentTime
}

function getSteps() {

    return ['Pick a booking date', 'Pick a time slot', 'Pick doctors', 'Confirm booking'];
}



function getStepContent(stepIndex, classes, setDate, matches, matches2, matches3, getAvailableBookings, availableBookings, setSelectedIndex, selectedIndex) {

    const handleChange = (e) => {
        setDate(e.target.value)
    };

    // for the time list 
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    switch (stepIndex) {
        case 0:
            return (
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        InputProps={{ inputProps: { min: getCurrentDate() } }}
                        type="date"
                        label="Select a suitable date"
                        defaultValue={getCurrentDate()}
                        className={classes.textField}
                        style={matches ? { left: 180 } : matches2 ? { left: 250 } : matches3 ? { left: 430 } : { left: 560 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                    />
                </form>
            );
        case 1:
            return (
                times.map(time => {
                    timeList(time)
                })
            )
        case 2:
            return (
                //get availabe appointments and send to list
                <ListView
                    availableBookings
                />
            )
        default:
            return 'Confirm booking';
    }
}



const Steppers = () => {
    const { jwt, userInformation, bookingList } = useContext(UserContext)
    const matches = useMediaQuery('(max-width:600px)');
    const matches2 = useMediaQuery('(max-width:768px)');
    const matches3 = useMediaQuery('(max-width:1024px)');
    const classes = useStyles();

    // for time list
    const [selectedIndex, setSelectedIndex] = React.useState(1);



    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    // get appointment date choosen by user
    const [date, setDate] = React.useState('');
    const [modifiedDate, setmodifiedDate] = useState("")
    const [year, month, day] = date.split('-')

    const [open, setOpen] = React.useState(false);



    // get available booking from server
    const [availableBookings, setavailableBookings] = useState(null)

    const token = localStorage.getItem('token')
    useEffect(() => {
        getAvailableBookings()
    }, [])
    // get all the available bookings 
    const getAvailableBookings = (date) => {

        axios.get(`http://localhost:1337/doctors`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const data = response.data
                console.log(data);
                let tempArray = []
                for (let index = 0; index < data.length; index++) {
                    tempArray.push(data[index])
                }
                setavailableBookings(tempArray)
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Handle booking
    const setBooking = (slotId, patientNhs) => {
        axios.post(`http://localhost:1337/bookings`, {
            headers: {
                Authorization: `Bearer ${userInformation.jwt}`,
            },
            data: {
                available_booking: slotId,
                users_permissions_user: patientNhs
            }
        })
            .then(res => {
                console.log(res);
                //update()
            }).catch(err => console.log(err.response))
    }


    const handleNext = (e) => {
        // add bookings
        if (e.currentTarget.value === 'Finish') {
            bookingList.map(list => {
                setBooking(list.id, userInformation.user.username)
            })
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel >
                {
                    steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <b>Redirect to home page</b>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep, classes, setDate, setOpen, open, matches, matches2, matches3, getAvailableBookings, availableBookings, jwt, bookingList, setSelectedIndex, selectedIndex)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
              </Button>
                            <Button variant="contained" color="primary" onClick={handleNext} value={
                                activeStep === steps.length - 1 ? 'Finish' : 'Next'
                            }>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Steppers