import { useState } from 'react';
import { getSinglePost } from './api';
import './Lesson07Styles.css';

export default function FetchOnClick() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const data = await getSinglePost(1);
      setPost(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={handleClick} disabled={loading}>
        Get post
      </button>
      <div className="content">
        {loading && <p>Loading post...</p>}
        {error && <p>Something went wrong: {error.message}</p>}
        {!loading && !error && post && (
          <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </>
        )}
        {!loading && !error && !post && (
          <p>
            Click the <code>Get post</code> button to load a post.
          </p>
        )}
      </div>
    </div>
  );
}
