import mongoose from 'mongoose';


const userFormSchema = new mongoose.Schema({
    memberName:{
        type:String,
        require:true,
        
    },
    user:{
        type:String,
        require:true,
        
    },
    date:{
        type:Date,
        require:true,
        
        
    },
    time:{
        type:String,
        require:true
        
    },
    // datetime:{
    //     type:Date,
    //     require:true,
        
    // },
    

});


const UserForm = mongoose.model('UserForm', userFormSchema);

export default UserForm;