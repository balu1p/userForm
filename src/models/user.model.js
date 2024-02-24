import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import {format} from 'date-fns';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: format(new Date(),"dd/MM/yyyy"),
        required: true,
        trim: true,
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: {
        type: String,
    }
},{timestamps: true});

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this._email,
        name: this.name
    },
    process.env.JWT_ACCESS_TOKEN,
    {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXP
    }
    )
}


export const User = mongoose.model('User', userSchema)