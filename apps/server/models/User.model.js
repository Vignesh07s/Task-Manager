import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name cannot be less than 3 characters"],
        maxlength: [100, "Name cannot have more than 100 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        maxlength: [254, "Email cannot have more than 254 characters"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [3, "Password must be atleast 8 characters long"],
        select: false
    }
});

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    
    } catch (error) {
        return error;
    }
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;