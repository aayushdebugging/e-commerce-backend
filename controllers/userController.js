import userModel from '../models/userModel.js';

// Register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, city, country, phone } = req.body;
        
        // Validation
        if (!name || !email || !password || !address || !phone || !country || !city) {
            return res.status(400).send({
                success: false,
                message: "Please provide all the necessary fields."
            });
        }

        // Check existing user 
        const existingUser = await userModel.findOne({ email });
        
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            });
        }

        // Create user
        const user = await userModel.create({
            name,
            email,
            password,
            address,
            city,
            country,
            phone,
        });

        res.status(200).send({
            success: true,
            message: "Registration successful. Please login.",
            user 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in register API',
            error: error.message 
        });
    }
};

// Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide both Email and Password'
            });
        }
        
        // Check user
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }
        
        // Check password
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return res.status(401).send({ 
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Generate token
        const token = user.generateToken();

        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true
        }).send({
            success: true,
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in login API',
            error: error.message
        });
    }
};

// Get user profile
export const getUserProfileController = async (req, res) => {
    try { 
        const user = await userModel.findById(req.user._id).select('-password');
        
        res.status(200).send({
            success: true,
            message: 'User Profile fetched Successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting user profile",
            error: error.message
        });
    }
};

// Logout
export const logoutController = async (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true
        }).send({
            success: true,
            message: "Logout Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in logout",
            error: error.message
        });
    }
};


export const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const { name, email, address, city, country, phone } = req.body;

        // Validation and update
        if (name) user.name = name;
        if (email) user.email = email;
        if (address) user.address = address;
        if (city) user.city = city;
        if (country) user.country = country;
        if (phone) user.phone = phone;

        // Save user
        await user.save();

        res.status(200).send({
            success: true,
            message: "User updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};