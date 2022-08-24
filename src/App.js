import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import useStyle from './styles';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import SharedLayout from './Routes/SharedLayout.js';
import Error from './Routes/Error.js';
import PostDetails from './components/postDetails/PostDetails.js';
const App = () => {
  const user = localStorage.getItem('profile');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Navigate to={'/memories'} />} />
          <Route path='memories' element={<Home />} />
          <Route path='memories/search' element={<Home />} />
          <Route path='memories/:id' element={<PostDetails />} />
          <Route
            path='auth'
            element={user ? <Navigate to={'/'} /> : <Auth />}
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
