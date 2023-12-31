import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js"



// ========== USER REGISTRATION ==========
export const register = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            email,
            password,
            picturePath,
            location,
            about,
            friends,
            posts
        } = req.body;

        // PASSWORD ENCRYPTION 
        const salt = await bcrypt.genSalt();
        const passwordHarsh = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            middleName,
            lastName,
            email,
            password: passwordHarsh,
            picturePath,
            location,
            about,
            friends,
            posts
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // 201: Created success status response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// ========== LOGIN ==========
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User doesn't exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "The user name and/or password are incorrect"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}