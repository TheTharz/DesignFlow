import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import PostDetails from '../components/PostDetails';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
const SearchResultPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { search } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState('');

  useEffect(() => {
    console.log(search);
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `/api/posts/search/post/search?keywords=${search}`
        );
        setPost(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        if (error.response.status === 401) {
          navigate('/signin');
        }
      }
    };

    fetchSearchResults();
  }, [search]);
  console.log(post);
  const viewDetails = (postItem) => {
    console.log(postItem);
    setSelectedPost(postItem._id);
  };

  const handleLike = async (postItem) => {
    try {
      const res = await axios.put('api/posts/like/' + postItem._id);
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.code === 401) {
        navigate('/signin');
      }
    }
  };
  // const handleUnlike = async (postItem) => {
  //   try {
  //     const res = await axios.put('api/posts/unlike/' + postItem._id);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //     if (error.code === 401) {
  //       navigate('/signin');
  //     }
  //   }
  // };

  const isLiked = (postItem) => {
    return postItem.likes.includes(user._id);
  };

  return (
    <div className='w-full h-full'>
      <NavBar />
      <div className='mx-8 pt-8'>
        <h1 className='text-[32px] font-medium'>Results for '{search}'</h1>
        <div className='border-t border-black mt-2 w-full'></div>
      </div>
      {loading ? (
        <div className='w-full h-[300px] items-center justify-center'>
          <div class='flex flex-row gap-2 justify-center'>
            <div class='w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]'></div>
            <div class='w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]'></div>
            <div class='w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]'></div>
          </div>
        </div>
      ) : (
        <div className='mt-8 grid grid-cols-4 justify-center animate-fade animate-once'>
          {Array.isArray(post) && post.length > 0 ? (
            post.map((postItem) => (
              <div
                key={postItem._id}
                className='p-2 m-2 cursor-pointer hover:scale-105 transform transition'
              >
                {postItem.postImage && (
                  <img
                    src={postItem.postImage}
                    alt='post'
                    className='w-80 h-60 object-cover rounded-md'
                    onClick={() => viewDetails(postItem)}
                  />
                )}
                <div className='flex flex-row justify-between p-4'>
                  <h3 className='text-[16px] font-medium'>{postItem.title}</h3>
                  <div>
                    <p className='mr-8'>{postItem.likes.length}</p>
                    {isLiked(postItem) ? (
                      <AiFillHeart
                        size={30}
                        onClick={() => handleLike(postItem)}
                        className='inline-block cursor-pointer hover:scale-105'
                        style={{ transition: 'transform 0.3s' }}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        onClick={() => handleLike(postItem)}
                        className='inline-block cursor-pointer hover:scale-105'
                        style={{ transition: 'transform 0.3s' }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
      {selectedPost && <PostDetails postId={selectedPost} />}
      <Footer />
    </div>
  );
};

export default SearchResultPage;
