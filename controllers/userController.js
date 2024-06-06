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
        
        // Validation
        if (existingUser) {
            return res.status(400).send({ // Changed status to 400
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
        // User validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }
        // Check password
        const isMatch = await user.comparePassword(password); 
        // Validation
        if (!isMatch) {
            return res.status(401).send({ 
                success: false,
                message: 'Invalid credentials'
            });
        }
        //token
        const token = user.generateToken();


        res.status(200).cookie("token" , token)
        .send({
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
