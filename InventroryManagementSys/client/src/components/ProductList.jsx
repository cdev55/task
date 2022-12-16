import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

//components
import Product from "./Product";

const ProductList = () => {
  
  const [products, setProducts] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/products/getallproducts")
      .catch((err) => console.log(err));
    const Data = await res.data;
    return Data;
  };
  useEffect(() => {
    sendRequest().then((data) => setProducts(data.products));
  }, []);
  console.log(products);
  return (
    <>
      {products?.length ? (
        products.map((product) => (
          <Grid item lg={3} sm={4} xs={12}>
            <Product
              id={product._id}
              productid={product.id}
              description={product.description}
              productname={product.name}
              price={product.price}
              quantity={product.quantity}
              category={product.category.categoryname}
            />
          </Grid>
        ))
      ) : (
        <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
          No products are available in the Inventory. Please add products.
        </Box>
      )}
    </>
  );
};

export default ProductList;
