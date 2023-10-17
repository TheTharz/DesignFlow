import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { LuPhoneCall } from 'react-icons/lu';
import { CiMail } from 'react-icons/ci';
import { SlSocialDribbble } from 'react-icons/sl';
import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialPinterest,
} from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      //console.log(user._id);
      const res = await axios.get('api/posts/' + user._id);
      setPost(res.data.posts);
    };
    getPost();
  }, [user._id]);
  return (
    <div>
      <NavBar />
      <div>
        <div>
          <p>Hi I Am,</p>
          <h1>{user.userName}</h1>
          {user.designation ? (
            <p>
              A <span>{user.designation}</span>
            </p>
          ) : (
            <p>Your designation</p>
          )}
          {user.description ? (
            <p>{user.description}</p>
          ) : (
            <p>Your description</p>
          )}
        </div>
        <div>
          {user.profilePicture ? (
            <img src={user.profilePicture} alt='user' />
          ) : (
            <img src={user.profilePicture} alt='user' />
          )}
          <button class='bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'>
            <span class='bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]'></span>
            Hire Me
          </button>
        </div>
      </div>
      <div className='mt-8 grid grid-cols-4 justify-center'>
        {Array.isArray(post) && post.length > 0 ? (
          post.map((postItem) => (
            <div
              key={postItem._id}
              className='p-2 m-2 cursor-pointer'
              onClick={() => {
                console.log(postItem);
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
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
      <div>
        <div>
          <p>Want To Contact Me?</p>
          <div>
            <LuPhoneCall size={20} />
            <p>Phone Number</p>
          </div>
          <div>
            <CiMail size={20} />
            <p>{user.email}</p>
          </div>
        </div>
        <div className='flex flex-row gap-3 p-4'>
          <SlSocialDribbble size={35} />
          <TiSocialTwitter size={35} />
          <TiSocialFacebook size={35} />
          <TiSocialInstagram size={35} />
          <TiSocialPinterest size={35} />
        </div>
      </div>
      <Footer />

      <button
        type='button'
        onClick={() => {
          navigate('/editprofile');
        }}
      >
        testing the update
      </button>
    </div>
  );
};

export default ProfilePage;
