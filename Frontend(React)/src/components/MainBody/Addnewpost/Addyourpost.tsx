import { useEffect, useState } from "react";
import "./Addyourpost.css";
import CreatenewpostModal from "../../Modal/CreateNewPostModal";
import Comments from "../../commentsection/Comments"; // Ensure this import is correct
import Dashboard from "../../Dashboard/Dashbord";
import axios from "axios";

interface Post {
  _id: string; // Post ID
  title: string;
  description: string;
  comments: string[];
  likes: number;
}

const Addyourpost = () => {
  const [isCreateNewPostModal, setIsCreateNewPostModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>("http://localhost:5000/api/posts");
      setPosts(response.data); // Set posts data
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreatePost = () => {
    setEditingIndex(null);
    setEditingPost(null);
    setIsCreateNewPostModal(true);
  };

  const handleAddPost = async (title: string, description: string) => {
    if (editingIndex !== null) {
      // Update existing post
      const updatedPosts = [...posts];
      updatedPosts[editingIndex] = { ...updatedPosts[editingIndex], title, description };
      setPosts(updatedPosts);

      try {
        await axios.put(`http://localhost:5000/api/posts/${posts[editingIndex]._id}`, { title, description });
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      // Create new post
      const newPost = { title, description, comments: [], likes: 0 };
      try {
        const response = await axios.post<Post>("http://localhost:5000/api/posts", newPost);
        setPosts([...posts, { ...newPost, _id: response.data._id }]); // Add the new post
        alert('Your Blog has been successfully posted');
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
    setIsCreateNewPostModal(false);
  };

  const handleEditPost = (index: number) => {
    setEditingIndex(index);
    setEditingPost(posts[index]);
    setIsCreateNewPostModal(true);
  };

  const handleDeletePost = async (index: number) => {
    const postId = posts[index]._id; // Get post ID to delete
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`); // Delete from backend
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Updated AddComment function to accept postId as a string
  const AddComment = async (postId: string, comment: string) => {
    const updatedPosts = posts.map(post => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(updatedPosts);

    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, { comment }); // Send comment to backend
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (postId: string, commentIndex: number) => {
    const updatedPosts = posts.map(post => {
      if (post._id === postId) {
        return { ...post, comments: post.comments.filter((_, i) => i !== commentIndex) };
      }
      return post;
    });
    setPosts(updatedPosts);

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}/comments`, { data: { commentIndex } }); // Delete comment from backend
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const EditComment = async (postId: string, commentIndex: number, comment: string) => {
    const updatedPosts = posts.map(post => {
      if (post._id === postId) {
        const updatedComments = [...post.comments];
        updatedComments[commentIndex] = comment;
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);

    try {
      await axios.put(`http://localhost:5000/api/posts/${postId}/comments`, { comment }); // Update comment in backend
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleLikePost = async (index: number) => {
    const postId = posts[index]._id; // Get post ID
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);

    try {
      await axios.put(`http://localhost:5000/api/posts/${postId}/like`); // Send like to backend
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="Section">
      <Dashboard />
      <div className="box">
        <h1 className="Heading">Create a blog worth sharing</h1>
        <p className="Para">Welcome to BloogerSpot. The home for those wanting to start a blog, create great content and grow their blogs and then go professional to make money blogging.</p>
        <div className="button">
          <button onClick={handleCreatePost} className="create-post-button">Create Blog</button>
        </div>
      </div>

      {isCreateNewPostModal && (
        <CreatenewpostModal
          isCreateNewPostModal={isCreateNewPostModal}
          setIsCreateNewPostModal={setIsCreateNewPostModal}
          handleAddPost={handleAddPost}
          editingPost={editingPost}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mx-auto w-full max-w-screen-lg">
        {posts.map((post) => (
          <div key={post._id} className="post"> {/* Use post._id as the key */}
            <div className="title-section">
              <h3 className="title">{post.title}</h3>
              <div className="icon-container">
                <button onClick={() => handleEditPost(posts.findIndex(p => p._id === post._id))} className="edit-button">
                  {<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 2.121 2.121-12.75 12.75H4.5v-2.613L16.862 4.487z" />
                  </svg>}
                </button>
                <button onClick={() => handleDeletePost(posts.findIndex(p => p._id === post._id))} className="delete-button">
                  {<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>}
                </button>
              </div>
            </div>
            <p className="description">{post.description}</p>
            <br />
            <br />
        
          
            <p className="likes">Liked by {post.likes} peoples</p>
            <button className="like-button" onClick={() => handleLikePost(posts.findIndex(p => p._id === post._id))}>Like</button>
            <Comments 
              postId={post._id} // Pass postId here
              comments={post.comments} 
              AddComment={AddComment} 
              deleteComment={deleteComment} 
              EditComment={EditComment} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addyourpost;
