import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "fname", headerName: "First name", width: 160 },
  { field: "lname", headerName: "Last name", width: 160 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "dob",
    headerName: "Date of Birth",
    width: 200,
  },
  { field: "role.name", headerName: "Role", width: 200 },
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
      const result = await axios("http://localhost:1337/users");
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
      <DataGrid rows={users} columns={columns} pageSize={10} />
    </div>
  );
}
