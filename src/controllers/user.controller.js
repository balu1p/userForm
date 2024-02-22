import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req, res)=> {
    const {name, dateOfBirth, email, phoneNo} = req.body;

    if (
        [name, email, dateOfBirth].some((field) => field?.trim() == "")
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

    return res.status(200).json(new ApiResponse(200, createdUser, 'User created successfully!'))

}) 

export { registerUser }