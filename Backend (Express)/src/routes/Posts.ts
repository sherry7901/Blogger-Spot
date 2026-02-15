import express from 'express';
import Post from '../models/Post.js'; // Adjust the path according to your project structure

const router = express.Router();

// POST route to create a new post
router.post('/', async (req: any, res: any) => {
    try {
        const { title, description } = req.body;

        // Check if title and description are provided
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const newPost = new Post({ title, description });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post', error });
    }
});

// GET route to fetch all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('comments'); // Populate comments
        res.status(200).json(posts); // Send the posts array as a JSON response
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});


export default router;
