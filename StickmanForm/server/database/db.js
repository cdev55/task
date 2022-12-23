import mongoose from 'mongoose';

const Connection = async (username,password) => {
    
    const URL = `mongodb+srv://user:stickmanpass@stickmanform.yeuz8ao.mongodb.net/stickmanform?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useNewUrlParser: true});
        console.log('Database Connected Succesfully !!');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;