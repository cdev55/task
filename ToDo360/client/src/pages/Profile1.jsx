import { styled, Box, Button, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

//////////STYLES//////////////
const Header = styled(Box)`
  padding: 10px 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;
const Image = styled("img")({
  width: 100,
  // display: 'flex',
  // margin: 'auto',
  // padding: '50px 0 0'
});

const LogoutButton = styled(Button)``;

const Content = styled(Box)`
  // padding:10px 30px;
  margin: auto;
  box-shadow: 5px 5px 5px #8aff8a;
  width: 50%;
  height: 500px;
  border-radius: 40px;
  display: flex;
  // justify-content:space-between;
  align-items: center;
  // box-sizing:border-box;
  flex-flow: column wrap;
`;

const Heading = styled(Typography)`
  text-align: center;
  font-size: 50px;
`;
const AddTask = styled(TextField)``;
/////////////////////////////////////

const initialToDo={
    title:''
}

const Profile1 = () => {
  const [inputData, setInputData] = useState("");
  const [Todo, setToDo] = useState([]);
  const [togglebutton, setToggleButton] = useState(true);
  const [task, setTask] = useState([initialToDo]);
  const [isEditItem, setIsEditItem] = useState(null);

  const navigate = useNavigate();

//////API call for fetching the data///////
// const sendRequest=async()=>{
//   const res=await axios.get('http://localhost:8000/getalltodo');
//   let data=await res.data;
//   return data;
// }
// useEffect(()=>{sendRequest().then((data) => setTodo(data.Todos));
// }, [])
//////////////////////////////////////////


/////////Create Todo//////////
const onInputData=(e)=>{
    setInputData([...inputData,e.target.value])
}

const AddItem=async()=>{
let res;
try {
    res=await axios.post('http://localhost:8000/createtodo',{
    title:inputData.title
})
} catch (error) {
    console.log(error);
    
}

let data=await res.data;
setInputData(initialToDo);
console.log(data);
// setTask(data);

// const res= await axios.post('http://localhost/')


  // const AddItem = () => {
    if (!inputData) { alert('Please fill the data')
    } 
    else if(inputData && !togglebutton){
setTask(
  task.map((item)=>{
    if(item.id===isEditItem){
      return{...item,name:inputData}
    }
    return item;
  })
)
///////////////////////////
setToggleButton(true); 
    setInputData('');
    setIsEditItem(null);
    }
    else {
      const allInputData = {
        id: task._id,
        name: inputData.title,
      };
      setTask([...task, allInputData]);
    }
    setInputData();
  };
  //////Delete ToDo//////
  const deleteItem = (id) => {
    const updatedItems = task.filter((item) => {
      return item.id !== id;
    });
    setTask(updatedItems);
  };
///////////////////////

  //////Edit ToDo//////

  const editItem = (id) => {
    let newEditItem=task.find((element)=>{
      return element.id===id
    });
    setToggleButton(false); 
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };
//////////////////////
  const imgURL =
    "https://media.licdn.com/dms/image/D4D0BAQEt4ziWZwop0A/company-logo_200_200/0/1667110371185?e=2147483647&v=beta&t=KtYPGs-kxOlzRvWOBBVqP1tw2Dhw4kOSpFz7ZgIcd5s";

  return (
    <>
      <Header>
        <Image src={imgURL} alt="logo" />
        <LogoutButton
          style={{ backgroundColor: "#3BB143" }}
          variant="contained"
          onClick={()=>navigate('/')}
        >
          Logout
        </LogoutButton>
      </Header>
      <Content>
        <Heading>ToDo List</Heading>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            variant="outlined"
            label="Add Task"
            name="title"
            onChange={(e) => onInputData(e)}
          />
          {
            togglebutton ? <AddIcon onClick={AddItem} />: <EditIcon onClick={AddItem}/>
          }
          
        </Box>
        {Todo.map((item) => (
          <Box
            style={{
              marginTop: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={item.id}
          >
            <Typography style={{ marginRight: "30px" }}>{item.name}</Typography>
            <EditIcon onClick={() => editItem(item.id)}/>
            <DeleteOutlineIcon onClick={() => deleteItem(item.id)} />
          </Box>
        ))}
        <Button
          style={{ marginTop: "30px", backgroundColor: "#3BB143" }}
          variant="contained"
          onClick={() => setTask([])}
        >
          Clear all
        </Button>
      </Content>
    </>
  );
};

export default Profile1;
