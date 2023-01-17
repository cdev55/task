import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// import http from 'http';

import { Connection } from './database/db.js';
import path from 'path';
import userrouter from './routers/userRoutes.js';
import taskrouter from './routers/taskRoutes.js';
dotenv.config();


const PORT = process.env.PORT ||8000
const app =express();
app.use("/images",express.static(path.join('images')))
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/tasks', taskrouter);
app.use('/api/users', userrouter);
app.listen(PORT,()=>{
    console.log(`listening to port:${PORT}`)
})
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

Connection(username,password);

//////////////////////////////////////////////////////
// // inin database
// import mongoose from "mongoose";
// mongoose.connect(`mongodb+srv://todouser:todopass@todo.1lihppa.mongodb.net/todo?retryWrites=true&w=majority`)
// .then(() => console.log(`Database connected successfully`))
// .catch(() => console.log(  `Error while connecting the database`))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type,Accept"
//     );
//     res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS")
//     next();
// })
// app.set('port',port);


// app.post('/api/tasks',(req,res,next)=>{

//     const task=new Task({
//         title:req.body.title,
//         description:req.body.description
//     })
//     task.save();
//     console.log(req.body);
//     res.json({
//         status:{
//             message:'successfully',
//             code:201
//         }
//     })
// })
// app.get('/api/tasks',(req,res,next)=>{

//     Task.find().then((task)=>{
//         res.json({
//             status:{
//                 message:'successfull',
//                 code:'200'
//             },
//             data:task
//         })
//     })
//     // const task=[{
//     //     _id:'001',
//     //     title:'Title of first task',
//     //     description:'Description of first task'

//     // },
//     // {
//     //     _id:'002',
//     //     title:'Title of second task',
//     //     description:'Description of second task'

//     // }];
//     // res.json({
//     //     status:{
//     //         message:'successfull',
//     //         code:'200'
//     //     },
//     //     data:task
//     // })
// })

// app.delete('/api/tasks/:id',(req,res,next)=>{
//     Task.deleteOne({_id:req.params.id}).then(()=>{
//         res.json({
//             status:{
//                 messsage:'successfully',
//                 code:201
//             }
//         })
//     })
// })

// app.put('/api/task/:id',(req,res,next)=>{
//     const task=new Task({
//         _id:req.body._id,
//         title:req.body.title,
//         description:req.body.description
//     })
//     Task.updateOne({_id:req.body._id},task).then(()=>{
//         res.json({
//             status:{
//                 message:'successfully',
//                 code:201
//             },
//             data:task
//         })
//     })
// })
// const server=http.createServer(app);
// server.on('error',(err)=>{
//     console.log('error in server',err.message,err)
// })

// server.on('listening',()=>{console.log('listening port',port)});

// server.listen(port)




