import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Error from './pages/Error';
import Home from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import axios from 'axios';
import { UserContextProvider } from './context/userContext';

//testing
import UploadCard from './components/PostUploadCard';
import PostDetails from './components/PostDetails';

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
          <Route path='*' element={<Error />} />
          <Route path='/upload' element={<UploadCard />} />
          <Route path='/postdetails' element={<PostDetails />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
