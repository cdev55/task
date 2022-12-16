import mongoose from "mongoose";
import Category from "../model/categorySchema.js";
import Product from "../model/productSchema.js";
// export const createProduct=async(req,res)=>{
//     let product;
//     try {
//         product=req.body;
//         const newProduct= new Product(product);
//         await newProduct.save();
//         res.status(200).json({mg:'New product saved successfully :',product})

//     } catch (error) {
//         res.status(500).json({mg:'Error while creating the product :',error})
//     }
// } 


  ////////////Get All Products(sorted by category)///////////////////////////

export const getAllProducts = async (req, res, next) => {
    let products;
    try {
        products = await Product.find().populate("category");
    } catch (err) {
      return console.log(err);
    }
    if (!products) {
      return res.status(404).json({ message: "No Products Found" });
    }
    return res.status(200).json({ products });
  };
  ////////////Add Product///////////////////////////

export const addProduct = async (req, res, next) => {
    const { id,name, description, price, quantity,category } = req.body;
  
    let existingCategory;
    try {
        existingCategory = await Category.findById(category);
      } catch (err) {
        return console.log(err);
      }
      if (!existingCategory) {
        return res.status(400).json({ message: "Unable to find this category" });
      }
    const product = new Product({
        id,name, description, price, quantity,category
    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await product.save({ session });
      existingCategory.products.push(product);
      await existingCategory.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  
    return res.status(200).json({ product });
  };

  ///////////////Update Product///////////////////////////
  export const updateProduct = async (req, res, next) => {
    const { name, price,quantity,description,category } = req.body;
    const productId = req.params.id;
    let product;
    try {
        product = await Product.findByIdAndUpdate(productId, {
            name, price,quantity,description,category
      });
    } catch (err) {
      return console.log(err);
    }
    if (!product) {
      return res.status(500).json({ message: "Unable To Update The Product" });
    }
    return res.status(200).json({ product });
  };
  ///////////////Get Product By Id///////////////////////////

  export const getProductById = async (req, res, next) => {
    const id = req.params.id;
    let product;
    try {
        product = await Product.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!product) {
      return res.status(404).json({ message: "No Product Found" });
    }
    return res.status(200).json({ product });
  };
  ///////////////Delete Product///////////////////////////
  
  export const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
  
    let product;
    try {
        product = await Product.findByIdAndRemove(id).populate("category");
      await product.category.products.pull(product);
      await product.category.save();
    } catch (err) {
      console.log(err);
    }
    if (!product) {
      return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
  };
  ///////////////Get Product By Category///////////////////////////
  
  export const getByCategoryId = async (req, res, next) => {
    const categoryId = req.params.id;
    let categoryProducts;
    try {
        categoryProducts = await Category.findById(categoryId).populate("products");
    } catch (err) {
      return console.log(err);
    }
    if (!categoryProducts) {
      return res.status(404).json({ message: "No Product Found" });
    }
    return res.status(200).json({ category: categoryProducts });
  };