import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { getProfilePic } from "../utils/getProfilePic.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }

    const profilePicture = getProfilePic(gender, username);

    //Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePicture,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
export const login = (req, res) => {
  res.send("Login route");
};
export const logout = (req, res) => {
  res.send("logout route");
};
