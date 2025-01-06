import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import asyncHandler from "../helpers/asyncHandler";

const handleLogin = asyncHandler (async (req: Request, res: Response, next:NextFunction) => {
  await Promise.all([
    check('email')
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail()
      .run(req),

    check('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isStrongPassword()
      .withMessage(
        "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .run(req),
  ]);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  if (email === 'nishant123@gmail.com' && password === 'Asdg@123') {
    try {
      const token = jwt.sign(
        { user_type: 'admin' },
        'secret_key', 
        { expiresIn: '1hr' }
      );
      return res.status(200).json({ msg: 'Login Successful', JwtToken: token });
    } catch (error) {
      console.error('JWT Generation Error:', error);  
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
  
  return res.status(401).json({ msg: 'Invalid credentials' });
  
});

export { handleLogin };
