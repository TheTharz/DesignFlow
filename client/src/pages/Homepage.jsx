import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
const Homepage = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/posts/allposts')
      .then((response) => {
        setPost(response.data.posts);
        //console.log(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const viewDetails = (postItem) => {
    console.log(postItem);
    navigate('/postdetails/' + postItem._id);
  };

  const handleLike = async (postItem) => {
    try {
      const res = await axios.put('api/posts/like/' + postItem._id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlike = async (postItem) => {
    try {
      const res = await axios.put('api/posts/unlike/' + postItem._id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='font-Poppins'>
      <NavBar />
      <Hero />
      <div className='mt-8 grid grid-cols-4 justify-center'>
        {Array.isArray(post) && post.length > 0 ? (
          post.map((postItem) => (
            <div key={postItem._id} className='p-2 m-2 cursor-pointer'>
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
                  <AiOutlineHeart
                    className='inline-block cursor-pointer'
                    onClick={() => handleLike(postItem)}
                  />
                  <AiFillHeart
                    className='inline-block cursor-pointer'
                    onClick={() => handleUnlike(postItem)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
