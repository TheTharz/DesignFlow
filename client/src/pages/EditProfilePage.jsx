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
import { CgProfile } from 'react-icons/cg';
import ConvertToBase64 from '../constants/convertToBase64';
const EditProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      //console.log(user._id);
      const res = await axios.get('api/posts/' + user._id);
      setPost(res.data.posts);
    };
    getPost();
  }, [user._id]);

  const [edited, setEdited] = useState({
    userName: user.userName,
    designation: user.designation,
    description: user.description,
    contact: user.contact,
    email: user.email,
    social: user.social,
    profilePicture: user.profilePicture,
    website: user.website,
  });

  const changeProfilePicture = async (e) => {
    const file = e.target.files[0];
    const base64 = await ConvertToBase64(file);
    setEdited({ ...edited, profilePicture: base64 });
  };
  const handleInput = (e) => {
    setEdited({ ...edited, [e.target.id]: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    console.log(edited);
    try {
      const res = await axios.put('/api/users/' + user._id, edited);
      console.log(res);
      setUser(res.data.user);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <NavBar />
      <div>
        <div>
          <p>Hi I Am,</p>
          <input type='text' placeholder={user.userName} id='userName' />
          <input
            type='text'
            placeholder={
              user.designation ? user.designation : 'Your designation'
            }
            id='designation'
            onChange={(e) => handleInput(e)}
          />
          <input
            type='text'
            placeholder={
              user.description ? user.description : 'Your description'
            }
            id='description'
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div>
          <div>
            <p>Want To Contact Me?</p>
            <div>
              <LuPhoneCall size={20} />
              <input
                type='text'
                placeholder={user.contact ? user.contact : 'Your phone number'}
                id='contact'
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div>
              <CiMail size={20} />
              <p>{user.email}</p>
            </div>
          </div>
          <div className='flex flex-row gap-3 p-4'>
            <div>
              <SlSocialDribbble size={35} />
              <input
                type='text'
                placeholder={user.website ? user.website : 'Your twitter link'}
                id='website'
                onChange={(e) => handleInput(e)}
              />
            </div>

            <div>
              <TiSocialTwitter size={35} />
              <input
                type='text'
                placeholder={
                  user.social.twitter
                    ? user.social.twitter
                    : 'Your twitter link'
                }
                onChange={(e) => {
                  setEdited({
                    ...edited,
                    social: { ...edited.social, twitter: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <TiSocialFacebook size={35} />
              <input
                type='text'
                placeholder={
                  user.social.facebook
                    ? user.social.facebook
                    : 'Your facebook link'
                }
                onChange={(e) => {
                  setEdited({
                    ...edited,
                    social: { ...edited.social, facebook: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <TiSocialInstagram size={35} />
              <input
                type='text'
                placeholder={
                  user.social.instagram
                    ? user.social.instagram
                    : 'Your instagram link'
                }
                onChange={(e) => {
                  setEdited({
                    ...edited,
                    social: { ...edited.social, instagram: e.target.value },
                  });
                }}
              />
            </div>
            <div>
              <TiSocialPinterest size={35} />
              <input
                type='text'
                placeholder={
                  user.social.pinterest
                    ? user.social.pinterest
                    : 'Your pinterest link'
                }
                onChange={(e) => {
                  setEdited({
                    ...edited,
                    social: { ...edited.social, pinterest: e.target.value },
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div>
          {edited.profilePicture ? (
            <img src={edited.profilePicture} alt='user' id='profilePicture' />
          ) : (
            <CgProfile size={150} id='profilePicture' />
          )}
          <input
            type='file'
            name='profilePicture'
            id='profilePicture'
            onChange={(e) => changeProfilePicture(e)}
          />
        </div>
        <div>
          <button
            className='cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'
            onClick={(e) => {
              handleSaveChanges(e);
            }}
          >
            Save Changes
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

      <Footer />
    </div>
  );
};

export default EditProfilePage;
