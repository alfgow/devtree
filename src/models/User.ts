import mongoose, { Schema } from "mongoose";
import { IUser } from "./Interfaces";

const userSchema =  new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
})

const User = mongoose.model<IUser>('User', userSchema)

export default User