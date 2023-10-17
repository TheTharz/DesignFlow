import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import PostDetails from '../components/PostDetails';
const Homepage = () => {
  const [selectedPost, setSelectedPost] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/posts/allposts')
      .then((response) => {
        setPost(response.data.posts);
        //console.log(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
