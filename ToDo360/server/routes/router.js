import express from  'express';
import { createToDo, deleteToDo, getAllToDo, updateToDo } from '../controllers/todoController.js';
import { sendLink, verifyLink } from '../controllers/tokenController.js';
import { userLogIn, userSignUp } from '../controllers/userController.js';



const router = express.Router();

//User routes
router.post('/usersignup', userSignUp);

router.post('/userlogin', userLogIn);


//////ToDo Routes//////////
router.get('/getalltodo',getAllToDo);
router.post('/createtodo',createToDo);
router.put('/updatetodo/:id',updateToDo);
router.delete('/deletetodo/:id',deleteToDo);



////////Token Routes////////
router.post('/passwordreset',sendLink);
router.post('/passwordreset/:userId/:token',verifyLink);





export default router;