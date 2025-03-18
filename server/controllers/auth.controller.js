const { User } = require('../models/user.model');
const bcrypt = require('bcryptjs');
const Crypto = require('crypto');
const { GenerateVerificationToken } = require('../utilities/generateVerificationToken');
const { GenerateTokenAndSetCookie } = require('../utilities/generateTokenAndSetCookie'); 
const { SendVerificationEmail, SendWelcomeEmail, SendForgetPassword, SendResetPasswordSuccess } = require('../mailing/emails')

 
const SignUp = async (req, res) =>{
    const { email, password, name } = req.body;
    try 
    { 
        if(!email || !password || !name){
            throw new Error("All fields are required!");
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({success : false, message : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const verificationToken = GenerateVerificationToken();

        const user = new User (
            {
            email, 
            password: hashedPassword, 
            name, 
            verificationToken, 
            verificationExpiresAt : Date.now() + 24 * 60 * 60 * 1000
            }
        );
        await user.save();

        const token = GenerateTokenAndSetCookie(res, user._id);
        console.log("Token set in cookie:", token);

        await SendVerificationEmail(user.email, verificationToken);

        res.status(201).json({success: true, message: "User is created successfully", user: {...user._doc, password: undefined}});
    } 
    catch (error) 
    {
        return res.status(400).json({success : false, message : error.message});
    }
};

const VerifyEmail = async (req, res) =>{ 
    const { verificationCode } = req.body;
    try {
        const user = await User.findOne( {verificationToken : verificationCode, verificationExpiresAt : {$gt: Date.now()} } );
        if(!user){
            return res.status(400).json({success : false, message : "Invalid or expired verification token"});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiresAt = undefined;
        await user.save(); 
        await SendWelcomeEmail(user.email, user.name);
        res.status(200).json({success: true, message: "Email was verified successfully", user: {...user._doc, password: undefined}});
    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    } 
};

const SignIn = async (req, res) =>{ 
    const {email, password} = req.body; 
    try { 
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({success : false, message : "User was not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(404).json({success : false, message : "User password is incorrect"});
        }
        GenerateTokenAndSetCookie(res, user._id);

        user.lastLogin = Date.now();
        user.save();

        res.status(200).json({success: true, message: "User is logged in successfully", user: {...user._doc, password: undefined}});
    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    } 
};

const ForgetPassword = async (req, res) =>{
    const { email } = req.body; 
    console.log(email);
    try { 
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({success : false, message : "User was not found"});
        } 
        const resetToken = Crypto.randomBytes(20).toString("hex");
        const resetTokenExpiration = Date.now() + 1 * 24 * 24 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiration;
        user.save();

        await SendForgetPassword(user.email,`${process.env.CLIENT_ADDRESS}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "Please check your email"});
    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    } 
};

const ResetPassword = async (req, res) =>{ 
    const { token } = req.params; 
    const { password } = req.body; 
    try { 
        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpiresAt : {$gt: Date.now()}});
        if(!user){
            return res.status(404).json({success : false, message : "Invalid or expired token"});
        }  
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        user.save(); 
        await SendResetPasswordSuccess(user.email);

        res.status(200).json({success: true, message: "Password was reset successfully"});
    } catch (error) {
        return res.status(400).json({success : false, message : error.message});
    } 
};

const LogOut = async (req, res) =>{ 
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
};

const CheckAuth = async (req, res) =>{    
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({success : false, message : "User was not found"});
        }
        res.status(200).json({success: true, message: "User is authenticated"});
    } catch (error) {
        return res.status(400).json({success : false, message : error.message, user: {...user._doc, password: undefined}});
    }
};
 
module.exports = { SignUp, SignIn, VerifyEmail,ForgetPassword, ResetPassword, LogOut, CheckAuth };