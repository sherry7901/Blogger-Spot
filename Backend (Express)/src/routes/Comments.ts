import express from 'express';
import Post from '../models/Post.js'; // Import Post model
import Comment from '../models/comments.js'; // Ensure correct path to Comment model

const router = express.Router();

// Add a comment
router.post('/:postId/comments', async (req : any, res : any) => {
    const { text } = req.body; // Get the comment text from the request body
    const { postId } = req.params; // Get the post ID from the request parameters

    // Check if text and postId are provided
    if (!text || !postId) {
        return res.status(400).json({ message: 'Text and postId are required' });
    }

    try {
        // Create a new comment instance
        const newComment = new Comment({ postId, text });
        await newComment.save(); // Save the comment to the database

        // Update the corresponding post to include the new comment's ID
        await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

        // Return the newly created comment as a response
        res.status(201).json(newComment); 
    } catch (error) {
        console.error('Error adding comment:', error); // Log error to the console
        res.status(500).json({ message: 'Error adding comment', error }); // Return an error response
    }
});

// Edit a comment
router.put('/:postId/comments/:commentId', async (req, res) => {
    const { postId, commentId } = req.params; // Get the post ID and comment ID from the request parameters
    const { text } = req.body; // Get the updated comment text from the request body

    try {
        // Update the comment with the new text
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });
        res.status(200).json(updatedComment); // Return the updated comment
    } catch (error) {
        console.error('Error editing comment:', error); // Log error to the console
        res.status(500).json({ message: 'Error editing comment', error }); // Return an error response
    }
});

// Delete a comment
router.delete('/:postId/comments/:commentId', async (req, res) => {
    const { postId, commentId } = req.params; // Get the post ID and comment ID from the request parameters

    try {
        // Delete the comment from the database
        await Comment.findByIdAndDelete(commentId);

        // Optionally, you can remove the comment ID from the post as well
        await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

        res.status(200).json({ message: 'Comment deleted' }); // Return a success message
    } catch (error) {
        console.error('Error deleting comment:', error); // Log error to the console
        res.status(500).json({ message: 'Error deleting comment', error }); // Return an error response
    }
});

// Get comments for a post
router.get('/:postId/comments', async (req, res) => {
    const { postId } = req.params; // Get the post ID from the request parameters

    try {
        // Fetch comments for the given post ID
        const comments = await Comment.find({ postId });
        res.status(200).json(comments || []); // Return the comments array or an empty array
    } catch (error) {
        console.error('Error fetching comments:', error); // Log error to the console
        res.status(500).json({ message: 'Error fetching comments', error }); // Return an error response
    }
});

export default router;
