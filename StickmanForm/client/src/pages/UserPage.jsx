import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import moment from 'moment';
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const name = localStorage.getItem("username");

const Wrapper = styled(Box)`
  margin: auto;
  max-width: 1200px;
`;
const Logout = styled(Button)`
  float:right;
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

const userFormInitialValues = {
  memberName: "",
  user: "",
  date: "",
  time: "",
// datetime:""
};

const UserPage = () => {
  ////Handling Menu////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  ///API call///
  const [members, setMembers] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/getmembers")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setMembers(data.members));
  }, []);
  console.log(members);
  /////////////////////////////

  //   const [value, setValue] = useState("");
  //   const handleChange = (e) => {
  //     setValue({ ...value, [e.target.name]: e.target.value });
  //     console.log(e.target.value);
  //   };
  //////////////////////////
  const [form, setForm] = useState(userFormInitialValues);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const handleSubmit = async () => {
    let res = await axios
      .post("http://localhost:8000/postform", {
        memberName: form.member,
        user: localStorage.getItem("username"),
        date:form.date,
        // date:moment(form.date).format()
        // date: new Date(form.date),
        time:form.time,
      })
      .catch((error) => console.log(error));
    const data = await res.data;
    return data;
  };
  //////////////////////
const navigate=useNavigate();
  const handleLogout=()=>{
    // localStorage.setItem("username",'')
    navigate("/")
  }
  return (
    <Wrapper>
      <Heading>User Page</Heading>
      <Logout variant="contained" onClick={handleLogout} >Logout</Logout>
      <UserForm>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Member</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={members}
            label="Member"
            name="member"
            onChange={handleChange}
          >
            {members?.map((member) => (
              <MenuItem
                name="member"
                value={member.memberName}
                onClick={handleClose}
              >
                {member.memberName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="date"
          name="date"
          label="Date"
          type="date"
          defaultValue="2017-05-24"
          sx={{ width: 220, margin: 5 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <TextField
          id="time"
          label="Time"
          type="time"
          name="time"
          defaultValue="07:30"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
          onChange={handleChange}
        />
        
        <Button variant="contained" sx={{ margin: 5 }} onClick={handleSubmit}>
          Submit
        </Button>
      </UserForm>
    </Wrapper>
  );
};

export default UserPage;
