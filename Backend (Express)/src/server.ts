import express from 'express';
import dotenv from 'dotenv';
import userSignupRoutes from './routes/usersignup.js'; // Keep the signup route for registration
import { connectDB } from './config/db.js';
import { enableCors } from './Middleware/corsMiddleware.js';
import loginRoute from './routes/auth.js';
import postRoutes from './routes/Posts.js';
import commentRoutes from './routes/Comments.js';

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware for handling errors
app.use((err : any, req :any, res : any, next : any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Use CORS middleware
app.use(enableCors);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Your frontend URL
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes for user registration and login
app.use('/api/auth', loginRoute); // Login route
app.use('/api/signup', userSignupRoutes); 

// Routes for blog posts and comments
app.use('/api/posts', postRoutes); // Blog post routes
app.use('/api/comments', commentRoutes); // Comment routes

// Basic route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
