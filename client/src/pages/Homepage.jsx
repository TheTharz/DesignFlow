import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  return (
    <div className='font-Poppins'>
      <NavBar />
      <Hero />
      <div className='mt-8 grid grid-cols-4 justify-center'>
        {Array.isArray(post) && post.length > 0 ? (
          post.map((postItem) => (
            <div
              key={postItem._id}
              className='p-2 m-2 cursor-pointer'
              onClick={() => viewDetails(postItem)}
            >
              {postItem.postImage && (
                <img
                  src={postItem.postImage}
                  alt='post'
                  className='w-80 h-60 object-cover rounded-md'
                />
              )}
              <div className='flex flex-row justify-between p-4'>
                <h3 className='text-[16px] font-medium'>{postItem.title}</h3>
                <p className='mr-8'>{postItem.likes.length}</p>
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
