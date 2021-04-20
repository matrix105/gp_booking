import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fname", headerName: "First name", width: 160 },
  { field: "lname", headerName: "Last name", width: 160 },
  { field: "email", headerName: "email", width: 250 },
  {
    field: "dob",
    headerName: "Date of Birth",
    type: "string",
    width: 160,
  },
  { field: "role", headerName: "Role", width: 250 },
];

export default function DataPatients() {
  const [users, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    var tempArray = [];
    setIsLoading(true);
    setError(false);
    try {
      const result = await axios("http://139.59.188.122:1337/users");
      for (let index = 0; index < result.data.length; index++) {
        tempArray.push(result.data[index]);
      }
      setPrescriptions(tempArray);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
    return { users, isLoading, error };
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={users} columns={columns} pageSize={5} />
    </div>
  );
}
