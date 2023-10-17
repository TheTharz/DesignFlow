import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import ConvertToBase64 from '../constants/convertToBase64';
import { useNavigate } from 'react-router-dom';
const EditPostPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    console.log(id);
    const getPost = async () => {
      const res = await axios.get('/api/posts/getbyid/' + id);
      console.log(res);
      setPost(res.data.post);
    };
    getPost();
  }, [id]);

  const changePostImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await ConvertToBase64(file);
    setPost({ ...post, postImage: base64 });
  };

  const handleInput = (e) => {
    setPost({ ...post, [e.target.id]: e.target.value });
  };

  const updatePost = async (e) => {
    e.preventDefault();
    console.log(post);
    try {
      const res = await axios.put('/api/posts/' + id, post);
      console.log(res);
      navigate('/profile');
      //setPost(res.data.user);
    } catch (e) {
      console.log(e);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    console.log(post);
    try {
      const res = await axios.delete('/api/posts/' + id);
      console.log(res);
      navigate('/profile');
      //setPost(res.data.user);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(post);
  return (
    <div className='w-[500px] h-[700px] rounded-3xl p-5 font-Poppins'>
      <div className='flex flex-row justify-between items-center'>
        <h1>Enhancing Your Creativity</h1>
      </div>
      <div>
        <div>
          <img
            src={post.postImage ? post.postImage : null}
            alt='post'
            className='bg-cover'
          />
          <input
            type='file'
            name='profilePicture'
            id='profilePicture'
            onChange={(e) => changePostImage(e)}
          />
        </div>

        <div className='flex flex-row justify-between'>
          <div>
            <div>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                placeholder={post.title ? post.title : 'Your title'}
                id='title'
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                placeholder={
                  post.description ? post.description : 'Your description'
                }
                id='description'
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div>
              <label htmlFor='tags'>Tags</label>
              <input
                type='text'
                placeholder={post.tags ? post.tags : 'Your tags'}
                id='tags'
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div>
              <label htmlFor='category'>Category</label>
              <select value={post.category} onChange={(e) => handleInput(e)}>
                <option>Art</option>
                <option>Design</option>
                <option>Illustration</option>
                <option>Vector</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          type='button'
          className='bg-black text-white rounded-lg cursor-pointer m-2 p-2 h-12 text-16 font-medium w-[100px]'
          onClick={(e) => updatePost(e)}
        >
          Update
        </button>
        <button
          type='button'
          className='bg-red-400 text-white rounded-lg cursor-pointer m-2 p-2 h-12 text-16 font-medium w-[100px]'
          onClick={(e) => deletePost(e)}
        >
          Delete
        </button>
        <button
          type='button'
          className='bg-white text-black rounded-lg cursor-pointer m-2 p-2 h-12 text-16 font-medium w-[100px] border-2 border-black'
          onClick={() => navigate('/profile')}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default EditPostPage;
