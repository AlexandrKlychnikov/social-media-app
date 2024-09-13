import { Routes, Route } from 'react-router-dom';
import './globals.css';
import Home from './root/pages/Home';
import SigninForm from './auth/forms/SigninForm';
import SignupForm from './auth/forms/SignupForm';
import RootLayout from './root/RootLayout';
import AuthLayout from './auth/AuthLayout';
import { Toaster } from '@/components/ui/toaster';
import Explore from './root/pages/Explore';
import People from './root/pages/People';
import Saved from './root/pages/Saved';
import CreatePost from './root/pages/CreatePost';
import EditPost from './root/pages/EditPost';
import PostDetails from './root/pages/PostDetails';
import Profile from './root/pages/Profile';
import UpdateProfile from './root/pages/UpdateProfile';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/people' element={<People />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
