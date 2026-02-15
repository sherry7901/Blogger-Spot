import express from 'express';
import bcrypt from 'bcryptjs';
import UserModel from '../models/Signup.js';

const router = express.Router();

// POST: Sign-in
router.post('/signin', async (req: any, res: any) => {
  const { email, password } = req.body;

  // Log incoming sign-in data
  console.log('Incoming Sign-In Data:', { email, password });

  try {
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      console.log('Sign-In Error: User not found:', email);
      return res.status(400).json({ message: 'You are not registered with Blogger Spot' });
    }

    // Ensure user.password is defined before checking
    if (!user.password) {
      console.log('Sign-In Error: Password not set for user:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Sign-In Error: Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('Sign-In Successful:', user);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
