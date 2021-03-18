import React, { useContext, useState, useEffect } from "react";
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import ListView from './ListView'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { FormControl, Select, MenuItem, InputLabel, useMediaQuery, } from '@material-ui/core';
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


const availableTimes = [
    {
        time: "2:00 PM"
    },
    {
        time: "3:00 PM"
    },
    {
        time: "4:00 PM"
    },
    {
        time: "5:00 PM"
    },
    {
        time: "6:00 PM"
    },
    {
        time: "7:00 PM"
    },
]

function getCurrentDate() {
    var currentTime = new Date().toISOString().slice(0, 10);
    return currentTime
}

function getSteps() {

    return ['Pick a booking date', 'Pick a time slot', 'Pick an appointment', 'Book'];
}



function getStepContent(stepIndex, classes, setTime, setOpen, time, open, matches, matches2, matches3, availableBookings, jwt) {

    const handleChange = (event) => {
        console.log(event.target.value);
        setTime(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    function getTimeListItem(time) {
        // const times = Object.keys(time)
        return (
            <MenuItem value={time.time}>{time.time}</MenuItem>
        )
    }




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
                    />
                </form>
            );
        case 1:
            //console.log(`${availableBookings} from stepper`);
            return (
                <FormControl className={classes.list} >
                    <InputLabel id="demo-controlled-open-select-label">Time</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={time}
                        onChange={handleChange}
                        required
                    >
                        {availableTimes.map(getTimeListItem)}
                        {/* {availableBookings.map(getTimeListItem)} */}

                    </Select>
                </FormControl>
            )
        case 2:
            return (
                //get availabe appointments and send to list
                <ListView
                    availableBookings={availableBookings}
                />
            )

        case 3:
            return 'Confirm your appointment booking?';
        default:
            return 'Unknown stepIndex';
    }
}



const Steppers = () => {
    const { jwt, userInformation, bookingList } = useContext(UserContext)
    const matches = useMediaQuery('(max-width:600px)');
    const matches2 = useMediaQuery('(max-width:768px)');
    const matches3 = useMediaQuery('(max-width:1024px)');
    const classes = useStyles();


    // const [checked, setChecked] = React.useState(false);
    // const [background, setBackground] = React.useState("white")
    // const [font, setFont] = React.useState("black")
    // const [blind, setBlind] = React.useState("Change the color if u are blind")


    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const [time, setTime] = React.useState('');
    const [open, setOpen] = React.useState(false);

    // get available booking from server
    const [availableBookings, setavailableBookings] = useState(null)

    const getAvailableBookings = () => {
        axios.get('http://localhost:1337/available-bookings')
            .then(response => {
                const data = response.data
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

    useEffect(() => {
        getAvailableBookings()
    }, [])

    const setBooking = (slotId, patientNhs) => {
        axios.post(`http://localhost:1337/bookings`, {
            available_booking: slotId,
            users_permissions_user: patientNhs
        })
            .then(res => {
                console.log(res);
            }).catch(err => console.log(err.response))
    }

    const handleNext = (e) => {
        // add bookings

        if (e.currentTarget.value === 'Finish') {
            console.log(userInformation.user.username);
            bookingList.map(list => {
                setBooking(userInformation.user.username, list.id)
            })
        }
        // console.log(bookingList);
        // console.log(userInformation);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (

        <div className={classes.root} >
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
                        <Typography className={classes.instructions}>{getStepContent(activeStep, classes, setTime, setOpen, time, open, matches, matches2, matches3, availableBookings, jwt, bookingList)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
              </Button>
                            <Button variant="contained" color="primary" onClick={(e) => handleNext(e)} value={
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