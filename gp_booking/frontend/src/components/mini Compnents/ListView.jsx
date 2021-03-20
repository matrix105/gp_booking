import React, { useState, useContext } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, makeStyles } from '@material-ui/core'
import { UserContext } from '../../context/Context'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));



function ListView({ availableBookings }) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);

    const { setbookingList, bookingList } = useContext(UserContext)
    //console.log(availableBookings.doctor);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
            //console.log(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        setbookingList(newChecked)
    };


    return (
        <List className={classes.root}>
            {availableBookings.map((value) => {
                console.log(value.doctor.fname);
                const labelId = `checkbox-list-label-${value.id}`;
                return (
                    <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                            />

                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.id + " " + value.time.slice(0, 5) + " " + value.doctor.fname} />
                    </ListItem>
                );
            })}
        </List>

    )

}

export default ListView;