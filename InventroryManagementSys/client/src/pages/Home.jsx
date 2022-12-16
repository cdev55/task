import React from 'react';
import { Outlet, Link } from "react-router-dom";
import {styled,Typography,Button,Box} from '@mui/material';

const Heading=styled(Typography)`
font-size:2rem;
font-weight:bold;

`;
const Btn=styled(Button)`
padding:.5em 2em;
`;
const Wrapper=styled(Box)`
border:5px solid grey;
padding:5em;
margin:10rem auto;
width:100%;
max-width:700px;
display:flex;
flex-direction:column;
align-items:center;
border-radius:4rem;
`;

const Container=styled(Box)`
display:flex;
width:100%;
margin:2rem;
justify-content:space-between;

`;
const Home = () => {
  return (
    <Wrapper>
    <Heading>Welcome to <span style={{color:'#AB7D00'}}>Outshade Digital</span> Inventory</Heading>
    <Container>
    <Link to="/products"><Btn variant='outlined'>Products</Btn></Link>
    <Link to="/categories"><Btn variant='outlined'>Categories</Btn></Link>
    <Link to="/profile"><Btn variant='outlined'>User profile</Btn></Link>
    </Container>
    
    </Wrapper>
  )
}

export default Home