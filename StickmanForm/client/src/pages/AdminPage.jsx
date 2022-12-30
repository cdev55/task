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
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Box)`
  padding: 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
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
const Logout = styled(Button)`
  float: right;
`;
const ShowAllButton = styled(Button)`
  float: right;
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
  const [table, setTable] = useState("showAll");
  const memberInitialValues = { memberName: "" };
  const [member, setMember] = useState(memberInitialValues);
  const onValueChange = (e) => {
    setMember({ [e.target.name]: e.target.value });
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
  //////////////handleChange function///////////////

  // const [value, setValue] = useState("");
  // const handleChange = (e) => {
  //   setValue(e.target.value);
  //   console.log(value);
  // };
  /////////////LogOut function/////////////////////
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.setItem("username",'')
    navigate("/");
  };
  /////FormFetch APIcall////////////
  const [forms, setForms] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/getforms")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setForms(data.forms));
  }, []);
  console.log(forms);
  ///////////////////////////////////////
  /////FilteredFormFetch APIcall////////////
  const [paramvalue, setParamValue] = useState("");

  const handleChange = (e) => {
    setParamValue({ ...paramvalue, [e.target.name]: e.target.value });
  };
let startdate=paramvalue.fromDate;
let enddate=paramvalue.toDate;
  const [dforms, setDForms] = useState([]);
  const sendRequest2 = async () => {
    const res = await axios
      .get(`http://localhost:8000/getformswithdate/${startdate}/${enddate}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  // useEffect(() => {
  //   sendRequest2().then((data) => setDForms(data.dforms));
  // }, [paramvalue]);
  // console.log(dforms);
  ///////////////////////////////////////
  const toggleTable = () => {
    table === "filtered" ? setTable("showAll") : setTable("filtered");
  };
  //////////////////////////
  const handleFilter = () => {
    toggleTable();
    sendRequest2().then((data) => setDForms(data.dforms));
    console.log(dforms)
  };
  return (
    <Wrapper>
      <Heading>Admin Page</Heading>
      <Logout variant="contained" onClick={handleLogout}>
        Logout
      </Logout>

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
          name="fromDate"
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
          name="toDate"
          label="To"
          type="date"
          defaultValue="2017-05-24"
          sx={{ width: 220, margin: 5 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <Button sx={{ margin: 2 }} onClick={handleFilter} variant="contained">
          {table==='showAll'? 'Filter':'show all'}
        </Button>
      </Box>
      
      {/* ////////Table////////// */}
      <TableContainer component={Paper}>
      {table === "showAll" ? (
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Member</StyledTableCell>
              <StyledTableCell align="right">user</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          
            <TableBody>
              {forms?.map((form) => (
                <StyledTableRow>
                  <StyledTableCell>{form.memberName}</StyledTableCell>
                  <StyledTableCell align="right">{form.user}</StyledTableCell>
                  <StyledTableCell align="right">{form.date}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            </Table>
          ) : (
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Member</StyledTableCell>
              <StyledTableCell align="right">user</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {dforms?.map((dform) => (
                <StyledTableRow>
                  <StyledTableCell>{dform.memberName}</StyledTableCell>
                  <StyledTableCell align="right">{dform.user}</StyledTableCell>
                  <StyledTableCell align="right">{dform.date}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          
        </Table>
        )}
      </TableContainer>
    </Wrapper>
  );
};

export default AdminPage;
