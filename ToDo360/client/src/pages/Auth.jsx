import React, { useState, useEffect, useContext } from "react";

import { TextField, Box, Button, Typography, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)`
  width: 400px;
  margin: 50px auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 200,
  height:200,
  display: "flex",
  margin: "0 auto",
//   padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 0px 35px;
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

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  email: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  email: "",
  password: "",
};

const Auth = () => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");
  const [account, toggleAccount] = useState("login");

  const navigate = useNavigate();
  

  const imageURL ="https://media.licdn.com/dms/image/D4D0BAQEt4ziWZwop0A/company-logo_200_200/0/1667110371185?e=2147483647&v=beta&t=KtYPGs-kxOlzRvWOBBVqP1tw2Dhw4kOSpFz7ZgIcd5s";

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let res;
    try {
        res=await axios.post('http://localhost:8000/userlogin',{
            email:login.email,
            password:login.password,
        });
    } catch (error) {
        console.log(error)
    }
    let data=await res.data;
    setLogin(loginInitialValues);
    navigate('/profile')
    return data;

  };

  const signupUser = async () => {
    let res;
    try {
        res = await axios.post('http://localhost:8000/usersignup',{
        name:signup.name,
        email:signup.email,
        password:signup.password,
    });
    } catch (error) {
        console.log(error);
    }
    let data=await res.data;
    setSignup(signupInitialValues);
    
    return data;
    
    
    
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.email}
              onChange={(e) => onValueChange(e)}
              name="email"
              label="Enter Email"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Link to='/forgotpassword'>
              Fortgot password ? Click here to reset password.
            </Link>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              onClick={() => toggleSignup()}
              style={{ marginBottom: 50 }}
            >
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="email"
              label="Enter Email"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
            />

            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Auth;
