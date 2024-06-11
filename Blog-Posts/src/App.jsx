import React, { useState, useEffect } from 'react';
import "./App.css"
import images from './images/error-message.png'

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Data fetcing Failed');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      {error ? (
        <div className="error-message">
          <img src={images} alt="" />
        </div>
      ) : (
        <div className="post-list">
          {posts.map(post => (
            <div key={post.id} className="post">
              <h2>{post.id}. {post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

