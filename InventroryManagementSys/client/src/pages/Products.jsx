import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Grid } from '@mui/material';
import {styled,Typography,Button,Box, TextField} from '@mui/material';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ProductList from '../components/ProductList';




const Heading=styled(Typography)`
font-size:2rem;
font-weight:bold;
text-align:center;

`;


const Container=styled(Box)`
border:5px solid grey;
margin:0.5em auto;
width:100%;
max-width:1200px;
display:flex;
flex-direction:column;
align-items:center;
border-radius:2rem;

`;

const AddProduct=styled(Box)`

display:flex;
justify-content:space-between;
padding:0;
margin:0;
`;

const DisplayButton=styled(Button)`
width:100%
margin:auto;
`;

const productInitialValues = {
    id:'',
    name: '',
    price: '',
    quantity:'',
    description:'',
    category:''
};
const Products = () => {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value});
}
   ///API call toget CategoryId///
   const [category, setCategory] = useState();

   const getRequest = async () => {
     const res = await axios
       .get("http://localhost:8000/categories/getcategory")
       .catch((err) => console.log(err));
     const Data = await res.data;
     return Data;
   };
   useEffect(() => {
     getRequest().then((data) => setCategory(data.category));
   }, [handleChange]);
   console.log(category);

  ///Product Input///
  const [product, setProduct] = useState(productInitialValues);
  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value});
}

///API call///
const navigate = useNavigate();

const postingRequest = async () => {
    const res = await axios
      .post("http://localhost:8000/products/addproduct", {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: category.category
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    postingRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/products"));
  };

  ///API call///
  const [categories, setCategories] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/categories/getallcategories")
      .catch((err) => console.log(err));
    const Data = await res.data;
    return Data;
  };
  useEffect(() => {
    sendRequest().then((data) => setCategories(data.categories));
  }, []);
  console.log(categories);
  return (
    <>
    <Heading>Products</Heading>
    <Container>
    <Heading>Add Product</Heading>

    <AddProduct>

    <Button
        id="fade-button"
        variant='outlined'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{padding:'0'}}
        
      >
        Click to choose Category
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        onChange={(e) => handleChange(e)}
      >
        {categories?.length ? (
        categories.map((category) => (
          <Box>
                    <MenuItem name='category'  onClick={handleClose}>{category.categoryname}</MenuItem>

          </Box>
        ))
      ) : (
        <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
          No products are available in the Inventory. Please add products.
        </Box>
      )}
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>

        <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='id' label='Product Id' />
        <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='name' label='Product Name' />
        <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='price' label='Product Price' />
        <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='quantity' label='Product Quantity' />
        <TextField variant="outlined" onChange={(e) => onInputChange(e)} name='description' label='Product Description' />
           
    <DisplayButton style={{margin:'2rem'}} variant='contained' type='submit' onClick={handleSubmit} >ADD</DisplayButton>

    </AddProduct>
    </Container>
       
    <DisplayButton style={{margin:'0 50rem'}} variant='contained'>Display Products</DisplayButton>
    <Grid container>
                {/* <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid> */}
                <Grid container item xs={12} sm={10} lg={10}>
                <ProductList/>
                </Grid>
            </Grid>
    
    

    </>
  )
}

export default Products