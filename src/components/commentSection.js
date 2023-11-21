// CommentSection.js

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCollection = collection(database, `blog posts/${postId}/comments`);
        const querySnapshot = await getDocs(commentsCollection);
        const fetchedComments = [];

        querySnapshot.forEach((doc) => {
          fetchedComments.push({ id: doc.id, ...doc.data() });
        });

        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const commentsCollection = collection(database, `blog posts/${postId}/comments`);
      const newCommentRef = await addDoc(commentsCollection, { text: newComment });

      setComments([...comments, { id: newCommentRef.id, text: newComment }]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comments-section">
        <div className="comments-section">
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
          </div>
        ))
      )}
    </div>
      <form onSubmit={addComment}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button style={{  marginTop: '10px' }} type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
