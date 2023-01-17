import Task from "../models/Task.js";




export const getAllTask = (req, res) => {
  console.log(req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.currentpage;

  const taskQuery = Task.find();
  if (pageSize && currentPage > -1) {
    taskQuery.skip(pageSize * currentPage).limit(pageSize);
  }
  taskQuery.then(async(task) => {
    res.json({
      status: {
        message: "successfull",
        code: "200",
      },
      data: task,
      totalCount:await Task.count()
    });
  });
};

export const getTaskById=async(req,res)=>{
 const id =req.params.id;
  await Task.findById(id)
  .then((task) => {
    res.json({
      status: {
        message: "successful",
      },
      data: task,
    });
  })
  .catch((e) => {
    res.status(500).json({
      status: {
        message: e.message,
        code: 500,
      },
    });
  })
}

export const addTask = (req, res) => {
    const url=req.protocol+"://"+req.get('host');
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    imagePath:url+'/images/'+req.file.filename,
    creator: req.userData.userId,

  });
  task.save();
  console.log(task);
  res.json({
    status: {
      message: "successfully",
      code: 201,
    },
  });
};
///////////////////////////////////////////
// export const updateTask =  async(req, res) => {
//   console.log(first)
//   const id=req.params.id;
//   let {title,description,imagePath}=req.body;
//   let task;
//   try {
//     task=await Task.findByIdAndUpdate({id},{title,description,imagePath});
//     return res.status(200).json({ msg: "Task Updated successfully !!", task });
//     console.log(second)
  
//   }catch{
//     console.log(error);
//   }
//   if (!task) {
//     res.status(404).json({ msg: "Task not found"});
//   }};
////////////////////////////////////////////
export const updateTask =  async(req, res) => {

  const url=req.protocol+'://'+req.get("host");
  let imagePath=req.body.imagePath;
  if(req.file){
      imagePath=url+'/images/'+req.file.filename;

  }
  console.log("imagepath", imagePath);

const task =  await new Task({
  _id: req.body._id,
  title: req.body.title,
  description: req.body.description,
  imagePath:imagePath
});
await Task.findByIdAndUpdate({ _id: req.body._id, creator: req.userData.userId }, task).then(
  (result) => {
    console.log(result);
    // if (result.n > 0)
      res.json({
        status: {
          message: "Updated successfully",
          code: 201,
        },
        data: task,
      });
    // else {
    //   res.status(401).json({
    //     status: {
    //       message: "Auth Failed",
    //       code: 401,
    //     },
    //     data: task,
    //   });
    // }
  }
).catch((e) => {
  res.status(500).json({
    status: {
      message: e.message,
      code: 500,
    },
  });
});
};
////////////////////////////////////////////////
/////////////////////////////////////////////
// export const updateTask =  (req, res) => {
//     const url=req.protocol+'://'+req.get("host");
//     let imagePath=req.body.imagePath;
//     if(req.file){
//         imagePath=url+'/images/'+req.file.filename;

//     }
//     console.log("imagepath", imagePath);

//   const task = new Task({
//     _id: req.body._id,
//     title: req.body.title,
//     description: req.body.description,
//     imagePath:imagePath
//   });
//   Task.updateOne({ _id: req.body._id, creator: req.userData.userId }, task).then(
//     (result) => {
//       console.log(result);
//       // if (result.n > 0)
//         res.json({
//           status: {
//             message: "Updated successfully",
//             code: 201,
//           },
//           data: task,
//         });
//       // else {
//       //   res.status(401).json({
//       //     status: {
//       //       message: "Auth Failed",
//       //       code: 401,
//       //     },
//       //     data: task,
//       //   });
//       // }
//     }
//   ).catch((e) => {
//     res.status(500).json({
//       status: {
//         message: e.message,
//         code: 500,
//       },
//     });
//   });
// };

export const deleteTask = (req, res) => {
  Task.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    (result) => {
      console.log(result);
      // if (result.n > 0)
        res.json({
          status: {
            messsage: "successfully",
            code: 201,
          },
        });
      // else {
      //   res.status(401).json({
      //     status: {
      //       message: "auth failed",
      //       code: 401,
      //     },
        });
      }
    // }
  // );
// };
