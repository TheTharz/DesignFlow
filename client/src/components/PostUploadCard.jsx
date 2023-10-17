import React from 'react';
import ConvertToBase64 from '../constants/convertToBase64';
import { useState } from 'react';
import axios from 'axios';
import postValidation from '../constants/postValidation';
import uploadImage from '../assets/upload.png';
import { useNavigate } from 'react-router-dom';
const PostUploadCard = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    description: '',
    tags: '',
    postImage: '',
    category: '',
  });
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(post);
    setError({});
    const validationErrors = postValidation(post);
    setError(validationErrors);

    if (Object.keys(postValidation).length === 0) {
      const { title, description, tags, postImage, category } = post;
      try {
        const newPost = await axios.post('/api/posts', {
          title,
          description,
          tags,
          postImage,
          category,
        });
        console.log(newPost);
        setPost({
          title: '',
          description: '',
          tags: '',
          postImage: '',
          category: '',
        });
        navigate('/profile');
      } catch (e) {
        console.log(e.response.data.message);
        if (e.response.data.message === 'You are not logged in') {
          alert(e.response.data.message);
        }
      }
    }
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await ConvertToBase64(file);
    setPost({ ...post, postImage: base64 });
  };
  const handleInput = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <div className='w-[500px] h-[700px] bg-white rounded-[20px]'>
      <h1 className='font-bold text-4xl text-center p-2 m-2'>
        Share Your <span className='text-yellow-400'>Creativity</span>
      </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='w-full h-[300px] border-2 border-dashed m-2 rounded-md bg-gray-300 flex flex-col items-center justify-center'>
            {post.postImage && post.postImage !== 'uploadImage' ? (
              <label htmlFor='postImage_uploaded'>
                <img src={post.postImage} alt='post' class='w-full h-full' />
              </label>
            ) : (
              <img src={uploadImage} alt='post' class='w-8 h-8' />
            )}
            <input
              type='file'
              name='postImage'
              id='postImage'
              label='postImage'
              className={`border rounded px-4 py-2 border-border text-black focus:outline-none focus:border-lightgray ${
                post.postImage && post.postImage !== 'uploadImage'
                  ? 'hidden'
                  : ''
              }`}
              placeholder='Add Image'
              accept='.jpg, .jpeg, .png'
              onChange={(e) => handleFileUpload(e)}
            />
            {error.postImage && (
              <p className='text-red-500 text-xs'>{error.postImage}</p>
            )}
          </div>
          <div>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              className='border rounded px-4 py-2 border-border text-black focus:outline-none focus:border-lightgray'
              placeholder='Title'
              onChange={handleInput}
            />
            {error.title && (
              <p className='text-red-500 text-xs'>{error.title}</p>
            )}
          </div>
          <div>
            <label htmlFor='category'>Category</label>
            <select
              onChange={(e) => {
                setPost({ ...post, category: e.target.value });
              }}
              value={post.category}
            >
              <option>Art</option>
              <option>Design</option>
              <option>Illustration</option>
              <option>Vector</option>
            </select>
            {error.category && (
              <p className='text-red-500 text-xs'>{error.category}</p>
            )}
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              className='border rounded px-4 py-2 border-border text-black focus:outline-none focus:border-lightgray'
              placeholder='Description'
              onChange={handleInput}
            />
            {error.description && (
              <p className='text-red-500 text-xs'>{error.description}</p>
            )}
          </div>
          <div>
            <label htmlFor='tags'>Tags</label>
            <input
              type='text'
              name='tags'
              id='tags'
              className='border rounded px-4 py-2 border-border text-black focus:outline-none focus:border-lightgray'
              placeholder='Tags'
              onChange={handleInput}
            />
          </div>
          <div>
            <button
              type='submit'
              className='bg-primary text-black px-4 py-2 rounded-md'
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostUploadCard;
