import React, { useState } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center'
    },
    medicationContainer: {
        display: 'flex',
    },
    textField: {
        margin: theme.spacing(1),
    },

}));

function RequestPrescriptionForm(props) {
    const classes = useStyles();
    const [textFields, settextFields] = useState([])
    const [inputs, setinputs] = useState({
        fname: '',
        lname: '',
        email: '',
        dob: '',
        note: ''
    })
    const [medication, setmedication] = useState([{
        name: '',
        strength: '',
        quantity: 0,
    }])

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
        setmedication([...medication, { name: '', strength: '', quantity: 0 }])
    }
    const removeMedicationForm = (index) => {
        const list = [...medication]
        list.splice(index, 1)
        setmedication(list)
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
            medication: medication,
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <h2>{JSON.stringify(medication)}</h2>
            <div className={classes.textField}>
                <TextField
                    id="filled-secondary"
                    label="First Name"
                    variant="outlined"
                    color="secondary"
                    value={inputs.fname}
                    name='fname'

                    onChange={handleText}
                    required
                />
            </div>

            <div className={classes.textField}>
                <TextField
                    id="filled-secondary"
                    label="Last Name"
                    variant="outlined"
                    color="secondary"
                    name='lname'
                    value={inputs.lname}

                    onChange={handleText}
                    required
                />
            </div>

            <div className={classes.textField}>
                <TextField
                    id="filled-secondary"
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    name='email'
                    value={inputs.email}

                    onChange={handleText}
                    required
                />
            </div>

            <div className={classes.textField}>
                <TextField
                    id="filled-secondary"
                    label="Date of Birth"
                    variant="outlined"
                    color="secondary"
                    value={inputs.dob}
                    name='dob'

                    type="date"
                    onChange={handleText}
                    required
                />
            </div>
            <div className={classes.textField}>
                <TextField
                    id="filled-secondary"
                    label="Note"
                    variant="outlined"
                    color="secondary"
                    value={inputs.note}
                    name='note'

                    type="text"
                    onChange={handleText}
                    required
                />
            </div>
            {medication.map((x, i) => {
                return (
                    <div className={classes.medicationContainer}>
                        <div className={classes.textField}>
                            <TextField
                                id="filled-secondary"
                                label="Medicine Name"
                                variant="outlined"
                                color="secondary"
                                value={x.name}
                                name='name'

                                onChange={e => handleMedicationText(e, i)}
                                required
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                id="filled-secondary"
                                label="Strength"
                                variant="outlined"
                                color="secondary"
                                value={x.strength}
                                name='strength'

                                onChange={e => handleMedicationText(e, i)}
                                required
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                id="filled-secondary"
                                label="Quantity"
                                variant="outlined"
                                color="secondary"
                                value={x.quantity}
                                name='quantity'

                                type="number"
                                onChange={e => handleMedicationText(e, i)}
                                required
                            />
                        </div>
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

            <div className={classes.textField}>
                <Button variant="contained" color="secondary" type='submit'>
                    Request
                </Button>
            </div>
        </form>

    );
}

export default RequestPrescriptionForm;