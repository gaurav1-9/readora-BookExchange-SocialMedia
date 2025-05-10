import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import PostCard from '../components/PostCard'; // create this component to show individual posts
import NoPost from '../components/NoPost';

const Feed = () => {
  const { user } = useAuth();
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchFeed = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${user._id}/timeline`);
        setFeedPosts(res.data.msg);
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
      {/* Section 1: Create Post */}
      <div className="p-4 border rounded-lg shadow-sm bg-white mb-5">
        <p className="text-gray-600">Create post section (coming soon...)</p>
      </div>

      {/* Section 2: Feed */}
      <div>
        {
          loading ? (
            <p>Loading feed...</p>
          ) : feedPosts.length === 0 ? (
            <NoPost/>
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
