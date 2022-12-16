import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';

const productSchema = new mongoose.Schema({
    id:{
        type:String,
        require:true,
        unique:true,
    },
    name:{
        type:String,
        require:true,
        
    },
    price:{
        type:Number,
        require:true,
        
    },
    quantity:{
        type:Number,
        require:true,
        
    },
    description:{
        type:String,
        require:true,
        
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },

});

// autoIncrement.initialize(mongoose.connection);
// productSchema.plugin(autoIncrement.plugin, 'product');

const Product = mongoose.model('Product', productSchema);

export default Product;