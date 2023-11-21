import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../../../../firebaseConfig';
import CommentSection from '../../../components/commentSection'; // Import the CommentSection component

export default function Index() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);

  const fetchPost = async (postId) => {
    try {
      const postRef = doc(database, 'blog posts', postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const postData = { id: postSnapshot.id, ...postSnapshot.data() };
        setPost(postData);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  if (!post) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <div className="container">
      <div className='post-card'>
        <h2 className='postTitle'>Blog Title: {post.title}</h2>
        <p className='postContent'>{post.content}</p>
      </div> 
      {/* Render the CommentSection component */}
      {postId && <CommentSection postId={postId} />}
    </div>
  );
}
