import React, { useState } from 'react';
import { SlSocialDribbble } from 'react-icons/sl';
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialPinterest,
} from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

const PostDetails = (postId) => {
  //const { id } = useParams();
  const id = postId.postId;
  console.log(id);
  const [post, setPost] = useState({});
  const [owner, setOwner] = useState({});
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);

  const visitProfile = () => {
    navigate('/profile/' + owner._id);
  };

  const handleApiError = (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to sign-in page
      navigate('/signin');
    } else {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    console.log(id);
    try {
      const getPost = async () => {
        const res = await axios.get('/api/posts/getbyid/' + id);
        console.log(res);
        setPost(res.data.post);
        setIsCardVisible(true);
      };
      getPost().catch(handleApiError); // Handle API errors
    } catch (error) {
      handleApiError(error); // Handle other errors
    }
  }, [id]);

  useEffect(() => {
    try {
      const getOwner = async () => {
        if (!post.owner) {
          console.log('Post owner is undefined');
          return;
        }

        const res = await axios.get('/api/users/' + post.owner);
        console.log(res);
        setOwner(res.data.user);
      };
      getOwner();
    } catch (error) {
      console.error(error);
    }
  }, [post]);

  const handleDownload = () => {
    if (post.postImage) {
      const link = document.createElement('a');
      link.href = post.postImage;
      link.download = 'post_image.jpg'; // Specify the filename for the downloaded image
      link.target = '_blank';
      link.addEventListener('load', () => {
        setDownloading(false);
      });

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger a click event on the link
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50 ${
        isCardVisible ? 'block' : 'hidden'
      }`}
    >
      <div>
        <AiOutlineClose
          size={20}
          onClick={() => {
            setIsCardVisible(false);
            navigate('/');
          }}
          className='cursor-pointer'
        />
      </div>
      <div className='flex flex-row justify-between items-center m-2'>
        <img
          alt='profilepicture'
          width={100}
          height={100}
          className='rounded-full w-[100px] h-[100px] object-cover'
          src={user.profilePicture}
        />
        <div className='flex flex-col justify-center'>
          <p className='font-medium text-xl p-2'>{post.title}</p>
          <hr />
          <p className='text-[12px] p-2'>By {owner.userName}</p>
        </div>
        <button
          class='w-[150px] h-[60px] flex gap-3 cursor-pointer text-white font-normal bg-gradient-to-r from-gray-800 to-black px-7 p-1 rounded-3xl border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900 text-center'
          onClick={() => visitProfile()}
        >
          Visit Profile
        </button>
      </div>
      <div className='m-2 justify-center'>
        <div className='flex justify-center items-center'>
          <img
            alt='post'
            className='bg-cover p-2'
            src={post.postImage ? post.postImage : null}
            width={500}
            height={300}
            style={{ maxWidth: '500px', maxHeight: '300px' }}
          />
        </div>
        <div className='flex flex-row justify-between'>
          <div className='p-2 w-[400px]'>
            <p className='text-[12px] pb-2'>
              {post.description
                ? post.description
                : 'Post description unavailable'}
            </p>
            <button
              class='w-[120px] h-[30px] text-[14px] flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black rounded-md border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900 p-1 pl-4'
              onClick={handleDownload}
            >
              {downloading ? 'Downloading...' : 'Download'}
            </button>
          </div>
          <div className='flex flex-col'>
            <p className='text-[12px] p-2'>Connect with me</p>
            <div className='flex flex-row gap-3 p-2 mr-12'>
              {owner && owner.website ? (
                <a href={owner.website}>
                  <SlSocialDribbble size={25} />
                </a>
              ) : null}
              {owner && owner.social && owner.social.twitter ? (
                <a href={owner.social.twitter}>
                  <TiSocialTwitter size={25} />
                </a>
              ) : null}
              {owner && owner.social && owner.social.facebook ? (
                <a href={owner.social.facebook}>
                  <TiSocialFacebook size={25} />
                </a>
              ) : null}
              {owner && owner.social && owner.social.instagram ? (
                <a href={owner.social.instagram}>
                  <TiSocialInstagram size={25} />
                </a>
              ) : null}
              {owner && owner.social && owner.social.pinterest ? (
                <a href={owner.social.pinterest}>
                  <TiSocialPinterest size={25} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
