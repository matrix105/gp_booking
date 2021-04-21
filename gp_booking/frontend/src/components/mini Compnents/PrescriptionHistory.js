import React from 'react';
import { List, makeStyles, useMediaQuery } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function PrescriptionHistory(props) {
    const classes = useStyles();
    console.log(props);
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.titles.map(heading => {
                            return <TableCell>{heading}</TableCell>
                        })}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.datas.map((data) => (
                        <TableRow key={data.id}>
                            {data.medication.map(medication => {
                                return (
                                    <>
                                        <TableCell component="th" scope="row">{medication.name}</TableCell>
                                        <TableCell>{medication.strength}</TableCell>
                                        <TableCell>{medication.quantity}</TableCell>
                                    </>
                                )
                            })}
                            <TableCell>{data.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PrescriptionHistory;