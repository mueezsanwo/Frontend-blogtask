import Head from "next/head";
import { app, database } from "../../firebaseConfig";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsMessage, setSearchResultsMessage] = useState('');
  const [showAllPosts, setShowAllPosts] = useState(false); // State to manage showing all posts
  const [filteredPosts, setFilteredPosts] = useState([]); // State to manage filtered posts

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(database, 'blog posts');
      const querySnapshot = await getDocs(postsCollection);
      const fetchedPosts = [];

      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });

      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts.slice(0, 2)); // Initialize filtered posts with the first two posts
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(database, 'blog posts', postId));
      // Update posts after deletion (optional)
      setPosts(posts.filter((post) => post.id !== postId));
      setFilteredPosts(filteredPosts.filter((post) => post.id !== postId)); // Remove deleted post from filtered posts
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const truncateContent = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'; // Truncate content and add ellipsis
    }
    return text;
  };

  const handleShowAllPosts = () => {
    setShowAllPosts(true); // Set the state to show all posts
    setFilteredPosts(posts); // Update filtered posts to show all posts
  };

  const handleSearch = () => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered); // Update filtered posts based on search query
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(showAllPosts ? posts : []);
      setSearchResultsMessage('');
    } else {
      handleSearch();
      setSearchResultsMessage(filteredPosts.length === 0 ? `No blog posts found with "${searchQuery}"` : '');
    }
  }, [searchQuery, showAllPosts]); // Trigger search logic whenever searchQuery or showAllPosts changes

  return (
    <div className="container">
       <Head>
        <title>My Blog</title>
        <meta name="description" content="My Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="header">
        <button className="view-toggle-btn" onClick={() => setViewMode(!viewMode)}>
          {viewMode ? 'grid' : 'list'}
        </button>
        <button className="show-all-btn" onClick={handleShowAllPosts}>
          Posts
        </button>
        <Link href="/createPost" style={{ textDecoration: 'none' }}>
          <button className="create-post-btn">Create Post</button>
        </Link>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* Displaying search results message or empty blog message */}
      {searchResultsMessage && <h2 className="empty">{searchResultsMessage}</h2>}
      <div className={viewMode ? 'post-list' : 'post-card-grid'}>
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{truncateContent(post.content, 40)}</p>
            <Link className="read-more-link" style={{ textDecoration: 'none' }} href={`/posts/${post.id}`} passHref>
              Read More
            </Link>
            <div className="post-actions">
              <Link style={{ textDecoration: 'none' }} href={`/posts/${post.id}/editPost`} passHref>
                <button className="edit-btn">Edit</button>
              </Link>
              <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
