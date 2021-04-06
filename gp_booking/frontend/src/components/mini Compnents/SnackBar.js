import React, { useState, useContext } from 'react';
import { Snackbar, makeStyles } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { UserContext } from '../../context/Context'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
function SnackBar(props) {
    const { setOpen, open } = useContext(UserContext)
    const classes = useStyles();
    console.log('hello');
    // const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.type}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>

    );
}

export default SnackBar;