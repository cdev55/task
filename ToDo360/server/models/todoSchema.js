import mongoose from 'mongoose';


const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // description: {
    //     type: String,
    // }
    

});


const ToDo = mongoose.model('ToDo', toDoSchema);

export default ToDo;