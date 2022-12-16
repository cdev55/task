import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    categoryname:{
        type:String,
        require:true,
        unique:true
        
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product", required: true }],
});


const Category = mongoose.model('Category', categorySchema);

export default Category;