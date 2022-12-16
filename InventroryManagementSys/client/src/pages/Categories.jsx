import React, { useState, useEffect } from "react";
import axios from "axios";

import { styled, Typography, Button, Box, TextField } from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";

const Heading = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const Container = styled(Box)`
  border: 5px solid grey;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2rem;
`;

const AddCategory = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const DisplayButton = styled(Button)`
width:100%
margin:auto;
`;

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const categoryInitialValues = {
    
    categoryname: '',
}
const Categories = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const handleClose = () => {
    setAnchorEl(null);
  };
 ///Category Input///
 const [category, setCategory] = useState(categoryInitialValues);
 const onInputChange = (e) => {
   setCategory({ ...category, [e.target.name]: e.target.value});
}
///API call///
const navigate = useNavigate();

const postingCategory = async () => {
    const res = await axios
      .post("http://localhost:8000/categories/addcategory", {categoryname: category.categoryname})
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category);
    postingCategory()
      .then((data) => console.log(data))
      .then(() => navigate("/categories"));
    setCategory(categoryInitialValues);
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
      <Heading>Categories</Heading>
      <Container>
        <Heading>Add Category</Heading>

        <AddCategory>
          <TextField
            variant="standard"
            onChange={(e) => onInputChange(e)}
            name="categoryname"
            label="Category Name"
          />
          <DisplayButton
            style={{ margin: "2rem" }}
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            ADD
          </DisplayButton>
        </AddCategory>
      </Container>

      {/* <DisplayButton variant="contained">Display Categories</DisplayButton> */}
      {categories?.length ? (
        categories.map((category) => (
          <Box>
            <Text>{category.categoryname}</Text>
          </Box>
        ))
      ) : (
        <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
          No Categories are available in the Inventory. Please add Categories.
        </Box>
      )}
    </>
  );
};

export default Categories;
