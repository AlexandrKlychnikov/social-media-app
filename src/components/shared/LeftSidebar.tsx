import React from 'react';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queries';
import { INITIAL_USER, useUserContext } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { mutate: signOut } = useSignOutAccount();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate('/sign-in');
  };

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <div className='flex justify-center items-center'>
            <img
              src='/assets/images/logo.svg'
              alt='logo'
              width={40}
              height={40}
            />
            <p className='font-bold text-[22px] text-indigo-500'>Someda</p>
          </div>
        </Link>
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='profile'
            className='h-14 w-14 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>
      </div>

      <Button
        variant='ghost'
        className='shad-button_ghost'
        onClick={(e) => handleSignOut(e)}
      >
        <img src='/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium'>Выйти</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
