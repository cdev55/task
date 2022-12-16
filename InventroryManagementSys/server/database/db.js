import mongoose from 'mongoose';

const Connection = async (username,password) => {
    
    const URL = `mongodb+srv://user:inventorypass@inventory.mr3yab9.mongodb.net/Inventory?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useNewUrlParser: true});
        console.log('Database Connected Succesfully !!');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;