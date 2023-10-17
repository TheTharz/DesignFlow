import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { LuPhoneCall } from 'react-icons/lu';
import { CiMail } from 'react-icons/ci';
import { AiFillLinkedin } from 'react-icons/ai';
import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialPinterest,
} from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const OtherProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const getUser = async () => {
        const res = await axios.get('api/users/' + id);
        setUser(res.data.user);
        console.log(res.data.user);
      };
      const getPost = async () => {
        try {
          const res = await axios.get('api/posts/' + id);
          setPost(res.data.posts);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.error('No post found');
          } else {
            console.error('An error occurred:', error);
          }
        }
      };
      getUser();
      getPost();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
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
          <button class='bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group w-[200px]'>
            <span class='bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]'></span>
            Hire Me
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center m-4 p-4 mt-8'>
        <h1 className='text-3xl font-semibold'>Discover My Projects ...</h1>
        <div className='border-t border-black mt-2 w-[500px]'></div>;
      </div>
      <div className='m-2 grid grid-cols-4 justify-center'>
        {Array.isArray(post) && post.length > 0 ? (
          post.map((postItem) => (
            <div
              key={postItem._id}
              className='p-4 cursor-pointer'
              onClick={() => {
                console.log(postItem);
                navigate('/editpost/' + postItem._id);
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
      <Footer />
    </div>
  );
};

export default OtherProfilePage;
