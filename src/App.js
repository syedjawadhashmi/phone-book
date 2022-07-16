import React, { useEffect, useState } from 'react';

import { Box, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';

import { db } from './firebase';
import { collection, addDoc, onSnapshot, doc, query, orderBy } from "firebase/firestore";

import './App.css';

const rows = [{
  fName: "Javed",
  lName: "Akhtar",
  phone: "012321321"
},
{
  fName: "Javed",
  lName: "Akhtar",
  phone: "012321321"
},
{
  fName: "Javed",
  lName: "Akhtar",
  phone: "012321321"
},
{
  fName: "Javed",
  lName: "Akhtar",
  phone: "012321321"
},
{
  fName: "Javed",
  lName: "Akhtar",
  phone: "012321321"
},
{
  fName: "Javed",
  lName: "Akhtar",
  phone: "012321321"
}]

const App = () => {

  const [values, setValues] = useState({
    fName: "",
    lName: "",
    contact: ""
  });
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues(pre => {
      return {
        ...pre,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {

    const q = query(collection(db, "users"), orderBy('date', "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setRecords([]);
      querySnapshot.forEach((doc) => {
        setRecords(pre => [
          ...pre,
          doc.data()
        ])
      });
    });

  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.fName === "" || values.lName === "" || values.contact === "") {
      alert("Required fields are missing");
    }
    else {
      setLoading(true);
      const obj = {
        ...values,
        date: new Date().getTime()
      }
      await addDoc(collection(db, "users"), obj)
        .then(() => {
          alert("user added Successfully");
          setLoading(false);
          setValues(pre => {
            return {
              fName: "",
              lName: "",
              contact: ""
            }
          });
        })
        .catch(err => {
          alert(err.message);
        })
    }

  }
  return (
    <div className="App">
      <form style={{ marginTop: '50px' }} onSubmit={onSubmit}>
        <Box marginBottom="10px">
          <TextField
            label="First Name"
            name="fName"
            sx={{ minWidth: '330px' }}
            value={values.fName}
            onChange={handleChange}
            variant="outlined" />
        </Box>
        <Box marginBottom="10px">
          <TextField
            label="Last Name"
            name='lName'
            sx={{ minWidth: '330px' }}
            value={values.lName}
            onChange={handleChange}
            variant="outlined" />
        </Box>
        <Box marginBottom="10px">
          <TextField
            label="Phone"
            type="number"
            name="contact"
            sx={{ minWidth: '330px' }}
            value={values.contact}
            onChange={handleChange}
            variant="outlined" />
        </Box>
        <Button variant='contained' disabled={loading} type='submit'>Add user</Button>
      </form>
      <TableContainer component={Paper} sx={{ maxWidth: 650, marginTop: "50px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last</TableCell>
              <TableCell align="right">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fName}
                </TableCell>
                <TableCell align="right">{row.lName}</TableCell>
                <TableCell align="right">{row.contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  );
}

export default App;
