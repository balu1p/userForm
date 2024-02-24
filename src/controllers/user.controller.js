import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {format} from 'date-fns'

const  GenerateAccessToken = async(userId) =>{
  const user = await User.findById(userId._id);
  const accessToken = user.generateAccessToken();

  user.accessToken = accessToken;
  await user.save({validationBeforeSave: false});
  return accessToken;
}

const registerUser = asyncHandler(async(req, res)=> {
    const {name, dateOfBirth, email, phoneNo} = req.body;

    if (
        [name, email].some((field) => field?.trim() == "")
      ) {
        throw new ApiError(400, "All filds are compulsory");
      }

    
      if(phoneNo.length !== 10) {
        throw new ApiError(402, "Enter valid phone number");

        
      }

    const existedUser = await User.findOne({
        $or: [{email}, {name}]
    });

    if(existedUser) {
        throw new ApiError(404,"user exit email or username");
    }


    const user = await User.create({
        name,
        dateOfBirth,
        email,
        phoneNo
    })

    const createdUser = await User.findById(user._id);

    if(!createdUser) {
        throw new Error("Something wrong user not found!")
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    const accessToken = await GenerateAccessToken(user._id)
    return res.status(200).cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, [createdUser, accessToken], 'User created successfully!'))

});

const getUserData = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
      throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export { registerUser ,getUserData}