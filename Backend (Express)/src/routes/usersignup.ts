import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from '../models/Signup.js';

const router = express.Router();

// POST: User Registration
router.post('/', async (req: any, res: any) => {
  const { name, email, password, phonenumber } = req.body;

  // Log incoming registration data
  console.log('Incoming Registration Data:', { name, email, password, phonenumber });

  // Validate incoming data
  if (!name || !email || !password || !phonenumber) {
    console.log('Registration Error: All fields are required');
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log('Registration Error: User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    // Create a new user instance
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      phonenumber,
    });

    // Save the new user to the database
    await newUser.save();
    console.log('User registered successfully:', newUser);

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    // Ensure error is typed correctly
    if (error instanceof Error) {
      // Return a 500 server error
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      // Handle any other error type
      res.status(500).json({ message: 'Server error', error: 'Unknown error occurred' });
    }
  }
});

export default router;
