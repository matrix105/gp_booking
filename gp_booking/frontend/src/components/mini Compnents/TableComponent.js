import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const makeHeading = (headings) => {

}

function TableComponent(props) {
    const classes = useStyles();
    console.log(props.datas);
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.headings.map(heading => {
                            return <TableCell>{heading}</TableCell>
                        })}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.datas.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell component="th" scope="row">
                                {data.doctor.fname}
                            </TableCell>
                            <TableCell>{data.patient.fname}</TableCell>
                            <TableCell>{data.Date}</TableCell>
                            <TableCell>{data.Time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableComponent;