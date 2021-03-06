import React, { useState, useContext } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { UserContext } from '../../context/Context'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    miniContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    containerTextField: {
        margin: theme.spacing(1),
        width: '100%'
    },
    medicationContainer: {
        display: 'flex',
    },
    textField: {
        margin: theme.spacing(1),
    },

}));

const initialState = {
    fname: '',
    lname: '',
    email: '',
    nhs: '',
    dob: '',
    note: ''
}
const medicationInitialState = [{
    name: '',
    strength: '',
    quantity: 0,
}]

function RequestPrescriptionForm(props) {
    const classes = useStyles();
    const [inputs, setinputs] = useState(initialState)
    const [medication, setmedication] = useState(medicationInitialState)



    const handleText = (e) => {
        setinputs({
            ...inputs, [e.target.name]: e.target.value
        })
    }
    const handleMedicationText = (e, index) => {
        const list = [...medication]
        list[index][e.target.name] = e.target.value
        setmedication(list)
    }

    const addMedicationForm = (e) => {
        setmedication([...medication, { name: '', strength: '', quantity: 0, status: false }])
    }
    const removeMedicationForm = (index) => {
        const list = [...medication]
        list.pop()
        setmedication(list)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(inputs.fname);
        console.log(medication);
        axios.post('http://139.59.188.122:1337/prescriptions', {
            fname: inputs.fname,
            lname: inputs.fname,
            nhs: inputs.nhs,
            dob: inputs.dob,
            email: inputs.email,
            note: inputs.note,
            medication: medication,
            submitted: 'false'
        }).then(res => {
            console.log(res.data);
            props.setSnackBar('success', 'Prescription request successfull')
            setinputs(initialState)
            setmedication(medicationInitialState)

        }).catch(err => {
            console.log(err);
            props.setSnackBar('warning', 'Please fill the form')
        })
    }

    return (

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.container}>
                <div className={classes.miniContainer}>
                    <TextField
                        id="filled-secondary"
                        label="First Name"
                        variant="outlined"
                        color="secondary"
                        value={inputs.fname}
                        name='fname'
                        className={classes.containerTextField}
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
                        className={classes.containerTextField}
                        onChange={handleText}
                        required
                    />
                </div>
                <div className={classes.miniContainer}>
                    <TextField
                        id="filled-secondary"
                        label="Email"
                        variant="outlined"
                        color="secondary"
                        name='email'
                        type='email'
                        value={inputs.email}
                        className={classes.containerTextField}
                        onChange={handleText}
                        required
                    />
                    <TextField
                        id="filled-secondary"
                        label="NHS"
                        variant="outlined"
                        type="number"
                        color="secondary"
                        name='nhs'
                        value={inputs.nhs}
                        className={classes.containerTextField}
                        onChange={handleText}
                        required
                    />

                </div>
                <div className={classes.miniContainer}>
                    <TextField
                        id="filled-secondary"
                        label="Date of Birth"
                        variant="outlined"
                        color="secondary"
                        value={inputs.dob}
                        name='dob'
                        className={classes.containerTextField}
                        type="date"
                        onChange={handleText}
                        required
                    />
                    <TextField
                        id="filled-secondary"
                        label="Note"
                        variant="outlined"
                        color="secondary"
                        value={inputs.note}
                        name='note'
                        className={classes.containerTextField}
                        type="text"
                        onChange={handleText}
                        required
                    />
                </div>


                {medication.map((x, i) => {
                    return (
                        <div className={classes.medicationContainer}>

                            <TextField
                                id="filled-secondary"
                                label="Medicine Name"
                                variant="outlined"
                                color="secondary"
                                value={x.name}
                                name='name'
                                className={classes.textField}
                                onChange={e => handleMedicationText(e, i)}
                                required
                            />
                            <TextField
                                id="filled-secondary"
                                label="Strength"
                                variant="outlined"
                                color="secondary"
                                value={x.strength}
                                name='strength'
                                className={classes.textField}
                                onChange={e => handleMedicationText(e, i)}
                                required
                            />

                            <TextField
                                id="filled-secondary"
                                label="Quantity"
                                variant="outlined"
                                color="secondary"
                                value={x.quantity}
                                name='quantity'
                                className={classes.textField}
                                type="number"
                                onChange={e => handleMedicationText(e, i)}
                                required
                            />

                            <div className={classes.textField}>
                                {medication.length !== 1 && <Button variant="contained" color="secondary" onClick={removeMedicationForm} style={{ padding: 0 }}>
                                    <h1>-</h1>
                                </Button>}
                                {medication.length - 1 === i &&
                                    <Button variant="contained" color="secondary" onClick={addMedicationForm} style={{ padding: 0 }}>
                                        <h1>+</h1>
                                    </Button>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={classes.textField}>
                <Button variant="contained" color="secondary" type='submit'>
                    Request
                </Button>
            </div>
        </form>
    );
}

export default RequestPrescriptionForm;