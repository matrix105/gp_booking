import React, { useState, useEffect } from "react";import Link from '@material-ui/core/Link';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Snip(props, title, type) {

  const [prepNum, setPrepNum] = useState(0);
  const [bookNum, setBookNum] = useState(0);
  const [patNum, setPatNum] = useState(0);
  const [docNum, setDocNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const classes = useStyles();

  const fetchApi = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const result = await axios("http://localhost:1337/prescriptions/count");
      setPrepNum(result.data);
      console.log(result.data)
      const result1 = await axios("http://localhost:1337/bookings/count");
      setBookNum(result1.data);
      console.log(result1.data)
      const result2 = await axios("http://localhost:1337/users/count");
      setPatNum(result2.data);
      console.log(result2.data)
    //   const result = await axios("http://localhost:1337/prescriptions/count");
    //   setDocNum(result.data);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
    return { prepNum, bookNum, patNum , isLoading, error };
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <>
      <Title>{props.title}</Title>
      <Typography component="p" variant="h3" align='center' gutterBottom>
      {(() => {
        if (props.type === "prescriptions") {
          return (
            prepNum
          )
        } else if (props.type === "bookings") {
          return (
            bookNum
          )
        } else if (props.type === "patients") {
          return (
            patNum
          )
        }
      })()}
      </Typography>
    </>
  );
}
