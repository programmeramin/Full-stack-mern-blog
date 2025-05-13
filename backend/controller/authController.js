import errorHandler from '../middleware/errorHandler.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';
import { fileUploadToCloud } from '../utils/CloudInary.js';

/**
 * @description User Registration
 * @access Public
 * @route api/v1/auth/registration
 * @method POST
 */
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const verificationToken = crypto.randomBytes(32).toString('hex');

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    verificationToken,
    isVerified: false,
  });

  try {
    await newUser.save();

    const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Set JWT in cookie
    res.cookie('auth_token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only true for production with HTTPS
      sameSite: 'Strict',
      expires: new Date(Date.now() + 3600000), // 1 hour expiration
    });

    const verifyLink = `http://localhost:5173/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: email,
      subject: 'Verify your account',
      html: `<p>Click the link below to verify your account:</p><a href="${verifyLink}">Verify Email</a>`,
    });

    return res.status(201).json({
      message: 'User created. Please check your email to verify your account.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description User login
 * @access public
 * @route api/auth/login
 * @method POST
 */

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  // check if user exists

  try {
    const validUser = await User.findOne({ email });
    console.log(validUser);
    if (!validUser) {
      return next(errorHandler(400, 'User not found'));
    }


    // Check if user has verified their email
    if (!validUser.isVerified) {
      return next(errorHandler(401, 'Please verify your email first.'));
    }

    const validPass = bcrypt.compareSync(password, validUser.password);

    if (!validPass) {
      return next(errorHandler(400, 'Invalid Password'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const { password: pass, ...rest } = validUser._doc;

    res.status(200).json({ user: rest, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Email Verification
 * @access Public
 * @route GET /api/v1/auth/verify-email?token=xxx
 */
export const verifyEmail = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return next(errorHandler(400, 'Invalid or missing verification token.'));
  }

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return next(errorHandler(400, 'Invalid verification token.'));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res
      .status(200)
      .json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    next(error);
  }
};


/**
 * @description profile photo change
 * @method POST
 * @route /api/v1/auth/profile-photo-update
 * @access private
 */

export const profilePhotoUpdate = async(req, res) =>{

    const {email} = req.body;
    
  //console.log(req.file);
 const fileData =  await fileUploadToCloud(req.file.path);

 // console.log(req.cookies.accessToken);
  const data  = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);

 const profileData = await User.findOne({email}); 
 console.log(profileData);
 

//  console.log(profileData); 
  profileData.profilePicture  =  fileData.secure_url;
  profileData.save();

 res.status(200).json({user : profileData, message : "Profile photo updated success"});

};



// logout
export const logout = async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logout successful" });
};   
