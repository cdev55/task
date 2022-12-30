import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Button, Typography, styled } from "@mui/material";
import axios from "axios";
import { LoginContext } from "../context/ContextProvider";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;

  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Heading = styled(Typography)`
  //   color: #878787;
  font-size: 50px;
  text-align: center;
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const userLoginInitialValues = {
  email: "",
  password: "",
};

const adminLoginInitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [userLogin, setUserLogin] = useState(userLoginInitialValues);
  const [adminLogin, setAdminLogin] = useState(adminLoginInitialValues);

  const [error, showError] = useState("");
  const [account, toggleAccount] = useState("user");

  const navigate = useNavigate();
  //   const { setAccount } = useContext(LoginContext);

  useEffect(() => {
    showError(false);
  }, [userLogin]);

  const onValueChange = (e) => {
    account === "user"
      ? setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
      : setAdminLogin({ ...adminLogin, [e.target.name]: e.target.value });
  };

  const sendRequest = async () => {
    let res = await axios
      .post("http://localhost:8000/userlogin", {
        email: userLogin.email,
        password: userLogin.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    setUserLogin(userLoginInitialValues);
    // setAccount(userLogin.name);
    // navigate("/userpage");
    return data;
  };

  const loginUser = () => {
    sendRequest()
      .then((Data) => localStorage.setItem("username", Data.user.name))
      .then(() => navigate("/userpage"));
  };

  const loginAdmin = async () => {
    let res = await axios
      .post("http://localhost:8000/adminlogin", {
        email: adminLogin.email,
        password: adminLogin.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    setAdminLogin(adminLoginInitialValues);
    // setAccount(adminLogin.name);
    navigate("/adminpage");
    return data;
  };

  const toggleSignup = () => {
    account === "admin" ? toggleAccount("user") : toggleAccount("admin");
  };

  return (
    <Component>
      <Box>
        {account === "user" ? (
          <Wrapper>
            <Heading>User Login</Heading>
            <TextField
              variant="standard"
              value={userLogin.email}
              onChange={(e) => onValueChange(e)}
              name="email"
              label="Enter Email"
            />
            <TextField
              variant="standard"
              // type='password'
              value={userLogin.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              onClick={() => toggleSignup()}
              style={{ marginBottom: 50 }}
            >
              Login as Admin
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <Heading>Admin Login</Heading>

            <TextField
              variant="standard"
              value={adminLogin.email}
              onChange={(e) => onValueChange(e)}
              name="email"
              label="Enter Email"
            />

            <TextField
              variant="standard"
              // type='password'
              value={adminLogin.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />

            <SignupButton onClick={() => loginAdmin()}>Login</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Login as User
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
