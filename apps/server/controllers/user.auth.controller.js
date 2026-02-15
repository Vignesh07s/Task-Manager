import User from "../models/User.model.js";
import generateToken from "../Utilities/generateToken.js";

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are mandatory",
            });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "A User with this email already exists"
            })
        }

        console.log("Testing1");
        const newUser = await User.create({ name, email, password });
        console.log("Testing2");
        generateToken(res, newUser._id);

        return res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(500).json({
                message: messages[0]
            });
        }
        return res.status(500).json({
            message: "Server error",
            error: error.message,
            stack: error.stack
        });
    }

}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        generateToken(res, user._id);

        res.status(200).json({
            message: "Login Successfull",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

const logoutUser = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expiresIn: new Date(0),
        path: '/'
    })

    res.status(200).json({
        message: "Logout successfull"
    })
}

export { registerUser, loginUser, logoutUser };