import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Error from './pages/Error';
import Home from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import axios from 'axios';
import { UserContextProvider } from './context/userContext';
import EditPostPage from './components/EditPostPage';
import SearchResultPage from './pages/SearchResultPage';
import PrivacyPolicy from './components/PrivacyPolicy';
//testing
import UploadCard from './components/PostUploadCard';
import PostDetails from './components/PostDetails';
import OtherProfilePage from './pages/OtherProfilePage';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='*' element={<Signin />} />
          <Route path='/upload' element={<UploadCard />} />
          <Route path='/postdetails/:id' element={<PostDetails />} />
          <Route path='/profile/:id' element={<OtherProfilePage />} />
          <Route path='/myprofile/:id' element={<ProfilePage />} />
          <Route path='/editprofile' element={<EditProfilePage />} />
          <Route path='/editpost/:id' element={<EditPostPage />} />
          <Route path='/search/:search' element={<SearchResultPage />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
