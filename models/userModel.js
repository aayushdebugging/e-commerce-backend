
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'] 
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already taken']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be at least 6 characters'] 
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    city: {
        type: String,
        required: [true, 'City name is required']
    },
    country: {
        type: String,
        required: [true, 'Country name is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    profilePic: {
        type: String,
        default: null 
    }
}, { timestamps: true });



//functions
//hash func
userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10);
});

//compare fucntion
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//JWT function
userSchema.methods.generateToken = function(){
    return JWT.sign({_id: this._id}, process.env.SECRET_KEY, {expiresIn:"7d",

    });
};


export const userModel = mongoose.model("Users", userSchema);
export default userModel;
