import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox, IconButton, makeStyles } from '@material-ui/core'
import { array } from 'prop-types';

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
    //console.log(availableBookings.doctor);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };


    return (
        <List className={classes.root}>
            {availableBookings.map((value) => {
                console.log(value)
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
                        <ListItemText id={labelId} primary={value.id + " " + value.date + " " + value.time.slice(0, 5)} />
                    </ListItem>
                );
            })}
        </List>

    )

}

export default ListView;