import mongoose from 'mongoose';


const memberSchema = new mongoose.Schema({
    memberName:{
        type:String,
        require:true,
        
    }
    

});


const Member = mongoose.model('Member', memberSchema);

export default Member;