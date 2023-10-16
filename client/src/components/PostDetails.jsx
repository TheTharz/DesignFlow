import React from 'react';
import { SlSocialDribbble } from 'react-icons/sl';
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialPinterest,
} from 'react-icons/ti';
const PostDetails = ({ post }) => {
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
          <p className='font-medium'>Coffee Shop Logo</p>
          <hr />
          <p className='text-[12px]'>By John Doe</p>
        </div>
        <button class='w-[150px] h-[40px] flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-7 p-2 rounded-md border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900 text-center'>
          Visit Profile
        </button>
      </div>
      <div>
        <img
          src='https://picsum.photos/500/300'
          alt='post'
          className='bg-cover'
        />
        <div className='flex flex-row justify-between'>
          <div>
            <p className='text-[12px]'>Description</p>
            <button class='w-[120px] h-[30px] text-[14px] flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black rounded-md border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900 p-1 pl-4'>
              Download
            </button>
          </div>
          <div>
            <p className='text-[12px] p-2'>Connect with me</p>
            <div className='flex flex-row gap-3 p-2'>
              <SlSocialDribbble size={25} />
              <TiSocialTwitter size={25} />
              <TiSocialFacebook size={25} />
              <TiSocialInstagram size={25} />
              <TiSocialPinterest size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
