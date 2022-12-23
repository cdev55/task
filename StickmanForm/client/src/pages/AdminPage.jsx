import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  styled,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Wrapper = styled(Box)`
padding:50px;
margin:0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  max-width:1200px;
`;
const UserForm = styled(Box)`
  border: 5px dashed lightblue;
  padding: 20px;
  width: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: "space-around";
`;
const Heading = styled(Typography)`
  font-size: 50px;
  text-align: center;
`;

/////TableStyle///////
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const AdminPage = () => {
  const memberInitialValues = { memberName: "" };
  const [member, setMember] = useState(memberInitialValues);
  const onValueChange = (e) => {
    setMember({[e.target.name]:e.target.value});
  };
  const addMember = async () => {
    let res = await axios
      .post("http://localhost:8000/addmember", {
        memberName: member.memberName,
      })
      .catch((error) => console.log(error));
    const data = await res.data;
    console.log(data);
    setMember(memberInitialValues);
    return data;
  };
/////////////////////////////

const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  };
  return (
    <Wrapper>
      <Heading>Admin Page</Heading>
      <Box
        style={{
          margin: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          variant="filled"
          value={member.memberName}
          onChange={(e) => onValueChange(e)}
          name="memberName"
          label="Add Member"
        />
        <Button sx={{ margin: 2 }} variant="contained" onClick={addMember}>
          Add
        </Button>
      </Box>
      <Box
        style={{
          
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
      <TextField
          id="date"
          name="date"
          label="From"
          type="date"
          defaultValue="2017-05-24"
          sx={{ width: 220, margin: 5 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <TextField
          id="date"
          name="date"
          label="To"
          type="date"
          defaultValue="2017-05-24"
          sx={{ width: 220, margin: 5 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <Button sx={{ margin: 2 }} variant="contained">
          Filter
        </Button>
      </Box>

      {/* ////////Table////////// */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Member</StyledTableCell>
              <StyledTableCell align="right">user</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default AdminPage;
