import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utility/generateToken.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({ message: "Missing required fields" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const genSalt = 10;
    const hasedPassword = await bcrypt.hash(password, genSalt);
    const user = new UserModel({
      name,
      email,
      password: hasedPassword,
    });
    await user.save();
    return res
      .status(201)
      .json({ message: "Registered Successfully", data: user, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "Missing required fields" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not available please register" });
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const user = await UserModel.findOne({ email });
    const token = generateToken(user._id);
    // console.log(token);
    return res.status(200).json({
      message: "Login Successfully",
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const existingUser = await UserModel.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ message: "User's data not available" });
    }
    return res.status(200).json({
      message: "User details fetched successfully",
      data: existingUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { register, login, getUser };
