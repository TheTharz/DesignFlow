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

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [owner, setOwner] = useState({});
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
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
    <div className='w-[500px] h-[700px] rounded-3xl p-5 font-Poppins'>
      <div className='flex flex-row justify-between items-center'>
        <img
          alt='profilepicture'
          width={80}
          height={80}
          className='rounded-[40px]'
        />
        <div>
          <p className='font-medium'>{post.title}</p>
          <hr />
          <p className='text-[12px]'>By {owner.userName}</p>
        </div>
        <button
          class='w-[150px] h-[40px] flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-7 p-2 rounded-md border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900 text-center'
          onClick={() => visitProfile()}
        >
          Visit Profile
        </button>
      </div>
      <div>
        <img
          alt='post'
          className='bg-cover'
          src={post.postImage ? post.postImage : null}
        />
        <div className='flex flex-row justify-between'>
          <div>
            <p className='text-[12px]'>
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
          <div>
            <p className='text-[12px] p-2'>Connect with me</p>
            <div className='flex flex-row gap-3 p-2'>
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
