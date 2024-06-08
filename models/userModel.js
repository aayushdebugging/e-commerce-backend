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
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Check if password is modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

// Compare entered password with stored password
userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

// Generate JWT token
userSchema.methods.generateToken = function () {
    try {
        const token = JWT.sign({ _id: this._id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
        console.log("Generated token:", token); // Log generated token for debugging
        return token;
    } catch (error) {
        throw new Error(error);
    }
};

const userModel = mongoose.model("Users", userSchema);

export default userModel;
