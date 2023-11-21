import { app, database } from '../../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/router';



export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const postsCollection = collection(database, 'blog posts');

  const createData = () => {

    const newPost = {
      title: title,
      content: content,
      
    };

    addDoc(postsCollection, newPost)
      .then(() => {
        setSuccessMessage('Post created successfully!');
        setErrorMessage('');
        setTitle('');
        setContent('');
        setTimeout(() => {
          setSuccessMessage('');
          router.push('/');
        }, 2000); 
      })
      .catch(() => {
        setErrorMessage('Failed to create post. Please try again.');
        setSuccessMessage('');
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    if (title.length < 5 || title.length > 60 || content.length < 40) {
      if (title.length > 30) {
        setErrorMessage('Title should not exceed 20 characters.');
      } else {
        setErrorMessage('Title should be at least 5 characters long, and content should be at least 40 characters long.');
      }
      return;
    } else {
      setErrorMessage('');
      createData();
    }
  };
  

  
  return (
   <form onSubmit={handleFormSubmit}>
    <div className="create">
      <h1>Create a blog post</h1>
      <div className="title">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="content">
        <label>Content</label>
        <textarea
          placeholder="Enter content"
          rows="10"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
      </div>
      <button type='submit'>Create</button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
   </form> 
  );
}

