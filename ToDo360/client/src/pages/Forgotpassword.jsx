import React from 'react'
import {styled,Box,Typography, TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
    const navigate=useNavigate();
    const handleSubmit=()=>{
        navigate('/resetpassword')
    }
  return (
    <>
    <Box style={{width:'500px',boxShadow:'5px 5px 5px grey',margin:'100px auto' ,padding:'20px'}} >
        <Typography style={{width:'100%',margin:'10px', fontSize:'50px',color:'#3BB143'}} > Enter your email Id</Typography>
        <TextField style={{width:'100%',margin:'10px'}} label='Email Address'/>
        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
    </Box>
    </>
  )
}

export default Forgotpassword