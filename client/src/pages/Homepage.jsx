import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import PostDetails from '../components/PostDetails';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import toast, { Toaster } from 'react-hot-toast';

const Homepage = () => {
  const { user } = useContext(UserContext);
  console.log('Homepage user:', user);
  const [selectedPost, setSelectedPost] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const categories = [
    'All',
    'Art',
    'Vector',
    'Design',
    'Digital',
    'Illustration',
    'Photography',
    'Typography',
    'website',
    'UI/UX',
  ];
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/posts/allposts')
      .then((response) => {
        setFilteredPosts(response.data.posts);
        setPost(response.data.posts);
        //console.log(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          duration: 2000,
          position: 'top-right',
        });
      });
  }, []);

  const viewDetails = (postItem) => {
    if (user) {
      console.log(postItem);
      setSelectedPost(postItem._id);
    } else {
      navigate('/signin');
    }
  };

  const handleLike = async (postItem) => {
    try {
      const res = await axios.put('api/posts/like/' + postItem._id);
      const updatedPost = res.data.post;
      console.log(res);
      setFilteredPosts((prevPosts) =>
        prevPosts.map((prevPost) =>
          prevPost._id === postItem._id ? updatedPost : prevPost
        )
      );
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        navigate('/signin');
      }
    }
  };

  const isLiked = (postItem) => {
    if (user) {
      return postItem.likes.includes(user._id);
    } else {
      return false;
    }
  };

  const [filteredPosts, setFilteredPosts] = useState(post);

  const handleCategoryClick = (category) => {
    // Filter posts based on the selected category
    if (category === 'All') {
      setFilteredPosts(post);
    } else {
      setFilteredPosts(post);
      const filtered = post.filter(
        (postItem) => postItem.category === category
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className='font-Poppins flex flex-col justify-center items-center'>
      <NavBar />
      <Hero />
      <div className='flex justify-center mt-4'>
        {categories.map((category) => (
          <button
            key={category}
            className='bg-gray-200 text-black px-4 py-2 mx-2 rounded-full'
            onClick={() => {
              console.log('Category button clicked:', category);
              handleCategoryClick(category);
            }}
          >
            {category}
          </button>
        ))}
      </div>
      {loading ? (
        <div className='w-full h-[300px] flex items-center justify-center gap-2'>
          <p className='text-3xl font-medium'>
            <span className='text-black'>Loading</span> posts
          </p>
          <div class='flex flex-row gap-2 justify-center items-center'>
            <div class='w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:.7s]'></div>
            <div class='w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:.3s]'></div>
            <div class='w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:.7s]'></div>
          </div>
        </div>
      ) : (
        <div className='mt-8 grid grid-cols-4 justify-center animate-fade animate-once'>
          {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
            filteredPosts.map((postItem) => (
              <div
                key={postItem._id}
                className='p-2 m-2 cursor-pointer transform transition hover:scale-105'
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
                  <div className='flex flex-row gap-1'>
                    <p className='px-2'>{postItem.likes.length}</p>
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
            <div className='flex flex-row items-center justify-center h-[300px]'>
              <h1 className='font-medium text-3xl'>No posts available</h1>
            </div>
          )}
        </div>
      )}
      {selectedPost && <PostDetails postId={selectedPost} />}
      {/* <div className='flex justify-center items-center'>
        <button class='w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>
          Discover More..
        </button>
      </div> */}

      <Footer />
    </div>
  );
};

export default Homepage;
