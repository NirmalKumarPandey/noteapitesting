const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;



const signUp = async (req, res) => {

    // Existing User Check
    // Hashed Password
    // User Creation
    // token Creation

    const { userName, password, email } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            userName: userName
        });
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });



    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something Went Wrong" });

    }


};
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User Does not exist" });
        }
        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchedPassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(200).json({ user: existingUser, token: token });



    }
    catch (err) {
        res.status(500).json({ message: "Wrong Email and Password" });
    }


};
module.exports = { signIn, signUp };