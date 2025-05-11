import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import PostCard from '../components/PostCard'; // create this component to show individual posts
import NoPost from '../components/NoPost';
import CreatePost from '../components/CreatePost';
import { ToastContainer, toast } from 'react-toastify';

const Feed = () => {
  const { user } = useAuth();
  const [feedPosts, setFeedPosts] = useState([]);
  const [caption, setCaption] = useState('')
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true);
  const [postUploading, setPostUploading] = useState(false)

  const successPost = () => toast("Post has been uploaded to your account!",
    {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })

  const uploadPost = async (e) => {
    e.preventDefault()
    const postUploadData = {
      userId: user._id,
      caption: caption,
      tags: tags,
    }
    setTags('')
    setCaption('')
    setPostUploading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/posts/upload', postUploadData, { withCredentials: true })
      if (!res.data?.err) successPost()
      setPostUploading(false)
    } catch {
      setPostUploading(false)
    }
  }

  useEffect(() => {
    if (!user?._id) return;

    const fetchFeed = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${user._id}/timeline`);
        const posts = res.data.msg;

        const userIds = [...new Set(posts.map(p => p.userId))];
        const userDetailsRes = await axios.get(
          `http://localhost:5000/api/users/details/following`,
          { params: { ids: userIds.join(',') } }
        );

        const userMap = {};
        userDetailsRes.data.forEach(u => {
          userMap[u._id] = u.username;
        });

        const enrichedPosts = posts.map(post => ({
          ...post,
          username: userMap[post.userId] || 'Unknown'
        }));

        setFeedPosts(enrichedPosts);
      } catch (err) {
        console.error("Failed to load feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [user]);


  return (
    <div className="p-4 mt-10">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <CreatePost caption={caption} setCaption={setCaption} tags={tags} setTags={setTags} onUpload={uploadPost} isUploading={postUploading} />

      <div className='mt-5'>
        {
          loading ? (
            <p>Loading feed...</p>
          ) : feedPosts.length === 0 ? (
            <NoPost />
          ) : (
            feedPosts.map((post, idx) => (
              <>
                <PostCard key={post._id} post={post} />
                {
                  idx < feedPosts.length - 1
                    ? <div className='w-full h-0.5 rounded-2xl bg-gunMetal/60 mt-2 mb-5'></div>
                    : <div className='mb-5'></div>
                }
              </>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Feed;
