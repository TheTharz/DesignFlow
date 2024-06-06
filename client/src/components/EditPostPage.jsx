import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConvertToBase64 from '../constants/convertToBase64';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const EditPostPage = ({
  postId,
  updatePostInProfile,
  deletePostInProfile,
  discard,
}) => {
  console.log(postId);
  const id = postId;
  console.log(id);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState({});

  useEffect(() => {
    console.log(id);
    const getPost = async () => {
      try {
        setIsCardVisible(true);

        const res = await axios.get('/api/posts/getbyid/' + id);
        console.log(res);
        setPost(res.data.post);
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          navigate('/signin');
        }
      }
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
      setIsCardVisible(false);
      //setPost(res.data.user);
      updatePostInProfile(res.data.updatedPost);
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        navigate('/signin');
      } else {
        toast.error('Post not updated');
      }
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    console.log(post);
    try {
      const res = await axios.delete('/api/posts/' + id);
      console.log(res);
      setIsCardVisible(false);
      deletePostInProfile(res.data.post);
      //setPost(res.data.user);
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        toast.error('You are not signed in. Please sign in to continue');
        navigate('/signin');
      } else {
        toast.error('Post not deleted');
      }
    }
  };
  console.log(post);

  return (
    <div>
      {loading ? (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50 block'>
          <div class='animate-pulse flex flex-col items-center gap-4 w-60'>
            <div>
              <div class='w-48 h-6 bg-slate-400 rounded-md'></div>
              <div class='w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md'></div>
            </div>
            <div class='h-7 bg-slate-400 w-full rounded-md'></div>
            <div class='h-7 bg-slate-400 w-full rounded-md'></div>
            <div class='h-7 bg-slate-400 w-full rounded-md'></div>
            <div class='h-7 bg-slate-400 w-1/2 rounded-md'></div>
          </div>
        </div>
      ) : (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50 ${
            isCardVisible ? 'block' : 'hidden'
          }`}
        >
          <div className='flex flex-row justify-between items-center m-2'>
            <h1 className='font-medium text-xl p-2'>
              Enhancing Your <span className='text-yellow-400'>Creativity</span>
            </h1>
          </div>
          <div>
            <div>
              <img
                src={post.postImage ? post.postImage : null}
                alt='post'
                className='bg-cover p-2'
                width={500}
                height={300}
                style={{ maxWidth: '500px', maxHeight: '300px' }}
              />
              <input
                type='file'
                name='profilePicture'
                id='profilePicture'
                onChange={(e) => changePostImage(e)}
              />
            </div>

            <div className='flex flex-row justify-between'>
              <div className='flex flex-col gap-3 p-2'>
                <div className='flex flex-row gap-3'>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    placeholder={post.title ? post.title : 'Your title'}
                    id='title'
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className='flex flex-row gap-3 items-center'>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    type='text'
                    placeholder={
                      post.description ? post.description : 'Your description'
                    }
                    id='description'
                    onChange={(e) => handleInput(e)}
                    className='h-[125px] w-[400px]'
                  />
                </div>
                <div className='flex flex-row items-center gap-3'>
                  <label htmlFor='tags'>Tags</label>
                  <input
                    type='text'
                    placeholder={post.tags ? post.tags : 'Your tags'}
                    id='tags'
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className='flex flex-row items-center gap-3'>
                  <label htmlFor='category'>Category</label>
                  <select onChange={(e) => handleInput(e)}>
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
              onClick={() => {
                setIsCardVisible(false);
                discard();
              }}
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPostPage;
