import mongoose from "mongoose";

export const Connection=(username,password)=>{
    mongoose.connect(`mongodb+srv://${username}:${password}@todo.1lihppa.mongodb.net/todo?retryWrites=true&w=majority`)
    .then(() => console.log(`Database connected successfully`))
    .catch(() => console.log(  `Error while connecting the database`))

}
