import mongoose from 'mongoose';


const userFormSchema = new mongoose.Schema({
    memberName:{
        type:String,
        require:true,
        
    },
    date:{
        type:Date,
        require:true,
        
        
    },
    time:{
        type:Date,
        require:true,
        
    },
    

});


const UserForm = mongoose.model('UserForm', userFormSchema);

export default UserForm;