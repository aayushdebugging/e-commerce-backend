import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true ,'Product name is required']
    },
    description:{
        type:String,
        require:[true ,'Product Description is required']
    },
    price:{
        type:Number,
        require:[true,'Product Price is Required']
    },
    stock:{
        type:Number,
        require:[true,'Product Price is required']
    }

})

export const productModel = mongoose.model("Products",productSchema);
export default productModel;