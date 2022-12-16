import express from  'express';
// import { getProductById, getProducts } from '../controller/product-controller.js';
import {userSignUp,userLogIn, updateProfile} from '../controller/userController.js';
import {addProduct,updateProduct,getAllProducts,getProductById,getByCategoryId,deleteProduct } from '../controller/productController.js';
import { addCategory,updateCategory,getAllCategories,getCategoryIdByName,deleteCategory} from '../controller/categoryController.js';

const router = express.Router();

//User routes
router.post('/signup', userSignUp);
router.post('/login', userLogIn);
router.put('/profile/updateprofile/:id', updateProfile);


//Product routes
router.post('/products/addproduct', addProduct);
router.put('/products/updateproduct/:id', updateProduct);
router.get('/products/getallproducts/', getAllProducts);
router.get('/products/getproduct/:id', getProductById);
router.get('/products/getproductbycategory/:id', getByCategoryId);
router.delete('/products/deleteproduct/:id', deleteProduct);

//Category routes

router.post('/categories/addcategory', addCategory);
router.put('/categories/updatecategory/:id', updateCategory);
router.get('/categories/getallcategories', getAllCategories);
router.get('/categories/getcategory', getCategoryIdByName);
router.delete('/categories/deletecategory/:id', deleteCategory);




export default router;