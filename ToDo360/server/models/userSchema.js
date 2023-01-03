import mongoose from 'mongoose';
import Joi from "joi";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        
    },
    email:{
        type:String,
        require:true,
        unique:true
        
    },
    password:{
        type:String,
        require:true,
        
    },
    

});


export const User = mongoose.model('User', userSchema);
export const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};
// export default User;
// module.exports = { User, validate };