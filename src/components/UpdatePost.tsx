import { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../mutations/Mutations'; 

const UpdatePostForm = () => {
  const [postId, setPostId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    updatePost({
      variables: {
        id: postId,
        title: title,
        body: body,
      },
    });
  };

  return (
    <div className="update-post-form">
      <h1>Update Post</h1>

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

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            rows={3}
            placeholder="Enter body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <button type="submit">Update Post</button>
      </form>

      {data && (
        <div className="success">
          <h2>Post Updated Successfully!</h2>
          <p><strong>Title:</strong> {data.updatePost.title}</p>
          <p><strong>Body:</strong> {data.updatePost.body}</p>
          <p><strong>ID:</strong> {data.updatePost.id}</p>
        </div>
      )}
    </div>
  );
};

export default UpdatePostForm;


