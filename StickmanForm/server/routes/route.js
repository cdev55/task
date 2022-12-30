import express from  'express';
import { adminLogIn, adminSignUp } from '../controllers/adminController.js';
import { addMember, getMembers } from '../controllers/memberController.js';
// import { getProductById, getProducts } from '../controller/product-controller.js';
import {userSignUp,userLogIn} from '../controllers/userController.js';
import { getForm, getFormWithDate, postForm } from '../controllers/userFormController.js';


const router = express.Router();

//User routes
router.post('/usersignup', userSignUp);
router.post('/adminsignup', adminSignUp);
router.post('/userlogin', userLogIn);
router.post('/adminlogin', adminLogIn);


//UserForm route
router.post('/postform',postForm)
router.get('/getforms',getForm)
router.get('/getformswithdate/:sd/:ed',getFormWithDate)

//Member route
router.post('/addmember', addMember);
router.get('/getmembers', getMembers);





export default router;