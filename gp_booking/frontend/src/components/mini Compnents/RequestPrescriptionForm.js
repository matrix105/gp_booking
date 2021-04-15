import React, { useState } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        width: '100%',
        display: 'flex',
        justifyContent: "end",
        flexDirection: 'column'
    },
    textField: {
        marginTop: 10
    }
}));

function RequestPrescriptionForm(props) {
    const classes = useStyles();
    const [inputs, setinputs] = useState({
        fname: '',
        lname: '',
        email: '',
        dob: '',
        note: ''
    })
    const [medication, setmedication] = useState({
        name: '',
        strength: '',
        quantity: 0,
    })

    const handleText = (e) => {
        setinputs({
            ...inputs, [e.target.name]: e.target.value
        })
    }
    const handleMedicationText = (e) => {
        setmedication({
            ...medication, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(inputs);
        // console.log(medication);

        // axios.(`http://localhost:1337/prescriptions/?email=${inputs.email}`)
        //     .then((res) => {
        //         console.log(res);
        //         if (res.data.length != 0) {
        //             axios.put(`http://localhost:1337/prescriptions/email=${inputs.email}`, {
        //                 medication: [medication],
        //             }).then((res) => {
        //                 console.log(res);
        //                 console.log(`precription added to ${inputs.email}`);
        //             }).catch(err => {
        //                 console.log(err);
        //             })
        //         } else {

        //         }

        //     }).catch(err => {
        //         console.log(err);
        //     })
        axios.post('http://localhost:1337/prescriptions', {
            fname: inputs.fname,
            lname: inputs.fname,
            dob: inputs.dob,
            email: inputs.email,
            note: inputs.note,
            medication: [medication],
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id="filled-secondary"
                label="First Name"
                variant="outlined"
                color="secondary"
                value={inputs.fname}
                name='fname'
                className={classes.textField}
                onChange={handleText}
                required
            />
            <TextField
                id="filled-secondary"
                label="Last Name"
                variant="outlined"
                color="secondary"
                name='lname'
                value={inputs.lname}
                className={classes.textField}
                onChange={handleText}
                required
            />
            <TextField
                id="filled-secondary"
                label="Email"
                variant="outlined"
                color="secondary"
                name='email'
                value={inputs.email}
                className={classes.textField}
                onChange={handleText}
                required
            />
            <TextField
                id="filled-secondary"
                label="Date of Birth"
                variant="outlined"
                color="secondary"
                value={inputs.dob}
                name='dob'
                className={classes.textField}
                type="date"
                onChange={handleText}
                required
            />
            <TextField
                id="filled-secondary"
                label="Medicine Name"
                variant="outlined"
                color="secondary"
                value={medication.name}
                name='name'
                className={classes.textField}
                onChange={handleMedicationText}
                required
            />
            <TextField
                id="filled-secondary"
                label="Strength"
                variant="outlined"
                color="secondary"
                value={medication.strength}
                name='strength'
                className={classes.textField}
                onChange={handleMedicationText}
                required
            />
            <TextField
                id="filled-secondary"
                label="Quantity"
                variant="outlined"
                color="secondary"
                value={medication.quantity}
                name='quantity'
                className={classes.textField}
                type="number"
                onChange={handleMedicationText}
                required
            />
            <TextField
                id="filled-secondary"
                label="Note"
                variant="outlined"
                color="secondary"
                value={inputs.note}
                name='note'
                className={classes.textField}
                type="text"
                onChange={handleText}
                required
            />
            <div>
                <Button variant="contained" color="secondary" type='submit'>
                    Request
                </Button>
            </div>
        </form>

    );
}

export default RequestPrescriptionForm;