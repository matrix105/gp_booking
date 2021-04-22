import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes, { func } from "prop-types";
import { Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { filterGridColumnLookupSelector } from "@material-ui/data-grid";


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});



function createData(fname, lname, email, dob, notes) {

  return {
    fname,
    lname,
    email,
    dob,
    notes,
    medication: [
      { name: "lore", strength: "11091700", quantity: 3 },
      { name: "ipsum2", strength: "Anonymous", quantity: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [file, setfile] = useState({ file: null })

  const uploadPrescription = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setfile({ file: e.target.files[0] })

      // axios.post(`http://139.59.188.122:1337/prescriptions/upload/${e.target.id}`, {

      // }).then(res => {
      //   console.log(res.data)
      // }).catch(e => {
      //   console.log(e);
      // })

    } else {

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('files', file)

    const upload_res = await axios({
      method: 'POST',
      url: `http://139.59.188.122:1337/prescriptions`,
      data
    })
    console.log(upload_res)
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.fname}
        </TableCell>
        <TableCell align="right">{row.lname}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.note}</TableCell>
        <TableCell align="right">{row.created_at.slice(0, 10)}</TableCell>
        <TableCell align="right">
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={uploadPrescription}></input>
            <button>Submit</button>
          </form>
          {/* <input type="file" id={row.id} onChange={uploadPrescription}></input> */}

        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Medication
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>s
                    <TableCell>Strenght</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.medication.map((med) => (
                    <TableRow key={med.name}>
                      <TableCell component="th" scope="row">
                        {med.name}
                      </TableCell>
                      <TableCell>{med.strength}</TableCell>
                      <TableCell align="right">{med.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
// ];

export default function PrescriptiosTable() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchApi = async () => {
    var tempArray = []
    setIsLoading(true);
    setError(false);
    try {
      const result = await axios("http://139.59.188.122:1337/prescriptions");
      for (let index = 0; index < result.data.length; index++) {
        tempArray.push(result.data[index]);
      }
      setPrescriptions(tempArray)
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
    return { prescriptions, isLoading, error };
  }

  useEffect(() => {
    fetchApi()
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Notes</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptions.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
