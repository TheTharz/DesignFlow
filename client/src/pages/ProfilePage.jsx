import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { LuPhoneCall } from 'react-icons/lu';
import { CiMail } from 'react-icons/ci';
import { AiFillLinkedin } from 'react-icons/ai';
import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
} from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import EditPostPage from '../components/EditPostPage';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getPost = async () => {
        //console.log(user._id);
        const res = await axios.get('api/posts/' + user._id);
        setPost(res.data.posts);
        console.log(res.data.posts);
        setLoading(false);
      };
      getPost();
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        navigate('/signin');
      }
    }
  }, [user._id]);

  const handleLike = async (postItem) => {
    try {
      const res = await axios.put('api/posts/like/' + postItem._id);
      const updatedPost = res.data.post;
      console.log(res);
      setPost((prevPosts) =>
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
    return postItem.likes.includes(user._id);
  };

  const updatePostInProfile = (updatedPost) => {
    setPost((prevPosts) =>
      prevPosts.map((prevPost) =>
        prevPost._id === updatedPost._id ? updatedPost : prevPost
      )
    );
    toast.success('Post updated successfully', {
      duration: 2000,
      position: 'top-right',
    });
    setSelectedPost('');
  };

  const deletePostInProfile = (deletePost) => {
    setPost((prevPosts) =>
      prevPosts.filter((prevPost) => prevPost._id !== deletePost._id)
    );
    toast.success('Post deleted successfully', {
      duration: 2000,
      position: 'top-right',
    });
    setSelectedPost('');
  };

  const discard = () => {
    setSelectedPost('');
  };

  const deleteProfile = async () => {
    try {
      const res = await axios.delete('/api/users/' + user._id);
      console.log(res);
      navigate('/signin');
      setUser(null);
      toast.success('Profile deleted successfully', {
        duration: 2000,
        position: 'top-right',
      });
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        navigate('/signin');
      } else {
        toast.error('Profile not deleted');
      }
    }
  };
  return (
    <div>
      <Toaster />
      <NavBar />
      <div className='flex flex-row items-center justify-evenly font-Poppins gap-4'>
        <div className='flex flex-col items-left gap-2 max-w-[500px]'>
          <p className='text-3xl'>Hi I Am,</p>
          <h1 className='text-4xl font-medium'>{user.userName}</h1>
          {user.designation ? (
            <p className='text-4xl'>
              A <span className='font-bold'>{user.designation}</span>
            </p>
          ) : (
            <p className='text-4xl'>Your designation</p>
          )}
          {user.description ? (
            <p className='text-lg'>{user.description}</p>
          ) : (
            <p className='text-lg'>Your description</p>
          )}
        </div>
        <div className='flex flex-col justify-center items-center gap-4'>
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt='user'
              width={250}
              height={250}
              className='rounded-full w-[250px] h-[250px] object-cover outline-black outline-3'
            />
          ) : (
            <img src={user.profilePicture} alt='user' />
          )}
        </div>
      </div>
      <div className='flex flex-col justify-center items-center m-4 p-4 mt-8'>
        <h1 className='text-3xl font-semibold'>Discover My Projects ...</h1>
        <div className='border-t border-black mt-2 w-[500px]'></div>;
      </div>
      <div className='m-2 grid grid-cols-4 justify-center'>
        {loading ? (
          <div className='w-full h-[300px] flex items-center justify-center gap-2'>
            <p className='text-3xl font-medium'>
              <span className='text-black'>Loading</span> posts
            </p>
            <div className='flex flex-row gap-2 justify-center items-center'>
              <div
                className='w-4 h-4 rounded-full bg-black animate-bounce'
                style={{ animationDelay: '.7s' }}
              ></div>
              <div
                className='w-4 h-4 rounded-full bg-black animate-bounce'
                style={{ animationDelay: '.3s' }}
              ></div>
              <div
                className='w-4 h-4 rounded-full bg-black animate-bounce'
                style={{ animationDelay: '.7s' }}
              ></div>
            </div>
          </div>
        ) : Array.isArray(post) && post.length > 0 ? (
          post.map((postItem) => (
            <div
              key={postItem._id}
              className='p-4 cursor-pointer'
              onClick={() => {
                console.log(postItem);
                setSelectedPost(postItem._id);
                //console.log(selectedPost);
                //navigate('/editpost/' + postItem._id);
              }}
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
          ))
        ) : (
          <p className='w-full h-[500px] text-center text-4xl font-semibold'>
            No posts available
          </p>
        )}
      </div>
      <div className='flex flex-row justify-evenly mb-8 p-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <p className='text-xl font-medium'>Want To Contact Me?</p>
          <div className='border-t border-black w-[250px]'></div>
          <div className='flex flex-row gap-2 items-center'>
            <LuPhoneCall size={30} />
            <p>{user.contact ? user.contact : 'Not available'}</p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <CiMail size={30} />
            <p>{user.email}</p>
          </div>
        </div>
        <div>
          <p className='text-xl font-medium'>My Socials ...</p>
          <div className='border-t border-black w-[250px]'></div>
          <div className='flex flex-col gap-2 p-4'>
            {user.social && user.social.twitter && (
              <a
                href={user.social.twitter}
                target='_blank'
                rel='noreferrer'
                className='cursor-pointer flex flex-row gap-2'
              >
                <TiSocialTwitter size={30} />
                <p>{user.social.twitter}</p>
              </a>
            )}
            {user.social && user.social.facebook && (
              <a
                href={user.social.facebook}
                target='_blank'
                rel='noreferrer'
                className='cursor-pointer flex flex-row gap-2'
              >
                <TiSocialFacebook size={30} />
                <p>{user.social.facebook}</p>
              </a>
            )}
            {user.social && user.social.instagram && (
              <a
                href={user.social.instagram}
                target='_blank'
                rel='noreferrer'
                className='cursor-pointer flex flex-row gap-2'
              >
                <TiSocialInstagram size={30} />
                <p>{user.social.instagram}</p>
              </a>
            )}
            {user.social && user.social.linkedin && (
              <a
                href={user.social.linkedin}
                target='_blank'
                rel='noreferrer'
                className='cursor-pointer flex flex-row gap-2'
              >
                <AiFillLinkedin size={30} />
                <p>{user.social.linkedin}</p>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-center gap-4'>
        <button
          className='w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'
          onClick={() => {
            navigate('/editprofile');
          }}
        >
          Edit My Profile
        </button>
        <button
          className='w-[150px] bg-red-400 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'
          onClick={() => {
            deleteProfile();
          }}
        >
          Delete My Profile
        </button>
      </div>
      <div>
        {selectedPost && (
          <EditPostPage
            postId={selectedPost}
            updatePostInProfile={updatePostInProfile}
            deletePostInProfile={deletePostInProfile}
            discard={discard}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
