import React from "react";
import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
//   width:20em;
  max-height: 350px;
  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;

const Product = ({
  id,

  productid,
  description,
  productname,
  price,
  quantity,
  category,
}) => {
  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };
  return (
    <Container>
        
      <Heading><span style={{color:'#AB7D00'}}>Category:</span> {category}</Heading>
      <Text><span style={{color:'#AB7D00'}}>ProductId:</span> {productid}</Text>

      <Text><span style={{color:'#AB7D00'}}>Name:</span> {productname}</Text>
      <Text><span style={{color:'#AB7D00'}}>Price:</span> &#8377;{price}</Text>
      <Text><span style={{color:'#AB7D00'}}>Quatinty:</span> {quantity}</Text>
      <Details><span style={{color:'#AB7D00'}}>Description:</span> {description}</Details>
    </Container>
  );
};

export default Product;
