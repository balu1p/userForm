import { User } from "../models/user.model.js"

const registerUser = async(req, res) => {
    const {name, dateOfBirth, email, phoneNo} = req.body

    // if(!name==''||!dateOfBirth==''||!email==''||phoneNo=='')  {
    //     throw new Error("all fields required!")
    // };

    const existedUser = await User.findOne({
        $or: [{email}, {name}]
    });

    // if(existedUser) {
    //     throw new Error("User with email or username is exited")
    // }

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

    return res.status(200).json(createdUser)
}

export { registerUser }