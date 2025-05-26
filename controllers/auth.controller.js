import User from "../models/user.model.js";
import successRes from "../lib/success.res.js";
import ErrorResponse from "../lib/error.res.js";
import bcrypt from 'bcryptjs';
import { generateNewSession } from "../service/common.service.js";

const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)  next(ErrorResponse.badRequest('Invalid credentials' ));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) next(ErrorResponse.badRequest('Invalid credentials' ));

    // Generate token
    const token = generateNewSession(
      { id: user._id, role: user.role, email: user.email },
      '1d' 
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    const resObj= {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
      };
    successRes.ok(res,"user logedin Successfully",resObj);

  } catch (err) {
    next(ErrorResponse.internalServer(err.message));
  }
};
const signup = async (req, res,next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    next(ErrorResponse.badRequest('User already exists with this email' ));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await user.save();
    successRes.ok(res,"user Registered Successfully",user);

  } catch (err) {
    next(ErrorResponse.internalServer(err.message));
  }
};

export {login,signup}