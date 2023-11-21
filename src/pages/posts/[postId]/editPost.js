import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  collection,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { database } from '../../../../firebaseConfig';

const EditPost = () => {
  const router = useRouter();
  const { postId } = router.query; // Using postId directly

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(database, 'blog posts', postId);
        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          setTitle(postData.title);
          setContent(postData.content);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const updatePost = async () => {
    try {
      const postRef = doc(database, 'blog posts', postId);

      await updateDoc(postRef, {
        title: title,
        content: content,
      });

      setSuccessMessage('Post successfully updated!');
      setError(''); // Clear any existing error message
      setTimeout(() => {
        router.push('/'); // Navigate to the home page after 3 seconds
      }, 3000);
    } catch (error) {
      setError('Error updating document. Please try again.');
      setSuccessMessage(''); // Clear any existing success message
    }
  };


  return (
    <div className='create'>
      <h1>Edit Post</h1>
      <div className='title'>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='content'>
        <label>Content</label>
        <textarea
          value={content}
          rows="7"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button onClick={updatePost}>Save</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default EditPost;
