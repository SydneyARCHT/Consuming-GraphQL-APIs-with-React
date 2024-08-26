import { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../mutations/Mutations'; 

const DeletePostForm = () => {
  const [postId, setPostId] = useState<string>("");

  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    deletePost({
      variables: {
        id: postId,
      },
    });
  };

  return (
    <div className="delete-post-form">
      <h1>Delete Post</h1>

      {loading && <div className="spinner">Loading...</div>}

      {error && (
        <div className="error">
          <h4>Error!</h4>
          <p>{error.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="postId">Post ID</label>
          <input
            id="postId"
            type="text"
            placeholder="Enter post ID"
            value={postId}
            onChange={(event) => setPostId(event.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <button type="submit">Delete</button>
      </form>

      {data && (
        <div className="success">
          <h2>Post Deleted Successfully!</h2>
          <p><strong>ID:</strong> {data.deletePost.id}</p>
        </div>
      )}
    </div>
  );
};

export default DeletePostForm;