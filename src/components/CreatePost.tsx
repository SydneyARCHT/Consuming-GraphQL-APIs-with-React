import { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../mutations/Mutations'; 

const CreatePostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    createPost({
      variables: {
        title: title,
        body: body,
      },
    });
  };

  return (
    <div className="create-post-form">
      <h1>Create Post</h1>

      {loading && <div className="spinner">Loading...</div>}

      {error && (
        <div className="error">
          <h4>Error!</h4>
          <p>{error.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Submit</button>
      </form>

      {data && (
        <div className="success">
          <h2>Post Created Successfully!</h2>
          <p><strong>Title:</strong> {data.createPost.title}</p>
          <p><strong>Body:</strong> {data.createPost.body}</p>
          <p><strong>ID:</strong> {data.createPost.id}</p>
        </div>
      )}
    </div>
  );
};

export default CreatePostForm;


