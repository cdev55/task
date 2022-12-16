import React from 'react'
import {styled,Typography,Button,Box, TextField} from '@mui/material';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';




const Heading=styled(Typography)`
font-size:2rem;
font-weight:bold;
text-align:center;

`;


const Container=styled(Box)`
border:5px solid grey;
margin:0.5em auto;
width:100%;
max-width:300px;
display:flex;
flex-direction:column;
align-items:center;
border-radius:2rem;

`;

const EditProfile=styled(Box)`

display:flex;
flex-direction:column;

padding:0;
margin:0;
`;

const DisplayButton=styled(Button)`
width:100%
margin:auto;
`;
const Profile = () => {

    const onInputChange = () => {
    
    }
  return (
    
    <>
    <Heading>Profile</Heading>
    <Container>
    <Heading>Edit Profile</Heading>

    <EditProfile>

    

        <TextField style={{margin:'2rem'}} variant="outlined" onChange={(e) => onInputChange(e)} name='name' label='Name' />
        <TextField style={{margin:'2rem'}} variant="outlined" onChange={(e) => onInputChange(e)} name='email' label='Email' />
        <TextField style={{margin:'2rem'}} variant="outlined" onChange={(e) => onInputChange(e)} name='password' label='Password' />
    <DisplayButton style={{margin:'2rem'}} variant='contained'type='submit' >Save Changes</DisplayButton>
        
    </EditProfile>
    </Container>
       

    </>
  )
}

export default Profile;