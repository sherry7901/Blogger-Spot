import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comment IDs
    likes: { type: Number, default: 0 }
});

const Post = mongoose.model('Post', postSchema);
export default Post;
